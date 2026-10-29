import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
  metadataBase: new URL("https://www.chenul-thenuwara.tech"),
  title: "Chenul Dulmika Thenuwara | Full-Stack Software Developer",
  description:
    "Full-Stack Software Developer & Software Engineering Graduate (NSBM Green University & Plymouth University). Specializing in React, Next.js, TypeScript, Node.js, Electron, and local streaming systems.",
  keywords: [
    "Chenul Dulmika Thenuwara",
    "Associate Software Engineer",
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
      { url: "/images/logo-v2.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Chenul Dulmika Thenuwara | Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer & Software Engineering Graduate from NSBM Green University (Plymouth University, UK). Explore featured projects, professional experience, technical stack, and verified credentials.",
    url: "https://www.chenul-thenuwara.tech",
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
    canonical: "https://www.chenul-thenuwara.tech",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.chenul-thenuwara.tech/#person",
      name: "Chenul Dulmika Thenuwara",
      alternateName: ["Chenul Thenuwara", "Chenul"],
      jobTitle: "Associate Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Anunine Holdings",
      },
      description:
        "Full-Stack Software Developer & Software Engineering Graduate from NSBM Green University and Plymouth University (UK). Specializing in React, Next.js, TypeScript, Node.js, Electron, and local streaming systems.",
      url: "https://www.chenul-thenuwara.tech",
      image: "https://www.chenul-thenuwara.tech/images/profile.jpg",
      sameAs: [
        "https://github.com/Chenul-Thenuwara",
        "https://www.linkedin.com/in/chenul-thenuwara",
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "NSBM Green University",
          url: "https://www.nsbm.ac.lk",
        },
        {
          "@type": "EducationalOrganization",
          name: "University of Plymouth",
          url: "https://www.plymouth.ac.uk",
        },
      ],
      knowsAbout: [
        "Software Engineering",
        "Full-Stack Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Electron",
        "Enterprise Architecture",
      ],
      nationality: {
        "@type": "Country",
        name: "Sri Lanka",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.chenul-thenuwara.tech/#website",
      url: "https://www.chenul-thenuwara.tech",
      name: "Chenul Dulmika Thenuwara Portfolio",
      publisher: {
        "@id": "https://www.chenul-thenuwara.tech/#person",
      },
    },
  ],
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider>
          {/* Client-only: film grain overlay + custom cursor */}
          <ClientShell />

          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
