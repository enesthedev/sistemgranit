# 🚀 Faz 2: Özellik Genişletme (Feature Expansion)

Bu faz, admin panelinin kullanılabilirliğini artırmayı ve ileri düzey yönetim özelliklerini entegre etmeyi hedefler. Sürükle-bırak sıralamaları, veri toplu işlemleri ve rol tabanlı yetkilendirme (RBAC) bu fazın ana odaklarıdır.

## 2.1 Görsel Sıralama (Drag & Drop)
*İhtiyaç:* Ürün galerisindeki görsellerin sırası sürükle-bırak ile değiştirilebilir olmalıdır.
**Görevler:**
- [ ] **Entegrasyon:** Mevcut `@dnd-kit` kütüphanesini kullanarak `FormImageUpload` bileşenini güncellle.
- [ ] **State Yönetimi:** Sıralama değişimlerini lokal state'te yönet ve kaydetme anında güncelle.
- [ ] **Supabase Update:** Görsellerin (`images` array) sıralı halini veritabanına kaydet. (Dizinin index sırası = görüntüleme sırası).

## 2.2 Toplu Veri İşlemleri (Excel Import/Export)
*İhtiyaç:* Adminlerin Excel (XLSX) formatında ürün listelerini indirmesi ve toplu olarak güncellemesi.
**Görevler:**
- [ ] **Kütüphane:** Projeye `xlsx` veya benzeri bir paket ekle (`bun add xlsx`).
- [ ] **Export:** Ürünler tablosuna "Excel Olarak İndir" butonu ekle. Verileri düzgün formatta (başlıklar, tipler) dışa aktar.
- [ ] **Import:** Yönetim panelinde "Toplu Ürün Yükle" sayfası oluştur. Şablon Excel dosyasını sun.
- [ ] **Validasyon:** Yüklenen Excel satırlarını Zod şeması ile sunucu tarafında doğrula ve hatalı satırları raporla.

## 2.3 Rol Tabanlı Yetkilendirme (RBAC)
*İhtiyaç:* Admin ve Editör yetkilerini ayrıştırmak. Sadece Admin'ler kullanıcı ekleyebilir/silebilir.
**Görevler:**
- [ ] **Veritabanı:** `profiles` tablosuna `role` (enum: 'admin', 'editor') sütunu ekle veya Supabase Auth `app_metadata` kullan.
- [ ] **Middleware:** `src/middleware.ts` veya `proxies/with-auth-guard.ts` içinde rol kontrolü yap.
- [ ] **UI:** Rol yetkisine göre menü öğelerini (örneğin "Kullanıcılar") gizle/göster.
- [ ] **RLS:** Supabase Row Level Security politikalarını güncelle (örneğin: "Sadece admin silebilir").

## 2.4 Gelişmiş Filtreleme
*İhtiyaç:* Ürün listelerinde detaylı filtreleme (fiyat aralığı, stok durumu, kategori çoklu seçim).
**Görevler:**
- [ ] **Data Table:** Mevcut `DataTable` bileşenine `FacetedFilter` (çoklu seçim dropdown) desteği ekle.
- [ ] **Backend:** URL parametrelerinden gelen filtreleri Server Action içinde dinamik olarak Supabase sorgusuna çevir.

---

**Başarı Kriterleri:**
- Görsellerin sürükle-bırak ile sırasının değiştirilebilmesi ve kaydedilmesi.
- Adminlerin en az 50 ürünlük bir listeyi Excel ile hatasız yükleyebilmesi.
- Editör rolündeki bir kullanıcının "Kullanıcılar" sayfasına erişememesi (403 Forbidden).
