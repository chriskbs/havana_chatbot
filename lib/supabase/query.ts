/* query.ts
 *
 * Centralized helper functions for interacting with Supabase (PostgreSQL).
 * Handles CRUD operations for categories, FAQs, chats, and real-time subscriptions.
 */

import { supabase } from "./client";

/**
 * Fetching Functions
 */

// fetches all categories 
export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

// fetches all subcategories
export async function getSubCategories() {
  const { data, error } = await supabase.from("subcategories").select("*");
  if (error) throw error;
  return data;
}

// fetches all subcategories ordered by time, currently not used
export async function getChatSubCategories() {
  const { data, error } = await supabase.from("subcategories").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

// fethces FAQ, filterd by category
export async function getFaqs(subCategoryId?: string) {
  let query = supabase.from("faq_items").select("*").order("created_at", { ascending: true });
  if (subCategoryId) query = query.eq("subcategory_id", subCategoryId);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// fetches a single chat session
export async function getChat(chatId: string) {
  const { data, error } = await supabase.from("chat_sessions").select().eq("id", chatId).single();
  if (error) throw error;
  return data;
}

// fetches a all messages related to a single chat session
export async function getMessages(chatId: string) {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("session_id", chatId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

// fetches all chat sessions
export async function getChats() {
  const { data, error } = await supabase.from("chat_sessions").select("*").order("created_at", { ascending: true }).limit(100);
  if (error) throw error;
  return data;
}

// fetches all currenlty online chat session for admin
// currently uses updated within past 5 mins to define online, but can change to is_online
export async function getAdminChats() {
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 mins ago

  const { data, error } = await supabase
    .from("chat_sessions")
    .select("*")
    .gte("updated_at", fiveMinutesAgo.toISOString()) 
    .order("updated_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []).map((session) => ({
    ...session,
    online: true,
  }));
}

// fetches all chat session with a call booking for admin
export async function getAdminCallChats() {
  const { data, error } = await supabase
    .from("chat_sessions")
    .select("*")
    .not('booked_call', 'is', null)
    .not('phone_number', 'is', null)
    .order("updated_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data || []).map((session) => ({
    ...session
  }));
}


/**
 * Add Functions
 */

// create new chat session
export async function addChat() {
  const { data, error } = await supabase
    .from("chat_sessions")
    .insert({})      
    .select("*")      
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw error;

  }

  console.log("Inserted chat session:", data);
  return data;
}

// insert new message to a session
// updates session last_updated
export async function addMessage(chatId: string, role: "user" | "assistant" | "admin", content: string) {
  const { data, error } = await supabase
    .from("chat_messages")
    .insert({ session_id: chatId, role, content })
    .select()
    .single();
  if (error) throw error;
   const { error: sessionError } = await supabase
    .from("chat_sessions")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", chatId);

  if (sessionError) throw sessionError;
  return data;
}

/**
 * Update Functions
 */

// updates chat to resolve admin request if an admin joins chat
export async function updateAdminChat(chatId: string) {
  const { data, error } = await supabase
    .from("chat_sessions")
    .update({ is_admin: true, escalation_pending: false })
    .eq("id", chatId);
  if (error) throw error;
}

/**
 * Realtime subscription helper
 * currenlty not in use as channel does not work as a called funciton
 */

export function subscribeToMessages(chatId: string, onNewMessage: (msg: any) => void) {

  const channel = supabase
    .channel(`chat-${chatId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages',
      },
      (payload) => console.log(payload)
    )
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `session_id=eq.${chatId}`
      },

      (payload) => {
        console.log("[subscribeToMessages] new message payload:", payload.new);
      }
    )
    .subscribe();
  console.log("Channel status:", channel.state);

  return () => {
    console.log("[subscribeToMessages] unsubscribing channel");
    supabase.removeChannel(channel);
  };
}
