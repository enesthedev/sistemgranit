"use client";

import { useState, useCallback, useEffect } from "react";

interface UseStepNavigationOptions {
  totalSteps: number;
  onComplete?: () => Promise<void> | void;
  initialStep?: number;
  productId?: string;
}

interface UseStepNavigationReturn {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  goToStep: (step: number) => void;
}

export function useStepNavigation({
  totalSteps,
  onComplete,
  initialStep = 0,
  productId,
}: UseStepNavigationOptions): UseStepNavigationReturn {
  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- productId değiştiğinde step'i sıfırlamak zorunlu
    setCurrentStep(0);
  }, [productId]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = useCallback(async () => {
    if (isLastStep) {
      await onComplete?.();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isLastStep, onComplete, totalSteps]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalSteps],
  );

  return {
    currentStep,
    setCurrentStep,
    handleNext,
    handleBack,
    isFirstStep,
    isLastStep,
    goToStep,
  };
}
