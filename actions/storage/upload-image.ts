"use server";

import { createClient } from "@/supabase/server";
import { z } from "zod";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const uploadSchema = z.object({
  folder: z.enum(["products", "thumbnails", "gallery"]),
});

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "Yetkilendirme gerekli" };
    }

    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string;

    if (!file) {
      return { success: false, error: "Dosya bulunamadı" };
    }

    const validation = uploadSchema.safeParse({ folder });
    if (!validation.success) {
      return { success: false, error: "Geçersiz klasör" };
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

    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const sanitizedExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(
      fileExt || "",
    )
      ? fileExt
      : "jpg";

    const uniqueId = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const fileName = `${folder}/${user.id}/${uniqueId}.${sanitizedExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return { success: false, error: "Dosya yüklenirken hata oluştu" };
    }

    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(data.path);

    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}

export async function deleteImage(
  url: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: "Yetkilendirme gerekli" };
    }

    const urlObj = new URL(url);
    const parts = urlObj.pathname.split("/");
    const bucketIndex = parts.indexOf("products");

    if (bucketIndex === -1) {
      return { success: false, error: "Geçersiz URL: Bucket bulunamadı" };
    }

    const filePath = decodeURIComponent(parts.slice(bucketIndex + 1).join("/"));

    const normalizedPath = filePath
      .replace(/\\/g, "/")
      .replace(/\.{2,}/g, "")
      .replace(/^\/+/, "");

    const userPathRegex = new RegExp(
      `^(products|thumbnails|gallery)/${user.id}/[^/]+\\.(jpg|jpeg|png|webp|gif)$`,
      "i",
    );

    if (!normalizedPath || !userPathRegex.test(normalizedPath)) {
      return { success: false, error: "Bu dosyayı silme yetkiniz yok" };
    }

    const { error } = await supabase.storage
      .from("products")
      .remove([normalizedPath]);

    if (error) {
      console.error("Storage delete error:", error);
      return { success: false, error: "Dosya silinirken hata oluştu" };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Beklenmeyen bir hata oluştu" };
  }
}
