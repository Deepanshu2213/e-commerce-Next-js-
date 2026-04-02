"use client"

import { useRouter } from "next/navigation"
interface DeliveryFiltersProps {
    filters: {
        label: string,
        path: string
    }[],
    currentPath: string
}
export const DeliveryFilters = ({ filters, currentPath }: DeliveryFiltersProps) => {
    const router = useRouter();
    const routeChange = (path: string) => {
        const currPath = '/orders' + path
        router.push(currPath)
    }
    const labelCls = 'text-sm md:text-base text-slate-200 hover:text-indigo-400 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group cursor-pointer py-2 px-3 md:px-4'
    return <div className="flex w-full">
        <div className="flex w-full border-b-1 border-slate-500">
            {filters.map((filter, idx) => {
                return <button key={filter.path} className={labelCls + `${filter.path == currentPath ? ` border-b-2 border-slate-100` : ` `}`} onClick={() => { routeChange(filter.path) }}>{filter.label}</button>
            })}

        </div>
    </div>
} 