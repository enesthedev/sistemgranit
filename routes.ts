import { getLocalizedPaths } from './lib/i18n/utils/get-localized-paths';

// Routes that can be accessed by authenticated users but perform guest-only logic
// (or are specific to flow, though usually guest routes are for unauthenticated users)
const GUEST_ROUTE_KEYS = ['/auth/sign-in', '/auth/forgot-password', '/auth/sign-up-success', '/onboarding'];

const PUBLIC_ROUTE_KEYS = ['/', '/auth/confirm', '/auth/error', '/auth/update-password'];

export const GUEST_ROUTES = GUEST_ROUTE_KEYS.flatMap(getLocalizedPaths);
export const PUBLIC_ROUTES = PUBLIC_ROUTE_KEYS.flatMap(getLocalizedPaths);
