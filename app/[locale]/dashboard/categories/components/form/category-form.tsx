"use client";

import React, { lazy, Suspense, useMemo } from "react";
import { Form as FormikForm, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { cn } from "@/app/utils";
import { CategoryFormValues, CategoryFormProps } from "./types";
import { categoryValidationSchema } from "./schema";
import { STEPS, initialValues } from "./constants";
import { useCategoryForm } from "./hooks/use-category-form";
import { useStepNavigation } from "@/app/[locale]/dashboard/products/components/form/hooks/use-step-navigation";
import { Button } from "@/app/components/ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { Category } from "@/types/category";

const BasicInfoStep = lazy(() =>
  import("./steps/basic-info-step").then((mod) => ({
    default: mod.BasicInfoStep,
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

function getFormInitialValues(
  category: Category | undefined,
): CategoryFormValues {
  if (!category) return initialValues;

  return {
    id: category.id,
    name: category.name || "",
    slug: category.slug || "",
    description: category.description || "",
    image_url: category.image_url || "",
    seo_title: category.seo_title || "",
    seo_description: category.seo_description || "",
  };
}

export function CategoryForm({ category, mode }: CategoryFormProps) {
  const { handleSubmit, isEditing } = useCategoryForm({ category, mode });

  const formInitialValues = useMemo(
    () => getFormInitialValues(category),
    [category],
  );

  return (
    <Formik
      initialValues={formInitialValues}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validate={withZodSchema(categoryValidationSchema) as any}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, submitForm, values }) => (
        <CategoryFormContent
          category={category}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          submitForm={submitForm}
          values={values}
        />
      )}
    </Formik>
  );
}

interface CategoryFormContentProps {
  category?: Category;
  isEditing: boolean;
  isSubmitting: boolean;
  submitForm: () => Promise<void>;
  values: CategoryFormValues;
}

function CategoryFormContent({
  category,
  isEditing,
  isSubmitting,
  submitForm,
  values,
}: CategoryFormContentProps) {
  const router = useRouter();
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
      {/* Header */}
      <div className="bg-background sticky top-0 z-10 flex items-center justify-between border-b px-4 py-4">
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.back()}
          >
            <IconArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              {values.name || "Yeni Kategori"}
            </h1>
            <p className="text-muted-foreground hidden text-xs md:block">
              {STEPS[currentStep].title} • Adım {currentStep + 1} /{" "}
              {STEPS.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstStep || isSubmitting}
            className={cn(
              "border-border/50 bg-background text-muted-foreground hidden h-9 min-w-[100px] items-center justify-center gap-1.5 rounded-lg border px-4 text-sm font-medium md:flex",
              isFirstStep && "pointer-events-none opacity-40",
            )}
          >
            <IconChevronLeft className="size-4" />
            Geri
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className={cn(
              "h-9 min-w-[100px] items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-medium",
              isLastStep
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-primary text-primary-foreground",
            )}
          >
            {isLastStep ? (
              <>
                <IconCircleCheck className="size-4" />
                {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
              </>
            ) : (
              <>
                İlerle
                <IconChevronRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <FormikForm className="flex flex-1 flex-col overflow-y-auto p-6">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => goToStep(index)}
                className={cn(
                  "flex flex-col gap-1 border-b-2 px-1 pb-4 text-left transition-all",
                  currentStep === index
                    ? "border-primary"
                    : "border-transparent opacity-50 hover:opacity-100",
                )}
              >
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  Adım {index + 1}
                </span>
                <span className="font-semibold">{step.title}</span>
              </button>
            ))}
          </div>

          <Suspense fallback={<StepSkeleton />}>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {currentStep === 0 && (
                <BasicInfoStep
                  mode={isEditing ? "edit" : "create"}
                  categoryId={category?.id}
                />
              )}
              {currentStep === 1 && <SeoStep />}
            </div>
          </Suspense>
        </div>
      </FormikForm>
    </div>
  );
}
