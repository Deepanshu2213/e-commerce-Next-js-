import { Product, ProductInterface, ProductInt } from "@/app/models/Product";
import { getById } from "@/app/utility/dbCallUtil";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaBoxOpen, FaTags, FaUserEdit, FaCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

type ProductModel = {
    _id: string
} & ProductInt;

export default async function ProductInfo({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getById<ProductInterface, ProductModel>(Product, id);

    if (!product) {
        return (
            <div className="min-h-[80vh] bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-200">
                <MdErrorOutline className="text-7xl text-rose-500 mb-6 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Product Not Found</h1>
                <p className="text-slate-400 mb-8 max-w-md text-center text-lg">The product you are looking for does not exist or has been removed.</p>
                <Link href="/products" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.6)] flex items-center gap-2 transform hover:-translate-y-0.5">
                    <FaArrowLeft /> Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <Link 
                    href="/products" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors mb-10 font-medium group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                    Back to Catalog
                </Link>

                {/* Main Product Card */}
                <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] overflow-hidden shadow-2xl relative">
                    {/* Decorative Top Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 z-20"></div>
                    
                    <div className="flex flex-col md:flex-row min-h-[500px]">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 relative bg-slate-950/40 p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-700/50">
                            {/* Decorative background blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            
                            {product.imageUrl ? (
                                <Image 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="w-full max-w-[350px] aspect-square object-contain rounded-2xl relative z-10 drop-shadow-2xl transition-transform hover:scale-105 duration-500"
                                    priority
                                />
                            ) : (
                                <div className="w-full max-w-[350px] aspect-square bg-slate-800/50 rounded-2xl relative z-10 shadow-lg flex items-center justify-center text-slate-500 border border-slate-700/50">
                                    <FaBoxOpen className="text-8xl opacity-50" />
                                </div>
                            )}
                            
                            {/* Floating Category Badge */}
                            <div className="absolute top-6 left-6 z-20">
                                <span className="bg-indigo-600/90 backdrop-blur-md border border-indigo-400/30 text-white px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_4px_15px_rgba(79,70,229,0.5)] flex items-center gap-2">
                                    <FaTags className="text-sm opacity-80" />
                                    {product.category || 'Uncategorized'}
                                </span>
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative">
                            <div className="relative z-10">
                                <div className="mb-6">
                                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight leading-tight mb-4">
                                        {product.name}
                                    </h1>
                                </div>

                                {/* Price and Stock */}
                                <div className="flex flex-wrap items-center gap-6 mb-10">
                                    <span className="text-4xl font-black text-white drop-shadow-md">
                                        ${product.price ? product.price.toFixed(2) : '0.00'}
                                    </span>
                                    <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-inner border tracking-wide uppercase ${
                                        product.stock > 0 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10' 
                                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-rose-500/10'
                                    }`}>
                                        <FaCheckCircle className={product.stock > 0 ? 'text-emerald-400' : 'text-rose-400'} />
                                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                    </div>
                                </div>

                                {/* Description Box */}
                                <div className="space-y-6 mb-12 flex-grow">
                                    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/60 shadow-inner">
                                        <h3 className="text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-6 h-0.5 bg-indigo-500 rounded-full"></span>
                                            About Product
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                                            {product.description || "No description available for this product."}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <Link 
                                        href={`/edit-product/${product._id}`}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 border border-slate-600 hover:border-slate-400 shadow-lg hover:shadow-xl group"
                                    >
                                        <FaUserEdit className="text-xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                                        Edit Product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}