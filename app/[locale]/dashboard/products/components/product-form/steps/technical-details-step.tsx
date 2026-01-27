"use client";

import React from "react";
import { FormInput, FormNumberInput, FormSwitch } from "@/app/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export const TechnicalDetailsStep = React.memo(function TechnicalDetailsStep() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Teknik Özellikler</CardTitle>
        <CardDescription>
          Laboratuvar test sonuçları ve teknik veriler.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FormNumberInput
            name="density"
            label="Yoğunluk"
            suffix="kg/m³"
            min={0}
          />
          <FormNumberInput
            name="water_absorption"
            label="Su Emme Oranı"
            suffix="%"
            min={0}
            max={100}
            step={0.01}
          />
          <FormNumberInput
            name="hardness_mohs"
            label="Sertlik (Mohs)"
            min={1}
            max={10}
            step={0.1}
          />
          <FormNumberInput
            name="compressive_strength"
            label="Basınç Dayanımı"
            suffix="MPa"
            min={0}
          />
          <FormNumberInput
            name="flexural_strength"
            label="Eğilme Dayanımı"
            suffix="MPa"
            min={0}
          />
          <FormInput
            name="abrasion_resistance"
            label="Aşınma Direnci"
            placeholder="Yüksek"
          />
        </div>
        <div className="bg-card mt-8 flex items-center gap-4 rounded-lg border p-4">
          <FormSwitch
            name="frost_resistant"
            label="Dona Dayanıklılık"
            description="Bu ürün dış mekan don koşullarında kullanılabilir."
          />
        </div>
      </CardContent>
    </Card>
  );
});
