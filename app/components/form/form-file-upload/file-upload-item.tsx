"use client";

import React, { useState } from "react";
import { cn } from "@/app/utils";
import {
  IconX,
  IconAlertCircle,
  IconLoader2,
  IconRefresh,
} from "@tabler/icons-react";
import type { FileUploadItemProps } from "./types";

export function FileUploadItem({
  file,
  onRemove,
  onRetry,
}: FileUploadItemProps) {
  const [imageError, setImageError] = useState(false);

  const isError = file.status === "error";
  const isUploading = file.status === "uploading";
  const isPending = file.status === "pending";
  const isSuccess = file.status === "success";

  const handleImageError = () => {
    setImageError(true);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(file.id);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRetry?.(file.id);
  };

  return (
    <div
      className={cn(
        "group bg-muted relative aspect-square overflow-hidden rounded-lg border transition-all duration-200",
        isError && "border-destructive",
        isSuccess && "border-border",
        (isUploading || isPending) && "border-primary/50",
      )}
    >
      {!imageError ? (
        // eslint-disable-next-line @next/next/no-img-element -- blob: URL ve dinamik external URL'ler için next/image uygun değil
        <img
          src={file.url}
          alt={file.name}
          className="size-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div className="bg-muted flex size-full items-center justify-center">
          <IconAlertCircle className="text-muted-foreground size-8" />
        </div>
      )}

      {isSuccess && (
        <div
          className={cn(
            "bg-background/80 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200",
            "group-hover:opacity-100",
          )}
        >
          <button
            type="button"
            onClick={handleRemove}
            className="bg-destructive text-destructive-foreground flex size-9 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
            aria-label={`${file.name} dosyasını kaldır`}
          >
            <IconX className="size-4" />
          </button>
        </div>
      )}

      {(isUploading || isPending) && (
        <>
          <div className="bg-background/70 absolute inset-0 flex items-center justify-center">
            <IconLoader2 className="text-primary size-8 animate-spin" />
          </div>
          <div className="bg-muted absolute inset-x-0 bottom-0 h-1">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        </>
      )}

      {isError && (
        <>
          <div className="bg-background/80 absolute inset-0 flex flex-col items-center justify-center gap-2">
            <IconAlertCircle className="text-destructive size-6" />
            {file.error && (
              <p className="text-destructive max-w-[90%] truncate text-center text-xs">
                {file.error}
              </p>
            )}
            <div className="flex gap-2">
              {onRetry && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
                  aria-label="Tekrar dene"
                >
                  <IconRefresh className="size-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleRemove}
                className="bg-destructive text-destructive-foreground flex size-8 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
                aria-label="Kaldır"
              >
                <IconX className="size-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
