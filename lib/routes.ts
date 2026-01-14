export type RoutePolicy = "public" | "protected";

export interface RouteConfig {
  publicRoutes: string[];
  protectedRoutes: string[];
}

export const routeConfig: RouteConfig = {
  publicRoutes: ["/", "/auth", "/onboarding", "/api"],
  protectedRoutes: ["/dashboard", "/admin"],
};

export function isPublicRoute(pathname: string): boolean {
  return routeConfig.publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function isProtectedRoute(pathname: string): boolean {
  return routeConfig.protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function getRoutePolicy(pathname: string): RoutePolicy {
  if (isProtectedRoute(pathname)) return "protected";
  return "public";
}
