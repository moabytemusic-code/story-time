"use client";
import { Play, Lock, Info } from 'lucide-react';
import Link from 'next/link';

export default function StoryCard({ story, isLocked = false, onPlay, href }) {

    // Inner content of the card
    const CardContent = () => (
        <>
            {/* Icon Area */}
            <div className={`w-16 h-16 ${story.color} rounded-full flex items-center justify-center text-3xl mb-5 shadow-sm`}>
                {story.icon}
            </div>

            {/* Tag */}
            <div className="mb-3">
                <span className="inline-block bg-pink-50 px-3 py-1 rounded-full text-[10px] font-bold text-pink-500 uppercase tracking-wide">
                    {story.tag}
                </span>
            </div>

            {/* Content */}
            <h3 className="font-rounded font-bold text-xl text-gray-800 mb-2 group-hover:text-pink-500 transition-colors">
                {story.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
                {story.description || story.desc}
            </p>
        </>
    );

    const Wrapper = ({ children }) => {
        if (href) {
            return <Link href={href} className="contents">{children}</Link>;
        }
        return <>{children}</>;
    }

    return (
        <div className={`group bg-white border border-gray-100 p-6 rounded-[32px] hover:shadow-xl hover:shadow-pink-100/50 transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col relative ${isLocked ? 'opacity-75 grayscale-[0.5]' : ''}`}>

            <Wrapper>
                <CardContent />
            </Wrapper>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto z-10">
                <span className="text-xs font-bold text-gray-400">{story.duration}</span>

                {isLocked ? (
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                        <Lock size={16} />
                    </div>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation if clicking play
                            onPlay && onPlay(story);
                        }}
                        className="w-10 h-10 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors shadow-sm"
                    >
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                    </button>
                )}
            </div>
        </div>
    )
}
