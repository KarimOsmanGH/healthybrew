"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-800/80" />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-transform border border-stone-200 dark:border-zinc-700"
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="text-xl"
      >
        {isDark ? "🌙" : "☀️"}
      </motion.span>
    </motion.button>
  );
}
