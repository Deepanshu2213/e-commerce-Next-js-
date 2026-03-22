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
        },
      };
      updateCart(payload);
    }, 500),
    [],
  );
  return (
    <div className="flex items-center gap-2 border border-slate-700 rounded-lg px-2 py-1">
      <button
        disabled={isLoading}
        className={`text-slate-400 hover:text-slate-200 font-semibold cursor-pointer w-[1vw] h-[1vh] flex items-center justify-center transition-all duration-200 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Decrease quantity"
        onClick={handleDecrease}
      >
        −
      </button>
      <span className="text-slate-100 font-medium w-[3vh] h-[3vh] text-center flex items-center justify-center">
        {isLoading ? (
          // <span className="animate-spin inline-block w-5 h-5 border-2 border-slate-500 border-t-slate-100 rounded-full"></span>
          <BiLoaderCircle className="text-md" />
        ) : (
          quantity
        )}
      </span>
      <button
        disabled={isLoading}
        className={`text-slate-400 hover:text-slate-200 cursor-pointer font-semibold w-[1vw] h-[1vh] flex items-center justify-center transition-all duration-200 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label="Increase quantity"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};
