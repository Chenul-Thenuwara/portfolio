"use client";

import { motion } from "framer-motion";

const techs = [
  "Next.js",
  "Electron",
  "Flutter",
  "Firebase",
  "MERN Stack",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
];

export default function TechMarquee() {
  return (
    <section className="relative w-full py-24 bg-[var(--deep-dark)] border-y border-walnut-light/10 overflow-hidden flex flex-col justify-center">
      <div className="absolute top-0 w-full h-[50px] bg-gradient-to-b from-[var(--background)] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 w-full h-[50px] bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none z-10" />
      
      {/* Decorative hardware elements */}
      <div className="absolute top-4 left-6 w-2 h-2 rounded-full border border-walnut-light/40" />
      <div className="absolute top-4 right-6 w-2 h-2 rounded-full border border-walnut-light/40" />
      <div className="absolute bottom-4 left-6 w-2 h-2 rounded-full border border-walnut-light/40" />
      <div className="absolute bottom-4 right-6 w-2 h-2 rounded-full border border-walnut-light/40" />

      <div className="relative flex whitespace-nowrap overflow-hidden py-10 w-full">
        {/* We use two sets of elements for a seamless hardware-accelerated loop */}
        <motion.div
          className="flex w-max will-change-transform"
          animate={{ x: "-50%" }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* Duplicate the list twice inside the flex container to ensure seamless loop */}
          {[...techs, ...techs, ...techs].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center px-8 md:px-12 opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-4xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-foreground to-walnut-light">
                {tech}
              </span>
              <div className="w-3 h-3 md:w-4 md:h-4 ml-8 md:ml-12 rounded-full bg-walnut-light/50" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
