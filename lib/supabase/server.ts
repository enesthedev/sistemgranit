import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import type { Database } from "./types";

/**
 * Server-side Supabase client oluşturur.
 * Server Components, Route Handlers ve Server Actions için kullanılır.
 *
 * @important Fluid compute kullanıyorsanız: Bu client'ı global bir değişkene
 * atamayın. Her fonksiyon içinde yeni bir client oluşturun.
 *
 * @returns Typed Supabase client
 *
 * @example
 * ```ts
 * const supabase = await createClient();
 * const { data } = await supabase.from('users').select('*');
 * ```
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // setAll method was called from a Server Component.
            // This can be ignored if you have proxy refreshing user sessions.
          }
        },
      },
    },
  );
}
