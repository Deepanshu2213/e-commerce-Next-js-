import { Carousel } from '@/app/components/Carousel';
import { connectDB } from '@/app/db/db';
import { Product as ProductModel, ProductInterface } from '@/app/models/Product';
import ProductList, { Product } from '@/app/components/ProductList';
import { Cart } from '@/app/models/Cart';
import { getUserId, sanatizePayload } from '@/app/utility/responseUtils';
import { CartItemsDb } from '@/app/components/CartItem';
import { getCart, getEntityList } from '@/app/utility/dbCallUtil';
import { cookies } from 'next/headers';
import Link from 'next/link';

// Categories data defined locally for the UI
const categories = [
  { name: 'Electronics', icon: '💻', gradient: 'from-blue-500/20 to-cyan-500/20', hover: 'group-hover:from-blue-500/40 group-hover:to-cyan-500/40' },
  { name: 'Clothing', icon: '👕', gradient: 'from-purple-500/20 to-pink-500/20', hover: 'group-hover:from-purple-500/40 group-hover:to-pink-500/40' },
  { name: 'Sports', icon: '⚽', gradient: 'from-emerald-500/20 to-teal-500/20', hover: 'group-hover:from-emerald-500/40 group-hover:to-teal-500/40' },
  { name: 'Home', icon: '🏠', gradient: 'from-orange-500/20 to-amber-500/20', hover: 'group-hover:from-orange-500/40 group-hover:to-amber-500/40' },
];

export default async function Dashboard() {
  try {
    await connectDB();
  } catch (e) {
    // Ignore DB errors as fallback mechanism handles empty arrays
  }

  let products: Product[] = [];
  let cart = null as CartItemsDb | null;

  try {
    const UserId = await getUserId(await cookies());
    const [productRes, cartRes] = await Promise.allSettled([
      getEntityList<ProductInterface, Product>(ProductModel),
      getCart(UserId || '-1', Cart),
    ]);

    cart = cartRes.status === 'fulfilled' ? (cartRes.value as CartItemsDb | null) : null;
    products = productRes.status === 'fulfilled' ? productRes.value || [] : [];
  } catch (e) {
    products = [];
  }

  // Take only the top 3 products for Featured Section
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] pb-12">
      {/* Hero Section */}
      <section className="px-4 pt-6 pb-12 md:px-8 max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <Carousel />

          {/* Overlay Text */}
          <div className="absolute inset-0 z-[990] flex flex-col items-center justify-center pointer-events-none text-center px-6 bg-black/10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              Welcome to the Store
            </h1>
            <p className="text-slate-100 text-lg md:text-2xl max-w-3xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Discover the latest trends and exclusive offers handpicked just for you.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-8 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/products?category=${cat.name.toLowerCase()}`}
              className="group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-700/50 hover:border-slate-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} ${cat.hover} transition-all duration-500 opacity-50 group-hover:opacity-100 z-0`}></div>
              <div className="relative z-10 text-4xl md:text-5xl mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 drop-shadow-md">
                {cat.icon}
              </div>
              <h3 className="relative z-10 text-lg md:text-xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-4 py-8 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors text-sm md:text-base bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 hover:bg-indigo-500/20"
          >
            Explore All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="bg-slate-900/30 backdrop-blur-sm rounded-3xl border border-slate-800/60 shadow-xl overflow-hidden p-2 md:p-4">
            <ProductList
              productList={sanatizePayload(featuredProducts)}
              cart={sanatizePayload(cart)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="text-slate-500 text-6xl mb-4">🛒</div>
            <p className="text-slate-400 text-lg">Check back later for exciting featured products!</p>
          </div>
        )}
      </section>
    </div>
  );
}
