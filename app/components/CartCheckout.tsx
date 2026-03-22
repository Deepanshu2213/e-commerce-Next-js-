import { Cart } from './Cart';
import { CheckOut } from './Checkout';

export const CartCheckout = () => {
  const handleChange = () => {};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <div className="lg:col-span-2">
        <Cart />
      </div>
      <div className="lg:col-span-1">
        <CheckOut changes={0} />
      </div>
    </div>
  );
};

export const CartCheckoutPage = () => {
  return <CartCheckout />;
};
