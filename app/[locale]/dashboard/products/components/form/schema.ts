import * as Yup from "yup";

export const validationSchema = Yup.object({
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
