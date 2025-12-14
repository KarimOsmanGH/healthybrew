"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";

function subscribeTheme(callback: () => void) {
  // Keep theme in sync across tabs + within this tab.
  window.addEventListener("storage", callback);
  window.addEventListener("themechange", callback as EventListener);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("themechange", callback as EventListener);
  };
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getThemeServerSnapshot() {
  // Server render can't know user preference.
  return false;
}

function subscribeClient(onStoreChange: () => void) {
  // No-op subscription; hydration will switch from server->client snapshot automatically.
  void onStoreChange;
  return () => {};
}

export function ThemeToggle() {
  const isClient = useSyncExternalStore(subscribeClient, () => true, () => false);
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const toggleTheme = () => {
    const newIsDark = !isDark;

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Notify any listeners (including this component).
    window.dispatchEvent(new Event("themechange"));
  };

  if (!isClient) {
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
