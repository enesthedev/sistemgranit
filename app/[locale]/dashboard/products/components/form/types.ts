import type { Product } from "@/types/product";

export interface CategoryOption {
  value: string;
  label: string;
}

export interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
  categories: CategoryOption[];
}

import { z } from "zod";
import { createProductSchema } from "@/app/validations/product";

// Derived from Zod Schema
export type FormValues = z.infer<typeof createProductSchema>;

export interface StepConfig {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  isSubmitting: boolean;
  onNext: () => void;
  onBack: () => void;
  steps: StepConfig[];
}
