"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/utils";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { useField, useFormikContext } from "formik";
import { useState } from "react";
import { FormField } from "./form-field";

interface SelectOption {
  value: string;
  label: string;
}

interface FormMultiSelectProps {
  name: string;
  label: string;
  options: readonly SelectOption[] | SelectOption[];
  placeholder?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function FormMultiSelect({
  name,
  label,
  options,
  placeholder = "Seçiniz...",
  required = false,
  description,
  disabled = false,
  className,
}: FormMultiSelectProps) {
  const [field, meta] = useField<string[]>(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [open, setOpen] = useState(false);
  const hasError = meta.touched && meta.error;

  const selectedValues = field.value || [];

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setFieldValue(name, newValues);
  };

  const removeOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFieldValue(
      name,
      selectedValues.filter((v) => v !== value),
    );
  };

  const getLabel = (value: string) => {
    return options.find((o) => o.value === value)?.label || value;
  };

  return (
    <FormField
      name={name}
      label={label}
      required={required}
      description={description}
      className={className}
    >
      <Popover
        open={open}
        onOpenChange={(isOpen: boolean) => {
          setOpen(isOpen);
          if (!isOpen) setFieldTouched(name, true);
        }}
      >
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "h-auto min-h-10 w-full justify-between py-2",
              hasError && "border-destructive",
              !selectedValues.length && "text-muted-foreground",
            )}
          >
            <div className="flex flex-wrap gap-1">
              {selectedValues.length > 0 ? (
                selectedValues.map((value) => (
                  <Badge key={value} variant="secondary" className="mr-1 mb-1">
                    {getLabel(value)}
                    <button
                      type="button"
                      className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                      onClick={(e) => removeOption(value, e)}
                    >
                      <IconX className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
            <IconChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[200px] p-0" align="start">
          <div className="max-h-64 overflow-auto p-1">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={cn(
                    "relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none",
                    "hover:bg-accent hover:text-accent-foreground",
                    isSelected && "bg-accent",
                  )}
                >
                  <IconCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </FormField>
  );
}
