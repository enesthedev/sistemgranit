import { createBrowserClient } from "@supabase/ssr";
import { getVisitorId } from "./fingerprint";
import {
  getOrCreateSessionId,
  getSessionDuration,
  incrementPageCount,
  isNewSession,
} from "./session";
import { parseUserAgent, getReferrerDomain } from "./parser";
import type { PageViewData, EventData } from "./types";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

const OPT_OUT_KEY = "sg_analytics_optout";

export function isOptedOut(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(OPT_OUT_KEY) === "true";
}

export function optOut(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(OPT_OUT_KEY, "true");
}

export function optIn(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(OPT_OUT_KEY);
}

export async function trackPageView(
  path: string,
  title?: string,
): Promise<void> {
  if (typeof window === "undefined") return;
  if (isOptedOut()) return;

  try {
    const visitorId = await getVisitorId();
    const sessionId = getOrCreateSessionId();
    const isNew = isNewSession();
    const deviceInfo = parseUserAgent(navigator.userAgent);
    const referrerDomain = getReferrerDomain(document.referrer);

    const pageViewData: PageViewData = {
      visitor_id: visitorId,
      session_id: sessionId,
      page_path: path,
      page_title: title || document.title,
      referrer: document.referrer || undefined,
      referrer_domain: referrerDomain || undefined,
      user_agent: navigator.userAgent,
      device_type: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      browser_version: deviceInfo.browserVersion,
      os: deviceInfo.os,
      os_version: deviceInfo.osVersion,
      screen_width: screen.width,
      screen_height: screen.height,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
    };

    await supabase.from("page_views").insert(pageViewData);

    const pageCount = incrementPageCount();

    if (isNew) {
      await supabase.from("sessions").insert({
        id: sessionId,
        visitor_id: visitorId,
        entry_page: path,
        referrer: document.referrer || undefined,
        referrer_domain: referrerDomain || undefined,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
      });
    } else {
      await supabase
        .from("sessions")
        .update({
          exit_page: path,
          page_count: pageCount,
          is_bounce: pageCount <= 1,
          duration_seconds: getSessionDuration(),
          ended_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }
  } catch (error) {
    console.error("[Analytics] Page view tracking failed:", error);
  }
}

export async function trackEvent(
  eventName: string,
  eventData?: Record<string, unknown>,
): Promise<void> {
  if (typeof window === "undefined") return;
  if (isOptedOut()) return;

  try {
    const visitorId = await getVisitorId();
    const sessionId = getOrCreateSessionId();

    const event: EventData = {
      visitor_id: visitorId,
      session_id: sessionId,
      event_name: eventName,
      event_data: eventData || {},
      page_path: window.location.pathname,
    };

    await supabase.from("analytics_events").insert(event);
  } catch (error) {
    console.error("[Analytics] Event tracking failed:", error);
  }
}
