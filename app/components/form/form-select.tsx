"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/utils";
import { IconX } from "@tabler/icons-react";
import { useController, useFormContext } from "react-hook-form";
import { FormField } from "./form-field";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: readonly SelectOption[] | SelectOption[];
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  className?: string;
  nullable?: boolean;
}

const INTERNAL_EMPTY = "__EMPTY__";

export function FormSelect({
  name,
  label,
  options,
  placeholder = "Seçiniz...",
  required = false,
  description,
  disabled = false,
  className,
  nullable = false,
}: FormSelectProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const hasError = fieldState.invalid;

  const handleClear = () => {
    field.onChange("");
  };

  const handleValueChange = (value: string) => {
    if (value === INTERNAL_EMPTY) {
      field.onChange("");
    } else {
      field.onChange(value);
    }
  };

  const filteredOptions = options.filter((opt) => opt.value !== "");

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      <div className="relative">
        <Select
          value={field.value || undefined}
          onValueChange={handleValueChange}
          onOpenChange={(open: boolean) => {
            if (!open) field.onBlur();
          }}
          disabled={disabled}
        >
          <SelectTrigger
            id={name}
            aria-invalid={hasError ? "true" : undefined}
            className={cn(
              "w-full",
              hasError &&
                "border-destructive focus-visible:ring-destructive/50",
              nullable && field.value && "pr-10",
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {filteredOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {nullable && field.value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute top-1/2 right-8 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent"
            disabled={disabled}
          >
            <IconX className="text-muted-foreground hover:text-foreground h-3 w-3" />
          </Button>
        )}
      </div>
    </FormField>
  );
}
