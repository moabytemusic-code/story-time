"use client";
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { usePlayer } from '@/context/PlayerContext';
import { Search, X, Loader2 } from 'lucide-react';
import { useStories } from '@/hooks/useStories';

export default function Stories() {
    const { playStory } = usePlayer();
    const { stories, loading } = useStories();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");

    // Extract unique tags
    const tags = useMemo(() => {
        if (!stories) return ["All"];
        const uniqueTags = new Set(stories.map(story => story.tag));
        return ["All", ...Array.from(uniqueTags)];
    }, [stories]);

    // Filter logic
    const filteredStories = useMemo(() => {
        if (!stories) return [];
        return stories.filter(story => {
            const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                story.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag === "All" || story.tag === selectedTag;

            return matchesSearch && matchesTag;
        });
    }, [searchQuery, selectedTag, stories]);

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-8 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-pink-500 mb-4">Magical Audio Stories</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">Click play to start an adventure. Perfect for car rides, quiet time, and bedtime.</p>

                {/* Search & Filter Bar */}
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Find a story about dragons, bravelions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-pink-100 rounded-full py-4 pl-14 pr-12 text-lg font-bold text-gray-700 shadow-sm focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all placeholder:text-gray-300"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={24} />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Filter Tags */}
                    {!loading && (
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {tags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${selectedTag === tag
                                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-200 scale-105'
                                            : 'bg-white text-gray-500 border border-gray-100 hover:border-pink-200 hover:text-pink-400'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-pink-400">
                            <Loader2 size={48} className="animate-spin mb-4" />
                            <p className="font-bold">Loading stories...</p>
                        </div>
                    ) : filteredStories.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredStories.map(story => (
                                <StoryCard
                                    key={story.id}
                                    story={story}
                                    href={`/stories/${story.id}`}
                                    onPlay={playStory}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 opacity-50">
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">No stories found</h3>
                            <p className="text-gray-400">Try searching for something else!</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
