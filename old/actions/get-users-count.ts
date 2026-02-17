"use server";

import { createAdminClient } from "@/supabase/admin";

export async function getUsersCount(): Promise<number | null> {
  try {
    const supabaseAdmin = createAdminClient();
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      perPage: 1,
      page: 1,
    });

    if (error) {
      console.error("Error checking users:", error.message);
      return null;
    }

    return data?.users?.length ?? 0;
  } catch {
    return null;
  }
}
