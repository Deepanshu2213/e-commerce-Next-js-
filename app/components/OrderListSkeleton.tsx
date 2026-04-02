export const OrderListSkeleton = () => {
    return (
        <div className="flex flex-col p-6 md:px-16 py-6 items-center">
            <div className="max-w-4xl w-full bg-slate-950/80 p-4 md:p-10 rounded-xl shadow-lg animate-pulse">

                {/* Heading */}
                <div className="h-8 w-40 bg-slate-800 rounded-md mb-3" />
                <div className="h-4 w-72 bg-slate-800/70 rounded mb-8" />

                {/* Filter tabs skeleton */}
                <div className="flex gap-3 my-6 md:my-8 flex-wrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-9 w-24 bg-slate-800 rounded-full" />
                    ))}
                </div>

                {/* Order card skeletons */}
                <div className="flex flex-col gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3"
                        >
                            {/* Order id + status row */}
                            <div className="flex justify-between items-center">
                                <div className="h-4 w-32 bg-slate-800 rounded" />
                                <div className="h-6 w-20 bg-slate-800 rounded-full" />
                            </div>

                            {/* Product row */}
                            <div className="flex gap-3 items-center">
                                <div className="h-14 w-14 bg-slate-800 rounded-lg flex-shrink-0" />
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="h-4 w-3/4 bg-slate-800 rounded" />
                                    <div className="h-3 w-1/2 bg-slate-800/70 rounded" />
                                </div>
                            </div>

                            {/* Footer row */}
                            <div className="flex justify-between items-center pt-1">
                                <div className="h-3 w-24 bg-slate-800/70 rounded" />
                                <div className="h-5 w-16 bg-slate-800 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
