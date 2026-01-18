export const GUEST_ROUTES = [
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/sign-up-success",
  "/onboarding",
];

export const PUBLIC_ROUTES = [
  "/",
  "/auth/confirm",
  "/auth/error",
  "/auth/update-password",
];

export function isGuestRoute(pathname: string): boolean {
  return GUEST_ROUTES.some((route) => pathname.startsWith(route));
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route);
}
