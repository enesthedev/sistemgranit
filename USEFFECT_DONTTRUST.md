# Proje Güvenlik ve Performans Analizi (Dont Trust Client & UseEffect)

Bu belge, proje genelinde "Don't Trust Client" (Güvenlik) ve "UseEffect Kullanmama" (Modern React/Next.js Mimarisi) prensiplerine göre yapılan analizleri ve çözüm önerilerini içerir.

> **Son Güncelleme:** 2026-01-31
> **Durum:** Refactoring Tamamlandı ✅

---

## 🛡️ 1. Don't Trust Client (Güvenlik & Validasyon)

Bu prensip, istemci tarafından gönderilen verilere asla güvenilmemesi gerektiğini, doğrulama ve yetkilendirmenin her zaman sunucu tarafında (Server Actions/API) yapılması gerektiğini savunur.

### ✅ Mevcut İyi Uygulamalar
*   **Server Actions Güvenliği:** `actions/products/` altındaki işlemler (create, delete vb.) `supabase.auth.getUser()` ile oturum kontrolü yapmakta ve Zod ile veri şeması doğrulamaktadır.
*   **Input Validation:** Veri tabanına yazılmadan önce tüm girdiler sunucu tarafında doğrulanmaktadır.

### ⚠️ Tespit Edilen Riskler ve İyileştirme Alanları

#### 1. Depolama (Storage) Güvenliği
*   **Dosya:** `actions/products/delete-product.ts` ve genel storage işlemleri.
*   **Durum:** Silme işlemi sırasında dosya yolları (path) genellikle istemciden gelen URL'den türetilip güveniliyor veya veritabanındaki kayıt esas alınıyor.
*   **Risk:** Düşük. Ancak, Supabase Storage RLS (Row Level Security) politikalarının aktif olduğundan emin olunmalıdır. Sadece dosya sahibi veya adminler silme işlemi yapabilmelidir.
*   **Öneri:** Supabase Dashboard üzerinden `storage.objects` tablosu için RLS politikalarını kontrol et.

#### 2. İstemci Tarafı Yetki Kontrolleri
*   **Dosya:** `nav-user.tsx`
*   **Durum/Risk:** Sidebar'da kullanıcı bilgisi client-side fetch ediliyor. Eğer kritik bir admin butonu sadece client-side veriye (örn: `user.role === 'admin'`) göre gizleniyorsa, bu bir güvenlik açığıdır.
*   **Öneri:** UI gizleme sadece UX içindir. Asıl yetki kontrolü mutlaka Server Action içinde (zaten yapılıyor) olmalıdır. Dashboard layout'unda yetki kontrolü server-side yapılmalı ve yetkisiz erişim redirect edilmelidir.

---

## ⚛️ 2. Don't Use UseEffect (Modern React Mimarisi)

Bu prensip, `useEffect` kancasının (hook) veri çekmek veya state senkronizasyonu için kullanılmamasını, bunun yerine Server Components, Event Handler'lar ve Key prop'unun kullanılmasını savunur.

### 🚫 Kritik İhlaller ve Çözüm Önerileri

#### 1. Client-Side User Fetching (En Kritik)
*   **Dosya:** `app/hooks/use-current-user.ts`
*   **Kullanım Yeri:** `app/[locale]/dashboard/components/sidebar/nav-user.tsx`
*   **Hata:** Kullanıcı oturum bilgisi `useEffect` içinde istemci tarafında çekiliyor.
*   **Neden Kötü?**
    *   **Waterfall:** Sayfa yüklendikten sonra veri çekmeye başlar (gecikme).
    *   **CLS/Flaş:** Kullanıcı adı/avatarı sonradan yüklenir, "Loading" durumu oluşur.
    *   **Gereksiz Client Component:** Veri sunucuda zaten mevcut (Cookie).
*   **Çözüm:**
    1.  `app/[locale]/dashboard/layout.tsx` (Server Component) içinde `supabase.auth.getUser()` ile kullanıcıyı al.
    2.  `user` objesini `<AppSidebar user={user} />` şeklinde prop olarak geç.
    3.  `useCurrentUser` hook'unu ve client-side fetch işlemini tamamen kaldır.

#### 2. State Resetting with Effect
*   **Dosya:** `app/[locale]/dashboard/products/components/form/hooks/use-step-navigation.ts`
*   **Kod:**
    ```typescript
    useEffect(() => { setCurrentStep(0); }, [productId]);
    ```
*   **Hata:** `productId` değiştiğinde state'i sıfırlamak için effect kullanılıyor.
*   **Neden Kötü?** React render döngüsünden sonra çalışır, gereksiz re-render tetikler.
*   **Çözüm:** Form bileşenini çağıran parent component'te `key` prop'u kullanın.
    ```tsx
    // Parent component
    <ProductForm key={productId} ... />
    ```
    `key` değiştiğinde React bileşeni tamamen sıfırdan oluşturur (auto-reset), `useEffect` gerekmez.

#### 3. Analytics Tracking
*   **Dosya:** `app/components/analytics-provider.tsx`
*   **Kod:** `useEffect(() => { trackPageView(pathname) }, [pathname])`
*   **Durum:** Kabul edilebilir istisna.
*   **Not:** Google Analytics vb. 3. parti scriptler için bu kullanım standarttır. Ancak performans için bu scriptlerin `next/script` ile veya `lazy` yüklenmesi önemlidir. Şimdilik kalabilir.

#### 4. File Upload Cleanup
*   **Dosya:** `app/components/form/form-file-upload/form-file-upload.tsx`
*   **Durum:** Object URL'leri (preview resimleri) temizlemek için kullanılıyor.
*   **Not:** Bellek sızıntısını önlemek için bu kullanım geçerlidir ve gereklidir. Doğru kullanım.

---

## 🚀 Aksiyon Planı

### Öncelik 1: User Fetching Refactor
- [x] `app/[locale]/dashboard/layout.tsx` dosyasını güncelle: Auth check ve data fetching ekle.
- [x] `AppSidebar` ve `NavUser` bileşenlerini `user` prop'u alacak şekilde güncelle.
- [x] `useCurrentUser` hook'unu sil.

### Öncelik 2: Form Reset Refactor
- [x] `useStepNavigation` hook'undan `useEffect` kısmını kaldır.
- [x] Ürün düzenleme sayfasında (`app/[locale]/dashboard/products/[id]/page.tsx`) `ProductForm` bileşenine `key={product.id}` ver.

### Öncelik 3: Kategori Formu ve Güvenlik Refactor
- [x] Ürün formundaki `useEffect` kategori çekme işlemi kaldırıldı, server-side prop'a taşındı.
- [x] Kategori formundaki `useEffect` slug senkronizasyonu kaldırıldı, event handler'a taşındı.
- [x] Tüm kategori server action'larına (`create`, `update`, `delete`) `auth.getUser()` kontrolü eklendi.

### Öncelik 4: Genel Kontroller
- [ ] Supabase Storage RLS politikalarını kontrol et (Manuel işlem).
