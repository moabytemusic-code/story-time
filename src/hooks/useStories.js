import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { STORIES as MOCK_STORIES } from '@/data/stories';

export function useStories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            if (!supabase) {
                setStories(MOCK_STORIES);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('stories')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    // Log the full error object for debugging
                    console.error(' Supabase Fetch Error:', JSON.stringify(error, null, 2));
                    console.error(' Details:', error);
                    setStories(MOCK_STORIES); // Fallback
                } else {
                    // If DB is empty, use mock data so the site isn't blank
                    if (!data || !Array.isArray(data) || data.length === 0) {
                        setStories(MOCK_STORIES);
                    } else {
                        try {
                            // Normalize Supabase data (snake_case -> camelCase)
                            const normalizedStories = data.map(s => ({
                                ...s,
                                audioUrl: s.audio_url || s.audioUrl,
                                // Ensure critical fields exist to prevent rendering crashes
                                tag: s.tag || 'Story',
                                title: s.title || 'Untitled Story',
                                color: s.color || 'bg-gray-100',
                                icon: s.icon || '📖'
                            }));
                            setStories(normalizedStories);
                        } catch (mapErr) {
                            console.error("Error normalizing stories:", mapErr);
                            setStories(MOCK_STORIES);
                        }
                    }
                }
            } catch (err) {
                console.error('Supabase fetch error:', err);
                setStories(MOCK_STORIES);
            } finally {
                setLoading(false);
            }
        }

        fetchStories();
    }, []);

    return { stories, loading };
}
