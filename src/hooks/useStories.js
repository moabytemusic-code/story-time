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
                    console.error('Error fetching stories:', error);
                    setStories(MOCK_STORIES); // Fallback
                } else {
                    // If DB is empty, use mock data so the site isn't blank
                    if (!data || data.length === 0) {
                        setStories(MOCK_STORIES);
                    } else {
                        setStories(data);
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
