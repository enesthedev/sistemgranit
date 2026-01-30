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
  PROJECTS: "/projects",
  TEAM: "/team",
  SETTINGS: "/settings",

  PRODUCTS: {
    LIST: "/dashboard/products",
    NEW: "/dashboard/products/new",
    EDIT: "/dashboard/products/[id]",
  },

  DOCUMENTS: {
    DATA_LIBRARY: "/data-library",
    REPORTS: "/reports",
    WORD_ASSISTANT: "/word-assistant",
  },

  PRODUCT_DETAIL: "/products/[slug]",
} as const;

export type Routes = typeof ROUTES;
