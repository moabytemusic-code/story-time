"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Download, Printer, Scissors, Palette } from 'lucide-react';

const ACTIVITIES = [
    { id: 1, title: "Lila's Coloring Book", type: "Coloring", icon: <Palette size={24} />, color: "bg-pink-100", text: "text-pink-500" },
    { id: 2, title: "Pip's Elephant Mask", type: "Craft", icon: <Scissors size={24} />, color: "bg-purple-100", text: "text-purple-500" },
    { id: 3, title: "Ocean Word Search", type: "Puzzle", icon: <Printer size={24} />, color: "bg-blue-100", text: "text-blue-500" },
    { id: 4, title: "Emotion Flashcards", type: "Learning", icon: <Star size={24} />, color: "bg-yellow-100", text: "text-yellow-600" },
];

function Star({ size }) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> }

export default function Activities() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-pink-500 mb-4">Fun Activities</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Extend the storytime magic with printable crafts, coloring pages, and learning games.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ACTIVITIES.map(activity => (
                        <div key={activity.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
                            <div className={`aspect-square ${activity.color} rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform ${activity.text}`}>
                                {activity.icon}
                            </div>
                            <div className="text-center">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">{activity.type}</span>
                                <h3 className="font-rounded font-bold text-xl text-gray-800 mb-6">{activity.title}</h3>
                                <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-bold hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50 transition-all flex items-center justify-center gap-2">
                                    <Download size={18} /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
