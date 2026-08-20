"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import HeroBackgroundCanvas from "./HeroBackgroundCanvas";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking with smooth spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 140 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax shifts for side ambient light orbs
  const leftOrbX = useTransform(smoothX, [0, 1920], [-35, 35]);
  const leftOrbY = useTransform(smoothY, [0, 1080], [-25, 25]);
  const rightOrbX = useTransform(smoothX, [0, 1920], [35, -35]);
  const rightOrbY = useTransform(smoothY, [0, 1080], [25, -25]);

  // Scroll parallax for content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseX.set(e.touches[0].clientX - r.left);
      mouseY.set(e.touches[0].clientY - r.top);
    };

    const section = containerRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("touchstart", handleTouchMove, { passive: true });
      section.addEventListener("touchmove", handleTouchMove, { passive: true });
    }
    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("touchstart", handleTouchMove);
        section.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--deep-dark)] py-28 cursor-default"
    >
      {/* ── 1. Interactive Physics Particle & Constellation Canvas ── */}
      <HeroBackgroundCanvas />

      {/* ── 2. Interactive Mouse Spotlight Glow ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) =>
              `radial-gradient(800px circle at ${x}px ${y}px, rgba(93, 64, 55, 0.25), rgba(59, 130, 246, 0.08) 45%, transparent 75%)`
          ),
        }}
      />

      {/* ── 3. Atmospheric Side Glow Orbs with Parallax ── */}
      <motion.div
        style={{ x: leftOrbX, y: leftOrbY }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/4 -left-32 w-[550px] h-[550px] bg-walnut/30 rounded-full blur-[130px]"
      />

      <motion.div
        style={{ x: rightOrbX, y: rightOrbY }}
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute bottom-1/4 -right-32 w-[620px] h-[620px] bg-blue-900/15 rounded-full blur-[150px]"
      />

      {/* ── 4. Side Engineering Telemetry & Accents ── */}
      {/* Left side telemetry */}
      <div className="pointer-events-none absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 text-[10px] font-mono tracking-widest text-foreground/25 select-none z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-ping" />
          <span>PORTFOLIO // V2.6</span>
        </div>
        <div className="w-px h-28 bg-gradient-to-b from-white/10 via-walnut-light/40 to-transparent" />
        <span className="rotate-90 origin-left translate-y-10 text-foreground/20">
          LAT 6.9271° N · SRI LANKA
        </span>
      </div>

      {/* Right side telemetry */}
      <div className="pointer-events-none absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-6 text-[10px] font-mono tracking-widest text-foreground/25 select-none z-10">
        <div className="flex items-center gap-2">
          <span>NEXT 16 · REACT 19</span>
          <span className="w-2 h-2 rounded-full bg-walnut-light/80" />
        </div>
        <div className="w-px h-28 bg-gradient-to-b from-white/10 via-blue-500/40 to-transparent" />
        <span className="-rotate-90 origin-right translate-y-10 text-foreground/20">
          ENTERPRISE ARCHITECTURE
        </span>
      </div>



      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl"
      >
        {/* Profile Avatar */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative mb-5 group"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-walnut-light via-foreground/20 to-walnut blur-md opacity-60 group-hover:opacity-100 transition duration-500" />
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
            <Image
              src="/images/profile.jpg"
              alt="Chenul Dulmika Thenuwara"
              width={140}
              height={140}
              priority
              className="w-full h-full object-cover object-[50%_18%] scale-105 group-hover:scale-110 transition duration-500"
            />
          </div>
        </motion.div>

        {/* Status Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-walnut/40 text-foreground/90 border border-walnut-light/30 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Information Technology Intern @ Anunine Holdings
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider bg-white/5 text-foreground/70 border border-white/10 backdrop-blur-md">
            📍 Sri Lanka
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-4"
        >
          Chenul Dulmika <br className="hidden sm:block" />
          Thenuwara
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e6e0d4] via-[#d7ccc8] to-[#a1887f] mb-4"
        >
          Full-Stack Software Developer
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-base sm:text-lg text-foreground/75 font-light max-w-2xl leading-relaxed mb-8"
        >
          BSc (Hons) Software Engineering Graduate{" "}
          <span className="text-walnut-light font-medium">(First Class Honours · Graduating Dec 2026)</span>{" "}
          from <span className="text-foreground font-medium">NSBM Green University</span> in partnership with{" "}
          <span className="text-foreground font-medium">University of Plymouth (UK)</span>.
          Specializing in scalable web ecosystems, cross-platform desktop software, and local-network streaming architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full max-w-2xl mx-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center text-center bg-foreground text-[var(--background)] hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(230,224,212,0.2)]"
          >
            Explore Projects
          </a>
          <a
            href="#experience"
            className="w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center text-center bg-white/5 border border-white/15 text-foreground hover:bg-white/10 hover:border-walnut-light/60 transition-all duration-300 backdrop-blur-sm"
          >
            Experience
          </a>
          <a
            href="#certificates"
            className="w-full sm:w-48 py-3 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center text-center bg-walnut/30 border border-walnut-light/40 text-foreground/90 hover:bg-walnut/50 transition-all duration-300 backdrop-blur-sm"
          >
            Credentials
          </a>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-foreground/40">
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-foreground/20 overflow-hidden relative">
            <motion.div
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 w-full h-full bg-walnut-light"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Smooth bottom gradient transition to Selected Works */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-[var(--deep-dark)]/80 to-[var(--background)] pointer-events-none z-10" />
    </section>
  );
}
