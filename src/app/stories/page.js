"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Play, Clock, Headphones } from 'lucide-react';

import { STORIES } from '@/data/stories';

export default function Stories() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-pink-500 mb-4">Magical Audio Stories</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Click play to start an adventure. Perfect for car rides, quiet time, and bedtime.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
                    {STORIES.map(story => (
                        <div key={story.id} className="bg-white p-6 rounded-[32px] flex items-center gap-6 shadow-sm hover:shadow-lg transition-all group cursor-pointer border border-pink-50 hover:border-pink-200">
                            <div className={`w-20 h-20 ${story.color} rounded-full flex items-center justify-center text-4xl shrink-0`}>
                                {story.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-rounded font-bold text-xl text-gray-800 mb-1 group-hover:text-pink-500 transition-colors">{story.title}</h3>
                                <p className="text-gray-500 text-sm mb-3 line-clamp-1">{story.desc}</p>
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {story.duration}</span>
                                    <span className="flex items-center gap-1"><Headphones size={14} /> Audio</span>
                                </div>
                            </div>
                            <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-pink-500 group-hover:text-white transition-all">
                                <Play size={20} fill="currentColor" className="ml-1" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
