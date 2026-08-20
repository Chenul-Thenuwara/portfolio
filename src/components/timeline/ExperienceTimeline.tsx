"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface TimelineImage {
  src: string;
  alt: string;
  caption?: string;
}

interface TimelineEntry {
  role: string;
  organization: string;
  employmentType?: string;
  category: "Experience" | "Education" | "Volunteering";
  date: string;
  location: string;
  active: boolean;
  bullets: string[];
  tags: string[];
  images?: TimelineImage[];
}

const timelineData: TimelineEntry[] = [
  {
    role: "Information Technology Intern",
    organization: "Anunine Holdings",
    employmentType: "Full-time",
    category: "Experience",
    date: "Mar 2026 – Present",
    location: "Dehiwala, Western Province, Sri Lanka · On-site",
    active: true,
    bullets: [
      "Architected a multi-tenant Enterprise IT Asset Management & Service Desk Portal using Next.js 16 and React 19.",
      "Developed a business-hours SLA calculation engine in TypeScript, automating IT vendor billing reminders.",
      "Implemented Role-Based Access Control (RBAC) across five distinct role portals, enhancing security and workflow efficiency.",
      "Provided tier-2 software systems support, ensuring optimal operational uptime across departments.",
    ],
    tags: ["Next.js 16", "React 19", "TypeScript", "RBAC", "Enterprise Portals", "Tier-2 Support"],
  },
  {
    role: "Full Stack Software Engineering Intern",
    organization: "Algoarts",
    employmentType: "Internship",
    category: "Experience",
    date: "Sep 2025 – Feb 2026 · 6 mos",
    location: "Sri Lanka · Remote",
    active: false,
    bullets: [
      "Developed cross-platform enterprise systems and point-of-sale applications using Next.js, Electron, Node.js, and MongoDB.",
      "Architected Ryzenor ERP, enhancing business operations with automated payroll and inventory tracking.",
      "Created a commercial travel platform featuring a custom tour wizard and integrated SEO capabilities.",
    ],
    tags: ["Next.js", "Electron", "Node.js", "MongoDB", "ERP Architecture", "TypeScript"],
  },
  {
    role: "Head of Social Media & Council Member",
    organization: "FOSS Community - NSBM (Free & Open Source)",
    employmentType: "Volunteer Leadership · 2 yrs 7 mos",
    category: "Volunteering",
    date: "Aug 2023 – Feb 2026",
    location: "NSBM Green University, Sri Lanka",
    active: false,
    bullets: [
      "Head of Social Media & Digital Marketing (Mar 2025 – Feb 2026): Spearheaded digital strategy, brand outreach, and campaign growth for open-source initiatives.",
      "Council Member (Aug 2024 – Feb 2026): Managed core operations, guided technical workshops, and drove open-source advocacy across university batches.",
      "Volunteer (Aug 2023 – Jan 2026): Contributed to large-scale tech community events, hackathons, and Linux/FOSS enablement sessions.",
    ],
    tags: ["FOSS Community", "Leadership", "Open Source Advocacy", "Digital Marketing", "Team Management"],
    images: [
      {
        src: "/images/foss-agm-2025.jpg",
        alt: "FOSS Community NSBM AGM 2025 Group Photo",
        caption: "FOSS Community NSBM — Annual General Meeting (AGM '25)",
      },
    ],
  },
  {
    role: "BSc (Hons) in Software Engineering",
    organization: "University of Plymouth (UK) · NSBM Green University",
    employmentType: "Undergraduate Degree",
    category: "Education",
    date: "Graduating Dec 2026 · Final Transcript Released",
    location: "Homagama, Sri Lanka",
    active: false,
    bullets: [
      "Completed all degree requirements with First Class Honours awarded by the University of Plymouth (UK).",
      "Final Year Computing Project achieved 79.60% overall (80% Source Code/Report, 79% Viva & Demonstration).",
      "Academic distinctions across AI & Machine Learning (73%), Computer Graphics & Visualisation (76%), Full-Stack Development (70%), and Mobile Development (70%).",
    ],
    tags: ["First Class Honours", "Graduating Dec 2026", "Final Transcript Out", "Final Project: 79.6%", "Software Architecture"],
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
          Experience &amp; Leadership
        </h2>
        <p className="text-foreground/50 font-light text-base mt-4">
          Professional industry delivery, open-source community leadership, and academic graduation.
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col z-10">
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
                className={`w-full md:w-[47%] flex flex-col ${
                  isEven ? "md:items-start md:text-left" : "md:items-end md:text-left"
                }`}
              >
                <div className="w-full bg-[rgba(26,20,19,0.7)] backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl hover:border-walnut-light/30 transition-all duration-300 group">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-walnut-light text-xs font-mono tracking-widest font-semibold">
                      {item.date}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-foreground/60">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground flex flex-wrap items-center gap-3">
                    <span>{item.role}</span>
                    {item.active && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                    )}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-foreground/90 text-sm font-semibold">
                      {item.organization}
                    </span>
                    {item.employmentType && (
                      <span className="text-xs font-mono text-foreground/40">
                        · {item.employmentType}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-mono text-walnut-light/80 mt-1 mb-4">
                    📍 {item.location}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 mt-3 text-foreground/75 text-xs sm:text-sm font-light leading-relaxed">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-walnut-light text-xs mt-1 shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Attached Media / Photos */}
                  {item.images && item.images.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="grid grid-cols-1 gap-2">
                        {item.images.map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="group/img relative rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/40 aspect-[16/9]"
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 500px"
                              className="object-cover group-hover/img:scale-105 transition duration-500"
                            />
                            {img.caption && (
                              <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between">
                                <span className="text-[10px] font-mono text-foreground/80 tracking-wide">
                                  {img.caption}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-white/5">
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
              <div className="hidden md:block w-[47%]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
