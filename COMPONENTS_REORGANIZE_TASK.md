# Components Reorganization Task

## Amaç
Sidebar ve Dashboard ile ilgili bileşenleri `app/components` altından `app/[locale]/dashboard/components` klasörüne taşıyarak kodun modülerliğini ve bakımını artırmak.

---

## Mevcut Durum Analizi

### Mevcut Klasör Yapısı
```
app/
├── components/
│   ├── ui/                          # Genel UI bileşenleri (24 dosya)
│   ├── app-sidebar.tsx              # [DASHBOARD] Ana sidebar bileşeni
│   ├── nav-main.tsx                 # [DASHBOARD] Ana navigasyon
│   ├── nav-documents.tsx            # [DASHBOARD] Doküman navigasyonu
│   ├── nav-secondary.tsx            # [DASHBOARD] İkincil navigasyon
│   ├── nav-user.tsx                 # [DASHBOARD] Kullanıcı menüsü
│   ├── site-header.tsx              # [DASHBOARD] Site başlığı
│   ├── section-cards.tsx            # [DASHBOARD] Dashboard kartları
│   ├── chart-area-interactive.tsx   # [DASHBOARD] Interaktif chart
│   └── data-table.tsx               # [DASHBOARD] Data table
├── hooks/
│   └── use-mobile.tsx               # Mobile detection hook
└── [locale]/
    └── dashboard/
        ├── page.tsx
        └── data.json
```

### Taşınacak Dosyalar

| Dosya                        | Kategori       | Açıklama                              |
|-----------------------------|----------------|---------------------------------------|
| `app-sidebar.tsx`           | Sidebar        | Ana sidebar container bileşeni        |
| `nav-main.tsx`              | Sidebar        | Ana navigasyon menüsü                 |
| `nav-documents.tsx`         | Sidebar        | Doküman navigasyon grubu              |
| `nav-secondary.tsx`         | Sidebar        | İkincil navigasyon (Settings, Help)   |
| `nav-user.tsx`              | Sidebar        | Kullanıcı dropdown menüsü             |
| `site-header.tsx`           | Dashboard      | Dashboard sayfa başlığı               |
| `section-cards.tsx`         | Dashboard      | Özet kartlar bileşeni                 |
| `chart-area-interactive.tsx`| Dashboard      | Interaktif alan grafiği               |
| `data-table.tsx`            | Dashboard      | Sürüklenebilir data table             |

### Kalacak Dosyalar (`app/components/`)
- `ui/` klasörü - Genel, yeniden kullanılabilir UI bileşenleri

---

## Hedef Klasör Yapısı

```
app/
├── components/
│   └── ui/                          # Genel UI bileşenleri (değişmez)
├── hooks/
│   └── use-mobile.tsx               # Mobile detection hook
└── [locale]/
    └── dashboard/
        ├── components/
        │   ├── sidebar/
        │   │   ├── index.tsx        # AppSidebar (renamed)
        │   │   ├── nav-main.tsx
        │   │   ├── nav-documents.tsx
        │   │   ├── nav-secondary.tsx
        │   │   └── nav-user.tsx
        │   ├── header/
        │   │   └── site-header.tsx
        │   ├── cards/
        │   │   └── section-cards.tsx
        │   ├── charts/
        │   │   └── chart-area-interactive.tsx
        │   └── tables/
        │       └── data-table.tsx
        ├── page.tsx
        └── data.json
```

---

## Uygulama Planı

### FAZ 1: Hazırlık (Estimated: 15 min)

#### 1.1 Yedekleme
- [ ] Git commit ile mevcut durumu kaydet
- [ ] Değişiklik öncesi tüm testlerin geçtiğini doğrula

#### 1.2 Klasör Yapısı Oluşturma
- [ ] `app/[locale]/dashboard/components/` oluştur
- [ ] `app/[locale]/dashboard/components/sidebar/` oluştur
- [ ] `app/[locale]/dashboard/components/header/` oluştur
- [ ] `app/[locale]/dashboard/components/cards/` oluştur
- [ ] `app/[locale]/dashboard/components/charts/` oluştur
- [ ] `app/[locale]/dashboard/components/tables/` oluştur

---

### FAZ 2: Sidebar Bileşenlerini Taşıma (Estimated: 30 min)

#### 2.1 Nav Bileşenlerini Taşı
Sıralama önemli: Bağımlılık olmayan dosyalardan başla

| Adım | Kaynak                                     | Hedef                                                        |
|------|--------------------------------------------|--------------------------------------------------------------|
| 1    | `app/components/nav-secondary.tsx`         | `app/[locale]/dashboard/components/sidebar/nav-secondary.tsx`|
| 2    | `app/components/nav-main.tsx`              | `app/[locale]/dashboard/components/sidebar/nav-main.tsx`     |
| 3    | `app/components/nav-documents.tsx`         | `app/[locale]/dashboard/components/sidebar/nav-documents.tsx`|
| 4    | `app/components/nav-user.tsx`              | `app/[locale]/dashboard/components/sidebar/nav-user.tsx`     |

#### 2.2 Import Güncellemeleri (nav-*.tsx dosyaları için)
```typescript
// Eski
import { ... } from "@/app/components/ui/sidebar";

// Yeni (değişiklik yok - ui bileşenleri yerinde kalıyor)
import { ... } from "@/app/components/ui/sidebar";
```

#### 2.3 AppSidebar Taşı ve Güncellle
| Adım | Kaynak                         | Hedef                                                   |
|------|--------------------------------|---------------------------------------------------------|
| 5    | `app/components/app-sidebar.tsx`| `app/[locale]/dashboard/components/sidebar/index.tsx`   |

**Import Güncellemeleri (index.tsx için):**
```typescript
// Eski
import { NavDocuments } from "@/app/components/nav-documents";
import { NavMain } from "@/app/components/nav-main";
import { NavSecondary } from "@/app/components/nav-secondary";
import { NavUser } from "@/app/components/nav-user";

// Yeni
import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
```

#### 2.4 Sidebar Barrel Export
`app/[locale]/dashboard/components/sidebar/index.tsx` dosyasına export ekle:
```typescript
export { AppSidebar } from "./index";
// veya component'i doğrudan bu dosyada tanımla
```

---

### FAZ 3: Dashboard Bileşenlerini Taşıma (Estimated: 30 min)

#### 3.1 Site Header Taşı
| Adım | Kaynak                          | Hedef                                                     |
|------|---------------------------------|-----------------------------------------------------------|
| 6    | `app/components/site-header.tsx`| `app/[locale]/dashboard/components/header/site-header.tsx`|

#### 3.2 Section Cards Taşı
| Adım | Kaynak                           | Hedef                                                       |
|------|----------------------------------|-------------------------------------------------------------|
| 7    | `app/components/section-cards.tsx`| `app/[locale]/dashboard/components/cards/section-cards.tsx`|

#### 3.3 Chart Bileşeni Taşı
| Adım | Kaynak                                    | Hedef                                                                   |
|------|-------------------------------------------|-------------------------------------------------------------------------|
| 8    | `app/components/chart-area-interactive.tsx`| `app/[locale]/dashboard/components/charts/chart-area-interactive.tsx`  |

**Import Güncellemesi:**
```typescript
// Eski
import { useIsMobile } from "@/app/hooks/use-mobile";

// Yeni (değişiklik yok - hooks yerinde kalıyor)
import { useIsMobile } from "@/app/hooks/use-mobile";
```

#### 3.4 Data Table Taşı
| Adım | Kaynak                         | Hedef                                                      |
|------|--------------------------------|------------------------------------------------------------|
| 9    | `app/components/data-table.tsx`| `app/[locale]/dashboard/components/tables/data-table.tsx` |

---

### FAZ 4: Dashboard Page Güncellemesi (Estimated: 15 min)

#### 4.1 Import Yollarını Güncelle
`app/[locale]/dashboard/page.tsx` dosyasını güncelle:

```typescript
// Eski
import { AppSidebar } from "@/app/components/app-sidebar";
import { ChartAreaInteractive } from "@/app/components/chart-area-interactive";
import { DataTable } from "@/app/components/data-table";
import { SectionCards } from "@/app/components/section-cards";
import { SiteHeader } from "@/app/components/site-header";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";

// Yeni
import { AppSidebar } from "./components/sidebar";
import { ChartAreaInteractive } from "./components/charts/chart-area-interactive";
import { DataTable } from "./components/tables/data-table";
import { SectionCards } from "./components/cards/section-cards";
import { SiteHeader } from "./components/header/site-header";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";
```

---

### FAZ 5: Temizlik ve Doğrulama (Estimated: 15 min)

#### 5.1 Eski Dosyaları Sil
- [ ] `app/components/app-sidebar.tsx` sil
- [ ] `app/components/nav-main.tsx` sil
- [ ] `app/components/nav-documents.tsx` sil
- [ ] `app/components/nav-secondary.tsx` sil
- [ ] `app/components/nav-user.tsx` sil
- [ ] `app/components/site-header.tsx` sil
- [ ] `app/components/section-cards.tsx` sil
- [ ] `app/components/chart-area-interactive.tsx` sil
- [ ] `app/components/data-table.tsx` sil

#### 5.2 Build ve Test
- [ ] `npm run build` ile build kontrol
- [ ] Lint hatalarını kontrol et: `npm run lint`
- [ ] Dashboard sayfasını tarayıcıda test et
- [ ] Sidebar açılıp kapanmasını test et
- [ ] User dropdown menüsünü test et
- [ ] Chart interaktivitesini test et
- [ ] Data table drag & drop test et

#### 5.3 Git Commit
```bash
git add .
git commit -m "refactor(components): move dashboard specific components to dashboard/components

- Move sidebar components to dashboard/components/sidebar/
- Move header to dashboard/components/header/
- Move cards to dashboard/components/cards/
- Move charts to dashboard/components/charts/
- Move tables to dashboard/components/tables/
- Update import paths in dashboard page
- Keep shared UI components in app/components/ui/"
```

---

## Riskler ve Çözümler

| Risk                                      | Çözüm                                                    |
|-------------------------------------------|----------------------------------------------------------|
| Circular dependency oluşması              | Barrel exports dikkatli kullan, import sırasını kontrol et|
| Build hatası                              | Her faz sonunda build kontrol et                         |
| Diğer sayfaların sidebar kullanması       | Şu an sadece dashboard kullanıyor, risk düşük            |
| Hook importlarının bozulması              | Hooks `app/hooks/` da kalacak, path değişmeyecek         |

---

## Tahmini Süre
- **Toplam:** ~1.5 - 2 saat
- Hazırlık: 15 dk
- Sidebar taşıma: 30 dk
- Dashboard bileşenleri taşıma: 30 dk  
- Page güncellemesi: 15 dk
- Temizlik ve test: 15 dk

---

## Notlar
1. `ui/` klasörü kesinlikle `app/components/` altında kalmalı - tüm uygulama bu bileşenleri kullanıyor
2. `hooks/` klasörü `app/hooks/` altında kalmalı - genelleştirilebilir utility hook'ları içeriyor
3. Bu refactoring sadece dashboard sayfasını etkiler, auth ve onboarding sayfaları etkilenmez
