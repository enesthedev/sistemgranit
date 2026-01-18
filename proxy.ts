import { chain } from "@/lib/proxy-chain";
import {
  withOnboarding,
  withSupabaseSession,
  withGuestGuard,
  withAuthGuard,
} from "@/proxies";
import { type NextFetchEvent, type NextRequest } from "next/server";

const proxies = [
  withOnboarding,
  withSupabaseSession,
  withGuestGuard,
  withAuthGuard,
];

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  return chain(proxies)(request, event);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
