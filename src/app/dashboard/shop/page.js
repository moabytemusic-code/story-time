"use client";
import { useEffect, useState } from 'react';
import { ShoppingBag, Loader2, Star, ShoppingCart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function DashboardShop() {
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

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">Treasure Chest 💎</h1>
                <p className="text-gray-500">Discover magical items to aid your journey.</p>
            </header>

            {loading ? (
                <div className="flex justify-center py-20 text-pink-400">
                    <Loader2 size={40} className="animate-spin" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-3xl border border-pink-100 p-8">
                            <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                            <p className="text-xl font-bold">The Treasure Chest is empty right now!</p>
                            <p>Check back later for new surprises.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white p-5 rounded-[24px] border border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all hover:-translate-y-1 flex flex-col h-full"
        >
            {/* Image Area */}
            <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <ShoppingBag className="text-pink-200" size={32} />
                )}

                {product.stock_status !== 'In Stock' && (
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
                        <span className={product.stock_status === 'Out of Stock' ? 'text-red-500' : 'text-blue-500'}>
                            {product.stock_status}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <h3 className="font-rounded font-bold text-lg text-slate-800 mb-1 leading-tight line-clamp-1">
                    {product.name}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="font-rounded font-extrabold text-xl text-slate-800">
                        ${product.price}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-pink-500 transition-colors shadow-lg hover:shadow-pink-300 active:scale-95"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
