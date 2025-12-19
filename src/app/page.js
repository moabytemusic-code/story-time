"use client";
import Link from 'next/link';
import { BookOpen, Star, Heart, Play, Brain, Moon, Smile, Quote, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStories } from '@/hooks/useStories';

export default function Home() {
    const { stories, loading } = useStories();

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#FFF5F9] to-white">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-pink-100 mb-6"
                    >
                        <span className="text-xl">✨</span>
                        <span className="font-bold text-pink-500 text-sm tracking-wide uppercase">The Listening Lands Await</span>
                    </motion.div>

                    <h1 className="font-rounded font-black text-5xl md:text-7xl text-gray-800 mb-6 leading-tight">
                        Turn <span className="text-pink-500 relative inline-block">
                            Bedtime
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span> into <br />
                        <span className="text-indigo-400">Magic Time</span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Spark imagination and calm busy minds with sensory stories designed for <strong>emotional growth</strong>.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/stories" className="btn-primary flex items-center gap-2 text-lg px-8 py-4 shadow-xl shadow-pink-200/50 hover:shadow-pink-200 transition-all">
                            <Play size={20} fill="currentColor" /> Play a Free Story
                        </Link>
                        <Link href="/membership" className="text-gray-500 font-bold hover:text-pink-500 px-6 py-3 transition-colors">
                            View Membership Plans →
                        </Link>
                    </motion.div>

                    <div className="mt-8 text-sm text-gray-400 font-medium">
                        Trusted by 10,000+ Parents • Screen-free Fun
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-6 bg-white rounded-[60px] mx-4 shadow-sm relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-rounded font-bold text-3xl md:text-4xl text-gray-800 mb-4">Why Parents Love Story Time</h2>
                        <p className="text-gray-500 text-lg">More than just stories — it's growth, calm, and connection.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <BenefitCard
                            icon={<Brain size={32} className="text-purple-500" />}
                            bg="bg-purple-100"
                            title="Emotional Intelligence"
                            desc="Stories designed to help kids understand feelings, empathy, and social nuances."
                        />
                        <BenefitCard
                            icon={<Moon size={32} className="text-indigo-500" />}
                            bg="bg-indigo-100"
                            title="Better Bedtimes"
                            desc="Calming narratives and gentle sounds that help little ones drift off to dreamland."
                        />
                        <BenefitCard
                            icon={<Smile size={32} className="text-orange-500" />}
                            bg="bg-orange-100"
                            title="Sensory Awareness"
                            desc="Adventures that encourage active listening and mindfulness of the world around them."
                        />
                    </div>
                </div>
            </section>

            {/* Founder Trust Section */}
            <section className="py-20 px-6 bg-[#FEFCE8] relative">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/3 relative">
                        <div className="aspect-square bg-pink-200 rounded-[40px] rotate-3 overflow-hidden border-4 border-white shadow-lg relative">
                            <img
                                src="/images/ms-erica-portrait.jpg"
                                alt="Ms. Erica reading a book"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left">
                        <h2 className="font-rounded font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                            "Hello, I'm Ms. Erica!"
                        </h2>
                        <h3 className="text-pink-500 font-bold text-lg mb-6 uppercase tracking-wide">
                            Educator • Storyteller • Mom
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            I created <em>Story Time</em> because I saw how deeply children crave connection—visually, emotionally, and creatively. My stories aren't just entertainment; they are <strong>safe spaces</strong> for little hearts to explore big feelings.
                        </p>
                        <div className="bg-white/50 p-6 rounded-2xl border border-yellow-200 inline-block">
                            <p className="text-gray-800 font-bold italic">
                                "My promise: To nurture your child's imagination with kindness, inclusivity, and wonder in every word."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Stories Section */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <div className="text-center md:text-left mb-8 md:mb-0">
                            <h2 className="font-rounded font-bold text-3xl md:text-4xl text-gray-800 mb-3">Popular Adventures</h2>
                            <p className="text-gray-500 text-lg">Loved by 10,000+ happy listeners worldwide 🌎</p>
                        </div>
                        <Link href="/stories" className="text-pink-500 font-bold hover:text-pink-600 hover:underline">
                            View All Stories →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {loading ? (
                            <div className="col-span-3 flex justify-center py-10">
                                <Loader2 size={40} className="text-pink-400 animate-spin" />
                            </div>
                        ) : (
                            stories.slice(0, 3).map((story) => (
                                <StoryCard key={story.id} story={story} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-6 bg-pink-500 rounded-[60px] mx-4 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 transform -rotate-12"><Star size={100} /></div>
                    <div className="absolute bottom-10 right-10 transform rotate-12"><Heart size={100} /></div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <h2 className="font-rounded font-bold text-3xl md:text-4xl mb-16">Happy Families</h2>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <TestimonialCard
                            quote="My daughter asks for 'The Listening Lands' every single night. It's become our favorite ritual."
                            author="Sarah M."
                            role="Mom of 2"
                        />
                        <TestimonialCard
                            quote="Finally, screen-free entertainment that actually teaches them something valuable. Absolute game changer!"
                            author="David K."
                            role="Dad & Teacher"
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-rounded font-bold text-4xl text-gray-800 mb-6">Ready to Start the Adventure?</h2>
                    <p className="text-xl text-gray-500 mb-10">Get instant access to our entire library of magical audio stories.</p>
                    <Link href="/dashboard" className="btn-primary text-xl px-12 py-4 shadow-xl shadow-pink-200">
                        Start Listening for Free
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function BenefitCard({ icon, bg, title, desc }) {
    return (
        <div className="flex flex-col items-center text-center p-6">
            <div className={`w-20 h-20 ${bg} rounded-3xl flex items-center justify-center mb-6 transform rotate-3 hover:rotate-6 transition-transform`}>
                {icon}
            </div>
            <h3 className="font-rounded font-bold text-xl text-gray-800 mb-3">{title}</h3>
            <p className="text-gray-500 leading-relaxed">{desc}</p>
        </div>
    )
}

function StoryCard({ story }) {
    return (
        <div className="group bg-white border border-gray-100 p-8 rounded-[40px] hover:shadow-xl hover:shadow-pink-100/50 transition-all hover:-translate-y-2 cursor-pointer h-full flex flex-col">
            <div className={`w-20 h-20 ${story.color} rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm`}>
                {story.icon}
            </div>
            <div className="mb-4">
                <span className="inline-block bg-gray-50 px-3 py-1 rounded-full text-xs font-bold text-gray-400 uppercase tracking-wide">
                    {story.tag}
                </span>
            </div>
            <h3 className="font-rounded font-bold text-2xl text-gray-800 mb-2 group-hover:text-pink-500 transition-colors">
                {story.title}
            </h3>
            <p className="text-gray-500 leading-relaxed mb-6 flex-1">
                {story.desc}
            </p>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-gray-400">{story.duration}</span>
                <button className="w-12 h-12 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    <Play size={20} fill="currentColor" className="ml-1" />
                </button>
            </div>
        </div>
    )
}

function TestimonialCard({ quote, author, role }) {
    return (
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-colors">
            <Quote className="text-pink-200 mb-4 opacity-50" size={32} />
            <p className="text-xl font-medium leading-relaxed mb-6">"{quote}"</p>
            <div>
                <div className="font-bold text-lg">{author}</div>
                <div className="text-pink-200 text-sm">{role}</div>
            </div>
        </div>
    )
}
