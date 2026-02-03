# 🤖 Sistem Granit Agent Configuration

> **Son Güncelleme:** 2026-02-03  
> **Versiyon:** 1.1.0  
> **Konum:** `AGENT.md` (Root)

Bu dosya, yapay zeka agent'ının davranışını yönlendiren temel yapılandırma ve referans dosyasıdır. Proje bağlamı ve kuralları `.agent/` dizini altında modüler olarak tutulmaktadır.

## 🎯 Proje Özeti
**Sistem Granit**, doğal taş (mermer, granit, traverten vb.) ürünleri yönetimi için geliştirilmiş B2B odaklı bir web uygulamasıdır. Admin paneli aracılığıyla ürün yönetimi, görsel yükleme ve SEO optimizasyonu sağlar.

## 📂 Bağlam Yapısı (.agent/)

| Dizin/Dosya | Açıklama |
|-------------|----------|
| `spec/requirement.md` | Proje gereksinimleri ve hedefleri |
| `spec/design.md` | Veritabanı şeması, UI bileşenleri ve form yapıları |
| `spec/tasks.md` | Bekleyen işler (TODO), bilinen sorunlar |
| `wiki/architecture.md` | Teknoloji stack'i, mimari kararlar (Auth, i18n), klasör yapısı |
| `plans/` | Gelecek geliştirme fazları ve detaylı yol haritaları |
| `links/resources.md` | Harici kaynaklar ve dokümantasyon referansları |

## 📜 Komutlar

```bash
# Development
bun run dev

# Build
bun run build

# Lint
bun run lint

# Supabase CLI
bunx supabase migration new <name>
bunx supabase db push
bunx supabase gen types typescript --linked > supabase/database.types.ts
```

## 📌 Kodlama Standartları

1. **Dosya Adlandırma:** kebab-case (örn: `form-input.tsx`)
2. **Component Adlandırma:** PascalCase (örn: `FormInput`)
3. **Dil:** Türkçe UI metinleri, İngilizce kod/yorumlar
4. **Import Sırası:** 
   - React/Next.js
   - External packages
   - Internal modules (@ alias)
   - Relative imports
5. **Component Yapısı:**
   - Props interface
   - Component function
   - Helper functions
6. **Server Actions:** `"use server"` direktifi ile
7. **Client Components:** `"use client"` direktifi ile

## 🔄 Güncelleme Geçmişi

| Tarih | Değişiklik |
|-------|------------|
| 2026-01-28 | İlk versiyon oluşturuldu (PROJECT_CONTEXT.md) |
| 2026-01-28 | Sidebar active state fix, Data Table implementasyonu |
| 2026-01-28 | Next.js 15 params fix, Data Table integration |
| 2026-01-30 | Analytics fixes, Provider refactoring, Dashboard optimization |
| 2026-01-31 | Kategori Modülü (Multi-step form, FileUpload, Data Table) |
| 2026-01-31 | Kategori Görsel Yükleme Hatası Düzeltildi |
| 2026-01-31 | **Migration:** `.gemini/PROJECT_CONTEXT.md` -> `.agent/` yapısına geçildi |
| 2026-01-31 | **Analiz:** Proje genel analizi tamamlandı ve geliştirme fazları (`.agent/plans/`) oluşturuldu |
| 2026-02-02 | **Phase 1:** Form validasyonları (Product & Category) Zod ile standardize edildi ve Server Actions ile paylaşıldı. |
| 2026-02-02 | **Phase 1:** Tamamlandı. Veri güvenliği, tip güvenliği entegrasyonu ve kod temizliği yapıldı. |
| 2026-02-03 | **Fix:** İnternet bağlantı hatasında Onboarding'e düşme sorunu giderildi. Kayıtlı kullanıcı varken Onboarding'e erişim engellendi. |
| 2026-02-03 | **Analytics:** Session mantığı refactor edildi (`isNewSession` fix). Dashboard ve Admin rotaları takipten çıkarıldı. |
| 2026-02-03 | **Phase 3:** İleri Düzey Analitik altyapısı kuruldu. (`useAnalytics` hook, Server Actions, Materialized View migration). |
| 2026-02-03 | **Analiz:** Data Table optimizasyon ve useReactTable refactoring planı oluşturuldu (`.agent/plans/data-table-optimization.md`). |
| 2026-02-03 | **Phase 2:** Ürün Yönetimi için Gelişmiş Filtreleme (Server-side) ve Görsel Sıralama (Drag & Drop) tamamlandı. `ProductsDataTable` refactor edildi. |
| 2026-02-03 | **Refactor:** Data Table optimizasyon planı uygulandı. Tekrarlayan `useReactTable` kullanımları kaldırılarak merkezi `<DataTable />` yapısına geçildi. `ProductsDataTable` ve `CategoriesTable` güncellendi. |
| 2026-02-03 | **Plan:** Performans sorunları nedeniyle Data Table için yeni bir "URL-First" optimizasyon planı oluşturuldu (`.agent/plans/data-table-optimization.md`). |
| 2026-02-03 | **Optimization:** "URL-First" Data Table mimarisi uygulandı. `useDataTable` hook'u yazılarak `ProductsDataTable` ve `CategoriesTable` re-render sorunlarından arındırıldı. |
