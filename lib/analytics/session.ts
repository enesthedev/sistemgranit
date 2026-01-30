const SESSION_KEY = "sg_session_id";
const SESSION_START_KEY = "sg_session_start";
const LAST_ACTIVITY_KEY = "sg_last_activity";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 dakika

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  const now = Date.now();
  const lastActivity = parseInt(
    sessionStorage.getItem(LAST_ACTIVITY_KEY) || "0",
  );
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (sessionId && now - lastActivity > SESSION_TIMEOUT) {
    sessionId = null;
  }

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, sessionId);
    sessionStorage.setItem(SESSION_START_KEY, now.toString());
  }

  sessionStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
  return sessionId;
}

export function getSessionStart(): number {
  if (typeof window === "undefined") return Date.now();
  return parseInt(
    sessionStorage.getItem(SESSION_START_KEY) || Date.now().toString(),
  );
}

export function getSessionDuration(): number {
  if (typeof window === "undefined") return 0;
  const start = getSessionStart();
  return Math.round((Date.now() - start) / 1000);
}

export function isNewSession(): boolean {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem(SESSION_KEY);
}

export function getPageCount(): number {
  if (typeof window === "undefined") return 0;
  const count = sessionStorage.getItem("sg_page_count");
  return count ? parseInt(count) : 0;
}

export function incrementPageCount(): number {
  if (typeof window === "undefined") return 0;
  const newCount = getPageCount() + 1;
  sessionStorage.setItem("sg_page_count", newCount.toString());
  return newCount;
}
