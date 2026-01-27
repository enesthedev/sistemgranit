import type { Product } from "@/types/product";

export interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

export interface FormValues {
  name: string;
  description: string;
  category: string;
  status: string;
  price_per_sqm: number | null;
  currency: string;
  thumbnail: string;
  images: string[];
  origin_country: string;
  origin_region: string;
  color_primary: string;
  color_secondary: string;
  pattern: string;
  finish_types: string[];
  density: number | null;
  water_absorption: number | null;
  compressive_strength: number | null;
  flexural_strength: number | null;
  abrasion_resistance: string;
  hardness_mohs: number | null;
  frost_resistant: boolean;
  available_thicknesses: number[];
  max_slab_width: number | null;
  max_slab_length: number | null;
  min_order_quantity: number | null;
  applications: string[];
  is_suitable_for_exterior: boolean;
  is_suitable_for_kitchen: boolean;
  seo_title: string;
  seo_description: string;
  tags: string[];
}

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
