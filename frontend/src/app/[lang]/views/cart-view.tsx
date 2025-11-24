"use client";

import { getDict } from "@/i18n/dictionaries";
import { useCart } from "@/store/cart";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";


function formatEUR(n: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
}

export default function CartView({ lang = "nl" }: { lang?: string }) {
  const t = getDict(lang); // ← kies de juiste taal

  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const clear = useCart((s) => s.clear);

  const subtotal = useMemo(() => items.reduce((n, i) => n + i.qty * i.unitPrice, 0), [items]);

  async function goCheckout() {
    try {
      const emailInput =
        (document.getElementById("email-checkout") as HTMLInputElement | null)?.value || undefined;
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email: emailInput }),
      });
      const json = await res.json();
      if (json.url) window.location.href = json.url;
      else alert(json.error || "Kon geen checkout starten.");
    } catch (e) {
      alert("Checkout fout.");
    }
  }

  if (!items.length) {
    return (
      <main className="max-w-4xl mx-auto px-6 md:px-10 py-16 text-center">
        <h1 className="text-3xl font-semibold mb-4">{t.cart.title}</h1>
        <p className="text-gray-600 mb-6">{t.cart.empty}</p>
        <Link href={`/${lang}/shop`} className="inline-block px-5 py-3 rounded-2xl bg-black text-white">
          {t.cart.continueShopping}
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 md:px-10 py-10">
      <h1 className="text-3xl font-semibold mb-6">{t.cart.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div key={it.sku} className="flex gap-4 border rounded-2xl p-4 items-center">
              {it.image ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border">
                  <Image src={it.image} alt={it.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-xl bg-gray-100" />
              )}

              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-600">
                  {it.sizeLabel ? `${t.cart.size}: ${it.sizeLabel}` : null}
                  {it.colorway ? ` • ${t.cart.color}: ${it.colorway}` : null}
                  <span className="block mt-1">{formatEUR(it.unitPrice)}</span>
                </div>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-xl border" onClick={() => setQty(it.sku, Math.max(1, it.qty - 1))}>
                  −
                </button>
                <input
                  className="w-12 text-center border rounded-lg py-1"
                  type="number"
                  min={1}
                  value={it.qty}
                  onChange={(e) => {
                    const v = parseInt(e.target.value || "1", 10);
                    setQty(it.sku, Math.max(1, v));
                  }}
                />
                <button className="px-3 py-1 rounded-xl border" onClick={() => setQty(it.sku, it.qty + 1)}>
                  +
                </button>
              </div>

              {/* Remove */}
              <button className="ml-4 text-sm text-red-600 hover:underline" onClick={() => removeItem(it.sku)}>
                {t.cart.remove}
              </button>
            </div>
          ))}

          <button className="text-sm text-gray-600 hover:underline" onClick={clear}>
            {t.cart.clearCart}
          </button>
        </div>

        {/* Summary */}
        <aside className="border rounded-2xl p-5 h-fit">
          <h2 className="text-lg font-semibold mb-4">Overzicht</h2>
          <div className="flex justify-between text-sm mb-2">
            <span>{t.cart.subtotal}</span>
            <span>{formatEUR(subtotal)}</span>
          </div>
          <div className="text-xs text-gray-600 mb-4">{t.cart.taxAndShippingNote}</div>

          {/* E-mail veld + Checkout */}
          <input
            id="email-checkout"
            type="email"
            placeholder={t.checkout.emailPlaceholder}  // ← vertaald
            className="w-full mb-3 px-3 py-2 border rounded-2xl"
          />

          <button className="w-full px-5 py-3 rounded-2xl bg-black text-white" onClick={goCheckout}>
            {t.checkout.goToCheckout}
          </button>

          <Link href={`/${lang}/shop`} className="block text-center text-sm mt-3 text-gray-700 hover:underline">
            {t.cart.continueShopping}
          </Link>
        </aside>
      </div>
    </main>
  );
}
