module.exports = [
"[project]/actions/analytics/get-product-trend.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4072766151c0ae423696cfa88aab948756132ee153":"getProductTrend"},"",""] */ __turbopack_context__.s([
    "getProductTrend",
    ()=>getProductTrend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subDays.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$eachDayOfInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/eachDayOfInterval.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getProductTrend(days = 30) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const endDate = new Date();
    const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subDays"])(endDate, days);
    const { data, error } = await supabase.from("products").select("created_at, status").gte("created_at", startDate.toISOString());
    if (error) throw error;
    const interval = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$eachDayOfInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eachDayOfInterval"])({
        start: startDate,
        end: endDate
    });
    const trendMap = {};
    interval.forEach((date)=>{
        const dateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "yyyy-MM-dd");
        trendMap[dateKey] = {
            newProducts: 0,
            activeProducts: 0
        };
    });
    data?.forEach((p)=>{
        const dateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(p.created_at), "yyyy-MM-dd");
        if (trendMap[dateKey]) {
            trendMap[dateKey].newProducts += 1;
        }
    });
    let cumulativeActive = 0;
    return interval.map((date)=>{
        const dateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "yyyy-MM-dd");
        cumulativeActive += trendMap[dateKey].newProducts;
        return {
            date: dateKey,
            newProducts: trendMap[dateKey].newProducts,
            activeProducts: cumulativeActive
        };
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProductTrend
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProductTrend, "4072766151c0ae423696cfa88aab948756132ee153", null);
}),
"[project]/actions/analytics/get-visitor-stats.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4013d0555fdeccdf1bdf3542b9ecbfd714dbe497e8":"getVisitorStats"},"",""] */ __turbopack_context__.s([
    "getVisitorStats",
    ()=>getVisitorStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getVisitorStats(days = 30) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const now = new Date();
    const periodStart = new Date(now);
    periodStart.setDate(periodStart.getDate() - days);
    const prevPeriodStart = new Date(periodStart);
    prevPeriodStart.setDate(prevPeriodStart.getDate() - days);
    const [currentPageViews, prevPageViews, currentSessions] = await Promise.all([
        supabase.from("page_views").select("visitor_id", {
            count: "exact"
        }).gte("created_at", periodStart.toISOString()),
        supabase.from("page_views").select("visitor_id", {
            count: "exact"
        }).gte("created_at", prevPeriodStart.toISOString()).lt("created_at", periodStart.toISOString()),
        supabase.from("sessions").select("duration_seconds, is_bounce, visitor_id").gte("started_at", periodStart.toISOString())
    ]);
    const totalPageViews = currentPageViews.count || 0;
    const prevTotalPageViews = prevPageViews.count || 0;
    const uniqueVisitors = new Set((currentPageViews.data || []).map((p)=>p.visitor_id)).size;
    const prevUniqueVisitors = new Set((prevPageViews.data || []).map((p)=>p.visitor_id)).size;
    const sessions = currentSessions.data || [];
    const totalSessions = sessions.length;
    const avgSessionDuration = sessions.length > 0 ? sessions.reduce((sum, s)=>sum + (s.duration_seconds || 0), 0) / sessions.length : 0;
    const bouncedSessions = sessions.filter((s)=>s.is_bounce).length;
    const bounceRate = totalSessions > 0 ? bouncedSessions / totalSessions * 100 : 0;
    const pageViewsGrowth = prevTotalPageViews > 0 ? (totalPageViews - prevTotalPageViews) / prevTotalPageViews * 100 : totalPageViews > 0 ? 100 : 0;
    const visitorsGrowth = prevUniqueVisitors > 0 ? (uniqueVisitors - prevUniqueVisitors) / prevUniqueVisitors * 100 : uniqueVisitors > 0 ? 100 : 0;
    return {
        totalPageViews,
        uniqueVisitors,
        totalSessions,
        avgSessionDuration: Math.round(avgSessionDuration),
        bounceRate: Math.round(bounceRate * 10) / 10,
        pageViewsGrowth: Math.round(pageViewsGrowth * 10) / 10,
        visitorsGrowth: Math.round(visitorsGrowth * 10) / 10
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getVisitorStats
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVisitorStats, "4013d0555fdeccdf1bdf3542b9ecbfd714dbe497e8", null);
}),
"[project]/actions/analytics/get-popular-pages.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60d199e42ab4f4c93c7c7225ceb9a3417a632e3aa1":"getPopularPages"},"",""] */ __turbopack_context__.s([
    "getPopularPages",
    ()=>getPopularPages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subDays.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getPopularPages(days = 30, limit = 10) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subDays"])(new Date(), days);
    const { data } = await supabase.from("page_views").select("page_path, visitor_id").gte("created_at", startDate.toISOString());
    if (!data || data.length === 0) return [];
    const pageMap = {};
    data.forEach((pv)=>{
        if (!pageMap[pv.page_path]) {
            pageMap[pv.page_path] = {
                views: 0,
                visitors: new Set()
            };
        }
        pageMap[pv.page_path].views += 1;
        pageMap[pv.page_path].visitors.add(pv.visitor_id);
    });
    return Object.entries(pageMap).map(([path, stats])=>({
            path,
            views: stats.views,
            uniqueVisitors: stats.visitors.size
        })).sort((a, b)=>b.views - a.views).slice(0, limit);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPopularPages
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPopularPages, "60d199e42ab4f4c93c7c7225ceb9a3417a632e3aa1", null);
}),
"[project]/actions/analytics/get-product-stats.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00429229d73b89a3704d1c3ebe57ad82cef737b4a0":"getProductStats"},"",""] */ __turbopack_context__.s([
    "getProductStats",
    ()=>getProductStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getProductStats() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("products").select("status, created_at");
    if (error) throw error;
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthProducts = (data || []).filter((p)=>new Date(p.created_at) >= thisMonthStart);
    const lastMonthProducts = (data || []).filter((p)=>new Date(p.created_at) >= lastMonthStart && new Date(p.created_at) < thisMonthStart);
    const growthRate = lastMonthProducts.length > 0 ? (thisMonthProducts.length - lastMonthProducts.length) / lastMonthProducts.length * 100 : thisMonthProducts.length > 0 ? 100 : 0;
    return {
        total: data?.length || 0,
        active: data?.filter((p)=>p.status === "active").length || 0,
        draft: data?.filter((p)=>p.status === "draft").length || 0,
        archived: data?.filter((p)=>p.status === "archived").length || 0,
        thisMonthNew: thisMonthProducts.length,
        lastMonthNew: lastMonthProducts.length,
        growthRate: Math.round(growthRate * 10) / 10
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProductStats
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProductStats, "00429229d73b89a3704d1c3ebe57ad82cef737b4a0", null);
}),
"[project]/actions/analytics/get-category-distribution.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00e17a7b49401551dd5ece86b8c1665fc10866e5a8":"getCategoryDistribution"},"",""] */ __turbopack_context__.s([
    "getCategoryDistribution",
    ()=>getCategoryDistribution
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const CATEGORY_COLORS = {
    marble: "hsl(210, 40%, 60%)",
    granite: "hsl(220, 35%, 50%)",
    travertine: "hsl(35, 60%, 55%)",
    onyx: "hsl(280, 40%, 50%)",
    limestone: "hsl(45, 50%, 60%)",
    quartzite: "hsl(180, 45%, 50%)"
};
const CATEGORY_LABELS = {
    marble: "Mermer",
    granite: "Granit",
    travertine: "Traverten",
    onyx: "Oniks",
    limestone: "Kireçtaşı",
    quartzite: "Kuvarsit"
};
async function getCategoryDistribution() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("products").select("category");
    if (error) throw error;
    const total = data?.length || 0;
    if (total === 0) return [];
    const categoryCounts = {};
    data?.forEach((p)=>{
        const cat = p.category;
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    return Object.entries(categoryCounts).map(([category, count])=>({
            category: CATEGORY_LABELS[category] || category,
            count,
            percentage: Math.round(count / total * 100 * 10) / 10,
            fill: CATEGORY_COLORS[category] || "hsl(0, 0%, 50%)"
        })).sort((a, b)=>b.count - a.count);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getCategoryDistribution
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategoryDistribution, "00e17a7b49401551dd5ece86b8c1665fc10866e5a8", null);
}),
"[project]/actions/analytics/get-daily-analytics.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e6975de1b1b6415dd3606044fe1ef1d75d1a966d":"getDailyAnalytics"},"",""] */ __turbopack_context__.s([
    "getDailyAnalytics",
    ()=>getDailyAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subDays.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$eachDayOfInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/eachDayOfInterval.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/parseISO.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getDailyAnalytics(days = 30) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const endDate = new Date();
    const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["subDays"])(endDate, days);
    const { data: pageViews } = await supabase.from("page_views").select("created_at, visitor_id, session_id").gte("created_at", startDate.toISOString());
    const interval = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$eachDayOfInterval$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["eachDayOfInterval"])({
        start: startDate,
        end: endDate
    });
    const dailyMap = {};
    interval.forEach((date)=>{
        const dateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "yyyy-MM-dd");
        dailyMap[dateKey] = {
            pageViews: 0,
            visitors: new Set(),
            sessions: new Set()
        };
    });
    (pageViews || []).forEach((pv)=>{
        const dateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$parseISO$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseISO"])(pv.created_at), "yyyy-MM-dd");
        if (dailyMap[dateKey]) {
            dailyMap[dateKey].pageViews += 1;
            dailyMap[dateKey].visitors.add(pv.visitor_id);
            dailyMap[dateKey].sessions.add(pv.session_id);
        }
    });
    return interval.map((date)=>{
        const dateKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "yyyy-MM-dd");
        const day = dailyMap[dateKey];
        return {
            date: dateKey,
            pageViews: day.pageViews,
            uniqueVisitors: day.visitors.size,
            sessions: day.sessions.size
        };
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getDailyAnalytics
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDailyAnalytics, "40e6975de1b1b6415dd3606044fe1ef1d75d1a966d", null);
}),
"[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4022e5374ea159f3545f609cad69b1314fa818c2e8":"resolveSlugWithRedirect"},"",""] */ __turbopack_context__.s([
    "resolveSlugWithRedirect",
    ()=>resolveSlugWithRedirect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function resolveSlugWithRedirect(slug) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: product } = await supabase.from("products").select("*").eq("slug", slug).single();
    if (product) {
        return {
            found: true,
            product
        };
    }
    const { data: history } = await supabase.from("slug_history").select("new_slug").eq("old_slug", slug).order("created_at", {
        ascending: false
    }).limit(1).single();
    if (history) {
        return {
            found: true,
            redirect: history.new_slug
        };
    }
    return {
        found: false
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    resolveSlugWithRedirect
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resolveSlugWithRedirect, "4022e5374ea159f3545f609cad69b1314fa818c2e8", null);
}),
"[project]/actions/analytics/reset-analytics.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0017428c3285694a25164bfd0884720636fb31856b":"resetAnalyticsData"},"",""] */ __turbopack_context__.s([
    "resetAnalyticsData",
    ()=>resetAnalyticsData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/env.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function resetAnalyticsData() {
    // 1. Kullanıcı yetki kontrolü için standart client
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return {
            success: false,
            message: "Yetkisiz erişim. Lütfen giriş yapın."
        };
    }
    // 2. Silme işlemi için Service Role client (Bypass RLS)
    const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"].NEXT_PUBLIC_SUPABASE_URL, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"].SUPABASE_SERVICE_ROLE_OR_SECRET_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
    try {
        const pageViewsResult = await supabaseAdmin.from("page_views").delete().neq("id", "00000000-0000-0000-0000-000000000000").select("id"); // Select ile dönen datayı sayabiliriz
        if (pageViewsResult.error) {
            console.error("Page views delete error:", pageViewsResult.error);
            return {
                success: false,
                message: `Sayfa görüntüleme verileri silinemedi: ${pageViewsResult.error.message}`
            };
        }
        const sessionsResult = await supabaseAdmin.from("sessions").delete().neq("id", "00000000-0000-0000-0000-000000000000").select("id");
        if (sessionsResult.error) {
            console.error("Sessions delete error:", sessionsResult.error);
            return {
                success: false,
                message: `Oturum verileri silinemedi: ${sessionsResult.error.message}`
            };
        }
        const eventsResult = await supabaseAdmin.from("analytics_events").delete().neq("id", "00000000-0000-0000-0000-000000000000").select("id");
        if (eventsResult.error) {
            console.error("Events delete error:", eventsResult.error);
            return {
                success: false,
                message: `Event verileri silinemedi: ${eventsResult.error.message}`
            };
        }
        const deletedCounts = {
            pageViews: pageViewsResult.data?.length ?? 0,
            sessions: sessionsResult.data?.length ?? 0,
            events: eventsResult.data?.length ?? 0
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/tr/dashboard");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/en/dashboard");
        return {
            success: true,
            message: "Analitik verileri başarıyla sıfırlandı.",
            deletedCounts
        };
    } catch (error) {
        console.error("Analytics reset error:", error);
        return {
            success: false,
            message: `Veriler sıfırlanırken bir hata oluştu: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    resetAnalyticsData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetAnalyticsData, "0017428c3285694a25164bfd0884720636fb31856b", null);
}),
"[project]/.next-internal/server/app/[locale]/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/analytics/get-product-trend.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/analytics/get-visitor-stats.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/analytics/get-popular-pages.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/analytics/get-product-stats.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/analytics/get-category-distribution.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/analytics/get-daily-analytics.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/analytics/reset-analytics.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$trend$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-product-trend.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$visitor$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-visitor-stats.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$popular$2d$pages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-popular-pages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-product-stats.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$category$2d$distribution$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-category-distribution.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$daily$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-daily-analytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$reset$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/reset-analytics.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/[locale]/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/analytics/get-product-trend.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/analytics/get-visitor-stats.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/analytics/get-popular-pages.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/analytics/get-product-stats.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/analytics/get-category-distribution.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/analytics/get-daily-analytics.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/analytics/reset-analytics.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0017428c3285694a25164bfd0884720636fb31856b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$reset$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetAnalyticsData"],
    "00429229d73b89a3704d1c3ebe57ad82cef737b4a0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductStats"],
    "00e17a7b49401551dd5ece86b8c1665fc10866e5a8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$category$2d$distribution$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryDistribution"],
    "4013d0555fdeccdf1bdf3542b9ecbfd714dbe497e8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$visitor$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVisitorStats"],
    "4022e5374ea159f3545f609cad69b1314fa818c2e8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSlugWithRedirect"],
    "4072766151c0ae423696cfa88aab948756132ee153",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$trend$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductTrend"],
    "40e6975de1b1b6415dd3606044fe1ef1d75d1a966d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$daily$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDailyAnalytics"],
    "60d199e42ab4f4c93c7c7225ceb9a3417a632e3aa1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$popular$2d$pages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPopularPages"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$trend$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2f$get$2d$visitor$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2f$get$2d$popular$2d$pages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2f$get$2d$category$2d$distribution$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2f$get$2d$daily$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE7__$3d3e$__$225b$project$5d2f$actions$2f$analytics$2f$reset$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/analytics/get-product-trend.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/analytics/get-visitor-stats.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/analytics/get-popular-pages.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/actions/analytics/get-product-stats.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/actions/analytics/get-category-distribution.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/actions/analytics/get-daily-analytics.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)", ACTIONS_MODULE7 => "[project]/actions/analytics/reset-analytics.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$trend$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-product-trend.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$visitor$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-visitor-stats.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$popular$2d$pages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-popular-pages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$product$2d$stats$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-product-stats.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$category$2d$distribution$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-category-distribution.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$get$2d$daily$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/get-daily-analytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$analytics$2f$reset$2d$analytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/analytics/reset-analytics.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_75217ae2._.js.map