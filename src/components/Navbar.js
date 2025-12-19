import React from 'react';
import Link from 'next/link';
import { Sparkles, ShoppingBag, Menu, X } from 'lucide-react';
import { useSound } from '@/context/SoundContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { playSound } = useSound();
    const { totalItems } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" onClick={() => playSound()} className="flex items-center gap-3 relative z-50">
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
                    <Link href="/membership" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Membership</Link>
                    <Link href="/parents" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Parents</Link>
                    <Link href="/fun-zone" onClick={() => playSound()} className="text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1">
                        <span className="text-lg">🎈</span> Kids Zone
                    </Link>
                    <Link href="/shop" onClick={() => playSound()} className="hover:text-pink-500 transition-colors">Shop</Link>
                </div>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4 relative z-50">
                    <Link href="/cart" onClick={() => playSound()} className="relative text-gray-400 hover:text-pink-500 transition">
                        <ShoppingBag size={24} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" onClick={() => playSound()} className="font-bold text-gray-500 hover:text-pink-500">
                            Log In
                        </Link>
                        <Link href="/login" onClick={() => playSound()} className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-pink-200 transition-all hover:scale-105 active:scale-95 text-sm">
                            Join Club
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-gray-600 hover:text-pink-500 transition p-2"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                    <Link href="/stories" onClick={() => { playSound(); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-gray-700 hover:text-pink-500">Stories</Link>
                    <Link href="/membership" onClick={() => { playSound(); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-gray-700 hover:text-pink-500">Membership</Link>
                    <Link href="/parents" onClick={() => { playSound(); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-gray-700 hover:text-pink-500">Parents</Link>
                    <Link href="/fun-zone" onClick={() => { playSound(); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-purple-500 hover:text-purple-600 flex items-center gap-2">
                        <span className="text-3xl">🎈</span> Kids Zone
                    </Link>
                    <Link href="/shop" onClick={() => { playSound(); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-gray-700 hover:text-pink-500">Shop</Link>

                    <div className="w-16 h-1 bg-pink-100 rounded-full my-4"></div>

                    <Link href="/login" onClick={() => { playSound(); setIsMobileMenuOpen(false); }} className="text-xl font-bold text-gray-500">Log In</Link>
                    <Link href="/login" onClick={() => { playSound(); setIsMobileMenuOpen(false); }} className="bg-pink-500 text-white font-bold px-8 py-3 rounded-full shadow-xl text-lg">
                        Join the Club
                    </Link>
                </div>
            )}
        </nav>
    );
}
