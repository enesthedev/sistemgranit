# 📊 Faz 3: İleri Düzey Analitik (Advanced Analytics)

Bu faz, "Sistem Granit" üzerindeki kullanıcı davranışlarını derinlemesine anlamak ve veri odaklı kararlar alınmasını sağlamak için oluşturulmuştur. Google Analytics yerine, gizlilik odaklı ve tamamen kontrolümüzde olan (self-hosted) bir çözüm hedeflenmektedir.

## 3.1 Veri Toplama Stratejisi
*Amaç:* Kullanıcı gizliliğine saygılı, performans dostu veri toplama.
**Görevler:**
- [ ] **Tablo Tasarımı:** `analytics_events` (event_type, page_url, referrer, device_type, session_id, created_at) ve `sessions` (duration, entry_page, etc.) tablolarını oluştur.
- [ ] **Tracking Script:** Next.js içinde hafif (`lightweight`) bir custom hook (`useAnalytics`) yaz.
- [ ] **Server Action Entegrasyonu:** Veriyi sunucuya göndermek için `Navigator.sendBeacon` yerine tercih edilebilir Server Action (`logEvent`) oluştur. (Next.js 15+ ile `after` API'si kullanılabilir).

## 3.2 Dashboard & Görselleştirme
*Amaç:* Toplanan veriyi anlamlı grafiklere dönüştürmek.
**Görevler:**
- [ ] **Materialized View:** Supabase üzerinde aggregate sorgularını (günlük ziyaretçi, en çok görüntülenen ürünler) hızlandırmak için Materialized View kullan.
- [ ] **Recharts Entegrasyonu:**
    - Ziyaretçi Trendi (Çizgi Grafik - Line Chart)
    - Cihaz Dağılımı (Pasta Grafik - Pie Chart)
    - En Popüler Kategoriler (Bar Chart)
- [ ] **Harita:** Kullanıcı lokasyonlarını (ülke bazlı) göstermek için basit bir SVG harita veya tablo ekle.

## 3.3 Raporlama ve Dışa Aktarma
*Amaç:* Verileri paylaşılabilir formatlara dönüştürmek.
**Görevler:**
- [ ] **PDF Rapor:** `react-pdf` veya sunucu tarafında oluşturulan HTML->PDF dönüşümü ile aylık özet rapor oluştur.
- [ ] **Email Bildirim:** Haftalık/Aylık otomatik özet e-postaları gönder (Resend vb. entegrasyonu ile).

## 3.4 Kullanıcı Davranış Analizi
**Görevler:**
- [ ] **Isı Haritası (Heatmap) Altyapısı (Opsiyonel):** Tıklama koordinatlarını kaydederek basit bir yoğunluk haritası oluştur.
- [ ] **Huni Analizi (Funnel):** Ana Sayfa -> Ürün Detayı -> İletişim Formu akışındaki kayıp oranlarını (drop-off) hesapla.

---

**Başarı Kriterleri:**
- Dashboard sayfasının 500ms altında yüklenmesi (Materialized View sayesinde).
- Günlük 10.000+ event kapasitesini sorunsuz işleyebilmesi.
- Raporların otomatik olarak belirlenen admin e-postalarına düşmesi.
