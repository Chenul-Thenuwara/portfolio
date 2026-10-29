import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/hero/Hero";
import ExperienceTimeline from "@/components/timeline/ExperienceTimeline";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import TechMarquee from "@/components/marquee/TechMarquee";
import Certificates from "@/components/certificates/Certificates";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--background)] selection:bg-walnut selection:text-foreground">
      <Navbar />
      <Hero />
      <ProjectCarousel />
      <TechMarquee />
      <ExperienceTimeline />
      <Certificates />

      {/* Architectural Editorial Footer */}
      <footer className="w-full py-16 px-6 md:px-12 border-t border-[var(--card-border)] bg-[var(--deep-dark)]">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Brand & Identity */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg-solid)]">
                  <Image
                    src="/images/logo.png"
                    alt="Chenul Dulmika Thenuwara"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground tracking-tight">
                    Chenul Dulmika Thenuwara
                  </h3>
                  <p className="text-xs font-mono text-foreground/55">
                    Associate Software Engineer · Anunine Holdings
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-foreground/60 max-w-md mt-1 leading-relaxed">
                BSc (Hons) Software Engineering Graduate (First Class Honours) — University of Plymouth (UK) &amp; NSBM Green University.
              </p>
            </div>

            {/* Section Index */}
            <div className="md:col-span-3 flex flex-col gap-2 text-xs font-mono">
              <span className="text-foreground/40 uppercase tracking-wider mb-1">
                Navigation
              </span>
              <a
                href="#projects"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                01 / Selected Works
              </a>
              <a
                href="#experience"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                02 / Experience &amp; Education
              </a>
              <a
                href="#certificates"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                03 / Verified Credentials
              </a>
            </div>

            {/* External Profiles */}
            <div className="md:col-span-3 flex flex-col gap-2 text-xs font-mono">
              <span className="text-foreground/40 uppercase tracking-wider mb-1">
                Profiles
              </span>
              <a
                href="https://github.com/Chenul-Thenuwara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/in/chenul-thenuwara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground/40">
            <p>
              &copy; {new Date().getFullYear()} Chenul Dulmika Thenuwara. All rights reserved.
            </p>
            <p>Colombo, Sri Lanka · Next.js 16 &amp; React 19</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
