/**
 * Centralized authentication types
 * These types are used for all auth-related operations and ensure type safety
 * across client and server auth operations
 */

import type {
  SignInInput,
  SignUpInput,
  UpdatePasswordInput,
} from "@/app/validations/schemas";

/**
 * Auth user information
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean;
}

/**
 * Auth session information
 */
export interface AuthSession {
  user: AuthUser;
  expiresAt: Date;
}

/**
 * Current user (same as AuthUser, for clarity in client code)
 */
export type CurrentUser = AuthUser;

/**
 * Sign in form data
 * Inferred from the Zod schema for type safety
 */
export type SignInFormData = SignInInput;

/**
 * Sign up form data
 * Inferred from the Zod schema for type safety
 */
export type SignUpFormData = SignUpInput;

/**
 * Update password form data
 * Inferred from the Zod schema for type safety
 */
export type UpdatePasswordFormData = UpdatePasswordInput;

/**
 * Auth client configuration
 */
export interface AuthClientConfig {
  baseURL: string;
}

/**
 * Auth provider response
 */
export interface AuthProviderResponse {
  ok: boolean;
  data?: AuthSession | AuthUser;
  error?: string;
}
