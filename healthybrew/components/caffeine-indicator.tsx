"use client";

import { motion } from "framer-motion";
import type { Drink } from "@/data/drinks";
import { Zap, BatteryLow, BatteryMedium, BatteryFull } from "lucide-react";

interface CaffeineIndicatorProps {
  drink: Drink;
}

function getCaffeineLevel(drink: Drink): { level: number; label: string; color: string; darkColor: string } {
  const name = drink.name.toLowerCase();
  const ingredients = drink.ingredients.map(i => i.name.toLowerCase()).join(" ");
  
  // Caffeine-free drinks
  if (drink.type === "water") {
    return { level: 0, label: "Caffeine-free", color: "text-blue-500", darkColor: "dark:text-blue-400" };
  }
  
  // Check for decaf/herbal indicators
  if (
    name.includes("rooibos") ||
    name.includes("chamomile") ||
    name.includes("lavender") ||
    name.includes("herbal") ||
    (drink.type === "tea" && !ingredients.includes("tea") && !ingredients.includes("matcha"))
  ) {
    return { level: 0, label: "Caffeine-free", color: "text-blue-500", darkColor: "dark:text-blue-400" };
  }
  
  // High caffeine - coffee-based or matcha
  if (
    drink.type === "coffee" ||
    name.includes("espresso") ||
    name.includes("cold brew") ||
    name.includes("matcha")
  ) {
    if (name.includes("double") || name.includes("espresso tonic")) {
      return { level: 4, label: "High caffeine", color: "text-red-500", darkColor: "dark:text-red-400" };
    }
    return { level: 3, label: "Moderate caffeine", color: "text-orange-500", darkColor: "dark:text-orange-400" };
  }
  
  // Tea with black tea base
  if (
    name.includes("chai") ||
    name.includes("earl grey") ||
    ingredients.includes("black tea")
  ) {
    return { level: 2, label: "Light caffeine", color: "text-amber-500", darkColor: "dark:text-amber-400" };
  }
  
  // Green tea, white tea, oolong
  if (
    name.includes("green") ||
    name.includes("oolong") ||
    name.includes("white") ||
    name.includes("jasmine") ||
    name.includes("sencha")
  ) {
    return { level: 1, label: "Very low caffeine", color: "text-green-500", darkColor: "dark:text-green-400" };
  }
  
  // Default for other teas
  return { level: 1, label: "Low caffeine", color: "text-green-500", darkColor: "dark:text-green-400" };
}

export function CaffeineIndicator({ drink }: CaffeineIndicatorProps) {
  const { level, label, color, darkColor } = getCaffeineLevel(drink);
  
  const BatteryIcon = level === 0 
    ? BatteryLow 
    : level <= 2 
      ? BatteryMedium 
      : BatteryFull;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold ${color} ${darkColor} bg-white/80 dark:bg-slate-700/80 border border-current/20 shadow-sm`}
    >
      {level > 0 ? (
        <motion.div
          animate={{ 
            scale: level >= 3 ? [1, 1.2, 1] : 1,
          }}
          transition={{ 
            duration: 0.8, 
            repeat: level >= 3 ? Infinity : 0,
          }}
        >
          <Zap className="h-4 w-4" />
        </motion.div>
      ) : (
        <BatteryIcon className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{level === 0 ? "No caff" : `Lvl ${level}`}</span>
    </motion.div>
  );
}
