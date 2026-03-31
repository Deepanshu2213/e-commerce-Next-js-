'use client';
import { useCallback, useState } from 'react';
import { debounceFn } from '../utility/dbCallUtil';
import { CartItemProps, ProductItem } from './CartItem';
import { Product } from './ProductList';
import { useUpdateCartMutation } from '../store';
import { useRouter } from 'next/navigation';
import { BiLoaderCircle } from 'react-icons/bi';
type AddToCartBtnProps = {
  ProductItem?: CartItemProps['ProductItem'];
  Product: Product;
  routeRefresh?: boolean;
};

export const AddToCartBtn = ({
  ProductItem,
  Product,
  routeRefresh,
}: AddToCartBtnProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const saveCart = useCallback(
    debounceFn((cartItem: { ProductItem: ProductItem }) => {
      setLoading(true);
      fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log('Cart updated:', data);
        })
        .catch((error) => {
          console.error('Error updating cart:', error);
        })
        .finally(() => {
          if (routeRefresh) {
            router.refresh();
          }
        });
    }, 500),
    [],
  );
  return (
    <Btn
      isLoading={loading}
      Product={Product}
      ProductItem={ProductItem}
      updateCart={saveCart}
    />
  );
};
export const AddtoCartBtnRedux = ({
  ProductItem,
  Product,
}: AddToCartBtnProps) => {
  const [updateCart, { isLoading }] = useUpdateCartMutation();
  return (
    <Btn
      updateCart={updateCart}
      isLoading={isLoading}
      Product={Product}
      ProductItem={ProductItem}
    />
  );
};
export const Btn = ({
  isLoading,
  ProductItem,
  Product,
  updateCart,
}: AddToCartBtnProps & {
  isLoading: boolean;
  updateCart: (cartItem: { ProductItem: ProductItem }) => void;
}) => {
  const [quantity, setQuantity] = useState(ProductItem?.quantity || 0);
  const handleIncrease = () => {
    setQuantity((prev) => {
      saveCart(prev + 1);
      return prev + 1;
    });
  };
  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev == 0) {
        saveCart(0);
        return 0;
      }
      saveCart(prev - 1);
      return prev - 1;
    });
  };
  const saveCart = useCallback(
    debounceFn((prev: number) => {
      const payload = {
        ProductItem: {
          Product,
          quantity: prev,
          Price: Product.price,
          name: Product.name,
          image: Product.imageUrl,
          description: Product.description,
        },
      };
      updateCart(payload);
    }, 500),
    [],
  );
  return (
    <div className="inline-flex items-center gap-1 bg-slate-800/60 border border-slate-700/60 rounded-xl px-1.5 py-1">
      {/* Decrease */}
      <button
        disabled={isLoading || quantity === 0}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 font-bold text-lg leading-none select-none"
        aria-label="Decrease quantity"
        onClick={handleDecrease}
      >
        −
      </button>

      {/* Count / Loader */}
      <span className="w-8 text-center text-sm font-semibold text-slate-100 tabular-nums">
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-slate-600 border-t-indigo-400 rounded-full animate-spin" />
        ) : (
          quantity
        )}
      </span>

      {/* Increase */}
      <button
        disabled={isLoading}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 font-bold text-lg leading-none select-none"
        aria-label="Increase quantity"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};
