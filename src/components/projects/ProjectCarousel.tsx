"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import KineticTitle from "./KineticTitle";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  role: string;
  badge?: string;
  desc: string;
  tech: string[];
  color: string;
  accentColor: string;
  textureSrc: string;
}

const projects: ProjectItem[] = [
  {
    title: "Self-Hosted Media Server",
    role: "Lead Developer (Individual Project)",
    badge: "Final Year Project",
    desc: "Dedicated server-client streaming system engineered exclusively for local media libraries across a local area network (LAN), operating strictly without external streaming dependencies.",
    tech: ["Node.js", "Express.js", "React", "Electron", "LAN Streaming", "Local Storage"],
    color: "from-blue-950 to-[#0a0a0a]",
    accentColor: "#3b82f6",
    textureSrc: "/images/projects/media-server-discover.png",
  },
  {
    title: "Enterprise IT Service & Asset Portal",
    role: "Full-Stack Engineer",
    badge: "Enterprise Platform",
    desc: "Enterprise-grade web platform engineered for IT asset lifecycle management, hardware inventory tracking, and internal service management workflows.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST API", "Asset Management"],
    color: "from-emerald-950 to-[#0a0a0a]",
    accentColor: "#10b981",
    textureSrc: "/images/projects/enterprise-asset-portal.jpg",
  },
  {
    title: "My Flix",
    role: "Full-Stack Collaborative Developer",
    badge: "Collaborative Project",
    desc: "Full-stack movie ticket booking and cinema reservation web application featuring interactive seat mapping, showtime scheduling, and MERN integration.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "MERN Stack"],
    color: "from-rose-950 to-[#0a0a0a]",
    accentColor: "#f43f5e",
    textureSrc: "/images/projects/my-flix.jpg",
  },
  {
    title: "StudyPlanner · Studee 2.0",
    role: "Contributor & Maintainer",
    badge: "Open Source",
    desc: "Open-source digital study organizer and academic productivity tool engineered for student scheduling, assignment tracking, and structured study workflows.",
    tech: ["C# .NET", "TypeScript", "React", "Desktop Apps", "Git"],
    color: "from-purple-950 to-[#0a0a0a]",
    accentColor: "#8b5cf6",
    textureSrc: "/images/projects/study-planner.jpg",
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
      id="projects"
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
            className="group relative w-[70vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] rounded-2xl cursor-pointer overflow-hidden shadow-2xl shrink-0 border border-white/10 bg-[#120d0c]"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Image Layer */}
            <div className="absolute inset-0 overflow-hidden bg-black">
              {project.textureSrc ? (
                <Image
                  src={project.textureSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 70vw, (max-width: 1200px) 45vw, 35vw"
                  className="object-cover object-top opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                  priority={idx < 2}
                />
              ) : null}

              {/* Gradient tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 mix-blend-overlay`}
              />

              {/* Radial accent illumination */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}50, transparent 70%)`,
                }}
              />
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {project.badge && (
                  <span
                    className="uppercase tracking-widest text-[10px] font-bold px-3 py-1 rounded-full border backdrop-blur-md"
                    style={{
                      backgroundColor: `${project.accentColor}25`,
                      borderColor: `${project.accentColor}60`,
                      color: "#ffffff",
                    }}
                  >
                    {project.badge}
                  </span>
                )}
                <span className="text-xs font-mono text-white/90 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                  {project.role}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">
                {project.title}
              </h3>

              <p className="text-foreground/75 font-light text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                {project.desc}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border border-white/15 text-foreground/90 bg-white/10 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Accent border glow on hover */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]"
              style={{
                boxShadow: `inset 0 0 0 1px ${project.accentColor}40`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
