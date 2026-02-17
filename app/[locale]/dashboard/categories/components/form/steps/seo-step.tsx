"use client";

import React from "react";
import { FormInput, FormTextarea } from "@/app/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export function SeoStep() {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>SEO Ayarları</CardTitle>
        <CardDescription>
          Arama motoru optimizasyonu için başlık ve açıklama girin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormInput
          name="seo_title"
          label="SEO Başlığı"
          placeholder="Arama motorlarında görünecek başlık"
          description="Opsiyonel. Boş bırakılırsa kategori adı kullanılır."
        />
        <FormTextarea
          name="seo_description"
          label="SEO Açıklaması"
          placeholder="Arama motorlarında görünecek açıklama"
          rows={3}
          description="Opsiyonel. Boş bırakılırsa kategori açıklaması kullanılır."
        />
      </CardContent>
    </Card>
  );
}
