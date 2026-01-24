import { ROUTES } from "./config";
import { getLocalizedPaths } from "@/lib/i18n/utils/get-localized-paths";

const GUEST_ROUTE_KEYS = [
  ROUTES.GUEST.SIGN_IN,
  ROUTES.GUEST.SIGN_UP_SUCCESS,
  ROUTES.GUEST.FORGOT_PASSWORD,
  ROUTES.GUEST.ONBOARDING,
];

const PUBLIC_ROUTE_KEYS = [
  ROUTES.HOME,
  ROUTES.AUTH.CONFIRM,
  ROUTES.AUTH.ERROR,
  ROUTES.AUTH.UPDATE_PASSWORD,
];

const PROTECTED_ROUTE_KEYS = [
  ROUTES.DASHBOARD,
  ROUTES.ANALYTICS,
  ROUTES.PROJECTS,
  ROUTES.TEAM,
  ROUTES.SETTINGS,
  ROUTES.DOCUMENTS.DATA_LIBRARY,
  ROUTES.DOCUMENTS.REPORTS,
  ROUTES.DOCUMENTS.WORD_ASSISTANT,
];

export const GUEST_ROUTES = GUEST_ROUTE_KEYS.flatMap(getLocalizedPaths);
export const PUBLIC_ROUTES = PUBLIC_ROUTE_KEYS.flatMap(getLocalizedPaths);
export const PROTECTED_ROUTES = PROTECTED_ROUTE_KEYS.flatMap(getLocalizedPaths);

export function isGuestRoute(pathname: string): boolean {
  return GUEST_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
