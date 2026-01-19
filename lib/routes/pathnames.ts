import { ROUTES } from "./config";

export const pathnames = {
  [ROUTES.HOME]: "/",

  [ROUTES.AUTH.CONFIRM]: "/auth/confirm",
  [ROUTES.AUTH.ERROR]: "/auth/error",
  [ROUTES.AUTH.UPDATE_PASSWORD]: {
    en: "/auth/update-password",
    tr: "/auth/sifre-guncelle",
  },

  [ROUTES.GUEST.SIGN_IN]: {
    en: "/sign-in",
    tr: "/giris-yap",
  },
  [ROUTES.GUEST.SIGN_UP_SUCCESS]: {
    en: "/sign-up-success",
    tr: "/kayit-basarili",
  },
  [ROUTES.GUEST.FORGOT_PASSWORD]: {
    en: "/forgot-password",
    tr: "/sifremi-unuttum",
  },
  [ROUTES.GUEST.ONBOARDING]: {
    en: "/onboarding",
    tr: "/karsilama",
  },

  [ROUTES.DASHBOARD]: {
    en: "/dashboard",
    tr: "/panel",
  },
  [ROUTES.ANALYTICS]: {
    en: "/analytics",
    tr: "/analitik",
  },
  [ROUTES.PROJECTS]: {
    en: "/projects",
    tr: "/projeler",
  },
  [ROUTES.TEAM]: {
    en: "/team",
    tr: "/takim",
  },
  [ROUTES.SETTINGS]: {
    en: "/settings",
    tr: "/ayarlar",
  },

  [ROUTES.DOCUMENTS.DATA_LIBRARY]: {
    en: "/data-library",
    tr: "/veri-kutuphanesi",
  },
  [ROUTES.DOCUMENTS.REPORTS]: {
    en: "/reports",
    tr: "/raporlar",
  },
  [ROUTES.DOCUMENTS.WORD_ASSISTANT]: {
    en: "/word-assistant",
    tr: "/kelime-asistani",
  },
} as const;

export type Pathnames = typeof pathnames;
