"use client";

import { useCallback } from "react";
import {
  trackEvent as trackEventImpl,
  trackPageView as trackPageViewImpl,
} from "@/lib/analytics";

export function useAnalytics() {
  const trackEvent = useCallback(
    (name: string, data?: Record<string, unknown>) => {
      trackEventImpl(name, data);
    },
    [],
  );

  const trackPageView = useCallback((path: string, title?: string) => {
    trackPageViewImpl(path, title);
  }, []);

  return { trackEvent, trackPageView };
}
