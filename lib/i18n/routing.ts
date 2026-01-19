import { defineRouting } from "next-intl/routing";
import { pathnames } from "@/lib/routes/pathnames";

export const routing = defineRouting({
  locales: ["tr"],
  defaultLocale: "tr",
  pathnames,
  localePrefix: "as-needed",
});

export type Pathnames = typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
