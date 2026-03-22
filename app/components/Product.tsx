'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { type Product as Prod } from './ProductList';
import { FaUserEdit } from 'react-icons/fa';
import { ProductItem } from './CartItem';
import Image from 'next/image';
import "../css/Product.css";
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const AddToCartBtn = dynamic(
  () => import('./AddtoCartBtn').then((mod) => ({ default: mod.AddToCartBtn })),
  {
    loading: () => (
      <div className="flex items-center gap-2 border border-slate-700 rounded-lg px-2 py-1 animate-pulse">
        <span className="inline-block w-8 h-6 bg-slate-700 rounded"></span>
      </div>
    ),
  },
);

export const Product = ({
  product,
  cartItem,
}: {
  product: Prod;
  cartItem?: ProductItem;
}) => {
  const { _id: id } = product;
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow card-hover">
      <div className="relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={200}
          className="w-full h-48 object-fit mb-4 rounded"
        />
        {/* Price Badge */}
        <span className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md border border-indigo-400/30 text-white px-3 py-1.5 font-bold text-sm rounded-full shadow-[0_4px_12px_rgba(79,70,229,0.4)] z-[100] flex items-center gap-1 transition-transform hover:scale-105">
          ${product.price.toFixed(2)}
        </span>
        {/* Category Badge */}
        <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-slate-200 px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-lg shadow-lg z-[100]">
          {product.category || 'Item'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-slate-100 w-full">
          {product.name}
        </h2>
        <div className="flex w-full justify-end items-center gap-2">
          <AddToCartBtn ProductItem={cartItem} Product={product} />
          <Link
            href={`/edit-product/${id}`}
            className="ml-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <FaUserEdit className="text-xl" />
          </Link>
          <Link
            href={`/products/${id}`}
            className="ml-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
          >
            <MdOutlineRemoveRedEye className="text-xl" />
          </Link>
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-400 mt-2">{product.description}</p>
      </div>
    </div>
  );
};
