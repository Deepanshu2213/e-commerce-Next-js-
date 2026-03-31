import { DeliveryFilters } from "@/app/components/DeliveyFilter";
import { getEntityList } from "@/app/utility/dbCallUtil";
import { Order as OrderModel, OrderInt, OrderInterface } from "@/app/models/Order";
import { ReplaceAddTimestamp } from "@/app/interfaces/ErrorRes";
import { OrderList } from "@/app/components/OrderList";
export type OrderJson = ReplaceAddTimestamp<OrderInt, 'User' | '_id'>;
export default async function Order() {
    const orders = await getEntityList<OrderInterface, OrderJson>(OrderModel)
    const filters = [
        { label: "All", path: "all" },
        { label: "Pending", path: "pending" },
        { label: "Delivered", path: "delivered" },
        { label: "Cancelled", path: "cancelled" },
    ];
    return (<div className="flex flex-col p-6 md:px-16 py-6 items-center">
        <div className="max-w-4xl w-full bg-slate-950/80 p-4 md:p-10 rounded-xl shadow-lg ">
            <h1 className="text-2xl md:text-3xl font-bold">Your Orders</h1>
            <p className="text-sm md:text-base text-slate-400">Track, manage, and review your recent purchases in one place.</p>
            <div className="my-6 md:my-8"><DeliveryFilters filters={filters} defaultIdx={0} /></div>
            {
                orders && orders.length > 0 ? (
                    <div className="flex flex-col gap-4 max-h-[100vh] overflow-y-auto">
                        {orders.map((order) => (
                            <OrderList key={order._id} order={order} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-400">No orders found</p>
                )
            }
        </div>
    </div>)

}