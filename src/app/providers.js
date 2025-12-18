"use client";
import { UserProvider } from "@/context/UserContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { SoundProvider } from "@/context/SoundContext";
import { CartProvider } from "@/context/CartContext";
import PlayerBar from '@/components/PlayerBar';

export function Providers({ children }) {
    return (
        <SoundProvider>
            <UserProvider>
                <PlayerProvider>
                    <CartProvider>
                        {children}
                        <PlayerBar />
                    </CartProvider>
                </PlayerProvider>
            </UserProvider>
        </SoundProvider>
    );
}
