"use client";

import React from "react";
import { FormInput, FormMultiSelect, FormSelect } from "@/app/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { PRODUCT_FINISHES, PRODUCT_PATTERNS } from "@/app/constants";

export const PhysicalPropertiesStep = React.memo(
  function PhysicalPropertiesStep() {
    return (
      <div className="grid gap-6 2xl:grid-cols-2">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Menşei ve Renk</CardTitle>
            <CardDescription>
              Ürünün çıkarıldığı bölge ve görsel özellikleri.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="origin_country"
                label="Ülke"
                placeholder="Türkiye"
              />
              <FormInput
                name="origin_region"
                label="Bölge / Ocak"
                placeholder="Afyon"
              />
            </div>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="color_primary"
                label="Ana Renk"
                placeholder="Beyaz"
              />
              <FormInput
                name="color_secondary"
                label="İkincil Renk"
                placeholder="Gri"
              />
            </div>
            <FormSelect
              name="pattern"
              label="Desen Yapısı"
              options={[...PRODUCT_PATTERNS]}
              placeholder="Desen seçin..."
              nullable
            />
          </CardContent>
        </Card>

        <Separator />

        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Yüzey İşlemleri</CardTitle>
            <CardDescription>Uygulanabilir yüzey bitişleri.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormMultiSelect
              name="finish_types"
              label="Yüzey Tipleri"
              options={PRODUCT_FINISHES}
              placeholder="Yüzey tipi seçin..."
            />
            <div className="bg-muted/50 text-muted-foreground rounded-lg p-4 text-sm">
              <p>
                İpucu: Birden fazla yüzey işlemi seçebilirsiniz. Bu,
                müşterilerin filtreleme yaparken ürünü bulmasını kolaylaştırır.
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator />
      </div>
    );
  },
);
