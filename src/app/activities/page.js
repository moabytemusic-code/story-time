"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Download, Printer, Palette, Scissors } from 'lucide-react';

const ACTIVITIES = [
    { id: 1, title: "Benny's Big Balloon Coloring Page", type: "Coloring", icon: <Palette size={24} />, color: "bg-pink-100 text-pink-500" },
    { id: 2, title: "Connect the Dots: Starry Night", type: "Worksheet", icon: <Printer size={24} />, color: "bg-blue-100 text-blue-500" },
    { id: 3, title: "Make Your Own Crown Craft", type: "Craft", icon: <Scissors size={24} />, color: "bg-yellow-100 text-yellow-500" },
    { id: 4, title: "Word Search: Jungle Animals", type: "Worksheet", icon: <Printer size={24} />, color: "bg-green-100 text-green-500" },
    { id: 5, title: "Draw Your Feelings", type: "Art Therapy", icon: <Palette size={24} />, color: "bg-purple-100 text-purple-500" },
    { id: 6, title: "Story Map Template", type: "Writing", icon: <Printer size={24} />, color: "bg-orange-100 text-orange-500" },
];

export default function Activities() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-6xl text-purple-600 mb-4">Fun Activities 🎨</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">Extend the fun beyond the story! Download coloring pages, crafts, and games.</p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ACTIVITIES.map(activity => (
                        <div key={activity.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-purple-100/50 transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${activity.color} flex items-center justify-center`}>
                                    {activity.icon}
                                </div>
                                <span className="bg-gray-50 text-gray-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-gray-100">
                                    {activity.type}
                                </span>
                            </div>

                            <h3 className="font-rounded font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-500 transition-colors">
                                {activity.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Perfect for ages 3-6. Helps develop fine motor skills and creativity.
                            </p>

                            <button className="w-full bg-gray-50 hover:bg-purple-500 hover:text-white text-gray-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <Download size={18} /> Download PDF
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
