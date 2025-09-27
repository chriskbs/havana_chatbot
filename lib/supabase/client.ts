// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_POSTGRES__NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.SUPABASE_POSTGRES__NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser-side client (use anon key)
export const supabase = createClient(url, anonKey);
