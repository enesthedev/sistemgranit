"use client";

import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/utils";
import { useController, useFormContext } from "react-hook-form";
import { FormField } from "./form-field";

interface FormNumberInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function FormNumberInput({
  name,
  label,
  placeholder,
  required = false,
  description,
  disabled = false,
  min,
  max,
  step = 1,
  suffix,
  prefix,
  className,
}: FormNumberInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const hasError = fieldState.invalid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    field.onChange(value === "" ? null : parseFloat(value));
  };

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      <div className="relative">
        {prefix && (
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
            {prefix}
          </span>
        )}
        <Input
          id={name}
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          aria-invalid={hasError ? "true" : undefined}
          className={cn(
            prefix && "pl-8",
            suffix && "pr-12",
            hasError && "border-destructive",
          )}
          name={field.name}
          ref={field.ref}
          onBlur={field.onBlur}
          value={field.value ?? ""}
          onChange={handleChange}
        />
        {suffix && (
          <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </FormField>
  );
}
