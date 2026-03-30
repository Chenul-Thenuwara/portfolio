"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import KineticTitle from "./KineticTitle";

gsap.registerPlugin(ScrollTrigger);

// Load WebGL card only on client — no SSR (uses browser WebGL APIs)
const FluidImageCard = dynamic(
  () => import("@/components/webgl/FluidImageCard"),
  { ssr: false }
);

const projects = [
  {
    title: "Easy Idama",
    desc: "Sri Lankan real estate marketplace for land and property discovery.",
    tech: ["Next.js", "Firebase", "Tailwind"],
    color: "from-purple-950 to-[#0a0a0a]",
    accentColor: "#7c3aed",
    // Replace with real path once images are added: "/images/easy-idama.jpg"
    textureSrc: "",
  },
  {
    title: "StudyPlanner · Studee 2.0",
    desc: "Cloud-synced desktop productivity suite built with C# .NET and Firebase.",
    tech: ["C# .NET", "Firebase", "WPF"],
    color: "from-indigo-950 to-[#0a0a0a]",
    accentColor: "#4f46e5",
    textureSrc: "",
  },
  {
    title: "Self-Hosted Media Server",
    badge: "Final Year Project",
    desc: "Privacy-focused personal streaming and file management solution.",
    tech: ["Node.js", "FFmpeg", "React"],
    color: "from-blue-950 to-[#0a0a0a]",
    accentColor: "#2563eb",
    textureSrc: "",
  },
  {
    title: "My Flix",
    desc: "Cinematic movie discovery and ticket reservation hub.",
    tech: ["React", "TMDB API", "Stripe"],
    color: "from-rose-950 to-[#0a0a0a]",
    accentColor: "#e11d48",
    textureSrc: "",
  },
];

export default function ProjectCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const scrollElement = scrollRef.current!;
      const totalWidth = scrollElement.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;

      gsap.to(scrollElement, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--background)] overflow-hidden flex flex-col justify-center"
    >
      {/* Kinetic typography title */}
      <KineticTitle />

      <div
        ref={scrollRef}
        className="flex h-full items-center gap-12 w-max px-20 pt-20"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="group relative w-[70vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] rounded-2xl cursor-pointer overflow-hidden shadow-2xl shrink-0 border border-white/5"
            whileHover="hover"
          >
            {/* ── WebGL Fluid Distortion Layer ── */}
            {project.textureSrc ? (
              <FluidImageCard
                textureSrc={project.textureSrc}
                fallbackColor={project.accentColor}
              />
            ) : (
              /* Fallback gradient when no texture is provided yet */
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
                variants={{ hover: { scale: 1.04 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Noise texture overlay via CSS */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px",
                  }}
                />
                {/* Accent light bleed at top */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(ellipse at 50% -10%, ${project.accentColor}50, transparent 65%)`,
                  }}
                />
              </motion.div>
            )}

            {/* Cinematic overlay darkening */}
            <motion.div
              className="absolute inset-0 bg-black/50 mix-blend-multiply transition-all duration-500 ease-in-out"
              variants={{ hover: { opacity: 0.2 } }}
              initial={{ opacity: 1 }}
            />

            {/* Vignette — always on */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
              {project.badge && (
                <span className="self-start uppercase tracking-widest text-xs font-bold px-3 py-1 bg-walnut/80 text-foreground rounded-full mb-4 border border-walnut-light/30 backdrop-blur-md">
                  {project.badge}
                </span>
              )}

              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
                {project.title}
              </h3>

              <p className="text-foreground/70 font-light text-base mb-4">
                {project.desc}
              </p>

              {/* Tech stack pills */}
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{ hover: { opacity: 1, y: 0 } }}
                initial={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono tracking-widest px-2 py-1 rounded-full border border-white/10 text-foreground/60"
                    style={{ background: `${project.accentColor}15` }}
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Accent border glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px ${project.accentColor}00` }}
              variants={{
                hover: {
                  boxShadow: `inset 0 0 0 1px ${project.accentColor}60, 0 0 40px -5px ${project.accentColor}40`,
                },
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
