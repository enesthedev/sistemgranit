"use client";

import React from "react";
import { useFormikContext } from "formik";
import { FormFileUpload, FormInput, FormTextarea } from "@/app/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { slugify } from "@/app/utils/slug";
import { CategoryFormValues } from "../types";

interface BasicInfoStepProps {
  mode: "create" | "edit";
  categoryId?: string;
}

export function BasicInfoStep({ mode, categoryId }: BasicInfoStepProps) {
  const { setFieldValue, touched } = useFormikContext<CategoryFormValues>();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mode === "create" && !touched.slug) {
      setFieldValue("slug", slugify(e.target.value));
    }
  };

  return (
    <div className="grid gap-6">
      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>Temel Bilgiler</CardTitle>
          <CardDescription>
            Kategorinin genel bilgilerini ve görsellerini yönetin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput
              name="name"
              label="Kategori Adı"
              placeholder="Örn: Mermer"
              required
              onChange={handleNameChange}
            />
            <FormInput
              name="slug"
              label="URL Bağlantısı (Slug)"
              placeholder="Örn: mermer"
              required
              description="Web sitesinde görünecek URL parçası."
            />
          </div>
          <FormTextarea
            name="description"
            label="Açıklama"
            placeholder="Kategori hakkında detaylı bilgi..."
            rows={4}
          />
        </CardContent>
      </Card>

      <Card className="border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>Medya</CardTitle>
          <CardDescription>Kategori kapak görselini yükleyin.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormFileUpload
            name="image_url"
            label="Kategori Görseli"
            folder="categories"
            resetKey={categoryId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
