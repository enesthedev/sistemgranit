import { getUsersCount } from "@/actions";
import { routing } from "@/lib/i18n/routing";
import { ProxyFactory } from "@/lib/proxy-chain/types";
import { NextResponse } from "next/server";

export const withOnboarding: ProxyFactory = (next) => {
  return async (request, event) => {
    const pathname = request.nextUrl.pathname;
    const onboardingPaths = routing.pathnames["/onboarding"];

    // Check if current path is one of the localized onboarding paths or the base path
    const isOnboardingPath =
      pathname === "/onboarding" ||
      Object.values(onboardingPaths).some((path) => pathname === path);

    const usersCount = await getUsersCount();

    // If there is an error checking users (usersCount is null), assume we are in a temporary failure state.
    // Allow the request to proceed to avoid blocking the app or redirecting loop.
    // If it was an onboarding path, we let it pass (UI might handle or show error).
    // If it was a normal path, we let it pass.
    if (usersCount === null) {
      return next(request, event);
    }

    // If we are on an onboarding path but users exist, redirect to home.
    if (isOnboardingPath && usersCount > 0) {
      const url = request.nextUrl.clone();
      url.pathname = "/"; // Redirect to root (or login if handled by another middleware)
      return NextResponse.redirect(url);
    }

    // If users exist, just proceed.
    // (This block is reached if: !isOnboardingPath OR (isOnboardingPath && usersCount === 0))
    // But if (isOnboardingPath && usersCount === 0), we should just proceed (allow onboarding).
    // So we only care if !isOnboardingPath and usersCount === 0.

    if (!isOnboardingPath && usersCount === 0) {
      const url = request.nextUrl.clone();

      // Determine the best redirect path.
      // Since we don't handle locale negotiation here manually,
      // we redirect to the base /onboarding and let next-intl (in with18n) handle the localization redirect.
      url.pathname = "/onboarding";

      const response = NextResponse.redirect(url);

      return response;
    }

    return next(request, event);
  };
};
