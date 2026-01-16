import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client with service role key for admin operations
export function createServerSupabaseClient() {
  // Try multiple possible environment variable names
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 
                     process.env.SUPABASE_URL ||
                     process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ||
                     process.env.VITE_SUPABASE_URL;
  
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                             process.env.SUPABASE_SERVICE_KEY ||
                             process.env.SUPABASE_SERVICE_ROLE ||
                             process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                             process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
                             process.env.SUPABASE_ANON_KEY ||
                             process.env.SUPABASE_PUBLISHABLE_KEY ||
                             process.env.VITE_SUPABASE_ANON_KEY;
  
  // Silently return null if not configured - no errors, just fallback to file system
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

