module.exports = [
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
"[project]/.next-internal/server/app/[locale]/dashboard/categories/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/[locale]/dashboard/categories/page/actions.js { ACTIONS_MODULE0 => \"[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0038bce317a2a57066ecf2ba8a75e64fe59efcfbcb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"],
    "4022e5374ea159f3545f609cad69b1314fa818c2e8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveSlugWithRedirect"],
    "409cfbae81cb8f69fe4ebb6b0b760ec92745f84a59",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryById"],
    "40b814a6ec7363b852546fc9ff000a8458441e5878",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategory"],
    "40e22fb17e1ecb14d84009a4b55a100bd219e0c2f7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCategory"],
    "40f7c0309a9a1c20d90f72008e87f8f215395b13be",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategory"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f$dashboard$2f$categories$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/dashboard/categories/page/actions.js { ACTIONS_MODULE0 => "[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-categories.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$create$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/create-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$update$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/update-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$delete$2d$category$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/delete-category.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$categories$2f$get$2d$category$2d$by$2d$id$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/categories/get-category-by-id.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$utils$2f$slug$2d$redirect$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/utils/slug-redirect.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_ac94982b._.js.map