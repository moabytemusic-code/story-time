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
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-gray-800 mb-4">Join the <span className="text-pink-500">Club!</span></h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto mb-12">Unlock premium stories, printable activities, and ad-free listening.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-start">

                    {/* Free Plan */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative top-4">
                        <h3 className="font-rounded font-bold text-2xl text-gray-800 mb-2">Explorer</h3>
                        <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-wider">Free Forever</p>
                        <div className="text-4xl font-extrabold text-gray-800 mb-8">$0<span className="text-base font-medium text-gray-400">/mo</span></div>

                        <ul className="space-y-4 mb-8">
                            <FeatureItem text="Acces to 5 free stories" />
                            <FeatureItem text="Basic activities" />
                            <FeatureItem text="Standard audio quality" />
                        </ul>

                        <Link href="/signup" className="btn-secondary w-full justify-center">Sign Up Free</Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-pink-500 p-8 rounded-[32px] border-4 border-pink-200 shadow-xl shadow-pink-200 relative transform md:-translate-y-4 z-10 text-white">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">Most Popular</div>

                        <h3 className="font-rounded font-bold text-2xl mb-2 flex items-center gap-2">
                            <Crown size={24} fill="currentColor" className="text-yellow-300" /> Adventurer
                        </h3>
                        <p className="text-pink-200 font-bold text-sm mb-6 uppercase tracking-wider">For Growing Minds</p>
                        <div className="text-4xl font-extrabold mb-8">$9<span className="text-base font-medium text-pink-200">/mo</span></div>

                        <ul className="space-y-4 mb-8">
                            <FeatureItem text="Unlimited Stories" light />
                            <FeatureItem text="Exclusive 'Sleepy Time' Series" light />
                            <FeatureItem text="Ad-free Experience" light />
                            <FeatureItem text="Download for Offline" light />
                        </ul>

                        <Link href="/signup?plan=pro" className="bg-white text-pink-600 font-bold w-full py-4 rounded-xl flex items-center justify-center hover:bg-pink-50 transition-colors shadow-lg">Start Free Trial</Link>
                    </div>

                    {/* Family Plan */}
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative top-4">
                        <h3 className="font-rounded font-bold text-2xl text-gray-800 mb-2">Family</h3>
                        <p className="text-gray-400 font-bold text-sm mb-6 uppercase tracking-wider">Best Value</p>
                        <div className="text-4xl font-extrabold text-gray-800 mb-8">$19<span className="text-base font-medium text-gray-400">/mo</span></div>

                        <ul className="space-y-4 mb-8">
                            <FeatureItem text="Everything in Adventurer" />
                            <FeatureItem text="Up to 4 Child Profiles" />
                            <FeatureItem text="Parental Insights Dashboard" />
                            <FeatureItem text="Priority Support" />
                        </ul>

                        <Link href="/signup?plan=family" className="btn-secondary w-full justify-center">Get Family Plan</Link>
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
