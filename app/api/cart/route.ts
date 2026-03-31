import { CartItemProps } from '@/app/components/CartItem';
import { Cart } from '@/app/models/Cart';
import { getKey } from '@/app/utility/dbCallUtil';
import { getUserFromCookie } from '@/app/utility/responseUtils';
import mongoose from 'mongoose';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { ProductItem }: CartItemProps = await req.json();
  const cookies = req.cookies;
  const userId = getUserFromCookie(cookies.get('token')?.value || '')?._id;
  const newCartPayload = {
    User: userId,
    ProductItem: [
      {
        Product: new mongoose.Types.ObjectId(ProductItem.Product._id),
        quantity: ProductItem.quantity,
        Price: ProductItem.Price,
        name: ProductItem.name,
        image: ProductItem.image,
        description: ProductItem.description,
      },
    ],
  };
  let cart = await Cart.findOne({
    User: userId,
  });
  if (!cart) {
    cart = new Cart(newCartPayload);
    cart.save();
  } else {
    const dbProductItem = cart.get('ProductItem');
    const Item = dbProductItem.find(
      (item) => item.Product.toString() == ProductItem.Product._id,
    );
    if (Item) {
      Item.Price = ProductItem.Price;
      Item.quantity = ProductItem.quantity;
    } else {
      dbProductItem.push({
        ...ProductItem,
        Product: new mongoose.Types.ObjectId(ProductItem.Product._id),
      });
    }
    cart.ProductItem = cart.ProductItem.filter((ele) => ele.quantity > 0);
    cart.save();
  }
  revalidateTag(getKey(Cart, userId), 'max');
  revalidatePath('/products');
  revalidatePath('/cart');
  return NextResponse.json({ data: cart.toJSON() }, { status: 201 });
};
export const GET = async (req: NextRequest) => {
  const cookies = req.cookies;
  const userId = getUserFromCookie(cookies.get('token')?.value || '')?._id;
  if (!userId) {
    return NextResponse.json(
      {
        errors: {
          error: 'User not Valid',
        },
      },
      { status: 404 },
    );
  }
  let cart = await Cart.findOne({
    User: userId,
  }).populate('ProductItem.Product');
  return NextResponse.json({ data: cart?.toJSON() }, { status: 201 });
};
