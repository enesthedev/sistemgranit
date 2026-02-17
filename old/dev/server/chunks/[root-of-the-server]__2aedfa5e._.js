module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/proxy-chain/proxy-chain.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chain",
    ()=>chain
]);
// https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs
// https://github.com/jmarioste/next-middleware-guide/
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
;
function chain(functions = [], index = 0) {
    const current = functions[index];
    if (current) {
        const next = chain(functions, index + 1);
        return current(next);
    }
    return async (request)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
            request
        });
}
}),
"[project]/lib/proxy-chain/index.ts [middleware] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$proxy$2d$chain$2f$proxy$2d$chain$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/proxy-chain/proxy-chain.ts [middleware] (ecmascript)");
;
}),
"[project]/app/routes/config.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROUTES",
    ()=>ROUTES
]);
const ROUTES = {
    HOME: "/",
    AUTH: {
        CONFIRM: "/auth/confirm",
        ERROR: "/auth/error",
        UPDATE_PASSWORD: "/auth/update-password"
    },
    GUEST: {
        SIGN_IN: "/auth/sign-in",
        SIGN_UP_SUCCESS: "/auth/sign-up-success",
        FORGOT_PASSWORD: "/auth/forgot-password",
        ONBOARDING: "/onboarding"
    },
    DASHBOARD: "/dashboard",
    PROJECTS: "/projects",
    TEAM: "/team",
    SETTINGS: "/settings",
    PRODUCTS: {
        LIST: "/dashboard/products",
        NEW: "/dashboard/products/new",
        EDIT: "/dashboard/products/[id]"
    },
    CATEGORIES: {
        LIST: "/dashboard/categories",
        NEW: "/dashboard/categories/new",
        EDIT: "/dashboard/categories/[id]"
    },
    DOCUMENTS: {
        DATA_LIBRARY: "/data-library",
        REPORTS: "/reports",
        WORD_ASSISTANT: "/word-assistant"
    },
    PRODUCT_DETAIL: "/products/[slug]"
};
}),
"[project]/app/routes/pathnames.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pathnames",
    ()=>pathnames
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/config.ts [middleware] (ecmascript)");
;
const pathnames = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].HOME]: "/",
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.CONFIRM]: "/auth/confirm",
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.ERROR]: "/auth/error",
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.UPDATE_PASSWORD]: {
        en: "/auth/update-password",
        tr: "/auth/sifre-guncelle"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.SIGN_IN]: {
        en: "/sign-in",
        tr: "/giris-yap"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.SIGN_UP_SUCCESS]: {
        en: "/sign-up-success",
        tr: "/kayit-basarili"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.FORGOT_PASSWORD]: {
        en: "/forgot-password",
        tr: "/sifremi-unuttum"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.ONBOARDING]: {
        en: "/onboarding",
        tr: "/karsilama"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD]: {
        en: "/dashboard",
        tr: "/panel"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCTS.LIST]: {
        en: "/dashboard/products",
        tr: "/panel/urunler"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCTS.NEW]: {
        en: "/dashboard/products/new",
        tr: "/panel/urunler/yeni"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCTS.EDIT]: {
        en: "/dashboard/products/[id]",
        tr: "/panel/urunler/[id]"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].PROJECTS]: {
        en: "/projects",
        tr: "/projeler"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].TEAM]: {
        en: "/team",
        tr: "/takim"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].SETTINGS]: {
        en: "/settings",
        tr: "/ayarlar"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.DATA_LIBRARY]: {
        en: "/data-library",
        tr: "/veri-kutuphanesi"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.REPORTS]: {
        en: "/reports",
        tr: "/raporlar"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.WORD_ASSISTANT]: {
        en: "/word-assistant",
        tr: "/kelime-asistani"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCT_DETAIL]: {
        en: "/products/[slug]",
        tr: "/urunler/[slug]"
    }
};
}),
"[project]/lib/i18n/routing.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routing",
    ()=>routing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$pathnames$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/pathnames.ts [middleware] (ecmascript)");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        "tr"
    ],
    defaultLocale: "tr",
    pathnames: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$pathnames$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["pathnames"],
    localePrefix: "as-needed"
});
}),
"[project]/app/proxies/with-18n.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "with18n",
    ()=>with18n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/routing.ts [middleware] (ecmascript)");
;
;
const with18n = (next)=>{
    return async (request, event)=>{
        const childResponse = await next(request, event);
        if (childResponse.status >= 300 && childResponse.status < 400 && childResponse.headers.get("Location")) {
            return childResponse;
        }
        const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"]);
        const intlResponse = await intlMiddleware(request);
        childResponse.headers.forEach((value, key)=>{
            if (key.toLowerCase() === "set-cookie") return; // Cookies handled separately
            intlResponse.headers.set(key, value);
        });
        childResponse.cookies.getAll().forEach((cookie)=>{
            intlResponse.cookies.set(cookie.name, cookie.value);
        });
        return intlResponse;
    };
};
}),
"[project]/lib/i18n/utils/get-localized-paths.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLocalizedPaths",
    ()=>getLocalizedPaths
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/routing.ts [middleware] (ecmascript)");
;
function getLocalizedPaths(routeKey) {
    const paths = new Set();
    const { locales, defaultLocale, pathnames, localePrefix } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"];
    // Add the base key itself (often serves as the internal link or default fallback)
    paths.add(routeKey);
    locales.forEach((locale)=>{
        let localizedSegment = routeKey;
        const pathnameConfig = pathnames?.[routeKey];
        if (typeof pathnameConfig === 'string') {
            localizedSegment = pathnameConfig;
        } else if (typeof pathnameConfig === 'object' && pathnameConfig !== null) {
            const translation = pathnameConfig[locale];
            if (translation) {
                localizedSegment = translation;
            }
        }
        // Determine if prefix is needed
        // 'as-needed': show prefix if NOT default locale
        // 'always': always show prefix
        // 'never': never show prefix (rare for i18n routing but possible)
        const prefixMode = localePrefix; // Loose type check for dynamic logic
        const shouldPrefix = prefixMode === 'always' || prefixMode === 'as-needed' && locale !== defaultLocale;
        if (shouldPrefix) {
            paths.add(`/${locale}${localizedSegment === '/' ? '' : localizedSegment}`);
        } else {
            paths.add(localizedSegment);
        }
    });
    return Array.from(paths);
}
}),
"[project]/app/routes/guards.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GUEST_ROUTES",
    ()=>GUEST_ROUTES,
    "PROTECTED_ROUTES",
    ()=>PROTECTED_ROUTES,
    "PUBLIC_ROUTES",
    ()=>PUBLIC_ROUTES,
    "isGuestRoute",
    ()=>isGuestRoute,
    "isProtectedRoute",
    ()=>isProtectedRoute,
    "isPublicRoute",
    ()=>isPublicRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/config.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$utils$2f$get$2d$localized$2d$paths$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/utils/get-localized-paths.ts [middleware] (ecmascript)");
;
;
const GUEST_ROUTE_KEYS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.SIGN_IN,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.SIGN_UP_SUCCESS,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.FORGOT_PASSWORD,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.ONBOARDING
];
const PUBLIC_ROUTE_KEYS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].HOME,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.CONFIRM,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.ERROR,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.UPDATE_PASSWORD
];
const PROTECTED_ROUTE_KEYS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].PROJECTS,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].TEAM,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].SETTINGS,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.DATA_LIBRARY,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.REPORTS,
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.WORD_ASSISTANT
];
const GUEST_ROUTES = GUEST_ROUTE_KEYS.flatMap(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$utils$2f$get$2d$localized$2d$paths$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["getLocalizedPaths"]);
const PUBLIC_ROUTES = PUBLIC_ROUTE_KEYS.flatMap(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$utils$2f$get$2d$localized$2d$paths$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["getLocalizedPaths"]);
const PROTECTED_ROUTES = PROTECTED_ROUTE_KEYS.flatMap(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$utils$2f$get$2d$localized$2d$paths$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["getLocalizedPaths"]);
function isGuestRoute(pathname) {
    return GUEST_ROUTES.some((route)=>pathname === route || pathname.startsWith(`${route}/`));
}
function isPublicRoute(pathname) {
    return PUBLIC_ROUTES.some((route)=>pathname === route || pathname.startsWith(`${route}/`));
}
function isProtectedRoute(pathname) {
    return PROTECTED_ROUTES.some((route)=>pathname === route || pathname.startsWith(`${route}/`));
}
}),
"[project]/app/routes/navigation.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cloudNavigation",
    ()=>cloudNavigation,
    "documentNavigation",
    ()=>documentNavigation,
    "mainNavigation",
    ()=>mainNavigation,
    "secondaryNavigation",
    ()=>secondaryNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCamera$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCamera$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconCamera.mjs [middleware] (ecmascript) <export default as IconCamera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDatabase$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDatabase$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconDatabase.mjs [middleware] (ecmascript) <export default as IconDatabase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileAi$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileAi$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileAi.mjs [middleware] (ecmascript) <export default as IconFileAi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileDescription.mjs [middleware] (ecmascript) <export default as IconFileDescription>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileWord$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileWord$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconFileWord.mjs [middleware] (ecmascript) <export default as IconFileWord>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHelp$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHelp$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconHelp.mjs [middleware] (ecmascript) <export default as IconHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconPackage.mjs [middleware] (ecmascript) <export default as IconPackage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReport$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReport$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconReport.mjs [middleware] (ecmascript) <export default as IconReport>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSearch.mjs [middleware] (ecmascript) <export default as IconSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSettings$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSettings$3e$__ = __turbopack_context__.i("[project]/node_modules/@tabler/icons-react/dist/esm/icons/IconSettings.mjs [middleware] (ecmascript) <export default as IconSettings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/config.ts [middleware] (ecmascript)");
;
;
const mainNavigation = [
    {
        title: "İstatistikler",
        titleKey: "nav.statistics",
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReport$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReport$3e$__["IconReport"]
    },
    {
        title: "Ürünler",
        titleKey: "nav.products",
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCTS.LIST,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconPackage$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconPackage$3e$__["IconPackage"]
    },
    {
        title: "Kategoriler",
        titleKey: "nav.categories",
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].CATEGORIES.LIST,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDatabase$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDatabase$3e$__["IconDatabase"]
    }
];
const cloudNavigation = [
    {
        title: "Capture",
        titleKey: "nav.capture",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconCamera$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconCamera$3e$__["IconCamera"],
        isActive: true,
        url: "#",
        items: [
            {
                title: "Active Proposals",
                titleKey: "nav.activeProposals",
                url: "#"
            },
            {
                title: "Archived",
                titleKey: "nav.archived",
                url: "#"
            }
        ]
    },
    {
        title: "Proposal",
        titleKey: "nav.proposal",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileDescription$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileDescription$3e$__["IconFileDescription"],
        url: "#",
        items: [
            {
                title: "Active Proposals",
                titleKey: "nav.activeProposals",
                url: "#"
            },
            {
                title: "Archived",
                titleKey: "nav.archived",
                url: "#"
            }
        ]
    },
    {
        title: "Prompts",
        titleKey: "nav.prompts",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileAi$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileAi$3e$__["IconFileAi"],
        url: "#",
        items: [
            {
                title: "Active Proposals",
                titleKey: "nav.activeProposals",
                url: "#"
            },
            {
                title: "Archived",
                titleKey: "nav.archived",
                url: "#"
            }
        ]
    }
];
const secondaryNavigation = [
    {
        title: "Settings",
        titleKey: "nav.settings",
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].SETTINGS,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSettings$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSettings$3e$__["IconSettings"]
    },
    {
        title: "Get Help",
        titleKey: "nav.getHelp",
        url: "#",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconHelp$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconHelp$3e$__["IconHelp"]
    },
    {
        title: "Search",
        titleKey: "nav.search",
        url: "#",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconSearch$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconSearch$3e$__["IconSearch"]
    }
];
const documentNavigation = [
    {
        name: "Data Library",
        nameKey: "nav.dataLibrary",
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.DATA_LIBRARY,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconDatabase$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconDatabase$3e$__["IconDatabase"]
    },
    {
        name: "Reports",
        nameKey: "nav.reports",
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.REPORTS,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconReport$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconReport$3e$__["IconReport"]
    },
    {
        name: "Word Assistant",
        nameKey: "nav.wordAssistant",
        url: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.WORD_ASSISTANT,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tabler$2f$icons$2d$react$2f$dist$2f$esm$2f$icons$2f$IconFileWord$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__default__as__IconFileWord$3e$__["IconFileWord"]
    }
];
}),
"[project]/app/routes/helpers.ts [middleware] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRoute",
    ()=>useRoute
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [middleware] (ecmascript)");
;
const useRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useRoute() from the server but useRoute is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/routes/helpers.ts <module evaluation>", "useRoute");
}),
"[project]/app/routes/helpers.ts [middleware] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRoute",
    ()=>useRoute
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [middleware] (ecmascript)");
;
const useRoute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useRoute() from the server but useRoute is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/routes/helpers.ts", "useRoute");
}),
"[project]/app/routes/helpers.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$helpers$2e$ts__$5b$middleware$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/routes/helpers.ts [middleware] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$helpers$2e$ts__$5b$middleware$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/routes/helpers.ts [middleware] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$helpers$2e$ts__$5b$middleware$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/routes/index.ts [middleware] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/config.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$guards$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/guards.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$pathnames$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/pathnames.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$navigation$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/navigation.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$helpers$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/helpers.ts [middleware] (ecmascript)");
;
;
;
;
;
}),
"[project]/app/proxies/with-auth-guard.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withAuthGuard",
    ()=>withAuthGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/routes/index.ts [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$guards$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/guards.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
;
;
;
const withAuthGuard = (next)=>{
    return async (request, event)=>{
        const pathname = request.nextUrl.pathname;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$guards$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["isPublicRoute"])(pathname) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$guards$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["isGuestRoute"])(pathname)) {
            return next(request, event);
        }
        let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
            request
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://fsqucuwgyyswhcovlhsz.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_xRahKoneqn6IzMtH2az-pA_MJN1SsqF"), {
            cookies: {
                getAll () {
                    return request.cookies.getAll();
                },
                setAll (cookiesToSet) {
                    cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                    supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
                        request
                    });
                    cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
                }
            }
        });
        let user = null;
        try {
            const { data, error } = await supabase.auth.getClaims();
            if (!error) {
                user = data?.claims;
            }
        } catch  {
            user = null;
        }
        if (!user) {
            const url = request.nextUrl.clone();
            url.pathname = "/auth/sign-in";
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
        const response = await next(request, event);
        supabaseResponse.cookies.getAll().forEach((cookie)=>{
            response.cookies.set(cookie.name, cookie.value);
        });
        return response;
    };
};
}),
"[project]/app/proxies/with-guest-guard.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withGuestGuard",
    ()=>withGuestGuard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/routes/index.ts [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$guards$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/guards.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
;
;
;
const withGuestGuard = (next)=>{
    return async (request, event)=>{
        const pathname = request.nextUrl.pathname;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$guards$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["isGuestRoute"])(pathname)) {
            return next(request, event);
        }
        let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
            request
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://fsqucuwgyyswhcovlhsz.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_xRahKoneqn6IzMtH2az-pA_MJN1SsqF"), {
            cookies: {
                getAll () {
                    return request.cookies.getAll();
                },
                setAll (cookiesToSet) {
                    cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                    supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
                        request
                    });
                    cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
                }
            }
        });
        let user = null;
        try {
            const { data, error } = await supabase.auth.getClaims();
            if (!error) {
                user = data?.claims;
            }
        } catch  {
            user = null;
        }
        if (user) {
            const url = request.nextUrl.clone();
            url.pathname = "/";
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
        const response = await next(request, event);
        supabaseResponse.cookies.getAll().forEach((cookie)=>{
            response.cookies.set(cookie.name, cookie.value);
        });
        return response;
    };
};
}),
"[project]/app/env.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>env
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@t3-oss/env-nextjs/dist/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [middleware] (ecmascript) <export * as z>");
;
;
const env = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$t3$2d$oss$2f$env$2d$nextjs$2f$dist$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createEnv"])({
    server: {
        SUPABASE_SERVICE_ROLE_OR_SECRET_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    },
    client: {
        NEXT_PUBLIC_SUPABASE_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url(),
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_SUPABASE_URL: ("TURBOPACK compile-time value", "https://fsqucuwgyyswhcovlhsz.supabase.co"),
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ("TURBOPACK compile-time value", "sb_publishable_xRahKoneqn6IzMtH2az-pA_MJN1SsqF")
    }
});
}),
"[project]/supabase/admin.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/env.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [middleware] (ecmascript) <locals>");
;
;
function createAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_SUPABASE_URL, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["env"].SUPABASE_SERVICE_ROLE_OR_SECRET_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[project]/actions/get-users-count.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUsersCount",
    ()=>getUsersCount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$admin$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/admin.ts [middleware] (ecmascript)");
"use server";
;
async function getUsersCount() {
    try {
        const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$admin$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data, error } = await supabaseAdmin.auth.admin.listUsers({
            perPage: 1,
            page: 1
        });
        if (error) {
            console.error("Error checking users:", error.message);
            return null;
        }
        return data?.users?.length ?? 0;
    } catch  {
        return null;
    }
}
}),
"[project]/actions/index.ts [middleware] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$get$2d$users$2d$count$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/get-users-count.ts [middleware] (ecmascript)");
;
}),
"[project]/app/proxies/with-onboarding.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withOnboarding",
    ()=>withOnboarding
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/actions/index.ts [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$get$2d$users$2d$count$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/get-users-count.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/routing.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
;
;
;
const withOnboarding = (next)=>{
    return async (request, event)=>{
        const pathname = request.nextUrl.pathname;
        const onboardingPaths = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["routing"].pathnames["/onboarding"];
        // Check if current path is one of the localized onboarding paths or the base path
        const isOnboardingPath = pathname === "/onboarding" || Object.values(onboardingPaths).some((path)=>pathname === path);
        const usersCount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$get$2d$users$2d$count$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["getUsersCount"])();
        // If there is an error checking users (usersCount is null), assume we are in a temporary failure state.
        // Allow the request to proceed to avoid blocking the app or redirecting loop.
        // If it was an onboarding path, we let it pass (UI might handle or show error).
        // If it was a normal path, we let it pass.
        if (usersCount === null) {
            return next(request, event);
        }
        // If we are on an onboarding path but users exist, redirect to home.
        if (isOnboardingPath && usersCount > 0) {
            const url = request.nextUrl.clone();
            url.pathname = "/"; // Redirect to root (or login if handled by another middleware)
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
        }
        // If users exist, just proceed.
        // (This block is reached if: !isOnboardingPath OR (isOnboardingPath && usersCount === 0))
        // But if (isOnboardingPath && usersCount === 0), we should just proceed (allow onboarding).
        // So we only care if !isOnboardingPath and usersCount === 0.
        if (!isOnboardingPath && usersCount === 0) {
            const url = request.nextUrl.clone();
            // Determine the best redirect path.
            // Since we don't handle locale negotiation here manually,
            // we redirect to the base /onboarding and let next-intl (in with18n) handle the localization redirect.
            url.pathname = "/onboarding";
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
            request.cookies.getAll().forEach((cookie)=>{
                if (cookie.name.startsWith("sb-")) {
                    response.cookies.delete(cookie.name);
                }
            });
            return response;
        }
        return next(request, event);
    };
};
}),
"[project]/app/proxies/with-supabase-session.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withSupabaseSession",
    ()=>withSupabaseSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
;
;
const withSupabaseSession = (next)=>{
    return async (request, event)=>{
        let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
            request
        });
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://fsqucuwgyyswhcovlhsz.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_xRahKoneqn6IzMtH2az-pA_MJN1SsqF"), {
            cookies: {
                getAll () {
                    return request.cookies.getAll();
                },
                setAll (cookiesToSet) {
                    cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                    supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next({
                        request
                    });
                    cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
                }
            }
        });
        try {
            // Just call getClaims to trigger session refresh if needed
            await supabase.auth.getClaims();
        } catch  {
        // ignore
        }
        // This middleware is responsible for refreshing the session.
        // The actual authentication checks are done in with-auth-guard.ts and with-guest-guard.ts
        const response = await next(request, event);
        supabaseResponse.cookies.getAll().forEach((cookie)=>{
            response.cookies.set(cookie.name, cookie.value);
        });
        return response;
    };
};
}),
"[project]/app/proxies/index.ts [middleware] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$18n$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-18n.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$auth$2d$guard$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-auth-guard.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$guest$2d$guard$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-guest-guard.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$onboarding$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-onboarding.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$supabase$2d$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-supabase-session.ts [middleware] (ecmascript)");
;
;
;
;
;
}),
"[project]/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$proxy$2d$chain$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/proxy-chain/index.ts [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$proxy$2d$chain$2f$proxy$2d$chain$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/proxy-chain/proxy-chain.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/proxies/index.ts [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$18n$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-18n.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$auth$2d$guard$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-auth-guard.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$guest$2d$guard$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-guest-guard.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$onboarding$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-onboarding.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$supabase$2d$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/proxies/with-supabase-session.ts [middleware] (ecmascript)");
;
;
const proxies = [
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$18n$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["with18n"],
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$onboarding$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["withOnboarding"],
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$supabase$2d$session$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["withSupabaseSession"],
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$guest$2d$guard$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["withGuestGuard"],
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$proxies$2f$with$2d$auth$2d$guard$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["withAuthGuard"]
];
async function proxy(request, event) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$proxy$2d$chain$2f$proxy$2d$chain$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["chain"])(proxies)(request, event);
}
const config = {
    matcher: [
        "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2aedfa5e._.js.map