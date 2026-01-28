"use client";

import React, { lazy, Suspense, useMemo } from "react";
import { Form as FormikForm, Formik } from "formik";
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
    category: product.category,
    status: product.status,
    price_per_sqm: product.price_per_sqm,
    currency: product.currency || "TRY",
    thumbnail: product.thumbnail || "",
    images: product.images || [],
    origin_country: product.origin_country || "",
    origin_region: product.origin_region || "",
    color_primary: product.color_primary || "",
    color_secondary: product.color_secondary || "",
    pattern: product.pattern || "",
    finish_types: product.finish_types || [],
    density: product.density,
    water_absorption: product.water_absorption,
    compressive_strength: product.compressive_strength,
    flexural_strength: product.flexural_strength,
    abrasion_resistance: product.abrasion_resistance || "",
    hardness_mohs: product.hardness_mohs,
    frost_resistant: product.frost_resistant || false,
    available_thicknesses: product.available_thicknesses || [],
    max_slab_width: product.max_slab_width,
    max_slab_length: product.max_slab_length,
    min_order_quantity: product.min_order_quantity || 1,
    applications: product.applications || [],
    is_suitable_for_exterior: product.is_suitable_for_exterior || false,
    is_suitable_for_kitchen: product.is_suitable_for_kitchen || false,
    seo_title: product.seo_title || "",
    seo_description: product.seo_description || "",
    tags: product.tags || [],
  };
}

export function Form({ product, mode }: ProductFormProps) {
  const { handleSubmit, isEditing } = useProductForm({ product, mode });

  const formInitialValues = useMemo(
    () => getFormInitialValues(product),
    [product],
  );

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, submitForm, values }) => (
        <FormContent
          product={product}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          submitForm={submitForm}
          values={values}
        />
      )}
    </Formik>
  );
}

interface FormContentProps {
  product?: Product;
  isEditing: boolean;
  isSubmitting: boolean;
  submitForm: () => Promise<void>;
  values: FormValues;
}

function FormContent({
  product,
  isEditing,
  isSubmitting,
  submitForm,
  values,
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
    productId: product?.id,
  });

  return (
    <div className="flex flex-1 flex-col">
      <FormHeader
        title={values.name}
        currentStep={currentStep}
        steps={STEPS}
        isEditing={isEditing}
        status={values.status}
        isSubmitting={isSubmitting}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onNext={handleNext}
        onBack={handleBack}
      />

      <FormikForm className="flex flex-1 flex-col overflow-y-auto">
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
                  />
                </Suspense>
              </FormErrorBoundary>
            </div>
          </main>
        </div>
      </FormikForm>
    </div>
  );
}

interface StepContentProps {
  currentStep: number;
  productId?: string;
}

function StepContent({ currentStep, productId }: StepContentProps) {
  const stepClassName =
    "animate-in fade-in slide-in-from-bottom-4 duration-500 will-change-transform";

  switch (currentStep) {
    case 0:
      return (
        <div className={cn(stepClassName, "space-y-6")}>
          <BasicInfoStep productId={productId} />
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
