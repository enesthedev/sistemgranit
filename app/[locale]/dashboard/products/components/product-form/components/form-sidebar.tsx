"use client";

import React from "react";
import { cn } from "@/app/utils";
import { IconCheck } from "@tabler/icons-react";
import type { StepConfig } from "../product-form.types";

interface FormSidebarProps {
  steps: StepConfig[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function FormSidebar({
  steps,
  currentStep,
  onStepChange,
}: FormSidebarProps) {
  return (
    <aside className="hidden h-full border-r xl:col-span-3 xl:block">
      <nav
        className="sticky top-0 space-y-0"
        role="tablist"
        aria-label="Form adımları"
      >
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "step" : undefined}
              aria-controls={`step-panel-${step.id}`}
              id={`step-tab-${step.id}`}
              onClick={() => onStepChange(index)}
              className={cn(
                "group hover:bg-muted flex w-full items-center justify-start gap-3 rounded-none border-b px-4 py-5 text-left text-sm font-medium transition-colors",
                isActive && "bg-muted text-primary",
                !isActive && "text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                  isActive && "bg-background text-primary",
                  isCompleted && "bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "bg-background",
                )}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <IconCheck className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isActive && "text-foreground",
                  )}
                >
                  {step.label}
                </span>
                <span className="text-muted-foreground text-xs font-normal">
                  {step.description}
                </span>
                <span className="sr-only">
                  {isCompleted
                    ? "Tamamlandı"
                    : isActive
                      ? "Mevcut adım"
                      : "Bekliyor"}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
