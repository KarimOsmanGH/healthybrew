"use client";

import { motion } from "framer-motion";

export function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const willBeDark = !root.classList.contains("dark");
    root.classList.toggle("dark", willBeDark);
    localStorage.setItem("theme", willBeDark ? "dark" : "light");
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-transform border border-stone-200 dark:border-zinc-700"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <span className="text-xl">
        <span className="dark:hidden">☀️</span>
        <span className="hidden dark:inline">🌙</span>
      </span>
    </motion.button>
  );
}
