import { ProxyFactory } from "@/lib/proxy-chain/types";

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const withAuthGuard: ProxyFactory = (next) => {
  return async (request, event) => {
    const pathname = request.nextUrl.pathname;

    // Public routes logic should be handled by isPublicRoute if defined,
    // or just checking if it is NOT a guest route.
    // However, guard usually protects private routes.
    // If it's a guest route (login/register), we don't block access here (handled by guest guard to redirect IF logged in).
    // If it's public (landing), we don't block.
    // So we only block if it is NOT guest and NOT public?
    // The original code checked: if (isPublicRoute || isGuestRoute) return next.

    // Assuming isPublicRoute import exists or logic is similar.
    // Let's import isPublicRoute as well to match original.
    const { isPublicRoute, isGuestRoute } = await import("@/app/routes");

    if (isPublicRoute(pathname) || isGuestRoute(pathname)) {
      return next(request, event);
    }

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/sign-in";
      return NextResponse.redirect(url);
    }

    return next(request, event);
  };
};
