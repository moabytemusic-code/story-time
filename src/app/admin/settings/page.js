"use client";
import { Save, Globe, Lock, Bell } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettings() {
    const [loading, setLoading] = useState(false);

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
                            <input type="text" defaultValue="Story Time with Ms. Erica" className="input-field" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Contact Email</label>
                            <input type="email" defaultValue="erica@storytime.com" className="input-field" />
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
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200">
                        <Save size={18} /> Save Changes
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
