"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import HeroBackgroundCanvas from "./HeroBackgroundCanvas";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[var(--background)] pt-24 sm:pt-28 pb-12 sm:pb-16 px-6 md:px-12 border-b border-[var(--card-border)]"
    >
      {/* Subtle architectural background canvas */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-45"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
        }}
      >
        <HeroBackgroundCanvas />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between gap-10">
        {/* Top Editorial Metadata Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full py-3 border-y border-[var(--card-border)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-foreground/70"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-foreground font-medium">
              Associate Software Engineer
            </span>
            <span className="text-foreground/35">/</span>
            <span>Anunine Holdings</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-foreground/55">
            <span>BSc (Hons) Software Engineering · First Class</span>
            <span className="text-foreground/25">|</span>
            <span>Colombo, Sri Lanka</span>
          </div>
        </motion.div>

        {/* Main Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto py-4">
          {/* Left Column: Typography & Statement (8 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 flex flex-col items-start text-left"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-walnut-accent mb-4">
              Full-Stack Software Engineer &amp; System Architect
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-foreground leading-[1.04] mb-6">
              Chenul Dulmika
              <br />
              Thenuwara.
            </h1>

            <p className="text-base sm:text-lg text-foreground/75 font-normal max-w-2xl leading-relaxed mb-8">
              Architecting multi-tenant enterprise platforms, cross-platform desktop applications, and high-throughput local network systems. Promoted to{" "}
              <span className="text-foreground font-medium">
                Associate Software Engineer at Anunine Holdings
              </span>{" "}
              and graduating with{" "}
              <span className="text-foreground font-medium">
                First Class Honours in BSc (Hons) Software Engineering
              </span>{" "}
              from the University of Plymouth (UK) &amp; NSBM Green University.
            </p>

            {/* Structured Action Row */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-xs font-mono uppercase tracking-wider font-medium bg-foreground text-[var(--background)] hover:opacity-90 transition-opacity"
              >
                <span>Selected Works</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-xs font-mono uppercase tracking-wider text-foreground border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-foreground/30 transition-colors"
              >
                <span>Experience</span>
              </a>

              <a
                href="#certificates"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-xs font-mono uppercase tracking-wider text-foreground/80 border border-[var(--card-border)] hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                <span>Credentials</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Architectural Portrait Frame (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 w-full max-w-xs sm:max-w-sm mx-auto lg:ml-auto lg:mr-0"
          >
            <div className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg-solid)] p-3">
              <div className="relative aspect-[4/4.6] w-full rounded overflow-hidden bg-black border border-[var(--card-border)]">
                <Image
                  src="/images/profile.jpg"
                  alt="Chenul Dulmika Thenuwara"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 280px, 340px"
                  className="object-cover object-[50%_18%]"
                />
              </div>

              <div className="pt-3 mt-3 border-t border-[var(--card-border)] flex items-center justify-between text-[11px] font-mono text-foreground/60">
                <div>
                  <p className="text-foreground font-medium">CHENUL THENUWARA</p>
                  <p className="text-foreground/50">ASSOC. SOFTWARE ENGINEER</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/chenul-thenuwara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-[var(--card-border)] hover:border-foreground/30 text-foreground/75 hover:text-foreground transition-colors"
                >
                  <span>Profile</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Architectural Metrics Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="w-full pt-6 border-t border-[var(--card-border)] grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/45">
              01 / Current Role
            </span>
            <span className="text-sm sm:text-base font-semibold text-foreground">
              Associate Software Engineer
            </span>
            <span className="text-xs text-foreground/55">
              Anunine Holdings · Promoted Oct 2026
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/45">
              02 / Enterprise Scope
            </span>
            <span className="text-sm sm:text-base font-semibold text-foreground">
              10 Subsidiaries &amp; 5 Portals
            </span>
            <span className="text-xs text-foreground/55">
              Sole architect of group-wide ITSM &amp; Asset ERP
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/45">
              03 / Academic Standing
            </span>
            <span className="text-sm sm:text-base font-semibold text-foreground">
              First Class Honours
            </span>
            <span className="text-xs text-foreground/55">
              University of Plymouth (UK) · BSc (Hons) SE
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/45">
              04 / Core Stack
            </span>
            <span className="text-sm sm:text-base font-semibold text-foreground">
              Next.js 16 · React 19 · TS
            </span>
            <span className="text-xs text-foreground/55">
              Node.js, Electron, Firebase &amp; MongoDB
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
