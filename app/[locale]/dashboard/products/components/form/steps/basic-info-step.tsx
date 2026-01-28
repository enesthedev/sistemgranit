"use client";

import React from "react";
import {
  FormFileUpload,
  FormInput,
  FormNumberInput,
  FormSelect,
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
import {
  CURRENCIES,
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
} from "@/app/constants";

interface BasicInfoStepProps {
  productId?: string;
}

export const BasicInfoStep = React.memo(function BasicInfoStep({
  productId,
}: BasicInfoStepProps) {
  return (
    <div className="grid gap-6 2xl:grid-cols-2">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>Temel Bilgiler</CardTitle>
          <CardDescription>
            Ürünün temel kimlik bilgilerini girin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormInput
            name="name"
            label="Ürün Adı"
            placeholder="Örn: Afyon Beyaz Mermer"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              name="category"
              label="Kategori"
              options={[...PRODUCT_CATEGORIES]}
              required
            />
            <FormSelect
              name="status"
              label="Durum"
              options={[...PRODUCT_STATUSES]}
            />
          </div>
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Ürün hakkında detaylı bilgi, hikayesi ve özellikleri..."
            rows={5}
          />
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-6">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Fiyatlandırma</CardTitle>
            <CardDescription>
              Birim fiyat ve döviz kuru bilgisi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormNumberInput
                name="price_per_sqm"
                label="m² Fiyatı"
                placeholder="0.00"
                min={0}
                step={0.01}
              />
              <FormSelect
                name="currency"
                label="Para Birimi"
                options={[...CURRENCIES]}
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Medya</CardTitle>
            <CardDescription>
              Ürün görseli ve galeri fotoğrafları.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-5">
            <FormFileUpload
              name="thumbnail"
              label="Kapak Görseli"
              folder="thumbnails"
              resetKey={productId}
            />
            <Separator />
            <FormFileUpload
              name="images"
              label="Galeri Görselleri"
              description="Detay fotoğrafları, uygulama örnekleri vb."
              folder="gallery"
              multiple
              maxFiles={10}
              resetKey={productId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
