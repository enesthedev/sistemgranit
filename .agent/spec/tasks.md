
# 📋 Project Tasks & Issues `(spec/tasks.md)`

> **Status:** Active
> **Last Updated:** 2026-02-17

## 🚀 Architecture Migration (Neon + Vercel Blob)

### Phase 1: Setup & Config
- [x] **Init Neon & Drizzle** <!-- id: 0 -->
    - [x] Create Neon project & get connection string
    - [x] Install `drizzle-orm`, `drizzle-kit`, `pg`
    - [x] Setup `lib/db/index.ts` and `drizzle.config.ts`
- [x] **Init Vercel Blob** <!-- id: 1 -->
    - [x] Install `@vercel/blob`
    - [x] Add `BLOB_READ_WRITE_TOKEN` to env
- [x] **Init Auth** <!-- id: 2 -->
    - [x] Decide on Auth Provider (Better Auth)
    - [x] Install & Config basic client

### Phase 2: Database Layer
- [x] **Schema Definition** <!-- id: 3 -->
    - [x] Create schemas for Products, Categories, Auth, Analytics
- [x] **Migration** <!-- id: 4 -->
    - [x] Generate SQL: `bun run drizzle:generate`
    - [x] Push to Neon: `bun run drizzle:push`

### Phase 3: Core Implementation
- [x] **Authentication Logic** <!-- id: 5 -->
    - [x] Implement Sign In / Sign Up with Better Auth
    - [x] Update Middleware for sessions
- [x] **Storage Logic** <!-- id: 6 -->
    - [x] Create `upload-image` Server Action (Vercel Blob)
    - [x] Update `FileUpload` component
- [x] **Data Access Layer** <!-- id: 7 -->
    - [x] Refactor Product Actions (get, create, update, delete)
    - [x] Refactor Category Actions (get, create, update, delete)
    - [x] Refactor Analytics Actions

### Phase 4: Cleanup
- [x] **Remove Supabase** <!-- id: 8 -->
    - [x] Uninstall Supabase SDKs
    - [x] Delete `supabase/` folder
- [ ] **Final Testing** <!-- id: 9 -->
    - [ ] Verify full user flow (Login -> Upload -> Create Product -> List)
    - [ ] **Fix Lint Errors** (TanStack Table hook, unused vars)

---

## 🐛 Known Issues (Bugs)
- [ ] **Navbar Mobile Scroll**: Sometimes scrolls back up after navigation. (Low Priority - check `mobile-nav.tsx`)

## ✅ Completed Refactors (2026-02-17)
- [x] **Form Migration:** All forms migrated from Formik+Yup → React Hook Form+Zod. Formik, Yup, formik-validator-zod removed.
- [x] **Server Action Standardization:** All actions return `ActionResponse<T>`. `successResponse()`, `errorResponse()`, `validateInput()` utilities created in `lib/actions/`.
- [x] **Auth Module:** `lib/auth/config.ts` is canonical. `lib/auth.ts` re-exports for compatibility. `lib/auth/index.ts` created.
- [x] **Slug Refactor:** `slug-redirect.ts` merged into `slug-server.ts`. Incorrect `"use server"` directive removed.
- [x] **Dead Code Cleanup:** Orphaned analytics UI components deleted. `auth-schema.ts` (root duplicate) deleted.

## 💡 Future Improvements
- [ ] **Product Stats UI**: Charts for product trends
- [ ] **Image Optimization**: Ensure Vercel Blob images serve optimized formats
