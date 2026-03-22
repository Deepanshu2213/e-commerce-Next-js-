import { CartItemsDb } from './CartItem';
import { Product } from './Product';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
}
interface ProductProps {
  productList: Product[];
  cart: CartItemsDb | null;
}
const ProductList = ({ productList, cart }: ProductProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3 m-2">
      {productList.map((product) => {
        const cartItemMatch = cart?.ProductItem.find(
          (item) => item.Product._id === product._id,
        );
        return (
          <Product
            key={product._id}
            product={product}
            cartItem={cartItemMatch}
          />
        );
      })}
    </div>
  );
};
export default ProductList;
