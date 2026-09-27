import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShilpMitra — Your Craft. Your Story. Your Market.",
  description:
    "ShilpMitra is an AI-powered digital platform designed to help traditional artisans and weavers digitize, present, market, and sell their crafts effortlessly.",
  keywords: [
    "ShilpMitra",
    "Artisans",
    "Indian Handloom",
    "Handicrafts",
    "AI Product Photography",
    "Craft Storytelling",
    "Smart Pricing",
    "Sahayak Voice Assistant",
    "Vocal for Local",
    "Digital India",
  ],
  authors: [{ name: "ShilpMitra Team" }],
  openGraph: {
    title: "ShilpMitra — AI-Powered Digital Companion for Artisans",
    description: "Your Craft. Your Story. Your Market. Empowering India's master craftspeople through inclusive AI.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-[#FDFBF7] text-[#1A1513] antialiased selection:bg-[#E86C1F]/20 selection:text-[#E86C1F]">
        {children}
      </body>
    </html>
  );
}
