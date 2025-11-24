"use client";

import { useCart } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getStrapiURL } from "../utils/api-helpers";


/* =========================
   Types (matcht Strapi shape)
   ========================= */
type Media = {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string | null;
  };
};

type Variant = {
  id: number;
  attributes: {
    sku: string;
    size: string;        // bv "sz_120x180"
    colorway?: string | null;
    priceDelta?: number | null;
    stock?: number | null;
  };
};

type ProductRecord = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    basePrice: number;
    description?: string | null; // richtext string
    madeToOrder?: boolean | null;
    leadTimeDays?: number | null;
    images?: { data?: Media[] } | null;
    variants?: { data?: Variant[] } | null;
  };
};

/* =========================
   Helpers
   ========================= */
const SIZE_LABEL: Record<string, string> = {
  sz_60x90: "60×90",
  sz_120x180: "120×180",
  sz_160x230: "160×230",
  sz_200x300: "200×300",
  custom: "Custom",
};

const formatEUR = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);


const num = (v: any) => (typeof v === "number" ? v : Number(v || 0));

/* =========================
   Component
   ========================= */
export default function ProductDetail({
  product,
  lang = "nl",
}: {
  product: ProductRecord;
  lang?: string;
}) {
  const a = product.attributes;

  // -------- Images / gallery --------
  const images = (a.images?.data ?? []) as Media[];
  const [activeImg, setActiveImg] = useState<number>(0);
  const mainImg = images[activeImg]?.attributes;

  // -------- Variants / selectors --------
  const variants = useMemo(
    () =>
      (a.variants?.data ?? []).map((v) => ({
        id: v.id,
        sku: v.attributes.sku,
        size: v.attributes.size,
        colorway: v.attributes.colorway ?? undefined,
        priceDelta: v.attributes.priceDelta ?? 0,
        stock: typeof v.attributes.stock === "number" ? v.attributes.stock : undefined,
      })),
    [a.variants]
  );

  const sizes = useMemo(
    () => Array.from(new Set(variants.map((v) => v.size))),
    [variants]
  );

  const [size, setSize] = useState<string | undefined>(sizes[0]);

  const colorways = useMemo(() => {
    const set = new Set(
      variants.filter((v) => (size ? v.size === size : true)).map((v) => v.colorway || "—")
    );
    return Array.from(set);
  }, [variants, size]);

  const [colorway, setColorway] = useState<string | undefined>(colorways[0]);

  // reset colorway wanneer size verandert
  useEffect(() => {
    setColorway(colorways[0]);
  }, [colorways]);

  const selectedVariant = useMemo(
    () =>
      variants.find(
        (v) =>
          (size ? v.size === size : true) &&
          (colorway ? (v.colorway || "—") === colorway : true)
      ),
    [variants, size, colorway]
  );

  // -------- Prijs --------
  const price = useMemo(() => {
    const base = num(a.basePrice);
    const delta = num(selectedVariant?.priceDelta);
    return base + delta;
  }, [a.basePrice, selectedVariant]);

  // -------- Cart integratie --------
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    // Fallback SKU als er geen varianten zijn
    const skuForCart = selectedVariant?.sku ?? `PROD-${product.id}`;

    const item = {
      sku: skuForCart,
      title: a.title,
      size,
      sizeLabel: size ? (SIZE_LABEL[size] || size) : undefined,
      colorway,
      unitPrice: num(price),
      image: mainImg?.url ? getStrapiURL(mainImg.url) : undefined,
      qty: 1,
    };

    useCart.getState().addItem(item);
    setAdded(true);
    const t = setTimeout(() => setAdded(false), 1800);
    // clean up
    return () => clearTimeout(t);
  };

  const canAdd = Boolean(selectedVariant || !variants.length); // als geen varianten bestaan, mag je ook toevoegen

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href={`/${lang}/shop`} className="hover:underline">
          Shop
        </Link>{" "}
        / <span className="text-gray-800">{a.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <section>
          {/* main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden border bg-white">
            {mainImg?.url ? (
              <Image
                src={getStrapiURL(mainImg.url)}
                alt={mainImg.alternativeText || a.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-gray-400">
                Geen afbeelding
              </div>
            )}
          </div>

          {/* thumbnails */}
          {!!images.length && (
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 gap-3">
              {images.slice(0, 10).map((m, idx) => {
                const img = m.attributes;
                const isActive = idx === activeImg;
                return (
                  <button
                    key={m.id}
                    className={`relative aspect-square rounded-xl overflow-hidden border ${
                      isActive ? "ring-2 ring-black" : ""
                    }`}
                    onClick={() => setActiveImg(idx)}
                    aria-label={`Toon afbeelding ${idx + 1}`}
                  >
                    <Image
                      src={getStrapiURL(img.url)}
                      alt={img.alternativeText || a.title}
                      fill
                      className="object-cover"
                      sizes="10vw"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Info / selectors */}
        <section className="lg:pl-6">
          <h1 className="text-3xl md:text-4xl font-semibold">{a.title}</h1>

          <div className="mt-3 text-2xl">{formatEUR(price)}</div>

          {a.madeToOrder && (
            <p className="mt-1 text-sm text-gray-600">
              Handgemaakt op bestelling — levertijd ~{a.leadTimeDays || 21} dagen.
            </p>
          )}

          {/* Variant selectors */}
          <div className="mt-6 space-y-5">
            {/* Size */}
            {sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Maat</label>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Maat">
                  {sizes.map((s) => {
                    const active = size === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-3 py-2 rounded-xl border text-sm transition ${
                          active ? "border-black" : "border-gray-300 hover:border-gray-400"
                        }`}
                        aria-pressed={active}
                      >
                        {SIZE_LABEL[s] || s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colorway */}
            {colorways.length > 0 && !(colorways.length === 1 && colorways[0] === "—") && (
              <div>
                <label className="block text-sm font-medium mb-2">Kleur</label>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Kleur">
                  {colorways.map((c) => {
                    const active = colorway === c;
                    return (
                      <button
                        key={c}
                        onClick={() => setColorway(c)}
                        className={`px-3 py-2 rounded-xl border text-sm transition ${
                          active ? "border-black" : "border-gray-300 hover:border-gray-400"
                        }`}
                        aria-pressed={active}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Stock / SKU */}
          <div className="mt-4 text-sm text-gray-600">
            {selectedVariant?.sku ? (
              <>
                SKU: <span className="font-mono">{selectedVariant.sku}</span>
              </>
            ) : variants.length ? (
              <span>—</span>
            ) : null}
            {typeof selectedVariant?.stock === "number" && (
              <span>
                {" "}
                • {selectedVariant.stock > 0 ? "Op voorraad" : "Backorder"}
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              disabled={!canAdd}
              onClick={addToCart}
              className="px-5 py-3 rounded-2xl bg-black text-white disabled:opacity-40"
            >
              In winkelmand
            </button>

            <Link
              href={`/${lang}/cart`}
              className="px-5 py-3 rounded-2xl border text-center"
            >
              Bekijk mand
            </Link>
          </div>

          {/* Add feedback */}
          <div
            className={`mt-3 text-sm ${
              added ? "opacity-100" : "opacity-0"
            } transition-opacity`}
            aria-live="polite"
          >
            ✅ Toegevoegd aan je winkelmand.
          </div>

          {/* Description */}
          {a.description && (
            <div className="mt-8 prose max-w-none">
              <p>{a.description}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
