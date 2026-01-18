import { ProxyFactory } from "@/lib/proxy-chain/types";
import { isGuestRoute } from "@/utils";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export const withGuestGuard: ProxyFactory = (next) => {
  return async (request, event) => {
    const pathname = request.nextUrl.pathname;

    if (!isGuestRoute(pathname)) {
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

    let user = null;

    try {
      const { data, error } = await supabase.auth.getClaims();
      if (!error) {
        user = data?.claims;
      }
    } catch {
      user = null;
    }

    if (user) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const response = await next(request, event);

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value);
    });

    return response;
  };
};
