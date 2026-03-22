'use server';
import { cookies } from 'next/headers';
import { getUserFromCookie, sanatizePayload } from '../utility/responseUtils';
import { Cart, CartIterface } from '../models/Cart';
import { CartItemsDb } from '../components/CartItem';
import { paymentInfo } from '../api/paymentDetails/route';
import { getCart as gtCart } from '../utility/dbCallUtil';

export const getCart = async () => {
  const cook = await cookies();
  const token = cook.get('token')?.value;
  const UserId = getUserFromCookie(token || '')?._id;
  if (!UserId) {
    return null;
  }
  let cart = await gtCart<CartIterface, CartItemsDb>(UserId, Cart);
  return sanatizePayload(cart);
};

export const getPaymentDetails = async (): Promise<paymentInfo | null> => {
  const cook = await cookies();
  const token = cook.get('token')?.value;
  const UserId = getUserFromCookie(token || '')?._id;
  if (!UserId) {
    return null;
  }
  let cartDb = await gtCart<CartIterface, CartItemsDb>(UserId, Cart);
  const cost =
    cartDb?.ProductItem.reduce((sum, item) => {
      sum += item.Price * item.quantity;
      return sum;
    }, 0) || 0;
  const tax = await getCostTaxBasedLoc();
  const priceAfterTax = calculateTotalAfterTax(tax, cost);
  return { price: cost, priceAfterTax, tax } as paymentInfo;
};
const getCostTaxBasedLoc = async (): Promise<number> => {
  return 8;
};

const calculateTotalAfterTax = (tax: number, cost: number): number => {
  const taxedAmount = (tax * cost) / 100;
  return cost + taxedAmount;
};
