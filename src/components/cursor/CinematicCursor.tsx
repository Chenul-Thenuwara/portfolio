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
  const [isFinePointer, setIsFinePointer] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springConfig = { stiffness: 2200, damping: 65, mass: 0.015 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on devices with a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener("change", handlePointerChange);
    return () => mediaQuery.removeEventListener("change", handlePointerChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [mouseX, mouseY, isVisible, isFinePointer]);

  useEffect(() => {
    if (!isFinePointer) return;

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "cinematic-cursor-style";
    style.textContent = `@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`;
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = "";
      document.getElementById("cinematic-cursor-style")?.remove();
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

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
              <circle
                cx="18"
                cy="18"
                r="16"
                stroke="var(--foreground)"
                strokeOpacity={isHovering ? "0.9" : "0.55"}
                strokeWidth={isHovering ? "1.5" : "1"}
                fill="none"
              />
              <line
                x1="18"
                y1="2"
                x2="18"
                y2="6"
                stroke="var(--foreground)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <line
                x1="18"
                y1="30"
                x2="18"
                y2="34"
                stroke="var(--foreground)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <line
                x1="2"
                y1="18"
                x2="6"
                y2="18"
                stroke="var(--foreground)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
              <line
                x1="30"
                y1="18"
                x2="34"
                y2="18"
                stroke="var(--foreground)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Inner dot */}
          <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            style={{
              x: mouseX,
              y: mouseY,
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
              className="bg-[var(--foreground)] opacity-90"
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
