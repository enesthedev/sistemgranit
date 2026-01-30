import type { DeviceInfo } from "./types";

export function parseUserAgent(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase();

  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = "tablet";
  } else if (/mobile|iphone|ipod|android.*mobile/i.test(ua)) {
    deviceType = "mobile";
  }

  let browser = "Unknown";
  let browserVersion = "";

  if (/edg\//i.test(ua)) {
    browser = "Edge";
    const match = ua.match(/edg\/(\d+(\.\d+)?)/i);
    browserVersion = match ? match[1] : "";
  } else if (/chrome/i.test(ua) && !/chromium/i.test(ua)) {
    browser = "Chrome";
    const match = ua.match(/chrome\/(\d+(\.\d+)?)/i);
    browserVersion = match ? match[1] : "";
  } else if (/firefox/i.test(ua)) {
    browser = "Firefox";
    const match = ua.match(/firefox\/(\d+(\.\d+)?)/i);
    browserVersion = match ? match[1] : "";
  } else if (/safari/i.test(ua) && !/chrome/i.test(ua)) {
    browser = "Safari";
    const match = ua.match(/version\/(\d+(\.\d+)?)/i);
    browserVersion = match ? match[1] : "";
  } else if (/opera|opr/i.test(ua)) {
    browser = "Opera";
    const match = ua.match(/(?:opera|opr)\/(\d+(\.\d+)?)/i);
    browserVersion = match ? match[1] : "";
  }

  let os = "Unknown";
  let osVersion = "";

  if (/windows/i.test(ua)) {
    os = "Windows";
    if (/windows nt 10/i.test(ua)) osVersion = "10";
    else if (/windows nt 11/i.test(ua)) osVersion = "11";
    else if (/windows nt 6.3/i.test(ua)) osVersion = "8.1";
    else if (/windows nt 6.2/i.test(ua)) osVersion = "8";
    else if (/windows nt 6.1/i.test(ua)) osVersion = "7";
  } else if (/macintosh|mac os x/i.test(ua)) {
    os = "macOS";
    const match = ua.match(/mac os x (\d+[._]\d+)/i);
    osVersion = match ? match[1].replace("_", ".") : "";
  } else if (/android/i.test(ua)) {
    os = "Android";
    const match = ua.match(/android (\d+(\.\d+)?)/i);
    osVersion = match ? match[1] : "";
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    os = "iOS";
    const match = ua.match(/os (\d+[._]\d+)/i);
    osVersion = match ? match[1].replace("_", ".") : "";
  } else if (/linux/i.test(ua)) {
    os = "Linux";
  }

  return { deviceType, browser, browserVersion, os, osVersion };
}

export function getReferrerDomain(referrer: string): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    return url.hostname;
  } catch {
    return null;
  }
}
