import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import "./app/env"; // Validate env vars on build

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        port: "",
      },
      // Allow any image from temporary blob storage or external sources if needed
      // but sticking to strict Vercel Blob for now
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

export default withNextIntl(nextConfig);
