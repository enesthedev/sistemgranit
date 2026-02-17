"use server";

import { createClient } from "@/supabase/server";

export async function getCategoryById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data;
}
