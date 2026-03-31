import { Document, Model, Schema, Types, models, model } from 'mongoose';
export interface CartI {
  ProductItem: {
    Product: Types.ObjectId;
    quantity: number;
    Price: number;
    name: string;
    image: string;
    description: string;
  }[];
  User: Types.ObjectId;
}
export interface CartIterface extends Document, CartI { }

export interface CartModel extends Model<CartIterface> { }

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
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
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
  (models.Cart as CartModel) ||
  model<CartIterface, CartModel>('Cart', CartSchema);
