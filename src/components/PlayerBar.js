"use client";
import { usePlayer } from '@/context/PlayerContext';
import { Play, Pause, X, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlayerBar() {
    const { currentStory, isPlaying, togglePlay, stopStory, progress, currentTime, duration, seek } = usePlayer();

    if (!currentStory) return null;

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 px-8 z-[100] flex items-center justify-between"
            >
                {/* Story Info */}
                <div className="flex items-center gap-4 w-1/4">
                    <div className={`w-12 h-12 ${currentStory.color} rounded-xl flex items-center justify-center text-2xl`}>
                        {currentStory.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 line-clamp-1">{currentStory.title}</h4>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{currentStory.tag}</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center flex-1 max-w-lg">
                    <div className="flex items-center gap-6 mb-2">
                        <button className="text-gray-400 hover:text-pink-500 transition-colors">
                            <SkipBack size={20} />
                        </button>
                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
                        >
                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </button>
                        <button className="text-gray-400 hover:text-pink-500 transition-colors">
                            <SkipForward size={20} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1 bg-gray-100 rounded-full cursor-pointer relative group"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const width = rect.width;
                                const percentage = (x / width) * 100;
                                seek(percentage);
                            }}
                        >
                            <div
                                className="h-full bg-pink-500 rounded-full relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-gray-400 w-10">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Volume / Misc */}
                <div className="flex items-center justify-end gap-4 w-1/4">
                    <Volume2 size={20} className="text-gray-400" />
                    <div className="w-24 h-1 bg-gray-100 rounded-full">
                        <div className="h-full bg-gray-300 w-2/3 rounded-full"></div>
                    </div>
                    <button onClick={stopStory} className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                        <X size={20} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
