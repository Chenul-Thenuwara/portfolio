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
  metadataBase: new URL("https://chenul-thenuwara.tech"),
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Chenul Dulmika Thenuwara | Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer & Software Engineering Graduate from NSBM Green University (Plymouth University, UK). Explore featured projects, professional experience, technical stack, and verified credentials.",
    url: "https://chenul-thenuwara.tech",
    siteName: "Chenul Dulmika Thenuwara Portfolio",
    images: [
      {
        url: "/images/logo.png",
        width: 1024,
        height: 1024,
        alt: "Chenul Dulmika Thenuwara Logo",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://chenul-thenuwara.tech",
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
