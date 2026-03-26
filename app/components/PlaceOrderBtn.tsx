'use client';
interface RazorpayInstance {
    open: () => void;
    on: (event: string, callback: (res: any) => void) => void;
}

declare global {
    interface Window {
        Razorpay: new (options: any) => RazorpayInstance;
    }
}
export const OrderBtn = ({ paymentKey }: { paymentKey: string }) => {
    const OpenPaymentBox = () => {
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded");
            return;
        }

        const options = {
            key: paymentKey, // ✅ test key
            amount: 50000, // ₹500 (in paise)
            currency: "INR",
            name: "Test Company",
            description: "Test Payment",
            theme: {
                color: "#020617" // Matches bg-slate-950
            },
            handler: function (res: any) {
                console.log("Payment Success:", res);
            },
        };
        const rzp = new window.Razorpay(options) as any;
        rzp.open();

        rzp.on("payment.failed", function (response: any) {
            console.error("Payment Failed:", response.error);
        });
    };

    return (
        <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            onClick={OpenPaymentBox}
        >
            Checkout
        </button>
    );
};