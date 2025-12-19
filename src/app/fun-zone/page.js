"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Download, Play, Star, Music, Palette, Gamepad2 } from 'lucide-react';

export default function FunZone() {
    return (
        <main className="min-h-screen bg-yellow-50">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-6 text-center overflow-hidden relative">
                <div className="absolute top-20 left-10 text-6xl animate-bounce delay-100">🎈</div>
                <div className="absolute top-40 right-20 text-6xl animate-bounce delay-700">🐘</div>

                <h1 className="font-rounded font-black text-5xl md:text-7xl text-purple-600 mb-6 drop-shadow-sm">
                    Kids Fun Zone!
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 font-bold max-w-lg mx-auto mb-10">
                    Games, coloring pages, and silly sounds for rainy days!
                </p>

                <div className="flex justify-center gap-4">
                    <a href="#coloring" className="bg-pink-500 text-white font-black px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform shadow-xl border-4 border-pink-200">
                        🎨 Coloring
                    </a>
                    <a href="#sounds" className="bg-blue-500 text-white font-black px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform shadow-xl border-4 border-blue-200">
                        🎵 Silly Sounds
                    </a>
                </div>
            </section>

            {/* Coloring Section */}
            <section id="coloring" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-4 mb-10 justify-center">
                        <Palette size={40} className="text-pink-500" />
                        <h2 className="font-rounded font-black text-4xl text-gray-800">Printable Coloring Pages</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Coloring Card 1 */}
                        <div className="bg-white p-6 rounded-3xl border-4 border-dashed border-gray-200 text-center hover:border-pink-300 transition-colors">
                            <div className="aspect-[3/4] bg-gray-100 rounded-2xl mb-6 flex items-center justify-center text-gray-300">
                                <span className="font-bold text-lg">Lila's Jungle (Preview)</span>
                            </div>
                            <h3 className="font-bold text-xl text-gray-700 mb-2">Lila the Lion</h3>
                            <button className="bg-green-500 text-white font-bold w-full py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                                <Download size={20} /> Download PDF
                            </button>
                        </div>

                        {/* Coloring Card 2 */}
                        <div className="bg-white p-6 rounded-3xl border-4 border-dashed border-gray-200 text-center hover:border-pink-300 transition-colors">
                            <div className="aspect-[3/4] bg-gray-100 rounded-2xl mb-6 flex items-center justify-center text-gray-300">
                                <span className="font-bold text-lg">Pip's Parade (Preview)</span>
                            </div>
                            <h3 className="font-bold text-xl text-gray-700 mb-2">Pip the Elephant</h3>
                            <button className="bg-green-500 text-white font-bold w-full py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                                <Download size={20} /> Download PDF
                            </button>
                        </div>

                        {/* Coloring Card 3 */}
                        <div className="bg-white p-6 rounded-3xl border-4 border-dashed border-gray-200 text-center hover:border-pink-300 transition-colors">
                            <div className="aspect-[3/4] bg-gray-100 rounded-2xl mb-6 flex items-center justify-center text-gray-300">
                                <span className="font-bold text-lg">Space Adventure (Preview)</span>
                            </div>
                            <h3 className="font-bold text-xl text-gray-700 mb-2">Benny's Balloon</h3>
                            <button className="bg-green-500 text-white font-bold w-full py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                                <Download size={20} /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Silly Sounds Section */}
            <section id="sounds" className="py-20 px-6 bg-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex items-center gap-4 mb-10 justify-center">
                        <Music size={40} className="text-blue-500" />
                        <h2 className="font-rounded font-black text-4xl text-gray-800">Ms. Erica's Sound Board</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <SoundButton label="Roar!" icon="🦁" color="bg-orange-400" />
                        <SoundButton label="Trumpet!" icon="🐘" color="bg-gray-400" />
                        <SoundButton label="Splash!" icon="🌊" color="bg-blue-400" />
                        <SoundButton label="Magic!" icon="✨" color="bg-purple-400" />
                        <SoundButton label="Boing!" icon="🦘" color="bg-green-400" />
                        <SoundButton label="Zoom!" icon="🚀" color="bg-red-400" />
                        <SoundButton label="Rain!" icon="☔" color="bg-indigo-400" />
                        <SoundButton label="Yawn..." icon="😴" color="bg-yellow-400" />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function SoundButton({ label, icon, color }) {
    return (
        <button className={`
            ${color} text-white p-8 rounded-3xl shadow-[0_8px_0_rgba(0,0,0,0.1)] 
            active:shadow-none active:translate-y-2 transition-all
            flex flex-col items-center justify-center gap-2
            group
        `}>
            <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{icon}</span>
            <span className="font-black text-lg uppercase tracking-wider">{label}</span>
        </button>
    )
}
