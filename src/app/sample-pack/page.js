"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Download, Play, Check, Star, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SamplePack() {
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/lead-magnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    {/* Left: Copy */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 bg-purple-100 px-4 py-1.5 rounded-full text-purple-600 font-bold text-sm uppercase tracking-wide mb-6"
                        >
                            <Star size={16} fill="currentColor" /> Free Gift for New Families
                        </motion.div>

                        <h1 className="font-rounded font-black text-4xl md:text-6xl text-gray-800 mb-6 leading-tight">
                            The <span className="text-pink-500">Sleepy Time</span> <br />Starter Pack
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Transform bedtime battles into 10 minutes of peace. Get our most popular outcome-based story plus a visual routine chart—completely free.
                        </p>

                        <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-xl shadow-pink-100/50 mb-8">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                                        <Check size={32} strokeWidth={4} />
                                    </div>
                                    <h3 className="font-rounded font-bold text-2xl text-gray-800 mb-2">You're In!</h3>
                                    <p className="text-gray-500 mb-6">Check your inbox for the official welcome, or download your files right here:</p>

                                    <div className="space-y-3">
                                        <a href="#" className="flex items-center justify-center gap-2 bg-pink-500 text-white font-bold py-4 rounded-xl hover:bg-pink-600 transition-colors w-full">
                                            <Play size={20} fill="currentColor" /> Download Audio (MP3)
                                        </a>
                                        <a href="#" className="flex items-center justify-center gap-2 bg-white border-2 border-pink-100 text-pink-500 font-bold py-4 rounded-xl hover:bg-pink-50 transition-colors w-full">
                                            <Download size={20} /> Download Chart (PDF)
                                        </a>
                                    </div>
                                </motion.div>
                            ) : (
                                <>
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Download className="text-pink-500" size={20} /> What's Inside:
                                    </h3>
                                    <ul className="space-y-4 mb-6">
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0"><Check size={14} strokeWidth={4} /></div>
                                            <span className="text-gray-600 font-medium"><strong>"The Sleepy Star" Audio Story</strong> (MP3) <br /><span className="text-sm text-gray-400">Scientifically designed to lower energy levels.</span></span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0"><Check size={14} strokeWidth={4} /></div>
                                            <span className="text-gray-600 font-medium"><strong>Bedtime Routine Chart</strong> (Printable PDF) <br /><span className="text-sm text-gray-400">Visual cues for toddlers to follow independently.</span></span>
                                        </li>
                                    </ul>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address..."
                                            required
                                            className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50"
                                            disabled={status === 'loading'}
                                        />
                                        <button
                                            disabled={status === 'loading'}
                                            className="btn-primary w-full text-lg py-4 shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {status === 'loading' ? 'Sending...' : 'Send Me The Pack'}
                                        </button>
                                        <p className="text-xs text-center text-gray-400 mt-2">We respect your privacy. No spam, just stories.</p>
                                        {status === 'error' && (
                                            <p className="text-sm text-red-500 text-center font-bold">Something went wrong. Please try again.</p>
                                        )}
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-pink-200 to-purple-200 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-white p-6 rounded-[40px] shadow-2xl border-4 border-white rotate-3"
                        >
                            {/* Mockup Representation */}
                            <div className="bg-indigo-900 rounded-[30px] p-8 text-white aspect-[4/5] flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                                    <Star size={100} className="absolute top-10 right-10" />
                                    <Star size={60} className="absolute bottom-20 left-10" />
                                </div>
                                <div className="w-20 h-20 bg-indigo-500/50 backdrop-blur-md rounded-full flex items-center justify-center mb-6 relative z-10">
                                    <Play size={40} fill="currentColor" />
                                </div>
                                <h3 className="font-rounded font-bold text-3xl text-center relative z-10 mb-2">The Sleepy Star</h3>
                                <p className="text-indigo-200 text-center relative z-10">A Guided Journey to Sleep</p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    )
}
