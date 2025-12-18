import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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

export const metadata = {
    title: "Story Time with Ms. Erica",
    description: "Magical audio stories for little learners.",
};

export const viewport = {
    themeColor: '#EC4899',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
