import { getCart } from '@/app/actions/cart.action';
import { CartItem } from '@/app/components/CartItem';
import { sanatizePayload } from '@/app/utility/responseUtils';
import Link from 'next/link';

const Cart = async () => {
  const cart = await getCart();
  const items = cart?.ProductItem.filter((item) => item.quantity > 0) ?? [];

  if (items.length === 0) {
    return (
      <div className="bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center py-20 px-6 text-center gap-6">
        {/* Animated bag icon */}
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-slate-900 border border-slate-700/60 shadow-inner">
          <svg
            className="w-14 h-14 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {/* Subtle glow ring */}
          <span className="absolute inset-0 rounded-full ring-1 ring-indigo-500/20 animate-ping opacity-30 pointer-events-none" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-200">Your cart is empty</h2>
          <p className="text-sm text-slate-500 max-w-xs">
            Looks like you haven&apos;t added anything yet. Browse our products and find something you love!
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          Shop Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 rounded-lg border border-slate-800">
      {items.map((item) => (
        <CartItem key={item.Product._id} ProductItem={sanatizePayload(item)} />
      ))}
    </div>
  );
};
export default Cart;
