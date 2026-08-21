import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://deldhtqoygpoozbrfpgv.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_66X8kv19-K-kjCy3uJC33g_v0G2V4JN";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
