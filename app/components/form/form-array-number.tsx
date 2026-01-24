"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/utils";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useField, useFormikContext } from "formik";
import { useState } from "react";
import { FormField } from "./form-field";

interface FormArrayNumberProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  className?: string;
  unit?: string;
  maxItems?: number;
}

export function FormArrayNumber({
  name,
  label,
  placeholder = "Değer ekle...",
  required = false,
  description,
  disabled = false,
  className,
  unit,
  maxItems = 20,
}: FormArrayNumberProps) {
  const [field, meta] = useField<number[]>(name);
  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = useState("");
  const hasError = meta.touched && meta.error;

  const values = field.value || [];

  const addValue = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num) && !values.includes(num) && values.length < maxItems) {
      setFieldValue(
        name,
        [...values, num].sort((a, b) => a - b),
      );
      setInputValue("");
    }
  };

  const removeValue = (valueToRemove: number) => {
    setFieldValue(
      name,
      values.filter((v) => v !== valueToRemove),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue();
    }
  };

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      <div className="space-y-2">
        {values.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {values.map((value) => (
              <Badge key={value} variant="secondary">
                {value}
                {unit && (
                  <span className="text-muted-foreground ml-0.5">{unit}</span>
                )}
                <button
                  type="button"
                  onClick={() => removeValue(value)}
                  disabled={disabled}
                  className="ml-1"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled || values.length >= maxItems}
              className={cn(hasError && "border-destructive", unit && "pr-12")}
              step="0.1"
            />
            {unit && (
              <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 text-sm">
                {unit}
              </span>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addValue}
            disabled={disabled || !inputValue || values.length >= maxItems}
          >
            <IconPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </FormField>
  );
}
