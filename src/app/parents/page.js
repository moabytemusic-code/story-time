"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Heart, Coffee, Sun, Moon, Search } from 'lucide-react';
import Link from 'next/link';

export default function ParentsResources() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-16 px-6 relative overflow-hidden bg-white rounded-b-[60px] shadow-sm mb-12">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-1.5 rounded-full text-pink-500 font-bold text-sm uppercase tracking-wide mb-6">
                        <Heart size={16} fill="currentColor" /> For Parents & Caregivers
                    </div>
                    <h1 className="font-rounded font-black text-4xl md:text-5xl text-gray-800 mb-6">
                        The <span className="text-pink-500">Resource Library</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Practical tips, bedtime hacks, and emotional learning guides to help you navigate the beautiful chaos of raising little ones.
                    </p>
                </div>
            </section>

            {/* Topics Grid */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">

                    {/* Featured / Start Here */}
                    <div className="mb-16">
                        <h2 className="font-rounded font-bold text-2xl text-gray-800 mb-8 flex items-center gap-2">
                            <Sun className="text-yellow-400" /> New & Noteworthy
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <BlogCard
                                category="Bedtime"
                                title="5 Bedtime Stories That Actually Help Toddlers Sleep"
                                desc="Science-backed narrative techniques to lower heart rates and signal sleep."
                                color="bg-indigo-100 text-indigo-600"
                            />
                            <BlogCard
                                category="Emotional Health"
                                title="How to Talk to Your Preschooler About 'Big Feelings'"
                                desc="Simple scripts and questions to help them name and tame their emotions."
                                color="bg-pink-100 text-pink-600"
                            />
                        </div>
                    </div>

                    {/* All Categories */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <BlogCard
                            category="Activities"
                            title="The 5 Senses Scavenger Hunt"
                            desc="A perfect rainy day activity to ground active kids."
                            color="bg-orange-100 text-orange-600"
                        />
                        <BlogCard
                            category="Screen-Free"
                            title="Why Audio Stories Boost Literacy"
                            desc="Understanding the 'listening advantage' for pre-readers."
                            color="bg-green-100 text-green-600"
                        />
                        <BlogCard
                            category="Parenting"
                            title="Navigating Separation Anxiety"
                            desc="How 'Lila the Lion' helps kids feel safe when you leave."
                            color="bg-purple-100 text-purple-600"
                        />
                        <BlogCard
                            category="Routines"
                            title="Morning Routines That Start with a Smile"
                            desc="Turning the 'hurry up' struggle into a playful game."
                            color="bg-blue-100 text-blue-600"
                        />
                    </div>

                </div>
            </section>

            <section className="py-20 px-6 bg-pink-500 mx-4 rounded-[40px] text-white text-center mb-12">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-rounded font-bold text-3xl mb-4">Need a specific topic?</h2>
                    <p className="opacity-90 mb-8 text-lg">I'm always writing new guides. Tell me what you're struggling with!</p>
                    <a href="mailto:hello@storytimewitherica.com" className="inline-block bg-white text-pink-500 font-bold px-8 py-4 rounded-xl hover:bg-pink-50 transition-colors shadow-lg">
                        Suggest a Topic
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function BlogCard({ category, title, desc, color }) {
    return (
        <Link href="#" className="group block bg-white p-8 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-pink-100/50 transition-all hover:-translate-y-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 ${color}`}>
                {category}
            </span>
            <h3 className="font-rounded font-bold text-xl text-gray-800 mb-3 group-hover:text-pink-500 transition-colors">
                {title}
            </h3>
            <p className="text-gray-500 leading-relaxed mb-4">
                {desc}
            </p>
            <span className="text-sm font-bold text-gray-300 group-hover:text-pink-400 flex items-center gap-1">
                Read Article <BookOpen size={14} />
            </span>
        </Link>
    )
}
