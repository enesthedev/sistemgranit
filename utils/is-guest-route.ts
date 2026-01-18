import { GUEST_ROUTES } from "@/routes";

export function isGuestRoute(pathname: string): boolean {
  return GUEST_ROUTES.some((route) => pathname.startsWith(route));
}
