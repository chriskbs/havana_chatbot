"use client";

import React, { useEffect, useRef, useState } from "react";
import { addMessage, getMessages, updateAdminChat, subscribeToMessages } from "@/lib/supabase/query";
import { supabase } from "@/lib/supabase/client";

interface AdminChatViewProps {
  chatId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // <- use state setter
}

type Message = {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
};

export default function AdminChatView({ chatId, open, setOpen }: AdminChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const initRan = useRef(false);
  const initIntervene = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // subscribe directly to supabase realtime
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
          console.log("🔥 New message:", payload.new);
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe((status) => {
        console.log("📡 Channel status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);



  // Optional: auto-scroll or resize logic can go here
  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim()) return;
    // insert user message
    await addMessage(chatId, "admin", text.trim());
    if (!initIntervene.current) {
      initIntervene.current = true;
      await updateAdminChat(chatId);
    }
    console.log("message sent")
    setText("");
  }

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-[400px] bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* Header */}
      <div className="bg-blue-700 h-14 text-white flex items-center justify-between px-4">
        <div className="font-semibold text-lg">Admin Chat</div>
        <button onClick={() => setOpen(false)} className="opacity-80 text-xl">
          ✕
        </button>
      </div>

      {/* Chat Content */}
      <div className="h-[calc(100%-56px)] flex flex-col">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white/90 to-blue-100/90 backdrop-blur-md" ref={scrollerRef}>
            {messages.map((m) => {
              const isUser = m.role === "admin";
              return (
                <div
                  key={m.id}
                  className={`flex chat-bubble ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${isUser
                        ? "bg-blue-500 text-white rounded-br-none"
                        : m.role === "assistant"
                          ? "bg-green-500 text-white rounded-bl-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                  >
                    <div className="text-sm leading-relaxed">
                      {m.content.split("\n").map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>
                    <div
                      className={`text-[11px] mt-1 ${isUser 
                        ? "text-blue-100 text-right" 
                        : m.role === "assistant" 
                        ? "text-white text-left"
                        : "text-gray-500 text-left"
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
      </div>
    </div>
  );
}
