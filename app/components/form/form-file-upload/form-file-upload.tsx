"use client";

import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "@/app/utils";
import { toast } from "sonner";
import { FormField } from "../form-field";
import { FileUploadDropzone } from "./file-upload-dropzone";
import { FileUploadPreview } from "./file-upload-preview";
import { useFileUpload } from "./use-file-upload";
import type { FileUploadFile, FormFileUploadProps } from "./types";

const DEFAULT_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export function FormFileUpload({
  name,
  label,
  folder,
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 5,
  required = false,
  description,
  className,
  resetKey,
}: FormFileUploadProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  const setFieldValue = (_name: string, value: unknown) => field.onChange(value);

  const [files, setFiles] = useState<FileUploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const previousResetKeyRef = useRef<string | number | undefined>(resetKey);
  const previousFieldValueRef = useRef<string | string[] | null>(null);
  const pendingUploadsRef = useRef<Map<string, File>>(new Map());
  const valuesRef = useRef<string | string[]>(field.value);

  useEffect(() => {
    valuesRef.current = field.value;
  }, [field.value]);

  const { uploadFile, deleteFile, validateFile, isUploading } = useFileUpload({
    folder,
    maxSizeMB,
    acceptedTypes: DEFAULT_ACCEPTED_TYPES,
  });

  useEffect(() => {
    if (resetKey !== undefined && resetKey !== previousResetKeyRef.current) {
      setFiles([]);
      pendingUploadsRef.current.clear();
      previousResetKeyRef.current = resetKey;
    }
  }, [resetKey]);

  useEffect(() => {
    const currentValue = field.value;
    const prevValue = previousFieldValueRef.current;

    const currentStr = JSON.stringify(currentValue);
    const prevStr = JSON.stringify(prevValue);

    if (currentStr === prevStr) {
      return;
    }

    previousFieldValueRef.current = currentValue;

    const urls: string[] = multiple
      ? (currentValue as string[]) || []
      : currentValue
        ? [currentValue as string]
        : [];

    const validUrls = urls.filter(Boolean);

    if (validUrls.length === 0) {
      setFiles((prev) => prev.filter((f) => f.status !== "success"));
      return;
    }

    setFiles((prev) => {
      const existingIds = new Set(prev.map((f) => f.id));
      const newFiles: FileUploadFile[] = [];

      for (const url of validUrls) {
        if (!existingIds.has(url)) {
          newFiles.push({
            id: url,
            url,
            name: url.split("/").pop() || "image",
            size: 0,
            type: "image/jpeg",
            status: "success",
            progress: 100,
          });
        }
      }

      const updatedPrev = prev.filter(
        (f) => f.status !== "success" || validUrls.includes(f.url),
      );

      return [...updatedPrev, ...newFiles];
    });
  }, [field.value, multiple]);

  const handleFilesSelected = useCallback(
    async (selectedFiles: File[]) => {
      const currentFileCount = files.filter(
        (f) => f.status === "success" || f.status === "uploading",
      ).length;

      const availableSlots = multiple ? maxFiles - currentFileCount : 1;

      if (availableSlots <= 0) {
        toast.error(`Maksimum ${maxFiles} dosya yükleyebilirsiniz.`);
        return;
      }

      const filesToProcess = multiple
        ? selectedFiles.slice(0, availableSlots)
        : [selectedFiles[0]];

      for (const file of filesToProcess) {
        const validation = validateFile(file);
        if (!validation.valid) {
          toast.error(`${file.name}: ${validation.error}`);
          continue;
        }

        const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const objectUrl = URL.createObjectURL(file);

        const newFile: FileUploadFile = {
          id: tempId,
          url: objectUrl,
          name: file.name,
          size: file.size,
          type: file.type,
          status: "uploading",
          progress: 10,
        };

        pendingUploadsRef.current.set(tempId, file);

        if (!multiple) {
          setFiles([newFile]);
        } else {
          setFiles((prev) => [...prev, newFile]);
        }

        setFiles((prev) =>
          prev.map((f) => (f.id === tempId ? { ...f, progress: 30 } : f)),
        );

        const uploadedUrl = await uploadFile(file);

        URL.revokeObjectURL(objectUrl);
        pendingUploadsRef.current.delete(tempId);

        if (uploadedUrl) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === tempId
                ? {
                    ...f,
                    id: uploadedUrl,
                    url: uploadedUrl,
                    status: "success",
                    progress: 100,
                  }
                : f,
            ),
          );

          if (multiple) {
            const currentUrls = (valuesRef.current as string[]) || [];
            if (!currentUrls.includes(uploadedUrl)) {
              setFieldValue(name, [...currentUrls, uploadedUrl]);
            }
          } else {
            setFieldValue(name, uploadedUrl);
          }
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === tempId
                ? {
                    ...f,
                    status: "error",
                    error: "Yükleme başarısız",
                    progress: 0,
                  }
                : f,
            ),
          );
        }
      }
    },
    [files, multiple, maxFiles, validateFile, uploadFile, name, setFieldValue],
  );

  const handleRemoveFile = useCallback(
    async (fileId: string) => {
      const fileToRemove = files.find((f) => f.id === fileId);
      if (!fileToRemove) return;

      setFiles((prev) => prev.filter((f) => f.id !== fileId));

      if (pendingUploadsRef.current.has(fileId)) {
        pendingUploadsRef.current.delete(fileId);
        if (fileToRemove.url.startsWith("blob:")) {
          URL.revokeObjectURL(fileToRemove.url);
        }
        return;
      }

      if (
        fileToRemove.status === "success" &&
        fileToRemove.url.startsWith("http")
      ) {
        await deleteFile(fileToRemove.url);
      }

      if (multiple) {
        const currentUrls = (valuesRef.current as string[]) || [];
        const newUrls = currentUrls.filter((url) => url !== fileToRemove.url);
        setFieldValue(name, newUrls);
      } else {
        setFieldValue(name, "");
      }
    },
    [files, multiple, name, setFieldValue, deleteFile],
  );

  const handleRetryUpload = useCallback(
    async (fileId: string) => {
      const fileToRetry = files.find((f) => f.id === fileId);
      if (!fileToRetry || fileToRetry.status !== "error") return;

      const originalFile = pendingUploadsRef.current.get(fileId);
      if (!originalFile) {
        setFiles((prev) => prev.filter((f) => f.id !== fileId));
        toast.error("Orijinal dosya bulunamadı. Lütfen tekrar seçin.");
        return;
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? { ...f, status: "uploading", progress: 10, error: undefined }
            : f,
        ),
      );

      const uploadedUrl = await uploadFile(originalFile);

      if (uploadedUrl) {
        pendingUploadsRef.current.delete(fileId);
        if (fileToRetry.url.startsWith("blob:")) {
          URL.revokeObjectURL(fileToRetry.url);
        }

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  id: uploadedUrl,
                  url: uploadedUrl,
                  status: "success",
                  progress: 100,
                }
              : f,
          ),
        );

        if (multiple) {
          const currentUrls = (valuesRef.current as string[]) || [];
          if (!currentUrls.includes(uploadedUrl)) {
            setFieldValue(name, [...currentUrls, uploadedUrl]);
          }
        } else {
          setFieldValue(name, uploadedUrl);
        }
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  status: "error",
                  error: "Yükleme başarısız",
                  progress: 0,
                }
              : f,
          ),
        );
      }
    },
    [files, uploadFile, multiple, name, setFieldValue],
  );

  const handleReorder = useCallback(
    (reorderedFiles: FileUploadFile[]) => {
      setFiles(reorderedFiles);

      if (multiple) {
        const successUrls = reorderedFiles
          .filter((f) => f.status === "success")
          .map((f) => f.url);
        setFieldValue(name, successUrls);
      }
    },
    [multiple, name, setFieldValue],
  );

  const canAddMore = useMemo(() => {
    const activeCount = files.filter(
      (f) => f.status === "success" || f.status === "uploading",
    ).length;
    return multiple ? activeCount < maxFiles : activeCount === 0;
  }, [files, multiple, maxFiles]);

  const showDropzone = canAddMore && !isUploading;

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={cn(className)}
    >
      {showDropzone && (
        <FileUploadDropzone
          onFilesSelected={handleFilesSelected}
          isDragging={isDragging}
          onDragChange={setIsDragging}
          multiple={multiple}
          disabled={isUploading}
          acceptedTypes={DEFAULT_ACCEPTED_TYPES}
          maxSizeMB={maxSizeMB}
        />
      )}
      <FileUploadPreview
        files={files}
        onRemove={handleRemoveFile}
        onRetry={handleRetryUpload}
        sortable={multiple && files.length > 1}
        onReorder={handleReorder}
      />
    </FormField>
  );
}
