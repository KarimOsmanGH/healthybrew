"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drinks, DrinkType, drinkTypes } from "@/data/drinks";
import { AudioPlayer } from "@/components/audio-player";
import { ThemeToggle } from "@/components/theme-toggle";

const categoryEmojis: Record<DrinkType, string> = {
  tea: "🍵",
  coffee: "☕",
  water: "💧",
};

export default function Home() {
  const [activeType, setActiveType] = useState<DrinkType>("tea");
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);

  const filteredDrinks = drinks.filter((drink) => drink.type === activeType);
  const selected = selectedDrink ? drinks.find(d => d.id === selectedDrink) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-200 dark:from-zinc-900 dark:to-zinc-950">
      {/* Top Right Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <AudioPlayer />
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Big Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-zinc-900 p-1.5 shadow-lg">
            {drinkTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setActiveType(type);
                  setSelectedDrink(null);
                }}
                className={`flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold transition-all ${
                  activeType === type
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    : "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="text-2xl">{categoryEmojis[type]}</span>
                <span className="capitalize">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Brew List */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-zinc-500 mb-4">
              {filteredDrinks.length} {activeType} brews
            </h2>
            <ul className="space-y-1">
              <AnimatePresence mode="popLayout">
                {filteredDrinks.map((drink, index) => (
                  <motion.li
                    key={drink.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDrink(selectedDrink === drink.id ? null : drink.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        selectedDrink === drink.id
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                          : "text-stone-700 dark:text-zinc-300 hover:bg-stone-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <span className="font-medium">{drink.name}</span>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Right: Drink Details */}
          <div className="md:sticky md:top-20">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg"
                >
                  <div className="text-center mb-4">
                    <span className="text-6xl">{categoryEmojis[selected.type]}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">
                    {selected.name}
                  </h3>
                  <p className="text-stone-600 dark:text-zinc-400 mb-6">
                    {selected.description}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-zinc-500 mb-3">
                        Ingredients
                      </h4>
                      <ul className="space-y-2">
                        {selected.ingredients.map((ing) => (
                          <li key={ing.name} className="text-stone-700 dark:text-zinc-300 flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            <span>{ing.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-zinc-500 mb-3">
                        Preparation
                      </h4>
                      <ol className="space-y-2">
                        {selected.preparation.map((step, i) => (
                          <li key={i} className="text-stone-700 dark:text-zinc-300 flex items-start gap-2">
                            <span className="text-amber-500 font-bold">{i + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/50 dark:bg-zinc-900/50 rounded-2xl p-8 shadow-lg border-2 border-dashed border-stone-300 dark:border-zinc-700 flex flex-col items-center justify-center min-h-[300px]"
                >
                  <span className="text-7xl mb-4 opacity-50">{categoryEmojis[activeType]}</span>
                  <p className="text-stone-500 dark:text-zinc-500 text-center">
                    Select a brew from the list to see details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
