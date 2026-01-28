import { getProducts } from "@/actions/products";
import { connection } from "next/server";
import { ProductsDataTable } from "./components/products-data-table";

export default async function ProductsPage() {
  await connection();
  const result = await getProducts({ limit: 100 });

  return (
    <div className="flex flex-col gap-6 p-2 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Ürünler</h1>
        <p className="text-muted-foreground text-sm">
          Mermer ve granit ürünlerinizi yönetin
        </p>
      </div>

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
  );
}
