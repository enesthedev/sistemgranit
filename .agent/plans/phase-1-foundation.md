# 🛠️ Faz 1: Temel İyileştirmeler & Güvenlik (Foundation & Security)

Bu faz, projenin en kritik yapı taşlarını güçlendirmeyi ve teknik borçları temizlemeyi hedefler. Kod tabanının tutarlılığı ve veri güvenliği önceliklidir.

## 1.1 "Don't Trust Client" Analizi ve Uygulaması
*Mevcut durum:* İstemci tarafında (useEffect) yapılan veri işlemleri, güvenlik riskleri ve veri tutarsızlıkları yaratabilir. Veri doğruluğunu sağlamak için tüm kritik işlemler sunucu tarafına taşınmalıdır.

**Görevler:**
1. [x] **Veri Çekme (Data Fetching):** `useEffect` ile yapılan veri çekme işlemlerini tespit et ve bunları Server Components içine taşı (Suspense ve Streaming ile optimize et).
2. [x] **Veri Güncelleme (Mutation)::** Kullanıcı tarafından tetiklenen tüm veri değişikliklerini (örneğin Analytics takibi) Server Actions üzerinden yap ve Zod ile strict validasyondan geçir.
3. [x] **Guard Analizi:** Client-side route korumalarının (HOC) yanı sıra, Server Action'ların içinde de mutlaka oturum/rol kontrolü yapıldığından emin ol.

## 1.2 Form Validasyonu Standardizasyonu (Zod Entegrasyonu)
*Mevcut durum:* Projede hem `yup` (Formik) hem de `zod` (Server Validation) kullanılıyor. Bu durum kod tekrarına ve potansiyel uyumsuzluklara yol açıyor.

**Görevler:**
1. [x] **Tekilleştirme:** Tüm şemaları `zod` tabanlı olarak yeniden yaz.
2. [x] **Entegrasyon:** `formik-validator-zod` kütüphanesini kullanarak Formik formlarını Zod şemaları ile çalıştır. (Alternatif: React Hook Form değerlendirilebilir ancak Formik yaygınsa adaptör daha hızlı çözüm sunar).
3. [x] **Paylaşım:** Oluşturulan Zod şemalarını hem client formlarında hem de server action validasyonlarında ortak (`shared`) kullan.

## 1.3 TypeScript Strict Mode & Tip Güvenliği
*Mevcut durum:* Tip tanımlarının eksik olduğu veya `any` kullanıldığı noktalar olabilir.

**Görevler:**
1. [x] **Database Types:** Supabase'den otomatik generate edilen tiplerin (`database.types.ts`) tüm bileşenlerde aktif kullanılmasını sağla.
2. [x] **Component Props:** Tüm React bileşenlerinin props interface'lerini açıkça tanımla (`FC` kullanımı yerine doğrudan fonksiyon parametre tipleri önerilir).
3. [x] **Generic Table:** `DataTable` bileşeni generic yapısını güçlendir, `TData` ve `TValue` tanımlarını netleştir.

## 1.4 Kod Organizasyonu ve Dokümantasyon
**Görevler:**
1. [x] **Alias Kullanımı:** Kod içerisindeki import yollarını (../../) `@/components`, `@/lib` gibi alias'lar ile standardize et.
2. [x] **ESLint & Prettier:** Otomatik formatlama ve lint kurallarını sıkılaştır (örneğin `unused-vars` error seviyesine çekilsin).
3. [x] **Belgeleme:** Karmaşık iş mantığı içeren fonksiyonlar için JSDoc benzeri açıklamalar ekle (özellikle hooks ve utils).

---

**Başarı Kriterleri:**
- `useEffect` kullanımının sadece UI/Animasyon mantığıyla sınırlı kalması.
- Form validasyonlarının tek bir Zod şeması üzerinden yönetilmesi.
- Tip hatası (ts-error) sayısının sıfıra indirilmesi.
