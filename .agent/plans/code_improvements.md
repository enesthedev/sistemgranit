# 🏗️ Comprehensive Code Refactoring & Improvements Plan

> **Status:** Active Planning  
> **Version:** 1.0.0  
> **Created:** 2026-02-17  
> **Estimated Timeline:** 5 phases (~2-3 weeks)

---

## 📋 Executive Summary

This document outlines a systematic approach to improve code organization, reduce technical debt, and standardize patterns across the Sistem Granit project. Current issues include:

- **Validation Library Duplication**: Yup + Zod used simultaneously
- **Auth Module Fragmentation**: Split between `lib/auth.ts` and `lib/auth-client.ts`
- **Orphaned Schema File**: `auth-schema.ts` at root (should be in `lib/db/`)
- **Form Management Inconsistency**: Formik + Yup in client forms while server actions use Zod
- **Missing Type Centralization**: Auth types scattered across multiple files

---

## 🎯 Project Health Scorecard

| Aspect | Score | Status | Priority |
|--------|-------|--------|----------|
| **Architecture Clarity** | 6/10 | ⚠️ Needs Work | HIGH |
| **Type Safety** | 7/10 | ✓ Good | MEDIUM |
| **DX (Developer Experience)** | 6/10 | ⚠️ Needs Work | HIGH |
| **Code Duplication** | 5/10 | ❌ Critical | CRITICAL |
| **Documentation** | 8/10 | ✓ Good | LOW |
| **Validation Strategy** | 4/10 | ❌ Critical | CRITICAL |
| **Folder Organization** | 6/10 | ⚠️ Needs Work | MEDIUM |

---

## 🔍 Detailed Problem Analysis

### 1. **Validation Library Duplication** (CRITICAL)

#### Current State
```
app/
├── [locale]/
│   ├── auth/
│   │   ├── sign-in/form.tsx          → uses Yup
│   │   ├── update-password/form.tsx  → uses Yup
│   └── onboarding/form.tsx           → uses Yup
│
└── validations/
    ├── product.ts                    → uses Zod
    └── category.ts                   → uses Zod

actions/
├── products/create-product.ts        → uses Zod
└── categories/create-category.ts     → uses Zod

package.json
├── "formik": "^2.4.9"               ← Installed
├── "yup": "^1.7.1"                  ← Installed
├── "zod": "^4.3.5"                  ← Installed
└── "formik-validator-zod": "^2.2.0" ← Adapter (unused)
```

#### Problems
1. **Cognitive Load**: Developers need to know both validation libraries
2. **Inconsistent Error Messages**: Yup and Zod have different error structures
3. **Code Duplication**: Schema definitions repeated in Yup and Zod
4. **Unused Dependency**: `formik-validator-zod` installed but not used
5. **Maintenance Overhead**: Changes require updates in two places

#### Root Cause
- Legacy migration: Sign-in forms pre-date Zod adoption
- Lack of plan for unified validation across client/server

---

### 2. **Auth Module Fragmentation** (HIGH)

#### Current State
```
lib/
├── auth.ts                      ← Server-side Better Auth config
└── auth-client.ts              ← Client-side authentication client

Routes Import:
├── app/[locale]/auth/sign-in/form.tsx
│   └── Does NOT import from auth-client (missing integration)
│
├── app/[locale]/onboarding/form.tsx
│   └── Does NOT import from auth-client
│
└── app/[locale]/onboarding/actions.ts
    └── Uses auth.api.signUpEmail() directly
```

#### Problems
1. **Type Mismatch**: Client and server auth types not synchronized
2. **Missing Client Usage**: `authClient` not utilized in client components
3. **Manual API Calls**: Components call `auth.api.*` instead of using client SDK
4. **Session Management**: No clear pattern for client-side session management
5. **Error Handling**: Inconsistent error handling between auth locations

#### Root Cause
- Better Auth integration incomplete
- Client hooks not created for common auth operations

---

### 3. **Orphaned Root-Level Schema File** (MEDIUM)

#### Current State
```
sistemgranit/
├── auth-schema.ts              ← ❌ WRONG LOCATION (DUPLICATE!)
│   └── User, Session, Account, Verification tables
│
└── lib/db/
    └── schema.ts               ← ✓ CORRECT LOCATION
        └── User, Session, Account, Verification, Products, Categories
```

#### Problems
1. **File Duplication**: Auth schema defined in two places
2. **Import Confusion**: `lib/auth.ts` imports from root, others from `lib/db/`
3. **Maintenance Risk**: Schema changes need updates in multiple locations
4. **Build Performance**: Unnecessary file parsing
5. **Git History Pollution**: Hard to track which schema is authoritative

#### Root Cause
- Incomplete migration when moving from standalone auth setup

---

### 4. **Form Management Inconsistency** (HIGH)

#### Current State

**Client-Side (Formik + Yup):**
```typescript
// app/[locale]/auth/sign-in/form.tsx
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const formik = useFormik({
  initialValues: { email: "", password: "" },
  validationSchema,
  onSubmit: async (values) => {
    // Handle sign-in
  },
});
```

**Server-Side (Zod):**
```typescript
// actions/products/create-product.ts
const validation = createProductSchema.safeParse(input);
if (!validation.success) {
  return { success: false, error: validation.error.issues[0]?.message };
}
```

#### Problems
1. **Schema Duplication**: Email validation defined in Yup AND server Zod
2. **Validation Logic Split**: Some validation client (Formik) vs server (Zod)
3. **Type Generation**: Yup schemas don't generate TypeScript types automatically
4. **Performance**: No shared validation logic between client/server
5. **Maintenance**: Adding a field requires changes in 2-3 places

#### Root Cause
- Formik chosen for established forms without considering unified strategy
- Server actions use Zod without updating client forms

---

### 5. **Missing Type Centralization** (MEDIUM)

#### Current State
```
lib/auth.ts
├── ✓ Defines auth config
└── ❌ No exported types for auth response/user

lib/auth-client.ts
├── createAuthClient({ baseURL })
└── ❌ No response type definitions

types/
├── product.ts
├── category.ts
└── ❌ Missing auth.ts for unified auth types

actions/
├── products/create-product.ts
│   └── Defines ActionResult inline
├── categories/create-category.ts
│   └── Defines ActionResult inline
└── ❌ No shared action types
```

#### Problems
1. **Repeated Type Definitions**: ActionResult defined inline in each action
2. **Auth Type Ambiguity**: session, user types not explicitly typed
3. **No Shared Utilities**: Response patterns duplicated across modules
4. **IDE Autocomplete Issues**: Missing type exports reduce DX
5. **Runtime Safety Gaps**: Untyped API responses from Better Auth

#### Root Cause
- No early decision on type organization
- Action result types never formalized into reusable pattern

---

### 6. **Folder Organization Issues** (MEDIUM)

#### Current State
```
app/
├── validations/              ← Server validations only
│   ├── product.ts
│   └── category.ts
│
├── components/form/          ← Only client components
│   ├── form-input.tsx
│   └── form-select.tsx
│
└── [locale]/
    ├── auth/                 ← Forms + actions mixed
    ├── dashboard/
    ├── onboarding/           ← Forms + actions mixed
    └── (public)/
```

#### Problems
1. **Missing Client Validation Folder**: Client-side Yup schemas scattered
2. **Auth Forms Isolation**: Authentication forms hard to find/update
3. **No Feature Folders**: Related forms, types, actions split across directories
4. **Schema Location Ambiguity**: Where should auth schemas be?
5. **Test Organization**: No clear location for validation tests

#### Root Cause
- Started without feature-based structure
- Validations folder created mid-project

---

### 7. **Server Action Error Handling** (MEDIUM)

#### Current State
```typescript
// Different error handling patterns across actions:

// Pattern 1: Using `unknown` type
catch (error: unknown) {
  return {
    success: false,
    error: error instanceof Error ? error.message : "Unknown error",
  };
}

// Pattern 2: Not imported properly
catch (error: any) { ... }

// Pattern 3: Generic error message
catch (error: unknown) {
  console.error("Get product error:", error);
  return { success: false, error: "Unexpected error" };
}
```

#### Problems
1. **Inconsistent Types**: Mix of `unknown`, `any`, and `Error`
2. **Generic Messages**: Users see unhelpful error text
3. **No Error Classification**: Can't distinguish validation vs server errors
4. **Logging Gaps**: Some errors logged, others silent
5. **No Recovery Info**: Error types don't hint at solutions

#### Root Cause
- No unified error handling strategy defined
- Actions created independently without pattern

---

## 📊 Dependency Analysis

### Current Package State
```json
{
  "formik": "^2.4.9",              ← Only used in auth forms
  "yup": "^1.7.1",                 ← Only used in auth forms
  "zod": "^4.3.5",                 ← Used in server actions + validations
  "formik-validator-zod": "^2.2.0" ← Installed but UNUSED
}
```

### Post-Refactor Expected State
```json
{
  "zod": "^4.3.5",                 ← Single validation library
  "react-hook-form": "^7.x",       ← Consider: Better than Formik for modern React
  // formik, yup, formik-validator-zod removed
}
```

---

## 🚀 Multi-Phase Refactoring Plan

### **PHASE 1: Foundation & Planning** (1-2 days)
**Goal**: Create unified validation & type architecture

#### 1.1 Create Unified Validation Layer
**File**: `app/validations/schemas.ts` (new)
```typescript
// Central location for all Zod schemas
export const authSchemas = {
  signIn: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password too short"),
  }),
  signup: z.object({
    fullName: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password too weak"),
    repeatPassword: z.string(),
  }).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  }),
};

export const productSchemas = {
  create: createProductSchema,
  update: updateProductSchema,
};

export const categorySchemas = {
  create: categorySchema,
  update: updateCategorySchema,
};

// Type inference helpers
export type SignInInput = z.infer<typeof authSchemas.signIn>;
export type SignUpInput = z.infer<typeof authSchemas.signup>;
export type CreateProductInput = z.infer<typeof productSchemas.create>;
```

#### 1.2 Create Centralized Type Exports
**File**: `types/api.ts` (new)
```typescript
// Unified server action response types
export interface ActionSuccess<T = void> {
  success: true;
  data?: T;
}

export interface ActionError {
  success: false;
  error: string;
  code?: string; // e.g., "VALIDATION_ERROR", "AUTH_ERROR"
  details?: Record<string, string[]>;
}

export type ActionResponse<T = void> = ActionSuccess<T> | ActionError;

// Auth types
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
  };
  session: {
    id: string;
    expiresAt: Date;
  };
}

export interface CreateProductResponse {
  id: string;
  slug: string;
}
```

**File**: `types/auth.ts` (new)
```typescript
import { z } from "zod";
import { authSchemas } from "@/app/validations/schemas";

export type SignInForm = z.infer<typeof authSchemas.signIn>;
export type SignUpForm = z.infer<typeof authSchemas.signup>;

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: Date;
}
```

#### 1.3 Update AGENT.md Validation Strategy
**File**: `AGENT.md` (update)
```markdown
## Validation Strategy

### Single Source of Truth: Zod
- **Client forms**: Use Zod schemas with React Hook Form
- **Server actions**: Use same Zod schemas for validation
- **Type inference**: Automatic via `z.infer<typeof schema>`

### Pattern
```typescript
// Define once
export const mySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Client: Use with React Hook Form
const form = useForm({
  resolver: zodResolver(mySchema),
});

// Server: Validate input
const result = mySchema.safeParse(input);
```
```

---

### **PHASE 2: Auth Module Unification** (2-3 days)
**Goal**: Centralize auth configuration and create proper client hooks

#### 2.1 Consolidate Auth Configuration
**File**: `lib/auth/config.ts` (new - extract from current auth.ts)
```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const authConfig = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export type Session = typeof authConfig.$Inferred.Session;
export type User = typeof authConfig.$Inferred.User;
```

#### 2.2 Create Unified Auth Exports
**File**: `lib/auth/index.ts` (new)
```typescript
export { authConfig as auth } from "./config";
export { createAuthClient } from "./client";
export type { Session as AuthSession, User as AuthUser } from "./config";

// Server-only utilities
export { getSession } from "./server";
```

#### 2.3 Create Client-Side Auth Hooks
**File**: `lib/auth/hooks.ts` (new)
```typescript
"use client";

import { useEffect, useState } from "react";
import { authClient } from "./client";
import type { AuthSession, AuthUser } from "./config";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await authClient.getSession();
        setSession(response?.data?.session || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch session");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { session, isLoading, error };
}

export async function useAuthServer() {
  const { headers } = await import("next/headers");
  const { getSession } = await import("better-auth/api");
  
  return getSession({
    headers: await headers(),
  });
}
```

#### 2.4 Remove Duplicate auth-schema.ts
**Action**: Delete `/Users/enesbayraktar/Workspace/sistemgranit/auth-schema.ts`
- Verify `lib/db/schema.ts` contains all auth tables
- Update any imports pointing to old location

**Files to Update Imports**:
```typescript
// lib/auth.ts → lib/auth/config.ts already uses lib/db/schema
// No other files should import auth-schema.ts
```

---

### **PHASE 3: Form Unification** (2-3 days)
**Goal**: Migrate all client forms from Formik+Yup to React Hook Form+Zod

#### 3.1 Migrate Auth Forms (Sign In)
**Current**: `app/[locale]/auth/sign-in/form.tsx` (Formik + Yup)
**New**: Use React Hook Form + Zod

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchemas } from "@/app/validations/schemas";

type SignInFormData = typeof authSchemas.signIn._type;

export function SignInForm() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(authSchemas.signIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInUser(data);
      if (result.success) {
        // Navigate
      }
    } catch (error) {
      form.setError("root", { message: error.message });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Fields */}
    </form>
  );
}
```

**Forms to Migrate** (Priority Order):
1. `app/[locale]/auth/sign-in/form.tsx` ✋ using Yup
2. `app/[locale]/onboarding/form.tsx` ✋ using Yup
3. `app/[locale]/auth/update-password/form.tsx` ✋ using Yup

#### 3.2 Create Form Component Adapters
**File**: `app/components/form/form-field-rhf.tsx` (new)
```typescript
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "./form-field";

export function FormFieldRHF({
  name,
  label,
  ...props
}: {
  name: string;
  label: string;
} & React.ComponentProps<typeof FormField>) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormField
          {...field}
          {...props}
          label={label}
          error={error?.message}
        />
      )}
    />
  );
}
```

---

### **PHASE 4: Server Action Standardization** (1-2 days)
**Goal**: Create consistent error handling and response patterns

#### 4.1 Create Action Response Utilities
**File**: `lib/actions/response.ts` (new)
```typescript
import type { ActionResponse } from "@/types/api";

export class ActionError extends Error {
  constructor(
    message: string,
    public code: string = "UNKNOWN_ERROR",
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ActionError";
  }
}

export function successResponse<T = void>(
  data?: T
): ActionResponse<T> {
  return {
    success: true,
    ...(data && { data }),
  };
}

export function errorResponse(error: unknown): ActionResponse {
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
    error: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
  };
}
```

#### 4.2 Create Validation Wrapper
**File**: `lib/actions/validate.ts` (new)
```typescript
import { ZodSchema } from "zod";
import { ActionError } from "./response";

export async function validateInput<T>(
  schema: ZodSchema<T>,
  data: unknown
): Promise<T> {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const details = Object.groupBy(
      result.error.issues,
      (issue) => issue.path.join(".")
    );
    
    throw new ActionError(
      "Validation failed",
      "VALIDATION_ERROR",
      Object.fromEntries(
        Object.entries(details).map(([key, issues]) => [
          key,
          issues?.map((i) => i.message) ?? [],
        ])
      )
    );
  }
  
  return result.data;
}
```

#### 4.3 Refactor All Server Actions
**Pattern** (Before → After):

**Before**:
```typescript
export async function createProduct(input: unknown): Promise<ActionResult> {
  try {
    const validation = createProductSchema.safeParse(input);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0]?.message || "Invalid data",
      };
    }
    // ... create logic
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

**After**:
```typescript
export async function createProduct(
  input: unknown
): Promise<ActionResponse<CreateProductResponse>> {
  try {
    const validatedData = await validateInput(createProductSchema, input);
    
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new ActionError("Unauthorized", "AUTH_ERROR");
    }

    const slug = await generateUniqueSlug(validatedData.name);
    const [newProduct] = await db
      .insert(products)
      .values({ /* ... */ })
      .returning({ id: products.id, slug: products.slug });

    revalidatePath("/dashboard/products");

    return successResponse({
      id: newProduct.id,
      slug: newProduct.slug,
    });
  } catch (error: unknown) {
    console.error("[createProduct]", error);
    return errorResponse(error);
  }
}
```

**Actions to Refactor** (All in `actions/`):
- ✓ All category actions
- ✓ All product actions
- ✓ All onboarding actions

---

### **PHASE 5: Cleanup & Optimization** (1 day)
**Goal**: Remove technical debt and optimize dependencies

#### 5.1 Remove Unused Dependencies
```bash
# Remove from package.json
- formik: "^2.4.9"
- yup: "^1.7.1"
- formik-validator-zod: "^2.2.0"

# Add if not present
+ react-hook-form: "^7.52.0"
+ @hookform/resolvers: "^3.3.4"

# Run
bun install
bun run lint
```

#### 5.2 Add Missing Type File
**File**: `lib/auth/types.ts` (finalize)
```typescript
import type { Session as BetterAuthSession, User as BetterAuthUser } from "better-auth";

export type AuthSession = BetterAuthSession;
export type AuthUser = BetterAuthUser;
export type CurrentUser = BetterAuthUser;
```

#### 5.3 Folder Reorganization (Optional)
**Current**:
```
app/validations/
├── product.ts
└── category.ts
```

**Proposed** (More scalable):
```
app/validations/
├── index.ts           (re-exports all)
├── schemas.ts         (all Zod schemas centralized)
├── product/
│   ├── create.ts
│   ├── update.ts
│   └── index.ts
├── category/
│   ├── create.ts
│   ├── update.ts
│   └── index.ts
└── auth/
    ├── sign-in.ts
    ├── sign-up.ts
    └── index.ts
```

#### 5.4 Update Documentation
- Update `AGENT.md`: Validation strategy section
- Update `.agent/spec/design.md`: Form structure, validation approach
- Add validation examples to `.agent/wiki/architecture.md`

#### 5.5 Final Testing & Validation
```bash
# Run full test suite
bun run lint
bun run build

# Manual testing checklist
- [ ] Sign In flow works
- [ ] Onboarding flow works
- [ ] Product creation validates correctly
- [ ] Category creation validates correctly
- [ ] Error messages display properly
- [ ] No Yup/Formik references in output
```

---

## 📈 Success Metrics

### Code Quality
| Metric | Before | After | Goal |
|--------|--------|-------|------|
| Validation Libraries | 3 (Yup, Zod, Yup) | 1 (Zod) | Single source of truth |
| Error Handling Patterns | 7+ different | 1 standard | Consistency |
| Type Exports | Missing | Complete | Full type safety |
| Duplicate Schemas | 2 (Auth) | 0 | DRY principle |
| Unused Dependencies | 3 | 0 | Clean dependencies |

### Developer Experience
| Metric | Before | After |
|--------|--------|-------|
| Form Migration Time | N/A | 30 mins per form |
| Validation Testing | Manual | Automated |
| Type Inference | Manual | Automatic (Zod) |
| Error Understanding | Generic | Detailed with codes |
| Codebase Navigation | Scattered | Centralized |

---

## 🎬 Implementation Checklist

### Phase 1: Foundation
- [ ] Create `app/validations/schemas.ts`
- [ ] Create `types/api.ts` and `types/auth.ts`
- [ ] Create `lib/auth/config.ts`
- [ ] Update `AGENT.md` validation section
- [ ] Create PR and get review

### Phase 2: Auth Module
- [ ] Create `lib/auth/hooks.ts`
- [ ] Create `lib/auth/index.ts`
- [ ] Delete `auth-schema.ts` (root)
- [ ] Verify imports in `lib/auth.ts`
- [ ] Test auth flow
- [ ] Update `.agent/spec/design.md`

### Phase 3: Form Migration
- [ ] Install `react-hook-form` and `@hookform/resolvers`
- [ ] Create form adapter components
- [ ] Migrate sign-in form
- [ ] Migrate onboarding form
- [ ] Migrate update-password form
- [ ] Test all auth flows

### Phase 4: Server Actions
- [ ] Create `lib/actions/response.ts` and `validate.ts`
- [ ] Refactor all product actions
- [ ] Refactor all category actions
- [ ] Refactor onboarding action
- [ ] Update error handling tests
- [ ] Test error responses

### Phase 5: Cleanup
- [ ] Remove Yup/Formik from dependencies
- [ ] Run `bun run lint`
- [ ] Run `bun run build`
- [ ] Update documentation
- [ ] Final testing checklist
- [ ] Merge to main

---

## 🚨 Risk Mitigation

### High-Risk Areas
1. **Auth Form Migration** → Test thoroughly before removing Formik
2. **Dependency Removal** → Ensure no hidden Yup imports before removing
3. **Type Changes** → Server action responses change shape - update consumers
4. **Data Validation** → Extra validation can catch bugs - add intermediate step

### Rollback Plan
- Keep feature branch until all tests pass
- Create revert commit if issues discovered
- Keep Yup/Formik in dependencies until Phase 5 complete

---

## 📚 References

### Zod Documentation
- [Zod Handbook](https://zod.dev)
- [React Hook Form Integration](https://react-hook-form.com/form-builder)

### Architecture
- [Feature-Based Folder Structure](https://www.patterns.dev/posts/module-pattern/)
- [Error Handling Patterns](https://nodejs.org/en/docs/guides/nodejs-error-handling/)

### Better Auth
- [Better Auth Docs](https://better-auth.com)
- [Drizzle Adapter](https://better-auth.com/docs/reference/adapters/drizzle)

---

## 🤝 Team Handoff Notes

### For Frontend Engineers
- Focus: Form validation unification with Zod
- New Pattern: React Hook Form + Zod resolver
- Testing: Validate error messages match Zod schema

### For Backend Engineers
- Focus: Server action error responses
- New Pattern: ActionError class + response utilities
- Testing: Ensure all edge cases return proper error codes

### For QA
- Regression Test Areas: All auth flows, product CRUD, category CRUD
- New Test Cases: Error code validation, validation message accuracy
- Performance: Measure bundle size reduction after dependency removal

---

## 📅 Timeline Estimate

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1 | 1-2 days | None |
| Phase 2 | 2-3 days | Phase 1 complete |
| Phase 3 | 2-3 days | Phase 1-2 complete |
| Phase 4 | 1-2 days | Phase 1-3 complete |
| Phase 5 | 1 day | Phase 1-4 complete |
| **TOTAL** | **7-11 days** | **~1.5-2 weeks** |

---

## 🎯 Next Steps

1. **Review Plan**: Share with team for feedback (1 day)
2. **Approve Design**: Lock in architectural decisions (1 day)
3. **Begin Phase 1**: Start with foundation work (2 days)
4. **Iterate**: Complete remaining phases in sequence

---

**Owner**: Principle Front-end Engineer  
**Last Updated**: 2026-02-17  
**Status**: Ready for Review
