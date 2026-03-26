import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Product } from './ProductList';
import { DeleteCartItem } from './DeleteCartItem';

const AddToCartBtn = dynamic(
  () => import('./AddtoCartBtn').then((mod) => ({ default: mod.AddToCartBtn })),
  {
    loading: () => (
      <div className="flex items-center gap-2 border border-slate-700 rounded-lg px-2 py-1">
        <span className="animate-pulse inline-block w-8 h-6 bg-slate-700 rounded"></span>
      </div>
    ),
  },
);
export interface ProductItem {
  Product: Product;
  Price: number;
  quantity: number;
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
    <>
      {/* --- MOBILE DESIGN --- */}
      <div className="flex sm:hidden flex-col gap-3 py-4 px-4 border-b border-slate-800 bg-slate-950 hover:bg-slate-900 transition-colors relative">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-20 h-20">
            <Image
              src={Product.imageUrl}
              alt={Product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <h3 className="text-sm font-semibold text-slate-100 mb-1 line-clamp-2">
              {Product.name}
            </h3>
            <p className="text-sm font-medium text-blue-400">
              ${ProductItem.Price.toFixed(2)}
            </p>
          </div>
          <div className="absolute top-4 right-4">
            <DeleteCartItem productId={Product._id} />
          </div>
        </div>
        <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl mt-1 border border-slate-800/60">
          <AddToCartBtn
            ProductItem={ProductItem}
            Product={Product}
            routeRefresh={true}
          />
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-0.5">Total</p>
            <p className="text-base font-bold text-slate-100">${total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* --- DESKTOP DESIGN --- */}
      <div className="hidden sm:flex items-center gap-4 py-4 px-4 border-b border-slate-800 bg-slate-950 hover:bg-slate-900 transition-colors">
        <div className="flex-shrink-0 w-24 h-24">
          <Image
            src={Product.imageUrl}
            alt={Product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-100 mb-1 truncate">
            {Product.name}
          </h3>
          <p className="text-sm text-slate-400">
            ${ProductItem.Price.toFixed(2)}
          </p>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <AddToCartBtn
            ProductItem={ProductItem}
            Product={Product}
            routeRefresh={true}
          />
        </div>

        <div className="text-right min-w-fit flex-1">
          <p className="text-xs text-slate-400 mb-0.5 min-w-0 break-words">Total</p>
          <p className="text-lg font-bold text-slate-100 min-w-0 break-words">${total.toFixed(2)}</p>
        </div>

        <DeleteCartItem productId={Product._id} />
      </div>
    </>
  );
};