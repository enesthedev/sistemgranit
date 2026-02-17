export async function generateVisitorId(): Promise<string> {
  if (typeof window === "undefined") return "";

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width.toString(),
    screen.height.toString(),
    screen.colorDepth.toString(),
    new Date().getTimezoneOffset().toString(),
    (navigator.hardwareConcurrency || 0).toString(),
    (navigator.maxTouchPoints || 0).toString(),
  ];

  const fingerprint = components.join("|");
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprint);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

let cachedVisitorId: string | null = null;

export async function getVisitorId(): Promise<string> {
  if (cachedVisitorId) return cachedVisitorId;

  if (typeof window === "undefined") return "";

  const stored = localStorage.getItem("sg_visitor_id");
  if (stored) {
    cachedVisitorId = stored;
    return stored;
  }

  const newId = await generateVisitorId();
  localStorage.setItem("sg_visitor_id", newId);
  cachedVisitorId = newId;
  return newId;
}
