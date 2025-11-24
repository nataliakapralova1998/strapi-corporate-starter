"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  sku: string;
  title: string;
  size?: string;         // bv "sz_120x180"
  sizeLabel?: string;    // bv "120×180"
  colorway?: string;     // bv "Grey"
  unitPrice: number;     // EUR
  image?: string;        // absolute URL
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  setQty: (sku: string, qty: number) => void;
  clear: () => void;
  count: number;   // totale stuks
  subtotal: number; // som (qty * unitPrice)
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (incoming) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.sku === incoming.sku);
        if (idx > -1) {
          items[idx] = { ...items[idx], qty: items[idx].qty + incoming.qty };
        } else {
          items.push(incoming);
        }
        set({ items });
      },
      removeItem: (sku) => set({ items: get().items.filter((i) => i.sku !== sku) }),
      setQty: (sku, qty) => {
        if (qty < 1) return;
        set({
          items: get().items.map((i) => (i.sku === sku ? { ...i, qty } : i)),
        });
      },
      clear: () => set({ items: [] }),
      get count() {
        return get().items.reduce((n, i) => n + i.qty, 0);
      },
      get subtotal() {
        return get().items.reduce((n, i) => n + i.qty * i.unitPrice, 0);
      },
    }),
    {
      name: "cart-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // berekende velden niet opslaan
    }
  )
);
