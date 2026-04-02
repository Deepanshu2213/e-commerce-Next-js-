import { getEntityListCriteria } from "@/app/utility/dbCallUtil";
import { Order as OrderModel, OrderInt, OrderInterface } from "@/app/models/Order";
import { OrderJson } from "../page";
import { MainOrderList } from "@/app/components/MainOrderList";
import { sanatizePayload } from "@/app/utility/responseUtils";
import { getUserId } from "@/app/utility/responseUtils";
import { cookies } from "next/headers";
export default async function filteredOrder({ params }: { params: Promise<{ filterId: string }> }) {
    const { filterId } = await params;
    const userId = await getUserId(await cookies());
    const orders = await getEntityListCriteria<OrderInterface, OrderJson>(OrderModel, { 'status': filterId, 'User': userId }, userId)
    const filters = [
        { label: "All", path: "/" },
        { label: "Pending", path: "/pending" },
        { label: "Delivered", path: "/delivered" },
        { label: "Cancelled", path: "/cancelled" },
    ];
    return (
        <MainOrderList orders={sanatizePayload(orders)} filters={filters} defaultPath={'/' + filterId} />
    )
}