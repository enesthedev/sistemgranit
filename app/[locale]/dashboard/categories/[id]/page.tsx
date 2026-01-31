import { notFound } from "next/navigation";
import { getCategoryById } from "@/actions/categories";
import { SiteHeader } from "@/app/[locale]/dashboard/components/header/site-header";
import { CategoryForm } from "../components/category-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <SiteHeader title="Kategori Düzenle" />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <div className="bg-card flex-1 rounded-lg border p-6 shadow-sm">
          <CategoryForm mode="edit" category={category} />
        </div>
      </div>
    </>
  );
}
