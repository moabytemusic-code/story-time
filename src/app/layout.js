import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

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
    description: "Magical stories for little learners.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
