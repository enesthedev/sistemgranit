import { getProducts } from "@/actions/products";
import { getCategories } from "@/actions/categories";
import { connection } from "next/server";
import { ProductsDataTable } from "./components/products-data-table";
import { SiteHeader } from "../components/header/site-header";
import type { ProductFilters } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  await connection();
  const params = await searchParams;

  const filters: ProductFilters = {
    search: params.search as string,
    category: params.category,
    status: params.status,
  };

  const [productsResult, categories] = await Promise.all([
    getProducts({
      limit: 100,
      filters,
      page: params.page ? Number(params.page) : 1,
    }),
    getCategories(),
  ]);

  return (
    <>
      <SiteHeader title="Ürünler" />
      <div className="flex flex-col gap-6 p-2 md:p-6">
        {productsResult.success && productsResult.data ? (
          <ProductsDataTable
            products={productsResult.data.products}
            total={productsResult.data.total}
            categories={categories || []}
          />
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              {productsResult.error || "Ürünler yüklenirken bir hata oluştu."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
