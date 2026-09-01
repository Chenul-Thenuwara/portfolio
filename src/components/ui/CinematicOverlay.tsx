"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CinematicOverlay() {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  // Smooth spring for ambient spotlight — responsive tracking with gentle atmospheric easing
  const springConfig = { stiffness: 450, damping: 32, mass: 0.15 };
  const spotX = useSpring(mouseX, springConfig);
  const spotY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* ── Background Mouse Spotlight ── */}
      {/* Sits BELOW all content (z-0), illuminates the dark bg */}
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

      {/* ── Cinematic Film Grain SVG Filter Overlay ── */}
      {/* Full screen, pointer-events-none, highest z-index */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[9998] mix-blend-overlay"
        style={{ filter: "url(#film-grain)", opacity: "var(--grain-opacity, 0.35)" }}
      />

      {/* SVG filter definition — hidden but applied globally */}
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
            >
              {/* Animate the seed so grain shifts each frame */}
              <animate
                attributeName="seed"
                from="0"
                to="100"
                dur="0.4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
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
  );
}
