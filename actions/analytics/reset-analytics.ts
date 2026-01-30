"use server";

import { env } from "@/app/env";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export interface ResetAnalyticsResult {
  success: boolean;
  message: string;
  deletedCounts?: {
    pageViews: number;
    sessions: number;
    events: number;
  };
}

export async function resetAnalyticsData(): Promise<ResetAnalyticsResult> {
  // 1. Kullanıcı yetki kontrolü için standart client
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Yetkisiz erişim. Lütfen giriş yapın.",
    };
  }

  // 2. Silme işlemi için Service Role client (Bypass RLS)
  const supabaseAdmin = createSupabaseClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_OR_SECRET_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  try {
    const pageViewsResult = await supabaseAdmin
      .from("page_views")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000")
      .select("id"); // Select ile dönen datayı sayabiliriz

    if (pageViewsResult.error) {
      console.error("Page views delete error:", pageViewsResult.error);
      return {
        success: false,
        message: `Sayfa görüntüleme verileri silinemedi: ${pageViewsResult.error.message}`,
      };
    }

    const sessionsResult = await supabaseAdmin
      .from("sessions")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000")
      .select("id");

    if (sessionsResult.error) {
      console.error("Sessions delete error:", sessionsResult.error);
      return {
        success: false,
        message: `Oturum verileri silinemedi: ${sessionsResult.error.message}`,
      };
    }

    const eventsResult = await supabaseAdmin
      .from("analytics_events")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000")
      .select("id");

    if (eventsResult.error) {
      console.error("Events delete error:", eventsResult.error);
      return {
        success: false,
        message: `Event verileri silinemedi: ${eventsResult.error.message}`,
      };
    }

    const deletedCounts = {
      pageViews: pageViewsResult.data?.length ?? 0,
      sessions: sessionsResult.data?.length ?? 0,
      events: eventsResult.data?.length ?? 0,
    };

    revalidatePath("/dashboard");
    revalidatePath("/tr/dashboard");
    revalidatePath("/en/dashboard");

    return {
      success: true,
      message: "Analitik verileri başarıyla sıfırlandı.",
      deletedCounts,
    };
  } catch (error) {
    console.error("Analytics reset error:", error);
    return {
      success: false,
      message: `Veriler sıfırlanırken bir hata oluştu: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`,
    };
  }
}
