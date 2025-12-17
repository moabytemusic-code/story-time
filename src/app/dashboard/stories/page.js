"use client";
import { STORIES } from '@/data/stories';
import { Play, Heart, CheckCircle } from 'lucide-react';

export default function MyStories() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">My Stories 📚</h1>
                <p className="text-gray-500">Your collection of magical adventures.</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {STORIES.map(story => (
                    <div key={story.id} className="bg-white p-5 rounded-[24px] border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all group relative">
                        {/* Status Badges (Mocked) */}
                        {story.id === 2 && (
                            <div className="absolute top-4 right-4 text-pink-500">
                                <Heart size={20} fill="currentColor" />
                            </div>
                        )}
                        {story.id === 1 && (
                            <div className="absolute top-4 right-4 text-green-500">
                                <CheckCircle size={20} fill="currentColor" />
                            </div>
                        )}

                        <div className={`w-16 h-16 ${story.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm`}>
                            {story.icon}
                        </div>

                        <h3 className="font-rounded font-bold text-lg text-gray-800 mb-2 group-hover:text-pink-500 transition-colors">{story.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{story.desc}</p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md uppercase tracking-wide">{story.tag}</span>
                            <button className="w-10 h-10 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all">
                                <Play size={18} fill="currentColor" className="ml-0.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
