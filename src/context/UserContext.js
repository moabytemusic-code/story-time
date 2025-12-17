"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    // Persist state to localStorage in a real app, strict mode/server rendering makes this tricky without useEffect
    const [user, setUser] = useState({
        name: "Alex",
        age: 5,
        avatar: "🦁"
    });

    const [settings, setSettings] = useState({
        bgMusic: true,
        autoplay: false
    });

    const [stats, setStats] = useState({
        storiesCompleted: 0,
        totalMinutes: 0,
        streakDays: 3
    });

    const [unlockedAchievements, setUnlockedAchievements] = useState([1, 2]); // IDs of unlocked achievements

    // Mock function to update user
    const updateUser = (updates) => setUser(prev => ({ ...prev, ...updates }));
    const updateSettings = (updates) => setSettings(prev => ({ ...prev, ...updates }));

    // Logic to unlock achievements
    const checkAchievements = (storyId) => {
        // Example logic: Unlock 'Bookworm' (id: 2) if completed 5 stories
        const newCompleted = stats.storiesCompleted + 1;

        let newUnlocks = [...unlockedAchievements];
        if (newCompleted >= 5 && !newUnlocks.includes(2)) {
            newUnlocks.push(2); // Unlock Bookworm
            // In a real app, trigger a toast notification here
        }
        if (newCompleted >= 10 && !newUnlocks.includes(4)) {
            newUnlocks.push(4); // Unlock Super Listener
        }

        setStats(prev => ({ ...prev, storiesCompleted: newCompleted }));
        setUnlockedAchievements(newUnlocks);
    };

    return (
        <UserContext.Provider value={{
            user, updateUser,
            settings, updateSettings,
            stats, checkAchievements,
            unlockedAchievements
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
