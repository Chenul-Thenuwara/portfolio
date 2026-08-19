import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ClientShell from "@/components/ui/ClientShell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chenul Dulmika Thenuwara | Full-Stack Software Developer",
  description:
    "Full-Stack Software Developer & Software Engineering Graduate (NSBM Green University & Plymouth University). Specializing in React, Next.js, TypeScript, Node.js, Electron, and local streaming systems.",
  keywords: [
    "Chenul Dulmika Thenuwara",
    "Full-Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Electron",
    "Sri Lanka Developer",
  ],
  authors: [{ name: "Chenul Dulmika Thenuwara" }],
  openGraph: {
    title: "Chenul Dulmika Thenuwara | Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer & Software Engineering Graduate from NSBM Green University (Plymouth University, UK). Explore featured projects, professional experience, technical stack, and verified credentials.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {/* Client-only: film grain overlay + custom cursor */}
        <ClientShell />

        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
