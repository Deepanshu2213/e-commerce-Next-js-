import { updateProduct } from '@/app/actions/addProduct.action';
import AddProductForm from '@/app/components/AddProductForm';
import { Product as PrI } from '@/app/components/ProductList';
import { connectDB } from '@/app/db/db';
import { Product, ProductInterface } from '@/app/models/Product';
import { getById } from '@/app/utility/dbCallUtil';
import { sanatizePayload } from '@/app/utility/responseUtils';
export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;
  const product = await getById<ProductInterface, PrI>(Product, id);
  if (!product) {
    return <div>Product not found</div>;
  }
  const finalProduct = sanatizePayload(product);
  return (
    <div>
      <AddProductForm product={finalProduct} action={updateProduct} />
    </div>
  );
}
