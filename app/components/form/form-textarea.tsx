"use client";

import { cn } from "@/app/utils";
import { useController, useFormContext } from "react-hook-form";
import { FormField } from "./form-field";

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export function FormTextarea({
  name,
  label,
  placeholder,
  required = false,
  description,
  disabled = false,
  rows = 3,
  className,
}: FormTextareaProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const hasError = fieldState.invalid;

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      <textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={cn(
          "border-input flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-destructive focus-visible:ring-destructive/50",
        )}
        {...field}
      />
    </FormField>
  );
}
