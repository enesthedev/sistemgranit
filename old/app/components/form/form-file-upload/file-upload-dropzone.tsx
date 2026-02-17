"use client";

import React, { useCallback, useRef } from "react";
import { cn } from "@/app/utils";
import { IconCloudUpload } from "@tabler/icons-react";
import type { FileUploadDropzoneProps } from "./types";

const DEFAULT_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export function FileUploadDropzone({
  onFilesSelected,
  isDragging,
  onDragChange,
  multiple = false,
  disabled = false,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  maxSizeMB = 5,
}: FileUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        onDragChange(true);
      }
    },
    [disabled, onDragChange],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onDragChange(false);
    },
    [onDragChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onDragChange(false);

      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      const imageFiles = droppedFiles.filter((file) =>
        acceptedTypes.includes(file.type),
      );

      if (imageFiles.length > 0) {
        onFilesSelected(multiple ? imageFiles : [imageFiles[0]]);
      }
    },
    [disabled, onDragChange, onFilesSelected, multiple, acceptedTypes],
  );

  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        onFilesSelected(selectedFiles);
      }
      e.target.value = "";
    },
    [onFilesSelected],
  );

  const acceptString = acceptedTypes.join(",");

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Dosya yüklemek için tıklayın veya sürükleyin"
      aria-disabled={disabled}
      className={cn(
        "group flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 transition-all duration-200",
        "border-border bg-transparent",
        "hover:border-primary/50 hover:bg-muted/30",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        isDragging && "border-primary bg-muted/50 border-solid",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
      )}
    >
      <IconCloudUpload
        className={cn(
          "text-muted-foreground size-8 transition-colors duration-200",
          "group-hover:text-primary",
          isDragging && "text-primary",
        )}
        aria-hidden="true"
      />
      <div className="text-muted-foreground flex flex-col items-center gap-1 text-center text-sm">
        <p>
          <span className="text-primary font-medium">Dosya Seçin</span>
          <span className="ml-1">veya sürükleyin</span>
        </p>
        <p className="text-xs">JPEG, PNG, WebP, GIF (Maks. {maxSizeMB}MB)</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={acceptString}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
