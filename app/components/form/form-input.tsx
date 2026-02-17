"use client";

import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/utils";
import { useController, useFormContext } from "react-hook-form";
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  onChange,
}: FormInputProps) {
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
        onChange={(e) => {
          field.onChange(e);
          if (onChange) onChange(e);
        }}
      />
    </FormField>
  );
}
