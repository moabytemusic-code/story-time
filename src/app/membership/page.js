"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Star, Crown } from 'lucide-react';

export default function Membership() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-pink-500 mb-4">Join Little Wonders Club</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Unlock unlimited stories, exclusive printables, and ad-free listening for your little one.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">

                    {/* Free Plan */}
                    <div className="bg-white p-8 rounded-[40px] border-2 border-transparent shadow-sm hover:shadow-xl transition-all">
                        <div className="mb-8">
                            <h3 className="font-rounded font-bold text-2xl text-gray-800">Listener</h3>
                            <div className="text-gray-400 font-bold mt-2">Free Always</div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3 text-gray-600"><Check className="text-pink-300" /> 1 New Story per week</li>
                            <li className="flex gap-3 text-gray-600"><Check className="text-pink-300" /> Access to recent episodes</li>
                            <li className="flex gap-3 text-gray-600"><Check className="text-pink-300" /> Community newsletter</li>
                        </ul>
                        <button className="w-full py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition">
                            Get Started
                        </button>
                    </div>

                    {/* Paid Plan */}
                    <div className="bg-white p-8 rounded-[40px] border-2 border-pink-500 shadow-2xl relative overflow-hidden transform md:scale-105">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500" />
                        <div className="absolute top-6 right-6 text-yellow-500 animate-pulse">
                            <Crown fill="currentColor" size={32} />
                        </div>

                        <div className="mb-8">
                            <h3 className="font-rounded font-bold text-2xl text-pink-500">Little Wonder</h3>
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className="text-4xl font-extrabold text-gray-800">$9.99</span>
                                <span className="text-gray-400 font-bold">/month</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3 text-gray-700 font-bold"><div className="bg-pink-100 p-1 rounded-full"><Check size={14} className="text-pink-500" /></div> Unlimited Story Access</li>
                            <li className="flex gap-3 text-gray-700 font-bold"><div className="bg-pink-100 p-1 rounded-full"><Check size={14} className="text-pink-500" /></div> Ad-Free Listening</li>
                            <li className="flex gap-3 text-gray-700 font-bold"><div className="bg-pink-100 p-1 rounded-full"><Check size={14} className="text-pink-500" /></div> Printable Activity Packs</li>
                            <li className="flex gap-3 text-gray-700 font-bold"><div className="bg-pink-100 p-1 rounded-full"><Check size={14} className="text-pink-500" /></div> Sticker Packs Mailed Quarterly</li>
                        </ul>
                        <button className="w-full py-4 rounded-2xl bg-pink-500 text-white font-bold shadow-lg shadow-pink-200 hover:bg-pink-600 hover:scale-105 transition-all active:scale-95">
                            Start 7-Day Free Trial
                        </button>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
