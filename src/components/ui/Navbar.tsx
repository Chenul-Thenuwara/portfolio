"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 flex justify-center border-b ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-md border-[var(--nav-border)] py-3.5"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="w-full max-w-7xl flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-3 group text-foreground tracking-tight"
        >
          <div className="relative w-7 h-7 rounded-md overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg-solid)] flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Chenul Thenuwara"
              width={28}
              height={28}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground tracking-tight">
              Chenul Thenuwara
            </span>
            <span className="hidden lg:inline text-xs font-mono text-foreground/40">
              / Software Engineer
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-5 sm:gap-8">
          <a
            href="#projects"
            className="text-xs font-mono text-foreground/65 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span className="hidden sm:inline text-foreground/35">01</span>
            <span>Works</span>
          </a>
          <a
            href="#experience"
            className="text-xs font-mono text-foreground/65 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span className="hidden sm:inline text-foreground/35">02</span>
            <span>Experience</span>
          </a>
          <a
            href="#certificates"
            className="text-xs font-mono text-foreground/65 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span className="hidden sm:inline text-foreground/35">03</span>
            <span>Credentials</span>
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <a
            href="https://www.linkedin.com/in/chenul-thenuwara"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-md border border-[var(--card-border)] hover:border-foreground/30 text-foreground/75 hover:text-foreground transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-foreground/45" />
          </a>

          <a
            href="https://github.com/Chenul-Thenuwara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-md bg-foreground text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
