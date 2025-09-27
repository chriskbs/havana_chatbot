//import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase/client";
import { NextRequest, NextResponse } from "next/server";
import { getMessages, getChat, addMessage, getCategories, getSubCategories, addChat } from "@/lib/supabase/query"

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const { sessionId, content } = await req.json();

  // Insert user message
  const messages = await getMessages(sessionId);
  
 function mapRole(role: string): "user" | "assistant" {
  return role === "user" ? "user" : "assistant";
}

const lastMessagesWithCurrent: { role: "user" | "assistant"; content: string }[] = [
  ...messages.slice(-5).map(m => ({
    role: mapRole(m.role),
    content: String(m.content)
  })),
  { role: "user", content: String(content) }
];



  // Load session
  const session = await getChat(sessionId);

  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  // If admin present, bot does nothing
  if (session.is_admin) return NextResponse.json({ ok: 1 });
  if (session.escalation_pending) return NextResponse.json({ ok: 2 });


  const subcategories = await getSubCategories();

  // ---- Intent detection with structured output ----
  const intentPrompt = `
  You are an intent classifier. Given the user message, respond ONLY in JSON.
  
  Categories and subcategories (multiple subcategories can be selected):
  ${JSON.stringify(subcategories)}

  Allowed intents:
  - "info": The user is asking for information or help that can be answered using FAQs or predefined data.
  - "admin": The user wants to speak with a human or escalate the session.
  

  Your JSON should include:
    {
      "intent": "<one of the allowed intents>",
      "topics": ["subcat1", "subcat2", ...]
    }
  
  Message: "${content}"
  `;
  const intentRes = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [{ role: "system", content: intentPrompt }],
    response_format: { type: "json_object" },
  });

  const intent = JSON.parse(intentRes.choices[0].message.content || "{}");

  console.log("intentRes:", intentRes.choices[0].message.content);
  console.log("parsed intent:", intent);

  if (intent.intent === "admin" || intent.intent === "unknown") {
    await supabase.from("chat_sessions").update({ escalation_pending: true }).eq("id", sessionId);
    await addMessage(sessionId, "assistant", "Please wait a moment while I connect you with our admin.");
    return NextResponse.json({ ok: 3 });
  }

  // ---- Retrieve FAQ items ----
  if (intent.intent === "info") {
    let answer = "";
    if (intent.topics?.length > 0) {
      const subcatIds = (await supabase
        .from("subcategories")
        .select("id")
        .in("name", intent.topics)
      ).data?.map(s => s.id) || [];

      const { data: faqs } = await supabase
        .from("faq_items")
        .select("question, answer")
        .in("subcategory_id", subcatIds);

      const context = JSON.stringify(faqs || []);

      const answerPrompt = `
      You are May, a helpful assistant. Use the following FAQs if relevant:
      ${context}
      
      User: ${content}
      If you cannot answer confidently, respond with exactly: "ESCALATE_TO_ADMIN".
  Otherwise, answer clearly and concisely.
      `;

      const answerRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        messages: [{ role: "system", content: answerPrompt },
          ...lastMessagesWithCurrent
        ],
      });

      answer = answerRes.choices[0].message.content || "";

      if (answer.toUpperCase().includes("ESCALATE_TO_ADMIN")) {
        // escalate session
        await supabase
          .from("chat_sessions")
          .update({ escalation_pending: true })
          .eq("id", sessionId);

        await addMessage(
          sessionId,
          "assistant",
          "Please wait a moment while we connect you with our admin."
        );

        return NextResponse.json({ ok: 4 });
      }
    } else {
      const fallbackPrompt = `
    You are May, a friendly assistant.
    Respond helpfully to the user's message, even if it's casual (like "hi", "can I get help", etc.).
    If the question is something you cannot answer confidently, respond with exactly: "ESCALATE_TO_ADMIN".
    
    User: "${content}"
    `;
      const fallbackRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        messages: [{ role: "system", content: fallbackPrompt },
          ...lastMessagesWithCurrent
        ],
      });

      answer = fallbackRes.choices[0].message.content || "";

      if (answer.toUpperCase().includes("ESCALATE_TO_ADMIN")) {
        await supabase
          .from("chat_sessions")
          .update({ escalation_pending: true })
          .eq("id", sessionId);

        await addMessage(sessionId, "assistant", "Please wait a moment while we connect you with our admin.");
        return NextResponse.json({ ok: 4.5 });
      }
    }

    await addMessage(sessionId, "assistant", answer || "");

    return NextResponse.json({ ok: 5 });
  }

  return NextResponse.json({ ok: 6 });
}