"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ExternalLink, Sparkles, Layers, Terminal, CheckCircle2 } from "lucide-react";
import KineticTitle from "./KineticTitle";

interface ProjectGalleryItem {
  src: string;
  title: string;
  description: string;
}

interface ProjectItem {
  id: string;
  title: string;
  role: string;
  badge?: string;
  desc: string;
  longDesc?: string;
  highlights?: string[];
  tech: string[];
  color: string;
  accentColor: string;
  coverImage?: string;
  gallery?: ProjectGalleryItem[];
}

const projects: ProjectItem[] = [
  {
    id: "media-server",
    title: "Self-Hosted Media Server",
    role: "Lead Developer (Individual Project)",
    badge: "Final Year Project",
    desc: "Dedicated server-client streaming system engineered exclusively for local media libraries across a local area network (LAN), operating strictly without external streaming dependencies.",
    longDesc:
      "A dedicated, privacy-focused home streaming ecosystem engineered specifically for local area network (LAN) media distribution. Designed to operate completely independently of external cloud streaming infrastructure, this platform indexes, serves, and streams 4K/1080p media collections directly over local network protocols with ultra-low latency.",
    highlights: [
      "LAN-Exclusive Streaming Architecture: High-throughput local network protocol delivering high-bitrate video & audio with zero internet bandwidth consumption.",
      "Automated Media Indexing Engine: Real-time file system scanner that parses directory hierarchies, organizes seasons/episodes, and caches metadata locally.",
      "Cross-Platform Client Ecosystem: Engineered responsive desktop and web interfaces using React and Electron with custom video players, track selectors, and subtitle support.",
      "Multi-User Household Profiles: Local authentication and personalized watch-state sync across local devices.",
    ],
    tech: ["Node.js", "Express.js", "React", "Electron", "LAN Streaming", "Local Storage", "REST APIs", "Tailwind CSS"],
    color: "from-blue-950 to-[#0a0a0a]",
    accentColor: "#3b82f6",
    coverImage: "/images/projects/media-server-discover.png",
    gallery: [
      {
        src: "/images/projects/media-server-discover.png",
        title: "Media Discovery & Library Hub",
        description: "Curated media discovery dashboard with trending titles, categories, and quick stream action.",
      },
      {
        src: "/images/projects/media-server-home.png",
        title: "Featured Spotlight & Recent Media",
        description: "Dynamic spotlight backdrop banner with synopsis, resume playback, and recent movie library.",
      },
      {
        src: "/images/projects/media-server-detail.png",
        title: "Series & Movie Overview",
        description: "Comprehensive metadata view featuring high-res posters, cast carousels, and resolution badges.",
      },
      {
        src: "/images/projects/media-server-episodes.png",
        title: "Episode & Season Management",
        description: "Interactive episode navigator with streaming availability tags, runtime, and air dates.",
      },
      {
        src: "/images/projects/media-server-search.png",
        title: "Real-time Search & Filter Engine",
        description: "Multi-parameter filter supporting genre, release year, IMDb ratings, and library queries.",
      },
      {
        src: "/images/projects/media-server-main.png",
        title: "Welcome & Auth Portal",
        description: "Landing showcase featuring collection metrics, local server connection status, and user sign-in.",
      },
    ],
  },
  {
    id: "enterprise-portal",
    title: "Enterprise IT Service & Asset Portal",
    role: "Full-Stack Engineer",
    badge: "Enterprise Platform",
    desc: "Enterprise-grade web platform engineered for IT asset lifecycle management, hardware inventory tracking, and internal service management workflows.",
    longDesc:
      "A comprehensive multi-tenant enterprise portal built to streamline IT operations across departments. Features end-to-end asset lifecycle tracking, automated SLA calculation engines, role-based access control (RBAC), and centralized service desk ticketing.",
    highlights: [
      "Multi-tenant asset lifecycle management with automated depreciation and maintenance schedules.",
      "Business-hours SLA engine in TypeScript automating vendor billing reminders and ticket escalation.",
      "Granular Role-Based Access Control (RBAC) across 5 distinct departmental role portals.",
      "Real-time analytics dashboard monitoring server health, hardware allocation, and support ticket queues.",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "REST API", "Asset Management", "RBAC"],
    color: "from-emerald-950 to-[#0a0a0a]",
    accentColor: "#10b981",
  },
  {
    id: "my-flix",
    title: "My Flix",
    role: "Full-Stack Collaborative Developer",
    badge: "Collaborative Project",
    desc: "Full-stack movie ticket booking and cinema reservation web application featuring interactive seat mapping, showtime scheduling, and MERN integration.",
    longDesc:
      "A modern cinema booking platform featuring real-time interactive theater seat selection, automated ticket generation, showtime schedules, and secure payment workflow integration.",
    highlights: [
      "Interactive SVG-based theater seat selection with live reservation state locking.",
      "Full MERN stack integration for movie listings, auditorium scheduling, and booking management.",
      "Responsive checkout flow with automated booking confirmations and digital ticket receipts.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "MERN Stack"],
    color: "from-rose-950 to-[#0a0a0a]",
    accentColor: "#f43f5e",
  },
  {
    id: "study-planner",
    title: "StudyPlanner · Studee 2.0",
    role: "Contributor & Maintainer",
    badge: "Open Source",
    desc: "Open-source digital study organizer and academic productivity tool engineered for student scheduling, assignment tracking, and structured study workflows.",
    longDesc:
      "An open-source academic productivity suite created to help university students optimize course schedules, track assignment deadlines, and maintain structured study routines with Kanban workflows.",
    highlights: [
      "Weekly schedule timetable with conflict detection and course color-coding.",
      "Integrated Kanban task board for coursework assignments and deadline tracking.",
      "Cross-platform desktop application built with C# .NET and modern web technologies.",
    ],
    tech: ["C# .NET", "TypeScript", "React", "Desktop Apps", "Git", "Open Source"],
    color: "from-purple-950 to-[#0a0a0a]",
    accentColor: "#8b5cf6",
  },
];

export default function ProjectCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position for navigation arrows
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = window.innerWidth > 768 ? 550 : 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
      if (activeProject && activeProject.gallery && activeProject.gallery.length > 0) {
        if (e.key === "ArrowRight") {
          setActiveImageIdx((prev) => (prev + 1) % activeProject.gallery!.length);
        } else if (e.key === "ArrowLeft") {
          setActiveImageIdx((prev) => (prev - 1 + activeProject.gallery!.length) % activeProject.gallery!.length);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  const openProjectModal = (project: ProjectItem) => {
    setActiveProject(project);
    setActiveImageIdx(0);
  };

  return (
    <section
      id="projects"
      className="relative w-full py-28 md:py-36 bg-[var(--background)] overflow-hidden flex flex-col justify-center"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-walnut-light/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Kinetic typography title */}
      <KineticTitle />

      {/* Navigation and instructions bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between mt-4 mb-6 z-10">
        <p className="text-xs font-mono text-foreground/50 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-walnut-light" />
          <span>Scroll horizontally or click any project to view full architectural details &amp; gallery</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/80 hover:bg-white/10 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 backdrop-blur-md cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/80 hover:bg-white/10 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 backdrop-blur-md cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-6 md:gap-8 overflow-x-auto scrollbar-none px-6 md:px-12 py-4 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing z-10"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            onClick={() => openProjectModal(project)}
            className="group relative w-[85vw] sm:w-[420px] md:w-[480px] lg:w-[520px] aspect-[4/3] rounded-2xl cursor-pointer overflow-hidden shadow-2xl shrink-0 border border-white/10 bg-[#120d0c] snap-start hover:border-walnut-light/40 transition-all duration-500 flex flex-col justify-end"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {/* Project Image Layer */}
            <div className="absolute inset-0 overflow-hidden bg-black">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 520px"
                  className="object-cover object-top opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                  priority={idx < 2}
                />
              ) : (
                /* Abstract background for projects awaiting photos */
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70`}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-40">
                    <Layers className="w-12 h-12 text-white/40 mb-2" />
                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                      Architectural Case Study
                    </span>
                  </div>
                </div>
              )}

              {/* Gradient tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Radial accent illumination */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}50, transparent 70%)`,
                }}
              />
            </div>

            {/* Click to expand pill prompt */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-black/80 text-white border border-white/20 backdrop-blur-md shadow-lg">
                <span>Expand Details</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>

            {/* Content overlay */}
            <div className="relative p-6 sm:p-8 flex flex-col justify-end z-10">
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

              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight group-hover:text-white transition-colors">
                {project.title}
              </h3>

              <p className="text-foreground/75 font-light text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                {project.desc}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full border border-white/15 text-foreground/90 bg-white/10 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 5 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-foreground/50 bg-white/5">
                    +{project.tech.length - 5}
                  </span>
                )}
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

      {/* ── Detailed Project Modal ── */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#140e0d] border border-white/15 rounded-3xl shadow-2xl overflow-y-auto z-10 text-foreground flex flex-col scrollbar-thin scrollbar-thumb-white/10"
            >
              {/* Header bar */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8 py-5 bg-[#140e0d]/95 backdrop-blur-md border-b border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  {activeProject.badge && (
                    <span
                      className="uppercase tracking-widest text-[10px] font-bold px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${activeProject.accentColor}25`,
                        borderColor: `${activeProject.accentColor}60`,
                        color: "#ffffff",
                      }}
                    >
                      {activeProject.badge}
                    </span>
                  )}
                  <span className="text-xs font-mono text-white/80 px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    {activeProject.role}
                  </span>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-foreground/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Title & Overview */}
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
                    {activeProject.title}
                  </h2>
                  <p className="text-foreground/80 text-base sm:text-lg font-light leading-relaxed mt-4">
                    {activeProject.longDesc || activeProject.desc}
                  </p>
                </div>

                {/* ── Gallery Showcase (If Available) ── */}
                {activeProject.gallery && activeProject.gallery.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-mono uppercase tracking-widest text-walnut-light flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>System Screenshots &amp; Interface Gallery</span>
                      </h3>
                      <span className="text-xs font-mono text-foreground/50">
                        {activeImageIdx + 1} of {activeProject.gallery.length}
                      </span>
                    </div>

                    {/* Main Featured Photo Preview */}
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
                      <Image
                        src={activeProject.gallery[activeImageIdx].src}
                        alt={activeProject.gallery[activeImageIdx].title}
                        fill
                        className="object-contain sm:object-cover"
                        priority
                      />

                      {/* Photo Caption Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col">
                        <span className="text-base sm:text-lg font-bold text-white">
                          {activeProject.gallery[activeImageIdx].title}
                        </span>
                        <span className="text-xs sm:text-sm text-foreground/80 font-light mt-1">
                          {activeProject.gallery[activeImageIdx].description}
                        </span>
                      </div>

                      {/* Left / Right image switchers */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIdx(
                            (prev) => (prev - 1 + activeProject.gallery!.length) % activeProject.gallery!.length
                          );
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIdx((prev) => (prev + 1) % activeProject.gallery!.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Thumbnail Switcher Bar */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                      {activeProject.gallery.map((item, gIdx) => (
                        <button
                          key={gIdx}
                          onClick={() => setActiveImageIdx(gIdx)}
                          className={`relative aspect-[16/9] rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                            activeImageIdx === gIdx
                              ? "border-walnut-light ring-2 ring-walnut-light/50 scale-[1.03]"
                              : "border-white/10 opacity-50 hover:opacity-100"
                          }`}
                        >
                          <Image src={item.src} alt={item.title} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Key Engineering & Architectural Highlights ── */}
                {activeProject.highlights && activeProject.highlights.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-walnut-light flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      <span>Key Technical Highlights &amp; System Architecture</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {activeProject.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3"
                        >
                          <CheckCircle2
                            className="w-5 h-5 shrink-0 mt-0.5"
                            style={{ color: activeProject.accentColor }}
                          />
                          <p className="text-xs sm:text-sm text-foreground/80 font-light leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Tech Stack ── */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-walnut-light">
                    Technology Stack &amp; Protocols
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-white/15 text-foreground/90 bg-white/5 backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 sm:px-8 py-4 bg-[#140e0d]/90 border-t border-white/10 flex items-center justify-between text-xs font-mono text-foreground/50">
                <span>Press ESC or click outside to close</span>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
                >
                  Done Viewing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
