"use client";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { SoundProvider } from "@/context/SoundContext";
import PlayerBar from '@/components/PlayerBar';

const fredoka = Fredoka({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-fredoka",
});

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700", "800"],
    variable: "--font-nunito",
});

// Metadata can't be exported from a "use client" file.
// We need to separate layout logic if we want metadata + client providers.
// OR just make this a client component and lose automatic metadata injection (or handle it in a separate layout.server.js if Next.js supported it easily).
// However, the current file is server component by default (no "use client" at top), but I am adding Context logic which uses React hooks.
// Best Practice: Create a "Providers" component.

export const viewport = {
    themeColor: '#EC4899',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevents zooming, app-like feel
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
                <Providers>
                    {children}
                    <PlayerBar />
                </Providers>
            </body>
        </html>
    );
}

function Providers({ children }) {
    return (
        <SoundProvider>
            <UserProvider>
                <PlayerProvider>
                    {children}
                </PlayerProvider>
            </UserProvider>
        </SoundProvider>
    )
}
