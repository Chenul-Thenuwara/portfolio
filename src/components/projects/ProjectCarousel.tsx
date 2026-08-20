"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  Layers,
  Terminal,
  CheckCircle2,
  Play,
  Pause,
} from "lucide-react";
import KineticTitle from "./KineticTitle";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

interface ProjectGalleryItem {
  src: string;
  title: string;
  category?: string;
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
    coverImage: "/images/projects/media-server-01-welcome.png",
    gallery: [
      // 1. Auth & Onboarding
      {
        src: "/images/projects/media-server-01-welcome.png",
        title: "Welcome & Landing Portal",
        category: "Landing & Auth",
        description: "Showcase portal featuring media collection metrics, direct local streaming highlights, and sign-in entry.",
      },
      {
        src: "/images/projects/media-server-02-signin.png",
        title: "User Authentication (Sign In)",
        category: "Authentication",
        description: "Secure local credential authentication with remember-me sessions and password recovery.",
      },
      {
        src: "/images/projects/media-server-03-register.png",
        title: "Account Registration",
        category: "Authentication",
        description: "New household user onboarding workflow with encrypted local credential storage.",
      },
      {
        src: "/images/projects/media-server-04-profiles.png",
        title: "Multi-User Profile Selector (Who's Watching?)",
        category: "Profiles",
        description: "Household profile switcher supporting admin shield badges, parental filters, and personalized watch states.",
      },
      {
        src: "/images/projects/media-server-05-add-library.png",
        title: "Add Media & Local Folder Linker",
        category: "Storage Setup",
        description: "Local file system directory mapper linking hard drive storage paths directly into the streaming engine.",
      },

      // 2. Menu Navigation & Media Hub
      {
        src: "/images/projects/media-server-06-home.png",
        title: "Home — Spotlight Banner & Recent Movies",
        category: "Menu · Home",
        description: "Immersive spotlight hero backdrop with dynamic synopsis, quick actions, and recent library carousels.",
      },
      {
        src: "/images/projects/media-server-07-discover.png",
        title: "Discover — Global & Trending Hub",
        category: "Menu · Discover",
        description: "Curated discovery section showcasing top-rated titles, trending media, and category filtering.",
      },
      {
        src: "/images/projects/media-server-08-search.png",
        title: "Search — Multi-Filter Query Engine",
        category: "Menu · Search",
        description: "Real-time search engine with type, genre, IMDb rating, and release year filters alongside TMDB global search.",
      },
      {
        src: "/images/projects/media-server-09-history.png",
        title: "Watch History & Playback Progress",
        category: "Menu · History",
        description: "Cross-device playback history tracker recording completed titles and timestamp resume points.",
      },
      {
        src: "/images/projects/media-server-10-ai-chat.png",
        title: "AI Chat (Gemini 2.5) — Media Assistant",
        category: "Menu · AI Chat",
        description: "Integrated AI entertainment assistant powered by Gemini 2.5 for smart recommendations and film queries.",
      },

      // 3. Media Detail, Episodes & Cast
      {
        src: "/images/projects/media-server-11-movie-detail.png",
        title: "Series Detail — Overview & Cast (Chernobyl)",
        category: "Libraries · Details",
        description: "Rich metadata presentation with high-res backdrops, release metadata, synopsis, and cast carousel.",
      },
      {
        src: "/images/projects/media-server-12-episodes.png",
        title: "Episode Guide & 4K HDR Availability",
        category: "Libraries · Episodes",
        description: "Season and episode index displaying local availability tags, runtimes, air dates, and 4K HDR indicators.",
      },
      {
        src: "/images/projects/media-server-13-player-detail.png",
        title: "Movie Detail & Direct Player Launch (Your Name)",
        category: "Libraries · Player",
        description: "Instant stream launcher with audio codec tags (AAC, 5.1 Surround, HDR, 4K) and local file path mapping.",
      },
      {
        src: "/images/projects/media-server-14-actor-bio.png",
        title: "Actor Biography & Filmography (Jesse Eisenberg)",
        category: "Libraries · Cast",
        description: "Dedicated actor and director profiles featuring biography, date of birth, place of birth, and known works.",
      },

      // 4. Music & Photos Libraries
      {
        src: "/images/projects/media-server-15-music-local.png",
        title: "Local Music Library & Audio Player",
        category: "Libraries · Music",
        description: "Local lossless audio library browser with integrated playback controls, track lists, and duration meters.",
      },
      {
        src: "/images/projects/media-server-16-music-spotify.png",
        title: "Spotify Integration & Cloud Streaming",
        category: "Libraries · Music",
        description: "Hybrid cloud music portal linking Spotify Premium accounts for streaming global tracks and new releases.",
      },
      {
        src: "/images/projects/media-server-17-photos.png",
        title: "Photos Library & Google Photos Sync",
        category: "Libraries · Photos",
        description: "High-resolution photo gallery manager supporting local album indexing and Google Photos cloud integration.",
      },

      // 5. System & Administration
      {
        src: "/images/projects/media-server-18-admin-panel.png",
        title: "Cineora Admin — LAN & Server Dashboard",
        category: "System · Admin",
        description: "Centralized server diagnostics dashboard monitoring LAN IP (10.16.141.130), RAM usage, storage (212 GB), and logs.",
      },
      {
        src: "/images/projects/media-server-19-notifications.png",
        title: "What's New & Live Feed Notifications",
        category: "System · Feed",
        description: "Live release feed synchronized with TMDB and Spotify showcasing trending movies, top TV, and fresh hits.",
      },
      {
        src: "/images/projects/media-server-20-account-settings.png",
        title: "Account Settings & Security",
        category: "System · Settings",
        description: "User profile preferences, display name configuration, role assignment (Viewer/Admin), and password management.",
      },
    ],
  },
  {
    id: "enterprise-portal",
    title: "Enterprise Asset Management & IT Service Portal",
    role: "Sole Full-Stack Developer & Architect",
    badge: "Enterprise Platform · Anunine Holdings",
    desc: "A complete multi-tenant IT management ecosystem built from scratch for Anunine Holdings. Unifies device inventory, service desk ticketing, digital asset handovers, and vendor billing across 10 subsidiaries.",
    longDesc:
      "During my internship at Anunine Holdings, I built this entire enterprise system from the ground up as the sole developer. Handling everything from initial requirement analysis and UI/UX design to database schemas, custom business logic, and production deployment, I created a unified platform connecting 5 role-based portals (Employee, HR, IT Engineering, Regional Heads, and Super Admin) across 10 corporate subsidiaries. It automates IT service ticketing with real-time SLAs, tracks 25+ device inventory types with digital handovers, and manages vendor billing with automated alert workflows.",
    highlights: [
      "End-to-End Individual Ownership: Single-handedly led requirement discovery, system design, database architecture, frontend/backend engineering, and production rollout.",
      "Multi-Tenant Architecture: Centralized platform supporting complete data and workflow isolation across 10 Anunine Group subsidiaries.",
      "5 Tailored Subsystems: Dedicated role-specific portals for Employees, HR, IT Engineers, SBU Regional Heads, and Super Admins connected via Firestore.",
      "Smart SLA & Service Desk: Custom business-hours SLA engine automating ticket prioritization, escalation triggers, and customer ratings.",
      "Digital Handover & Inventory: Tracks 25+ device categories with printable PDF handover forms, signature verification, and bulk CSV workflows.",
      "Automated IT Billing & Alerts: Vendor invoice tracking in LKR, daily automated email reminders (8:00 AM SLST), weekly CSV digests, and Google Chat cards.",
    ],
    tech: [
      "Next.js 16 (Turbopack)",
      "React 19",
      "TypeScript 5",
      "Firebase Auth & Firestore",
      "Firebase Admin SDK",
      "Tailwind CSS v4",
      "Framer Motion 12",
      "Google Chat Webhooks",
      "Nodemailer (SMTP)",
      "Vercel Cron",
      "Vitest 4",
      "Multi-Tenancy",
      "RBAC",
    ],
    color: "from-emerald-950 to-[#0a0a0a]",
    accentColor: "#10b981",
    coverImage: "/images/projects/enterprise/enterprise-01-login.png",
    gallery: [
      // 1. Auth & Self Service
      {
        src: "/images/projects/enterprise/enterprise-01-login.png",
        title: "Enterprise Authentication & Multi-Tenant Login",
        category: "Auth & Access",
        description: "Secure multi-tenant login portal supporting custom Firebase Auth claims, role resolution (5 portals), and SBU isolation.",
      },
      {
        src: "/images/projects/enterprise/enterprise-02-reset-password.png",
        title: "Account Security & Password Recovery",
        category: "Auth & Access",
        description: "Self-service password reset and security recovery workflow with automated token dispatch.",
      },
      {
        src: "/images/projects/enterprise/enterprise-03-self-service-ticket.png",
        title: "Universal Service Desk Ticket Requisition",
        category: "Self-Service",
        description: "Cross-portal ticket submission wizard with priority levels, category classifications, and business justifications.",
      },
      {
        src: "/images/projects/enterprise/enterprise-04-self-service-asset-request.png",
        title: "Hardware & Software Requisition Catalog",
        category: "Self-Service",
        description: "Standardized catalog requisition forms with automated multi-tier approval routing to HODs and SBU Admins.",
      },

      // 2. IT Engineering Command Center & Service Desk
      {
        src: "/images/projects/enterprise/enterprise-05-it-overview.png",
        title: "IT Engineering Command Center",
        category: "IT Portal · Overview",
        description: "Centralized executive KPI dashboard summarizing service desk queues, active inventory counts, and pending fulfillment.",
      },
      {
        src: "/images/projects/enterprise/enterprise-06-it-kanban.png",
        title: "Interactive Service Desk Kanban Board",
        category: "IT Portal · Kanban",
        description: "Real-time drag-and-drop task & ticket board with SLA indicators, priority badges, and quick assignee reassignment.",
      },
      {
        src: "/images/projects/enterprise/enterprise-07-it-ticket-detail.png",
        title: "Support Ticket Deep-Dive & SLA Status",
        category: "IT Portal · Tickets",
        description: "Detailed ticket inspection dialog with automated SLA target countdown, activity history, and resolution notes.",
      },
      {
        src: "/images/projects/enterprise/enterprise-08-sla-policy-manual.png",
        title: "Service Desk SLA Policy & Priority Rules",
        category: "IT Portal · SLA",
        description: "Configurable business-hours SLA engine definitions governing resolution targets (Critical, High, Medium, Low).",
      },

      // 3. Asset Provisioning, Inventory & Handover
      {
        src: "/images/projects/enterprise/enterprise-09-asset-fulfillment-queue.png",
        title: "Asset Provisioning & Fulfillment Queue",
        category: "IT Portal · Fulfillment",
        description: "Restricted hardware and software fulfillment workflow executed exclusively by authorized IT Engineers.",
      },
      {
        src: "/images/projects/enterprise/enterprise-10-handover-document.png",
        title: "Digital Asset Physical Handover & Sign-Off",
        category: "IT Portal · Handover",
        description: "Automated digital handover form generation with hardware verification checklists, employee signature verification, and PDF output.",
      },
      {
        src: "/images/projects/enterprise/enterprise-11-inventory-registry.png",
        title: "Hardware & Device Inventory Registry",
        category: "IT Portal · Inventory",
        description: "Comprehensive asset tracking across 25 device types with status filters and one-click CSV batch import/export.",
      },
      {
        src: "/images/projects/enterprise/enterprise-12-add-inventory-item.png",
        title: "New Asset Registration Wizard",
        category: "IT Portal · Inventory",
        description: "Granular asset tagging modal capturing make/model, serial numbers, department assignments, and warranty details.",
      },
      {
        src: "/images/projects/enterprise/enterprise-13-add-software-license.png",
        title: "Software License & Compliance Form",
        category: "IT Portal · Software",
        description: "Digital license key registry, seat allocation, compliance tracking, and automated renewal reminder schedules.",
      },

      // 4. IT Billing, Invoices & Vendor Management
      {
        src: "/images/projects/enterprise/enterprise-14-billing-dashboard.png",
        title: "IT Billing & Vendor Invoices Dashboard",
        category: "IT Portal · Billing",
        description: "Financial KPI cards tracking total pending, overdue, and due-today vendor invoices in Sri Lankan Rupees (LKR).",
      },
      {
        src: "/images/projects/enterprise/enterprise-15-upload-invoice.png",
        title: "Vendor Invoice Upload & Slip Verification",
        category: "IT Portal · Billing",
        description: "Invoice registration modal with PDF payment slip attachment and automated due-date reminder triggers.",
      },
      {
        src: "/images/projects/enterprise/enterprise-16-vendor-directory.png",
        title: "SBU & Vendor Directory Settings",
        category: "IT Portal · Vendors",
        description: "Configurable vendor credit terms, agreed SLAs, and direct SBU Finance contact routing rules.",
      },
      {
        src: "/images/projects/enterprise/enterprise-17-add-vendor-form.png",
        title: "New Vendor Onboarding & Credit Terms",
        category: "IT Portal · Vendors",
        description: "Vendor registration modal setting payment cycles, agreed credit terms, and direct escalation email channels.",
      },

      // 5. Performance, Personnel & Provisioning
      {
        src: "/images/projects/enterprise/enterprise-18-agent-performance.png",
        title: "IT Agent Performance Analytics",
        category: "IT Portal · Analytics",
        description: "Real-time SLA compliance tracking, average resolution duration meters, and team throughput analytics.",
      },
      {
        src: "/images/projects/enterprise/enterprise-19-agent-breakdown.png",
        title: "Personnel Workload & Resolution Breakdown",
        category: "IT Portal · Analytics",
        description: "Individual engineer ticket resolution metrics, customer ratings, and active workload queue distribution.",
      },
      {
        src: "/images/projects/enterprise/enterprise-20-personnel-management.png",
        title: "IT Personnel & Access Management",
        category: "IT Portal · Admin",
        description: "Department technician directory, role assignment, custom claim synchronization, and SBU permission controls.",
      },
      {
        src: "/images/projects/enterprise/enterprise-21-email-provisioning.png",
        title: "Corporate Email & Identity Provisioning",
        category: "IT Portal · Provisioning",
        description: "Corporate Google Workspace / Microsoft 365 identity and mailbox provisioning tool for onboarded employees.",
      },
    ],
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
  const { getLenis } = useLenis();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Auto-play interval timer (3.8s per slide)
  useEffect(() => {
    if (!activeProject || !activeProject.gallery || activeProject.gallery.length <= 1) return;
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % activeProject.gallery!.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [activeProject, isPlaying, isHovered]);

  // Lock background scroll and pause Lenis when modal is open
  useEffect(() => {
    const lenis = getLenis();
    if (activeProject) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [activeProject, getLenis]);

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
    setIsPlaying(true);
    setIsHovered(false);
  };

  return (
    <section
      id="projects"
      className="relative w-full pt-6 md:pt-10 pb-28 md:pb-36 bg-[var(--background)] overflow-hidden flex flex-col justify-center"
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
        className="flex items-stretch gap-6 md:gap-8 overflow-x-auto no-scrollbar scrollbar-none px-6 md:px-12 py-4 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing z-10"
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
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden"
            data-lenis-prevent="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              data-lenis-prevent="true"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-auto max-h-[88vh] bg-[#140e0d] border border-white/15 rounded-3xl shadow-2xl overflow-y-auto no-scrollbar z-10 text-foreground flex flex-col overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => {
                e.stopPropagation();
              }}
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
                    {/* Header bar with Category, Counter & Autoplay Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-mono uppercase tracking-widest text-walnut-light flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          <span>System Interface Gallery</span>
                        </h3>
                        {activeProject.gallery[activeImageIdx].category && (
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-walnut-light/20 border border-walnut-light/40 text-foreground font-semibold">
                            {activeProject.gallery[activeImageIdx].category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Autoplay Play/Pause Toggle */}
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-foreground/80 transition-all duration-200 cursor-pointer"
                          title={isPlaying ? "Pause autoplay" : "Resume autoplay"}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 text-walnut-light" />
                              <span className="hidden sm:inline">
                                {isHovered ? "Paused on Hover" : "Auto-playing (3.8s)"}
                              </span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="hidden sm:inline">Play Slideshow</span>
                            </>
                          )}
                        </button>

                        <span className="text-xs font-mono text-foreground/50 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                          {activeImageIdx + 1} of {activeProject.gallery.length}
                        </span>
                      </div>
                    </div>

                    {/* Main Featured Photo Preview with Auto-play hover detection */}
                    <div className="flex flex-col gap-3">
                      <div
                        className="relative w-full h-[52vh] sm:h-[62vh] max-h-[620px] rounded-2xl overflow-hidden border border-white/15 bg-black/95 shadow-2xl flex items-center justify-center group select-none"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {/* Slide progress indicator bar at top of preview */}
                        {isPlaying && !isHovered && (
                          <motion.div
                            key={activeImageIdx}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.8, ease: "linear" }}
                            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-walnut-light via-blue-500 to-walnut-light z-30 opacity-80"
                          />
                        )}

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeImageIdx}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={activeProject.gallery[activeImageIdx].src}
                              alt={activeProject.gallery[activeImageIdx].title}
                              fill
                              className="object-contain p-2 sm:p-3"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Left / Right manual navigation switchers */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIdx(
                              (prev) => (prev - 1 + activeProject.gallery!.length) % activeProject.gallery!.length
                            );
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg z-20"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIdx((prev) => (prev + 1) % activeProject.gallery!.length);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg z-20"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Dedicated Photo Caption Bar */}
                      <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-base font-bold text-white flex items-center gap-2">
                            <span>{activeProject.gallery[activeImageIdx].title}</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-foreground/80 font-light mt-0.5">
                            {activeProject.gallery[activeImageIdx].description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          {activeProject.gallery[activeImageIdx].category && (
                            <span className="text-xs font-mono text-foreground/60 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                              {activeProject.gallery[activeImageIdx].category}
                            </span>
                          )}
                          <span className="text-xs font-mono text-walnut-light px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                            {activeImageIdx + 1} / {activeProject.gallery.length}
                          </span>
                        </div>
                      </div>
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
