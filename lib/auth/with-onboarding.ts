import { NextResponse } from "next/server";
import { hasEnvVars } from "@/utils";
import { ProxyFactory } from "@/lib/proxy-chain/types";
import { createAdminClient } from "@/lib/supabase/admin";

const ONBOARDING_PATH = "/onboarding";

let cachedHasUsers: boolean | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 60 * 1000;

async function checkHasUsers(): Promise<boolean> {
  const now = Date.now();

  if (cachedHasUsers !== null && now - cacheTimestamp < CACHE_DURATION_MS) {
    return cachedHasUsers;
  }

  try {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1,
    });

    if (error) {
      console.error("Error checking users:", error.message);
      return true;
    }

    cachedHasUsers = data?.users && data.users.length > 0;
    cacheTimestamp = now;

    return cachedHasUsers;
  } catch {
    return true;
  }
}

export const withOnboarding: ProxyFactory = (next) => {
  return async (request, event) => {
    if (!hasEnvVars) {
      return next(request, event);
    }

    if (request.nextUrl.pathname === ONBOARDING_PATH) {
      return next(request, event);
    }

    const hasUsers = await checkHasUsers();

    if (!hasUsers) {
      const url = request.nextUrl.clone();
      url.pathname = ONBOARDING_PATH;
      return NextResponse.redirect(url);
    }

    return next(request, event);
  };
};
