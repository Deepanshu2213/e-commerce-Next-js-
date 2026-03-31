import { Document, Model, Schema, Types, models, model } from "mongoose";
export interface ProductItem {
    Product: Types.ObjectId;
    quantity: number;
    Price: number;
    name: string;
    image: string;
    description: string;
};
export interface OrderInt {
    _id: Types.ObjectId;
    payment_id: string;
    amount: number;
    status: 'success' | 'failure' | 'cancelled' | 'pending';
    ProductItem: ProductItem[]
    User: Types.ObjectId;
}
export interface OrderInterface extends OrderInt, Document {

}

export interface OrderModelInterface extends Model<OrderInterface> {

}


export const OrderSchema = new Schema<OrderInterface, OrderModelInterface>({
    payment_id: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['success', 'failure', 'cancelled', 'pending'], required: true },
    ProductItem: [{
        Product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        Price: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
    }],
    User: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export const Order = (models.Order as OrderModelInterface) || model<OrderInterface, OrderModelInterface>('Order', OrderSchema);