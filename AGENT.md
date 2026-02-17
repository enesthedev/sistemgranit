
# 🤖 Sistem Granit Agent Configuration

> **Last Updated:** 2026-02-17
> **Version:** 1.3.0
> **Location:** `AGENT.md` (Root)

This file serves as the primary configuration and reference guide for the AI agent. The project context and rules are inextricably modularized under the `.agent/` directory.

## 🎯 Project Summary
**Sistem Granit** is a B2B-focused web application designed for managing natural stone products (marble, granite, travertine, etc.). It provides product management, image uploading, and SEO optimization through an admin panel.

## 📂 Context Structure (.agent/)

| Directory/File | Description |
|----------------|-------------|
| `spec/requirement.md` | Project requirements and objectives |
| `spec/design.md` | Database schema, UI components, and form structures |
| `spec/tasks.md` | Pending tasks (TODO), known issues |
| `wiki/architecture.md` | Technology stack, architectural decisions (Auth, i18n), folder structure |
| `plans/` | Future development phases and detailed roadmaps |
| `links/resources.md` | External resources and documentation references |

## 📜 Commands

```bash
# Development
bun run dev

# Build
bun run build

# Lint
bun run lint

# Database (Drizzle + Neon)
bun run drizzle:generate
bun run drizzle:push
```

## 📌 Engineering Standards

1. **File Naming:** kebab-case (e.g., `form-input.tsx`)
2. **Component Naming:** PascalCase (e.g., `FormInput`)
3. **Language:** English for code, comments, and documentation. Turkish for UI text.
4. **Import Order:** 
   - React/Next.js
   - External packages
   - Internal modules (@ alias)
   - Relative imports
5. **Component Structure:**
   - Props interface
   - Component function
   - Helper functions
6. **Server Actions:** Use `"use server"` directive
7. **Client Components:** Use `"use client"` directive
8. **Auth:** Use `Better Auth` via `lib/auth/config.ts`
9. **DB:** Use `Drizzle ORM` via `lib/db/index.ts`

## 🔐 Validation Strategy

### Single Source of Truth: Zod
All validation in the application uses **Zod** for consistency between client and server.

- **Client Forms:** Use Zod schemas with React Hook Form
- **Server Actions:** Use same Zod schemas for input validation
- **Type Inference:** Automatic via `z.infer<typeof schema>`
- **Location:** Centralized in `app/validations/schemas.ts`

### Pattern

```typescript
// Step 1: Define schema once
export const mySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Step 2: Client - Use with React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm({
  resolver: zodResolver(mySchema),
});

// Step 3: Server - Validate input
const result = mySchema.safeParse(input);
if (!result.success) {
  return { success: false, error: result.error.format() };
}
```

### Type Safety

```typescript
// Schemas are organized by feature
export const authSchemas = { signIn, signup, updatePassword };
export const productSchemas = { create, update };
export const categorySchemas = { create, update };

// Types are automatically inferred
export type SignInInput = z.infer<typeof authSchemas.signIn>;
```

### Server Action Responses

All server actions return a unified response type:

```typescript
export type ActionResponse<T = void> = ActionSuccess<T> | ActionError;

interface ActionSuccess<T> {
  success: true;
  data?: T;
}

interface ActionError {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, string[]>;
}
```

## 🔄 Update History

| Date | Change |
|------|--------|
| 2026-01-28 | Initial version created (PROJECT_CONTEXT.md) |
| 2026-01-31 | **Migration:** `.gemini/PROJECT_CONTEXT.md` -> `.agent/` structure adopted |
| 2026-02-02 | **Phase 1:** Form validations (Product & Category) standardized with Zod. |
| 2026-02-03 | **Phase 3:** Advanced Analytics infrastructure established. |
| 2026-02-03 | **Optimization:** "URL-First" Data Table architecture implemented. |
| 2026-02-17 | **Refactor:** `AGENT.md` and `.agent/` structure translated to English and reorganized. |
| 2026-02-17 | **Plan:** Complete re-architecture plan for Neon (Postgres) + Vercel Blob (`.agent/plans/architecture_migration.md`). |
| 2026-02-17 | **Execute:** Migration to Neon + Vercel Blob + Better Auth completed. Supabase dependencies removed. |
| 2026-02-17 | **Lint:** All ESLint errors fixed (13 `any` types, 9 unused vars). |
| 2026-02-17 | **Analysis:** Comprehensive code improvements plan created (`.agent/plans/code_improvements.md`). Identified 7 critical/high issues. |
| 2026-02-17 | **Phase 1 Foundation:** Implemented unified validation & type architecture (Zod centralization, API response types, auth types, config separation). |
| 2026-02-17 | **Refactor (Forms):** All forms migrated from Formik+Yup to React Hook Form+Zod. Formik/Yup/formik-validator-zod removed. |
| 2026-02-17 | **Refactor (Actions):** All server actions standardized with `ActionResponse<T>`, `successResponse()`, `errorResponse()`, `validateInput()`. |
| 2026-02-17 | **Refactor (Slug):** `slug-redirect.ts` merged into `slug-server.ts`. Incorrect `"use server"` directive removed. Client/server boundary clarified. |
