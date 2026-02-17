"use server";

import { getUsersCount } from "@/actions";
import { auth } from "@/lib/auth";
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

    if (count === null) {
      return {
        error:
          "Sistem durum bilgisi alınamadı. Lütfen internet bağlantınızı kontrol edin.",
      };
    }

    if (count > 0) {
      return {
        error:
          "Sistemde zaten kayıtlı kullanıcı var. Karşılama işlemi kapatıldı.",
      };
    }

    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
      headers: await headers(),
    });

    if (!res) {
      return { error: "Kayıt işlemi başarısız oldu." };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("Beklenmeyen hata:", err);
    return {
      error:
        err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.",
    };
  }
}
