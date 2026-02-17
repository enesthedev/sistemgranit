import { getVisitorId } from "./fingerprint";
import {
  getSessionState,
  getSessionDuration,
  incrementPageCount,
} from "./session";
import { parseUserAgent, getReferrerDomain } from "./parser";
import type { PageViewData, EventData, SessionData } from "./types";
import { logPageView, logEvent } from "@/actions/analytics/track";

const OPT_OUT_KEY = "sg_analytics_optout";
const IGNORED_PREFIXES = ["/dashboard", "/panel", "/admin", "/auth"];

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

  if (IGNORED_PREFIXES.some((prefix) => path.startsWith(prefix))) return;

  try {
    const visitorId = await getVisitorId();
    const { sessionId, isNew } = getSessionState();
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

    const pageCount = incrementPageCount();
    let sessionData: Partial<SessionData> | undefined;

    if (isNew) {
      sessionData = {
        id: sessionId,
        visitor_id: visitorId,
        entry_page: path,
        referrer: document.referrer || undefined,
        referrer_domain: referrerDomain || undefined,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        started_at: new Date().toISOString(),
      };
    } else {
      sessionData = {
        id: sessionId,
        exit_page: path,
        page_count: pageCount,
        is_bounce: pageCount <= 1,
        duration_seconds: getSessionDuration(),
        ended_at: new Date().toISOString(),
      };
    }

    await logPageView(pageViewData, sessionData, isNew);
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
    const { sessionId } = getSessionState();

    const event: EventData = {
      visitor_id: visitorId,
      session_id: sessionId,
      event_name: eventName,
      event_data: eventData || {},
      page_path: window.location.pathname,
    };

    await logEvent(event);
  } catch (error) {
    console.error("[Analytics] Event tracking failed:", error);
  }
}
