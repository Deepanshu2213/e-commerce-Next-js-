import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from './ProductList';
import { DeleteCartItem } from './DeleteCartItem';

const AddToCartBtn = dynamic(
  () => import('./AddtoCartBtn').then((mod) => ({ default: mod.AddToCartBtn })),
  {
    loading: () => (
      <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2">
        <span className="animate-pulse inline-block w-6 h-6 bg-slate-700 rounded-full" />
        <span className="animate-pulse inline-block w-8 h-5 bg-slate-700 rounded" />
        <span className="animate-pulse inline-block w-6 h-6 bg-slate-700 rounded-full" />
      </div>
    ),
  },
);

export interface ProductItem {
  Product: Product;
  Price: number;
  quantity: number;
  name: string;
  image: string;
  description: string;
}
export interface CartItemProps {
  ProductItem: ProductItem;
}
export interface CartItemsDb {
  ProductItem: ProductItem[];
  _id: string;
  User: string;
}

export const CartItem = ({ ProductItem }: CartItemProps) => {
  const { Product } = ProductItem;
  const total = ProductItem.Price * ProductItem.quantity;

  return (
    <div className="group flex gap-4 p-4 sm:p-5 border-b border-slate-800/80 last:border-0 bg-slate-950 hover:bg-slate-900/50 transition-colors duration-200">
      {/* Product Image */}
      <Link href={`/products/${Product._id}`} className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden ring-1 ring-slate-700/60 group-hover:ring-indigo-500/40 transition-all duration-200">
          <Image
            src={Product.imageUrl}
            alt={Product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
        {/* Top row: name + delete */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/products/${Product._id}`}>
              <h3 className="text-sm sm:text-base font-semibold text-slate-100 line-clamp-2 hover:text-indigo-300 transition-colors duration-150">
                {Product.name}
              </h3>
            </Link>
            <p className="text-xs text-slate-500 mt-0.5">
              <span className="text-indigo-400 font-medium">
                ₹{ProductItem.Price.toFixed(2)}
              </span>{' '}
              per unit
            </p>
          </div>
          <DeleteCartItem productId={Product._id} />
        </div>

        {/* Bottom row: qty stepper + total */}
        <div className="flex items-center justify-between">
          <AddToCartBtn
            ProductItem={ProductItem}
            Product={Product}
            routeRefresh={true}
          />

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">Total</p>
            <p className="text-base sm:text-lg font-bold text-slate-100">
              ₹{total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};