---
description: Supabase veritabanı migration'larını yönetme ve deploy etme adımları
---

# Supabase Database Migrations

Bu workflow, Supabase CLI kullanarak veritabanı migration'larını oluşturmayı, test etmeyi ve production'a deploy etmeyi açıklar.

## Ön Gereksinimler

Supabase CLI'ın kurulu olması gerekir:
```bash
npm install -g supabase
# veya
bunx supabase --version
```

## İlk Kurulum (Bir Kez)

### 1. Supabase Projesini Initialize Et
// turbo
```bash
bunx supabase init
```

### 2. Supabase'e Login Ol
```bash
bunx supabase login
```

### 3. Remote Projeyi Bağla
```bash
bunx supabase link --project-ref YOUR_PROJECT_REF
```
> Project ref'i Supabase Dashboard > Project Settings > General'dan alabilirsiniz.

## Migration Oluşturma

### 1. Yeni Migration Dosyası Oluştur
```bash
bunx supabase migration new create_products_table
```
Bu komut `supabase/migrations/<timestamp>_create_products_table.sql` dosyası oluşturur.

### 2. Migration SQL'ini Yaz
Oluşturulan dosyaya SQL komutlarını ekleyin.

### 3. Local'de Test Et (Opsiyonel)
```bash
bunx supabase start
bunx supabase migration up
```

## Production'a Deploy

### 1. Migration'ları Push Et
```bash
bunx supabase db push
```

### 2. Seed Data ile Birlikte Push Et (Opsiyonel)
```bash
bunx supabase db push --include-seed
```

## Dashboard Değişikliklerini Migration'a Çevirme

Dashboard'dan yapılan değişiklikleri migration dosyasına çevirmek için:
```bash
bunx supabase db diff -f my_migration_name
```

## Veritabanı Sıfırlama (Local)

Tüm migration'ları yeniden uygulamak ve seed data'yı yüklemek için:
```bash
bunx supabase db reset
```

## Tip Oluşturma

Supabase tablolarından TypeScript tipleri oluşturmak için:
```bash
bunx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
```
