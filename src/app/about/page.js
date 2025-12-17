"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Star, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function About() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

                    <div className="flex-1 text-center md:text-left z-10">
                        <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm mb-6">Our Mission</span>
                        <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-gray-800 mb-6 leading-tight">
                            Bringing <span className="text-pink-500">Magic</span> Back to Bedtime
                        </h1>
                        <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                            Story Time with Ms. Erica is dedicated to helping families connect through the power of storytelling. We believe every child deserves to drift off to sleep with a smile.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <Link href="/stories" className="btn-primary">Listen to Stories</Link>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="w-full aspect-square bg-[#FFE8F0] rounded-[60px] relative overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
                            <div className="text-9xl">👩‍🏫</div>
                            {/* Placeholder for an actual image of Ms. Erica */}
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
                    </div>

                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="font-rounded font-extrabold text-3xl md:text-4xl text-gray-800 mb-4">Why We Do It</h2>
                        <p className="text-gray-500 text-lg">We aren't just telling stories; we're building character, creativity, and calm.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Heart size={32} className="text-red-500" />}
                            title="Emotional Growth"
                            desc="Stories designed to help children understand and manage their big feelings."
                            color="bg-red-50"
                        />
                        <ValueCard
                            icon={<Sparkles size={32} className="text-yellow-500" />}
                            title="Imagination First"
                            desc="Audio-first experiences that encourage kids to visualize their own worlds."
                            color="bg-yellow-50"
                        />
                        <ValueCard
                            icon={<BookOpen size={32} className="text-blue-500" />}
                            title="Safe & Screen-Free"
                            desc="A safe haven for kids to explore without the overstimulation of screens."
                            color="bg-blue-50"
                        />
                    </div>
                </div>
            </section>

            {/* Meet the Creator */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto bg-pink-500 rounded-[40px] p-8 md:p-16 text-center md:text-left text-white flex flex-col md:flex-row items-center gap-12 shadow-xl shadow-pink-200">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-6xl shrink-0 backdrop-blur-sm border-2 border-white/30">
                        👩‍🏫
                    </div>
                    <div>
                        <h2 className="font-rounded font-extrabold text-3xl mb-4">Hi, I'm Ms. Erica!</h2>
                        <p className="text-pink-100 text-lg leading-relaxed mb-6 font-medium">
                            As a former teacher and mother of two, I realized the need for calm, positive media. I started recording stories in my closet, and now we reach thousands of little ears every night!
                        </p>
                        <Link href="/contact" className="inline-block bg-white text-pink-500 font-bold px-8 py-3 rounded-xl hover:bg-pink-50 transition-colors">
                            Send Me a Message
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ValueCard({ icon, title, desc, color }) {
    return (
        <div className={`p-8 rounded-[32px] ${color} transition-transform hover:-translate-y-1`}>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                {icon}
            </div>
            <h3 className="font-rounded font-bold text-xl text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed font-medium">
                {desc}
            </p>
        </div>
    )
}
