import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr'],
  defaultLocale: 'tr',
  pathnames: {
    '/': '/',
    '/onboarding': {
      en: '/onboarding',
      tr: '/karsilama',
    },
    '/sign-in': {
      tr: '/giris-yap',
    },
  },
  localePrefix: 'as-needed',
});

export type Pathnames = typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
