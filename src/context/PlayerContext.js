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

    const [isBuffering, setIsBuffering] = useState(false);

    const playStory = async (story) => {
        console.log("Requesting story:", story.title);

        if (currentStory?.id === story.id) {
            togglePlay();
            return;
        }

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        setIsBuffering(true);
        setIsPlaying(true); // Optimistic UI
        setCurrentStory(story);

        // Pre-check if file exists
        try {
            const check = await fetch(story.audioUrl, { method: 'HEAD' });
            if (!check.ok) {
                console.error(`Audio file not found (Status ${check.status}): ${story.audioUrl}`);
                alert(`Error: Audio file not found (404). The file '${story.audioUrl}' might not be deployed yet.`);
                setIsPlaying(false);
                setIsBuffering(false);
                return;
            }
        } catch (netErr) {
            console.error("Network check failed:", netErr);
            // We continue anyway to let Audio object try, in case fetch failed for CORS/other reasons
        }

        try {
            const newAudio = new Audio(story.audioUrl);
            newAudio.volume = 1.0;

            newAudio.addEventListener('waiting', () => setIsBuffering(true));
            newAudio.addEventListener('playing', () => setIsBuffering(false));
            newAudio.addEventListener('canplay', () => setIsBuffering(false));

            newAudio.addEventListener('error', (e) => {
                const error = e.target.error;
                console.error("Audio playback error:", error, error.message);
                alert(`Playback Error: ${error.message || "Cannot load audio"}. Code: ${error.code}`);
                setIsPlaying(false);
                setIsBuffering(false);
            });

            newAudio.addEventListener('loadedmetadata', () => {
                setDuration(newAudio.duration);
            });

            newAudio.addEventListener('timeupdate', () => {
                setCurrentTime(newAudio.currentTime);
                if (newAudio.duration) {
                    setProgress((newAudio.currentTime / newAudio.duration) * 100);
                }
            });

            newAudio.addEventListener('ended', () => {
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
                checkAchievements(story.id);
            });

            setAudio(newAudio);

            const playPromise = newAudio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Playback started");
                    })
                    .catch(e => {
                        console.error("Autoplay/Playback failed:", e);
                        setIsPlaying(false);
                        setIsBuffering(false);
                    });
            }

        } catch (err) {
            console.error("Error creating Audio object:", err);
            setIsBuffering(false);
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(e => console.error("Resume failed:", e));
            }
        }
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
        <PlayerContext.Provider value={{ currentStory, isPlaying, isBuffering, playStory, togglePlay, stopStory, progress, currentTime, duration, seek }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}
