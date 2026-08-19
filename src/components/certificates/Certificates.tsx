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
  grade?: string;
  category?: string;
  skills?: string;
  credentialId?: string;
  verifyUrl?: string;
  color: string;
  accentColor: string;
  icon: string;
}

const certificates: Certificate[] = [
  {
    title: "BSc (Hons) Software Engineering",
    issuer: "University of Plymouth (UK) · NSBM Green University",
    issuerShort: "Plymouth / NSBM",
    date: "2023 – 2026",
    grade: "First Class Honours",
    category: "Higher Education",
    skills: "Final Project 79.6% · AI/ML (73%), Full-Stack (70%), Graphics (76%)",
    color: "from-red-950/80",
    accentColor: "#ef4444",
    icon: "BSc",
  },
  {
    title: "CCNAv7: Enterprise Networking, Security, and Automation",
    issuer: "SLIIT City UNI · Cisco Networking Academy",
    issuerShort: "SLIIT / Cisco",
    date: "Mar 2023 – Nov 2023",
    grade: "Grade: Merit",
    category: "Enterprise Networking",
    skills: "Enterprise Networking, Cybersecurity, LAN/WAN Management",
    color: "from-blue-950/80",
    accentColor: "#00b4d8",
    icon: "CCNA",
  },
  {
    title: "CCNAv7: Switching, Routing, and Wireless Essentials",
    issuer: "SLIIT City UNI · Cisco Networking Academy",
    issuerShort: "SLIIT / Cisco",
    date: "Nov 2022 – Mar 2023",
    grade: "Grade: Merit",
    category: "Network Infrastructure",
    skills: "Network Switches, Routing Protocols, Wireless Essentials",
    color: "from-cyan-950/80",
    accentColor: "#06b6d4",
    icon: "CCNA",
  },
  {
    title: "CCNAv7: Introduction to Networks",
    issuer: "SLIIT City UNI · Cisco Networking Academy",
    issuerShort: "SLIIT / Cisco",
    date: "Mar 2022 – Nov 2022",
    grade: "Grade: Merit",
    category: "Computer Networking",
    skills: "Network Topologies, Subnetting, IP Addressing, Ethernet",
    color: "from-indigo-950/80",
    accentColor: "#6366f1",
    icon: "CCNA",
  },
  {
    title: "Diploma in Network Engineering with Security",
    issuer: "NextGen Campus",
    issuerShort: "NextGen",
    date: "Apr 2021 – Oct 2021",
    grade: "Diploma",
    category: "Network Security",
    skills: "Network Engineering, Infrastructure Security, Firewalls",
    color: "from-emerald-950/80",
    accentColor: "#10b981",
    icon: "DNE",
  },
  {
    title: "Certification in Cyber Security & Networking",
    issuer: "NextGen Campus",
    issuerShort: "NextGen",
    date: "Feb 2021 – Jun 2021",
    grade: "Certified",
    category: "Cybersecurity",
    skills: "Cybersecurity Fundamentals, Network Defense, Threat Analysis",
    color: "from-amber-950/80",
    accentColor: "#f59e0b",
    icon: "SEC",
  },
  {
    title: "G.C.E. Advanced Level (A/L) — Engineering Technology",
    issuer: "D. S. Senanayake College",
    issuerShort: "DSSC",
    date: "2009 – 2022",
    grade: "Technology Stream",
    category: "Secondary Education",
    skills: "Engineering Technology, Science for Technology, General ICT",
    color: "from-stone-900/80",
    accentColor: "#d4af37",
    icon: "A/L",
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
      id="certificates"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              className="group relative rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm flex flex-col justify-between"
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

              <div className="p-6 flex flex-col gap-3.5 flex-1">
                {/* Header: Icon + Grade Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                    style={{
                      background: `${cert.accentColor}18`,
                      color: cert.accentColor,
                      border: `1px solid ${cert.accentColor}30`,
                    }}
                  >
                    {cert.icon}
                  </div>

                  {cert.grade && (
                    <span
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border truncate"
                      style={{
                        color: cert.accentColor,
                        borderColor: `${cert.accentColor}40`,
                        background: `${cert.accentColor}12`,
                      }}
                    >
                      {cert.grade}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-white transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-foreground/60 font-light">
                    {cert.issuer}
                  </p>
                  {cert.skills && (
                    <p className="text-[11px] text-foreground/45 font-mono mt-1.5 line-clamp-2">
                      {cert.skills}
                    </p>
                  )}
                </div>

                {/* Footer: date + category */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <span className="text-xs font-mono text-foreground/40">
                    {cert.date}
                  </span>
                  {cert.category && (
                    <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">
                      {cert.category}
                    </span>
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
