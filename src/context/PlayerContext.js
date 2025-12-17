"use client";
import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [currentStory, setCurrentStory] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playStory = (story) => {
        setCurrentStory(story);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const stopStory = () => {
        setCurrentStory(null);
        setIsPlaying(false);
    };

    return (
        <PlayerContext.Provider value={{ currentStory, isPlaying, playStory, togglePlay, stopStory }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}
