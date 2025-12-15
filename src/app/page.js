"use client";
import Link from 'next/link';
import { BookOpen, Star, Heart, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 relative overflow-hidden">

                {/* Decorative Background Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 left-10 text-pink-200 opacity-50"
                >
                    <Star size={64} fill="currentColor" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-40 right-20 text-yellow-200 opacity-50"
                >
                    <Heart size={80} fill="currentColor" />
                </motion.div>

                <div className="max-w-4xl mx-auto text-center relative z-10">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full shadow-sm border border-pink-100 mb-8"
                    >
                        <span className="text-yellow-400">✨</span>
                        <span className="font-bold text-pink-500 text-sm tracking-wide">Welcome to The Listening Lands</span>
                        <span className="text-yellow-400">✨</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="font-rounded font-extrabold text-5xl md:text-7xl text-pink-500 mb-8 leading-tight drop-shadow-sm"
                    >
                        Magical Stories for <br className="hidden md:block" />
                        <span className="text-pink-400">Little Learners</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
                    >
                        Join Lila, Pip, and friends on enchanting adventures that teach sensory skills, emotional wisdom, and spark boundless imagination.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4"
                    >
                        <button className="btn-primary flex items-center gap-2">
                            <BookOpen size={20} /> Explore the Stories
                        </button>
                        <button className="btn-secondary flex items-center gap-2">
                            <Star size={20} /> Join Little Wonders Club
                        </button>
                    </motion.div>

                </div>
            </section>

            {/* Featured Section (Below Fold) */}
            <section className="py-20 px-6 bg-white rounded-t-[60px] shadow-[0_-10px_40px_rgba(0,0,0,0.02)] relative z-20 -mt-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-rounded font-bold text-4xl text-gray-800 mb-4">Popular Adventures</h2>
                        <p className="text-gray-500 text-lg">Loved by 10,000+ happy listeners worldwide 🌎</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <StoryCard
                            color="bg-purple-100"
                            icon="🐘"
                            title="Pip's Big Parade"
                            desc="A story about finding your courage and loud voice!"
                            tag="Social Skills"
                        />
                        <StoryCard
                            color="bg-blue-100"
                            icon="🌊"
                            title="Lila & The Ocean Song"
                            desc="Discovering the magic of calming waves and deep breaths."
                            tag="Mindfulness"
                        />
                        <StoryCard
                            color="bg-orange-100"
                            icon="🦁"
                            title="Leo The Polite Lion"
                            desc="Learning manners has never been this roaringly fun!"
                            tag="Etiquette"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function StoryCard({ color, icon, title, desc, tag }) {
    return (
        <div className="group bg-white border border-gray-100 p-8 rounded-[40px] hover:shadow-xl hover:shadow-pink-100/50 transition-all hover:-translate-y-2 cursor-pointer">
            <div className={`w-20 h-20 ${color} rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner`}>
                {icon}
            </div>
            <div className="inline-block bg-gray-50 px-3 py-1 rounded-full text-xs font-bold text-gray-400 mb-4 uppercase tracking-wide">
                {tag}
            </div>
            <h3 className="font-rounded font-bold text-2xl text-gray-800 mb-3 group-hover:text-pink-500 transition-colors">{title}</h3>
            <p className="text-gray-500 leading-relaxed mb-6">{desc}</p>

            <button className="w-full py-3 rounded-2xl bg-gray-50 text-gray-600 font-bold group-hover:bg-pink-500 group-hover:text-white transition-all flex items-center justify-center gap-2">
                <Play size={18} fill="currentColor" /> Listen Now
            </button>
        </div>
    )
}
