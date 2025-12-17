"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { STORIES } from '@/data/stories';
import StoryCard from '@/components/StoryCard';
import { usePlayer } from '@/context/PlayerContext';
import { UserProvider } from '@/context/UserContext'; // Important: we might need to wrap if this is a standalone page, but layout should handle it. But wait, this is /app/stories/page.js, not in dashboard layout.
// Actually, /app/layout.js might not have providers.
// The user has DashboardLayout with providers, but public pages don't seem to have them in `src/app/layout.js` (I haven't checked that file).
// If `stories/page.js` is public, it needs providers.

// Let's create a wrapper or just use the card visually if logic is complex. 
// BUT the user wants playback. So we need PlayerProvider here too.


export default function Stories() {
    const { playStory } = usePlayer();

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-pink-500 mb-4">Magical Audio Stories</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Click play to start an adventure. Perfect for car rides, quiet time, and bedtime.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STORIES.map(story => (
                        <StoryCard
                            key={story.id}
                            story={story}
                            href={`/stories/${story.id}`}
                            onPlay={playStory}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
