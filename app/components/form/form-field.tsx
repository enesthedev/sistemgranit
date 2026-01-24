"use client";

import { Label } from "@/app/components/ui/label";
import { cn } from "@/utils";
import { useField } from "formik";

interface FormFieldProps {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  name,
  label,
  required = false,
  description,
  children,
  className,
}: FormFieldProps) {
  const [, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const errorId = `${name}-error`;
  const descriptionId = `${name}-description`;

  return (
    <div className={cn("grid gap-2", className)}>
      <Label
        htmlFor={name}
        className={cn("text-sm font-medium", hasError && "text-destructive")}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {description && (
        <p id={descriptionId} className="text-muted-foreground text-xs">
          {description}
        </p>
      )}

      {children}

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="text-destructive animate-in fade-in-50 text-xs font-medium"
        >
          {meta.error}
        </p>
      )}
    </div>
  );
}
