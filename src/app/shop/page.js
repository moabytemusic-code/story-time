"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Star } from 'lucide-react';

const PRODUCTS = [
    { id: 1, name: "Story Time Plushie", price: 24.99, image: "🧸", color: "bg-amber-100" },
    { id: 2, name: "Bedtime Story Book Vol. 1", price: 19.99, image: "📚", color: "bg-blue-100" },
    { id: 3, name: "Magical Night Light", price: 34.99, image: "💡", color: "bg-purple-100" },
    { id: 4, name: "Kids T-Shirt", price: 15.99, image: "👕", color: "bg-pink-100" },
];

export default function Shop() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-pink-500 mb-4">The Gift Shop</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Bring a piece of the magic home with you.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.map(product => (
                        <div key={product.id} className="bg-white p-4 rounded-[32px] group hover:shadow-xl hover:shadow-pink-100/50 transition-all border border-gray-100">
                            <div className={`aspect-square ${product.color} rounded-[24px] flex items-center justify-center text-8xl mb-4 group-hover:scale-105 transition-transform`}>
                                {product.image}
                            </div>
                            <div className="px-2 pb-2">
                                <h3 className="font-rounded font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="font-bold text-pink-500 text-xl">${product.price}</span>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-colors">
                                        <ShoppingBag size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
