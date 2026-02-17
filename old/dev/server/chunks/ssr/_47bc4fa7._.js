module.exports = [
"[project]/actions/products/get-product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"406f398892cba3352cb7711df1283bce6f2af16206":"getProduct"},"",""] */ __turbopack_context__.s([
    "getProduct",
    ()=>getProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getProduct(idOrSlug) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
        const query = supabase.from("products").select("*").eq(isUUID ? "id" : "slug", idOrSlug).single();
        const { data, error } = await query;
        if (error) {
            console.error("Get product error:", error);
            return {
                success: false,
                error: "Ürün bulunamadı"
            };
        }
        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.error("Get product error:", error);
        return {
            success: false,
            error: "Beklenmeyen bir hata oluştu"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProduct
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProduct, "406f398892cba3352cb7711df1283bce6f2af16206", null);
}),
"[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0038bce317a2a57066ecf2ba8a75e64fe59efcfbcb":"getCategories"},"",""] */ __turbopack_context__.s([
    "getCategories",
    ()=>getCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getCategories() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getCategories
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategories, "0038bce317a2a57066ecf2ba8a75e64fe59efcfbcb", null);
}),
"[project]/app/validations/product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createProductSchema",
    ()=>createProductSchema,
    "updateProductSchema",
    ()=>updateProductSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
;
const categories = [
    "marble",
    "granite",
    "travertine",
    "onyx",
    "limestone",
    "quartzite"
];
const statuses = [
    "active",
    "draft",
    "archived"
];
const patterns = [
    "veined",
    "speckled",
    "uniform",
    "cloudy",
    "flowery",
    "layered"
];
const finishes = [
    "polished",
    "honed",
    "brushed",
    "flamed",
    "tumbled",
    "sandblasted",
    "leathered"
];
const applications = [
    "flooring",
    "wall_cladding",
    "countertops",
    "stairs",
    "bathroom",
    "outdoor",
    "pool",
    "fireplace"
];
const currencies = [
    "TRY",
    "USD",
    "EUR"
];
const createProductSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Ürün adı en az 2 karakter olmalı").max(255, "Ürün adı en fazla 255 karakter olabilir"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(5000, "Açıklama en fazla 5000 karakter olabilir").nullable().optional(),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(categories).optional(),
    category_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid("Geçersiz kategori seçimi"),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(statuses, {
        message: "Geçersiz durum"
    }).default("draft"),
    price_per_sqm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0, "Fiyat 0'dan küçük olamaz").nullable().optional(),
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(currencies, {
        message: "Geçersiz para birimi"
    }).default("TRY"),
    thumbnail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url("Geçersiz URL").nullable().optional(),
    images: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url("Geçersiz URL")).default([]),
    origin_country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100).nullable().optional(),
    origin_region: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100).nullable().optional(),
    color_primary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional(),
    color_secondary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional(),
    pattern: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(patterns).nullable().optional(),
    finish_types: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(finishes)).default([]),
    density: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    water_absorption: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).max(100).nullable().optional(),
    compressive_strength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    flexural_strength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    abrasion_resistance: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional(),
    hardness_mohs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(10).nullable().optional(),
    frost_resistant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    available_thicknesses: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0)).default([]),
    max_slab_width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    max_slab_length: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    min_order_quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).default(1),
    applications: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(applications)).default([]),
    is_suitable_for_exterior: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    is_suitable_for_kitchen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    seo_title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(255).nullable().optional(),
    seo_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500).nullable().optional(),
    tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([])
});
const updateProductSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid("Geçersiz ürün ID"),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Ürün adı en az 2 karakter olmalı").max(255, "Ürün adı en fazla 255 karakter olabilir").optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(5000).nullable().optional(),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(categories).optional(),
    category_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid("Geçersiz kategori seçimi").optional(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(statuses).optional(),
    price_per_sqm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(currencies).optional(),
    thumbnail: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().nullable().optional(),
    images: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()).optional(),
    origin_country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100).nullable().optional(),
    origin_region: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(100).nullable().optional(),
    color_primary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional(),
    color_secondary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional(),
    pattern: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(patterns).nullable().optional(),
    finish_types: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(finishes)).optional(),
    density: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    water_absorption: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).max(100).nullable().optional(),
    compressive_strength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    flexural_strength: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    abrasion_resistance: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(50).nullable().optional(),
    hardness_mohs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(10).nullable().optional(),
    frost_resistant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    available_thicknesses: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0)).optional(),
    max_slab_width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    max_slab_length: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(0).nullable().optional(),
    min_order_quantity: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(1).optional(),
    applications: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum(applications)).optional(),
    is_suitable_for_exterior: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    is_suitable_for_kitchen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional(),
    seo_title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(255).nullable().optional(),
    seo_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500).nullable().optional(),
    tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).optional()
});
}),
"[project]/actions/products/create-product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40a9c974796a6edbe65790c0015f20226a07ec6ccc":"createProduct"},"",""] */ __turbopack_context__.s([
    "createProduct",
    ()=>createProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/validations/product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function createProduct(input) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return {
                success: false,
                error: "Yetkilendirme gerekli"
            };
        }
        const validation = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProductSchema"].safeParse(input);
        if (!validation.success) {
            return {
                success: false,
                error: validation.error.issues[0]?.message || "Geçersiz veri"
            };
        }
        const validatedData = validation.data;
        const slug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateUniqueSlug"])(supabase, validatedData.name);
        const { data, error } = await supabase.from("products").insert({
            name: validatedData.name,
            slug,
            description: validatedData.description || null,
            category: validatedData.category || "marble",
            category_id: validatedData.category_id,
            status: validatedData.status,
            price_per_sqm: validatedData.price_per_sqm || null,
            currency: validatedData.currency,
            thumbnail: validatedData.thumbnail || null,
            images: validatedData.images,
            created_by: user.id,
            // Add other fields that were missing or needed mapping if any
            origin_country: validatedData.origin_country,
            origin_region: validatedData.origin_region,
            color_primary: validatedData.color_primary,
            color_secondary: validatedData.color_secondary,
            pattern: validatedData.pattern,
            finish_types: validatedData.finish_types,
            density: validatedData.density,
            water_absorption: validatedData.water_absorption,
            compressive_strength: validatedData.compressive_strength,
            flexural_strength: validatedData.flexural_strength,
            abrasion_resistance: validatedData.abrasion_resistance,
            hardness_mohs: validatedData.hardness_mohs,
            frost_resistant: validatedData.frost_resistant,
            available_thicknesses: validatedData.available_thicknesses,
            max_slab_width: validatedData.max_slab_width,
            max_slab_length: validatedData.max_slab_length,
            min_order_quantity: validatedData.min_order_quantity,
            applications: validatedData.applications,
            is_suitable_for_exterior: validatedData.is_suitable_for_exterior,
            is_suitable_for_kitchen: validatedData.is_suitable_for_kitchen,
            seo_title: validatedData.seo_title,
            seo_description: validatedData.seo_description,
            tags: validatedData.tags
        }).select("id, slug").single();
        if (error) {
            console.error("Create product error:", error);
            return {
                success: false,
                error: "Ürün oluşturulamadı"
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/products");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/products");
        return {
            success: true,
            data: {
                id: data.id,
                slug: data.slug
            }
        };
    } catch (error) {
        console.error("Create product error:", error);
        return {
            success: false,
            error: "Beklenmeyen bir hata oluştu"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createProduct
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProduct, "40a9c974796a6edbe65790c0015f20226a07ec6ccc", null);
}),
"[project]/actions/products/update-product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4042fb1f20f6e7bf1fe1653d1a26d2cb0f160b4c58":"updateProduct"},"",""] */ __turbopack_context__.s([
    "updateProduct",
    ()=>updateProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/validations/product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function updateProduct(input) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return {
                success: false,
                error: "Yetkilendirme gerekli"
            };
        }
        const validation = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProductSchema"].safeParse(input);
        if (!validation.success) {
            return {
                success: false,
                error: validation.error.issues[0]?.message || "Geçersiz veri"
            };
        }
        const { id, ...updateData } = validation.data;
        const { data: existing, error: fetchError } = await supabase.from("products").select("id, name, slug, created_by").eq("id", id).single();
        if (fetchError || !existing) {
            return {
                success: false,
                error: "Ürün bulunamadı"
            };
        }
        let newSlug = existing.slug;
        if (updateData.name && updateData.name !== existing.name) {
            newSlug = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateUniqueSlug"])(supabase, updateData.name, id);
            await supabase.from("slug_history").insert({
                product_id: id,
                old_slug: existing.slug,
                new_slug: newSlug
            });
        }
        const { error } = await supabase.from("products").update({
            ...updateData,
            slug: newSlug
        }).eq("id", id);
        if (error) {
            console.error("Update product error:", error);
            return {
                success: false,
                error: "Ürün güncellenemedi"
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/products");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/products/${id}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/dashboard/products/${newSlug}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/products");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/products/${newSlug}`);
        return {
            success: true,
            data: {
                slug: newSlug
            }
        };
    } catch (error) {
        console.error("Update product error:", error);
        return {
            success: false,
            error: "Beklenmeyen bir hata oluştu"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateProduct
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProduct, "4042fb1f20f6e7bf1fe1653d1a26d2cb0f160b4c58", null);
}),
"[project]/actions/products/delete-product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"409df23208f038155188217921ba192e5bedeffd2a":"deleteProduct"},"",""] */ __turbopack_context__.s([
    "deleteProduct",
    ()=>deleteProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const deleteProductSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid()
});
async function deleteProduct(id) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return {
                success: false,
                error: "Yetkilendirme gerekli"
            };
        }
        const validation = deleteProductSchema.safeParse({
            id
        });
        if (!validation.success) {
            return {
                success: false,
                error: "Geçersiz ürün ID"
            };
        }
        const { data: product, error: fetchError } = await supabase.from("products").select("id, images, thumbnail").eq("id", id).single();
        if (fetchError || !product) {
            return {
                success: false,
                error: "Ürün bulunamadı"
            };
        }
        const imagesToDelete = [
            ...product.images || []
        ];
        if (product.thumbnail) {
            imagesToDelete.push(product.thumbnail);
        }
        if (imagesToDelete.length > 0) {
            const filePaths = imagesToDelete.map((url)=>{
                try {
                    const urlObj = new URL(url);
                    const parts = urlObj.pathname.split("/storage/v1/object/public/products/");
                    return parts.length === 2 ? parts[1] : null;
                } catch  {
                    return null;
                }
            }).filter(Boolean);
            if (filePaths.length > 0) {
                await supabase.storage.from("products").remove(filePaths);
            }
        }
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) {
            console.error("Delete product error:", error);
            return {
                success: false,
                error: "Ürün silinemedi"
            };
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/products");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/products");
        return {
            success: true
        };
    } catch (error) {
        console.error("Delete product error:", error);
        return {
            success: false,
            error: "Beklenmeyen bir hata oluştu"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    deleteProduct
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProduct, "409df23208f038155188217921ba192e5bedeffd2a", null);
}),
"[project]/actions/products/get-products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40ccf76a488c82bae742c4b70054a19f76cfd2555d":"getProducts"},"",""] */ __turbopack_context__.s([
    "getProducts",
    ()=>getProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getProducts(params = {}) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { filters = {}, page = 1, limit = 20, orderBy = "created_at", orderDirection = "desc" } = params;
        let query = supabase.from("products").select("*, categories(*)", {
            count: "exact"
        });
        if (filters.category) {
            const categoryIds = Array.isArray(filters.category) ? filters.category : [
                filters.category
            ];
            query = query.in("category_id", categoryIds);
        }
        if (filters.status) {
            const statuses = Array.isArray(filters.status) ? filters.status : [
                filters.status
            ];
            query = query.in("status", statuses);
        }
        if (filters.search) {
            query = query.ilike("name", `%${filters.search}%`);
        }
        query = query.order(orderBy, {
            ascending: orderDirection === "asc"
        });
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        query = query.range(from, to);
        const { data, error, count } = await query;
        if (error) {
            console.error("Get products error:", error);
            return {
                success: false,
                error: "Ürünler alınamadı"
            };
        }
        // Since categories is joined as an object (single because foreign key is many-to-one),
        // it will be returned as `categories: { ... }` or null.
        // However, the relationship name might be `categories` or something else depending on DB config.
        // The query `categories(*)` implies using the table name which usually works if relation is unambiguous.
        // But `data` type inferred by supabase-js might need casting.
        // Force cast to ProductWithCategory[] to satisfy TS and my interface.
        // Note: ProductWithCategory has categories: Category | null.
        // If join returns array (unlikely for many-to-one), we might need to handle it.
        // But products -> category_id -> categories(id) is N:1, so referencing `categories` returns single object if using single().
        // Wait, standard select `*, categories(*)` returns `categories` as an array or object?
        // In Supabase js, if the relationship is N:1, it returns an object? Or array?
        // It depends on `isOneToOne` or `!isList`?
        // Actually, usually it returns an object if it detects N:1.
        // Let's assume it returns object or null.
        // Casting data to unknown first to avoid type mismatch with inferred type
        const products = data;
        return {
            success: true,
            data: {
                products,
                total: count || 0,
                page,
                totalPages: Math.ceil((count || 0) / limit)
            }
        };
    } catch (error) {
        console.error("Get products error:", error);
        return {
            success: false,
            error: "Beklenmeyen bir hata oluştu"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProducts
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProducts, "40ccf76a488c82bae742c4b70054a19f76cfd2555d", null);
}),
"[project]/app/validations/category.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categorySchema",
    ()=>categorySchema,
    "updateCategorySchema",
    ()=>updateCategorySchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
;
const categorySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "En az 2 karakter").max(255).min(1, "Kategori adı zorunludur"),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "URL (Slug) zorunludur").regex(/^[a-z0-9-]+$/, "Sadece küçük harf, rakam ve tire (-) kullanılabilir"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
    image_url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().nullable().optional(),
    seo_title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(70, "SEO başlığı 70 karakterden fazla olamaz").nullable().optional(),
    seo_description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(160, "SEO açıklaması 160 karakterden fazla olamaz").nullable().optional()
});
const updateCategorySchema = categorySchema.extend({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().uuid("Geçersiz Kategori ID")
});
}),
"[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b814a6ec7363b852546fc9ff000a8458441e5878":"createCategory"},"",""] */ __turbopack_context__.s([
    "createCategory",
    ()=>createCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/validations/category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function createCategory(input) {
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categorySchema"].safeParse(input);
    if (!result.success) {
        return {
            success: false,
            error: "Geçersiz veri girişi"
        };
    }
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return {
            success: false,
            error: "Yetkisiz işlem. Lütfen giriş yapın."
        };
    }
    // Check unique slug manually just to be safe (DB also has unique constraint)
    const { data: existing } = await supabase.from("categories").select("id").eq("slug", input.slug).single();
    if (existing) {
        return {
            success: false,
            error: "Bu URL (slug) zaten kullanımda."
        };
    }
    const { error } = await supabase.from("categories").insert({
        name: input.name,
        slug: input.slug,
        description: input.description,
        image_url: input.image_url,
        seo_title: input.seo_title,
        seo_description: input.seo_description
    });
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/categories");
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategory, "40b814a6ec7363b852546fc9ff000a8458441e5878", null);
}),
"[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e22fb17e1ecb14d84009a4b55a100bd219e0c2f7":"updateCategory"},"",""] */ __turbopack_context__.s([
    "updateCategory",
    ()=>updateCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/validations/category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function updateCategory(input) {
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$validations$2f$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCategorySchema"].safeParse(input);
    if (!result.success) {
        return {
            success: false,
            error: "Geçersiz veri girişi"
        };
    }
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return {
            success: false,
            error: "Yetkisiz işlem. Lütfen giriş yapın."
        };
    }
    // Slug değiştiyse unique kontrolü
    const { data: existing } = await supabase.from("categories").select("id").eq("slug", input.slug).neq("id", input.id) // Kendisi hariç
    .single();
    if (existing) {
        return {
            success: false,
            error: "Bu URL (slug) zaten kullanımda."
        };
    }
    const { error } = await supabase.from("categories").update({
        name: input.name,
        slug: input.slug,
        description: input.description,
        image_url: input.image_url,
        seo_title: input.seo_title,
        seo_description: input.seo_description,
        updated_at: new Date().toISOString()
    }).eq("id", input.id);
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/categories");
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCategory, "40e22fb17e1ecb14d84009a4b55a100bd219e0c2f7", null);
}),
"[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40f7c0309a9a1c20d90f72008e87f8f215395b13be":"deleteCategory"},"",""] */ __turbopack_context__.s([
    "deleteCategory",
    ()=>deleteCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function deleteCategory(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return {
            success: false,
            error: "Yetkisiz işlem. Lütfen giriş yapın."
        };
    }
    // Bağlı ürün kontrolü
    const { count, error: countError } = await supabase.from("products").select("id", {
        count: "exact",
        head: true
    }).eq("category_id", id);
    if (countError) {
        return {
            success: false,
            error: "Ürün kontrolü yapılamadı."
        };
    }
    if (count && count > 0) {
        return {
            success: false,
            error: `Bu kategoriye bağlı ${count} adet ürün var. Önce ürünleri başka kategoriye taşıyın veya silin.`
        };
    }
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/categories");
    return {
        success: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    deleteCategory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategory, "40f7c0309a9a1c20d90f72008e87f8f215395b13be", null);
}),
"[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"409cfbae81cb8f69fe4ebb6b0b760ec92745f84a59":"getCategoryById"},"",""] */ __turbopack_context__.s([
    "getCategoryById",
    ()=>getCategoryById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getCategoryById(id) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
    if (error) {
        return null;
    }
    return data;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getCategoryById
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCategoryById, "409cfbae81cb8f69fe4ebb6b0b760ec92745f84a59", null);
}),
"[project]/actions/storage/upload-image.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4084d6058781d6f140f28557f89a6a91d277e8f22f":"deleteImage","40c6d07bcd6516487bc565ee5b0d487f40504ece14":"uploadImage"},"",""] */ __turbopack_context__.s([
    "deleteImage",
    ()=>deleteImage,
    "uploadImage",
    ()=>uploadImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const uploadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    folder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "products",
        "thumbnails",
        "gallery",
        "categories"
    ])
});
async function uploadImage(formData) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return {
                success: false,
                error: "Yetkilendirme gerekli"
            };
        }
        const file = formData.get("file");
        const folder = formData.get("folder");
        if (!file) {
            return {
                success: false,
                error: "Dosya bulunamadı"
            };
        }
        const validation = uploadSchema.safeParse({
            folder
        });
        if (!validation.success) {
            return {
                success: false,
                error: "Geçersiz klasör"
            };
        }
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return {
                success: false,
                error: "Sadece JPEG, PNG, WebP ve GIF dosyaları yüklenebilir"
            };
        }
        if (file.size > MAX_FILE_SIZE) {
            return {
                success: false,
                error: "Dosya boyutu 5MB'dan küçük olmalı"
            };
        }
        const fileExt = file.name.split(".").pop()?.toLowerCase();
        const sanitizedExt = [
            "jpg",
            "jpeg",
            "png",
            "webp",
            "gif"
        ].includes(fileExt || "") ? fileExt : "jpg";
        const uniqueId = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
        const fileName = `${folder}/${user.id}/${uniqueId}.${sanitizedExt}`;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const { data, error } = await supabase.storage.from("products").upload(fileName, buffer, {
            contentType: file.type,
            upsert: false
        });
        if (error) {
            console.error("Storage upload error:", error);
            return {
                success: false,
                error: "Dosya yüklenirken hata oluştu"
            };
        }
        const { data: urlData } = supabase.storage.from("products").getPublicUrl(data.path);
        return {
            success: true,
            url: urlData.publicUrl
        };
    } catch (error) {
        console.error("Upload error:", error);
        return {
            success: false,
            error: "Beklenmeyen bir hata oluştu"
        };
    }
}
async function deleteImage(url) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return {
                success: false,
                error: "Yetkilendirme gerekli"
            };
        }
        const urlObj = new URL(url);
        const parts = urlObj.pathname.split("/");
        const bucketIndex = parts.indexOf("products");
        if (bucketIndex === -1) {
            return {
                success: false,
                error: "Geçersiz URL: Bucket bulunamadı"
            };
        }
        const filePath = decodeURIComponent(parts.slice(bucketIndex + 1).join("/"));
        const normalizedPath = filePath.replace(/\\/g, "/").replace(/\.{2,}/g, "").replace(/^\/+/, "");
        const userPathRegex = new RegExp(`^(products|thumbnails|gallery|categories)/${user.id}/[^/]+\\.(jpg|jpeg|png|webp|gif)$`, "i");
        if (!normalizedPath || !userPathRegex.test(normalizedPath)) {
            return {
                success: false,
                error: "Bu dosyayı silme yetkiniz yok"
            };
        }
        const { error } = await supabase.storage.from("products").remove([
            normalizedPath
        ]);
        if (error) {
            console.error("Storage delete error:", error);
            return {
                success: false,
                error: "Dosya silinirken hata oluştu"
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("Delete error:", error);
        return {
            success: false,
            error: "Beklenmeyen bir hata oluştu"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    uploadImage,
    deleteImage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadImage, "40c6d07bcd6516487bc565ee5b0d487f40504ece14", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteImage, "4084d6058781d6f140f28557f89a6a91d277e8f22f", null);
}),
"[project]/.next-internal/server/app/[locale]/dashboard/products/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/products/get-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/products/create-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/products/update-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/products/delete-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/actions/products/get-products.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE9 => \"[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE10 => \"[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE11 => \"[project]/actions/storage/upload-image.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$get$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/get-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$create$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/create-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$update$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/update-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$delete$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/delete-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$get$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/get-products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$storage$2f$upload$2d$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/storage/upload-image.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/[locale]/dashboard/products/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/products/get-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/products/create-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/products/update-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/actions/products/delete-product.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/actions/products/get-products.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE9 => \"[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE10 => \"[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE11 => \"[project]/actions/storage/upload-image.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0038bce317a2a57066ecf2ba8a75e64fe59efcfbcb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"],
    "4022e5374ea159f3545f609cad69b1314fa818c2e8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSlugWithRedirect"],
    "4042fb1f20f6e7bf1fe1653d1a26d2cb0f160b4c58",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$update$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProduct"],
    "406f398892cba3352cb7711df1283bce6f2af16206",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$get$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProduct"],
    "4084d6058781d6f140f28557f89a6a91d277e8f22f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$storage$2f$upload$2d$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteImage"],
    "409cfbae81cb8f69fe4ebb6b0b760ec92745f84a59",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryById"],
    "409df23208f038155188217921ba192e5bedeffd2a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$delete$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProduct"],
    "40a9c974796a6edbe65790c0015f20226a07ec6ccc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$create$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProduct"],
    "40b814a6ec7363b852546fc9ff000a8458441e5878",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategory"],
    "40c6d07bcd6516487bc565ee5b0d487f40504ece14",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$storage$2f$upload$2d$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadImage"],
    "40ccf76a488c82bae742c4b70054a19f76cfd2555d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$get$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"],
    "40e22fb17e1ecb14d84009a4b55a100bd219e0c2f7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCategory"],
    "40f7c0309a9a1c20d90f72008e87f8f215395b13be",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategory"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f$dashboard$2f$products$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$products$2f$get$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$actions$2f$products$2f$create$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$actions$2f$products$2f$update$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$actions$2f$products$2f$delete$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$actions$2f$products$2f$get$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE7__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE8__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE9__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE10__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE11__$3d3e$__$225b$project$5d2f$actions$2f$storage$2f$upload$2d$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/dashboard/products/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/products/get-product.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/actions/products/create-product.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/actions/products/update-product.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/actions/products/delete-product.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/actions/products/get-products.ts [app-rsc] (ecmascript)", ACTIONS_MODULE7 => "[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)", ACTIONS_MODULE8 => "[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)", ACTIONS_MODULE9 => "[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)", ACTIONS_MODULE10 => "[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)", ACTIONS_MODULE11 => "[project]/actions/storage/upload-image.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$get$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/get-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$create$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/create-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$update$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/update-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$delete$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/delete-product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$products$2f$get$2d$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/products/get-products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$storage$2f$upload$2d$image$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/storage/upload-image.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_47bc4fa7._.js.map