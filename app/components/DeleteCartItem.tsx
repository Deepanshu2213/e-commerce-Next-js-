"use client"
import { useTransition } from "react";
import { MdDelete } from "react-icons/md";
import { deleteProductFromCart } from "../actions/cart.action";
import { useRouter } from "next/navigation";

export const DeleteCartItem = ({ productId }: { productId: string }) => {
    const [isLoading, startTransition] = useTransition();
    const router = useRouter();
    const deleteProduct = () => {
        startTransition(async () => {
            await deleteProductFromCart(productId);
            router.refresh();
        })
    }
    return <button
        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Remove item"
        onClick={deleteProduct}
    >
        <MdDelete size={20} />
    </button>
}