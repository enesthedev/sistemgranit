"use client";

import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/app/utils";
import { useController, useFormContext } from "react-hook-form";

interface FormCheckboxProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function FormCheckbox({
  name,
  label,
  description,
  disabled = false,
  className,
}: FormCheckboxProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const hasError = fieldState.invalid;

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Checkbox
        id={name}
        checked={field.value}
        onCheckedChange={(checked) => field.onChange(checked)}
        disabled={disabled}
        aria-invalid={hasError ? "true" : undefined}
      />
      <div className="space-y-0.5 leading-none">
        <Label
          htmlFor={name}
          className={cn(
            "cursor-pointer text-sm font-medium",
            hasError && "text-destructive",
          )}
        >
          {label}
        </Label>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
        {hasError && (
          <p className="text-destructive text-xs font-medium">
            {fieldState.error?.message}
          </p>
        )}
      </div>
    </div>
  );
}
