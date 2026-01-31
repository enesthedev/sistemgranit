import { Suspense } from "react";
import { getCategories } from "@/actions/categories";
import { SiteHeader } from "@/app/[locale]/dashboard/components/header/site-header";
import { CategoriesTable } from "./components/categories-table";
import { CategoriesSkeleton } from "./components/categories-skeleton";

export default function CategoriesPage() {
  return (
    <>
      <SiteHeader title="Kategoriler" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesList />
        </Suspense>
      </div>
    </>
  );
}

async function CategoriesList() {
  const categories = await getCategories();

  return <CategoriesTable data={categories || []} />;
}
