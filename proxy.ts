import { chain } from "@/lib/proxy-chain";
import {
  with18n,
  withOnboarding,
  withSupabaseSession,
  withGuestGuard,
  withAuthGuard,
} from "@/proxies";
import { type NextFetchEvent, type NextRequest } from "next/server";

const proxies = [
  with18n,
  withOnboarding,
  withSupabaseSession,
  withGuestGuard,
  withAuthGuard,
];

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  return chain(proxies)(request, event);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
