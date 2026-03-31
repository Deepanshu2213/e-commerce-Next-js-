import { OrderJson } from "../(protected)/orders/page"
import { ProductItem } from "../models/Order"
import { FiBox, FiChevronRight } from "react-icons/fi"

export const OrderCard = ({ order, product }: { order: OrderJson, product: ProductItem }) => {
    const isDelivered = order.status?.toLowerCase() === 'delivered';
    const isCancelled = order.status?.toLowerCase() === 'cancelled';

    return (
        <div className="relative w-full rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10 group">
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen transition-opacity group-hover:opacity-100 opacity-50"></div>

            <div className="p-5 sm:p-6 flex flex-col gap-5 relative z-10">
                {/* Header: Order ID and Status */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Order Number</span>
                        <span className="text-sm text-slate-300 font-mono truncate max-w-[150px] sm:max-w-[200px]">#{order._id}</span>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${isDelivered ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        isCancelled ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isDelivered ? 'bg-emerald-400' : isCancelled ? 'bg-red-400' : 'bg-indigo-400 animate-pulse'
                            }`}></div>
                        {order.status || 'Processing'}
                    </div>
                </div>

                {/* Body: Product Info */}
                <div className="flex items-center gap-5">
                    {/* Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 bg-slate-800 shadow-inner">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl pointer-events-none"></div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 justify-center min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-slate-100 truncate group-hover:text-indigo-400 transition-colors duration-300">
                            {product.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">
                            {product.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-lg sm:text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                ₹{typeof product.Price === 'number' ? product.Price.toLocaleString('en-IN') : product.Price}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer: Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 pt-4 border-t border-white/5">
                    <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold py-2.5 px-2 sm:px-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.98] whitespace-nowrap">
                        <FiBox className="text-sm sm:text-lg" />
                        <span>Track Order</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/5 hover:border-white/10 text-xs sm:text-sm font-semibold py-2.5 px-2 sm:px-4 rounded-xl transition-all duration-300 active:scale-[0.98] whitespace-nowrap">
                        <span>Order Details</span>
                        <FiChevronRight className="text-sm sm:text-lg text-slate-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}