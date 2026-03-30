import Hero from "@/components/hero/Hero";
import ExperienceTimeline from "@/components/timeline/ExperienceTimeline";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import TechMarquee from "@/components/marquee/TechMarquee";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--background)]">
      <Hero />
      <ExperienceTimeline />
      <ProjectCarousel />
      <TechMarquee />
      
      {/* Simple Footer to add space after marquee */}
      <footer className="w-full py-12 text-center text-foreground/50 text-sm font-mono tracking-widest bg-[var(--background)]">
        &copy; {new Date().getFullYear()} Chenul Dulmika Thenuwara.
      </footer>
    </main>
  );
}
