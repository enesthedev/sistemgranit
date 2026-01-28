"use client";

import React from "react";
import {
  FormCheckbox,
  FormInput,
  FormMultiSelect,
  FormTagInput,
  FormTextarea,
} from "@/app/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { PRODUCT_APPLICATIONS } from "@/app/constants";

export const SeoStep = React.memo(function SeoStep() {
  return (
    <div className="grid gap-6">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Kullanım Senaryoları</CardTitle>
          <CardDescription>
            Bu ürün hangi alanlar için uygundur?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormMultiSelect
            name="applications"
            label="Uygulama Alanları"
            options={PRODUCT_APPLICATIONS}
            placeholder="Uygulama alanı seçin..."
          />
          <div className="space-y-3 rounded-lg border p-4">
            <FormCheckbox
              name="is_suitable_for_exterior"
              label="Dış Mekan Kullanımı"
              description="Cephe kaplaması, peyzaj vb."
            />
            <Separator />
            <FormCheckbox
              name="is_suitable_for_kitchen"
              label="Mutfak Uygulaması"
              description="Mutfak tezgahı asit/leke direnci."
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Arama Motoru Optimizasyonu (SEO)</CardTitle>
          <CardDescription>
            Google&apos;da görünürlüğü artırmak için meta bilgileri.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormInput
            name="seo_title"
            label="SEO Başlığı (Title)"
            placeholder="Örn: Afyon Beyazı - Premium Mermer Plaka"
            description="Tarayıcı sekmesinde ve Google'da görünür. (Max 60)"
          />
          <FormTextarea
            name="seo_description"
            label="SEO Açıklaması (Description)"
            placeholder="Ürün içeriğini özetleyen kısa bir açıklama..."
            rows={3}
            description="Arama sonuçlarında başlığın altında görünür. (Max 160)"
          />
          <FormTagInput
            name="tags"
            label="Anahtar Kelimeler (Tags)"
            placeholder="mermer, beyaz, afyon, plaka..."
            description="Site içi arama ve filtreleme için."
          />
        </CardContent>
      </Card>
    </div>
  );
});
