import { PUBLIC_ROUTES } from '@/routes';

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route);
}
