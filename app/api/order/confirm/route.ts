import { PaymentInfoSchema } from "@/app/lib/validators/order";
import { Cart } from "@/app/models/Cart";
import { Order } from "@/app/models/Order";
import { getKey } from "@/app/utility/dbCallUtil";
import { RazorPayUtil } from "@/app/utility/razorpay";
import { getUserFromCookie } from "@/app/utility/responseUtils";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const userId = getUserFromCookie(req.cookies.get('token')?.value || '')?._id;
    if (!userId) {
        return NextResponse.json(
            { errors: { error: 'User not authenticated' } },
            { status: 401 },
        );
    }

    const body = await req.json();
    const parsed = PaymentInfoSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { errors: parsed.error.flatten().fieldErrors },
            { status: 400 },
        );
    }

    const { razorpay_payment_id } = parsed.data;
    try {
        const razorpay = RazorPayUtil.getRazorpay();
        const payment = await razorpay.payments.fetch(razorpay_payment_id);

        const razorpay_order_id = (payment as any).order_id as string;
        if (!razorpay_order_id) {
            return NextResponse.json(
                { errors: { error: 'No order_id found in payment details' } },
                { status: 400 },
            );
        }
        const [order, cart] = await Promise.all([
            Order.findOne({ payment_id: razorpay_order_id, User: userId }),
            Cart.findOne({ User: userId, _id: parsed.data.cart_id }),
        ] as const);
        if (!order) {
            return NextResponse.json(
                { errors: { error: 'Order not found for this payment' } },
                { status: 404 },
            );
        }
        if (!cart) {
            return NextResponse.json(
                { errors: { error: 'Cart not found for this payment' } },
                { status: 404 },
            );
        }

        order.status = 'success';
        cart.ProductItem = [];
        await Promise.all([order.save(), cart.save()]);
        revalidatePath('/cart');
        revalidatePath('/orders', 'layout');
        revalidateTag(getKey(Cart, userId), 'max');
        revalidateTag(getKey(Order, userId), 'max');
        return NextResponse.json({ success: true, order });
    } catch (err: any) {
        return NextResponse.json(
            { errors: { error: err?.error?.description || 'Failed to confirm order' } },
            { status: 500 },
        );
    }
};
