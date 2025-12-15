"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, ShoppingCart, Heart } from 'lucide-react';

const PRODUCTS = [
    { id: 1, name: "Lila The Explorer Plushie", price: 24.99, category: "Plushies", image: "🧸", color: "bg-pink-100" },
    { id: 2, name: "Pip's Big Parade Book", price: 14.99, category: "Books", image: "📚", color: "bg-purple-100" },
    { id: 3, name: "Bedtime Story Digital Pack", price: 9.99, category: "Audio", image: "🎧", color: "bg-blue-100" },
    { id: 4, name: "Sensory Play Kit", price: 34.99, category: "Activities", image: "🎨", color: "bg-yellow-100" },
    { id: 5, name: "Leo The Lion Plushie", price: 24.99, category: "Plushies", image: "🦁", color: "bg-orange-100" },
    { id: 6, name: "Mindful Moments Cards", price: 12.99, category: "Activities", image: "🃏", color: "bg-green-100" },
];

const CATEGORIES = ["All", "Books", "Plushies", "Audio", "Activities"];

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            {/* Shop Hero */}
            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-pink-500 mb-4">Little Wonders Shop</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Bring the magic home with our collection of plushies, books, and sensory kits designed for little hands.</p>
            </section>

            {/* Filter & Search Bar */}
            <section className="px-6 mb-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeCategory === cat
                                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-200 scale-105'
                                        : 'bg-white text-gray-500 hover:bg-pink-50 hover:text-pink-500'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search magic items..."
                            className="w-full md:w-64 pl-12 pr-4 py-2.5 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-pink-200 focus:outline-none text-gray-600 placeholder-gray-400 font-medium"
                        />
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all group hover:-translate-y-1 cursor-pointer border border-pink-50">

            {/* Image Container */}
            <div className={`aspect-square ${product.color} rounded-[24px] flex items-center justify-center text-6xl mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                {product.image}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition opacity-0 group-hover:opacity-100">
                    <Heart size={20} />
                </button>
            </div>

            <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                    <span className="font-rounded font-bold text-lg text-pink-500">${product.price}</span>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-4 leading-tight group-hover:text-pink-500 transition-colors">
                    {product.name}
                </h3>

                <button className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm group-hover:bg-pink-500 group-hover:text-white transition-all flex items-center justify-center gap-2">
                    <ShoppingCart size={18} /> Add to Cart
                </button>
            </div>
        </div>
    )
}
