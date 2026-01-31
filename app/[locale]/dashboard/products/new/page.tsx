import { getCategories } from "@/actions/categories";
import { Form } from "../components/form";
import { SiteHeader } from "../../components/header/site-header";

export default async function Page() {
  const categoriesData = await getCategories();
  const categories =
    categoriesData?.map((c) => ({
      value: c.id,
      label: c.name,
    })) || [];

  return (
    <>
      <SiteHeader title="Yeni Ürün" />
      <div className="flex flex-1 flex-col">
        <Form mode="create" categories={categories} />
      </div>
    </>
  );
}
