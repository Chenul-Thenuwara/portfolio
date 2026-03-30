"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "IT Intern",
    company: "Anunine Holdings",
    date: "Current",
    active: true,
  },
  {
    role: "Full Stack Developer",
    company: "Algoarts",
    date: "Aug 2025 - Feb 2026",
    active: false,
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
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0.2, filter: "brightness(0.5)" },
          {
            opacity: 1,
            filter: "brightness(1)",
            scrollTrigger: {
              trigger: item,
              start: "top 60%",
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
      ref={containerRef}
      className="relative w-full py-40 flex flex-col items-center bg-[var(--background)] px-6"
    >
      <div className="absolute top-0 w-full h-[200px] bg-gradient-to-b from-[var(--deep-dark)] to-transparent pointer-events-none z-10" />

      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-24 z-10 text-foreground">
        Experience
      </h2>

      <div className="relative w-full max-w-4xl mx-auto flex flex-col z-10">
        {/* Background invisible line */}
        <div className="absolute left-1/2 md:left-1/2 -ml-[1px] w-[2px] h-full bg-walnut-light/20" />

        {/* The drawing line */}
        <div
          ref={lineRef}
          className="absolute left-[calc(50%-1px)] md:left-[calc(50%-1px)] top-0 w-[2px] bg-walnut-light h-0"
        />

        {experiences.map((exp, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className={`relative mb-24 w-full flex item-center justify-between ${
                isEven ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* the timeline dot */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground border-4 border-[var(--background)] shadow-[0_0_15px_rgba(255,255,255,0.2)] z-10" />

              <div className={`w-[45%] flex flex-col ${isEven ? "items-start text-left" : "items-end text-right"}`}>
                <div className="bg-dark-accent p-8 rounded-xl border border-white/5 shadow-2xl relative">
                  <span className="text-walnut-light text-sm font-mono tracking-widest font-semibold block mb-2">
                    {exp.date}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    {exp.role}
                    {exp.active && (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    )}
                  </h3>
                  <p className="text-foreground/70 text-lg mt-1 font-light">
                    {exp.company}
                  </p>
                </div>
              </div>

              <div className="w-[45%]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
