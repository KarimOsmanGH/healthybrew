"use client";

import { motion } from "framer-motion";
import { Coffee, Droplets, Leaf, Shuffle, Volume2, VolumeX } from "lucide-react";
import type { DrinkType } from "@/data/drinks";

interface MobileNavProps {
  activeType: DrinkType;
  onTypeChange: (type: DrinkType) => void;
  onRandomBrew: () => void;
  isMusicPlaying: boolean;
  onMusicToggle: () => void;
}

const typeIcons = {
  tea: Leaf,
  coffee: Coffee,
  water: Droplets,
};

const typeColors = {
  tea: "from-emerald-400 to-green-500",
  coffee: "from-amber-400 to-orange-500",
  water: "from-blue-400 to-cyan-500",
};

export function MobileNav({
  activeType,
  onTypeChange,
  onRandomBrew,
  isMusicPlaying,
  onMusicToggle,
}: MobileNavProps) {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
    >
      <div className="mx-3 mb-3 rounded-3xl border-3 border-purple-300/60 dark:border-purple-600/40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/30">
        <div className="flex items-center justify-around py-3 px-2">
          {(["tea", "coffee", "water"] as DrinkType[]).map((type) => {
            const Icon = typeIcons[type];
            const isActive = activeType === type;
            return (
              <motion.button
                key={type}
                whileTap={{ scale: 0.9 }}
                onClick={() => onTypeChange(type)}
                className="relative flex flex-col items-center p-3"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${typeColors[type]} opacity-20`}
                  />
                )}
                <Icon
                  className={`h-7 w-7 transition-colors ${
                    isActive ? "text-purple-700 dark:text-purple-300" : "text-purple-400 dark:text-purple-500"
                  }`}
                />
                <span
                  className={`mt-1 text-xs font-bold capitalize transition-colors ${
                    isActive ? "text-purple-700 dark:text-purple-300" : "text-purple-400 dark:text-purple-500"
                  }`}
                >
                  {type}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className={`absolute -bottom-0.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${typeColors[type]}`}
                  />
                )}
              </motion.button>
            );
          })}
          
          {/* Divider */}
          <div className="h-12 w-px bg-purple-200 dark:bg-purple-700/50" />
          
          {/* Random Brew */}
          <motion.button
            whileTap={{ scale: 0.9, rotate: 180 }}
            onClick={onRandomBrew}
            className="flex flex-col items-center p-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
              <Shuffle className="h-5 w-5 text-white" />
            </div>
            <span className="mt-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              Random
            </span>
          </motion.button>
          
          {/* Music Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onMusicToggle}
            className="flex flex-col items-center p-3"
          >
            <motion.div
              animate={isMusicPlaying ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: isMusicPlaying ? Infinity : 0 }}
              className={`flex h-11 w-11 items-center justify-center rounded-full ${
                isMusicPlaying
                  ? "bg-gradient-to-br from-purple-400 to-pink-500"
                  : "bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700"
              } shadow-lg`}
            >
              {isMusicPlaying ? (
                <Volume2 className="h-5 w-5 text-white" />
              ) : (
                <VolumeX className="h-5 w-5 text-white" />
              )}
            </motion.div>
            <span
              className={`mt-1 text-xs font-bold ${
                isMusicPlaying ? "text-purple-600 dark:text-purple-400" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Music
            </span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
