"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "./config";

type RouteValue = string | { [key: string]: RouteValue };

function flattenRoutes(
  obj: Record<string, RouteValue>,
  prefix = "",
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      result[newKey] = value;
    } else if (typeof value === "object" && value !== null) {
      Object.assign(
        result,
        flattenRoutes(value as Record<string, RouteValue>, newKey),
      );
    }
  }

  return result;
}

const flatRoutes = flattenRoutes(
  ROUTES as unknown as Record<string, RouteValue>,
);

export function useRoute() {
  const pathname = usePathname();

  const isActive = (route: string, exact = false): boolean => {
    if (exact) {
      return pathname === route;
    }
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  const getRouteByKey = (key: string): string | undefined => {
    return flatRoutes[key];
  };

  const createLink = (
    route: string,
    params?: Record<string, string>,
  ): string => {
    if (!params) return route;

    let result = route;
    for (const [key, value] of Object.entries(params)) {
      result = result.replace(`[${key}]`, value);
    }
    return result;
  };

  return {
    pathname,
    isActive,
    getRouteByKey,
    createLink,
    routes: ROUTES,
  };
}
