import CartView from "../views/cart-view";
export const revalidate = 0;

export default function CartPage({ params }: { params: { lang: string } }) {
  return <CartView lang={params.lang} />;
}
