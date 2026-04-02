import { OrderJson } from "../(protected)/orders/page"
import { DeliveryFilters } from "./DeliveyFilter"
import { OrderList } from "./OrderList"

export const MainOrderList = async ({ orders, filters, defaultPath }: { orders: OrderJson[] | null, filters: { label: string, path: string }[], defaultPath?: string }) => {
    return (
        <div className="flex flex-col p-6 md:px-16 py-6 items-center">
            <div className="max-w-4xl w-full bg-slate-950/80 p-4 md:p-10 rounded-xl shadow-lg ">
                <h1 className="text-2xl md:text-3xl font-bold">Your Orders</h1>
                <p className="text-sm md:text-base text-slate-400">Track, manage, and review your recent purchases in one place.</p>
                <div className="my-6 md:my-8"><DeliveryFilters filters={filters} currentPath={defaultPath || '/'} /></div>
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
        </div>
    )
}