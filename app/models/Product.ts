import { Document, Model, Schema, Types, models, model } from 'mongoose';

export interface ProductInt {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  User: Types.ObjectId;
}
export interface ProductInterface extends Document, ProductInt { }

export interface ProductModel extends Model<ProductInterface> { }

const productSchema = new Schema<ProductInterface, ProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  User: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Product =
  (models.Product as ProductModel) ||
  model<ProductInterface, ProductModel>('Product', productSchema);
