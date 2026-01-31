---
description: Her görev öncesinde proje bağlamını kontrol etme ve görev sonunda güncelleme
---

# Proje Bağlam Kontrolü Workflow'u

Bu workflow, her görev başlangıcında ve sonunda `.agent/` dizini altındaki proje bağlam dosyalarının yönetimini sağlar.

## Görev Başlangıcında

// turbo
1. `AGENT.md` dosyasının varlığını kontrol et.
2. `AGENT.md` dosyasını oku ve genel proje durumunu anla.
3. İhtiyaca göre `.agent/spec/requirement.md`, `.agent/spec/design.md` veya `.agent/spec/tasks.md` dosyalarını incele.

## Görev Sırasında

4. Kod değişikliklerini yaparken `AGENT.md` içindeki "Kodlama Standartları"na uy.
5. Yeni bir özellik ekliyorsan `spec/requirement.md` ve `spec/design.md` dosyalarındaki tanımlara dikkat et.

## Görev Sonunda

6. Yapılan değişiklikleri ilgili dosyalara yansıt:
   - **Genel Değişiklikler:** `AGENT.md` dosyasındaki "Güncelleme Geçmişi"ne ekle.
   - **Veritabanı/UI Değişiklikleri:** `.agent/spec/design.md` dosyasını güncelle.
   - **Tamamlanan/Yeni Görevler:** `.agent/spec/tasks.md` dosyasını güncelle.
   - **Altyapı/Stack Değişiklikleri:** `.agent/wiki/architecture.md` dosyasını güncelle.

7. `AGENT.md` dosyasındaki "Son Güncelleme" tarihini güncelle.

## Dosya Konumları

- **Ana Yapı:** `AGENT.md`
- **Gereksinimler:** `.agent/spec/requirement.md`
- **Tasarım & DB:** `.agent/spec/design.md`
- **Görevler:** `.agent/spec/tasks.md`
- **Mimari:** `.agent/wiki/architecture.md`

## Güncelleme Formatı

`AGENT.md` > Güncelleme Geçmişi:

```markdown
| Tarih | Değişiklik |
|-------|------------|
| YYYY-MM-DD | Yapılan değişikliğin kısa açıklaması |
```
