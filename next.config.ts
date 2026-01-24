import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { env } from "./app/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(env.NEXT_PUBLIC_SUPABASE_URL + "/**")],
  },
  cacheComponents: true,
};

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

export default withNextIntl(nextConfig);
