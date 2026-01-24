import { ProxyFactory } from "@/lib/proxy-chain/types";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export const withSupabaseSession: ProxyFactory = (next) => {
  return async (request, event) => {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    try {
      // Just call getClaims to trigger session refresh if needed
      await supabase.auth.getClaims();
    } catch {
      // ignore
    }

    // This middleware is responsible for refreshing the session.
    // The actual authentication checks are done in with-auth-guard.ts and with-guest-guard.ts

    const response = await next(request, event);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value);
    });

    return response;
  };
};
