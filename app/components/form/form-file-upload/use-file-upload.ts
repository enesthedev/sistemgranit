"use client";

import { useCallback, useState } from "react";
import { uploadImage, deleteImage } from "@/actions/storage/upload-image";
import { toast } from "sonner";
import type {
  UseFileUploadOptions,
  UseFileUploadReturn,
  ValidationResult,
} from "./types";

const DEFAULT_MAX_SIZE_MB = 5;
const DEFAULT_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export function useFileUpload(
  options: UseFileUploadOptions,
): UseFileUploadReturn {
  const {
    folder,
    maxSizeMB = DEFAULT_MAX_SIZE_MB,
    acceptedTypes = DEFAULT_ACCEPTED_TYPES,
    onUploadComplete,
    onUploadError,
  } = options;

  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback(
    (file: File): ValidationResult => {
      if (!acceptedTypes.includes(file.type)) {
        return {
          valid: false,
          error:
            "Geçersiz dosya tipi. Sadece JPEG, PNG, WebP, GIF kabul edilir.",
        };
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return {
          valid: false,
          error: `Dosya boyutu ${maxSizeMB}MB'dan küçük olmalı.`,
        };
      }

      if (file.size === 0) {
        return {
          valid: false,
          error: "Boş dosya yüklenemez.",
        };
      }

      return { valid: true };
    },
    [acceptedTypes, maxSizeMB],
  );

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.error);
        onUploadError?.(validation.error!);
        return null;
      }

      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      try {
        const result = await uploadImage(formData);

        if (result.success && result.url) {
          onUploadComplete?.(result.url);
          return result.url;
        }

        const errorMsg = result.error || "Yükleme başarısız";
        onUploadError?.(errorMsg);
        toast.error(errorMsg);
        return null;
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Yükleme sırasında hata oluştu";
        onUploadError?.(errorMsg);
        toast.error(errorMsg);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [folder, validateFile, onUploadComplete, onUploadError],
  );

  const deleteFile = useCallback(async (url: string): Promise<boolean> => {
    if (!url || !url.startsWith("http")) {
      return true;
    }

    try {
      const result = await deleteImage(url);

      if (result.success) {
        return true;
      }

      toast.error(result.error || "Silme başarısız");
      return false;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Silme sırasında hata oluştu";
      toast.error(errorMsg);
      return false;
    }
  }, []);

  return {
    uploadFile,
    deleteFile,
    validateFile,
    isUploading,
  };
}
