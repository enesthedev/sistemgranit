export const ROUTES = {
  HOME: "/",

  AUTH: {
    CONFIRM: "/auth/confirm",
    ERROR: "/auth/error",
    UPDATE_PASSWORD: "/auth/update-password",
  },

  GUEST: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP_SUCCESS: "/auth/sign-up-success",
    FORGOT_PASSWORD: "/auth/forgot-password",
    ONBOARDING: "/onboarding",
  },

  DASHBOARD: "/dashboard",
  ANALYTICS: "/analytics",
  PROJECTS: "/projects",
  TEAM: "/team",
  SETTINGS: "/settings",

  DOCUMENTS: {
    DATA_LIBRARY: "/data-library",
    REPORTS: "/reports",
    WORD_ASSISTANT: "/word-assistant",
  },
} as const;

export type Routes = typeof ROUTES;
