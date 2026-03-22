import { CartItemsDb } from '@/app/components/CartItem';
import { Cart } from '@/app/models/Cart';
import { getUserFromCookie } from '@/app/utility/responseUtils';
import { NextRequest, NextResponse } from 'next/server';
export interface paymentInfo {
  price: number;
  priceAfterTax: number;
  tax: number;
}
export const GET = async (req: NextRequest) => {
  const cookies = req.cookies;
  const userId = getUserFromCookie(cookies.get('token')?.value || '')?._id;
  const cartDb = await Cart.findOne({ User: userId }).lean<CartItemsDb>();
  const cost =
    cartDb?.ProductItem.reduce((sum, item) => {
      sum += item.Price * item.quantity;
      return sum;
    }, 0) || 0;
  const tax = await getCostTaxBasedLoc();
  const priceAfterTax = calculateTotalAfterTax(tax, cost);
  return NextResponse.json({ price: cost, priceAfterTax, tax } as paymentInfo, {
    status: 200,
  });
};
const getCostTaxBasedLoc = async (): Promise<number> => {
  return 8;
};

const calculateTotalAfterTax = (tax: number, cost: number): number => {
  const taxedAmount = (tax * cost) / 100;
  return cost + taxedAmount;
};
