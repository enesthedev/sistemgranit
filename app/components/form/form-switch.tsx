"use client";

import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";
import { cn } from "@/utils";
import { useField, useFormikContext } from "formik";

interface FormSwitchProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function FormSwitch({
  name,
  label,
  description,
  disabled = false,
  className,
}: FormSwitchProps) {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="space-y-0.5">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
      <Switch
        id={name}
        checked={field.value}
        onCheckedChange={(checked) => setFieldValue(name, checked)}
        disabled={disabled}
      />
    </div>
  );
}
