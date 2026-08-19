import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/hero/Hero";
import ExperienceTimeline from "@/components/timeline/ExperienceTimeline";
import ProjectCarousel from "@/components/projects/ProjectCarousel";
import TechMarquee from "@/components/marquee/TechMarquee";
import AboutWorkspace from "@/components/about/AboutWorkspace";
import Certificates from "@/components/certificates/Certificates";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-[var(--background)] selection:bg-walnut selection:text-foreground">
      <Navbar />
      <Hero />
      <ProjectCarousel />
      <TechMarquee />
      <ExperienceTimeline />
      <AboutWorkspace />
      <Certificates />

      {/* Modern Footer */}
      <footer className="w-full py-20 px-6 flex flex-col items-center gap-6 text-center border-t border-white/5 bg-[var(--deep-dark)] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-walnut/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col items-center gap-2 z-10">
          <p className="text-foreground/40 text-xs tracking-[0.25em] font-mono uppercase">
            Full-Stack Software Developer
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Chenul Dulmika Thenuwara
          </h3>
          <p className="text-foreground/60 text-xs sm:text-sm font-light max-w-md mt-1">
            BSc (Hons) Software Engineering Graduate · NSBM Green University &amp; Plymouth University (UK)
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-foreground/70 z-10 pt-2">
          <a
            href="https://github.com/Chenul-Thenuwara"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline decoration-walnut-light underline-offset-4 transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="#projects"
            className="hover:text-foreground underline decoration-walnut-light underline-offset-4 transition-colors"
          >
            Projects
          </a>
          <span>•</span>
          <a
            href="#experience"
            className="hover:text-foreground underline decoration-walnut-light underline-offset-4 transition-colors"
          >
            Experience
          </a>
          <span>•</span>
          <a
            href="#workspace"
            className="hover:text-foreground underline decoration-walnut-light underline-offset-4 transition-colors"
          >
            Setup
          </a>
        </div>

        <p className="text-foreground/30 text-xs font-mono z-10 pt-4 border-t border-white/5 w-full max-w-md">
          &copy; {new Date().getFullYear()} Chenul Dulmika Thenuwara — Engineered for Performance
        </p>
      </footer>
    </main>
  );
}

