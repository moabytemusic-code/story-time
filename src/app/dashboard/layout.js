"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Trophy, Settings, LogOut, Sparkles } from 'lucide-react';
import { PlayerProvider } from '@/context/PlayerContext';
import PlayerBar from '@/components/PlayerBar';

const MENU_ITEMS = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'My Stories', icon: <BookOpen size={20} />, path: '/dashboard/stories' },
    { name: 'Achievements', icon: <Trophy size={20} />, path: '/dashboard/achievements' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    return (
        <PlayerProvider>
            <div className="min-h-screen bg-[#FFF5F9] flex">

                {/* Sidebar */}
                <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-pink-100 flex flex-col z-50">
                    <div className="p-8 pb-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
                                <Sparkles size={16} fill="currentColor" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-rounded font-bold text-lg text-pink-500 leading-none">Story Time</span>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {MENU_ITEMS.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${isActive
                                            ? 'bg-pink-50 text-pink-500 shadow-sm'
                                            : 'text-gray-400 hover:text-pink-400 hover:bg-pink-50/50'
                                        }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-pink-50">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-gray-400 hover:text-red-400 hover:bg-red-50 transition-all">
                            <LogOut size={20} />
                            Log Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8 pb-32">
                    {children}
                </main>

                <PlayerBar />
            </div>
        </PlayerProvider>
    );
}
