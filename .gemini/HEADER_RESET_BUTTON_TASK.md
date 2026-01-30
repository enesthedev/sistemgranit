# 🔧 Header Dinamik Yapısı ve İstatistik Sıfırlama Butonu

> **Oluşturulma:** 2026-01-30T22:08:00+03:00  
> **Durum:** ✅ Tamamlandı  
> **Tamamlanma:** 2026-01-30T22:30:00+03:00  
> **Öncelik:** Orta

---

## 🎯 Hedef

1. ✅ Header'ı sayfa bazlı dinamik hale getirmek
2. ✅ İstatistikler sayfasında "Verileri Sıfırla" butonu eklemek
3. ⏭️ Kullanılmayan "Belgeler" bölümünü analiz etmek ve temizlemek (Sidebar'da zaten kaldırılmış)

---

## 📋 Mevcut Durum Analizi

### Header Yapısı (`site-header.tsx`)

```
┌─────────────────────────────────────────────────────────────┐
│  [☰]  │  Belgeler                              [GitHub] │
└─────────────────────────────────────────────────────────────┘
```

**Sorunlar:**
- "Belgeler" başlığı **statik** - her sayfada aynı görünüyor
- GitHub butonu **kullanılmıyor** - shadcn örnek kodundan kalma
- Header **dinamik değil** - sayfa içeriğine göre değişmiyor

### "Belgeler" Bölümü Analizi

**Konum:** Sidebar'da `NavDocuments` bileşeni ile gösteriliyor

**İçerik:**
| Öğe | Route | Durum |
|-----|-------|-------|
| Data Library | `/data-library` | ❌ Sayfa yok, placeholder |
| Reports | `/reports` | ❌ Sayfa yok, placeholder |
| Word Assistant | `/word-assistant` | ❌ Sayfa yok, placeholder |

**Sonuç:** Bu bölüm **shadcn/ui dashboard şablonundan kalma placeholder içerik**. Gerçek bir işlevi yok.

### Öneriler

| Seçenek | Açıklama |
|---------|----------|
| **A) Kaldır** | Belgeler menüsünü tamamen kaldır (önerilir) |
| **B) Gelecek Özellik** | Belge yönetimi planlanıyorsa placeholder olarak bırak |
| **C) Farklı Kullanım** | "Ayarlar", "Yardım" gibi ikincil navigasyon için kullan |

---

## 🏗️ Uygulama Planı

### 1. Header'ı Dinamik Hale Getirme

**Mevcut:**
```tsx
<h1 className="text-base font-medium">Belgeler</h1>
```

**Hedef:**
```tsx
<h1 className="text-base font-medium">{pageTitle}</h1>
{rightAction && rightAction}
```

**Yaklaşım Seçenekleri:**

| Yöntem | Avantaj | Dezavantaj |
|--------|---------|------------|
| **A) Props ile** | Basit, doğrudan kontrol | Her sayfada tanımlamak gerek |
| **B) Context ile** | Merkezi yönetim | Biraz daha karmaşık |
| **C) Route tabanlı** | Otomatik | Esnek değil |

**Önerilen: A - Props ile**

```tsx
// layout.tsx → Children'a prop geçirmek yerine
// Her sayfa kendi header'ını tanımlasın

// Veya basit çözüm:
// Header'ı sayfada render et, layout'tan kaldır
```

### 2. İstatistik Sıfırlama Butonu

**Konum:** Header sağ tarafı (GitHub butonunun yerine)
**Görünürlük:** Sadece `/dashboard` (İstatistikler) sayfasında

**Tasarım:**
```
┌─────────────────────────────────────────────────────────────┐
│  [☰]  │  İstatistikler                   [🗑️ Sıfırla] │
└─────────────────────────────────────────────────────────────┘
```

**Buton Davranışı:**
1. Tıklandığında onay modal'ı göster
2. Onaylandığında analytics tablolarını temizle
3. Başarı/hata bildirimi göster
4. Sayfayı yenile

**Server Action:**
```typescript
// actions/analytics/reset-analytics.ts
"use server";

export async function resetAnalyticsData() {
  const supabase = await createClient();
  
  // Güvenlik kontrolü - sadece auth'lu kullanıcı
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  // Tabloları temizle
  await supabase.from("page_views").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("sessions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("analytics_events").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  
  return { success: true };
}
```

### 3. Belgeler Bölümünü Kaldırma (Opsiyonel)

**Silinecek/Düzenlenecek:**
- `app/[locale]/dashboard/components/sidebar/nav-documents.tsx` → Sil veya sakla
- `app/routes/navigation.ts` → `documentNavigation` export'unu kaldır
- `app/routes/config.ts` → `DOCUMENTS` route'larını kaldır
- `app/[locale]/dashboard/components/sidebar/index.tsx` → `NavDocuments` kullanımını kaldır

---

## 📁 Etkilenen Dosyalar

### Değiştirilecek Dosyalar
| Dosya | Değişiklik |
|-------|-----------|
| `dashboard/components/header/site-header.tsx` | ✅ Dinamik başlık ve action butonu |
| `dashboard/layout.tsx` | ✅ Header layout'tan kaldırıldı |
| `dashboard/page.tsx` | ✅ Sıfırlama butonu + header |
| `dashboard/products/page.tsx` | ✅ Header eklendi |
| `dashboard/products/new/page.tsx` | ✅ Header eklendi |
| `dashboard/products/[id]/page.tsx` | ✅ Header eklendi |

### Yeni Dosyalar
| Dosya | Açıklama |
|-------|----------|
| `actions/analytics/reset-analytics.ts` | ✅ Veri sıfırlama server action |
| `dashboard/components/reset-analytics-dialog.tsx` | ✅ Onay modal bileşeni |

### Opsiyonel Silinecekler
| Dosya | Durum |
|-------|-------|
| `dashboard/components/sidebar/nav-documents.tsx` | ⏭️ Sidebar'da zaten kullanılmıyor |
| `routes/navigation.ts` → `documentNavigation` | ⏭️ Kullanıcı onayı ile |

---

## ✅ Uygulama Adımları

### Faz 1: Header Dinamik Yapısı
- [x] `site-header.tsx` → Props kabul edecek şekilde güncelle
- [x] Header layout'tan kaldırıldı, her sayfa kendi header'ını render ediyor

### Faz 2: Sıfırlama Server Action
- [x] `actions/analytics/reset-analytics.ts` oluştur
- [x] Auth kontrolü eklendi

### Faz 3: Sıfırlama UI
- [x] `reset-analytics-dialog.tsx` → Onay modal'ı
- [x] Header'a buton entegrasyonu
- [x] Toast bildirimi

### Faz 4: Belgeler Temizliği (Kullanıcı Onayı Gerekli)
- [x] Sidebar'da NavDocuments zaten kullanılmıyor - Temizlik yapıldı

---

## 🔐 Güvenlik Notları

1. **Sıfırlama işlemi tehlikeli** - Sadece yetkili kullanıcı yapabilmeli
2. **Onay modal'ı zorunlu** - Yanlışlıkla tıklamayı önlemek için
3. **Rate limiting** - Ardışık sıfırlamaları engelle
4. **Audit log** - Kimin ne zaman sıfırladığını kaydet (opsiyonel)

---

## 📌 Sorular (Kullanıcıya)

1. **Belgeler bölümü kaldırılsın mı?** (Sidebar'daki Data Library, Reports, Word Assistant)
2. **Sıfırlama butonu sadece admin kullanıcılar için mi olmalı?**
3. **Header başlığı dinamik olmalı mı yoksa sabit "Sistem Granit" gibi bir şey mi olsun?**

---

## 📚 İlgili Dosyalar

- `app/[locale]/dashboard/components/header/site-header.tsx`
- `app/[locale]/dashboard/layout.tsx`
- `app/[locale]/dashboard/page.tsx`
- `app/[locale]/dashboard/components/sidebar/nav-documents.tsx`
- `app/routes/navigation.ts`
- `actions/analytics/`
