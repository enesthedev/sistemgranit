import { CategoryFormValues } from "./types";

export const STEPS = [
  {
    id: "basic",
    title: "Temel Bilgiler",
    description: "Kategori adı, slug ve açıklama",
  },
  {
    id: "seo",
    title: "SEO Ayarları",
    description: "Arama motoru optimizasyonu",
  },
];

export const initialValues: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  seo_title: "",
  seo_description: "",
};
