"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Instagram, Mic } from 'lucide-react';

export default function About() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-pink-50">

                    <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-pink-100 border-[8px] border-white shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                            <span className="text-6xl">👩‍🏫</span>
                        </div>
                        <div>
                            <div className="inline-block bg-pink-100 text-pink-500 font-bold px-4 py-1.5 rounded-full text-sm mb-4">Host & Creator</div>
                            <h1 className="font-rounded font-extrabold text-4xl md:text-5xl text-gray-800 mb-6">Hi, I'm Ms. Erica!</h1>
                            <p className="text-gray-500 text-lg leading-relaxed mb-6">
                                I'm an early childhood educator and storyteller on a mission to help little ones navigate big feelings. Every story is written with specific developmental milestones in mind—blending whimsy with wisdom.
                            </p>
                            <div className="flex gap-4">
                                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500 text-white font-bold hover:bg-pink-600 transition shadow-lg shadow-pink-200">
                                    <Mail size={18} /> Contact Me
                                </button>
                                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-pink-500 hover:bg-pink-50 transition">
                                    <Instagram size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 border-t border-gray-100 pt-12">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 mx-auto mb-4">
                                <Mic size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Voice Acting</h3>
                            <p className="text-sm text-gray-400">Professional voice over artist bringing characters to life.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-4">
                                <span className="text-xl">🎓</span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Education First</h3>
                            <p className="text-sm text-gray-400">Certified teacher with 10+ years of classroom experience.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                                <span className="text-xl">❤️</span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Safe Space</h3>
                            <p className="text-sm text-gray-400">Content you can trust. No ads, no scary surprises.</p>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
