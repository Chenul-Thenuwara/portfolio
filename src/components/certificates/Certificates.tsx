"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  title: string;
  issuer: string;
  issuerShort: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  color: string;
  accentColor: string;
  icon: string; // emoji / letter mark fallback
}

const certificates: Certificate[] = [
  {
    title: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    issuerShort: "Cisco",
    date: "2024",
    verifyUrl: "https://www.credly.com/org/cisco/badge/ccna",
    color: "from-blue-900/80",
    accentColor: "#00B4D8",
    icon: "C",
  },
  {
    title: "Diploma in Network Engineering with Security",
    issuer: "SLIIT",
    issuerShort: "SLIIT",
    date: "2023",
    color: "from-blue-950/80",
    accentColor: "#0C4A6E",
    icon: "S",
  },
  {
    title: "HackerRank Problem Solving (Intermediate)",
    issuer: "HackerRank",
    issuerShort: "HackerRank",
    date: "2024",
    verifyUrl: "https://www.hackerrank.com/certificates/",
    color: "from-green-900/80",
    accentColor: "#2EC866",
    icon: "H",
  },
  {
    title: "Postman Student Expert",
    issuer: "Postman",
    issuerShort: "Postman",
    date: "2024",
    verifyUrl: "https://badgr.com/public/assertions/",
    color: "from-orange-900/80",
    accentColor: "#FF6C37",
    icon: "P",
  },
  {
    title: "React - The Complete Guide",
    issuer: "Udemy",
    issuerShort: "Udemy",
    date: "2024",
    color: "from-purple-900/80",
    accentColor: "#A435F0",
    icon: "R",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    issuerShort: "fCC",
    date: "2023",
    verifyUrl: "https://www.freecodecamp.org/certification/",
    color: "from-yellow-900/80",
    accentColor: "#FECA57",
    icon: "JS",
  },
  {
    title: "Foundations of Google Cloud",
    issuer: "Google Cloud",
    issuerShort: "Google",
    date: "2024",
    color: "from-blue-900/80",
    accentColor: "#4285F4",
    icon: "G",
  },
  {
    title: "BSc (Hons) Software Engineering (Plymouth)",
    issuer: "University of Plymouth",
    issuerShort: "Plymouth",
    date: "In Progress",
    color: "from-red-900/80",
    accentColor: "#D11141",
    icon: "P",
  },
];

export default function Certificates() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered card entrance
      gsap.from(gridRef.current?.children ?? [], {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-6 bg-[var(--background)] overflow-hidden"
    >
      {/* Top blend from project carousel */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#0c0c0c] to-transparent pointer-events-none" />

      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-walnut/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 flex flex-col gap-4">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-walnut-light/60">
            ✦ Credentials
          </span>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-black tracking-tight text-foreground"
          >
            Certificates &amp; Courses
          </h2>
          <p className="text-foreground/50 font-light max-w-lg text-base">
            Continuous learning across full-stack development, cloud, and computer science fundamentals.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              className="group relative rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm"
              style={{ background: "rgba(26,15,14,0.6)" }}
              whileHover={{
                y: -6,
                scale: 1.015,
                boxShadow: `0 20px 50px -10px ${cert.accentColor}30`,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top gradient stripe */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${cert.color} to-transparent`}
                style={{ background: `linear-gradient(to right, ${cert.accentColor}80, transparent)` }}
              />

              <div className="p-6 flex flex-col gap-4">
                {/* Icon / letter mark */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                  style={{
                    background: `${cert.accentColor}18`,
                    color: cert.accentColor,
                    border: `1px solid ${cert.accentColor}30`,
                  }}
                >
                  {cert.icon}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-sm font-semibold text-foreground leading-tight group-hover:text-white transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-foreground/50 font-light">
                    {cert.issuer}
                  </p>
                </div>

                {/* Footer: date + verify link */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <span className="text-xs font-mono text-foreground/40">
                    {cert.date}
                  </span>
                  {cert.verifyUrl && (
                    <motion.a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded border transition-all duration-200"
                      style={{
                        color: cert.accentColor,
                        borderColor: `${cert.accentColor}40`,
                      }}
                      whileHover={{
                        backgroundColor: `${cert.accentColor}15`,
                      }}
                    >
                      Verify ↗
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${cert.accentColor}08, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
