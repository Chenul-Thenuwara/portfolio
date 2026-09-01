"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

const TEXT = "Selected Works.";

export default function KineticTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const { getLenis } = useLenis();

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = charsRef.current.filter(Boolean);

    // Set initial state — chars are clipped below their parent
    gsap.set(chars, { y: "110%", opacity: 0 });

    const ctx = gsap.context(() => {
      // ── Character stagger reveal ──
      gsap.to(chars, {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        stagger: 0.035,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Velocity-based horizontal drift ──
      // Subtle shift of the whole title based on Lenis scroll velocity
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        end: "bottom 10%",
        onUpdate: (self) => {
          const lenis = getLenis();
          if (!lenis) return;
          // velocity from Lenis, clamped for subtlety
          const velocity = (lenis as any).velocity ?? 0;
          const shift = gsap.utils.clamp(-28, 28, velocity * 0.4);
          gsap.to(containerRef.current, {
            x: shift,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [getLenis]);

  const chars = TEXT.split("");

  return (
    <div
      ref={containerRef}
      className="relative max-w-7xl mx-auto w-full px-6 md:px-12 z-10 overflow-hidden mb-2"
    >
      <h2 className="text-5xl md:text-6xl font-black text-foreground flex" aria-label={TEXT}>
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block will-change-transform"
            style={{ display: char === " " ? "inline" : "inline-block" }}
            ref={(el) => { charsRef.current[i] = el; }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    </div>
  );
}
