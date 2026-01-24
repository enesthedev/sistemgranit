import { getProduct } from "@/actions/products";
import { notFound } from "next/navigation";
import { ProductForm } from "../components/product-form";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const result = await getProduct(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <ProductForm mode="edit" product={result.data} />
    </div>
  );
}
