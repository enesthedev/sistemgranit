import { getProducts } from "@/actions/products";
import { connection } from "next/server";
import { ProductsDataTable } from "./components/products-data-table";
import { SiteHeader } from "../components/header/site-header";

export default async function ProductsPage() {
  await connection();
  const result = await getProducts({ limit: 100 });

  return (
    <>
      <SiteHeader title="Ürünler" />
      <div className="flex flex-col gap-6 p-2 md:p-6">
        {result.success && result.data ? (
          <ProductsDataTable
            products={result.data.products}
            total={result.data.total}
          />
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              {result.error || "Ürünler yüklenirken bir hata oluştu."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
