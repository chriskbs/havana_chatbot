/**
 * client.ts
 * 
 * Supabase client initialization for frontend
 * 
 */

import { createClient } from "@supabase/supabase-js";

//environment variables
const url = process.env.SUPABASE_POSTGRES_NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.SUPABASE_POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// creates supabase client instance
// all queries front end will import this
export const supabase = createClient(url, anonKey);
