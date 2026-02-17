# 🏗️ Project Architecture

**Sistem Granit** is built on modern web technologies and a serverless architecture.

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 16.1.3 |
| **Runtime** | Bun | latest |
| **Language** | TypeScript | ^5 |
| **Backend** | Neon + Better Auth | latest |
| **Style** | Tailwind CSS | ^4.1.18 |
| **UI Library** | Radix UI + Custom Components | - |
| **Form Management** | React Hook Form | ^7.71.1 |
| **Validation** | Zod + @hookform/resolvers | ^4.3.5 / ^5.2.2 |
| **i18n** | next-intl | ^4.7.0 |
| **Table** | TanStack Table | ^8.21.3 |
| **Charts** | Recharts | 2.15.4 |
| **Drag & Drop** | @dnd-kit | ^6.3.1+ |
| **Notifications** | Sonner | ^2.0.7 |

## 📁 Project Structure

```
sistemgranit/
├── AGENT.md                   # Agent Root Configuration
├── .agent/                    # Agent Spec, Wiki, Links
├── actions/                   # Server Actions (CRUD)
├── app/
│   ├── [locale]/              # i18n routes
│   │   ├── (public)/          # Public route group
│   │   ├── auth/              # Authentication
│   │   ├── dashboard/         # Admin panel
│   │   └── onboarding/        # Registration/Onboarding
│   ├── components/            # Shared components
│   ├── constants/             # Constants
│   ├── hooks/                 # Custom hooks
│   ├── proxies/               # Middleware/Guards
│   ├── routes/                # Routing configuration
│   ├── utils/                 # Utility functions
│   └── validations/           # Zod schemas
├── lib/
│   ├── actions/               # Shared action utilities (response.ts, validate.ts)
│   ├── auth/                  # Better Auth config (config.ts, index.ts)
│   ├── db/                    # Drizzle ORM (index.ts, schema.ts)
│   ├── i18n/                  # Internationalization
│   └── proxy-chain/           # Proxy chain utilities

└── types/                     # TypeScript types
```

## 🔐 Authentication & Authorization

- **Provider:** Better Auth
- **Flow:**
  1. `/auth/sign-in` - Email/Password login
  2. `/onboarding` - New user registration
  3. `/auth/confirm` - Email verification
  4. `/auth/update-password` - Password reset
- **Guards:**
  - `with-auth-guard.ts` - Pages requiring auth
  - `with-guest-guard.ts` - Guest-only access
  - `with-onboarding.ts` - Onboarding check

## 🌐 Internationalization (i18n)

- **Library:** next-intl ^4.7.0
- **Supported Languages:** Turkish (tr) - default
- **Locale Prefix:** `as-needed`
- **Structure:**
  - `lib/i18n/routing.ts` - Route definitions
  - `lib/i18n/utils/get-localized-paths.ts` - Localized path helper
  - `app/routes/pathnames.ts` - Localized URLs
  - `app/routes/navigation.ts` - Navigation items

## 📋 Architectural Decisions

### Form Layer
- **Library:** React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Pattern:** `useForm` + `FormProvider` at the page level; form primitive components use `useController` + `useFormContext`
- **Resolver cast:** When Zod schema has `.default()` fields, cast the resolver: `zodResolver(schema) as Resolver<FormValues>`
- **No Formik, no Yup** — removed entirely

### Server Actions
- **Response type:** All actions return `ActionResponse<T>` from `types/api.ts`
- **Utilities:** `successResponse()`, `errorResponse()`, `validateInput()` from `lib/actions/`
- **`"use server"` rule:** Only for client-callable server functions (mutations). Server utilities (DB helpers, etc.) do NOT use this directive.

### Slug Utilities
- `app/utils/slug.ts` — pure `slugify()`, client-safe, exported via `app/utils/index.ts`
- `app/utils/slug-server.ts` — `generateUniqueSlug()` + `resolveSlugWithRedirect()`, requires DB, NOT in client barrel
- Never add DB-dependent functions to `app/utils/index.ts`

### Auth Module
- Server config: `lib/auth/config.ts` (canonical) + `lib/auth.ts` (re-export for backwards compat)
- Client: `lib/auth-client.ts`

### Validation
- Single source of truth: Zod schemas in `app/validations/`
- Organized by feature: `authSchemas`, `productSchemas`, `categorySchemas`
- Server actions use `validateInput(schema, data)` which throws `ActionError` on failure
