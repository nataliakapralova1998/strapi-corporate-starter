"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/store/cart";

export default function SuccessPage({ params }: { params: { lang: string } }) {
  const { clear } = useCart();
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");
  const didClear = useRef(false);

  useEffect(() => {
    if (!didClear.current) {
      clear();
      didClear.current = true;
    }
  }, [clear]);

  return (
    <main className="max-w-xl mx-auto px-6 md:px-10 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-3">Bedankt voor je bestelling! 🎉</h1>
      <p className="text-gray-600">Je betaling is gelukt. Je ontvangt zo een bevestiging per e-mail.</p>
      {sessionId && <p className="mt-2 text-xs text-gray-500 break-all">Transactie-id: {sessionId}</p>}
      <div className="mt-8 flex justify-center gap-3">
        <Link href={`/${params.lang}/shop`} className="px-5 py-3 rounded-2xl bg-black text-white">Verder winkelen</Link>
        <Link href={`/${params.lang}/cart`} className="px-5 py-3 rounded-2xl border">Bekijk winkelmand</Link>
      </div>
    </main>
  );
}
