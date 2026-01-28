import { getProduct } from "@/actions/products";
import { notFound } from "next/navigation";
import { Form } from "../components/form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const result = await getProduct(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <Form mode="edit" product={result.data} />
    </div>
  );
}
