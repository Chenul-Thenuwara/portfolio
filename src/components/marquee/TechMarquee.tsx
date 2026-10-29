"use client";

import { motion } from "framer-motion";

const techs = [
  "Next.js 16",
  "React 19",
  "TypeScript 5",
  "Node.js",
  "Express.js",
  "Electron",
  "Firebase & Firestore",
  "MongoDB",
  "Tailwind CSS v4",
  "REST & Webhooks",
  "Multi-Tenant Architecture",
  "LAN Streaming Protocols",
  "Git & CI/CD",
];

export default function TechMarquee() {
  return (
    <section
      aria-label="Core Technical Stack"
      className="relative w-full py-5 bg-[var(--deep-dark)] border-y border-[var(--card-border)] overflow-hidden flex items-center"
    >
      <div className="relative flex whitespace-nowrap overflow-hidden w-full">
        <motion.div
          className="flex w-max will-change-transform"
          animate={{ x: "-50%" }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...techs, ...techs].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center px-6 md:px-8 text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-foreground/65"
            >
              <span>{tech}</span>
              <span className="ml-6 md:ml-8 text-walnut-light/40">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
