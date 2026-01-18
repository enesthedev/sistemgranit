import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Database tiplerini temsil eder.
 * Gerçek tipler için Supabase CLI kullanın:
 * bunx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
 */
export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

export type TypedSupabaseClient = SupabaseClient<Database>;
