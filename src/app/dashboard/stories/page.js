"use client";
import StoryCard from '@/components/StoryCard';
import { usePlayer } from '@/context/PlayerContext';
import { useStories } from '@/hooks/useStories';
import { Loader2 } from 'lucide-react';

export default function MyStories() {
    const { playStory } = usePlayer();
    const { stories, loading } = useStories();

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">My Stories 📚</h1>
                <p className="text-gray-500">Your collection of magical adventures.</p>
            </header>

            {loading ? (
                <div className="flex justify-center py-20 text-pink-400">
                    <Loader2 size={40} className="animate-spin" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {stories && stories.map(story => (
                        <div key={story.id} onClick={() => playStory(story)}>
                            <StoryCard story={story} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
