"use server";

import { put, del } from "@vercel/blob";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, error: "Yetkilendirme gerekli" };
  }

  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "uploads";

  if (!file) {
    return { success: false, error: "Dosya bulunamadı" };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Sadece JPEG, PNG, WebP ve GIF dosyaları yüklenebilir",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "Dosya boyutu 5MB'dan küçük olmalı" };
  }

  try {
    // Vercel Blob handles filename backend matching, but we can prefix it
    const filename = `${folder}/${file.name}`;

    const blob = await put(filename, file, {
      access: "public",
      // token: process.env.BLOB_READ_WRITE_TOKEN // Auto-inferred
    });

    return { success: true, url: blob.url };
  } catch (error) {
    console.error("Blob upload error:", error);
    return { success: false, error: "Dosya yüklenirken hata oluştu" };
  }
}

export async function deleteImage(
  url: string,
): Promise<{ success: boolean; error?: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, error: "Yetkilendirme gerekli" };
  }

  try {
    await del(url);
    return { success: true };
  } catch (error) {
    console.error("Blob delete error:", error);
    return { success: false, error: "Dosya silinirken hata oluştu" };
  }
}
