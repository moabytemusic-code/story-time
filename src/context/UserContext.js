"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Gamification State (Local for now, could be moved to DB 'profiles' table later)
    const [settings, setSettings] = useState({ bgMusic: true, autoplay: false });
    const [stats, setStats] = useState({ storiesCompleted: 0, totalMinutes: 0, streakDays: 3 });
    const [unlockedAchievements, setUnlockedAchievements] = useState([1, 2]);

    useEffect(() => {
        if (!supabase) {
            // If no Supabase, keep mock user for demo purposes if desired, or null
            // setUser({ name: "Demo User", email: "demo@example.com" });
            setLoading(false);
            return;
        }

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        if (!supabase) throw new Error("Supabase not configured");
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    const signup = async (email, password, name) => {
        if (!supabase) throw new Error("Supabase not configured");
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    const updateUser = async (updates) => {
        if (!supabase) return;
        // 1. Update Supabase Auth Metadata (if name changed)
        if (updates.name) {
            const { data, error } = await supabase.auth.updateUser({
                data: { full_name: updates.name }
            });
            if (error) throw error;
            // The onAuthStateChange listener should pick up the change, but we can optimistically update if needed
        }

        // 2. If you wanted to update the 'profiles' table locally from here, you could too.
        // For now, let's assume auth metadata is the source of truth for name.
    };

    const updateSettings = (updates) => setSettings(prev => ({ ...prev, ...updates }));

    const checkAchievements = (storyId) => {
        // Simple mock achievement logic
        const newCompleted = stats.storiesCompleted + 1;
        let newUnlocks = [...unlockedAchievements];
        if (newCompleted >= 5 && !newUnlocks.includes(2)) newUnlocks.push(2);
        setStats(prev => ({ ...prev, storiesCompleted: newCompleted }));
        setUnlockedAchievements(newUnlocks);
    };

    return (
        <UserContext.Provider value={{
            user, login, signup, logout, updateUser, loading,
            settings, updateSettings,
            stats, checkAchievements, unlockedAchievements
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
