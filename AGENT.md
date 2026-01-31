# 🤖 Sistem Granit Agent Configuration

> **Son Güncelleme:** 2026-01-31  
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
