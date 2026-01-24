import { env } from "@/app/env";
import { createBrowserClient } from "@supabase/ssr";
import type { Database, TypedSupabaseClient } from "./types";

let client: TypedSupabaseClient | null = null;

/**
 * Browser-side Supabase client oluşturur (Singleton).
 * Client Components ("use client") için kullanılır.
 *
 * @returns Typed Supabase client
 *
 * @example
 * ```tsx
 * "use client";
 * const supabase = createClient();
 * const { data } = await supabase.auth.getUser();
 * ```
 */
export function createClient(): TypedSupabaseClient {
  if (client) return client;

  client = createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  return client;
}
