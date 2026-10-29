"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-12 flex flex-col items-center border-b ${
        scrolled || mobileMenuOpen
          ? "bg-[var(--nav-bg)] backdrop-blur-md border-[var(--nav-border)] py-3"
          : "bg-transparent border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="w-full max-w-7xl flex items-center justify-between gap-3">
        {/* Brand */}
        <a
          href="#"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 sm:gap-3 group text-foreground tracking-tight min-w-0"
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
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-sm text-foreground tracking-tight truncate">
              Chenul Thenuwara
            </span>
            <span className="hidden lg:inline text-xs font-mono text-foreground/40">
              / Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#projects"
            className="text-xs font-mono text-foreground/65 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span className="text-foreground/35">01</span>
            <span>Works</span>
          </a>
          <a
            href="#experience"
            className="text-xs font-mono text-foreground/65 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span className="text-foreground/35">02</span>
            <span>Experience</span>
          </a>
          <a
            href="#certificates"
            className="text-xs font-mono text-foreground/65 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <span className="text-foreground/35">03</span>
            <span>Credentials</span>
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
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
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-md bg-foreground text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-8 h-8 rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden w-full max-w-7xl pt-4 pb-2 mt-3 border-t border-[var(--card-border)] flex flex-col gap-1">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-2 rounded-md text-xs font-mono text-foreground/80 hover:text-foreground hover:bg-[var(--card-bg)] transition-colors"
          >
            <span>01 / Selected Works</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40" />
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-2 rounded-md text-xs font-mono text-foreground/80 hover:text-foreground hover:bg-[var(--card-bg)] transition-colors"
          >
            <span>02 / Experience &amp; Education</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40" />
          </a>
          <a
            href="#certificates"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-2 rounded-md text-xs font-mono text-foreground/80 hover:text-foreground hover:bg-[var(--card-bg)] transition-colors"
          >
            <span>03 / Verified Credentials</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-foreground/40" />
          </a>

          <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-[var(--card-border)]">
            <a
              href="https://www.linkedin.com/in/chenul-thenuwara"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-mono py-2.5 px-3 rounded-md border border-[var(--card-border)] text-foreground/80 hover:text-foreground"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/Chenul-Thenuwara"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-mono py-2.5 px-3 rounded-md bg-foreground text-[var(--background)] font-medium"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
