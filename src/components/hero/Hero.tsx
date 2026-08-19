"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--deep-dark)] py-28"
    >
      {/* Subtle Background Particles/Gradients */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-walnut/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-walnut-light/10 rounded-full blur-[150px]"
        />
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
              src="/images/headshot.jpg"
              alt="Chenul Dulmika Thenuwara"
              width={128}
              height={128}
              priority
              className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition duration-500"
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
            Full-Stack Developer Intern @ Anunine Holdings
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
          BSc (Hons) Software Engineering Graduate from{" "}
          <span className="text-walnut-light font-medium">NSBM Green University</span>{" "}
          in partnership with{" "}
          <span className="text-foreground font-medium">Plymouth University (UK)</span>.
          Specializing in scalable web ecosystems, cross-platform desktop software, and local-network streaming architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-foreground text-[var(--background)] hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(230,224,212,0.2)]"
          >
            Explore Projects
          </a>
          <a
            href="#experience"
            className="px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-white/5 border border-white/15 text-foreground hover:bg-white/10 hover:border-walnut-light/60 transition-all duration-300 backdrop-blur-sm"
          >
            Experience &amp; Career
          </a>
          <a
            href="#certificates"
            className="px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-walnut/30 border border-walnut-light/40 text-foreground/90 hover:bg-walnut/50 transition-all duration-300 backdrop-blur-sm"
          >
            Credentials &amp; Certifications
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
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
    </section>
  );
}
