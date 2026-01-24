"use server";

import { getUsersCount } from "@/actions";
import { createClient } from "@/supabase/server";
import { headers } from "next/headers";

export interface SignUpState {
  error?: string;
  success?: boolean;
}

export async function signUpAdmin(
  prevState: SignUpState | undefined,
  formData: FormData,
): Promise<SignUpState> {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;

  if (!email || !password || !fullName) {
    return { error: "Lütfen tüm alanları doldurun." };
  }

  if (password !== repeatPassword) {
    return { error: "Şifreler eşleşmiyor." };
  }

  try {
    const count = await getUsersCount();

    if (count > 0) {
      return {
        error:
          "Sistemde zaten kayıtlı kullanıcı var. Karşılama işlemi kapatıldı.",
      };
    }

    const supabase = await createClient();
    const origin = (await headers()).get("origin");

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: fullName,
          role: "admin",
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (signUpError) {
      return { error: signUpError.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Beklenmeyen hata:", err);
    return { error: "Beklenmeyen bir hata oluştu." };
  }
}
