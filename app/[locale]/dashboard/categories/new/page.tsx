import { SiteHeader } from "@/app/[locale]/dashboard/components/header/site-header";
import { CategoryForm } from "../components/category-form";

export default function NewCategoryPage() {
  return (
    <>
      <SiteHeader title="Yeni Kategori" />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <div className="bg-card flex-1 rounded-lg border p-6 shadow-sm">
          <CategoryForm mode="create" />
        </div>
      </div>
    </>
  );
}
