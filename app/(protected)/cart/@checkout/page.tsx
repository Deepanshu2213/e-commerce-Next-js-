import { getPaymentDetails } from '@/app/actions/cart.action';
const CheckOut = async () => {
  const data = await getPaymentDetails();
  return (
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

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
        Checkout
      </button>
    </div>
  );
};
export default CheckOut;
