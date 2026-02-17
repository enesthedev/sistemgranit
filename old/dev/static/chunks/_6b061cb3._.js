(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/analytics/fingerprint.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateVisitorId",
    ()=>generateVisitorId,
    "getVisitorId",
    ()=>getVisitorId
]);
async function generateVisitorId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const components = [
        navigator.userAgent,
        navigator.language,
        screen.width.toString(),
        screen.height.toString(),
        screen.colorDepth.toString(),
        new Date().getTimezoneOffset().toString(),
        (navigator.hardwareConcurrency || 0).toString(),
        (navigator.maxTouchPoints || 0).toString()
    ];
    const fingerprint = components.join("|");
    const encoder = new TextEncoder();
    const data = encoder.encode(fingerprint);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b)=>b.toString(16).padStart(2, "0")).join("");
}
let cachedVisitorId = null;
async function getVisitorId() {
    if (cachedVisitorId) return cachedVisitorId;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/analytics/session.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPageCount",
    ()=>getPageCount,
    "getSessionDuration",
    ()=>getSessionDuration,
    "getSessionStart",
    ()=>getSessionStart,
    "getSessionState",
    ()=>getSessionState,
    "incrementPageCount",
    ()=>incrementPageCount
]);
const SESSION_KEY = "sg_session_id";
const SESSION_START_KEY = "sg_session_start";
const LAST_ACTIVITY_KEY = "sg_last_activity";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 dakika
function getSessionState() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const now = Date.now();
    const lastActivity = parseInt(sessionStorage.getItem(LAST_ACTIVITY_KEY) || "0");
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    let isNew = false;
    if (sessionId && now - lastActivity > SESSION_TIMEOUT) {
        sessionId = null;
    }
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(SESSION_KEY, sessionId);
        sessionStorage.setItem(SESSION_START_KEY, now.toString());
        sessionStorage.setItem("sg_page_count", "0");
        isNew = true;
    }
    sessionStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    return {
        sessionId,
        isNew
    };
}
function getSessionStart() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return parseInt(sessionStorage.getItem(SESSION_START_KEY) || Date.now().toString());
}
function getSessionDuration() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const start = getSessionStart();
    return Math.round((Date.now() - start) / 1000);
}
function getPageCount() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const count = sessionStorage.getItem("sg_page_count");
    return count ? parseInt(count) : 0;
}
function incrementPageCount() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const newCount = getPageCount() + 1;
    sessionStorage.setItem("sg_page_count", newCount.toString());
    return newCount;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/analytics/parser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReferrerDomain",
    ()=>getReferrerDomain,
    "parseUserAgent",
    ()=>parseUserAgent
]);
function parseUserAgent(userAgent) {
    const ua = userAgent.toLowerCase();
    let deviceType = "desktop";
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
    return {
        deviceType,
        browser,
        browserVersion,
        os,
        osVersion
    };
}
function getReferrerDomain(referrer) {
    if (!referrer) return null;
    try {
        const url = new URL(referrer);
        return url.hostname;
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/analytics/data:b06348 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logPageView",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"704f1b92c7a32a1143fcfc47d8133bc9306b58942e":"logPageView"},"actions/analytics/track.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("704f1b92c7a32a1143fcfc47d8133bc9306b58942e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "logPageView");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdHJhY2sudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgUGFnZVZpZXdEYXRhLCBFdmVudERhdGEsIFNlc3Npb25EYXRhIH0gZnJvbSBcIkAvbGliL2FuYWx5dGljcy90eXBlc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nUGFnZVZpZXcoXG4gIGRhdGE6IFBhZ2VWaWV3RGF0YSxcbiAgc2Vzc2lvbkRhdGE/OiBQYXJ0aWFsPFNlc3Npb25EYXRhPixcbiAgaXNOZXdTZXNzaW9uOiBib29sZWFuID0gZmFsc2UsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICB0cnkge1xuICAgIC8vIDEuIExvZyBQYWdlIFZpZXdcbiAgICBjb25zdCB7IGVycm9yOiBwdkVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwicGFnZV92aWV3c1wiKS5pbnNlcnQoZGF0YSk7XG4gICAgaWYgKHB2RXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJbU2VydmVyIEFjdGlvbl0gUGFnZSB2aWV3IGluc2VydCBmYWlsZWQ6XCIsIHB2RXJyb3IpO1xuICAgIH1cblxuICAgIC8vIDIuIEhhbmRsZSBTZXNzaW9uXG4gICAgaWYgKHNlc3Npb25EYXRhKSB7XG4gICAgICBpZiAoaXNOZXdTZXNzaW9uKSB7XG4gICAgICAgIC8vIENyZWF0ZSBuZXcgc2Vzc2lvblxuICAgICAgICBjb25zdCB7IGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzZXNzaW9uc1wiKVxuICAgICAgICAgIC5pbnNlcnQoc2Vzc2lvbkRhdGEgYXMgYW55KTtcbiAgICAgICAgaWYgKHNlc3Npb25FcnJvcilcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW1NlcnZlciBBY3Rpb25dIFNlc3Npb24gaW5zZXJ0IGZhaWxlZDpcIiwgc2Vzc2lvbkVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBzZXNzaW9uXG4gICAgICAgIGNvbnN0IHsgaWQsIC4uLnVwZGF0ZURhdGEgfSA9IHNlc3Npb25EYXRhO1xuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgIGNvbnN0IHsgZXJyb3I6IHVwZGF0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgICAgLmZyb20oXCJzZXNzaW9uc1wiKVxuICAgICAgICAgICAgLnVwZGF0ZSh1cGRhdGVEYXRhKVxuICAgICAgICAgICAgLmVxKFwiaWRcIiwgaWQpO1xuXG4gICAgICAgICAgaWYgKHVwZGF0ZUVycm9yKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbU2VydmVyIEFjdGlvbl0gU2Vzc2lvbiB1cGRhdGUgZmFpbGVkOlwiLFxuICAgICAgICAgICAgICB1cGRhdGVFcnJvcixcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltTZXJ2ZXIgQWN0aW9uXSBBbmFseXRpY3MgZXJyb3I6XCIsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nRXZlbnQoZGF0YTogRXZlbnREYXRhKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwiYW5hbHl0aWNzX2V2ZW50c1wiKVxuICAgICAgLmluc2VydChkYXRhIGFzIGFueSk7XG4gICAgaWYgKGVycm9yKSBjb25zb2xlLmVycm9yKFwiW1NlcnZlciBBY3Rpb25dIEV2ZW50IGluc2VydCBmYWlsZWQ6XCIsIGVycm9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbU2VydmVyIEFjdGlvbl0gRXZlbnQgbG9nIGVycm9yOlwiLCBlKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIwUkFLc0Isd0xBQUEifQ==
}),
"[project]/actions/analytics/data:f5bacf [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logEvent",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40139ff6f2586c9ce61eb8d197a3194f55cb6697d8":"logEvent"},"actions/analytics/track.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40139ff6f2586c9ce61eb8d197a3194f55cb6697d8", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "logEvent");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vdHJhY2sudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc2VydmVyXCI7XG5cbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL3N1cGFiYXNlL3NlcnZlclwiO1xuaW1wb3J0IHsgUGFnZVZpZXdEYXRhLCBFdmVudERhdGEsIFNlc3Npb25EYXRhIH0gZnJvbSBcIkAvbGliL2FuYWx5dGljcy90eXBlc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nUGFnZVZpZXcoXG4gIGRhdGE6IFBhZ2VWaWV3RGF0YSxcbiAgc2Vzc2lvbkRhdGE/OiBQYXJ0aWFsPFNlc3Npb25EYXRhPixcbiAgaXNOZXdTZXNzaW9uOiBib29sZWFuID0gZmFsc2UsXG4pIHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICB0cnkge1xuICAgIC8vIDEuIExvZyBQYWdlIFZpZXdcbiAgICBjb25zdCB7IGVycm9yOiBwdkVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5mcm9tKFwicGFnZV92aWV3c1wiKS5pbnNlcnQoZGF0YSk7XG4gICAgaWYgKHB2RXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJbU2VydmVyIEFjdGlvbl0gUGFnZSB2aWV3IGluc2VydCBmYWlsZWQ6XCIsIHB2RXJyb3IpO1xuICAgIH1cblxuICAgIC8vIDIuIEhhbmRsZSBTZXNzaW9uXG4gICAgaWYgKHNlc3Npb25EYXRhKSB7XG4gICAgICBpZiAoaXNOZXdTZXNzaW9uKSB7XG4gICAgICAgIC8vIENyZWF0ZSBuZXcgc2Vzc2lvblxuICAgICAgICBjb25zdCB7IGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oXCJzZXNzaW9uc1wiKVxuICAgICAgICAgIC5pbnNlcnQoc2Vzc2lvbkRhdGEgYXMgYW55KTtcbiAgICAgICAgaWYgKHNlc3Npb25FcnJvcilcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW1NlcnZlciBBY3Rpb25dIFNlc3Npb24gaW5zZXJ0IGZhaWxlZDpcIiwgc2Vzc2lvbkVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVwZGF0ZSBleGlzdGluZyBzZXNzaW9uXG4gICAgICAgIGNvbnN0IHsgaWQsIC4uLnVwZGF0ZURhdGEgfSA9IHNlc3Npb25EYXRhO1xuXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgIGNvbnN0IHsgZXJyb3I6IHVwZGF0ZUVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgICAgICAgLmZyb20oXCJzZXNzaW9uc1wiKVxuICAgICAgICAgICAgLnVwZGF0ZSh1cGRhdGVEYXRhKVxuICAgICAgICAgICAgLmVxKFwiaWRcIiwgaWQpO1xuXG4gICAgICAgICAgaWYgKHVwZGF0ZUVycm9yKVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJbU2VydmVyIEFjdGlvbl0gU2Vzc2lvbiB1cGRhdGUgZmFpbGVkOlwiLFxuICAgICAgICAgICAgICB1cGRhdGVFcnJvcixcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltTZXJ2ZXIgQWN0aW9uXSBBbmFseXRpY3MgZXJyb3I6XCIsIGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nRXZlbnQoZGF0YTogRXZlbnREYXRhKSB7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKFwiYW5hbHl0aWNzX2V2ZW50c1wiKVxuICAgICAgLmluc2VydChkYXRhIGFzIGFueSk7XG4gICAgaWYgKGVycm9yKSBjb25zb2xlLmVycm9yKFwiW1NlcnZlciBBY3Rpb25dIEV2ZW50IGluc2VydCBmYWlsZWQ6XCIsIGVycm9yKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbU2VydmVyIEFjdGlvbl0gRXZlbnQgbG9nIGVycm9yOlwiLCBlKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ1UkFtRHNCLHFMQUFBIn0=
}),
"[project]/lib/analytics/tracker.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isOptedOut",
    ()=>isOptedOut,
    "optIn",
    ()=>optIn,
    "optOut",
    ()=>optOut,
    "trackEvent",
    ()=>trackEvent,
    "trackPageView",
    ()=>trackPageView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$fingerprint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics/fingerprint.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics/parser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$data$3a$b06348__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/analytics/data:b06348 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$data$3a$f5bacf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/analytics/data:f5bacf [app-client] (ecmascript) <text/javascript>");
;
;
;
;
const OPT_OUT_KEY = "sg_analytics_optout";
const IGNORED_PREFIXES = [
    "/dashboard",
    "/panel",
    "/admin",
    "/auth"
];
function isOptedOut() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem(OPT_OUT_KEY) === "true";
}
function optOut() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(OPT_OUT_KEY, "true");
}
function optIn() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(OPT_OUT_KEY);
}
async function trackPageView(path, title) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (isOptedOut()) return;
    if (IGNORED_PREFIXES.some((prefix)=>path.startsWith(prefix))) return;
    try {
        const visitorId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$fingerprint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisitorId"])();
        const { sessionId, isNew } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSessionState"])();
        const deviceInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUserAgent"])(navigator.userAgent);
        const referrerDomain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getReferrerDomain"])(document.referrer);
        const pageViewData = {
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
            language: navigator.language
        };
        const pageCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["incrementPageCount"])();
        let sessionData;
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
                started_at: new Date().toISOString()
            };
        } else {
            sessionData = {
                id: sessionId,
                exit_page: path,
                page_count: pageCount,
                is_bounce: pageCount <= 1,
                duration_seconds: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSessionDuration"])(),
                ended_at: new Date().toISOString()
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$data$3a$b06348__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logPageView"])(pageViewData, sessionData, isNew);
    } catch (error) {
        console.error("[Analytics] Page view tracking failed:", error);
    }
}
async function trackEvent(eventName, eventData) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (isOptedOut()) return;
    try {
        const visitorId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$fingerprint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVisitorId"])();
        const { sessionId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSessionState"])();
        const event = {
            visitor_id: visitorId,
            session_id: sessionId,
            event_name: eventName,
            event_data: eventData || {},
            page_path: window.location.pathname
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$data$3a$f5bacf__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["logEvent"])(event);
    } catch (error) {
        console.error("[Analytics] Event tracking failed:", error);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/analytics/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics/tracker.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$fingerprint$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics/fingerprint.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics/session.ts [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/analytics-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticsProvider",
    ()=>AnalyticsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/analytics/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics/tracker.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function AnalyticsProvider({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticsProvider.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2f$tracker$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPageView"])(pathname);
        }
    }["AnalyticsProvider.useEffect"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AnalyticsProvider, "V/ldUoOTYUs0Cb2F6bbxKSn7KxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AnalyticsProvider;
var _c;
__turbopack_context__.k.register(_c, "AnalyticsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This file must be bundled in the app's client layer, it shouldn't be directly
// imported by the server.
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    callServer: null,
    createServerReference: null,
    findSourceMapURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    callServer: function() {
        return _appcallserver.callServer;
    },
    createServerReference: function() {
        return _client.createServerReference;
    },
    findSourceMapURL: function() {
        return _appfindsourcemapurl.findSourceMapURL;
    }
});
const _appcallserver = __turbopack_context__.r("[project]/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)");
const _appfindsourcemapurl = __turbopack_context__.r("[project]/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)");
const _client = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)"); //# sourceMappingURL=action-client-wrapper.js.map
}),
]);

//# sourceMappingURL=_6b061cb3._.js.map