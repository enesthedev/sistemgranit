import { chain } from "@/lib/proxy-chain";
import { withSupabaseSession } from "@/lib/supabase/proxy";
import { type NextFetchEvent, type NextRequest } from "next/server";

const proxies = [withSupabaseSession];

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  return chain(proxies)(request, event);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
