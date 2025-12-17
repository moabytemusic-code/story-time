"use client";
import { User, Bell, CreditCard, Volume2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Settings() {
    const { user, updateUser, settings, updateSettings } = useUser();

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">Settings ⚙️</h1>
                <p className="text-gray-500">Manage your profile and preferences.</p>
            </header>

            <div className="max-w-2xl space-y-6">

                {/* Profile Section */}
                <div className="bg-white p-8 rounded-[32px] border border-pink-100 shadow-sm">
                    <h2 className="font-rounded font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                        <User size={24} className="text-pink-500" />
                        Profile Settings
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Child's Name</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => updateUser({ name: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-pink-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Age</label>
                            <input
                                type="number"
                                value={user.age}
                                onChange={(e) => updateUser({ age: parseInt(e.target.value) || 0 })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-pink-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-white p-8 rounded-[32px] border border-pink-100 shadow-sm">
                    <h2 className="font-rounded font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                        <Volume2 size={24} className="text-blue-500" />
                        App Preferences
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="font-bold text-gray-700">Background Music</span>
                            <div
                                onClick={() => updateSettings({ bgMusic: !settings.bgMusic })}
                                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.bgMusic ? 'bg-pink-500' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.bgMusic ? 'right-1' : 'left-1'}`}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="font-bold text-gray-700">Autoplay Next Story</span>
                            <div
                                onClick={() => updateSettings({ autoplay: !settings.autoplay })}
                                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.autoplay ? 'bg-pink-500' : 'bg-gray-300'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.autoplay ? 'right-1' : 'left-1'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn-primary w-full shadow-lg shadow-pink-200">Save Changes</button>

            </div>
        </div>
    );
}
