# 🚀 Stratejik Geliştirme Planı (Phased Strategy)

Bu belge, **Sistem Granit** projesinin analizine dayanarak oluşturulmuş kapsamlı geliştirme yol haritasını içerir. Mevcut kod tabanı (Next.js 16, Supabase, Tailwind CSS v4) modern ve güçlüdür, ancak ölçeklenebilirlik, veri bütünlüğü ve kullanıcı deneyimi açısından iyileştirmelere ihtiyaç duymaktadır.

## 🎯 Hedefler

1.  **Kod Kalitesi & Güvenlik:** İstemci tarafındaki (Client-side) mantığı azaltarak Sunucu Eylemleri (Server Actions) kullanımını maksimize etmek ("Don't Trust Client").
2.  **Veri Bütünlüğü:** Form validasyon şemalarını (Yup/Zod) tekilleştirmek.
3.  **Kullanıcı Deneyimi:** Admin panelini daha yetenekli hale getirmek (Sürükle-Bırak, Excel Import/Export).
4.  **İş Zekası:** Özelleştirilmiş ve derinlemesine analitik raporları.

## 📅 Fazlar

Aşağıdaki fazlar sırasıyla uygulanmalıdır:

- **[Faz 1: Temel & Refactoring](./phase-1-foundation.md)**
    - Validasyon standardizasyonu (Zod'a geçiş).
    - "Don't Trust Client" ilkesinin uygulanması.
    - Tip güvenliği artırımı.

- **[Faz 2: Özellik Genişletme (Feature Expansion)](./phase-2-features.md)**
    - Sürükle-Bırak ile görsel sıralama.
    - Excel ile toplu ürün işlemleri.
    - Rol tabanlı yetkilendirme (RBAC).

- **[Faz 3: İleri Analitik (Advanced Analytics)](./phase-3-analytics.md)**
    - Özel dashboard widget'ları.
    - Raporlama ve dışa aktarma.
    - Kullanıcı davranış analizi.

- **[Faz 4: Kalite & Performans (Quality Assurence)](./phase-4-quality.md)**
    - E2E Testleri (Playwright).
    - SEO Audits & Sitemap.
    - Performans optimizasyonları (Image, Caching).

---

> **Not:** Her faz tamamlandığında `AGENT.md` ve `.agent/spec/tasks.md` dosyaları güncellenmelidir.
