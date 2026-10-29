"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CinematicOverlay() {
  const [isFinePointer, setIsFinePointer] = useState(false);

  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const springConfig = { stiffness: 1400, damping: 48, mass: 0.03 };
  const spotX = useSpring(mouseX, springConfig);
  const spotY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isFinePointer]);

  return (
    <>
      {/* Background Mouse Spotlight — only active on fine-pointer desktop devices */}
      {isFinePointer && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[1]"
          style={{
            background: "transparent",
          }}
        >
          <motion.div
            className="absolute"
            style={{
              x: spotX,
              y: spotY,
              translateX: "-50%",
              translateY: "-50%",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, var(--spotlight-glow) 0%, transparent 70%)",
              filter: "blur(2px)",
            }}
          />
        </motion.div>
      )}

      {/* Subtle Film Grain Overlay — desktop only to preserve mobile GPU battery & clarity */}
      {isFinePointer && (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-[9998] mix-blend-overlay"
            style={{
              filter: "url(#film-grain)",
              opacity: "var(--grain-opacity, 0.18)",
            }}
          />

          <svg
            aria-hidden="true"
            className="fixed"
            style={{
              position: "fixed",
              width: 0,
              height: 0,
              top: 0,
              left: 0,
              overflow: "hidden",
            }}
          >
            <defs>
              <filter
                id="film-grain"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  stitchTiles="stitch"
                  result="noiseOut"
                />
                <feColorMatrix
                  type="saturate"
                  values="0"
                  in="noiseOut"
                  result="greyNoise"
                />
                <feBlend in="SourceGraphic" in2="greyNoise" mode="overlay" />
              </filter>
            </defs>
          </svg>
        </>
      )}
    </>
  );
}
