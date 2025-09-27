// app/admin/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { getAdminChats, updateAdminChat, getChats } from "@/lib/supabase/query";
import AdminChatView from "@/components/AdminChatView";
import { supabase } from "@/lib/supabase/client";
import ChatWindow from "@/components/ChatWindow";


interface ChatSession {
  id: number;
  updated_at: string;
  is_admin: boolean;
  escalation_pending: boolean;
}

export default function AdminPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const data = await getAdminChats();
      setSessions(data);
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };

  const openChat = (id: string) => {
    setChatId(id);
    setSidebarOpen(true); // open the right-hand sidebar
  };


  return (
    <div className="flex p-8 bg-gradient-to-b from-white to-blue-200 min-h-screen">

      <div
        className={`transition-all duration-300 p-8`}
        style={{ flex: sidebarOpen ? 1 : 1 }} // push main content
      >
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">Admin Dashboard</h1>


        {/* Chat Sessions Table */}
        <div className="overflow-x-auto mb-6 rounded-2xl shadow-lg">
          <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              {["ID", "Last Updated", "Admin", "Escalation", "Action"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className={`border-b hover:bg-gray-50 transition-colors duration-200 ${session.is_admin || session.escalation_pending ? "bg-grey-100" : ""
                    }`}
                >
                  <td className="py-4 px-6 text-gray-800 font-medium">{session.id}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(session.updated_at).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {session.is_admin && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Admin
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {session.escalation_pending && (
                      <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => openChat(session.id.toString())}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-sm"
                    >
                      Open Chat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={`transition-all duration-300 flex flex-col`}
        style={{
          flex: sidebarOpen ? 1 : 0,      // flex-grow
          minWidth: sidebarOpen ? "400px" : "0px", // optional min width when open
          maxWidth: "400px",              // cap the width
        }}
      >
        {sidebarOpen &&
          <AdminChatView chatId={chatId} open={sidebarOpen} setOpen={setSidebarOpen} />
        }
      </div>
    </div>
  );

}
