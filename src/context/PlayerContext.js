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
        console.log("Playing story:", story.title, "at URL:", story.audioUrl);

        if (currentStory?.id === story.id) {
            togglePlay();
            return;
        }

        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset previous
        }

        try {
            const newAudio = new Audio(story.audioUrl);
            // Default volume to 1.0
            newAudio.volume = 1.0;

            newAudio.addEventListener('error', (e) => {
                const error = e.target.error;
                console.error("Audio playback error:", error);

                let errorMessage = "Unknown error";
                if (error.code === error.MEDIA_ERR_ABORTED) errorMessage = "Aborted";
                if (error.code === error.MEDIA_ERR_NETWORK) errorMessage = "Network Error";
                if (error.code === error.MEDIA_ERR_DECODE) errorMessage = "Decode Error (Corrupt file?)";
                if (error.code === error.MEDIA_ERR_SRC_NOT_SUPPORTED) errorMessage = "Source Not Supported (404 Not Found?)";

                alert(`Error playing story: ${errorMessage}. Check console for details.`);
                setIsPlaying(false);
            });

            newAudio.addEventListener('loadedmetadata', () => {
                console.log("Audio metadata loaded. Duration:", newAudio.duration);
                setDuration(newAudio.duration);
            });

            newAudio.addEventListener('timeupdate', () => {
                setCurrentTime(newAudio.currentTime);
                if (newAudio.duration) {
                    setProgress((newAudio.currentTime / newAudio.duration) * 100);
                }
            });

            newAudio.addEventListener('ended', () => {
                console.log("Audio ended");
                setIsPlaying(false);
                setProgress(0);
                setCurrentTime(0);
                checkAchievements(story.id);
            });

            setAudio(newAudio);
            setCurrentStory(story);
            setIsPlaying(true);

            const playPromise = newAudio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Playback started successfully");
                    })
                    .catch(e => {
                        console.error("Playback failed (Autoplay policy?):", e);
                        setIsPlaying(false);
                    });
            }

        } catch (err) {
            console.error("Error creating Audio object:", err);
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
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(e => {
                        console.error("Resume failed:", e);
                    });
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
        <PlayerContext.Provider value={{ currentStory, isPlaying, playStory, togglePlay, stopStory, progress, currentTime, duration, seek }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    return useContext(PlayerContext);
}
