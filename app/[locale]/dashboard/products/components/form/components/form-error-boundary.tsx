"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/app/components/ui/button";
import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";

interface FormErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface FormErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class FormErrorBoundary extends Component<
  FormErrorBoundaryProps,
  FormErrorBoundaryState
> {
  constructor(props: FormErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): FormErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Form Error Boundary caught an error:", error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8">
          <div className="bg-destructive/10 text-destructive rounded-full p-3">
            <IconAlertTriangle className="size-8" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">Bir Hata Oluştu</h3>
            <p className="text-muted-foreground mt-1 max-w-md text-sm">
              Form yüklenirken beklenmeyen bir hata meydana geldi. Lütfen
              sayfayı yenileyin veya tekrar deneyin.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="bg-muted mt-4 max-w-md rounded-lg p-3 text-left text-xs">
                <summary className="cursor-pointer font-medium">
                  Hata Detayı
                </summary>
                <pre className="mt-2 overflow-auto whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
          <Button
            variant="outline"
            onClick={this.handleRetry}
            className="mt-2 gap-2"
          >
            <IconRefresh className="size-4" />
            Tekrar Dene
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
