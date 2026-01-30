import { getProduct } from "@/actions/products";

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
  const result = await getProduct(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Ürün Düzenle" />
      <div className="flex flex-1 flex-col">
        <Form mode="edit" product={result.data} />
      </div>
    </>
  );
}
