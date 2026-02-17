# 🤖 Sistem Granit Agent Configuration

> **Last Updated:** 2026-02-17
> **Version:** 1.2.0
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

# Supabase CLI
bunx supabase migration new <name>
bunx supabase db push
bunx supabase gen types typescript --linked > supabase/database.types.ts
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

## 🔄 Update History

| Date | Change |
|------|--------|
| 2026-01-28 | Initial version created (PROJECT_CONTEXT.md) |
| 2026-01-31 | **Migration:** `.gemini/PROJECT_CONTEXT.md` -> `.agent/` structure adopted |
| 2026-02-02 | **Phase 1:** Form validations (Product & Category) standardized with Zod. |
| 2026-02-03 | **Phase 3:** Advanced Analytics infrastructure established. |
| 2026-02-03 | **Optimization:** "URL-First" Data Table architecture implemented. |
| 2026-02-17 | **Analysis:** Firebase Migration plan detailed (`.agent/plans/firebase-migration.md`). |
| 2026-02-17 | **Refactor:** `AGENT.md` and `.agent/` structure translated to English and reorganized. |
