import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Background from "@/components/Background";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Vedant | Frontend Developer",
    description: "Frontend developer specializing in React, Next.js, and modern web technologies. Creating premium digital experiences with clean code and smooth animations.",
    keywords: ["Frontend Developer", "React", "Next.js", "Tailwind CSS", "Web Developer", "Portfolio"],
    authors: [{ name: "Vedant" }],
    openGraph: {
        title: "Vedant | Frontend Developer",
        description: "Frontend developer specializing in React, Next.js, and modern web technologies.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
            <body className="font-body antialiased min-h-screen bg-background text-primary">
                <Background />
                <Cursor />
                <Navbar />
                <main className="relative z-10">
                    {children}
                </main>
            </body>
        </html>
    );
}
