import { connectDB } from '@/app/db/db';
import {
  Product as ProductModel,
  ProductInterface,
} from '@/app/models/Product';
import ProductList, { Product } from '@/app/components/ProductList';
import { Cart } from '@/app/models/Cart';
import { getUserId, sanatizePayload } from '@/app/utility/responseUtils';
import { CartItemsDb } from '@/app/components/CartItem';
import { getCart, getEntityList } from '@/app/utility/dbCallUtil';
import { cookies } from 'next/headers';

export default async function Page() {
  try {
    await connectDB();
  } catch (e) {
    // ignore DB connection errors here — we'll fallback to sample products
  }

  let products: Product[] = [];
  let cart = null as CartItemsDb | null;
  try {
    const UserId = await getUserId(await cookies());
    const [productRes, cartRes] = await Promise.allSettled([
      getEntityList<ProductInterface, Product>(ProductModel),
      getCart(UserId || '-1', Cart),
    ]);
    cart =
      cartRes.status === 'fulfilled'
        ? (cartRes.value as CartItemsDb | null)
        : null;
    products = productRes.status === 'fulfilled' ? productRes.value || [] : [];
  } catch (e) {
    products = [];
  }

  return (
    <div>
      <ProductList
        productList={sanatizePayload(products)}
        cart={sanatizePayload(cart)}
      />
    </div>
  );
}
