"use client";

import React from "react";
import { FormArrayNumber, FormNumberInput } from "@/app/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

export const DimensionsStep = React.memo(function DimensionsStep() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>Boyut ve Lojistik</CardTitle>
        <CardDescription>
          Mevcut plaka boyutları, kalınlıklar ve minimum sipariş.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Plaka Boyutları</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormNumberInput
                name="max_slab_width"
                label="Maks. Genişlik"
                suffix="cm"
                min={0}
              />
              <FormNumberInput
                name="max_slab_length"
                label="Maks. Uzunluk"
                suffix="cm"
                min={0}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Satış Koşulları</h3>
            <FormNumberInput
              name="min_order_quantity"
              label="Min. Sipariş Miktarı"
              suffix="m²"
              min={1}
              step={1}
            />
          </div>
        </div>

        <Separator />

        <FormArrayNumber
          name="available_thicknesses"
          label="Mevcut Kalınlık Seçenekleri (cm)"
          unit="cm"
          description="Stoğunuzda veya üretiminizde bulunan standart kalınlıkları ekleyin."
        />
      </CardContent>
    </Card>
  );
});
