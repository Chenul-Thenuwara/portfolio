"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

export default function CinematicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Ultra-smooth spring config — high stiffness keeps it tight, damping prevents wobble
  const springConfig = { stiffness: 280, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slightly laggier inner dot for secondary feel
  const dotSpringConfig = { stiffness: 400, damping: 35, mass: 0.3 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide default cursor on body
  useEffect(() => {
    document.body.style.cursor = "none";
    // Also hide cursor on all elements
    const style = document.createElement("style");
    style.id = "cinematic-cursor-style";
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = "";
      document.getElementById("cinematic-cursor-style")?.remove();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Outer geometric ring */}
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: isHovering ? 2.2 : 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              {/* Outer ring */}
              <circle
                cx="18"
                cy="18"
                r="16"
                stroke={isHovering ? "rgba(230,224,212,0.9)" : "rgba(230,224,212,0.6)"}
                strokeWidth={isHovering ? "1.5" : "1"}
                fill="none"
              />
              {/* Corner tick marks — minimalist geometric detail */}
              <line x1="18" y1="2" x2="18" y2="6" stroke="rgba(230,224,212,0.5)" strokeWidth="1" />
              <line x1="18" y1="30" x2="18" y2="34" stroke="rgba(230,224,212,0.5)" strokeWidth="1" />
              <line x1="2" y1="18" x2="6" y2="18" stroke="rgba(230,224,212,0.5)" strokeWidth="1" />
              <line x1="30" y1="18" x2="34" y2="18" stroke="rgba(230,224,212,0.5)" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Inner dot — tracks faster, sits at exact cursor pos */}
          <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            style={{
              x: dotX,
              y: dotY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHovering ? 0 : 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "rgba(230,224,212,0.9)",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
