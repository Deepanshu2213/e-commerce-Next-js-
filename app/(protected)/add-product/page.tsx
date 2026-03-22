import { addProduct } from '@/app/actions/addProduct.action';
import AddProductForm from '@/app/components/AddProductForm';

export default function AddProductPage() {
  return <AddProductForm action={addProduct} />;
}
