"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
    const [isEnabled, setIsEnabled] = useState(true);

    // In a real app, you'd load these audio files
    // const popSound = new Audio('/sounds/pop.mp3');
    // const clickSound = new Audio('/sounds/click.mp3');

    const playSound = (type = 'click') => {
        if (!isEnabled) return;

        // Mocking sound playback for now since we don't have files
        // In reality:
        // if (type === 'pop') popSound.play();
        // else clickSound.play();

        // console.log(`🎵 Sound played: ${type}`);
    };

    const toggleSound = () => setIsEnabled(!isEnabled);

    return (
        <SoundContext.Provider value={{ playSound, toggleSound, isEnabled }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    return useContext(SoundContext);
}
