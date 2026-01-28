export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-3xl font-bold">Ürün Detayı</h1>
      <p className="mt-4 text-gray-600">Slug: {slug}</p>
      <p className="mt-2 text-sm text-gray-500">
        Bu sayfa yapım aşamasındadır.
      </p>
    </div>
  );
}
