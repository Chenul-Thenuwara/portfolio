"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, ExternalLink } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-center ${
        scrolled
          ? "bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--nav-border)] shadow-xl py-3"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-6xl flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 group text-foreground font-bold tracking-tight text-sm"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-walnut-light/40 group-hover:border-walnut-light bg-black/60 shadow-md group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(184,138,106,0.35)] transition-all duration-300 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Chenul Thenuwara Logo"
              width={36}
              height={36}
              priority
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="hidden sm:inline font-mono tracking-widest text-xs uppercase text-foreground/80 group-hover:text-foreground transition-colors">
            Chenul Thenuwara
          </span>
        </a>

        {/* Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="#projects"
            className="px-3 py-1.5 rounded-full text-xs font-mono text-foreground/70 hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="px-3 py-1.5 rounded-full text-xs font-mono text-foreground/70 hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 transition-colors"
          >
            Experience
          </a>
          <a
            href="#certificates"
            className="px-3 py-1.5 rounded-full text-xs font-mono text-foreground/70 hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 transition-colors"
          >
            Credentials
          </a>
        </nav>

        {/* Right side socials / status & Theme Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          <a
            href="https://github.com/Chenul-Thenuwara"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center"
            aria-label="GitHub Profile"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/Chenul-Thenuwara"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-full bg-walnut/30 border border-walnut-light/30 text-foreground hover:bg-walnut/60 transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            GitHub Profile
          </a>
        </div>
      </div>
    </motion.header>
  );
}
