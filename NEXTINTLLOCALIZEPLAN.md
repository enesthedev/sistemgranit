# Next-Intl Localization Plan

## Amaç
Uygulama genelinde hard-coded olarak bulunan tüm kullanıcı arayüzü metinlerini tespit edip, next-intl kullanarak localize etmek. Default dil olarak İngilizce kullanılacak ve Türkçe çevirileri `tr.json` dosyasına eklenecek.

---

## Mevcut Durum Analizi

### Next-Intl Kurulumu
- ✅ `next-intl` paketi kurulu
- ✅ `NextIntlClientProvider` yapılandırılmış (`app/[locale]/layout.tsx`)
- ✅ `routing.ts` yapılandırılmış (`lib/i18n/routing.ts`)
- ✅ `messages/` klasörü mevcut (`en.json`, `tr.json`)
- ❌ Mesaj dosyaları neredeyse boş (sadece `hello` key'i var)
- ❌ Bileşenlerde `useTranslations` hook'u kullanılmıyor
- ❌ Çoğu metin hard-coded

### Mevcut Mesaj Dosyaları
✅ **Flat Key yapısıyla güncellenmiş** - Tüm çeviriler eklendi.

```json
// messages/en.json (örnek)
{
  "Email": "Email",
  "Password": "Password",
  "Sign In": "Sign In"
}

// messages/tr.json (örnek)
{
  "Email": "E-posta",
  "Password": "Şifre",
  "Sign In": "Giriş Yap"
}
```

**Yapı:** `"English String": "Translation"` - prefix yok, nested yapı yok.

---

## Tespit Edilen Localize Edilmemiş Stringler

### 1. Sidebar Bileşenleri (`app/components/`)

#### `app-sidebar.tsx`
| Satır | String          | Key Önerisi           |
|-------|-----------------|----------------------|
| 43    | "Acme Inc."     | `sidebar.companyName`|

#### `nav-main.tsx`
| Satır | String         | Key Önerisi            |
|-------|----------------|------------------------|
| 29    | "Quick Create" | `sidebar.quickCreate`  |
| 33    | "Quick Create" | `sidebar.quickCreate`  |
| 41    | "Inbox"        | `sidebar.inbox`        |

#### `nav-documents.tsx`
| Satır | String      | Key Önerisi              |
|-------|-------------|--------------------------|
| 41    | "Documents" | `sidebar.documents`      |
| 58    | "More"      | `common.more`            |
| 68    | "Open"      | `common.open`            |
| 72    | "Share"     | `common.share`           |
| 77    | "Delete"    | `common.delete`          |
| 86    | "More"      | `common.more`            |

#### `nav-user.tsx`
| Satır | String          | Key Önerisi               |
|-------|-----------------|---------------------------|
| 54    | "CN" (fallback) | -                         |
| 89    | "Account"       | `user.account`            |
| 93    | "Billing"       | `user.billing`            |
| 97    | "Notifications" | `user.notifications`      |
| 103   | "Log out"       | `user.logout`             |

#### `site-header.tsx`
| Satır | String      | Key Önerisi          |
|-------|-------------|----------------------|
| 14    | "Documents" | `header.documents`   |
| 23    | "GitHub"    | `header.github`      |

---

### 2. Dashboard Bileşenleri

#### `section-cards.tsx`
| Satır | String                          | Key Önerisi                          |
|-------|---------------------------------|--------------------------------------|
| 18    | "Total Revenue"                 | `dashboard.cards.totalRevenue`       |
| 31    | "Trending up this month"        | `dashboard.cards.trendingUp`         |
| 34    | "Visitors for the last 6 months"| `dashboard.cards.visitorsLast6Months`|
| 40    | "New Customers"                 | `dashboard.cards.newCustomers`       |
| 53    | "Down 20% this period"          | `dashboard.cards.down20Percent`      |
| 56    | "Acquisition needs attention"   | `dashboard.cards.acquisitionAttention`|
| 62    | "Active Accounts"               | `dashboard.cards.activeAccounts`     |
| 75    | "Strong user retention"         | `dashboard.cards.strongRetention`    |
| 77    | "Engagement exceed targets"     | `dashboard.cards.engagementTargets`  |
| 82    | "Growth Rate"                   | `dashboard.cards.growthRate`         |
| 95    | "Steady performance increase"   | `dashboard.cards.steadyPerformance`  |
| 97    | "Meets growth projections"      | `dashboard.cards.meetsProjections`   |

#### `chart-area-interactive.tsx`
| Satır | String                       | Key Önerisi                    |
|-------|------------------------------|--------------------------------|
| 131   | "Visitors"                   | `chart.visitors`               |
| 134   | "Desktop"                    | `chart.desktop`                |
| 138   | "Mobile"                     | `chart.mobile`                 |
| 170   | "Total Visitors"             | `chart.totalVisitors`          |
| 173   | "Total for the last 3 months"| `chart.totalLast3Months`       |
| 175   | "Last 3 months"              | `chart.last3Months`            |
| 185   | "Last 3 months"              | `chart.last3Months`            |
| 186   | "Last 30 days"               | `chart.last30Days`             |
| 187   | "Last 7 days"                | `chart.last7Days`              |

#### `data-table.tsx`
| Satır | String              | Key Önerisi                    |
|-------|---------------------|--------------------------------|
| 173   | "Header"            | `table.header`                 |
| 181   | "Section Type"      | `table.sectionType`            |
| 192   | "Status"            | `table.status`                 |
| 206   | "Target"            | `table.target`                 |
| 231   | "Limit"             | `table.limit`                  |
| 256   | "Reviewer"          | `table.reviewer`               |
| 303   | "Edit"              | `common.edit`                  |
| 304   | "Make a copy"       | `common.makeCopy`              |
| 305   | "Favorite"          | `common.favorite`              |
| 307   | "Delete"            | `common.delete`                |
| 410   | "View"              | `common.view`                  |
| 422-426| "Outline", "Past Performance", etc. | `table.tabs.*`   |
| 443   | "Customize Columns" | `table.customizeColumns`       |
| 444   | "Columns"           | `table.columns`                |
| 474   | "Add Section"       | `table.addSection`             |
| 525   | "No results."       | `table.noResults`              |
| 541   | "Rows per page"     | `table.rowsPerPage`            |
| 564   | "Page X of Y"       | `table.pageInfo`               |
| 574   | "Go to first page"  | `table.goToFirst`              |
| 584   | "Go to previous page"| `table.goToPrevious`          |
| 594   | "Go to next page"   | `table.goToNext`               |
| 604   | "Go to last page"   | `table.goToLast`               |

---

### 3. Auth Sayfaları

#### `auth/sign-in/form.tsx` (Zaten Türkçe - EN'e çevrilecek)
| Satır | Mevcut String (TR)                           | Key Önerisi                    |
|-------|----------------------------------------------|--------------------------------|
| 23    | "Geçerli bir e-posta adresi girin"           | `validation.invalidEmail`      |
| 24    | "E-posta adresi gerekli"                     | `validation.emailRequired`     |
| 26    | "Şifre en az 6 karakter olmalı"              | `validation.passwordMinLength` |
| 27    | "Şifre gerekli"                              | `validation.passwordRequired`  |
| 53    | "Giriş başarılı!"                            | `auth.loginSuccess`            |
| 56    | "Bir hata oluştu"                            | `common.errorOccurred`         |
| 65    | "Giriş Yap"                                  | `auth.signIn`                  |
| 67    | "Hesabınıza giriş yapmak için bilgilerinizi girin" | `auth.signInDescription`|
| 74    | "E-posta"                                    | `common.email`                 |
| 90    | "Şifre"                                      | `common.password`              |
| 95    | "Şifrenizi mi unuttunuz?"                    | `auth.forgotPassword`          |
| 117   | "Giriş yapılıyor..." / "Giriş Yap"           | `auth.signingIn` / `auth.signIn`|
| 121   | "Hesabınız yok mu?"                          | `auth.noAccount`               |
| 126   | "Kayıt ol"                                   | `auth.signUp`                  |

#### `auth/update-password/form.tsx` (Zaten Türkçe - EN'e çevrilecek)
| Satır | Mevcut String (TR)                | Key Önerisi                        |
|-------|-----------------------------------|------------------------------------|
| 22    | "Şifre en az 6 karakter olmalı"   | `validation.passwordMinLength`     |
| 23    | "Yeni şifre gerekli"              | `validation.newPasswordRequired`   |
| 47    | "Şifreniz başarıyla güncellendi!" | `auth.passwordUpdated`             |
| 50    | "Bir hata oluştu"                 | `common.errorOccurred`             |
| 59    | "Şifrenizi Sıfırlayın"            | `auth.resetPassword`               |
| 60    | "Lütfen yeni şifrenizi aşağıya girin"| `auth.enterNewPassword`         |
| 66    | "Yeni Şifre"                      | `auth.newPassword`                 |
| 71    | "Yeni şifre"                      | `auth.newPassword`                 |
| 88    | "Kaydediliyor..."                 | `common.saving`                    |
| 89    | "Yeni şifreyi kaydet"             | `auth.saveNewPassword`             |

#### `auth/error/page.tsx`
| Satır | String                           | Key Önerisi              |
|-------|----------------------------------|--------------------------|
| 21    | "Code error: {error}"            | `auth.errorCode`         |
| 24    | "An unspecified error occurred." | `auth.unspecifiedError`  |
| 43    | "Sorry, something went wrong."   | `auth.somethingWentWrong`|

#### `auth/sign-up-success/page.tsx`
| Satır | String                                                    | Key Önerisi                     |
|-------|-----------------------------------------------------------|---------------------------------|
| 10    | "Thank you for signing up!"                               | `auth.thankYouSignUp`           |
| 11    | "Check your email to confirm"                             | `auth.checkEmailConfirm`        |
| 15    | "You've successfully signed up..."                        | `auth.signUpSuccessMessage`     |

---

### 4. Onboarding Sayfası

#### `onboarding/form.tsx` (Zaten Türkçe - EN'e çevrilecek)
| Satır | Mevcut String (TR)                                         | Key Önerisi                       |
|-------|-----------------------------------------------------------|-----------------------------------|
| 25    | "Ad Soyad girin"                                          | `validation.fullNameRequired`     |
| 27    | "Geçerli bir e-posta adresi girin"                        | `validation.invalidEmail`         |
| 28    | "E-posta adresi gerekli"                                  | `validation.emailRequired`        |
| 30    | "Şifre en az 6 karakter olmalı"                           | `validation.passwordMinLength`    |
| 31    | "Şifre gerekli"                                           | `validation.passwordRequired`     |
| 33    | "Şifreler eşleşmiyor"                                     | `validation.passwordsMismatch`    |
| 34    | "Şifre tekrarı gerekli"                                   | `validation.repeatPasswordRequired`|
| 70    | "Yönetici hesabı oluşturuldu! E-postanızı kontrol edin."  | `onboarding.adminCreated`         |
| 75    | "Bir hata oluştu."                                        | `common.errorOccurred`            |
| 96-98 | "Dijital katalog yönetimine hoş geldiniz..."              | `onboarding.welcomeMessage`       |
| 108   | "Kuruluma Başla"                                          | `onboarding.startSetup`           |
| 119   | "Yönetici Hesabı Oluşturun"                               | `onboarding.createAdminAccount`   |
| 127   | "Ad Soyad"                                                | `common.fullName`                 |
| 147   | "E-posta"                                                 | `common.email`                    |
| 167   | "Şifre"                                                   | `common.password`                 |
| 190   | "Şifre Tekrarı"                                           | `common.repeatPassword`           |
| 218   | "Geri Dön"                                                | `common.goBack`                   |
| 226   | "Oluşturuluyor..."                                        | `common.creating`                 |
| 227   | "Yöneticiyi Oluştur"                                      | `onboarding.createAdmin`          |

---

### 5. Navigation Config (`lib/routes/navigation.ts`)

**Not:** Bu dosyada zaten `titleKey` ve `nameKey` alanları var ama kullanılmıyor.

| Item              | titleKey/nameKey                |
|-------------------|---------------------------------|
| Dashboard         | `nav.dashboard`                 |
| Lifecycle         | `nav.lifecycle`                 |
| Analytics         | `nav.analytics`                 |
| Projects          | `nav.projects`                  |
| Team              | `nav.team`                      |
| Capture           | `nav.capture`                   |
| Proposal          | `nav.proposal`                  |
| Prompts           | `nav.prompts`                   |
| Active Proposals  | `nav.activeProposals`           |
| Archived          | `nav.archived`                  |
| Settings          | `nav.settings`                  |
| Get Help          | `nav.getHelp`                   |
| Search            | `nav.search`                    |
| Data Library      | `nav.dataLibrary`               |
| Reports           | `nav.reports`                   |
| Word Assistant    | `nav.wordAssistant`             |

---

## Uygulama Planı

### FAZ 1: Mesaj Dosyalarını Hazırla (Estimated: 30 min)

#### 1.1 `messages/en.json` Oluştur (Default - İngilizce)
```json
{
  "common": {
    "email": "Email",
    "password": "Password",
    "repeatPassword": "Repeat Password",
    "fullName": "Full Name",
    "more": "More",
    "open": "Open",
    "share": "Share",
    "delete": "Delete",
    "edit": "Edit",
    "makeCopy": "Make a copy",
    "favorite": "Favorite",
    "view": "View",
    "goBack": "Go Back",
    "saving": "Saving...",
    "creating": "Creating...",
    "errorOccurred": "An error occurred"
  },
  "validation": {
    "invalidEmail": "Please enter a valid email address",
    "emailRequired": "Email is required",
    "passwordRequired": "Password is required",
    "passwordMinLength": "Password must be at least 6 characters",
    "newPasswordRequired": "New password is required",
    "passwordsMismatch": "Passwords do not match",
    "repeatPasswordRequired": "Password confirmation is required",
    "fullNameRequired": "Please enter your full name"
  },
  "auth": {
    "signIn": "Sign In",
    "signInDescription": "Enter your credentials to access your account",
    "signingIn": "Signing in...",
    "loginSuccess": "Login successful!",
    "forgotPassword": "Forgot your password?",
    "noAccount": "Don't have an account?",
    "signUp": "Sign Up",
    "resetPassword": "Reset Your Password",
    "enterNewPassword": "Please enter your new password below",
    "newPassword": "New Password",
    "saveNewPassword": "Save New Password",
    "passwordUpdated": "Your password has been updated successfully!",
    "thankYouSignUp": "Thank you for signing up!",
    "checkEmailConfirm": "Check your email to confirm",
    "signUpSuccessMessage": "You've successfully signed up. Please check your email to confirm your account before signing in.",
    "somethingWentWrong": "Sorry, something went wrong.",
    "errorCode": "Code error: {error}",
    "unspecifiedError": "An unspecified error occurred."
  },
  "onboarding": {
    "welcomeMessage": "Welcome to digital catalog management. Start setup to configure your system and enable admin access.",
    "startSetup": "Start Setup",
    "createAdminAccount": "Create Admin Account",
    "createAdmin": "Create Admin",
    "adminCreated": "Admin account created! Please check your email."
  },
  "sidebar": {
    "companyName": "Acme Inc.",
    "quickCreate": "Quick Create",
    "inbox": "Inbox",
    "documents": "Documents"
  },
  "header": {
    "documents": "Documents",
    "github": "GitHub"
  },
  "user": {
    "account": "Account",
    "billing": "Billing",
    "notifications": "Notifications",
    "logout": "Log out"
  },
  "nav": {
    "dashboard": "Dashboard",
    "lifecycle": "Lifecycle",
    "analytics": "Analytics",
    "projects": "Projects",
    "team": "Team",
    "capture": "Capture",
    "proposal": "Proposal",
    "prompts": "Prompts",
    "activeProposals": "Active Proposals",
    "archived": "Archived",
    "settings": "Settings",
    "getHelp": "Get Help",
    "search": "Search",
    "dataLibrary": "Data Library",
    "reports": "Reports",
    "wordAssistant": "Word Assistant"
  },
  "dashboard": {
    "cards": {
      "totalRevenue": "Total Revenue",
      "trendingUp": "Trending up this month",
      "visitorsLast6Months": "Visitors for the last 6 months",
      "newCustomers": "New Customers",
      "down20Percent": "Down 20% this period",
      "acquisitionAttention": "Acquisition needs attention",
      "activeAccounts": "Active Accounts",
      "strongRetention": "Strong user retention",
      "engagementTargets": "Engagement exceed targets",
      "growthRate": "Growth Rate",
      "steadyPerformance": "Steady performance increase",
      "meetsProjections": "Meets growth projections"
    }
  },
  "chart": {
    "visitors": "Visitors",
    "desktop": "Desktop",
    "mobile": "Mobile",
    "totalVisitors": "Total Visitors",
    "totalLast3Months": "Total for the last 3 months",
    "last3Months": "Last 3 months",
    "last30Days": "Last 30 days",
    "last7Days": "Last 7 days"
  },
  "table": {
    "header": "Header",
    "sectionType": "Section Type",
    "status": "Status",
    "target": "Target",
    "limit": "Limit",
    "reviewer": "Reviewer",
    "customizeColumns": "Customize Columns",
    "columns": "Columns",
    "addSection": "Add Section",
    "noResults": "No results.",
    "rowsPerPage": "Rows per page",
    "pageInfo": "Page {current} of {total}",
    "goToFirst": "Go to first page",
    "goToPrevious": "Go to previous page",
    "goToNext": "Go to next page",
    "goToLast": "Go to last page",
    "rowsSelected": "{selected} of {total} row(s) selected.",
    "tabs": {
      "outline": "Outline",
      "pastPerformance": "Past Performance",
      "keyPersonnel": "Key Personnel",
      "focusDocuments": "Focus Documents"
    }
  }
}
```

#### 1.2 `messages/tr.json` Oluştur (Türkçe)
```json
{
  "common": {
    "email": "E-posta",
    "password": "Şifre",
    "repeatPassword": "Şifre Tekrarı",
    "fullName": "Ad Soyad",
    "more": "Daha Fazla",
    "open": "Aç",
    "share": "Paylaş",
    "delete": "Sil",
    "edit": "Düzenle",
    "makeCopy": "Kopya Oluştur",
    "favorite": "Favorilere Ekle",
    "view": "Görüntüle",
    "goBack": "Geri Dön",
    "saving": "Kaydediliyor...",
    "creating": "Oluşturuluyor...",
    "errorOccurred": "Bir hata oluştu"
  },
  "validation": {
    "invalidEmail": "Geçerli bir e-posta adresi girin",
    "emailRequired": "E-posta adresi gerekli",
    "passwordRequired": "Şifre gerekli",
    "passwordMinLength": "Şifre en az 6 karakter olmalı",
    "newPasswordRequired": "Yeni şifre gerekli",
    "passwordsMismatch": "Şifreler eşleşmiyor",
    "repeatPasswordRequired": "Şifre tekrarı gerekli",
    "fullNameRequired": "Ad Soyad girin"
  },
  "auth": {
    "signIn": "Giriş Yap",
    "signInDescription": "Hesabınıza giriş yapmak için bilgilerinizi girin",
    "signingIn": "Giriş yapılıyor...",
    "loginSuccess": "Giriş başarılı!",
    "forgotPassword": "Şifrenizi mi unuttunuz?",
    "noAccount": "Hesabınız yok mu?",
    "signUp": "Kayıt Ol",
    "resetPassword": "Şifrenizi Sıfırlayın",
    "enterNewPassword": "Lütfen yeni şifrenizi aşağıya girin",
    "newPassword": "Yeni Şifre",
    "saveNewPassword": "Yeni Şifreyi Kaydet",
    "passwordUpdated": "Şifreniz başarıyla güncellendi!",
    "thankYouSignUp": "Kayıt olduğunuz için teşekkürler!",
    "checkEmailConfirm": "Onaylamak için e-postanızı kontrol edin",
    "signUpSuccessMessage": "Başarıyla kayıt oldunuz. Giriş yapmadan önce lütfen hesabınızı onaylamak için e-postanızı kontrol edin.",
    "somethingWentWrong": "Üzgünüz, bir şeyler yanlış gitti.",
    "errorCode": "Hata kodu: {error}",
    "unspecifiedError": "Belirtilmemiş bir hata oluştu."
  },
  "onboarding": {
    "welcomeMessage": "Dijital katalog yönetimine hoş geldiniz. Sisteminizi yapılandırmak ve yönetici erişimi sağlamak için kuruluma başlayın.",
    "startSetup": "Kuruluma Başla",
    "createAdminAccount": "Yönetici Hesabı Oluşturun",
    "createAdmin": "Yöneticiyi Oluştur",
    "adminCreated": "Yönetici hesabı oluşturuldu! E-postanızı kontrol edin."
  },
  "sidebar": {
    "companyName": "Acme Inc.",
    "quickCreate": "Hızlı Oluştur",
    "inbox": "Gelen Kutusu",
    "documents": "Belgeler"
  },
  "header": {
    "documents": "Belgeler",
    "github": "GitHub"
  },
  "user": {
    "account": "Hesap",
    "billing": "Faturalandırma",
    "notifications": "Bildirimler",
    "logout": "Çıkış Yap"
  },
  "nav": {
    "dashboard": "Panel",
    "lifecycle": "Yaşam Döngüsü",
    "analytics": "Analitik",
    "projects": "Projeler",
    "team": "Takım",
    "capture": "Yakalama",
    "proposal": "Teklif",
    "prompts": "İstemler",
    "activeProposals": "Aktif Teklifler",
    "archived": "Arşivlenen",
    "settings": "Ayarlar",
    "getHelp": "Yardım Al",
    "search": "Ara",
    "dataLibrary": "Veri Kütüphanesi",
    "reports": "Raporlar",
    "wordAssistant": "Kelime Asistanı"
  },
  "dashboard": {
    "cards": {
      "totalRevenue": "Toplam Gelir",
      "trendingUp": "Bu ay yükseliş trendinde",
      "visitorsLast6Months": "Son 6 aylık ziyaretçiler",
      "newCustomers": "Yeni Müşteriler",
      "down20Percent": "Bu dönem %20 düşüş",
      "acquisitionAttention": "Edinim dikkat gerektiriyor",
      "activeAccounts": "Aktif Hesaplar",
      "strongRetention": "Güçlü kullanıcı tutma",
      "engagementTargets": "Etkileşim hedefleri aşıldı",
      "growthRate": "Büyüme Oranı",
      "steadyPerformance": "İstikrarlı performans artışı",
      "meetsProjections": "Büyüme projeksiyonlarını karşılıyor"
    }
  },
  "chart": {
    "visitors": "Ziyaretçiler",
    "desktop": "Masaüstü",
    "mobile": "Mobil",
    "totalVisitors": "Toplam Ziyaretçiler",
    "totalLast3Months": "Son 3 ay için toplam",
    "last3Months": "Son 3 ay",
    "last30Days": "Son 30 gün",
    "last7Days": "Son 7 gün"
  },
  "table": {
    "header": "Başlık",
    "sectionType": "Bölüm Tipi",
    "status": "Durum",
    "target": "Hedef",
    "limit": "Limit",
    "reviewer": "İnceleyici",
    "customizeColumns": "Sütunları Özelleştir",
    "columns": "Sütunlar",
    "addSection": "Bölüm Ekle",
    "noResults": "Sonuç bulunamadı.",
    "rowsPerPage": "Sayfa başına satır",
    "pageInfo": "Sayfa {current} / {total}",
    "goToFirst": "İlk sayfaya git",
    "goToPrevious": "Önceki sayfaya git",
    "goToNext": "Sonraki sayfaya git",
    "goToLast": "Son sayfaya git",
    "rowsSelected": "{selected} / {total} satır seçildi.",
    "tabs": {
      "outline": "Özet",
      "pastPerformance": "Geçmiş Performans",
      "keyPersonnel": "Kilit Personel",
      "focusDocuments": "Odak Belgeler"
    }
  }
}
```

---

### FAZ 2: Auth Sayfalarını Localize Et (Estimated: 45 min)

#### 2.1 `sign-in/form.tsx` Güncelle
```typescript
"use client";
import { useTranslations } from "next-intl";

export function LoginForm({ ... }) {
  const t = useTranslations();
  
  // Validation schema içinde
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .min(6, t("validation.passwordMinLength"))
      .required(t("validation.passwordRequired")),
  });
  
  // JSX içinde
  // <CardTitle>{t("auth.signIn")}</CardTitle>
  // <CardDescription>{t("auth.signInDescription")}</CardDescription>
  // <Label>{t("common.email")}</Label>
  // ...
}
```

#### 2.2 `update-password/form.tsx` Güncelle
- Aynı pattern ile `useTranslations` hook'u ekle

#### 2.3 `error/page.tsx` Güncelle
- Server component olduğu için `getTranslations` kullan:
```typescript
import { getTranslations } from "next-intl/server";

export default async function Page({ searchParams }) {
  const t = await getTranslations();
  // ...
}
```

#### 2.4 `sign-up-success/page.tsx` Güncelle
- Server component pattern ile güncelle

---

### FAZ 3: Onboarding Sayfasını Localize Et (Estimated: 30 min)

#### 3.1 `onboarding/form.tsx` Güncelle
```typescript
"use client";
import { useTranslations } from "next-intl";

export function Form({ ... }) {
  const t = useTranslations();
  
  // Validation schema'yı component içine al veya useMemo kullan
  const validationSchema = React.useMemo(() => Yup.object({
    fullName: Yup.string().required(t("validation.fullNameRequired")),
    // ...
  }), [t]);
  
  // JSX içinde translations kullan
}
```

---

### FAZ 4: Sidebar Bileşenlerini Localize Et (Estimated: 45 min)

#### 4.1 `app-sidebar.tsx` Güncelle
```typescript
"use client";
import { useTranslations } from "next-intl";

export function AppSidebar({ ... }) {
  const t = useTranslations("sidebar");
  
  return (
    <Sidebar>
      <SidebarHeader>
        <span>{t("companyName")}</span>
      </SidebarHeader>
      {/* ... */}
    </Sidebar>
  );
}
```

#### 4.2 `nav-main.tsx` Güncelle
```typescript
"use client";
import { useTranslations } from "next-intl";

export function NavMain({ items }) {
  const t = useTranslations();
  
  return (
    <SidebarMenuButton tooltip={t("sidebar.quickCreate")}>
      <span>{t("sidebar.quickCreate")}</span>
    </SidebarMenuButton>
    // ...
  );
}
```

#### 4.3 `nav-documents.tsx` Güncelle
#### 4.4 `nav-secondary.tsx` Güncelle
#### 4.5 `nav-user.tsx` Güncelle
#### 4.6 `site-header.tsx` Güncelle

---

### FAZ 5: Dashboard Bileşenlerini Localize Et (Estimated: 60 min)

#### 5.1 `section-cards.tsx` Güncelle
```typescript
import { useTranslations } from "next-intl";

export function SectionCards() {
  const t = useTranslations("dashboard.cards");
  
  return (
    <Card>
      <CardDescription>{t("totalRevenue")}</CardDescription>
      {/* ... */}
    </Card>
  );
}
```

#### 5.2 `chart-area-interactive.tsx` Güncelle
- Chart config içindeki label'ları da localize et

#### 5.3 `data-table.tsx` Güncelle
- En kapsamlı dosya, dikkatli çalış
- Column tanımlarını component içine al (translations için)

---

### FAZ 6: Navigation Config Güncellemesi (Estimated: 30 min)

#### 6.1 Navigation itemlarını dinamik yap
`lib/routes/navigation.ts` dosyasını güncelle veya yeni bir hook oluştur:

```typescript
// lib/hooks/use-navigation.ts
import { useTranslations } from "next-intl";
import { mainNavigation as rawMainNavigation } from "@/lib/routes/navigation";

export function useLocalizedNavigation() {
  const t = useTranslations("nav");
  
  const mainNavigation = rawMainNavigation.map((item) => ({
    ...item,
    title: item.titleKey ? t(item.titleKey.replace("nav.", "")) : item.title,
    items: item.items?.map((subItem) => ({
      ...subItem,
      title: subItem.titleKey 
        ? t(subItem.titleKey.replace("nav.", "")) 
        : subItem.title,
    })),
  }));
  
  return { mainNavigation, /* ... */ };
}
```

---

### FAZ 7: Test ve Doğrulama (Estimated: 30 min)

#### 7.1 Build Kontrolü
```bash
npm run build
npm run lint
```

#### 7.2 Manuel Test
- [ ] Sign-in sayfası (TR/EN)
- [ ] Update password sayfası (TR/EN)
- [ ] Error sayfası (TR/EN)
- [ ] Sign-up success sayfası (TR/EN)
- [ ] Onboarding sayfası (TR/EN)
- [ ] Dashboard sidebar (TR/EN)
- [ ] Dashboard cards (TR/EN)
- [ ] Dashboard chart (TR/EN)
- [ ] Dashboard table (TR/EN)

#### 7.3 Locale Değiştirme Testi
- URL ile locale değiştirme (örn: `/en/dashboard` vs `/tr/panel`)

#### 7.4 Git Commit
```bash
git add .
git commit -m "feat(i18n): implement full localization with next-intl

- Add comprehensive en.json and tr.json message files
- Localize all auth pages (sign-in, update-password, error, sign-up-success)
- Localize onboarding flow
- Localize sidebar components
- Localize dashboard components (cards, chart, table)
- Create useLocalizedNavigation hook for dynamic nav items
- Default language: English, Secondary: Turkish"
```

---

## Önemli Notlar

### Server vs Client Components
| Component Type | Hook                  | Import                         |
|---------------|----------------------|--------------------------------|
| Client        | `useTranslations()`  | `from "next-intl"`             |
| Server        | `getTranslations()`  | `from "next-intl/server"`      |

### Yup Validation Schema
Yup validation'ları component dışında tanımlandığında çeviri çalışmaz. Çözümler:
1. Schema'yı component içinde `useMemo` ile tanımla
2. Validation mesajlarını ayrı bir fonksiyon olarak geç
3. Custom validation hook oluştur

### Dynamic Strings (Parametreli)
```typescript
// en.json
{ "pageInfo": "Page {current} of {total}" }

// Kullanım
t("table.pageInfo", { current: 1, total: 10 })
```

---

## Tahmini Süre
- **Toplam:** ~4-5 saat
- Faz 1 (Mesaj dosyaları): 30 dk
- Faz 2 (Auth sayfaları): 45 dk
- Faz 3 (Onboarding): 30 dk
- Faz 4 (Sidebar): 45 dk
- Faz 5 (Dashboard): 60 dk
- Faz 6 (Navigation): 30 dk
- Faz 7 (Test): 30 dk

---

## Gelecek İyileştirmeler

### Temel İyileştirmeler
1. Locale switcher component oluştur
2. Date/Number formatting için `useFormatter` hook kullan
3. SEO için localized metadata ekle
4. Plural forms desteği ekle (örn: "1 item" vs "5 items")

### İleri Seviye İyileştirmeler
5. **Lazy Loading Translations**: Büyük projelerde sadece gerekli namespace'leri yükleyerek initial bundle size'ı küçült
6. **Translation Management Dashboard**: Admin panelinden çevirileri yönetmek için bir arayüz oluştur (Supabase + i18n entegrasyonu)
7. **Missing Translation Reporter**: Development modunda eksik çevirileri otomatik tespit edip raporlayan bir sistem ekle
8. **RTL (Right-to-Left) Desteği**: Arapça, İbranice gibi diller için RTL layout support ekle

### Validation & QA İyileştirmeleri
9. **Translation Validation Pipeline**: CI/CD sürecinde çeviri dosyalarını valide eden bir script ekle (eksik key, format hatası, vb.)
10. **Automated Screenshot Testing**: Her locale için UI screenshot testleri oluşturarak görsel regresyonları tespit et

---

## Alternatif Çeviri Yaklaşımı Analizi: Translated Strings (Flat Key)

### Mevcut Yapı (Nested/Namespaced)
```json
{
  "common": {
    "email": "E-posta",
    "password": "Şifre"
  },
  "auth": {
    "signIn": "Giriş Yap",
    "signUp": "Kayıt Ol"
  }
}
```
**Kullanım:** `t("common.email")` veya `t("signIn")` (namespace ile)

### Alternatif: Flat Key (Translated Strings)
```json
{
  "Email": "E-posta",
  "Password": "Şifre",
  "Sign In": "Giriş Yap",
  "Sign Up": "Kayıt Ol",
  "Enter your credentials": "Bilgilerinizi girin",
  "Invalid email address": "Geçersiz e-posta adresi"
}
```
**Kullanım:** `t("Email")` veya `t("Sign In")`

### Karşılaştırma Analizi

| Kriter | Nested (Mevcut) | Flat Key (Önerilen Alternatif) |
|--------|----------------|--------------------------------|
| **Okunabilirlik** | ✅ Kategori bazlı organize | ⚠️ Tek seviye, alfabetik sıralama gerekli |
| **Geliştirici Deneyimi** | ✅ IDE auto-complete desteği | ⚠️ Daha az organize hissedebilir |
| **Bakım Kolaylığı** | ⚠️ Nested yapı karmaşıklığı | ✅ Basit "Kelime": "Çevirisi" yapısı |
| **Çeviri Süreci** | ⚠️ Çevirmen için karmaşık JSON | ✅ Çevirmen dostu, anlaşılır format |
| **Key Çakışması Riski** | ✅ Namespace sayesinde düşük | ⚠️ Dikkatli key yönetimi gerekli |
| **Refactoring** | ⚠️ Namespace değişikliği zor | ✅ Basit find/replace |
| **Bundle Size** | 🟰 Aynı | 🟰 Aynı |
| **Performans** | 🟰 Aynı | 🟰 Aynı |

### Önerilen Hibrit Yaklaşım: **Flat Key with Prefixes**

```json
{
  "common.email": "E-posta",
  "common.password": "Şifre",
  "auth.signIn": "Giriş Yap",
  "auth.signUp": "Kayıt Ol",
  "validation.invalidEmail": "Geçersiz e-posta adresi",
  "validation.passwordRequired": "Şifre gerekli"
}
```

**Avantajları:**
1. ✅ Flat yapının basitliği korunur
2. ✅ Prefix sayesinde organize kalır (arama/filtreleme kolay)
3. ✅ Çevirmenler için anlaşılır format
4. ✅ IDE auto-complete hala çalışır
5. ✅ `next-intl` ile tam uyumlu

**Kullanım:**
```typescript
const t = useTranslations();
t("common.email")      // "E-posta"
t("auth.signIn")       // "Giriş Yap"
```

### Sonuç ve Öneri

| Proje Tipi | Önerilen Yaklaşım |
|------------|-------------------|
| **Küçük Projeler (< 100 key)** | Flat Key - Basitlik öncelikli |
| **Orta Projeler (100-500 key)** | Flat Key with Prefixes - Denge |
| **Büyük Projeler (> 500 key)** | Nested (Mevcut) - Organizasyon öncelikli |

**Bu Proje İçin:** Mevcut proje orta ölçekli ve büyüme potansiyeli var. **Hibrit yaklaşım (Flat Key with Prefixes)** önerilir çünkü:
- Mevcut yapıdan kolay geçiş sağlar (key isimleri aynı kalır)
- Çevirmen dostudur (tek seviye JSON)
- IDE desteği korunur
- Gelecekte ölçeklendirme için yeterli organizasyon sağlar

### Migrasyon Örneği

**Önce (Nested):**
```json
{
  "common": {
    "email": "E-posta",
    "password": "Şifre"
  }
}
```

**Sonra (Flat with Prefix):**
```json
{
  "common.email": "E-posta",
  "common.password": "Şifre"
}
```

**Kod Değişikliği:** Yok! `t("common.email")` her iki yapıda da çalışır.
