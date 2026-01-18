import { NextResponse } from "next/server";
import { hasEnvVars } from "@/utils";
import { ProxyFactory } from "@/lib/proxy-chain/types";
import { getUsersCount } from "@/actions";

const ONBOARDING_PATH = "/onboarding";

export const withOnboarding: ProxyFactory = (next) => {
  return async (request, event) => {
    if (!hasEnvVars) {
      return next(request, event);
    }

    if (request.nextUrl.pathname === ONBOARDING_PATH) {
      return next(request, event);
    }

    const usersCount = await getUsersCount();

    if (usersCount === 0) {
      const url = request.nextUrl.clone();
      url.pathname = ONBOARDING_PATH;

      const response = NextResponse.redirect(url);

      request.cookies.getAll().forEach((cookie) => {
        if (cookie.name.startsWith("sb-")) {
          response.cookies.delete(cookie.name);
        }
      });

      return response;
    }

    return next(request, event);
  };
};
