# 🏗️ Project Architecture

**Sistem Granit** is built on modern web technologies and a serverless architecture.

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 16.1.3 |
| **Runtime** | Bun | latest |
| **Language** | TypeScript | ^5 |
| **Backend** | Supabase (BaaS) | latest |
| **Style** | Tailwind CSS | ^4.1.18 |
| **UI Library** | Radix UI + Custom Components | - |
| **Form Management** | Formik + Yup | ^2.4.9 / ^1.7.1 |
| **Validation** | Zod | ^4.3.5 |
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
│   ├── i18n/                  # Internationalization
│   └── proxy-chain/           # Proxy chain utilities
├── supabase/
│   ├── migrations/            # Database migrations
│   └── database.types.ts      # Generated types
└── types/                     # TypeScript types
```

## 🔐 Authentication & Authorization

- **Provider:** Supabase Auth
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
