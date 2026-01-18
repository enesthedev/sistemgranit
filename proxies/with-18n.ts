import createMiddleware from "next-intl/middleware";
import { routing } from "../lib/i18n/routing";
import { ProxyFactory } from "@/lib/proxy-chain/types";

export const with18n: ProxyFactory = () => {
  return async (request) => {
    return createMiddleware(routing)(request);
  };
};
