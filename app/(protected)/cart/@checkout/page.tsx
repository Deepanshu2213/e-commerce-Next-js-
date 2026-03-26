import { getPaymentDetails } from '@/app/actions/cart.action';
import { OrderBtn } from '@/app/components/PlaceOrderBtn';
import Script from 'next/script';
const CheckOut = async () => {
  const data = await getPaymentDetails();
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="bg-slate-950 rounded-lg border border-slate-800 p-6 h-fit sticky top-4">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          Order Summary
        </h2>

        <div className="space-y-3 mb-4 pb-4 border-b border-slate-800">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal</span>
            <span className="font-medium text-slate-100">
              ${data?.price.toFixed(2) || 0}
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>{data?.tax.toFixed(2) || 0}</span>
            <span className="font-medium text-slate-100">
              ${data?.tax.toFixed(2) || 0}
            </span>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <span className="text-lg font-bold text-slate-100">Total</span>
          <span className="text-2xl font-bold text-slate-100">
            ${data?.priceAfterTax.toFixed(2) || 0}
          </span>
        </div>

        <OrderBtn paymentKey={process.env.RAZORPAY_KEY_ID || ''} />
      </div>
    </>

  );
};
export default CheckOut;
