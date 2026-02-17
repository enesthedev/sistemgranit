/**
 * Unified server action response types
 * These types are used across all server actions for consistent error handling and responses
 */

/**
 * Success response from a server action
 * @template T - The type of data returned on success (defaults to void)
 */
export interface ActionSuccess<T = void> {
  success: true;
  data?: T;
}

/**
 * Error response from a server action
 * Includes error message, optional error code, and detailed validation errors
 */
export interface ActionError {
  success: false;
  error: string;
  code?: string; // e.g., "VALIDATION_ERROR", "AUTH_ERROR", "NOT_FOUND"
  details?: Record<string, string[]>;
}

/**
 * Combined action response type
 * Use this for all server action return types
 * @template T - The type of data returned on success
 *
 * @example
 * ```tsx
 * async function createProduct(
 *   input: unknown
 * ): Promise<ActionResponse<CreateProductResponse>> {
 *   // implementation
 * }
 * ```
 */
export type ActionResponse<T = void> = ActionSuccess<T> | ActionError;

/**
 * Helper type to extract the success data type from an ActionResponse
 * @example
 * ```tsx
 * type ProductData = ActionResponseData<typeof createProduct>;
 * ```
 */
export type ActionResponseData<T extends ActionResponse<unknown>> =
  T extends ActionSuccess<infer D> ? D : never;

/**
 * Product creation response
 */
export interface CreateProductResponse {
  id: string;
  slug: string;
}

/**
 * Category creation response
 */
export interface CreateCategoryResponse {
  id: string;
  slug: string;
}

/**
 * Auth session response
 */
export interface AuthSessionResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    emailVerified: boolean;
  };
  session: {
    id: string;
    expiresAt: Date;
  };
}

/**
 * Sign in response
 */
export interface SignInResponse {
  email: string;
  name: string | null;
}

/**
 * Sign up response
 */
export interface SignUpResponse {
  email: string;
  name: string;
}
