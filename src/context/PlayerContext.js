"use client";
import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

import { useUser } from './UserContext';

export function PlayerProvider({ children }) {
    const [currentStory, setCurrentStory] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [progress, setProgress] = useState(0); // 0 to 100
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Get checkAchievements from UserContext
    const { checkAchievements } = useUser();

    const playStory = (story) => {
        if (currentStory?.id === story.id) {
            togglePlay();
            return;
        }

        if (audio) {
            audio.pause();
        }

        const newAudio = new Audio(story.audioUrl);

        newAudio.addEventListener('loadedmetadata', () => {
            setDuration(newAudio.duration);
        });

        newAudio.addEventListener('timeupdate', () => {
            setCurrentTime(newAudio.currentTime);
            setProgress((newAudio.currentTime / newAudio.duration) * 100);
        });

        newAudio.addEventListener('ended', () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            checkAchievements(story.id); // Check for achievements!
        });

        setAudio(newAudio);
        setCurrentStory(story);
        setIsPlaying(true);
        newAudio.play().catch(e => console.error("Playback failed:", e));
    };

    const togglePlay = () => {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const stopStory = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        setCurrentStory(null);
        setIsPlaying(false);
        setAudio(null);
        setProgress(0);
    };

    const seek = (value) => {
        if (!audio) return;
        const time = (value / 100) * duration;
        audio.currentTime = time;
        setProgress(value);
    };

    return (
        <PlayerContext.Provider value={{ currentStory, isPlaying, playStory, togglePlay, stopStory, progress, currentTime, duration, seek }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}
