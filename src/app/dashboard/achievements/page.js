"use client";
import { Trophy, Star, Medal, Zap } from 'lucide-react';

const ACHIEVEMENTS = [
    { id: 1, title: "First Steps", desc: "Listened to your first story", icon: <Star size={24} />, color: "bg-yellow-100 text-yellow-600", unlocked: true },
    { id: 2, title: "Bookworm", desc: "Listened to 5 stories", icon: <BookOpenIcon />, color: "bg-pink-100 text-pink-600", unlocked: true },
    { id: 3, title: "Night Owl", desc: "Listened to a story after 8 PM", icon: <Zap size={24} />, color: "bg-purple-100 text-purple-600", unlocked: false },
    { id: 4, title: "Super Listener", desc: "Completed 10 stories", icon: <Trophy size={24} />, color: "bg-blue-100 text-blue-600", unlocked: false },
    { id: 5, title: "Weekend Warrior", desc: "Listened on a Saturday and Sunday", icon: <Medal size={24} />, color: "bg-orange-100 text-orange-600", unlocked: false },
];

function BookOpenIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    )
}

export default function Achievements() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">My Achievements 🏆</h1>
                <p className="text-gray-500">Collect badges as you explore!</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ACHIEVEMENTS.map(item => (
                    <div key={item.id} className={`p-6 rounded-[24px] border ${item.unlocked ? 'bg-white border-pink-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'} flex items-start gap-4 transition-all hover:scale-105`}>
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.unlocked ? item.color : 'bg-gray-200 text-gray-400'}`}>
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="font-rounded font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                            {item.unlocked && (
                                <div className="mt-2 text-xs font-bold text-green-500 flex items-center gap-1">
                                    <span>Unlocked!</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
