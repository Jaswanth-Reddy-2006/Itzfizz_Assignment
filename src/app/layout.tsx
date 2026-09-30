import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ItzFizz — Scroll-Driven Hero Animation",
  description:
    "A premium scroll-driven hero section animation built with Next.js, GSAP, React, and Tailwind CSS.",
  keywords: [
    "ItzFizz",
    "scroll animation",
    "GSAP",
    "Next.js",
    "React",
    "Tailwind",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#f5f5f5] text-[#111] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
