import { ProductForm } from "../components/product-form";

export default function NewProductPage() {
  return (
    <div className="flex flex-1 flex-col">
      <ProductForm mode="create" />
    </div>
  );
}
