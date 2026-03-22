import { ReactNode } from 'react';

interface CartPageProps {
  cart: ReactNode;
  checkout: ReactNode;
}
export default async function CartPage({ cart, checkout }: CartPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col justify-between mb-8">
        {/* <h1 className="text-3xl font-bold text-slate-300 my-2 mx-1 py-2">
          Shopping Cart
        </h1> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          <div className="lg:col-span-2">{cart}</div>
          <div className="lg:col-span-1">{checkout}</div>
        </div>
      </div>
    </div>
  );
}
