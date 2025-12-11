"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { drinks, DrinkType, drinkTypes } from "@/data/drinks";

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
          {/* Left: SUPER BIG Emoji */}
          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeType}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1,
                }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="text-[12rem] md:text-[16rem] lg:text-[20rem] select-none cursor-default"
                style={{ 
                  filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))",
                  lineHeight: 1
                }}
              >
                {categoryEmojis[activeType]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Thin List of Brews */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-lg">
            <h2 className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-zinc-500 mb-4">
              {filteredDrinks.length} {activeType} brews
            </h2>
            <ul className="space-y-1">
              <AnimatePresence mode="popLayout">
                {filteredDrinks.map((drink, index) => (
                  <motion.li
                    key={drink.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
        </div>

        {/* Selected Drink Details */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">
                {selected.name}
              </h3>
              <p className="text-stone-600 dark:text-zinc-400 mb-6">
                {selected.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-stone-500 dark:text-zinc-500 mb-3">
                    Ingredients
                  </h4>
                  <ul className="space-y-2">
                    {selected.ingredients.map((ing) => (
                      <li key={ing.name} className="text-stone-700 dark:text-zinc-300">
                        • {ing.name}
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
                      <li key={i} className="text-stone-700 dark:text-zinc-300">
                        {i + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
