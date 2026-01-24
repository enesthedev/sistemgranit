"use client";

import { Input } from "@/app/components/ui/input";
import { cn } from "@/utils";
import { useField } from "formik";
import { FormField } from "./form-field";

interface FormInputProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

export function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  description,
  disabled = false,
  className,
  inputClassName,
}: FormInputProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={cn(
          hasError && "border-destructive focus-visible:ring-destructive/50",
          inputClassName,
        )}
        {...field}
      />
    </FormField>
  );
}
