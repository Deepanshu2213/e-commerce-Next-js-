import z from 'zod';

export const PaymentInfoSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Payment ID is required'),
  razorpay_signature: z.string().min(1, 'Signature is required'),
  cart_id: z.string().min(1, 'Cart ID is required').optional(),
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;
