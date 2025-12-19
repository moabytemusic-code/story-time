"use client";
import { usePlayer } from '@/context/PlayerContext';
// import { Play, Pause, X, SkipBack, SkipForward, Volume2 } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

export default function PlayerBar() {
    const { currentStory, isPlaying, isBuffering, togglePlay, stopStory, progress, currentTime, duration, seek } = usePlayer();

    if (!currentStory) return null;

    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 px-8 z-[100] flex items-center justify-between">
            {/* Story Info */}
            <div className="flex items-center gap-4 w-1/4">
                <div className={`w-12 h-12 ${currentStory?.color || 'bg-gray-100'} rounded-xl flex items-center justify-center text-2xl`}>
                    {currentStory?.icon || '🎵'}
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 line-clamp-1">{currentStory?.title || 'Unknown Story'}</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{currentStory?.tag || 'Story'}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center flex-1 max-w-lg">
                <div className="flex items-center gap-6 mb-2">
                    <button className="text-gray-400 hover:text-pink-500 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
                    >
                        {isBuffering ? (
                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : isPlaying ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        )}
                    </button>
                    <button className="text-gray-400 hover:text-pink-500 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                <div className="w-24 h-1 bg-gray-100 rounded-full">
                    <div className="h-full bg-gray-300 w-2/3 rounded-full"></div>
                </div>
                <button onClick={stopStory} className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>
    );
}
