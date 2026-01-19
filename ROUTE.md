# Sistem Granit - Rota Sistemi Analizi ve Uygulama Planı

Bu doküman, projenin rota yapısını analiz eder ve merkezi bir rota yönetimi için önerilen mimariyi ve uygulama fazlarını içerir.

---

## 1. Mevcut Durum Analizi

### 1.1 Proje Yapısı

```
sistemgranit/
├── app/
│   ├── [locale]/
│   │   ├── auth/
│   │   │   ├── confirm/
│   │   │   ├── error/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up-success/
│   │   │   └── update-password/
│   │   ├── dashboard/
│   │   ├── onboarding/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── app-sidebar.tsx      ← Sidebar navigasyon verileri
│       ├── nav-main.tsx
│       ├── nav-documents.tsx
│       └── nav-secondary.tsx
├── lib/i18n/
│   ├── routing.ts               ← next-intl rota tanımları
│   └── utils/get-localized-paths.ts
├── proxies/                     ← Middleware proxy zinciri
│   ├── with-18n.ts
│   ├── with-auth-guard.ts
│   ├── with-guest-guard.ts
│   ├── with-onboarding.ts
│   └── with-supabase-session.ts
├── routes.ts                    ← Guest/Public rota tanımları
└── proxy.ts                     ← Middleware zincir orkestrasyonu
```

### 1.2 Mevcut Rota Kategorileri

| Kategori | Açıklama | Örnekler |
|----------|----------|----------|
| **Public** | Herkesin erişebildiği rotalar | `/`, `/auth/confirm`, `/auth/error` |
| **Guest** | Sadece giriş yapmamış kullanıcılar | `/auth/sign-in`, `/onboarding` |
| **Protected** | Sadece giriş yapmış kullanıcılar | `/dashboard`, `/settings` |

### 1.3 Tespit Edilen Sorunlar

1. **Dağınık Rota Tanımları**
   - `routes.ts` → Guest/Public rotalar
   - `lib/i18n/routing.ts` → i18n path çevirileri
   - `app-sidebar.tsx` → Sidebar navigasyon linkleri (hardcoded `#`)

2. **Sidebar Verileri Statik**
   - Tüm URL'ler `#` olarak tanımlı
   - Rota değişikliklerinde manuel güncelleme gerekli

3. **Type Safety Eksikliği**
   - Rota isimleri string olarak dağınık
   - Refactoring sırasında hata riski yüksek

---

## 2. Önerilen Mimari

### 2.1 Merkezi Rota Sistemi

Tüm rotaların tek bir yerden yönetildiği, type-safe bir yapı:

```typescript
// lib/routes/config.ts
export const ROUTES = {
  // Public Routes
  HOME: '/',
  AUTH: {
    CONFIRM: '/auth/confirm',
    ERROR: '/auth/error',
    UPDATE_PASSWORD: '/auth/update-password',
  },
  
  // Guest Routes
  GUEST: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP_SUCCESS: '/auth/sign-up-success',
    FORGOT_PASSWORD: '/auth/forgot-password',
    ONBOARDING: '/onboarding',
  },
  
  // Protected Routes
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  PROJECTS: '/projects',
  TEAM: '/team',
  SETTINGS: '/settings',
  
  // Documents
  DATA_LIBRARY: '/data-library',
  REPORTS: '/reports',
} as const;

export type RouteKey = keyof typeof ROUTES;
```

### 2.2 i18n Entegrasyonu

```typescript
// lib/routes/i18n-pathnames.ts
import { ROUTES } from './config';

export const pathnames = {
  [ROUTES.HOME]: '/',
  [ROUTES.GUEST.SIGN_IN]: {
    en: '/sign-in',
    tr: '/giris-yap',
  },
  [ROUTES.GUEST.ONBOARDING]: {
    en: '/onboarding',
    tr: '/karsilama',
  },
  [ROUTES.DASHBOARD]: {
    en: '/dashboard',
    tr: '/panel',
  },
  // ... diğer rotalar
} as const;
```

### 2.3 Dinamik Sidebar Yapısı

```typescript
// lib/routes/navigation.ts
import { ROUTES } from './config';
import { IconDashboard, IconChartBar, ... } from '@tabler/icons-react';

export const mainNavigation = [
  {
    title: 'Dashboard',
    titleKey: 'nav.dashboard', // i18n key
    url: ROUTES.DASHBOARD,
    icon: IconDashboard,
  },
  {
    title: 'Analytics',
    titleKey: 'nav.analytics',
    url: ROUTES.ANALYTICS,
    icon: IconChartBar,
  },
  // ...
];

export const secondaryNavigation = [
  {
    title: 'Settings',
    titleKey: 'nav.settings',
    url: ROUTES.SETTINGS,
    icon: IconSettings,
  },
  // ...
];
```

---

## 3. Uygulama Fazları

### Faz 1: Merkezi Rota Konfigürasyonu (Temel)

**Hedef:** Tüm rotaları tek bir dosyada toplamak.

| Adım | İş | Dosya |
|------|-----|-------|
| 1.1 | `lib/routes/` klasörü oluştur | - |
| 1.2 | `config.ts` - Tüm rota sabitleri | `lib/routes/config.ts` |
| 1.3 | `types.ts` - TypeScript tipleri | `lib/routes/types.ts` |
| 1.4 | `index.ts` - Barrel export | `lib/routes/index.ts` |

**Çıktı:**
```typescript
import { ROUTES } from '@/lib/routes';
console.log(ROUTES.DASHBOARD); // '/dashboard'
```

---

### Faz 2: Guard Entegrasyonu

**Hedef:** Mevcut `routes.ts` ve proxy guard'larını merkezi yapıya bağlamak.

| Adım | İş | Dosya |
|------|-----|-------|
| 2.1 | `guards.ts` - Rota kategorilerini config'den türet | `lib/routes/guards.ts` |
| 2.2 | Eski `routes.ts` dosyasını yeni yapıya taşı | `routes.ts` → silinecek |
| 2.3 | Proxy'leri yeni import'lara güncelle | `proxies/*.ts` |

**Örnek:**
```typescript
// lib/routes/guards.ts
import { ROUTES } from './config';

export const GUEST_ROUTES = [
  ROUTES.GUEST.SIGN_IN,
  ROUTES.GUEST.ONBOARDING,
  // ...
];

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.AUTH.CONFIRM,
  // ...
];
```

---

### Faz 3: i18n Pathnames Entegrasyonu

**Hedef:** `next-intl` pathnames'i merkezi config'den beslemek.

| Adım | İş | Dosya |
|------|-----|-------|
| 3.1 | `pathnames.ts` oluştur | `lib/routes/pathnames.ts` |
| 3.2 | `lib/i18n/routing.ts` dosyasını güncelle | Yeni import |
| 3.3 | `getLocalizedPaths` fonksiyonunu güncelle | `lib/i18n/utils/` |

---

### Faz 4: Sidebar Dinamik Hale Getirme

**Hedef:** Sidebar verilerini merkezi rota config'inden beslemek.

| Adım | İş | Dosya |
|------|-----|-------|
| 4.1 | `navigation.ts` - Sidebar veri yapısı | `lib/routes/navigation.ts` |
| 4.2 | `app-sidebar.tsx` güncellemesi | Dinamik import |
| 4.3 | i18n title desteği ekle | `useTranslations` hook |

**Sonuç:**
```tsx
// app/components/app-sidebar.tsx
import { mainNavigation, secondaryNavigation } from '@/lib/routes/navigation';

export function AppSidebar() {
  return (
    <Sidebar>
      <NavMain items={mainNavigation} />
      <NavSecondary items={secondaryNavigation} />
    </Sidebar>
  );
}
```

---

### Faz 5: Link Helper Fonksiyonları

**Hedef:** Type-safe link oluşturma yardımcı fonksiyonları.

| Adım | İş | Dosya |
|------|-----|-------|
| 5.1 | `helpers.ts` - `createLink`, `isActiveRoute` | `lib/routes/helpers.ts` |
| 5.2 | `useRoute` hook'u | `app/hooks/useRoute.ts` |

**Örnek:**
```typescript
import { useRoute } from '@/app/hooks/useRoute';

const { isActive, createLink } = useRoute();

<Link href={createLink(ROUTES.DASHBOARD)} className={isActive(ROUTES.DASHBOARD) ? 'active' : ''}>
  Dashboard
</Link>
```

---

## 4. Dosya Yapısı (Son Durum)

```
lib/routes/
├── index.ts           ← Barrel export
├── config.ts          ← Tüm rota sabitleri
├── types.ts           ← TypeScript tipleri
├── guards.ts          ← Public/Guest/Protected kategorileri
├── pathnames.ts       ← i18n path çevirileri
├── navigation.ts      ← Sidebar navigasyon verileri
└── helpers.ts         ← Link yardımcı fonksiyonları
```

---

## 5. Öncelik Sıralaması

| Faz | Öncelik | Etki | Süre (Tahmini) |
|-----|---------|------|----------------|
| Faz 1 | 🔴 Kritik | Temel altyapı | 1-2 saat |
| Faz 2 | 🔴 Kritik | Güvenlik | 1 saat |
| Faz 3 | 🟡 Yüksek | i18n tutarlılığı | 1 saat |
| Faz 4 | 🟡 Yüksek | UX iyileştirme | 2 saat |
| Faz 5 | 🟢 Orta | DX iyileştirme | 1 saat |

---

## 6. Notlar

- **Breaking Change Yok:** Mevcut URL'ler değişmeyecek, sadece tanım yerleri merkezileşecek.
- **Geriye Uyumluluk:** Eski import'lar kademeli olarak deprecated edilecek.
- **Test:** Her faz sonrası rota guard'ları test edilmeli.
