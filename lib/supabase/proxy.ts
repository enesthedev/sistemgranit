import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { hasEnvVars } from "@/utils";
import { ProxyFactory } from "@/lib/proxy-chain/types";

export const withSupabaseSession: ProxyFactory = (next) => {
  return async (request, event) => {
    if (!hasEnvVars) {
      return next(request, event);
    }

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

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (
      request.nextUrl.pathname !== "/" &&
      !user &&
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/auth")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    const response = await next(request, event);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value);
    });

    return response;
  };
};
