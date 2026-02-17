import { ProxyFactory } from "@/lib/proxy-chain/types";
import { isGuestRoute } from "@/app/routes";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const withGuestGuard: ProxyFactory = (next) => {
  return async (request, event) => {
    const pathname = request.nextUrl.pathname;

    if (!isGuestRoute(pathname)) {
      return next(request, event);
    }

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return next(request, event);
  };
};
