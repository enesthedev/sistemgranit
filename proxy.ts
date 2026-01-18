import { chain } from "@/lib/proxy-chain";
import { withOnboarding } from "@/lib/auth/with-onboarding";
import { withSupabaseSession } from "@/lib/supabase/with-supabase-session";
import { type NextFetchEvent, type NextRequest } from "next/server";

const proxies = [withOnboarding, withSupabaseSession];

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  return chain(proxies)(request, event);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
