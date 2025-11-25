// app/shop/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchAPI } from "../utils/fetch-api";
import { getStrapiURL } from "../utils/api-helpers";


export default async function ShopPage() {
  
  const res = await fetchAPI("/products", {
    populate: {
      images: { fields: ["url", "alternativeText"] },
    },
    sort: ["createdAt:desc"],
    pagination: { page: 1, pageSize: Number(process.env.NEXT_PUBLIC_PAGE_LIMIT || 12) },
    fields: ["title", "slug", "basePrice"],
  });

  const products = res?.data ?? [];

  return (
    <main className="min-h-screen py-20 px-6 md:px-10">
      <h1 className="text-4xl font-bold mb-10 text-center">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((p: any) => {
          const { title, slug, basePrice, images } = p.attributes;
          const img = images?.data?.[0]?.attributes;
          const imageUrl = img?.url ? `${getStrapiURL(img.url)}` : undefined;

          return (
            <Link
              href={`/shop/${slug}`}
              key={p.id}
              className="group border rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
            >
              {imageUrl && (
                <div className="aspect-square relative">
                  <Image
                    src={imageUrl}
                    alt={img?.alternativeText || title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-gray-600">€ {basePrice}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
