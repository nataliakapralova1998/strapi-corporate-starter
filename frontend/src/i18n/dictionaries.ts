export type Messages = {
    cart: {
      title: string;
      empty: string;
      continueShopping: string;
      subtotal: string;
      taxAndShippingNote: string;
      clearCart: string;
      remove: string;
      size: string;
      color: string;
    };
    checkout: {
      emailPlaceholder: string;
      goToCheckout: string;
    };
  };
  
  const nl: Messages = {
    cart: {
      title: "Winkelmand",
      empty: "Je winkelmand is leeg.",
      continueShopping: "Verder winkelen",
      subtotal: "Subtotaal",
      taxAndShippingNote: "BTW en verzending berekenen we in de checkout.",
      clearCart: "Mand legen",
      remove: "Verwijderen",
      size: "Maat",
      color: "Kleur",
    },
    checkout: {
      emailPlaceholder: "E-mailadres (voor bevestiging)",
      goToCheckout: "Ga naar afrekenen",
    },
  };
  
  const en: Messages = {
    cart: {
      title: "Cart",
      empty: "Your cart is empty.",
      continueShopping: "Continue shopping",
      subtotal: "Subtotal",
      taxAndShippingNote: "Taxes and shipping are calculated at checkout.",
      clearCart: "Clear cart",
      remove: "Remove",
      size: "Size",
      color: "Color",
    },
    checkout: {
      emailPlaceholder: "Email address (for confirmation)",
      goToCheckout: "Proceed to checkout",
    },
  };
  
  // Voeg hier later extra talen toe (de, fr, …)
  const dictionaries: Record<string, Messages> = { nl, en };
  
  export function getDict(lang?: string): Messages {
    return dictionaries[lang ?? "nl"] ?? nl;
  }
  