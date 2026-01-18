import { env } from '@/lib/env';
import { createClient } from '@supabase/supabase-js';
import type { Database, TypedSupabaseClient } from './types';

/**
 * Service Role (Admin) Supabase client oluşturur.
 *
 * @warning Bu client RLS'i bypass eder. Sadece güvenli server-side
 * ortamlarda kullanın. Asla client-side'da import etmeyin!
 *
 * @returns Typed Supabase admin client
 *
 * @example
 * ```ts
 * const admin = createAdminClient();
 * await admin.from('users').delete().eq('id', userId);
 * ```
 */
export function createAdminClient(): TypedSupabaseClient {
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_OR_SECRET_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
