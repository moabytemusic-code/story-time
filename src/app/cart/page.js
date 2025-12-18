"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <header className="mb-10 text-center md:text-left">
                    <h1 className="font-rounded font-extrabold text-4xl text-slate-800 mb-2">Your Treasure Bag 🎒</h1>
                    <p className="text-gray-500 font-medium">Review your magical items before checkout.</p>
                </header>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-[32px] p-12 text-center border border-pink-100 shadow-sm">
                        <ShoppingBag size={64} className="mx-auto text-pink-200 mb-6" />
                        <h2 className="text-2xl font-bold text-slate-700 mb-2">Your bag is empty!</h2>
                        <p className="text-gray-400 mb-8">Looks like you haven't found any treasures yet.</p>
                        <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                            Go to Shop <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-[24px] border border-pink-100 shadow-sm flex items-center gap-4 md:gap-6">
                                    <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ShoppingBag size={24} className="text-pink-200" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{item.name}</h3>
                                            <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-4">{item.category}</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 font-bold hover:text-pink-500 disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm font-bold text-slate-700 w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-gray-600 font-bold hover:text-pink-500"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:w-80">
                            <div className="bg-white p-6 rounded-[32px] border border-pink-100 shadow-sm sticky top-32">
                                <h3 className="font-rounded font-bold text-xl text-slate-800 mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Subtotal</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-bold">Free</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-2"></div>
                                    <div className="flex justify-between text-xl font-bold text-slate-800">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-pink-500 hover:shadow-pink-300 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    onClick={() => alert("Checkout integration coming soon!")}
                                >
                                    Checkout <ArrowRight size={20} />
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                                    Secure Checkout powered by Magic 🪄
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
