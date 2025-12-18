"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Loader2, Star, ShoppingCart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error("Error fetching products:", error);
            else setProducts(data || []);
            setLoading(false);
        }
        fetchProducts();
    }, []);

    // Helper to group products for filters? For MVP just show all.

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block bg-white text-pink-500 font-bold px-6 py-2 rounded-full mb-6 border border-pink-100 shadow-sm animate-bounce">
                        ✨ Treasure Chest ✨
                    </span>
                    <h1 className="font-rounded font-extrabold text-5xl md:text-6xl text-slate-800 mb-6 drop-shadow-sm">
                        Magical Goods for <span className="text-pink-500">Little Heroes</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                        Bring the magic of Story Time home with our curated collection of books, plushies, and digital treasures.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto">

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 size={48} className="text-pink-400 animate-spin" />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center text-gray-400">
                                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                                    <p className="text-xl font-bold">The Treasure Chest is empty right now!</p>
                                    <p>Check back later for new surprises.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ProductCard({ product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white p-6 rounded-[32px] border border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all hover:-translate-y-2 flex flex-col h-full"
        >
            {/* Image Area */}
            <div className="relative aspect-square bg-gray-50 rounded-2xl mb-6 overflow-hidden flex items-center justify-center">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <ShoppingBag className="text-pink-200" size={48} />
                )}

                {/* Status Badge */}
                {product.stock_status !== 'In Stock' && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        <span className={product.stock_status === 'Out of Stock' ? 'text-red-500' : 'text-blue-500'}>
                            {product.stock_status}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-pink-400 bg-pink-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                        {product.category || 'General'}
                    </span>
                    <div className="flex items-center text-yellow-400 text-xs font-bold gap-1">
                        <Star size={12} fill="currentColor" /> 5.0
                    </div>
                </div>

                <h3 className="font-rounded font-bold text-xl text-slate-800 mb-2 leading-tight">
                    {product.name}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="font-rounded font-extrabold text-2xl text-slate-800">
                        ${product.price}
                    </span>
                    <button className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-pink-500 transition-colors shadow-lg hover:shadow-pink-300">
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
