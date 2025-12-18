"use client";
import { Save, Globe, Lock, Loader2, Camera, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminSettings() {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [carouselImages, setCarouselImages] = useState([]);

    // State for form fields
    const [settings, setSettings] = useState({
        siteName: "Story Time with Ms. Erica",
        contactEmail: "erica@storytime.com",
        maintenanceMode: false
    });

    // Load from localStorage on mount (Simulating minimal persistence)
    useEffect(() => {
        const savedSettings = localStorage.getItem('app_settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
        fetchCarouselImages();
    }, []);

    const fetchCarouselImages = async () => {
        if (!supabase) return;
        const { data, error } = await supabase.storage.from('uploads').list('hero-carousel', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        });

        if (error) {
            console.error("Error fetching images:", error);
        } else {
            const imagesWithUrls = data.map(file => {
                const { data: urlData } = supabase.storage
                    .from('uploads')
                    .getPublicUrl(`hero-carousel/${file.name}`);
                return {
                    name: file.name,
                    url: urlData.publicUrl
                };
            });
            // Filter out placeholders if any (like .emptyFolderPlaceholder)
            setCarouselImages(imagesWithUrls.filter(img => !img.name.startsWith('.')));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !supabase) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `hero-carousel/${fileName}`;

            const { error } = await supabase.storage
                .from('uploads')
                .upload(filePath, file);

            if (error) throw error;

            await fetchCarouselImages();
            alert("Image uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const handleImageDelete = async (fileName) => {
        if (!confirm("Are you sure you want to delete this image?")) return;
        if (!supabase) return;

        try {
            const { error } = await supabase.storage
                .from('uploads')
                .remove([`hero-carousel/${fileName}`]);

            if (error) throw error;

            await fetchCarouselImages();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete image.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            localStorage.setItem('app_settings', JSON.stringify(settings));
            setLoading(false);
            alert("Settings saved successfully!");
        }, 800);
    };

    return (
        <div className="max-w-4xl">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
                <p className="text-slate-500">Global application configuration.</p>
            </header>

            <div className="space-y-6">

                {/* General Settings */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Globe className="text-pink-500" size={24} />
                        <h2 className="font-bold text-lg text-slate-800">General</h2>
                    </div>

                    <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Contact Email</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={settings.contactEmail}
                                onChange={handleChange}
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>

                {/* Maintenance */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Lock className="text-orange-500" size={24} />
                        <h2 className="font-bold text-lg text-slate-800">Access Control</h2>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-slate-700">Maintenance Mode</h3>
                            <p className="text-sm text-slate-400">Disable access for non-admins.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                    </div>
                </div>

                {/* Carousel Settings */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Camera className="text-purple-500" size={24} />
                        <h2 className="font-bold text-lg text-slate-800">About Page Carousel</h2>
                    </div>

                    <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-bold text-slate-500 uppercase">Current Images</label>
                                <label className="cursor-pointer bg-purple-50 text-purple-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-purple-100 transition-colors flex items-center gap-2">
                                    <Plus size={16} />
                                    Add Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>

                            {uploading && (
                                <div className="text-sm text-purple-600 font-bold animate-pulse mb-4">
                                    Uploading image...
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {carouselImages.length === 0 ? (
                                    <div className="col-span-full py-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        No images uploaded yet.
                                    </div>
                                ) : (
                                    carouselImages.map((img) => (
                                        <div key={img.name} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100">
                                            <img
                                                src={img.url}
                                                alt="Carousel"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => handleImageDelete(img.name)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                                                title="Delete Image"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                These images will cycle on the About page.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </div>
            <style jsx>{`
                .input-field {
                    @apply w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:border-pink-500 focus:bg-white transition-all;
                }
            `}</style>
        </div>
    );
}
