"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/utils";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
} from "@tabler/icons-react";
import type { StepConfig } from "../types";

interface FormHeaderProps {
  title: string;
  currentStep: number;
  steps: StepConfig[];
  isEditing: boolean;
  status?: string;
  isSubmitting: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function FormHeader({
  title,
  currentStep,
  steps,
  isEditing,
  status,
  isSubmitting,
  isFirstStep,
  isLastStep,
  onNext,
  onBack,
}: FormHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b px-4 py-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
          aria-label="Geri dön"
        >
          <IconArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            {title || "Adsız Ürün"}
          </h1>
          <p className="text-muted-foreground hidden text-xs md:block">
            {steps[currentStep].label} • Adım {currentStep + 1} / {steps.length}
          </p>
        </div>
        {isEditing && (
          <Badge variant="outline" className="ml-2">
            {status === "active" ? "Yayında" : "Taslak"}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isFirstStep || isSubmitting}
          className={cn(
            "border-border/50 bg-background text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground hidden h-9 min-w-[100px] items-center justify-center gap-1.5 rounded-lg border px-4 text-sm font-medium transition-all md:flex",
            isFirstStep && "pointer-events-none opacity-40",
          )}
          aria-label="Önceki adım"
        >
          <IconChevronLeft className="size-4" aria-hidden="true" />
          Geri
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className={cn(
            "h-9 min-w-[100px] items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-all",
            isSubmitting && "pointer-events-none opacity-60",
            isLastStep
              ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-sm hover:from-emerald-600 hover:to-emerald-700 hover:shadow-md"
              : "from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary bg-linear-to-r shadow-sm hover:shadow-md",
          )}
          aria-label={isLastStep ? "Formu kaydet" : "Sonraki adım"}
        >
          {isLastStep ? (
            <>
              <IconCircleCheck className="size-4" aria-hidden="true" />
              {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
            </>
          ) : (
            <>
              İlerle
              <IconChevronRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
