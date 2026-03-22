import { getPaymentDetails } from '../actions/cart.action';

export const CheckOut = async ({ changes }: { changes: number }) => {
  const data = await getPaymentDetails();
  if (!data) {
    return (
      <div className="bg-slate-950 rounded-lg border border-slate-800 p-6 h-fit sticky top-4 animate-pulse">
        <div className="h-6 bg-slate-700 rounded w-32 mb-4"></div>

        <div className="space-y-3 mb-4 pb-4 border-b border-slate-800">
          <div className="flex justify-between">
            <div className="h-4 bg-slate-700 rounded w-20"></div>
            <div className="h-4 bg-slate-700 rounded w-16"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-slate-700 rounded w-16"></div>
            <div className="h-4 bg-slate-700 rounded w-16"></div>
          </div>
        </div>

        <div className="flex justify-between mb-6">
          <div className="h-6 bg-slate-700 rounded w-16"></div>
          <div className="h-8 bg-slate-700 rounded w-24"></div>
        </div>

        <div className="w-full h-12 bg-slate-700 rounded-lg"></div>
      </div>
    );
  }

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
