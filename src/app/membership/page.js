"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

export default function Membership() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-gray-800 mb-4">Choose Your <span className="text-pink-500">Magic Key</span></h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto mb-12">Unlock a world of imagination, calm bedtimes, and emotional growth.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-start">

                    {/* Free Plan - Explorer */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative top-4">
                        <h3 className="font-rounded font-bold text-2xl text-gray-800 mb-2">Explorer</h3>
                        <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-wider">Curious Little Listeners</p>
                        <div className="text-4xl font-extrabold text-gray-800 mb-8">$0<span className="text-base font-medium text-gray-400">/mo</span></div>

                        <ul className="space-y-4 mb-8">
                            <FeatureItem text="3 Free Stories / Month" />
                            <FeatureItem text="2 Coloring Pages" />
                            <FeatureItem text="'New Story' Notifications" />
                        </ul>

                        <Link href="/signup" className="btn-secondary w-full justify-center">Start Exploring</Link>
                    </div>

                    {/* Pro Plan - Magic Key */}
                    <div className="bg-pink-500 p-8 rounded-[32px] border-4 border-pink-200 shadow-xl shadow-pink-200 relative transform md:-translate-y-4 z-10 text-white">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">Nightly Hero</div>

                        <h3 className="font-rounded font-bold text-2xl mb-2 flex items-center gap-2">
                            <Crown size={24} fill="currentColor" className="text-yellow-300" /> Magic Key
                        </h3>
                        <p className="text-pink-200 font-bold text-sm mb-6 uppercase tracking-wider">For Bedtime Calm</p>
                        <div className="text-4xl font-extrabold mb-8">$9<span className="text-base font-medium text-pink-200">/mo</span></div>

                        <ul className="space-y-4 mb-8">
                            <FeatureItem text="Unlimited Audio Stories" light />
                            <FeatureItem text="'Calm Corner' Sleep Playlist" light />
                            <FeatureItem text="Full Activity Library" light />
                            <FeatureItem text="Request a Story Topic" light />
                        </ul>

                        <Link href="/signup?plan=magic-key" className="bg-white text-pink-600 font-bold w-full py-4 rounded-xl flex items-center justify-center hover:bg-pink-50 transition-colors shadow-lg">Start Free Trial</Link>
                    </div>

                    {/* Annual Plan - Story Circle */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative top-4">
                        <h3 className="font-rounded font-bold text-2xl text-gray-800 mb-2">Story Circle</h3>
                        <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-wider">Best Value (2 Months Free)</p>
                        <div className="text-4xl font-extrabold text-gray-800 mb-8">$79<span className="text-base font-medium text-gray-400">/yr</span></div>

                        <ul className="space-y-4 mb-8">
                            <FeatureItem text="All Magic Key Features" />
                            <FeatureItem text="Birthday Shoutout from Ms. Erica" />
                            <FeatureItem text="Quarterly 'Snail Mail' Sticker Pack" />
                            <FeatureItem text="First Access to Merch" />
                        </ul>

                        <Link href="/signup?plan=story-circle" className="btn-secondary w-full justify-center">Join Story Circle</Link>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

function FeatureItem({ text, light = false }) {
    return (
        <li className={`flex items-start gap-3 text-sm font-bold ${light ? 'text-pink-100' : 'text-gray-500'}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${light ? 'bg-pink-400 text-white' : 'bg-green-100 text-green-500'}`}>
                <Check size={12} strokeWidth={4} />
            </div>
            {text}
        </li>
    )
}
