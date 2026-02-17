module.exports = [
"[project]/app/routes/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/app/routes/pathnames.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pathnames",
    ()=>pathnames
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/config.ts [app-rsc] (ecmascript)");
;
const pathnames = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].HOME]: "/",
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.CONFIRM]: "/auth/confirm",
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.ERROR]: "/auth/error",
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].AUTH.UPDATE_PASSWORD]: {
        en: "/auth/update-password",
        tr: "/auth/sifre-guncelle"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.SIGN_IN]: {
        en: "/sign-in",
        tr: "/giris-yap"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.SIGN_UP_SUCCESS]: {
        en: "/sign-up-success",
        tr: "/kayit-basarili"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.FORGOT_PASSWORD]: {
        en: "/forgot-password",
        tr: "/sifremi-unuttum"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].GUEST.ONBOARDING]: {
        en: "/onboarding",
        tr: "/karsilama"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD]: {
        en: "/dashboard",
        tr: "/panel"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCTS.LIST]: {
        en: "/dashboard/products",
        tr: "/panel/urunler"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCTS.NEW]: {
        en: "/dashboard/products/new",
        tr: "/panel/urunler/yeni"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCTS.EDIT]: {
        en: "/dashboard/products/[id]",
        tr: "/panel/urunler/[id]"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].PROJECTS]: {
        en: "/projects",
        tr: "/projeler"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].TEAM]: {
        en: "/team",
        tr: "/takim"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].SETTINGS]: {
        en: "/settings",
        tr: "/ayarlar"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.DATA_LIBRARY]: {
        en: "/data-library",
        tr: "/veri-kutuphanesi"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.REPORTS]: {
        en: "/reports",
        tr: "/raporlar"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].DOCUMENTS.WORD_ASSISTANT]: {
        en: "/word-assistant",
        tr: "/kelime-asistani"
    },
    [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].PRODUCT_DETAIL]: {
        en: "/products/[slug]",
        tr: "/urunler/[slug]"
    }
};
}),
"[project]/lib/i18n/routing.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "routing",
    ()=>routing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [app-rsc] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$pathnames$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/routes/pathnames.ts [app-rsc] (ecmascript)");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        "tr"
    ],
    defaultLocale: "tr",
    pathnames: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$routes$2f$pathnames$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pathnames"],
    localePrefix: "as-needed"
});
}),
"[project]/lib/i18n/request.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/core.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [app-rsc] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/routing.ts [app-rsc] (ecmascript)");
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    const requested = await requestLocale;
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasLocale"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].locales, requested) ? requested : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    return {
        messages: {},
        locale
    };
});
}),
"[next]/internal/font/google/geist_6ee70f7.module.css [app-rsc] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "geist_6ee70f7-module__6GiuUG__className",
  "variable": "geist_6ee70f7-module__6GiuUG__variable",
});
}),
"[next]/internal/font/google/geist_6ee70f7.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_6ee70f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_6ee70f7.module.css [app-rsc] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_6ee70f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Geist', 'Geist Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_6ee70f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_6ee70f7$2e$module$2e$css__$5b$app$2d$rsc$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/app/components/ui/sonner.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Toaster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Toaster() from the server but Toaster is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ui/sonner.tsx <module evaluation>", "Toaster");
}),
"[project]/app/components/ui/sonner.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Toaster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Toaster() from the server but Toaster is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/app/components/ui/sonner.tsx", "Toaster");
}),
"[project]/app/components/ui/sonner.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/app/components/ui/sonner.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/app/components/ui/sonner.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/[locale]/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "generateStaticParams",
    ()=>generateStaticParams,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/core.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$server$2f$NextIntlClientProviderServer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-server/NextIntlClientProviderServer.js [app-rsc] (ecmascript) <export default as NextIntlClientProvider>");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_6ee70f7$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/geist_6ee70f7.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/ui/sonner.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n/routing.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocaleCache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__setCachedRequestLocale__as__setRequestLocale$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/RequestLocaleCache.js [app-rsc] (ecmascript) <export setCachedRequestLocale as setRequestLocale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase"
};
function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].locales.map((locale)=>({
            locale
        }));
}
async function RootLayout({ children, params }) {
    const { locale } = await params;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hasLocale"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].locales, locale)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$RequestLocaleCache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__setCachedRequestLocale__as__setRequestLocale$3e$__["setRequestLocale"])(locale);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: locale,
        suppressHydrationWarning: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            className: `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$geist_6ee70f7$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].className} antialiased`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$server$2f$NextIntlClientProviderServer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__["NextIntlClientProvider"], {
                locale: locale,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$ui$2f$sonner$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Toaster"], {}, void 0, false, {
                        fileName: "[project]/app/[locale]/layout.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/[locale]/layout.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/[locale]/layout.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/[locale]/layout.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d5524281._.js.map