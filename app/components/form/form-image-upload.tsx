"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/utils";
import { useField, useFormikContext } from "formik";
import { toast } from "sonner";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import type { FilePondFile, FilePondInitialFile } from "filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

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

  const initialFiles = useMemo((): FilePondInitialFile[] => {
    const currentValue = field.value;
    if (multiple) {
      const urls = (currentValue as string[]) || [];
      return urls.map((url) => ({
        source: url,
        options: { type: "local" },
      }));
    } else if (currentValue) {
      return [
        {
          source: currentValue as string,
          options: { type: "local" },
        },
      ];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [files, setFiles] = useState<FilePondInitialFile[]>(initialFiles);

  const handleRemoveFile = (error: unknown, file: FilePondFile) => {
    const serverId = file.serverId;
    if (serverId) {
      if (multiple) {
        const currentUrls = (field.value as string[]) || [];
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
            const formData = new FormData();
            formData.append("file", file as File);
            formData.append("folder", folder);

            progress(true, 0, (file as File).size);

            uploadImage(formData)
              .then((result) => {
                progress(true, (file as File).size, (file as File).size);

                if (result.success && result.url) {
                  if (multiple) {
                    const currentUrls = (field.value as string[]) || [];
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
              .catch(() => {
                error("Yükleme hatası");
                toast.error("Görsel yüklenirken hata oluştu");
              });

            return {
              abort: () => {},
            };
          },
          revert: (uniqueFileId, load, error) => {
            deleteImage(uniqueFileId)
              .then((result) => {
                if (result.success) {
                  if (multiple) {
                    const currentUrls = (field.value as string[]) || [];
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
          load: (source, load, error, _progress, abort) => {
            fetch(source as string)
              .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.blob();
              })
              .then((blob) => {
                if (!blob.type.startsWith("image/")) {
                  // Not an image, maybe fail gracefully or just load it but it won't preview
                  console.warn(
                    "FilePond load: File is not an image",
                    blob.type,
                  );
                }
                load(blob);
              })
              .catch(() => error("Görsel yüklenemedi"));
            return { abort };
          },
        }}
        onremovefile={handleRemoveFile}
        labelIdle='<span class="filepond--label-action">Dosya Seçin</span> veya sürükleyin'
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
        imagePreviewHeight={120}
      />
      <style jsx global>{`
        .filepond-wrapper .filepond--root {
          font-family: inherit;
          margin-bottom: 0;
        }
        .filepond-wrapper .filepond--panel-root {
          background-color: transparent;
          border: 2px dashed hsl(var(--border));
          border-radius: var(--radius);
        }
        .filepond-wrapper .filepond--drop-label {
          color: hsl(var(--muted-foreground));
          font-size: 0.875rem;
        }
        .filepond-wrapper .filepond--label-action {
          color: hsl(var(--primary));
          text-decoration: underline;
        }
        .filepond-wrapper .filepond--item-panel {
          background-color: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: calc(var(--radius) - 2px);
        }
        .filepond-wrapper .filepond--file-action-button {
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--border));
          cursor: pointer;
        }
        .filepond-wrapper .filepond--image-preview-overlay-success {
          color: hsl(var(--green-500));
        }
      `}</style>
    </FormField>
  );
}
