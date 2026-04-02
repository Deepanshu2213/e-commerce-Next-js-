import { ProductItemsSchema } from "@/app/lib/validators/Product";
import { Order, ProductItem } from "@/app/models/Order";
import { Product, ProductInterface } from "@/app/models/Product";
import { RazorPayUtil } from "@/app/utility/razorpay";
import { getUserFromCookie } from "@/app/utility/responseUtils";
import { NextRequest, NextResponse } from "next/server";
import { calculateTotalAfterTax, getCostTaxBasedLoc } from "../../paymentDetails/route";
import { revalidatePath, revalidateTag } from "next/cache";
import { getKey } from "@/app/utility/dbCallUtil";
export interface OrderDetails {
    success: boolean,
    orderId: string,
    PaymentId: string, // razorpay order ID
    amount: string,
    currency: string,
    receipt: string,
}
export type ProductItemJson = Omit<ProductItem, 'Product'> & { Product: string }
export const POST = async (req: NextRequest) => {
    const userId = getUserFromCookie(req.cookies.get('token')?.value || '')?._id;
    if (!userId) {
        return NextResponse.json(
            {
                errors: {
                    error: 'User not Valid',
                },
            },
            { status: 404 },
        )
    }
    const products = await req.json() as ProductItemJson[]
    const parsedProduct = ProductItemsSchema.safeParse(products);
    if (!parsedProduct.success) {
        return NextResponse.json({
            errors: parsedProduct.error.flatten().fieldErrors
        }, { status: 400 })
    }
    const priceMap = await GetPriceProductMap(parsedProduct.data.map(p => p.Product));
    const { currentPrice, producePrice } = PriceMatching(parsedProduct.data, priceMap);
    if (currentPrice != producePrice) return NextResponse.json(
        {
            errors: {
                error: 'Price not matching refresh cart once',
            },
        },
        { status: 404 },
    )
    const errors: string[] = [];
    parsedProduct.data.forEach((item) => {
        if (priceMap.has(item.Product)) {
            const product = priceMap.get(item.Product);
            if (product && product.stock < item.quantity) {
                errors.push(`${product.name} is out of stock`);
            }
        }
        else {
            errors.push(`${item.Product} Product not found`);
        }
    })
    if (errors.length > 0) {
        return NextResponse.json(
            {
                errors: {
                    error: errors,
                },
            },
            { status: 404 },
        )
    }
    const tax = await getCostTaxBasedLoc();
    const priceAfterTax = calculateTotalAfterTax(tax, currentPrice);
    const order = new Order({
        User: userId,
        ProductItem: parsedProduct.data,
        amount: priceAfterTax,
        status: 'pending',
        payment_id: 'NA',
    })
    const razorpay = RazorPayUtil.getRazorpay();
    const options = {
        amount: Math.round(priceAfterTax * 100),
        currency: 'INR',
        receipt: order._id.toString(),
    }
    const razorOrder = await razorpay.orders.create(options);
    order.payment_id = razorOrder.id;
    await order.save();
    revalidatePath('/cart');
    revalidatePath('/orders', 'layout');
    revalidateTag(getKey(Order, userId), 'max');
    return NextResponse.json({
        success: true,
        orderId: order._id,
        PaymentId: razorOrder.id, // razorpay order ID
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        receipt: razorOrder.receipt,
    })
}
const PriceMatching = (parsedProduct: ProductItemJson[], priceMap: Map<string, ProductInterface>) => {
    let currentPrice = 0, producePrice = 0;
    parsedProduct.forEach((ProductItem) => {
        if (priceMap.has(ProductItem.Product)) {
            producePrice += ((priceMap.get(ProductItem.Product)?.price || 0) * ProductItem.quantity);
        }
        currentPrice += ProductItem.Price * ProductItem.quantity;
    })
    return { currentPrice, producePrice }
}
const GetPriceProductMap = async (id: string[]): Promise<Map<string, ProductInterface>> => {
    const products = await Product.find({ _id: { $in: id } });
    const priceMap = products.reduce((map, product) => {
        map.set(product._id.toString(), product);
        return map;
    }, new Map<string, ProductInterface>())
    return priceMap;
}