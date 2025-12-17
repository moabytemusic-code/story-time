"use client";
import { Trophy, Star, Medal, Zap, BookOpen } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const ACHIEVEMENTS_DATA = [
    { id: 1, title: "First Steps", desc: "Listened to your first story", icon: <Star size={24} />, color: "bg-yellow-100 text-yellow-600" },
    { id: 2, title: "Bookworm", desc: "Listened to 5 stories", icon: <BookOpen size={24} />, color: "bg-pink-100 text-pink-600" },
    { id: 3, title: "Night Owl", desc: "Listened to a story after 8 PM", icon: <Zap size={24} />, color: "bg-purple-100 text-purple-600" },
    { id: 4, title: "Super Listener", desc: "Completed 10 stories", icon: <Trophy size={24} />, color: "bg-blue-100 text-blue-600" },
    { id: 5, title: "Weekend Warrior", desc: "Listened on a Saturday and Sunday", icon: <Medal size={24} />, color: "bg-orange-100 text-orange-600" },
];

export default function Achievements() {
    const { unlockedAchievements } = useUser();

    return (
        <div>
            <header className="mb-8">
                <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">My Achievements 🏆</h1>
                <p className="text-gray-500">Collect badges as you explore!</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ACHIEVEMENTS_DATA.map(item => {
                    const isUnlocked = unlockedAchievements.includes(item.id);
                    return (
                        <div key={item.id} className={`p-6 rounded-[24px] border ${isUnlocked ? 'bg-white border-pink-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'} flex items-start gap-4 transition-all hover:scale-105`}>
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isUnlocked ? item.color : 'bg-gray-200 text-gray-400'}`}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-rounded font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                                {isUnlocked && (
                                    <div className="mt-2 text-xs font-bold text-green-500 flex items-center gap-1">
                                        <span>Unlocked!</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
