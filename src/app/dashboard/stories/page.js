"use client";
import { STORIES } from '@/data/stories';
import StoryCard from '@/components/StoryCard';
import { usePlayer } from '@/context/PlayerContext';

export default function MyStories() {
    const { playStory, currentStory, isPlaying } = usePlayer();

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">My Stories 📚</h1>
                <p className="text-gray-500">Your collection of magical adventures.</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {STORIES.map(story => (
                    <div key={story.id} onClick={() => playStory(story)}>
                        <StoryCard story={story} />
                    </div>
                ))}
            </div>
        </div>
    );
}
