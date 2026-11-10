// frontend/src/app/[lang]/shop/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchAPI } from "../../utils/fetch-api";
import ProductDetail from "../../views/product-detail";


type PageProps = { params: { lang: string; slug: string } };

export const revalidate = 0; // tijdens dev

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;

  const res = await fetchAPI("/products", {
    filters: { slug: { $eq: slug } },
    populate: {
      images: { fields: ["url", "alternativeText"] },
      variants: { fields: ["sku", "size", "colorway", "priceDelta", "stock"] },
    },
    fields: ["title", "slug", "basePrice", "madeToOrder", "leadTimeDays", "description"],
    pagination: { pageSize: 1 },
  });

  const item = res?.data?.[0];
  if (!item) return notFound();

  // Strapi data is prima door te geven; client component cast 'm.
  return <ProductDetail product={item} lang={params.lang} />;
}
