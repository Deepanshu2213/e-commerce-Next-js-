import mongoose, { Document, Model, Schema } from 'mongoose';
export interface CartI {
  ProductItem: {
    Product: mongoose.Types.ObjectId;
    quantity: number;
    Price: number;
  }[];
  User: mongoose.Types.ObjectId;
}
export interface CartIterface extends Document, CartI {}

export interface CartModel extends Model<CartIterface> {}

export const CartSchema = new Schema<CartIterface, CartModel>({
  ProductItem: [
    {
      Product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      Price: {
        type: Number,
        required: true,
      },
    },
  ],
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
export const Cart =
  (mongoose.models.Cart as CartModel) ||
  mongoose.model<CartIterface, CartModel>('Cart', CartSchema);
