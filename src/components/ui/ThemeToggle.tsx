"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      className="relative w-9 h-9 rounded-full flex items-center justify-center bg-walnut/30 border border-walnut-light/30 hover:border-walnut-light text-foreground shadow-sm hover:shadow-[0_0_15px_rgba(184,138,106,0.3)] transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center text-amber-200"
          >
            <Moon className="w-4 h-4 fill-amber-200/20" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center text-amber-600"
          >
            <Sun className="w-4 h-4 fill-amber-500/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
