"use client";
import Link from 'next/link';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { playSound } = useSound();
    const { totalItems } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" onClick={() => playSound()} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
                        <Sparkles size={20} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-rounded font-bold text-xl text-pink-500 leading-none">Story Time</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">With Ms. Erica™</span>
                    </div>
                </Link>

                {/* Links - Desktop */}
                <div className="hidden md:flex items-center gap-8 font-bold text-gray-600">
                    <Link href="/stories" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Stories</Link>
                    <Link href="/parents" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Parents</Link>
                    <Link href="/shop" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Shop</Link>
                    <Link href="/membership" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Membership</Link>
                    <Link href="/activities" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Activities</Link>
                    <Link href="/about" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">About</Link>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-4">
                    <Link href="/cart" onClick={() => playSound()} className="relative text-gray-400 hover:text-pink-500 transition">
                        <ShoppingBag size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <Link href="/login" onClick={() => playSound()} className="font-bold text-gray-500 hover:text-pink-500 hidden md:block">
                        Log In
                    </Link>
                    <Link href="/login" onClick={() => playSound()} className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-pink-200 transition-all hover:scale-105 active:scale-95 text-sm hidden md:block">
                        Join Club
                    </Link>
                </div>
            </div>
        </nav>
    );
}
