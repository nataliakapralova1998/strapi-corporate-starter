// frontend/src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const buf = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const email = session.customer_email || "unknown@example.com";
  const total = (session.amount_total || 0) / 100;
  const currency = session.currency || "eur";
  const lines = (() => { try { return JSON.parse(session.metadata?.cart || "[]"); } catch { return []; } })();
  const shippingAddress = (session.customer_details?.address as any) || null;

  // POST naar Strapi – laat “unique stripeSessionId” dubbele events negeren
  const res = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${STRAPI_TOKEN}` },
    body: JSON.stringify({
      data: { email, status: "paid", stripeSessionId: session.id, currency, total, lines, shippingAddress },
    }),
  });

  // Als er al een order bestond (unique key), beschouw het als OK
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 400 && text.includes("must be unique")) {
      return NextResponse.json({ received: true });
    }
    return NextResponse.json({ error: "Order create failed", details: text }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
