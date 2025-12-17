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
            <section className="pt-40 pb-32 px-6 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 left-10 text-pink-200 opacity-50 hidden md:block"
                >
                    <Star size={64} fill="currentColor" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-40 right-20 text-yellow-200 opacity-50 hidden md:block"
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
                        <Link href="/stories" className="btn-primary flex items-center gap-2 w-full md:w-auto justify-center">
                            <BookOpen size={20} /> Explore the Stories
                        </Link>
                        <Link href="/dashboard" className="btn-secondary flex items-center gap-2 w-full md:w-auto justify-center">
                            <Star size={20} /> Join Little Wonders Club
                        </Link>
                    </motion.div>
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
