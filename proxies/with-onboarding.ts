import { getUsersCount } from '@/actions';
import { routing } from '@/lib/i18n/routing';
import { ProxyFactory } from '@/lib/proxy-chain/types';
import { NextResponse } from 'next/server';

export const withOnboarding: ProxyFactory = (next) => {
  return async (request, event) => {
    const pathname = request.nextUrl.pathname;
    const onboardingPaths = routing.pathnames['/onboarding'];

    // Check if current path is one of the localized onboarding paths or the base path
    const isOnboardingPath = pathname === '/onboarding' || Object.values(onboardingPaths).some((path) => pathname === path);

    console.log(pathname);

    if (isOnboardingPath) {
      return next(request, event);
    }

    const usersCount = await getUsersCount();
    if (usersCount === 0) {
      const url = request.nextUrl.clone();

      // Determine the best redirect path.
      // Since we don't handle locale negotiation here manually,
      // we redirect to the base /onboarding and let next-intl (in with18n) handle the localization redirect.
      url.pathname = '/onboarding';

      const response = NextResponse.redirect(url);

      request.cookies.getAll().forEach((cookie) => {
        if (cookie.name.startsWith('sb-')) {
          response.cookies.delete(cookie.name);
        }
      });

      return response;
    }

    return next(request, event);
  };
};
