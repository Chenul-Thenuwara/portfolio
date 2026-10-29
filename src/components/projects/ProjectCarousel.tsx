"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
  Play,
  Pause,
} from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

interface ProjectGalleryItem {
  src: string;
  title: string;
  category?: string;
  description: string;
}

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  role: string;
  badge: string;
  desc: string;
  longDesc?: string;
  highlights?: string[];
  tech: string[];
  coverImage?: string;
  gallery?: ProjectGalleryItem[];
}

const projects: ProjectItem[] = [
  {
    id: "enterprise-portal",
    index: "01",
    title: "Enterprise Asset Management & IT Service Portal",
    role: "Sole Full-Stack Developer & Architect",
    badge: "Enterprise Platform · Anunine Holdings",
    desc: "Multi-tenant IT management ecosystem built from the ground up for Anunine Holdings, unifying device inventory, service desk ticketing, digital asset handovers, and vendor billing across 10 subsidiaries.",
    longDesc:
      "At Anunine Holdings, I architected and engineered this entire enterprise system from the ground up as the sole developer. Handling everything from initial requirement discovery and UI/UX design to database schemas, custom business logic, and production rollout, the platform connects 5 role-based portals (Employee, HR, IT Engineering, Regional Heads, and Super Admin) across 10 corporate subsidiaries. It automates IT service ticketing with real-time SLAs, tracks 25+ device inventory types with digital handovers, and manages vendor billing with automated alert workflows.",
    highlights: [
      "End-to-End Individual Ownership: Led requirement discovery, system design, database architecture, frontend/backend engineering, and production deployment.",
      "Multi-Tenant Architecture: Centralized platform supporting complete data and workflow isolation across 10 Anunine Group subsidiaries.",
      "5 Role-Based Subsystems: Dedicated portals for Employees, HR, IT Engineers, SBU Regional Heads, and Super Admins connected via Firestore.",
      "Smart SLA & Service Desk: Custom business-hours SLA engine automating ticket prioritization, escalation triggers, and performance metrics.",
      "Digital Handover & Inventory: Tracks 25+ device categories with printable PDF handover forms, signature verification, and bulk CSV workflows.",
      "Automated IT Billing & Alerts: Vendor invoice tracking in LKR, daily automated email reminders (8:00 AM SLST), weekly CSV digests, and Google Chat notifications.",
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
    coverImage: "/images/projects/enterprise/enterprise-01-login.png",
    gallery: [
      {
        src: "/images/projects/enterprise/enterprise-01-login.png",
        title: "Enterprise Authentication & Multi-Tenant Login",
        category: "Auth & Access",
        description:
          "Secure multi-tenant login portal supporting custom Firebase Auth claims, role resolution (5 portals), and SBU isolation.",
      },
      {
        src: "/images/projects/enterprise/enterprise-02-reset-password.png",
        title: "Account Security & Password Recovery",
        category: "Auth & Access",
        description:
          "Self-service password reset and security recovery workflow with automated token dispatch.",
      },
      {
        src: "/images/projects/enterprise/enterprise-03-self-service-ticket.png",
        title: "Universal Service Desk Ticket Requisition",
        category: "Self-Service",
        description:
          "Cross-portal ticket submission wizard with priority levels, category classifications, and business justifications.",
      },
      {
        src: "/images/projects/enterprise/enterprise-04-self-service-asset-request.png",
        title: "Hardware & Software Requisition Catalog",
        category: "Self-Service",
        description:
          "Standardized catalog requisition forms with automated multi-tier approval routing to HODs and SBU Admins.",
      },
      {
        src: "/images/projects/enterprise/enterprise-05-it-overview.png",
        title: "IT Engineering Command Center",
        category: "IT Portal · Overview",
        description:
          "Centralized executive KPI dashboard summarizing service desk queues, active inventory counts, and pending fulfillment.",
      },
      {
        src: "/images/projects/enterprise/enterprise-06-it-kanban.png",
        title: "Interactive Service Desk Kanban Board",
        category: "IT Portal · Kanban",
        description:
          "Real-time drag-and-drop task & ticket board with SLA indicators, priority badges, and quick assignee reassignment.",
      },
      {
        src: "/images/projects/enterprise/enterprise-07-it-ticket-detail.png",
        title: "Support Ticket Deep-Dive & SLA Status",
        category: "IT Portal · Tickets",
        description:
          "Detailed ticket inspection dialog with automated SLA target countdown, activity history, and resolution notes.",
      },
      {
        src: "/images/projects/enterprise/enterprise-08-sla-policy-manual.png",
        title: "Service Desk SLA Policy & Priority Rules",
        category: "IT Portal · SLA",
        description:
          "Configurable business-hours SLA engine definitions governing resolution targets (Critical, High, Medium, Low).",
      },
      {
        src: "/images/projects/enterprise/enterprise-09-asset-fulfillment-queue.png",
        title: "Asset Provisioning & Fulfillment Queue",
        category: "IT Portal · Fulfillment",
        description:
          "Restricted hardware and software fulfillment workflow executed exclusively by authorized IT Engineers.",
      },
      {
        src: "/images/projects/enterprise/enterprise-10-handover-document.png",
        title: "Digital Asset Physical Handover & Sign-Off",
        category: "IT Portal · Handover",
        description:
          "Automated digital handover form generation with hardware verification checklists, employee signature verification, and PDF output.",
      },
      {
        src: "/images/projects/enterprise/enterprise-11-inventory-registry.png",
        title: "Hardware & Device Inventory Registry",
        category: "IT Portal · Inventory",
        description:
          "Comprehensive asset tracking across 25 device types with status filters and one-click CSV batch import/export.",
      },
      {
        src: "/images/projects/enterprise/enterprise-12-add-inventory-item.png",
        title: "New Asset Registration Wizard",
        category: "IT Portal · Inventory",
        description:
          "Granular asset tagging modal capturing make/model, serial numbers, department assignments, and warranty details.",
      },
      {
        src: "/images/projects/enterprise/enterprise-13-add-software-license.png",
        title: "Software License & Compliance Form",
        category: "IT Portal · Software",
        description:
          "Digital license key registry, seat allocation, compliance tracking, and automated renewal reminder schedules.",
      },
      {
        src: "/images/projects/enterprise/enterprise-14-billing-dashboard.png",
        title: "IT Billing & Vendor Invoices Dashboard",
        category: "IT Portal · Billing",
        description:
          "Financial KPI cards tracking total pending, overdue, and due-today vendor invoices in Sri Lankan Rupees (LKR).",
      },
      {
        src: "/images/projects/enterprise/enterprise-15-upload-invoice.png",
        title: "Vendor Invoice Upload & Slip Verification",
        category: "IT Portal · Billing",
        description:
          "Invoice registration modal with PDF payment slip attachment and automated due-date reminder triggers.",
      },
      {
        src: "/images/projects/enterprise/enterprise-16-vendor-directory.png",
        title: "SBU & Vendor Directory Settings",
        category: "IT Portal · Vendors",
        description:
          "Configurable vendor credit terms, agreed SLAs, and direct SBU Finance contact routing rules.",
      },
      {
        src: "/images/projects/enterprise/enterprise-17-add-vendor-form.png",
        title: "New Vendor Onboarding & Credit Terms",
        category: "IT Portal · Vendors",
        description:
          "Vendor registration modal setting payment cycles, agreed credit terms, and direct escalation email channels.",
      },
      {
        src: "/images/projects/enterprise/enterprise-18-agent-performance.png",
        title: "IT Agent Performance Analytics",
        category: "IT Portal · Analytics",
        description:
          "Real-time SLA compliance tracking, average resolution duration meters, and team throughput analytics.",
      },
      {
        src: "/images/projects/enterprise/enterprise-19-agent-breakdown.png",
        title: "Personnel Workload & Resolution Breakdown",
        category: "IT Portal · Analytics",
        description:
          "Individual engineer ticket resolution metrics, customer ratings, and active workload queue distribution.",
      },
      {
        src: "/images/projects/enterprise/enterprise-20-personnel-management.png",
        title: "IT Personnel & Access Management",
        category: "IT Portal · Admin",
        description:
          "Department technician directory, role assignment, custom claim synchronization, and SBU permission controls.",
      },
      {
        src: "/images/projects/enterprise/enterprise-21-email-provisioning.png",
        title: "Corporate Email & Identity Provisioning",
        category: "IT Portal · Provisioning",
        description:
          "Corporate Google Workspace / Microsoft 365 identity and mailbox provisioning tool for onboarded employees.",
      },
    ],
  },
  {
    id: "media-server",
    index: "02",
    title: "Self-Hosted LAN Media Server",
    role: "Lead Developer (Individual Project)",
    badge: "Final Year Computing Project · 79.6%",
    desc: "Dedicated server-client streaming system engineered exclusively for local media libraries across a local area network (LAN), operating strictly without external cloud dependencies.",
    longDesc:
      "A dedicated, privacy-focused home streaming ecosystem engineered specifically for local area network (LAN) media distribution. Designed to operate independently of external cloud streaming infrastructure, this platform indexes, serves, and streams 4K/1080p media collections directly over local network protocols with ultra-low latency.",
    highlights: [
      "LAN-Exclusive Streaming Architecture: High-throughput local network protocol delivering high-bitrate video and audio with zero internet bandwidth consumption.",
      "Automated Media Indexing Engine: Real-time file system scanner that parses directory hierarchies, organizes seasons/episodes, and caches metadata locally.",
      "Cross-Platform Client Ecosystem: Engineered responsive desktop and web interfaces using React and Electron with custom video players, track selectors, and subtitle support.",
      "Multi-User Household Profiles: Local authentication and personalized watch-state synchronization across local devices.",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "React",
      "Electron",
      "LAN Streaming",
      "Local Storage",
      "REST APIs",
      "Tailwind CSS",
    ],
    coverImage: "/images/projects/media-server-01-welcome.png",
    gallery: [
      {
        src: "/images/projects/media-server-01-welcome.png",
        title: "Welcome & Landing Portal",
        category: "Landing & Auth",
        description:
          "Showcase portal featuring media collection metrics, direct local streaming highlights, and sign-in entry.",
      },
      {
        src: "/images/projects/media-server-02-signin.png",
        title: "User Authentication (Sign In)",
        category: "Authentication",
        description:
          "Secure local credential authentication with remember-me sessions and password recovery.",
      },
      {
        src: "/images/projects/media-server-03-register.png",
        title: "Account Registration",
        category: "Authentication",
        description:
          "New household user onboarding workflow with encrypted local credential storage.",
      },
      {
        src: "/images/projects/media-server-04-profiles.png",
        title: "Multi-User Profile Selector",
        category: "Profiles",
        description:
          "Household profile switcher supporting admin badges, parental filters, and personalized watch states.",
      },
      {
        src: "/images/projects/media-server-05-add-library.png",
        title: "Add Media & Local Folder Linker",
        category: "Storage Setup",
        description:
          "Local file system directory mapper linking hard drive storage paths directly into the streaming engine.",
      },
      {
        src: "/images/projects/media-server-06-home.png",
        title: "Home — Spotlight Banner & Recent Movies",
        category: "Menu · Home",
        description:
          "Spotlight hero backdrop with dynamic synopsis, quick actions, and recent library carousels.",
      },
      {
        src: "/images/projects/media-server-07-discover.png",
        title: "Discover — Global & Trending Hub",
        category: "Menu · Discover",
        description:
          "Curated discovery section showcasing top-rated titles, trending media, and category filtering.",
      },
      {
        src: "/images/projects/media-server-08-search.png",
        title: "Search — Multi-Filter Query Engine",
        category: "Menu · Search",
        description:
          "Real-time search engine with type, genre, IMDb rating, and release year filters alongside TMDB global search.",
      },
      {
        src: "/images/projects/media-server-09-history.png",
        title: "Watch History & Playback Progress",
        category: "Menu · History",
        description:
          "Cross-device playback history tracker recording completed titles and timestamp resume points.",
      },
      {
        src: "/images/projects/media-server-10-ai-chat.png",
        title: "AI Chat (Gemini 2.5) — Media Assistant",
        category: "Menu · AI Chat",
        description:
          "Integrated AI entertainment assistant powered by Gemini 2.5 for smart recommendations and film queries.",
      },
      {
        src: "/images/projects/media-server-11-movie-detail.png",
        title: "Series Detail — Overview & Cast",
        category: "Libraries · Details",
        description:
          "Rich metadata presentation with high-res backdrops, release metadata, synopsis, and cast carousel.",
      },
      {
        src: "/images/projects/media-server-12-episodes.png",
        title: "Episode Guide & 4K HDR Availability",
        category: "Libraries · Episodes",
        description:
          "Season and episode index displaying local availability tags, runtimes, air dates, and 4K HDR indicators.",
      },
      {
        src: "/images/projects/media-server-13-player-detail.png",
        title: "Movie Detail & Direct Player Launch",
        category: "Libraries · Player",
        description:
          "Instant stream launcher with audio codec tags (AAC, 5.1 Surround, HDR, 4K) and local file path mapping.",
      },
      {
        src: "/images/projects/media-server-14-actor-bio.png",
        title: "Actor Biography & Filmography",
        category: "Libraries · Cast",
        description:
          "Dedicated actor and director profiles featuring biography, date of birth, place of birth, and known works.",
      },
      {
        src: "/images/projects/media-server-15-music-local.png",
        title: "Local Music Library & Audio Player",
        category: "Libraries · Music",
        description:
          "Local lossless audio library browser with integrated playback controls, track lists, and duration meters.",
      },
      {
        src: "/images/projects/media-server-16-music-spotify.png",
        title: "Spotify Integration & Cloud Streaming",
        category: "Libraries · Music",
        description:
          "Hybrid cloud music portal linking Spotify Premium accounts for streaming global tracks and new releases.",
      },
      {
        src: "/images/projects/media-server-17-photos.png",
        title: "Photos Library & Google Photos Sync",
        category: "Libraries · Photos",
        description:
          "High-resolution photo gallery manager supporting local album indexing and Google Photos cloud integration.",
      },
      {
        src: "/images/projects/media-server-18-admin-panel.png",
        title: "Cineora Admin — LAN & Server Dashboard",
        category: "System · Admin",
        description:
          "Centralized server diagnostics dashboard monitoring LAN IP, RAM usage, storage capacity, and logs.",
      },
      {
        src: "/images/projects/media-server-19-notifications.png",
        title: "What's New & Live Feed Notifications",
        category: "System · Feed",
        description:
          "Live release feed synchronized with TMDB and Spotify showcasing trending movies, top TV, and fresh hits.",
      },
      {
        src: "/images/projects/media-server-20-account-settings.png",
        title: "Account Settings & Security",
        category: "System · Settings",
        description:
          "User profile preferences, display name configuration, role assignment (Viewer/Admin), and password management.",
      },
    ],
  },
  {
    id: "my-flix",
    index: "03",
    title: "My Flix — Cinema Reservation System",
    role: "Full-Stack Collaborative Developer",
    badge: "MERN Stack Application",
    desc: "Full-stack movie ticket booking and cinema reservation web application featuring interactive seat mapping, showtime scheduling, and MERN stack integration.",
    longDesc:
      "A cinema booking platform featuring real-time interactive theater seat selection, automated ticket generation, showtime schedules, and payment workflow integration.",
    highlights: [
      "Interactive SVG-based theater seat selection with live reservation state locking.",
      "Full MERN stack integration for movie listings, auditorium scheduling, and booking management.",
      "Responsive checkout flow with automated booking confirmations and digital ticket receipts.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
    ],
  },
  {
    id: "study-planner",
    index: "04",
    title: "StudyPlanner · Studee 2.0",
    role: "Contributor & Maintainer",
    badge: "Open Source Desktop Suite",
    desc: "Open-source digital study organizer and academic productivity tool engineered for student scheduling, assignment tracking, and structured study workflows.",
    longDesc:
      "An open-source academic productivity suite created to help university students optimize course schedules, track assignment deadlines, and maintain structured study routines with Kanban workflows.",
    highlights: [
      "Weekly schedule timetable with conflict detection and course categorization.",
      "Integrated Kanban task board for coursework assignments and deadline tracking.",
      "Cross-platform desktop application built with C# .NET and modern web technologies.",
    ],
    tech: [
      "C# .NET",
      "TypeScript",
      "React",
      "Desktop Apps",
      "Git",
      "Open Source",
    ],
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

  // Auto-play interval timer (4s per slide)
  useEffect(() => {
    if (
      !activeProject ||
      !activeProject.gallery ||
      activeProject.gallery.length <= 1
    )
      return;
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % activeProject.gallery!.length);
    }, 4000);

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

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = window.innerWidth > 768 ? 560 : 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
      if (
        activeProject &&
        activeProject.gallery &&
        activeProject.gallery.length > 0
      ) {
        if (e.key === "ArrowRight") {
          setActiveImageIdx(
            (prev) => (prev + 1) % activeProject.gallery!.length
          );
        } else if (e.key === "ArrowLeft") {
          setActiveImageIdx(
            (prev) =>
              (prev - 1 + activeProject.gallery!.length) %
              activeProject.gallery!.length
          );
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
      className="relative w-full py-24 md:py-32 bg-[var(--background)] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--card-border)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-walnut-accent block mb-3">
              01 / Selected Works
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.025em] text-foreground">
              Featured Systems &amp; Architecture
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6">
            <p className="text-xs font-mono text-foreground/55 max-w-xs">
              Select any case study to inspect architectural specifications and system interfaces.
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous project"
                className="w-9 h-9 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-foreground/75 hover:border-foreground/30 hover:text-foreground disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next project"
                className="w-9 h-9 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-foreground/75 hover:border-foreground/30 hover:text-foreground disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Case Study Track */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-6 overflow-x-auto no-scrollbar px-6 md:px-12 pb-4 snap-x snap-mandatory scroll-smooth z-10"
      >
        {projects.map((project, idx) => (
          <article
            key={project.id}
            onClick={() => openProjectModal(project)}
            className="group relative w-[86vw] sm:w-[440px] md:w-[500px] lg:w-[540px] rounded-lg cursor-pointer overflow-hidden shrink-0 border border-[var(--card-border)] bg-[var(--card-bg-solid)] snap-start hover:border-[var(--card-border-hover)] transition-colors duration-300 flex flex-col justify-between"
          >
            {/* Top Index & Meta Bar */}
            <div className="px-5 py-3.5 border-b border-[var(--card-border)] flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-walnut-accent font-medium">
                  {project.index}
                </span>
                <span className="text-foreground/25">/</span>
                <span className="text-foreground/75 truncate">
                  {project.badge}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-foreground/50 group-hover:text-foreground transition-colors shrink-0">
                <span className="text-[11px]">Inspect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Screenshot / Blueprint Frame */}
            <div className="relative aspect-[16/10] w-full bg-[#080807] border-b border-[var(--card-border)] overflow-hidden">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 86vw, 540px"
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  priority={idx < 2}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[var(--deep-dark)]">
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(236,232,225,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,232,225,0.08) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-foreground/40">
                    <span>ARCH // SPECIFICATION</span>
                    <span>{project.id.toUpperCase()}</span>
                  </div>
                  <div className="relative z-10 my-auto">
                    <p className="text-xs font-mono uppercase tracking-widest text-walnut-accent mb-1">
                      System Architecture
                    </p>
                    <p className="text-xl font-bold text-foreground tracking-tight">
                      {project.title}
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-foreground/45 border-t border-[var(--card-border)] pt-3">
                    <span>{project.role}</span>
                    <span>{project.tech.slice(0, 3).join(" · ")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Specification Body */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-5">
              <div>
                <p className="text-xs font-mono text-walnut-light mb-1.5">
                  {project.role}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-2.5 group-hover:text-walnut-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.desc}
                </p>
              </div>

              {/* Clean Rectangular Monospace Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--card-border)]">
                {project.tech.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-foreground/70 bg-[var(--card-bg)]"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 6 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-foreground/45">
                    +{project.tech.length - 6}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── Architectural Case Study Modal ── */}
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
              className="fixed inset-0 bg-[var(--modal-overlay)] backdrop-blur-sm"
              data-lenis-prevent="true"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl h-auto max-h-[90vh] bg-[var(--card-bg-solid)] border border-[var(--card-border)] rounded-lg shadow-2xl overflow-y-auto no-scrollbar z-10 text-foreground flex flex-col overscroll-contain"
              data-lenis-prevent="true"
              onWheel={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8 py-4 bg-[var(--card-bg-solid)]/95 backdrop-blur-md border-b border-[var(--card-border)]">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <span className="text-walnut-accent font-semibold">
                    {activeProject.index}
                  </span>
                  <span className="text-foreground/30">/</span>
                  <span className="text-foreground font-medium">
                    {activeProject.badge}
                  </span>
                  <span className="hidden sm:inline text-foreground/30">·</span>
                  <span className="hidden sm:inline text-foreground/60">
                    {activeProject.role}
                  </span>
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--card-border)] hover:border-foreground/30 text-xs font-mono text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <span>ESC</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-10">
                {/* Title & Overview */}
                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                    {activeProject.title}
                  </h2>
                  <p className="text-foreground/75 text-sm sm:text-base leading-relaxed mt-3 max-w-3xl">
                    {activeProject.longDesc || activeProject.desc}
                  </p>
                </div>

                {/* ── System Interface Gallery ── */}
                {activeProject.gallery && activeProject.gallery.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--card-border)]">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-walnut-accent">
                          01 / System Interface Gallery
                        </h3>
                        {activeProject.gallery[activeImageIdx].category && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--card-border)] text-foreground/75 bg-[var(--card-bg)]">
                            {activeProject.gallery[activeImageIdx].category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--card-border)] hover:border-foreground/30 text-xs font-mono text-foreground/75 transition-colors cursor-pointer"
                          title={
                            isPlaying ? "Pause autoplay" : "Resume autoplay"
                          }
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3 h-3 text-walnut-accent" />
                              <span className="hidden sm:inline">
                                {isHovered ? "Paused" : "Auto"}
                              </span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-foreground" />
                              <span className="hidden sm:inline">Play</span>
                            </>
                          )}
                        </button>

                        <span className="text-xs font-mono text-foreground/60 px-2.5 py-1 rounded border border-[var(--card-border)]">
                          {String(activeImageIdx + 1).padStart(2, "0")} /{" "}
                          {String(activeProject.gallery.length).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Image Stage */}
                    <div className="flex flex-col gap-3">
                      <div
                        className="relative w-full h-[48vh] sm:h-[58vh] max-h-[580px] rounded-md overflow-hidden border border-[var(--card-border)] bg-[#070706] flex items-center justify-center group select-none"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        {isPlaying && !isHovered && (
                          <motion.div
                            key={activeImageIdx}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4.0, ease: "linear" }}
                            className="absolute top-0 left-0 h-0.5 bg-walnut-accent z-30"
                          />
                        )}

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeImageIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={activeProject.gallery[activeImageIdx].src}
                              alt={activeProject.gallery[activeImageIdx].title}
                              fill
                              className="object-contain p-2 sm:p-4"
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIdx(
                              (prev) =>
                                (prev - 1 + activeProject.gallery!.length) %
                                activeProject.gallery!.length
                            );
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer z-20"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIdx(
                              (prev) =>
                                (prev + 1) % activeProject.gallery!.length
                            );
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer z-20"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Caption Bar */}
                      <div className="p-4 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">
                            {activeProject.gallery[activeImageIdx].title}
                          </h4>
                          <p className="text-xs text-foreground/70 mt-0.5">
                            {activeProject.gallery[activeImageIdx].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Key Architectural Highlights ── */}
                {activeProject.highlights &&
                  activeProject.highlights.length > 0 && (
                    <div className="space-y-4 pt-6 border-t border-[var(--card-border)]">
                      <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-walnut-accent">
                        02 / Architectural Highlights &amp; Engineering Scope
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeProject.highlights.map((highlight, hIdx) => (
                          <div
                            key={hIdx}
                            className="p-4 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] flex items-start gap-3.5"
                          >
                            <span className="text-xs font-mono text-walnut-accent font-semibold mt-0.5 shrink-0">
                              {String(hIdx + 1).padStart(2, "0")}
                            </span>
                            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                              {highlight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* ── Tech Stack ── */}
                <div className="space-y-3 pt-6 border-t border-[var(--card-border)]">
                  <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-walnut-accent">
                    03 / Technology Stack &amp; Protocols
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1 rounded border border-[var(--card-border)] text-foreground/85 bg-[var(--card-bg)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 sm:px-8 py-4 bg-[var(--card-bg-solid)] border-t border-[var(--card-border)] flex items-center justify-between text-xs font-mono text-foreground/55">
                <span>Press ESC or click outside to close</span>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-md bg-foreground text-[var(--background)] font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
