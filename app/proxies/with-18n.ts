import { ProxyFactory } from "@/lib/proxy-chain/types";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export const with18n: ProxyFactory = (next) => {
  return async (request, event) => {
    const childResponse = await next(request, event);

    if (
      childResponse.status >= 300 &&
      childResponse.status < 400 &&
      childResponse.headers.get("Location")
    ) {
      return childResponse;
    }

    const intlMiddleware = createMiddleware(routing);
    const intlResponse = await intlMiddleware(request);

    childResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") return; // Cookies handled separately
      intlResponse.headers.set(key, value);
    });

    childResponse.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });

    return intlResponse;
  };
};
