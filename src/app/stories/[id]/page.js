"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Play, Clock, Heart, Share2, BookOpen, Music, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { STORIES } from '@/data/stories';
import { usePlayer } from '@/context/PlayerContext';

export default function StoryDetails() {
    const params = useParams();
    const { playStory, isPlaying, currentStory, togglePlay } = usePlayer();

    // Find story by ID (ensure ID comparison handles string/number difference)
    const storyId = parseInt(params.id);
    const story = STORIES.find(s => s.id === storyId);

    if (!story) {
        return (
            <div className="min-h-screen bg-[#FFF5F9] flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Story Not Found 😕</h1>
                <Link href="/stories" className="btn-primary">Back to Library</Link>
            </div>
        );
    }

    const isCurrent = currentStory?.id === story.id;
    const isPlayingCurrent = isCurrent && isPlaying;

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
                <Link href="/stories" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-500 font-bold mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Stories
                </Link>

                {/* Header Section */}
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-pink-50 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center text-center md:text-left">

                        {/* Huge Icon */}
                        <div className={`w-40 h-40 ${story.color} rounded-[40px] flex items-center justify-center text-7xl shadow-inner shrink-0 rotate-3`}>
                            {story.icon}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                                <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                                    {story.tag}
                                </span>
                                <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
                                    <Clock size={16} /> {story.duration}
                                </span>
                            </div>

                            <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-gray-800 mb-6 leading-tight">
                                {story.title}
                            </h1>

                            <p className="text-xl text-gray-500 font-medium leading-relaxed mb-8 max-w-2xl">
                                {story.desc}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <button
                                    onClick={() => playStory(story)}
                                    className="btn-primary py-4 px-8 text-lg flex items-center gap-3 shadow-pink-200"
                                >
                                    {isPlayingCurrent ? (
                                        <> <div className="w-3 h-3 bg-white rounded-sm animate-pulse" /> Playing </>
                                    ) : (
                                        <> <Play size={24} fill="currentColor" /> Play Story </>
                                    )}
                                </button>
                                <button className="w-14 h-14 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-200 transition-all">
                                    <Heart size={24} />
                                </button>
                                <button className="w-14 h-14 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-200 transition-all">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Background blob */}
                    <div className={`absolute -top-20 -right-20 w-96 h-96 ${story.color} rounded-full opacity-20 blur-3xl`}></div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-8">

                    {/* Transcript / Story Text */}
                    <div className="md:col-span-2 bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-pink-50">
                        <h2 className="font-rounded font-bold text-2xl text-gray-800 mb-6 flex items-center gap-3">
                            <BookOpen className="text-pink-500" /> Story Transcript
                        </h2>
                        <div className="prose prose-lg prose-pink text-gray-600">
                            <p>
                                Once upon a time, in a land filled with whispering trees and singing rivers...
                            </p>
                            <p>
                                (This is where the full text of the story would go. Reading along helps children develop literacy skills while they listen!)
                            </p>
                            <p className="italic text-gray-400">
                                [Content placeholder for {story.title}]
                            </p>
                        </div>
                    </div>

                    {/* Sidebar: Activities & Learning */}
                    <div className="space-y-8">
                        {/* Skills */}
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-pink-50">
                            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-6">What We Learn</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                    <span className="font-bold text-gray-700">Identifying Emotions</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <Music size={16} />
                                    </div>
                                    <span className="font-bold text-gray-700">Active Listening</span>
                                </li>
                            </ul>
                        </div>

                        {/* Activity Idea */}
                        <div className="bg-yellow-50 rounded-[32px] p-8 border border-yellow-100">
                            <h3 className="font-rounded font-bold text-xl text-yellow-800 mb-4">Try This Activity!</h3>
                            <p className="text-yellow-700 font-medium mb-6">
                                Draw a picture of what you think the main character looks like. Use your favorite colors!
                            </p>
                            <button className="w-full py-3 bg-white text-yellow-700 font-bold rounded-xl hover:bg-yellow-100 transition-colors">
                                I Did It!
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </main>
    );
}
