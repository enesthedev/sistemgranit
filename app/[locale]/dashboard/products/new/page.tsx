import { Form } from "../components/form";
import { SiteHeader } from "../../components/header/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader title="Yeni Ürün" />
      <div className="flex flex-1 flex-col">
        <Form mode="create" />
      </div>
    </>
  );
}
