"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/utils";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useController, useFormContext } from "react-hook-form";
import { useState } from "react";
import { FormField } from "./form-field";

interface FormTagInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  className?: string;
  maxTags?: number;
}

export function FormTagInput({
  name,
  label,
  placeholder = "Etiket ekle...",
  required = false,
  description,
  disabled = false,
  className,
  maxTags = 20,
}: FormTagInputProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const [inputValue, setInputValue] = useState("");
  const hasError = fieldState.invalid;

  const tags: string[] = field.value || [];

  const addTag = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
      field.onChange([...tags, trimmed]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    field.onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
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
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
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
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || tags.length >= maxTags}
            className={cn(hasError && "border-destructive")}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={addTag}
            disabled={disabled || !inputValue.trim() || tags.length >= maxTags}
          >
            <IconPlus className="h-4 w-4" />
          </Button>
        </div>
        {tags.length >= maxTags && (
          <p className="text-muted-foreground text-xs">
            Maksimum {maxTags} etiket ekleyebilirsiniz.
          </p>
        )}
      </div>
    </FormField>
  );
}
