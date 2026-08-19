"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  role: string;
  organization: string;
  category: "Experience" | "Education" | "Community";
  date: string;
  active: boolean;
  description: string;
  tags: string[];
}

const timelineData: TimelineEntry[] = [
  {
    role: "Full-Stack Developer Intern",
    organization: "Anunine Holdings",
    category: "Experience",
    date: "April 2026 – Present",
    active: true,
    description:
      "End-to-end full-stack software development, production feature integration, internal tooling, and daily sprint delivery within enterprise engineering workflows.",
    tags: ["Full-Stack", "Feature Integration", "Internal Tools", "Agile Sprints"],
  },
  {
    role: "BSc (Hons) in Software Engineering",
    organization: "NSBM Green University · Plymouth University (UK)",
    category: "Education",
    date: "Graduated · April 2026",
    active: false,
    description:
      "Completed final undergraduate group presentation and graduated with honors. Built the self-hosted local media server as final year engineering project.",
    tags: ["Degree Completed", "Final Year Project", "Distributed Systems", "Software Architecture"],
  },
  {
    role: "Community Participant",
    organization: "Microsoft Learn Student Ambassadors (MLSA) Sri Lanka",
    category: "Community",
    date: "February 2026",
    active: false,
    description:
      "Active participant in the MLSA Sri Lanka tech community summit, engaging in sessions on cloud computing, modern developer ecosystems, and student innovation.",
    tags: ["Cloud Tech", "Community", "Developer Ecosystem"],
  },
  {
    role: "Full Stack Developer",
    organization: "Algoarts",
    category: "Experience",
    date: "Aug 2025 – Feb 2026",
    active: false,
    description:
      "Engineered responsive full-stack applications, interactive UI components, and API integration layers using React, TypeScript, and Node.js.",
    tags: ["React", "TypeScript", "Node.js", "API Design"],
  },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Draw the central line
      gsap.to(lineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      // Illuminate nodes
      itemsRef.current.forEach((item) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0.2, y: 30, filter: "brightness(0.6)" },
          {
            opacity: 1,
            y: 0,
            filter: "brightness(1)",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-36 flex flex-col items-center bg-[var(--background)] px-6 overflow-hidden"
    >
      <div className="absolute top-0 w-full h-[180px] bg-gradient-to-b from-[var(--deep-dark)] to-transparent pointer-events-none z-10" />

      <div className="z-10 text-center max-w-2xl mb-24">
        <span className="text-xs font-mono tracking-[0.25em] uppercase text-walnut-light/80 block mb-3">
          ✦ Career &amp; Milestones
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Experience &amp; Education
        </h2>
        <p className="text-foreground/50 font-light text-base mt-4">
          Professional industry delivery, academic graduation, and active tech community engagement.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto flex flex-col z-10">
        {/* Background track line */}
        <div className="hidden md:block absolute left-1/2 -ml-[1px] w-[2px] h-full bg-white/10" />

        {/* The active drawing line */}
        <div
          ref={lineRef}
          className="hidden md:block absolute left-[calc(50%-1px)] top-0 w-[2px] bg-gradient-to-b from-walnut-light via-walnut to-walnut-light h-0"
        />

        {timelineData.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className={`relative mb-16 md:mb-24 w-full flex flex-col md:flex-row items-center justify-between ${
                isEven ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Central timeline indicator dot (desktop) */}
              <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--background)] border-2 border-walnut-light items-center justify-center z-20 shadow-[0_0_15px_rgba(93,64,55,0.4)]">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.active ? "bg-emerald-400 animate-pulse" : "bg-walnut-light"
                  }`}
                />
              </div>

              {/* Content Card */}
              <div
                className={`w-full md:w-[46%] flex flex-col ${
                  isEven ? "md:items-start md:text-left" : "md:items-end md:text-right"
                }`}
              >
                <div className="w-full bg-[rgba(26,20,19,0.7)] backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl hover:border-walnut-light/30 transition-all duration-300 group">
                  <div
                    className={`flex flex-wrap items-center gap-2 mb-3 ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <span className="text-walnut-light text-xs font-mono tracking-widest font-semibold">
                      {item.date}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-foreground/60">
                      {item.category}
                    </span>
                  </div>

                  <h3
                    className={`text-xl sm:text-2xl font-bold text-foreground flex flex-wrap items-center gap-3 ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <span>{item.role}</span>
                    {item.active && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                    )}
                  </h3>

                  <p className="text-walnut-light/90 text-sm sm:text-base mt-1 font-medium">
                    {item.organization}
                  </p>

                  <p className="text-foreground/70 text-sm mt-3 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div
                    className={`flex flex-wrap gap-1.5 mt-4 ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-foreground/50 group-hover:text-foreground/80 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer on opposite side */}
              <div className="hidden md:block w-[46%]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
