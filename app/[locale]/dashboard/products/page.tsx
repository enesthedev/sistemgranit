import { getProducts } from "@/actions/products";
import { Button } from "@/app/components/ui/button";
import { ROUTES } from "@/app/routes";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { connection } from "next/server";
import { ProductsTable } from "./components/products-table";

export default async function ProductsPage() {
  await connection();
  const result = await getProducts({ limit: 20 });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Ürünler</h1>
          <p className="text-muted-foreground text-sm">
            Mermer ve granit ürünlerinizi yönetin
          </p>
        </div>
        <Button asChild>
          <Link href={ROUTES.PRODUCTS.NEW}>
            <IconPlus className="mr-2 size-4" />
            Yeni Ürün
          </Link>
        </Button>
      </div>

      {result.success && result.data ? (
        <ProductsTable
          products={result.data.products}
          total={result.data.total}
          page={result.data.page}
          totalPages={result.data.totalPages}
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
