"use server"
import { cookies } from "next/headers";
import { ProductItem } from "../models/Order";
import { getUserId } from "../utility/responseUtils";

export const placeOrder = async (products: ProductItem[]) => {
    const userId = await getUserId(await cookies());

}