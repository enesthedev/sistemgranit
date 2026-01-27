"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/app/utils";
import { useField, useFormikContext } from "formik";
import { toast } from "sonner";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import type { FilePondFile, FilePondInitialFile } from "filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./form-image-upload.css";

import { deleteImage, uploadImage } from "@/actions/storage/upload-image";
import { FormField } from "./form-field";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

interface FormImageUploadProps {
  name: string;
  label: string;
  folder: "products" | "thumbnails" | "gallery";
  required?: boolean;
  description?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  className?: string;
}

export function FormImageUpload({
  name,
  label,
  folder,
  required = false,
  description,
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 5,
  className,
}: FormImageUploadProps) {
  const [field] = useField<string | string[]>(name);
  const { setFieldValue } = useFormikContext();

  const valuesRef = useRef<string | string[]>(field.value);
  useEffect(() => {
    valuesRef.current = field.value;
  }, [field.value]);

  const getInitialFiles = (value: string | string[]): FilePondInitialFile[] => {
    if (multiple) {
      const urls = (value as string[]) || [];
      return urls.map((url) => ({
        source: url,
        options: { type: "local" as const },
      }));
    } else if (value) {
      return [
        {
          source: value as string,
          options: { type: "local" as const },
        },
      ];
    }
    return [];
  };

  const [files, setFiles] = useState<FilePondInitialFile[]>(() =>
    getInitialFiles(field.value),
  );
  const [isLoadingExisting, setIsLoadingExisting] = useState(() => {
    const initial = getInitialFiles(field.value);
    return initial.length > 0;
  });

  const previousValueRef = useRef<string | string[] | null>(field.value);

  useEffect(() => {
    const currentFieldValue = field.value;
    const prevValue = previousValueRef.current;

    const currentValueStr = JSON.stringify(currentFieldValue);
    const prevValueStr = JSON.stringify(prevValue);

    if (currentValueStr === prevValueStr) {
      return;
    }

    previousValueRef.current = currentFieldValue;

    const hasValue = multiple
      ? currentFieldValue && (currentFieldValue as string[]).length > 0
      : !!currentFieldValue;

    if (hasValue) {
      const newFiles = getInitialFiles(currentFieldValue);
      setFiles(newFiles);
      setIsLoadingExisting(true);
    } else {
      setFiles([]);
      setIsLoadingExisting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, multiple]);

  const handleRemoveFile = (error: unknown, file: FilePondFile) => {
    if (error) {
      console.warn("File remove error:", error);
      return;
    }

    const serverId = file.serverId;
    if (serverId) {
      if (multiple) {
        const currentUrls = (valuesRef.current as string[]) || [];
        setFieldValue(
          name,
          currentUrls.filter((url) => url !== serverId),
        );
      } else {
        setFieldValue(name, "");
      }
    }
  };

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={cn("filepond-wrapper", className)}
    >
      {isLoadingExisting && (
        <div className="filepond--loading-skeleton" aria-hidden="true" />
      )}
      <FilePond
        files={files}
        onupdatefiles={(fileItems) => {
          setFiles(
            fileItems.map(
              (fileItem) =>
                ({
                  source: fileItem.serverId || fileItem.source,
                  options: { type: fileItem.origin === 1 ? "local" : "input" },
                }) as FilePondInitialFile,
            ),
          );
        }}
        allowMultiple={multiple}
        maxFiles={multiple ? maxFiles : 1}
        maxFileSize={`${maxSizeMB}MB`}
        acceptedFileTypes={[
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
        ]}
        server={{
          process: (_fieldName, file, _metadata, load, error, progress) => {
            const controller = new AbortController();
            const formData = new FormData();
            formData.append("file", file as File);
            formData.append("folder", folder);

            progress(true, 0, (file as File).size);

            let isAborted = false;

            uploadImage(formData)
              .then((result) => {
                if (isAborted) return;

                progress(true, (file as File).size, (file as File).size);

                if (result.success && result.url) {
                  if (multiple) {
                    const currentUrls = (valuesRef.current as string[]) || [];
                    setFieldValue(name, [...currentUrls, result.url]);
                  } else {
                    setFieldValue(name, result.url);
                  }
                  load(result.url);
                } else {
                  error(result.error || "Yükleme başarısız");
                  toast.error(result.error || "Görsel yüklenemedi");
                }
              })
              .catch((err) => {
                if (isAborted || err?.name === "AbortError") {
                  return;
                }
                error("Yükleme hatası");
                toast.error("Görsel yüklenirken hata oluştu");
              });

            return {
              abort: () => {
                isAborted = true;
                controller.abort();
              },
            };
          },
          revert: (uniqueFileId, load, error) => {
            deleteImage(uniqueFileId)
              .then((result) => {
                if (result.success) {
                  if (multiple) {
                    const currentUrls = (valuesRef.current as string[]) || [];
                    setFieldValue(
                      name,
                      currentUrls.filter((url) => url !== uniqueFileId),
                    );
                  } else {
                    setFieldValue(name, "");
                  }
                  load();
                } else {
                  error(result.error || "Silme başarısız");
                }
              })
              .catch(() => {
                error("Silme hatası");
              });
          },
          load: (source, load, error, progress, _abort) => {
            const controller = new AbortController();

            fetch(source as string, { signal: controller.signal })
              .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const contentType = res.headers.get("content-type");
                if (!contentType?.startsWith("image/")) {
                  throw new Error("Not an image");
                }

                const total = parseInt(
                  res.headers.get("content-length") || "0",
                );
                if (total > 0) {
                  progress(true, 0, total);
                }

                return res.blob();
              })
              .then((blob) => {
                load(blob);
              })
              .catch((err) => {
                if (err.name !== "AbortError") {
                  error(`Görsel yüklenemedi: ${err.message}`);
                  toast.error("Mevcut görsel yüklenirken hata oluştu");
                }
              })
              .finally(() => {
                setIsLoadingExisting(false);
              });

            return {
              abort: () => controller.abort(),
            };
          },
        }}
        onremovefile={handleRemoveFile}
        labelIdle={`
          <div class="filepond--label-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filepond--icon">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p>
              <span class="filepond--label-action">Dosya Seçin</span>
              <span class="filepond--label-text">veya sürükleyin</span>
            </p>
          </div>
        `}
        labelFileProcessing="Yükleniyor..."
        labelFileProcessingComplete="Yüklendi"
        labelFileProcessingAborted="İptal edildi"
        labelFileProcessingError="Hata"
        labelTapToCancel="İptal"
        labelTapToRetry="Tekrar Dene"
        labelTapToUndo="Geri Al"
        labelButtonRemoveItem="Kaldır"
        labelButtonAbortItemLoad="İptal"
        labelButtonRetryItemLoad="Tekrar"
        labelButtonAbortItemProcessing="İptal"
        labelButtonUndoItemProcessing="Geri Al"
        labelButtonRetryItemProcessing="Tekrar"
        labelButtonProcessItem="Yükle"
        labelMaxFileSizeExceeded="Dosya çok büyük"
        labelMaxFileSize={`Maksimum ${maxSizeMB}MB`}
        labelFileTypeNotAllowed="Geçersiz tür"
        fileValidateTypeLabelExpectedTypes="JPEG, PNG, WebP, GIF"
        credits={false}
        imagePreviewHeight={150}
        allowImagePreview={true}
      />
    </FormField>
  );
}
