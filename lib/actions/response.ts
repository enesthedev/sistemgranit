import type { ActionResponse } from "@/types/api";

export class ActionError extends Error {
  constructor(
    message: string,
    public code: string = "UNKNOWN_ERROR",
    public details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ActionError";
  }
}

export function successResponse<T = void>(data?: T): ActionResponse<T> {
  return {
    success: true,
    ...(data !== undefined && { data }),
  } as ActionResponse<T>;
}

export function errorResponse<T = never>(error: unknown): ActionResponse<T> {
  if (error instanceof ActionError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
      code: "INTERNAL_ERROR",
    };
  }

  return {
    success: false,
    error: "Beklenmeyen bir hata oluştu",
    code: "UNKNOWN_ERROR",
  };
}
