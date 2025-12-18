"use client";
import Link from 'next/link';
import { ArrowLeft, Save, Upload, Music, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { supabase, uploadFile } from '@/lib/supabase';

export default function NewStory() {
    const [audioFile, setAudioFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    // ... handleSubmit ...


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!supabase) {
            alert("Supabase not available");
            setLoading(false);
            return;
        }

        try {
            const title = e.target.title.value;
            const tag = e.target.tag.value;
            const description = e.target.desc.value;

            // 1. Upload Audio
            let audioUrl = null;
            if (audioFile) {
                audioUrl = await uploadFile(audioFile, 'uploads');
            }

            // 2. Upload Image
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadFile(imageFile, 'uploads');
            }

            // 3. Insert Story
            // Note: We use 'description' column now
            const { error } = await supabase.from('stories').insert({
                title,
                tag,
                description,
                audio_url: audioUrl,
                icon: imageUrl ? '🖼️' : '🎧', // Fallback icon
                image_url: imageUrl,
                duration: '10 min',
                color: 'bg-green-100'
            });

            if (error) throw error;

            // Success
            alert("Story created successfully!");
            // Redirect or clear form
            window.location.href = '/admin/stories';

        } catch (err) {
            console.error("Upload Error:", err);
            alert("Error creating story: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* ... header ... */}
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
                            <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Story Title</label>
                            <input name="title" type="text" placeholder="e.g. The Brave Little Lion" className="input-field" required />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Category tag</label>
                            <input name="tag" type="text" placeholder="e.g. Animals" className="input-field" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Description</label>
                        <textarea name="desc" rows="4" placeholder="A short summary..." className="input-field resize-none"></textarea>
                    </div>
                </div>

                {/* Media Upload */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4">Media Files</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Audio */}
                        <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-pink-300 transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Music size={24} />
                            </div>
                            <span className="font-bold text-slate-600 mb-1">{audioFile ? audioFile.name : "Upload Audio"}</span>
                            <span className="text-xs text-slate-400">MP3, WAV</span>
                            <input
                                type="file"
                                accept="audio/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => setAudioFile(e.target.files[0])}
                            />
                        </div>

                        {/* Image */}
                        {/* Image */}
                        <div className="relative h-64 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-pink-300 transition-all cursor-pointer group overflow-hidden bg-gray-50/50">

                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Preview" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                                    <div className="relative z-10 flex flex-col items-center text-white">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 text-white border border-white/30">
                                            <ImageIcon size={24} />
                                        </div>
                                        <span className="font-bold text-white drop-shadow-md mb-1">{imageFile.name}</span>
                                        <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/20">Click to Change</span>
                                    </div>
                                </>
                            ) : (
                                <div className="p-8 flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <ImageIcon size={24} />
                                    </div>
                                    <span className="font-bold text-slate-600 mb-1">Cover Image</span>
                                    <span className="text-xs text-slate-400">JPG, PNG</span>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/stories" className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancel</Link>
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
