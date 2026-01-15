import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isProtectedRoute } from "@/lib/routes";
import { createAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env";

async function checkHasUsers(): Promise<boolean> {
  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });

    if (error) {
      console.error("Error checking users in middleware:", error);
      return true;
    }

    return (data?.users?.length ?? 0) > 0;
  } catch (error) {
    console.error("Error in checkHasUsers:", error);
    return true;
  }
}

export async function supabaseProxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    if (pathname === "/") {
      const hasUsers = await checkHasUsers();
      if (!hasUsers) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
      }
    }

    if (isProtectedRoute(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  if (pathname.startsWith("/onboarding")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
