// components/ChatWidget.tsx
"use client";
import React, { useEffect, useState } from "react";
import { addChat } from "@/lib/supabase/query";
import ChatWindow from "./ChatWindow"

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);

  async function ensureChat() {
    if (!chatId) {
      const chat = await addChat(); // returns chat object with id
      setChatId(chat.id);
    }
  }

  useEffect(() => {
    if (open) {
      ensureChat();
      console.log('test')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg flex items-center justify-center"
        aria-label="Open chat"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] shadow-2xl rounded-lg overflow-hidden ">
          <div className="bg-blue-700 h-14 text-white p-3 flex items-center justify-between">
            <div className="font-semibold">Havana University Chat</div>
            <button onClick={() => setOpen(false)} className="opacity-80">✕</button>
          </div>

          <div className="h-[calc(100%-56px)]">
            {chatId ? <ChatWindow chatId={chatId} /> : <div className="p-4">Initializing...</div>}
          </div>
        </div>
      )}
    </div>
  );
}
