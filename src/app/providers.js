"use client";
import { UserProvider } from "@/context/UserContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { SoundProvider } from "@/context/SoundContext";
import PlayerBar from '@/components/PlayerBar';

export function Providers({ children }) {
    return (
        <SoundProvider>
            <UserProvider>
                <PlayerProvider>
                    {children}
                    <PlayerBar />
                </PlayerProvider>
            </UserProvider>
        </SoundProvider>
    );
}
