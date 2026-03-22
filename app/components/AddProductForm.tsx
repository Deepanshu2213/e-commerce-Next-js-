'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActionError } from '../interfaces/ErrorRes';
import { ProductInt } from '../models/Product';
import { GetErrorElements } from '../utility/responseUtils';
import { FiBox, FiAlignLeft, FiDollarSign, FiImage, FiTag, FiLayers, FiUploadCloud } from 'react-icons/fi';

interface AddProductProps {
  action: (prev: any, formData: FormData) => ActionError;
  product?: Omit<ProductInt, 'User'> & { _id: string };
}
export default function AddProductForm({ action, product }: AddProductProps) {
  const router = useRouter();
  const [state, dispatch, loading] = useActionState(action, { errors: {} });
  const { errors } = state;
  console.log(errors);

  const getButtonText = (): string => {
    if (loading) return 'Processing...';
    if (product) return 'Update Product';
    return 'Add Product';
  };
  const [preview, setPreview] = useState(product?.imageUrl || '');

  return (
    <div className="py-4 sm:py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-10 border border-slate-700/50">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-3">
            {product ? 'Edit Product' : 'Create New Product'}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {product ? 'Update the details of your product below.' : 'Fill in the details to add a new product to your store catalog.'}
          </p>
        </div>

        <form action={dispatch} className="space-y-6">
          {product?._id && (
            <input type="hidden" name="id" value={product._id} />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FiBox className="text-indigo-400" /> Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g., Wireless Noise-Canceling Headphones"
                defaultValue={product?.name}
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                required
              />
              {GetErrorElements('name', errors)}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FiDollarSign className="text-emerald-400" /> Price <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-500 font-medium">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  defaultValue={product?.price}
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                  required
                />
              </div>
              {GetErrorElements('price', errors)}
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FiLayers className="text-amber-400" /> Stock Quantity <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                defaultValue={product?.stock}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder:text-slate-600"
                required
              />
              {GetErrorElements('stock', errors)}
            </div>

            {/* Category */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FiTag className="text-purple-400" /> Category <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  defaultValue={product?.category ?? ""}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-slate-500">Select a category...</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Home">Home</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
              {GetErrorElements('category', errors)}
            </div>

            {/* Description */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FiAlignLeft className="text-pink-400" /> Description <span className="text-red-400">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={product?.description}
                placeholder="Describe the product features, specifications, and details..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all placeholder:text-slate-600 resize-none hover:border-slate-600"
                required
              ></textarea>
              {GetErrorElements('description', errors)}
            </div>

            {/* Image Upload */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FiImage className="text-cyan-400" /> Product Image
              </label>

              <div className="relative group">
                <input
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <div className={`w-full flex-col flex items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${preview ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-slate-700/50 bg-slate-950/50 group-hover:border-indigo-500/50 group-hover:bg-slate-900/50 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]'}`}>
                  {preview ? (
                    <div className="flex flex-col items-center gap-4">
                      {/* Using img over next/image since Blob URL or string can be handled gracefully */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Preview" className="max-h-48 object-contain rounded-lg drop-shadow-lg" />
                      <span className="text-sm text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors bg-cyan-950/50 px-3 py-1.5 rounded-full border border-cyan-800/50">Click or drag to change image</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-slate-400">
                      <div className="p-4 bg-slate-800/80 rounded-full group-hover:bg-indigo-900/40 group-hover:text-indigo-400 transition-all group-hover:scale-110 duration-300 shadow-inner">
                        <FiUploadCloud className="w-8 h-8 text-cyan-400 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
                        <p className="text-xs text-slate-500 mt-2">SVG, PNG, JPG or GIF (max. 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {GetErrorElements('imageUrl', errors)}
            </div>
          </div>

          <hr className="border-slate-800 my-8" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/50 active:scale-[0.98] border border-slate-700 hover:border-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 flex flex-row items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-indigo-500/20 disabled:shadow-none border border-transparent disabled:border-slate-700"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                getButtonText()
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
