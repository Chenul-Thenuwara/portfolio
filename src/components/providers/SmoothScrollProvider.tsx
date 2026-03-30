"use client";

import { useEffect, useRef, createContext, useContext, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  getLenis: () => Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ getLenis: () => null });

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  const getLenis = useCallback(() => lenisRef.current, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker so ScrollTrigger updates correctly
    const tickFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickFn);

    // Disable GSAP's own lag smoothing so Lenis is sole source of truth
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={{ getLenis }}>
      {children}
    </LenisContext.Provider>
  );
}
