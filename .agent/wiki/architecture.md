# 🏗️ Proje Mimarisi

**Sistem Granit**, modern web teknolojileri ve serverless mimari üzerine kuruludur.

## 🛠️ Teknoloji Stack'i

| Kategori | Teknoloji | Versiyon |
|----------|-----------|----------|
| **Framework** | Next.js | 16.1.3 |
| **Runtime** | Bun | latest |
| **Dil** | TypeScript | ^5 |
| **Backend** | Supabase (BaaS) | latest |
| **Stil** | Tailwind CSS | ^4.1.18 |
| **UI Kütüphanesi** | Radix UI + Custom Components | - |
| **Form Yönetimi** | Formik + Yup | ^2.4.9 / ^1.7.1 |
| **Validasyon** | Zod | ^4.3.5 |
| **i18n** | next-intl | ^4.7.0 |
| **Tablo** | TanStack Table | ^8.21.3 |
| **Grafikler** | Recharts | 2.15.4 |
| **Sürükle-Bırak** | @dnd-kit | ^6.3.1+ |
| **Bildirimler** | Sonner | ^2.0.7 |

## 📁 Proje Yapısı

```
sistemgranit/
├── AGENT.md                   # Agent Root Configuration
├── .agent/                    # Agent Spec, Wiki, Links
├── actions/                   # Server Actions (CRUD)
├── app/
│   ├── [locale]/              # i18n route'ları
│   │   ├── (public)/          # Public route grubu
│   │   ├── auth/              # Kimlik doğrulama
│   │   ├── dashboard/         # Admin paneli
│   │   └── onboarding/        # Kayıt
│   ├── components/            # Paylaşılan bileşenler
│   ├── constants/             # Sabitler
│   ├── hooks/                 # Custom hooks
│   ├── proxies/               # Middleware/Guard'lar
│   ├── routes/                # Routing konfigürasyonu
│   ├── utils/                 # Utility fonksiyonları
│   └── validations/           # Zod şemaları
├── lib/
│   ├── i18n/                  # Internationalization
│   └── proxy-chain/           # Proxy chain utilities
├── supabase/
│   ├── migrations/            # Database migrations
│   └── database.types.ts      # Generated types
└── types/                     # TypeScript tipleri
```

## 🔐 Kimlik Doğrulama & Yetkilendirme

- **Provider:** Supabase Auth
- **Akış:**
  1. `/auth/sign-in` - Email/Password login
  2. `/onboarding` - Yeni kullanıcı kaydı
  3. `/auth/confirm` - Email doğrulama
  4. `/auth/update-password` - Şifre sıfırlama
- **Guard'lar:**
  - `with-auth-guard.ts` - Auth gerektiren sayfalar
  - `with-guest-guard.ts` - Sadece guest erişim
  - `with-onboarding.ts` - Onboarding kontrolü

## 🌐 Internationalization (i18n)

- **Kütüphane:** next-intl ^4.7.0
- **Desteklenen Diller:** Türkçe (tr) - varsayılan
- **Locale Prefix:** `as-needed`
- **Yapı:**
  - `lib/i18n/routing.ts` - Route tanımları
  - `lib/i18n/utils/get-localized-paths.ts` - Lokalize path helper
  - `app/routes/pathnames.ts` - Lokalize URL'ler
  - `app/routes/navigation.ts` - Navigasyon itemleri
