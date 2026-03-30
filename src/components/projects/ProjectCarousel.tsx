"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Easy Idama",
    desc: "Sri Lankan real estate marketplace for land and property discovery.",
    color: "from-purple-900",
  },
  {
    title: "StudyPlanner-Studee2.0",
    desc: "Cloud-synced desktop productivity suite built with C# .NET and Firebase.",
    color: "from-indigo-900",
  },
  {
    title: "Self-Hosted Media Server",
    badge: "Final Year Project",
    desc: "Privacy-focused personal streaming and file management solution.",
    color: "from-blue-900",
  },
  {
    title: "My Flix",
    desc: "Cinematic movie discovery and ticket reservation hub.",
    color: "from-rose-900",
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
      <h2 className="absolute top-20 left-12 text-5xl md:text-6xl font-black text-foreground z-10">
        Selected Works.
      </h2>

      <div
        ref={scrollRef}
        className="flex h-full items-center gap-12 w-max px-20 pt-20"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="group relative w-[70vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] rounded-2xl cursor-pointer overflow-hidden shadow-2xl shrink-0"
            whileHover="hover"
          >
            {/* Base Image Container with 'dark, cinematic filter' */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} to-[var(--deep-dark)]`}
              variants={{
                hover: { scale: 1.05 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Cinematic CSS Filter layer */}
            <motion.div
              className="absolute inset-0 bg-black/60 mix-blend-multiply transition-all duration-500 ease-in-out group-hover:opacity-0"
            />
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              {project.badge && (
                <span className="self-start uppercase tracking-widest text-xs font-bold px-3 py-1 bg-walnut/80 text-foreground rounded-full mb-4 border border-walnut-light/30 backdrop-blur-md">
                  {project.badge}
                </span>
              )}
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-foreground/70 font-light text-lg">
                {project.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
