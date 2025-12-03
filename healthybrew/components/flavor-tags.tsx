"use client";

import { motion } from "framer-motion";

interface FlavorTagsProps {
  flavors: string[];
  compact?: boolean;
}

const flavorColors: Record<string, { bg: string; text: string; border: string; darkBg: string; darkText: string; darkBorder: string }> = {
  // Citrus flavors
  citrus: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", darkBg: "dark:bg-yellow-900/40", darkText: "dark:text-yellow-300", darkBorder: "dark:border-yellow-600/50" },
  lemon: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", darkBg: "dark:bg-yellow-900/40", darkText: "dark:text-yellow-300", darkBorder: "dark:border-yellow-600/50" },
  lime: { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300", darkBg: "dark:bg-lime-900/40", darkText: "dark:text-lime-300", darkBorder: "dark:border-lime-600/50" },
  orange: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", darkBg: "dark:bg-orange-900/40", darkText: "dark:text-orange-300", darkBorder: "dark:border-orange-600/50" },
  grapefruit: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300", darkBg: "dark:bg-pink-900/40", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-600/50" },
  zesty: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", darkBg: "dark:bg-yellow-900/40", darkText: "dark:text-yellow-300", darkBorder: "dark:border-yellow-600/50" },
  
  // Floral flavors
  floral: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300", darkBg: "dark:bg-pink-900/40", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-600/50" },
  rose: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-300", darkBg: "dark:bg-rose-900/40", darkText: "dark:text-rose-300", darkBorder: "dark:border-rose-600/50" },
  jasmine: { bg: "bg-fuchsia-100", text: "text-fuchsia-800", border: "border-fuchsia-300", darkBg: "dark:bg-fuchsia-900/40", darkText: "dark:text-fuchsia-300", darkBorder: "dark:border-fuchsia-600/50" },
  lavender: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", darkBg: "dark:bg-purple-900/40", darkText: "dark:text-purple-300", darkBorder: "dark:border-purple-600/50" },
  
  // Earthy flavors
  earthy: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", darkBg: "dark:bg-amber-900/40", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-600/50" },
  woody: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", darkBg: "dark:bg-amber-900/40", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-600/50" },
  nutty: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", darkBg: "dark:bg-amber-900/40", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-600/50" },
  
  // Sweet flavors
  sweet: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300", darkBg: "dark:bg-pink-900/40", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-600/50" },
  honey: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", darkBg: "dark:bg-amber-900/40", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-600/50" },
  caramel: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", darkBg: "dark:bg-orange-900/40", darkText: "dark:text-orange-300", darkBorder: "dark:border-orange-600/50" },
  vanilla: { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200", darkBg: "dark:bg-yellow-900/30", darkText: "dark:text-yellow-300", darkBorder: "dark:border-yellow-700/40" },
  
  // Rich flavors
  chocolate: { bg: "bg-amber-900/20", text: "text-amber-900", border: "border-amber-400", darkBg: "dark:bg-amber-800/40", darkText: "dark:text-amber-200", darkBorder: "dark:border-amber-500/50" },
  cocoa: { bg: "bg-amber-900/20", text: "text-amber-900", border: "border-amber-400", darkBg: "dark:bg-amber-800/40", darkText: "dark:text-amber-200", darkBorder: "dark:border-amber-500/50" },
  
  // Fresh flavors
  fresh: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300", darkBg: "dark:bg-emerald-900/40", darkText: "dark:text-emerald-300", darkBorder: "dark:border-emerald-600/50" },
  minty: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300", darkBg: "dark:bg-emerald-900/40", darkText: "dark:text-emerald-300", darkBorder: "dark:border-emerald-600/50" },
  mint: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300", darkBg: "dark:bg-emerald-900/40", darkText: "dark:text-emerald-300", darkBorder: "dark:border-emerald-600/50" },
  crisp: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300", darkBg: "dark:bg-cyan-900/40", darkText: "dark:text-cyan-300", darkBorder: "dark:border-cyan-600/50" },
  refreshing: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300", darkBg: "dark:bg-cyan-900/40", darkText: "dark:text-cyan-300", darkBorder: "dark:border-cyan-600/50" },
  
  // Spiced flavors
  spiced: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", darkBg: "dark:bg-orange-900/40", darkText: "dark:text-orange-300", darkBorder: "dark:border-orange-600/50" },
  spicy: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", darkBg: "dark:bg-red-900/40", darkText: "dark:text-red-300", darkBorder: "dark:border-red-600/50" },
  warming: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", darkBg: "dark:bg-orange-900/40", darkText: "dark:text-orange-300", darkBorder: "dark:border-orange-600/50" },
  warm: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", darkBg: "dark:bg-orange-900/40", darkText: "dark:text-orange-300", darkBorder: "dark:border-orange-600/50" },
  
  // Fruity flavors
  fruity: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", darkBg: "dark:bg-red-900/40", darkText: "dark:text-red-300", darkBorder: "dark:border-red-600/50" },
  berry: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", darkBg: "dark:bg-purple-900/40", darkText: "dark:text-purple-300", darkBorder: "dark:border-purple-600/50" },
  tropical: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", darkBg: "dark:bg-yellow-900/40", darkText: "dark:text-yellow-300", darkBorder: "dark:border-yellow-600/50" },
  peachy: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", darkBg: "dark:bg-orange-900/40", darkText: "dark:text-orange-300", darkBorder: "dark:border-orange-600/50" },
  tart: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", darkBg: "dark:bg-red-900/40", darkText: "dark:text-red-300", darkBorder: "dark:border-red-600/50" },
  tangy: { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300", darkBg: "dark:bg-lime-900/40", darkText: "dark:text-lime-300", darkBorder: "dark:border-lime-600/50" },
  
  // Creamy flavors
  creamy: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200", darkBg: "dark:bg-amber-900/30", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-700/40" },
  velvety: { bg: "bg-pink-50", text: "text-pink-800", border: "border-pink-200", darkBg: "dark:bg-pink-900/30", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-700/40" },
  velvet: { bg: "bg-pink-50", text: "text-pink-800", border: "border-pink-200", darkBg: "dark:bg-pink-900/30", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-700/40" },
  smooth: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200", darkBg: "dark:bg-blue-900/30", darkText: "dark:text-blue-300", darkBorder: "dark:border-blue-700/40" },
  silky: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200", darkBg: "dark:bg-purple-900/30", darkText: "dark:text-purple-300", darkBorder: "dark:border-purple-700/40" },
  
  // Herbal flavors
  herbal: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", darkBg: "dark:bg-green-900/40", darkText: "dark:text-green-300", darkBorder: "dark:border-green-600/50" },
  herbaceous: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", darkBg: "dark:bg-green-900/40", darkText: "dark:text-green-300", darkBorder: "dark:border-green-600/50" },
  grassy: { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300", darkBg: "dark:bg-lime-900/40", darkText: "dark:text-lime-300", darkBorder: "dark:border-lime-600/50" },
  verdant: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300", darkBg: "dark:bg-emerald-900/40", darkText: "dark:text-emerald-300", darkBorder: "dark:border-emerald-600/50" },
  
  // Other
  elegant: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", darkBg: "dark:bg-purple-900/40", darkText: "dark:text-purple-300", darkBorder: "dark:border-purple-600/50" },
  delicate: { bg: "bg-pink-50", text: "text-pink-800", border: "border-pink-200", darkBg: "dark:bg-pink-900/30", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-700/40" },
  magical: { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-300", darkBg: "dark:bg-violet-900/40", darkText: "dark:text-violet-300", darkBorder: "dark:border-violet-600/50" },
  balanced: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", darkBg: "dark:bg-blue-900/40", darkText: "dark:text-blue-300", darkBorder: "dark:border-blue-600/50" },
  luxurious: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", darkBg: "dark:bg-purple-900/40", darkText: "dark:text-purple-300", darkBorder: "dark:border-purple-600/50" },
  golden: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", darkBg: "dark:bg-amber-900/40", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-600/50" },
  rich: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", darkBg: "dark:bg-amber-900/40", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-600/50" },
  invigorating: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300", darkBg: "dark:bg-emerald-900/40", darkText: "dark:text-emerald-300", darkBorder: "dark:border-emerald-600/50" },
  summery: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", darkBg: "dark:bg-yellow-900/40", darkText: "dark:text-yellow-300", darkBorder: "dark:border-yellow-600/50" },
  colorful: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300", darkBg: "dark:bg-pink-900/40", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-600/50" },
  energizing: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300", darkBg: "dark:bg-orange-900/40", darkText: "dark:text-orange-300", darkBorder: "dark:border-orange-600/50" },
  vibrant: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300", darkBg: "dark:bg-pink-900/40", darkText: "dark:text-pink-300", darkBorder: "dark:border-pink-600/50" },
  light: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-300", darkBg: "dark:bg-sky-900/40", darkText: "dark:text-sky-300", darkBorder: "dark:border-sky-600/50" },
  bitter: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300", darkBg: "dark:bg-amber-900/40", darkText: "dark:text-amber-300", darkBorder: "dark:border-amber-600/50" },
};

const defaultColors = { 
  bg: "bg-gray-100", 
  text: "text-gray-800", 
  border: "border-gray-300", 
  darkBg: "dark:bg-gray-800/40", 
  darkText: "dark:text-gray-300", 
  darkBorder: "dark:border-gray-600/50" 
};

function getFlavorColors(flavor: string): typeof defaultColors {
  const lower = flavor.toLowerCase();
  
  // Check for direct match
  if (flavorColors[lower]) {
    return flavorColors[lower];
  }
  
  // Check for partial matches
  for (const [key, colors] of Object.entries(flavorColors)) {
    if (lower.includes(key) || key.includes(lower)) {
      return colors;
    }
  }
  
  // Default gradient
  return defaultColors;
}

export function FlavorTags({ flavors, compact = false }: FlavorTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {flavors.map((flavor, index) => {
        const colors = getFlavorColors(flavor);
        return (
          <motion.span
            key={flavor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            className={`inline-flex items-center rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${colors.darkBg} ${colors.darkText} ${colors.darkBorder} ${
              compact ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"
            } font-semibold shadow-sm`}
          >
            {flavor}
          </motion.span>
        );
      })}
    </div>
  );
}
