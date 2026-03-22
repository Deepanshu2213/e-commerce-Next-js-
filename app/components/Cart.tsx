import { sanatizePayload } from '../utility/responseUtils';
import { CartItem, type CartItemsDb } from './CartItem';
import { getCart } from '../actions/cart.action';

export const Cart = async () => {
  const cart = await getCart();
  if (!cart) {
    return (
      <div className="bg-slate-950 rounded-lg border border-slate-800 space-y-4 p-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="animate-pulse">
            <div className="flex gap-4">
              <div className="h-24 w-24 bg-slate-700 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                <div className="h-4 bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-slate-950 rounded-lg border border-slate-800">
      {cart?.ProductItem.filter((item) => item.quantity > 0).map((item) => (
        <CartItem key={item.Product._id} ProductItem={sanatizePayload(item)} />
      ))}
    </div>
  );
};
