'use client';

import { useState } from "react";
import { isValidResponse } from "../utility/responseUtils";
import { CartItemsDb } from "./CartItem";
import { OrderDetails, ProductItemJson } from "../api/order/place/route";
import { ErrorPopupWrapper } from "./errorPopup";
import { PaymentInfo } from "../interfaces/ErrorRes";
import { useRouter } from "next/navigation";

interface RazorpayInstance {
    open: () => void;
    on: (event: string, callback: (res: any) => void) => void;
}

declare global {
    interface Window {
        Razorpay: new (options: any) => RazorpayInstance;
    }
}
export const OrderBtn = ({ paymentKey, cart }: { paymentKey: string, cart?: CartItemsDb }) => {
    const [error, setError] = useState<Record<string, string[]>>({});
    const router = useRouter();
    const OpenPaymentBox = async () => {
        if (cart && cart.ProductItem.length === 0) {
            alert("Cart is empty");
            return;
        }
        const payload: ProductItemJson[] = cart?.ProductItem.map((item) => { return { Product: item.Product._id, quantity: item.quantity, Price: item.Price, name: item.Product.name, image: item.Product.imageUrl, description: item.Product.description } }) || [];
        const response = await fetch('/api/order/place', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const { data, error } = await isValidResponse<OrderDetails>(response);
        if (Object.keys(error).length > 0) {
            setError(error);
        }
        else {
            opentPaymentPopup(data.PaymentId, data.amount);
        }
    };
    const opentPaymentPopup = (orderId: string, amount: string) => {
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded");
            return;
        }
        const options = {
            key: paymentKey,
            amount: amount,
            currency: "INR",
            name: "Shop Hub",
            order_id: orderId,
            theme: {
                color: "#020617" // Matches bg-slate-950
            },
            handler: function (res: PaymentInfo) {
                placeOrder(res, cart?._id || '');
            },
        };
        const rzp = new window.Razorpay(options) as any;
        rzp.open();

        rzp.on("payment.failed", function (response: any) {
            console.error("Payment Failed:", response.error);
        });
    }
    const placeOrder = async (payload: PaymentInfo, cartId: string) => {
        const response = await fetch('/api/order/confirm', {
            method: 'POST',
            body: JSON.stringify({ ...payload, cart_id: cartId }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        router.refresh();
    }
    return (
        <>
            {Object.keys(error).length > 0 && <ErrorPopupWrapper error={error} />}
            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                onClick={OpenPaymentBox}
            >
                Checkout
            </button>
        </>
    );
};