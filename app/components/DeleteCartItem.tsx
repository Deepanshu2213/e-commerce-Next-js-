"use client";
import { useTransition } from "react";
import { deleteProductFromCart } from "../actions/cart.action";
import { useRouter } from "next/navigation";

export const DeleteCartItem = ({ productId }: { productId: string }) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const deleteProduct = () => {
    startTransition(async () => {
      await deleteProductFromCart(productId);
      router.refresh();
    });
  };

  return (
    <button
      className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      aria-label="Remove item from cart"
      onClick={deleteProduct}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-slate-500 border-t-red-400 rounded-full animate-spin" />
      ) : (
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
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      )}
    </button>
  );
};