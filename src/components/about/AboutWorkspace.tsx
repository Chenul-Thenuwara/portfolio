"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Monitor,
  Volume2,
  Footprints,
  Compass,
  Gauge,
  MapPin,
} from "lucide-react";

export default function AboutWorkspace() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="workspace"
      ref={ref}
      className="relative w-full py-32 px-6 bg-[var(--background)] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-walnut/10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono tracking-[0.25em] uppercase text-walnut-light/90 block mb-3"
          >
            ✦ Engineering Environment &amp; Lifestyle
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-foreground"
          >
            Workstation &amp; Profile
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-foreground/60 font-light text-base mt-4"
          >
            A high-performance workspace engineered for deep focus, precision code inspection, and disciplined daily execution.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          
          {/* Card 1: Multi-Monitor Workstation (Col-span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 lg:col-span-2 rounded-2xl p-7 bg-gradient-to-br from-[rgba(32,24,22,0.7)] to-[rgba(16,14,14,0.8)] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-walnut-light/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-walnut/40 border border-walnut-light/30 flex items-center justify-center text-foreground">
                  <Monitor className="w-5 h-5 text-walnut-light" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/50">
                  Hardware Setup
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                Multi-Display Array &amp; Vertical Orientation
              </h3>
              <p className="text-foreground/70 text-sm font-light leading-relaxed mb-6">
                Configured with a dedicated vertical display for extended code review, compiler logs, and full-document inspection. Paired with <strong className="font-semibold text-foreground">Keychron mechanical keyboards</strong> for tactile typing accuracy.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-foreground/70">
                🖥️ Vertical Screen: Code Inspection
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-foreground/70">
                ⌨️ Keychron Mechanical Board
              </span>
            </div>
          </motion.div>

          {/* Card 2: Audio Engineering & Routing (Col-span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2 rounded-2xl p-7 bg-gradient-to-br from-[rgba(26,20,19,0.7)] to-[rgba(16,14,14,0.8)] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-walnut-light/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Volume2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/50">
                  Acoustic Tech
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                Multi-Channel Audio Routing
              </h3>
              <p className="text-foreground/70 text-sm font-light leading-relaxed mb-6">
                Engineered software-based multi-output management and real-time audio routing with latency-synchronized channel distribution across playback devices.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-foreground/70">
                🎛️ Real-Time Channel Routing
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-foreground/70">
                ⏱️ Latency Synchronization
              </span>
            </div>
          </motion.div>

          {/* Card 3: 18k Daily Fitness Metric */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl p-7 bg-gradient-to-br from-[rgba(20,28,24,0.7)] to-[rgba(14,16,14,0.8)] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Footprints className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Daily Habit
                </span>
              </div>

              <div className="text-3xl font-black text-foreground mb-1">
                18,000 <span className="text-sm font-medium text-foreground/50">steps</span>
              </div>
              <p className="text-foreground/70 text-xs font-light leading-relaxed">
                Consistent daily walking target for mental clarity, physical stamina, and developer balance.
              </p>
            </div>

            <div className="w-full bg-white/5 rounded-full h-2 mt-4 overflow-hidden border border-white/5">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[90%] rounded-full" />
            </div>
          </motion.div>

          {/* Card 4: Local & Global Travel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="rounded-2xl p-7 bg-gradient-to-br from-[rgba(30,22,28,0.7)] to-[rgba(16,14,15,0.8)] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-purple-500/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Exploration
                </span>
              </div>

              <h4 className="text-base font-bold text-foreground mb-1">Travel &amp; Nature</h4>
              <p className="text-foreground/70 text-xs font-light leading-relaxed">
                Recharging in the misty mountain trails of <strong className="text-foreground font-medium">Nuwara Eliya</strong> with an international journey goal of <strong className="text-foreground font-medium">Helsinki, Finland</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-purple-300/80">
              <MapPin className="w-3.5 h-3.5" /> Nuwara Eliya → Helsinki
            </div>
          </motion.div>

          {/* Card 5: Automotive Dynamics & Paddle Shifters (Col-span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="md:col-span-2 lg:col-span-2 rounded-2xl p-7 bg-gradient-to-br from-[rgba(32,20,18,0.7)] to-[rgba(16,14,14,0.8)] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-rose-500/40 transition-all duration-500 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/50">
                  Automotive Passion
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">
                Performance Dynamics &amp; Enthusiast Driving
              </h3>
              <p className="text-foreground/70 text-sm font-light leading-relaxed">
                Appreciation for engine performance, trim configurations, and responsive paddle-shift automatic gearboxes. The balance of mechanical feedback and rapid actuation mirrors low-latency software design.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5 mt-4">
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-foreground/70">
                🏎️ Performance Vehicle Dynamics
              </span>
              <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-foreground/70">
                ⚡ Steering Wheel Paddle Shifters
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
