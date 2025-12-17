"use client";
import { Play, Clock, Star } from 'lucide-react';
import { STORIES } from '@/data/stories';
import StoryCard from '@/components/StoryCard';
import { usePlayer } from '@/context/PlayerContext';

export default function Dashboard() {
    const { playStory } = usePlayer();
    const featuredStory = STORIES[1]; // Lila & The Ocean Song

    return (
        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-1">Welcome back, Alex! 👋</h1>
                    <p className="text-gray-400 font-bold">Ready for a new adventure today?</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold shadow-sm">
                    <Star size={16} fill="currentColor" />
                    <span>Level 3 Explorer</span>
                </div>
            </header>

            {/* Continue Listening */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-rounded font-bold text-xl text-gray-700">Continue Listening</h2>
                </div>
                <div
                    onClick={() => playStory(featuredStory)}
                    className="bg-white p-6 rounded-[32px] border border-pink-100 shadow-sm flex items-center gap-6 relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-pink-500"></div>
                    <div className={`w-16 h-16 ${featuredStory.color} rounded-full flex items-center justify-center text-3xl shrink-0`}>
                        {featuredStory.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-rounded font-bold text-lg text-gray-800 mb-1">{featuredStory.title}</h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                            <span className="text-pink-500">Left off at 4:20</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>8 min remaining</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full max-w-xs bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                            <div className="bg-pink-500 h-full rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                    <button className="w-14 h-14 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-200 group-hover:scale-110 group-active:scale-95 transition-all">
                        <Play size={24} fill="currentColor" className="ml-1" />
                    </button>
                </div>
            </section>

            {/* Recommended */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-rounded font-bold text-xl text-gray-700">Recommended for You</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STORIES.slice(6, 9).map(story => (
                        <div key={story.id} onClick={() => playStory(story)}>
                            <StoryCard story={story} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
