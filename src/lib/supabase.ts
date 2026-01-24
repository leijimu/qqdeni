import { createClient } from "@supabase/supabase-js";

// Load env vars
// In Vite, env vars must start with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export client only if keys are present
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;
