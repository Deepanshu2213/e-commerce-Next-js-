import { OrderJson } from "../(protected)/orders/page"
import { OrderCard } from "./OrderCard"

export const OrderList = ({ order }: { order: OrderJson }) => {
    return <div className="flex flex-col gap-4">
        {order.ProductItem.map((product) => (
            <OrderCard key={product.Product as any} order={order} product={product} />
        ))}
    </div>
}