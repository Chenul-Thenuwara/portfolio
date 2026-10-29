"use client";

interface Certificate {
  index: string;
  code: string;
  title: string;
  issuer: string;
  date: string;
  grade: string;
  category: string;
  skills: string;
}

const certificates: Certificate[] = [
  {
    index: "01",
    code: "BSc (Hons)",
    title: "BSc (Hons) Software Engineering",
    issuer: "University of Plymouth (UK) · NSBM Green University",
    date: "Graduating Dec 2026",
    grade: "First Class Honours",
    category: "Higher Education",
    skills:
      "Final Project 79.6% · AI/ML (73%), Full-Stack (70%), Graphics (76%)",
  },
  {
    index: "02",
    code: "CCNA v7.3",
    title: "CCNAv7: Enterprise Networking, Security, and Automation",
    issuer: "SLIIT City UNI · Cisco Networking Academy",
    date: "Mar 2023 – Nov 2023",
    grade: "Grade: Merit",
    category: "Enterprise Networking",
    skills: "Enterprise Networking, Cybersecurity, LAN/WAN Management",
  },
  {
    index: "03",
    code: "CCNA v7.2",
    title: "CCNAv7: Switching, Routing, and Wireless Essentials",
    issuer: "SLIIT City UNI · Cisco Networking Academy",
    date: "Nov 2022 – Mar 2023",
    grade: "Grade: Merit",
    category: "Network Infrastructure",
    skills: "Network Switches, Routing Protocols, Wireless Essentials",
  },
  {
    index: "04",
    code: "CCNA v7.1",
    title: "CCNAv7: Introduction to Networks",
    issuer: "SLIIT City UNI · Cisco Networking Academy",
    date: "Mar 2022 – Nov 2022",
    grade: "Grade: Merit",
    category: "Computer Networking",
    skills: "Network Topologies, Subnetting, IP Addressing, Ethernet",
  },
  {
    index: "05",
    code: "DIP-NES",
    title: "Diploma in Network Engineering with Security",
    issuer: "NextGen Campus",
    date: "Apr 2021 – Oct 2021",
    grade: "Diploma",
    category: "Network Security",
    skills: "Network Engineering, Infrastructure Security, Firewalls",
  },
  {
    index: "06",
    code: "CERT-CSN",
    title: "Certification in Cyber Security & Networking",
    issuer: "NextGen Campus",
    date: "Feb 2021 – Jun 2021",
    grade: "Certified",
    category: "Cybersecurity",
    skills: "Cybersecurity Fundamentals, Network Defense, Threat Analysis",
  },
  {
    index: "07",
    code: "GCE A/L",
    title: "G.C.E. Advanced Level (A/L) — Engineering Technology",
    issuer: "D. S. Senanayake College",
    date: "2009 – 2022",
    grade: "Technology Stream",
    category: "Secondary Education",
    skills: "Engineering Technology, Science for Technology, General ICT",
  },
];

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[var(--background)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 mb-8 sm:mb-12 border-b border-[var(--card-border)]">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-walnut-accent block mb-2.5 sm:mb-3">
              03 / Verified Credentials
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-[-0.025em] text-foreground">
              Academic &amp; Technical Certifications
            </h2>
          </div>
          <p className="text-foreground/60 text-xs sm:text-sm font-mono max-w-md">
            Formal degree qualifications, enterprise networking certifications, and security credentials.
          </p>
        </div>

        {/* Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certificates.map((cert) => (
            <div
              key={cert.index}
              className="group rounded-lg border border-[var(--card-border)] bg-[var(--card-bg-solid)] hover:border-[var(--card-border-hover)] transition-colors duration-300 p-5 sm:p-6 flex flex-col justify-between gap-5 sm:gap-6"
            >
              <div>
                {/* Top Index & Grade Bar */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--card-border)] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-walnut-accent font-semibold">
                      {cert.index}
                    </span>
                    <span className="text-foreground/25">/</span>
                    <span className="text-foreground/75">{cert.code}</span>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--card-border)] bg-[var(--card-bg)] text-foreground/80">
                    {cert.grade}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug mb-1.5 group-hover:text-walnut-accent transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-foreground/65 font-medium">
                  {cert.issuer}
                </p>

                <p className="text-xs font-mono text-foreground/50 mt-3 leading-relaxed">
                  {cert.skills}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)] text-[11px] font-mono text-foreground/50">
                <span>{cert.date}</span>
                <span className="uppercase tracking-wider">{cert.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
