"use client";
import Link from 'next/link';
import { ArrowLeft, Save, Music, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

export default function EditStory() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [story, setStory] = useState({
        title: '',
        tag: '',
        description: '', // Changed from desc
        icon: '',
        color: 'bg-pink-100'
    });

    useEffect(() => {
        if (!id) return;

        async function fetchStory() {
            setLoading(true);
            if (!supabase) {
                // Mock fallback
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('stories')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching story:", error);
            } else if (data) {
                // Map old schema if necessary, or just use data
                setStory({
                    ...data,
                    description: data.description || data.desc // Handle both
                });
            }
            setLoading(false);
        }

        fetchStory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        if (!supabase) {
            alert("Supabase not set up");
            setSaving(false);
            return;
        }

        const { error } = await supabase
            .from('stories')
            .update({
                title: story.title,
                tag: story.tag,
                description: story.description, // Changed from desc
                // other fields would go here
            })
            .eq('id', id);

        if (error) {
            alert("Error saving: " + error.message);
        } else {
            router.push('/admin/stories');
        }
        setSaving(false);
    };

    const handleChange = (e) => {
        setStory({ ...story, [e.target.name]: e.target.value });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 size={48} className="animate-spin text-pink-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/admin/stories" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold mb-6 transition-colors">
                <ArrowLeft size={18} /> Back to Stories
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Edit Story</h1>
                <p className="text-slate-500">Update story details.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4">Basic Information</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Story Title</label>
                            <input
                                name="title"
                                type="text"
                                value={story.title}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Category tag</label>
                            <input
                                name="tag"
                                type="text"
                                value={story.tag}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Description</label>
                        <textarea
                            name="desc"
                            rows="4"
                            value={story.description}
                            onChange={handleChange}
                            className="input-field resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/stories" className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" disabled={saving} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200">
                        {saving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                </div>

            </form>

            <style jsx>{`
                .input-field {
                    @apply w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:border-pink-500 focus:bg-white transition-all placeholder:text-gray-300;
                }
            `}</style>
        </div>
    );
}
