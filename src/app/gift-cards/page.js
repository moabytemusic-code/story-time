"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Gift, Sparkles, Check, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const GIFT_OPTIONS = [
    { id: 'gc_10', amount: 10, color: 'bg-green-100', text: 'text-green-600', icon: '🎁' },
    { id: 'gc_25', amount: 25, color: 'bg-blue-100', text: 'text-blue-600', icon: '🌟' },
    { id: 'gc_50', amount: 50, color: 'bg-indigo-100', text: 'text-indigo-600', icon: '💎' },
    { id: 'gc_100', amount: 100, color: 'bg-purple-100', text: 'text-purple-600', icon: '👑' },
];

export default function GiftCards() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block bg-white text-pink-500 font-bold px-6 py-2 rounded-full mb-6 border border-pink-100 shadow-sm">
                        🎁 The Perfect Gift
                    </span>
                    <h1 className="font-rounded font-extrabold text-5xl md:text-6xl text-slate-800 mb-6 drop-shadow-sm">
                        Give the Gift of <span className="text-pink-500">Magic</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium mb-10">
                        Share the wonder of storytelling with friends and family. Story Time gift cards never expire and can be used for memberships or shop items.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 text-pink-200 opacity-30 animate-pulse">
                    <Sparkles size={80} fill="currentColor" />
                </div>
                <div className="absolute bottom-20 right-10 text-yellow-200 opacity-30 animate-pulse delay-700">
                    <Gift size={100} fill="currentColor" />
                </div>
            </section>

            {/* Selection Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {GIFT_OPTIONS.map((option) => (
                            <GiftCardOption key={option.id} option={option} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-white border-y border-pink-50">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="font-rounded font-bold text-3xl text-slate-800 mb-12">How it Works</h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        <Step
                            number="1"
                            title="Choose Amount"
                            desc="Select the perfect amount for your little explorer."
                        />
                        <Step
                            number="2"
                            title="We Send It"
                            desc="The digital code is emailed instantly to you or the recipient."
                        />
                        <Step
                            number="3"
                            title="They Enjoy"
                            desc="Redeemable for any story, membership, or item in our shop."
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function GiftCardOption({ option }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className={`cursor-pointer bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-${option.text.split('-')[1]}-100/50 transition-all group`}
        >
            <div className={`aspect-w-16 aspect-h-10 ${option.color} rounded-3xl mb-6 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
                <div className="absolute top-4 left-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                    <div className="w-20 h-4 bg-white/30 rounded-full"></div>
                </div>
                <div className="font-rounded font-extrabold text-5xl text-slate-800 z-10">
                    ${option.amount}
                </div>
                <div className="absolute -bottom-4 -right-4 text-9xl opacity-20 select-none pointer-events-none">
                    {option.icon}
                </div>
            </div>

            <div className="text-center">
                <h3 className="font-bold text-xl text-slate-800 mb-2">Digital Gift Card</h3>
                <p className="text-gray-400 text-sm mb-6">Sent via email instantly</p>

                <button className="w-full btn-primary flex items-center justify-center gap-2">
                    <ShoppingCart size={18} /> Add to Cart
                </button>
            </div>
        </motion.div>
    )
}

function Step({ number, title, desc }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-inner ring-4 ring-white">
                {number}
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-xs mx-auto">{desc}</p>
        </div>
    )
}
