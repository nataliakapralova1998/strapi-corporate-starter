import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;

function absoluteUrl(req: NextRequest, path: string) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `${req.headers.get("x-forwarded-proto") || "http"}://${req.headers.get("host")}`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function POST(req: NextRequest) {
  try {
    const { items, email } = (await req.json()) as {
      items: { sku: string; qty: number; title?: string; sizeLabel?: string; colorway?: string; unitPrice?: number; image?: string }[];
      email?: string;
    };

    if (!items?.length) return NextResponse.json({ error: "Cart empty" }, { status: 400 });

    // 👉 Server-side prijsvalidatie (ingekort)
    const validated: typeof items = [];
    for (const it of items) {
      const url = new URL(`${STRAPI_URL}/api/variants`);
      url.searchParams.set("filters[sku][$eq]", it.sku);
      url.searchParams.set("populate[product][fields][0]", "title");
      url.searchParams.set("populate[product][fields][1]", "basePrice");
      const r = await fetch(url.toString(), { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` }, cache: "no-store" });
      const j = await r.json();
      const variant = j.data?.[0]?.attributes;
      if (!variant) return NextResponse.json({ error: `Unknown SKU ${it.sku}` }, { status: 400 });
      const product = j.data[0]?.attributes?.product?.data?.attributes;
      const unit = Number(product?.basePrice || 0) + Number(variant.priceDelta || 0);
      validated.push({ ...it, title: product?.title || it.title, unitPrice: unit });
    }

    const line_items = validated.map((it) => ({
      quantity: it.qty,
      price_data: {
        currency: "eur",
        unit_amount: Math.round((it.unitPrice || 0) * 100),
        product_data: {
          name: `${it.title}${it.sizeLabel ? ` — ${it.sizeLabel}` : ""}${it.colorway ? ` — ${it.colorway}` : ""}`,
          images: it.image?.startsWith("http") ? [it.image] : [],
          metadata: { sku: it.sku },
        },
      },
    }));

    // 👇 Absolute URLs bouwen (hardcoded NL is prima voor nu)
    const success_url = absoluteUrl(req, "/nl/cart/success?session_id={CHECKOUT_SESSION_ID}");
    const cancel_url  = absoluteUrl(req, "/nl/cart");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["ideal", "card"],
      customer_email: email,
      line_items,
      success_url,
      cancel_url,
      shipping_address_collection: { allowed_countries: ["NL", "BE", "DE", "FR", "LU", "GB", "US"] },
      metadata: { cart: JSON.stringify(validated) },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Checkout error" }, { status: 500 });
  }
}
