import Hero from "@/components/hero/Hero";
import ExperienceTimeline from "@/components/timeline/ExperienceTimeline";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import TechMarquee from "@/components/marquee/TechMarquee";
import Certificates from "@/components/certificates/Certificates";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--background)]">
      <Hero />
      <ExperienceTimeline />
      <ProjectCarousel />
      <TechMarquee />
      <Certificates />

      {/* Footer */}
      <footer className="w-full py-16 flex flex-col items-center gap-4 text-center border-t border-white/5 bg-[var(--background)]">
        <p className="text-foreground/30 text-xs tracking-[0.25em] font-mono uppercase">
          Designed &amp; Built by
        </p>
        <p className="text-foreground/70 text-sm font-semibold tracking-widest">
          Chenul Dulmika Thenuwara
        </p>
        <p className="text-foreground/20 text-xs font-mono">
          &copy; {new Date().getFullYear()} — All rights reserved
        </p>
      </footer>
    </main>
  );
}
