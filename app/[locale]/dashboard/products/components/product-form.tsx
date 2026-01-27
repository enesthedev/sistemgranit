"use client";

import { createProduct, updateProduct } from "@/actions/products";
import {
  FormArrayNumber,
  FormCheckbox,
  FormImageUpload,
  FormInput,
  FormMultiSelect,
  FormNumberInput,
  FormSelect,
  FormSwitch,
  FormTagInput,
  FormTextarea,
} from "@/app/components/form";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { ROUTES } from "@/app/routes";
import type { Product } from "@/types/product";
import {
  CURRENCIES,
  PRODUCT_APPLICATIONS,
  PRODUCT_CATEGORIES,
  PRODUCT_FINISHES,
  PRODUCT_PATTERNS,
  PRODUCT_STATUSES,
} from "@/app/constants";
import { cn } from "@/app/utils";
import {
  IconArrowLeft,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconCube,
  IconRuler,
  IconListDetails,
  IconSeo,
  IconPhoto,
} from "@tabler/icons-react";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

interface FormValues {
  name: string;
  description: string;
  category: string;
  status: string;
  price_per_sqm: number | null;
  currency: string;
  thumbnail: string;
  images: string[];
  origin_country: string;
  origin_region: string;
  color_primary: string;
  color_secondary: string;
  pattern: string;
  finish_types: string[];
  density: number | null;
  water_absorption: number | null;
  compressive_strength: number | null;
  flexural_strength: number | null;
  abrasion_resistance: string;
  hardness_mohs: number | null;
  frost_resistant: boolean;
  available_thicknesses: number[];
  max_slab_width: number | null;
  max_slab_length: number | null;
  min_order_quantity: number | null;
  applications: string[];
  is_suitable_for_exterior: boolean;
  is_suitable_for_kitchen: boolean;
  seo_title: string;
  seo_description: string;
  tags: string[];
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ürün adı en az 2 karakter olmalı")
    .max(255, "Ürün adı en fazla 255 karakter olabilir")
    .required("Ürün adı zorunlu"),
  description: Yup.string().max(
    5000,
    "Açıklama en fazla 5000 karakter olabilir",
  ),
  category: Yup.string().required("Kategori seçimi zorunlu"),
  status: Yup.string().required("Durum seçimi zorunlu"),
  price_per_sqm: Yup.number().min(0, "Fiyat 0'dan küçük olamaz").nullable(),
  currency: Yup.string().required("Para birimi zorunlu"),
  hardness_mohs: Yup.number().min(1).max(10).nullable(),
  water_absorption: Yup.number().min(0).max(100).nullable(),
  min_order_quantity: Yup.number().min(1).nullable(),
});

const initialValues: FormValues = {
  name: "",
  description: "",
  category: "marble",
  status: "draft",
  price_per_sqm: null,
  currency: "TRY",
  thumbnail: "",
  images: [],
  origin_country: "",
  origin_region: "",
  color_primary: "",
  color_secondary: "",
  pattern: "",
  finish_types: [],
  density: null,
  water_absorption: null,
  compressive_strength: null,
  flexural_strength: null,
  abrasion_resistance: "",
  hardness_mohs: null,
  frost_resistant: false,
  available_thicknesses: [],
  max_slab_width: null,
  max_slab_length: null,
  min_order_quantity: 1,
  applications: [],
  is_suitable_for_exterior: false,
  is_suitable_for_kitchen: false,
  seo_title: "",
  seo_description: "",
  tags: [],
};

const STEPS = [
  {
    id: "basic",
    label: "Temel Bilgiler",
    description: "Ürün adı, açıklama ve fiyat",
    icon: IconListDetails,
  },
  {
    id: "physical",
    label: "Fiziksel Özellikler",
    description: "Renk, desen ve köken",
    icon: IconPhoto,
  },
  {
    id: "technical",
    label: "Teknik Detaylar",
    description: "Dayanıklılık ve sertlik",
    icon: IconCube,
  },
  {
    id: "dimensions",
    label: "Boyut & Stok",
    description: "Plaka ölçüleri ve kalınlık",
    icon: IconRuler,
  },
  {
    id: "seo",
    label: "SEO & Uygulama",
    description: "Arama motoru ve kullanım",
    icon: IconSeo,
  },
];

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const isEditing = mode === "edit" && product;
  const [currentStep, setCurrentStep] = useState(0);

  const formInitialValues: FormValues = isEditing
    ? {
        name: product.name,
        description: product.description || "",
        category: product.category,
        status: product.status,
        price_per_sqm: product.price_per_sqm,
        currency: product.currency || "TRY",
        thumbnail: product.thumbnail || "",
        images: product.images || [],
        origin_country: product.origin_country || "",
        origin_region: product.origin_region || "",
        color_primary: product.color_primary || "",
        color_secondary: product.color_secondary || "",
        pattern: product.pattern || "",
        finish_types: product.finish_types || [],
        density: product.density,
        water_absorption: product.water_absorption,
        compressive_strength: product.compressive_strength,
        flexural_strength: product.flexural_strength,
        abrasion_resistance: product.abrasion_resistance || "",
        hardness_mohs: product.hardness_mohs,
        frost_resistant: product.frost_resistant || false,
        available_thicknesses: product.available_thicknesses || [],
        max_slab_width: product.max_slab_width,
        max_slab_length: product.max_slab_length,
        min_order_quantity: product.min_order_quantity || 1,
        applications: product.applications || [],
        is_suitable_for_exterior: product.is_suitable_for_exterior || false,
        is_suitable_for_kitchen: product.is_suitable_for_kitchen || false,
        seo_title: product.seo_title || "",
        seo_description: product.seo_description || "",
        tags: product.tags || [],
      }
    : initialValues;

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      const submitData = {
        name: values.name,
        description: values.description || null,
        category: values.category,
        status: values.status,
        price_per_sqm: values.price_per_sqm,
        currency: values.currency,
        thumbnail: values.thumbnail || null,
        images: values.images,
        origin_country: values.origin_country || null,
        origin_region: values.origin_region || null,
        color_primary: values.color_primary || null,
        color_secondary: values.color_secondary || null,
        pattern: values.pattern || null,
        finish_types: values.finish_types,
        density: values.density,
        water_absorption: values.water_absorption,
        compressive_strength: values.compressive_strength,
        flexural_strength: values.flexural_strength,
        abrasion_resistance: values.abrasion_resistance || null,
        hardness_mohs: values.hardness_mohs,
        frost_resistant: values.frost_resistant,
        available_thicknesses: values.available_thicknesses,
        max_slab_width: values.max_slab_width,
        max_slab_length: values.max_slab_length,
        min_order_quantity: values.min_order_quantity || 1,
        applications: values.applications,
        is_suitable_for_exterior: values.is_suitable_for_exterior,
        is_suitable_for_kitchen: values.is_suitable_for_kitchen,
        seo_title: values.seo_title || null,
        seo_description: values.seo_description || null,
        tags: values.tags,
      };

      if (isEditing) {
        const result = await updateProduct({ id: product.id, ...submitData });
        if (!result.success) {
          toast.error(result.error || "Ürün güncellenemedi");
          return;
        }
        toast.success("Ürün başarıyla güncellendi");
      } else {
        const result = await createProduct(submitData);
        if (!result.success) {
          toast.error(result.error || "Ürün oluşturulamadı");
          return;
        }
        toast.success("Ürün başarıyla oluşturuldu");
      }
      router.push(ROUTES.PRODUCTS.LIST);
      router.refresh();
    } catch {
      toast.error("Bir hata oluştu");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, submitForm, values }) => {
        const handleNext = async () => {
          if (currentStep === STEPS.length - 1) {
            await submitForm();
          } else {
            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        };

        const handleBack = () => {
          setCurrentStep((prev) => Math.max(prev - 1, 0));
          window.scrollTo({ top: 0, behavior: "smooth" });
        };

        return (
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => router.back()}
                >
                  <IconArrowLeft className="size-5" />
                </Button>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight">
                    {values.name || (isEditing ? "Ürünü Düzenle" : "Yeni Ürün")}
                  </h1>
                  <p className="text-muted-foreground hidden text-xs md:block">
                    {STEPS[currentStep].label} • Adım {currentStep + 1} /{" "}
                    {STEPS.length}
                  </p>
                </div>
                {isEditing && (
                  <Badge variant="outline" className="ml-2">
                    {values.status === "active" ? "Yayında" : "Taslak"}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  disabled={currentStep === 0 || isSubmitting}
                  className="hidden md:flex"
                >
                  <IconChevronLeft className="mr-2 size-4" />
                  Geri
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={cn(
                    "min-w-32",
                    isSubmitting && "cursor-not-allowed opacity-80",
                  )}
                >
                  {currentStep === STEPS.length - 1 ? (
                    <>
                      <IconCircleCheck className="mr-2 size-4" />
                      {isSubmitting ? "Kaydediliyor..." : "Kaydet ve Bitir"}
                    </>
                  ) : (
                    <>
                      İlerle
                      <IconChevronRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Form className="flex flex-1 flex-col overflow-y-auto">
              <div className="grid flex-1 grid-cols-1 xl:grid-cols-12">
                <aside className="hidden h-full border-r xl:col-span-3 xl:block">
                  <nav className="sticky top-0 space-y-0">
                    {STEPS.map((step, index) => {
                      const isActive = index === currentStep;
                      const isCompleted = index < currentStep;
                      const Icon = step.icon;

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => {
                            setCurrentStep(index);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={cn(
                            "group hover:bg-muted flex w-full items-center justify-start gap-3 rounded-none border-b px-4 py-5 text-left text-sm font-medium transition-colors",
                            isActive && "bg-muted text-primary",
                            !isActive && "text-muted-foreground",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                              isActive && "bg-background text-primary",
                              isCompleted &&
                                "bg-primary text-primary-foreground",
                              !isActive && !isCompleted && "bg-background",
                            )}
                          >
                            {isCompleted ? (
                              <IconCheck className="size-4" />
                            ) : (
                              <Icon className="size-4" />
                            )}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span
                              className={cn(
                                "text-sm font-semibold",
                                isActive && "text-foreground",
                              )}
                            >
                              {step.label}
                            </span>
                            <span className="text-muted-foreground text-xs font-normal">
                              {step.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </aside>

                <main className="xl:col-span-9">
                  <div className="mb-6 xl:hidden">
                    <div className="scrollbar-none flex items-center justify-between gap-2 overflow-x-auto pb-2">
                      {STEPS.map((step, index) => {
                        const isActive = index === currentStep;
                        return (
                          <div
                            key={step.id}
                            className={cn(
                              "flex h-2 w-full min-w-16 rounded-full transition-colors",
                              isActive
                                ? "bg-primary"
                                : index < currentStep
                                  ? "bg-primary/50"
                                  : "bg-muted",
                            )}
                          />
                        );
                      })}
                    </div>
                    <p className="text-foreground mt-2 text-sm font-medium">
                      {STEPS[currentStep].label}
                    </p>
                  </div>

                  <div className="min-h-[500px] space-y-6">
                    <div
                      className={cn(
                        "animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500 will-change-transform",
                        currentStep !== 0 && "hidden",
                      )}
                    >
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
                              <FormImageUpload
                                name="thumbnail"
                                label="Kapak Görseli"
                                folder="thumbnails"
                              />
                              <Separator />
                              <FormImageUpload
                                name="images"
                                label="Galeri Görselleri"
                                description="Detay fotoğrafları, uygulama örnekleri vb."
                                folder="gallery"
                                multiple
                                maxFiles={10}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "animate-in fade-in slide-in-from-bottom-4 grid gap-6 duration-500 2xl:grid-cols-2",
                        currentStep !== 1 && "hidden",
                      )}
                    >
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
                          <CardDescription>
                            Uygulanabilir yüzey bitişleri.
                          </CardDescription>
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
                              İpucu: Birden fazla yüzey işlemi seçebilirsiniz.
                              Bu, müşterilerin filtreleme yaparken ürünü
                              bulmasını kolaylaştırır.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Separator />
                    </div>

                    <div
                      className={cn(
                        "animate-in fade-in slide-in-from-bottom-4 duration-500",
                        currentStep !== 2 && "hidden",
                      )}
                    >
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
                    </div>

                    <div
                      className={cn(
                        "animate-in fade-in slide-in-from-bottom-4 duration-500",
                        currentStep !== 3 && "hidden",
                      )}
                    >
                      <Card className="border-none shadow-md">
                        <CardHeader>
                          <CardTitle>Boyut ve Lojistik</CardTitle>
                          <CardDescription>
                            Mevcut plaka boyutları, kalınlıklar ve minimum
                            sipariş.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-4">
                              <h3 className="text-sm font-medium">
                                Plaka Boyutları
                              </h3>
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
                              <h3 className="text-sm font-medium">
                                Satış Koşulları
                              </h3>
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
                    </div>

                    <div
                      className={cn(
                        "animate-in fade-in slide-in-from-bottom-4 grid gap-6 duration-500 md:grid-cols-2",
                        currentStep !== 4 && "hidden",
                      )}
                    >
                      <Card className="border-none shadow-md">
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

                      <Card className="border-none shadow-md">
                        <CardHeader>
                          <CardTitle>
                            Arama Motoru Optimizasyonu (SEO)
                          </CardTitle>
                          <CardDescription>
                            Google&apos;da görünürlüğü artırmak için meta
                            bilgileri.
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
                  </div>
                </main>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
