"use client";

import React, { lazy, Suspense, useMemo, useEffect } from "react";
import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "@/types/product";
import { cn } from "@/app/utils";

import type { FormValues, ProductFormProps } from "./types";
import { validationSchema } from "./schema";
import { STEPS, initialValues } from "./constants";
import { useStepNavigation, useProductForm } from "./hooks";
import {
  FormHeader,
  FormSidebar,
  MobileProgress,
  FormErrorBoundary,
} from "./components";

const BasicInfoStep = lazy(() =>
  import("./steps/basic-info-step").then((mod) => ({
    default: mod.BasicInfoStep,
  })),
);
const PhysicalPropertiesStep = lazy(() =>
  import("./steps/physical-properties-step").then((mod) => ({
    default: mod.PhysicalPropertiesStep,
  })),
);
const TechnicalDetailsStep = lazy(() =>
  import("./steps/technical-details-step").then((mod) => ({
    default: mod.TechnicalDetailsStep,
  })),
);
const DimensionsStep = lazy(() =>
  import("./steps/dimensions-step").then((mod) => ({
    default: mod.DimensionsStep,
  })),
);
const SeoStep = lazy(() =>
  import("./steps/seo-step").then((mod) => ({ default: mod.SeoStep })),
);

function StepSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-6">
      <div className="bg-muted h-8 w-1/3 rounded" />
      <div className="bg-muted h-4 w-2/3 rounded" />
      <div className="bg-muted h-32 rounded-lg" />
    </div>
  );
}

function getFormInitialValues(product: Product | undefined): FormValues {
  if (!product) return initialValues;

  return {
    name: product.name,
    description: product.description || "",
    category: undefined,
    category_id: product.category_id || "",
    status: product.status as FormValues["status"],
    price_per_sqm: product.price_per_sqm ?? null,
    currency: (product.currency || "TRY") as FormValues["currency"],
    thumbnail: product.thumbnail || "",
    images: product.images || [],
    origin_country: product.origin_country || "",
    origin_region: product.origin_region || "",
    color_primary: product.color_primary || "",
    color_secondary: product.color_secondary || "",
    pattern: (product.pattern as FormValues["pattern"]) || null,
    finish_types: (product.finish_types as FormValues["finish_types"]) || [],
    density: product.density ?? null,
    water_absorption: product.water_absorption ?? null,
    compressive_strength: product.compressive_strength ?? null,
    flexural_strength: product.flexural_strength ?? null,
    abrasion_resistance: product.abrasion_resistance || "",
    hardness_mohs: product.hardness_mohs ?? null,
    frost_resistant: product.frost_resistant || false,
    available_thicknesses: product.available_thicknesses || [],
    max_slab_width: product.max_slab_width ?? null,
    max_slab_length: product.max_slab_length ?? null,
    min_order_quantity: product.min_order_quantity || 1,
    applications: (product.applications as FormValues["applications"]) || [],
    is_suitable_for_exterior: product.is_suitable_for_exterior || false,
    is_suitable_for_kitchen: product.is_suitable_for_kitchen || false,
    seo_title: product.seo_title || "",
    seo_description: product.seo_description || "",
    tags: product.tags || [],
  };
}

export function Form({ product, mode, categories }: ProductFormProps) {
  const { handleSubmit: onSubmit, isEditing } = useProductForm({
    product,
    mode,
  });

  const formInitialValues = useMemo(
    () => getFormInitialValues(product),
    [product],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema) as Resolver<FormValues>,
    defaultValues: formInitialValues,
  });

  useEffect(() => {
    form.reset(formInitialValues);
  }, [formInitialValues]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitForm = () => form.handleSubmit(onSubmit)();

  return (
    <FormProvider {...form}>
      <FormContent
        product={product}
        isEditing={isEditing}
        isSubmitting={form.formState.isSubmitting}
        submitForm={submitForm}
        name={form.watch("name")}
        status={form.watch("status")}
        categories={categories}
      />
    </FormProvider>
  );
}

interface FormContentProps {
  product?: Product;
  isEditing: boolean;
  isSubmitting: boolean;
  submitForm: () => void;
  name: string;
  status: FormValues["status"];
  categories: ProductFormProps["categories"];
}

function FormContent({
  product,
  isEditing,
  isSubmitting,
  submitForm,
  name,
  status,
  categories,
}: FormContentProps) {
  const {
    currentStep,
    handleNext,
    handleBack,
    isFirstStep,
    isLastStep,
    goToStep,
  } = useStepNavigation({
    totalSteps: STEPS.length,
    onComplete: submitForm,
  });

  return (
    <div className="flex flex-1 flex-col">
      <FormHeader
        title={name}
        currentStep={currentStep}
        steps={STEPS}
        isEditing={isEditing}
        status={status}
        isSubmitting={isSubmitting}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onNext={handleNext}
        onBack={handleBack}
      />

      <form className="flex flex-1 flex-col overflow-y-auto">
        <div className="grid flex-1 grid-cols-1 xl:grid-cols-12">
          <FormSidebar
            steps={STEPS}
            currentStep={currentStep}
            onStepChange={goToStep}
          />

          <main
            className="xl:col-span-9"
            role="tabpanel"
            id={`step-panel-${STEPS[currentStep].id}`}
          >
            <MobileProgress steps={STEPS} currentStep={currentStep} />

            <div className="min-h-[500px] space-y-6">
              <FormErrorBoundary>
                <Suspense fallback={<StepSkeleton />}>
                  <StepContent
                    currentStep={currentStep}
                    productId={product?.id}
                    categories={categories}
                  />
                </Suspense>
              </FormErrorBoundary>
            </div>
          </main>
        </div>
      </form>
    </div>
  );
}

interface StepContentProps {
  currentStep: number;
  productId?: string;
  categories: ProductFormProps["categories"];
}

function StepContent({ currentStep, productId, categories }: StepContentProps) {
  const stepClassName =
    "animate-in fade-in slide-in-from-bottom-4 duration-500 will-change-transform";

  switch (currentStep) {
    case 0:
      return (
        <div className={cn(stepClassName, "space-y-6")}>
          <BasicInfoStep productId={productId} categories={categories} />
        </div>
      );
    case 1:
      return (
        <div className={cn(stepClassName)}>
          <PhysicalPropertiesStep />
        </div>
      );
    case 2:
      return (
        <div className={cn(stepClassName)}>
          <TechnicalDetailsStep />
        </div>
      );
    case 3:
      return (
        <div className={cn(stepClassName)}>
          <DimensionsStep />
        </div>
      );
    case 4:
      return (
        <div className={cn(stepClassName)}>
          <SeoStep />
        </div>
      );
    default:
      return null;
  }
}
