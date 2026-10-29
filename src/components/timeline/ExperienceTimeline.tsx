"use client";

import Image from "next/image";

interface TimelineImage {
  src: string;
  alt: string;
  caption?: string;
}

interface TimelineEntry {
  index: string;
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
    index: "01",
    role: "Associate Software Engineer",
    organization: "Anunine Holdings",
    employmentType: "Full-time",
    category: "Experience",
    date: "Oct 1, 2026 – Present",
    location: "Dehiwala, Western Province, Sri Lanka · On-site",
    active: true,
    bullets: [
      "Promoted to Associate Software Engineer on October 1, 2026, following proven delivery of enterprise architectures and systems.",
      "Leading ongoing full-stack engineering, production scalability, and internal system integration across corporate subsidiaries.",
      "Architected a multi-tenant Enterprise IT Asset Management & Service Desk Portal using Next.js 16 and React 19.",
      "Developed a business-hours SLA calculation engine in TypeScript, automating IT vendor billing reminders.",
      "Implemented Role-Based Access Control (RBAC) across five distinct role portals, enhancing security and workflow efficiency.",
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Enterprise Architecture",
      "RBAC",
      "Full-Stack",
    ],
  },
  {
    index: "02",
    role: "Information Technology Intern",
    organization: "Anunine Holdings",
    employmentType: "Internship",
    category: "Experience",
    date: "Mar 2026 – Sep 2026 · 7 mos",
    location: "Dehiwala, Western Province, Sri Lanka · On-site",
    active: false,
    bullets: [
      "Architected a multi-tenant Enterprise IT Asset Management & Service Desk Portal using Next.js 16 and React 19.",
      "Developed a business-hours SLA calculation engine in TypeScript, automating IT vendor billing reminders.",
      "Implemented Role-Based Access Control (RBAC) across five distinct role portals, enhancing security and workflow efficiency.",
      "Provided tier-2 software systems support, ensuring optimal operational uptime across departments.",
    ],
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "RBAC",
      "Enterprise Portals",
      "Tier-2 Support",
    ],
  },
  {
    index: "03",
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
    tags: [
      "Next.js",
      "Electron",
      "Node.js",
      "MongoDB",
      "ERP Architecture",
      "TypeScript",
    ],
  },
  {
    index: "04",
    role: "Head of Social Media & Council Member",
    organization: "FOSS Community — NSBM (Free & Open Source)",
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
    tags: [
      "FOSS Community",
      "Leadership",
      "Open Source Advocacy",
      "Digital Strategy",
      "Team Management",
    ],
    images: [
      {
        src: "/images/foss-agm-2025.jpg",
        alt: "FOSS Community NSBM AGM 2025 Group Photo",
        caption: "FOSS Community NSBM — Annual General Meeting (AGM '25)",
      },
    ],
  },
  {
    index: "05",
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
    tags: [
      "First Class Honours",
      "Graduating Dec 2026",
      "Final Project: 79.6%",
      "Software Architecture",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative w-full py-24 md:py-32 bg-[var(--background)] px-6 md:px-12 border-b border-[var(--card-border)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--card-border)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-walnut-accent block mb-3">
              02 / Experience &amp; Education
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.025em] text-foreground">
              Career Progression &amp; Milestones
            </h2>
          </div>
          <p className="text-foreground/60 text-xs sm:text-sm font-mono max-w-md">
            Enterprise software engineering, open-source community leadership, and academic honours.
          </p>
        </div>

        {/* Editorial Two-Column Index */}
        <div className="divide-y divide-[var(--card-border)]">
          {timelineData.map((item) => (
            <div
              key={item.index}
              className="py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start"
            >
              {/* Left Column: Metadata & Context (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2.5 text-xs font-mono">
                  <span className="text-walnut-accent font-semibold">
                    {item.index}
                  </span>
                  <span className="text-foreground/25">/</span>
                  <span className="text-foreground/80 font-medium">
                    {item.date}
                  </span>
                </div>

                <div className="mt-1">
                  <p className="text-sm font-semibold text-foreground">
                    {item.organization}
                  </p>
                  {item.employmentType && (
                    <p className="text-xs font-mono text-foreground/55 mt-0.5">
                      {item.employmentType}
                    </p>
                  )}
                  <p className="text-xs font-mono text-foreground/45 mt-1">
                    {item.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-foreground/65">
                    {item.category}
                  </span>
                  {item.active && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Current Role
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Role, Responsibilities & Tech (8 cols) */}
              <div className="lg:col-span-8 flex flex-col">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-4">
                  {item.role}
                </h3>

                <ul className="space-y-2.5 text-foreground/75 text-xs sm:text-sm leading-relaxed">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="text-walnut-accent font-mono text-xs mt-0.5 shrink-0">
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Attached Media */}
                {item.images && item.images.length > 0 && (
                  <div className="mt-6 max-w-lg">
                    {item.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="rounded-md overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg-solid)] p-2"
                      >
                        <div className="relative aspect-[16/9] rounded overflow-hidden bg-black">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            className="object-cover"
                          />
                        </div>
                        {img.caption && (
                          <p className="text-[11px] font-mono text-foreground/60 pt-2 px-1">
                            {img.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Technical Tags */}
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-foreground/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
