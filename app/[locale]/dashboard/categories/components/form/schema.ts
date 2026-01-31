import * as Yup from "yup";

export const categoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Kategori adı zorunludur")
    .min(2, "En az 2 karakter"),
  slug: Yup.string()
    .required("URL (Slug) zorunludur")
    .matches(
      /^[a-z0-9-]+$/,
      "Sadece küçük harf, rakam ve tire (-) kullanılabilir",
    ),
  description: Yup.string(),
  image_url: Yup.string().nullable(),
  seo_title: Yup.string().max(70, "SEO başlığı 70 karakterden fazla olamaz"),
  seo_description: Yup.string().max(
    160,
    "SEO açıklaması 160 karakterden fazla olamaz",
  ),
});
