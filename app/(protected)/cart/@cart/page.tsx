import { getCart } from '@/app/actions/cart.action';
import { CartItem } from '@/app/components/CartItem';
import { sanatizePayload } from '@/app/utility/responseUtils';

const Cart = async () => {
  const cart = await getCart();
  return (
    <div className="bg-slate-950 rounded-lg border border-slate-800">
      {cart?.ProductItem.filter((item) => item.quantity > 0).map((item) => (
        <CartItem key={item.Product._id} ProductItem={sanatizePayload(item)} />
      ))}
    </div>
  );
};
export default Cart;
