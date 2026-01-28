---
description: Her görev öncesinde proje bağlamını kontrol etme ve görev sonunda güncelleme
---

# Proje Bağlam Kontrolü Workflow'u

Bu workflow, her görev başlangıcında ve sonunda proje bağlam dosyasının yönetimini sağlar.

## Görev Başlangıcında

// turbo
1. `.gemini/PROJECT_CONTEXT.md` dosyasının varlığını kontrol et
2. Dosya varsa, içeriğini oku ve proje bağlamını anla
3. Dosya yoksa, projeyi analiz edip yeni bir PROJECT_CONTEXT.md oluştur

## Görev Sırasında

4. PROJECT_CONTEXT.md'deki bilgileri referans olarak kullan
5. Yeni dosya/klasör oluşturulduğunda not al
6. Veritabanı değişiklikleri yapıldığında not al
7. Yeni bileşen/hook eklendiğinde not al

## Görev Sonunda

8. Yapılan değişiklikleri PROJECT_CONTEXT.md'ye ekle:
   - Yeni dosya/klasör yapısı
   - Veritabanı şema değişiklikleri
   - Yeni bileşenler/hook'lar
   - Çözülen/eklenen TODO'lar
   - Güncelleme geçmişine yeni kayıt

9. "Son Güncelleme" tarihini güncelle

## Dosya Konumu

```
.gemini/PROJECT_CONTEXT.md
```

## Güncelleme Formatı

Güncelleme geçmişine yeni kayıt eklerken:

```markdown
| Tarih | Değişiklik |
|-------|------------|
| YYYY-MM-DD | Yapılan değişikliğin kısa açıklaması |
```
