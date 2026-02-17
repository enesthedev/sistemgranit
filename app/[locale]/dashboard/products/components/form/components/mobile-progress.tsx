"use client";

import React from "react";
import { cn } from "@/app/utils";
import type { StepConfig } from "../types";

interface MobileProgressProps {
  steps: StepConfig[];
  currentStep: number;
}

export function MobileProgress({ steps, currentStep }: MobileProgressProps) {
  return (
    <div className="mb-6 xl:hidden">
      <div
        className="scrollbar-none flex items-center justify-between gap-2 overflow-x-auto pb-2"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Form ilerlemesi: Adım ${currentStep + 1} / ${steps.length}`}
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          return (
            <div
              key={step.id}
              className={cn(
                "flex h-2 w-full min-w-16 rounded-full transition-colors",
                isActive
                  ? "bg-primary"
                  : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted",
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <p className="text-foreground mt-2 text-sm font-medium">
        {steps[currentStep].label}
      </p>
      <span className="sr-only">
        Adım {currentStep + 1} / {steps.length}
      </span>
    </div>
  );
}
