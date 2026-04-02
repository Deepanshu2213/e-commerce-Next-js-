import { getEntityListCriteria } from "@/app/utility/dbCallUtil";
import { Order as OrderModel, OrderInt, OrderInterface } from "@/app/models/Order";
import { ReplaceAddTimestamp } from "@/app/interfaces/ErrorRes";
import { MainOrderList } from "@/app/components/MainOrderList";
import { getUserId, sanatizePayload } from "@/app/utility/responseUtils";
import { cookies } from "next/headers";
import { connectDB } from "@/app/db/db";
export type OrderJson = ReplaceAddTimestamp<OrderInt, 'User' | '_id'>;
export default async function Order() {
    await connectDB();
    const userId = await getUserId(await cookies());
    const orders = await getEntityListCriteria<OrderInterface, OrderJson>(OrderModel, { 'User': userId }, userId)
    const filters = [
        { label: "All", path: "/" },
        { label: "Pending", path: "/pending" },
        { label: "Delivered", path: "/delivered" },
        { label: "Cancelled", path: "/cancelled" },
    ];
    return (<MainOrderList orders={sanatizePayload(orders)} filters={filters} />)

}