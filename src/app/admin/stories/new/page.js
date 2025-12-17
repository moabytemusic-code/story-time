"use client";
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Music, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { supabase, uploadFile } from '@/lib/supabase';

export default function NewStory() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Supabase logic would go here
        // 1. Upload Audio
        // 2. Upload Icon/Image
        // 3. Insert into 'stories' table

        if (!supabase) {
            alert("Supabase is not configured! Check console.");
            console.log("Mock Submit: Story created.");
            setLoading(false);
            return;
        }

        // Example Real Logic
        /*
        const { error } = await supabase.from('stories').insert({
             title: e.target.title.value,
             ...
        }) 
        */

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/admin/stories" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold mb-6 transition-colors">
                <ArrowLeft size={18} /> Back to Stories
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Add New Story</h1>
                <p className="text-slate-500">Upload audio and details.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4">Basic Information</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Story Title</label>
                            <input name="title" type="text" placeholder="e.g. The Brave Little Lion" className="input-field" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Category tag</label>
                            <input name="tag" type="text" placeholder="e.g. Animals" className="input-field" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase">Description</label>
                        <textarea name="desc" rows="4" placeholder="A short summary..." className="input-field resize-none"></textarea>
                    </div>
                </div>

                {/* Media Upload */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4">Media Files</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Audio */}
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-pink-300 transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Music size={24} />
                            </div>
                            <span className="font-bold text-slate-600 mb-1">Upload Audio</span>
                            <span className="text-xs text-slate-400">MP3, WAV (Max 50MB)</span>
                            <input type="file" accept="audio/*" className="hidden" />
                        </div>

                        {/* Image */}
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-pink-300 transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ImageIcon size={24} />
                            </div>
                            <span className="font-bold text-slate-600 mb-1">Cover Image</span>
                            <span className="text-xs text-slate-400">JPG, PNG (512x512)</span>
                            <input type="file" accept="image/*" className="hidden" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
                    <button type="submit" disabled={loading} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200">
                        {loading ? 'Saving...' : <><Save size={18} /> Save Story</>}
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
