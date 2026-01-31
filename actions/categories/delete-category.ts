"use server";

import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Yetkisiz işlem. Lütfen giriş yapın.",
    };
  }

  // Bağlı ürün kontrolü
  const { count, error: countError } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if (countError) {
    return {
      success: false,
      error: "Ürün kontrolü yapılamadı.",
    };
  }

  if (count && count > 0) {
    return {
      success: false,
      error: `Bu kategoriye bağlı ${count} adet ürün var. Önce ürünleri başka kategoriye taşıyın veya silin.`,
    };
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/dashboard/categories");

  return {
    success: true,
  };
}
