"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';

export default function BlogPost({ params }) {
    // Handling params unwrapping for potential future Next.js versions or current client component behavior
    const { slug } = React.use(params);
    const post = BLOG_POSTS.find(p => p.id === slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-[#FFF5F9]">
                <Navbar />
                <div className="pt-40 text-center">
                    <h1 className="text-2xl font-bold text-gray-400">Post not found</h1>
                    <Link href="/parents" className="text-pink-500 hover:underline mt-4 block">Return to Library</Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">

                    <Link href="/parents" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-500 font-bold mb-8 transition-colors">
                        <ArrowLeft size={20} /> Back to Library
                    </Link>

                    <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
                        {post.category}
                    </span>

                    <h1 className="font-rounded font-black text-4xl md:text-5xl text-gray-800 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-gray-400 font-medium mb-12 border-b border-pink-100 pb-8">
                        <span className="flex items-center gap-2"><Calendar size={18} /> {post.date}</span>
                        <span className="flex items-center gap-2"><Clock size={18} /> {post.readTime}</span>
                        <button className="ml-auto hover:text-pink-500"><Share2 size={20} /></button>
                    </div>

                    <div
                        className="prose prose-lg prose-pink max-w-none text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Author Bio */}
                    <div className="bg-white p-8 rounded-3xl border border-pink-100 mt-16 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shrink-0">
                            <img src="/images/ms-erica-portrait.jpg" alt="Ms. Erica" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Written by Ms. Erica</h4>
                            <p className="text-gray-500">Founder of Story Time & Mom of 2. Passionate about raising emotionally intelligent humans.</p>
                        </div>
                    </div>

                </div>
            </article>

            <Footer />
        </main>
    );
}
