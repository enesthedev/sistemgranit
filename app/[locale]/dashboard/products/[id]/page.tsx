import { getProduct } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { Form } from "../components/form";
import { SiteHeader } from "../../components/header/site-header";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await connection();
  const { id } = await params;

  const [productResult, categoriesData] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  if (!productResult.success || !productResult.data) {
    notFound();
  }

  const categories =
    categoriesData?.map((c) => ({
      value: c.id,
      label: c.name,
    })) || [];

  return (
    <>
      <SiteHeader title="Ürün Düzenle" />
      <div className="flex flex-1 flex-col">
        <Form
          key={id}
          mode="edit"
          product={productResult.data}
          categories={categories}
        />
      </div>
    </>
  );
}
