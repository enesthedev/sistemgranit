export type FileUploadStatus = "pending" | "uploading" | "success" | "error";

export interface FileUploadFile {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  status: FileUploadStatus;
  progress: number;
  error?: string;
}

export type FolderType = "products" | "thumbnails" | "gallery" | "categories";

export interface UseFileUploadOptions {
  folder: FolderType;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: string) => void;
}

export interface UseFileUploadReturn {
  uploadFile: (file: File) => Promise<string | null>;
  deleteFile: (url: string) => Promise<boolean>;
  validateFile: (file: File) => ValidationResult;
  isUploading: boolean;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface FormFileUploadProps {
  name: string;
  label: string;
  folder: FolderType;
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  required?: boolean;
  description?: string;
  className?: string;
  resetKey?: string | number;
}

export interface FileUploadDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  isDragging: boolean;
  onDragChange: (isDragging: boolean) => void;
  multiple?: boolean;
  disabled?: boolean;
  acceptedTypes?: string[];
  maxSizeMB?: number;
}

export interface FileUploadItemProps {
  file: FileUploadFile;
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
}

export interface FileUploadPreviewProps {
  files: FileUploadFile[];
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
  sortable?: boolean;
  onReorder?: (files: FileUploadFile[]) => void;
}
