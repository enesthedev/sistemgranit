# 🧪 Faz 4: Kalite Güvencesi & Performans (Quality Assurance & Performance)

Bu faz, projenin sadece işlevsel değil, aynı zamanda güvenilir, sağlam ve hızlı olmasını sağlar. Test kapsamı (Test Coverage) artırılır ve performans metrikleri optimize edilir.

## 4.1 Test Stratejisi
*Amaç:* Hata tespiti ve güvenli deployment.
**Görevler:**
- [ ] **E2E (Uçtan Uca) Testler:**
    - **Playwright** kurulumu yap (`bun add -D @playwright/test`).
    - Senaryolar: Login, ürün ekleme (tüm adımlar), ürün silme, form validasyon hataları.
    - CI/CD entegrasyonu (GitHub Actions üzerinde testleri çalıştır).
- [ ] **Birim Testler (Unit Tests):**
    - **Vitest** kurulumu yap (`bun add -D vitest`).
    - Utils klasörü altındaki tüm helper fonksiyonların %90+ coverage ile test edilmesi.
    - Zod şemalarının hatasız çalıştığının doğrulanması.

## 4.2 SEO & İçerik Yönetimi
*Amaç:* Arama motorlarında görünürlük artırma.
**Görevler:**
- [ ] **Sitemap.xml:** `next-sitemap` veya custom `app/sitemap.ts` ile dinamik sitemap oluştur (ürün slug değişikliklerine anlık tepki).
- [ ] **Schema Markup (JSON-LD):** Ürün detay sayfalarına Google Rich Results uyumlu Structured Data ekle.
- [ ] **Robots.txt:** Otomatik oluşturulan ve kuralları dinamik yönetilen robots.txt dosyası.

## 4.3 Performans Optimizasyonu
*Amaç:* Lighthouse skoru 95+ (Performance).
**Görevler:**
- [ ] **Görsel Optimizasyonu:** `next/image` konfigürasyonunu kontrol et (AVIF format desteği, lazy loading strategy).
- [ ] **Lazy Loading:** Sayfa geçişlerinde `loading.tsx` dosyalarının etkin kullanımını doğrula. Code splitting analizleri yap (`@next/bundle-analyzer`).
- [ ] **Caching:** Supabase sorguları için `revalidatePath` ve `unstable_cache` stratejilerini gözden geçir. (Stale-While-Revalidate).

## 4.4 Hata İzleme (Error Monitoring)
*Amaç:* Canlıdaki hataları proaktif yakalama.
**Görevler:**
- [ ] **Sentry Entegrasyonu (Opsiyonel):** Eğer bütçe/ihtiyaç varsa, Sentry ile frontend/backend hata takibi kur.
- [ ] **Global Error Boundary:** Next.js `error.tsx` sayfalarını tüm segmentlere (root, dashboard, public) uygula ve kullanıcı dostu yap.

---

**Başarı Kriterleri:**
- Playwright ile en az kritik 5 kullanıcı akışının (user flow) %100 başarılı tamamlanması.
-lighthouse skoru (Mobil): Performance > 90, SEO = 100, Accessibility > 95.
- Google Search Console'da "No errors" durumuna geçilmesi.
