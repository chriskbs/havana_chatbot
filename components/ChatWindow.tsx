/**
 * ChatWindow.tsx
 * 
 * returns a chat window component to be used for displaying and submitting messages in chatwidget
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { addMessage, getMessages, subscribeToMessages } from "@/lib/supabase/query";
import { supabase } from "@/lib/supabase/client";

// Message type definition
type Message = {
    id: string;
    session_id: string;
    role: string;
    content: string;
    created_at: string;
};

/**
 * ChatWindow component
 *
 * Handles:
 * - Loading initial messages
 * - Showing a welcome message if chat is empty
 * - Real-time updates via Supabase subscriptions
 * - Sending user input & calling the AI API
 * xs
 * Used in ChatWidget
 */

export default function ChatWindow({ chatId }: { chatId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState("");
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const initRan = useRef(false); // ensure initial message runs only once

    // initialize a welcome message if chat is empty
    useEffect(() => {
        if (initRan.current) return;
        initRan.current = true;
        const init = async () => {
            const msgs = await getMessages(chatId);
            setMessages(msgs);

            if (msgs.length === 0) {
                const welcome = await addMessage(
                    chatId,
                    "assistant",
                    "Hi, I’m May, your assistant. How can I help you?"
                );
            }
        };

        init();
    }, [chatId]);


    // Supabase Realtime subscription to listen for new message updates
    useEffect(() => {
        const channel = supabase
            .channel(`chat-${chatId}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "chat_messages",
                    filter: `session_id=eq.${chatId}`,
                },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new as Message]);
                }
            )
            .subscribe();
        
        // Cleanup on unmounting the subscription
        return () => {
            supabase.removeChannel(channel);
        };
    }, [chatId]);

    // auto scroll for messages
    useEffect(() => {
        const el = scrollerRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages]);

    // send handler
    // will call openAI AI

    async function handleSend(e?: React.FormEvent) {
        e?.preventDefault();
        if (!text.trim()) return;
        
        // insert user message
        await addMessage(chatId, "user", text.trim());
        setText("");

        try {
            // forward message to openAI API route
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: chatId, content: text.trim() }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error("AI API error");
        } catch (err) {
            await addMessage(chatId, "assistant", "Error: unable to get response from AI.");
        }

        // To test connection: simple bot echo response inserted by client (has been replace with real bot)
        //setTimeout(async () => {
        //    await addMessage(chatId, "assistant", `Bot (echo): ${text.trim()}`);
        //}, 600);
    }

    /**
     * UI for chatwindow
     */

    return (
        <div className="flex flex-col h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white/90 to-blue-100/90 backdrop-blur-md" ref={scrollerRef}>
                {messages.map((m) => {
                    const isUser = m.role === "user";
                    return (
                        <div
                            key={m.id}
                            className={`flex chat-bubble ${isUser ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${isUser
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                <div className="text-sm leading-relaxed">
                                    {m.content.split("\n").map((line, idx) => (
                                        <div key={idx}>{line}</div>
                                    ))}
                                </div>
                                <div
                                    className={`text-[11px] mt-1 ${isUser ? "text-blue-100 text-right" : "text-gray-500 text-left"
                                        }`}
                                >
                                    {new Date(m.created_at).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t flex gap-2 items-center bg-white">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded px-3 py-2"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
            </form>
        </div>
    );
}
