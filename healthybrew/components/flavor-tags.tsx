"use client";

import { motion } from "framer-motion";

interface FlavorTagsProps {
  flavors: string[];
  compact?: boolean;
}

const flavorColors: Record<string, { bg: string; text: string; border: string }> = {
  // Citrus flavors
  citrus: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  lemon: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  lime: { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300" },
  orange: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  grapefruit: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300" },
  zesty: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  
  // Floral flavors
  floral: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300" },
  rose: { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-300" },
  jasmine: { bg: "bg-fuchsia-100", text: "text-fuchsia-800", border: "border-fuchsia-300" },
  lavender: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  
  // Earthy flavors
  earthy: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  woody: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  nutty: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  
  // Sweet flavors
  sweet: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300" },
  honey: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  caramel: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  vanilla: { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200" },
  
  // Rich flavors
  chocolate: { bg: "bg-amber-900/20", text: "text-amber-900", border: "border-amber-400" },
  cocoa: { bg: "bg-amber-900/20", text: "text-amber-900", border: "border-amber-400" },
  
  // Fresh flavors
  fresh: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  minty: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  mint: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  crisp: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300" },
  refreshing: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300" },
  
  // Spiced flavors
  spiced: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  spicy: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
  warming: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  warm: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  
  // Fruity flavors
  fruity: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
  berry: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  tropical: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  peachy: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  tart: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
  tangy: { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300" },
  
  // Creamy flavors
  creamy: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  velvety: { bg: "bg-pink-50", text: "text-pink-800", border: "border-pink-200" },
  velvet: { bg: "bg-pink-50", text: "text-pink-800", border: "border-pink-200" },
  smooth: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
  silky: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
  
  // Herbal flavors
  herbal: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  herbaceous: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  grassy: { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-300" },
  verdant: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  
  // Other
  elegant: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  delicate: { bg: "bg-pink-50", text: "text-pink-800", border: "border-pink-200" },
  magical: { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-300" },
  balanced: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
  luxurious: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  golden: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  rich: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  invigorating: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  summery: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  colorful: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300" },
  energizing: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  vibrant: { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-300" },
  light: { bg: "bg-sky-100", text: "text-sky-800", border: "border-sky-300" },
  bitter: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
};

function getFlavorColors(flavor: string): { bg: string; text: string; border: string } {
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
  return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" };
}

export function FlavorTags({ flavors, compact = false }: FlavorTagsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {flavors.map((flavor, index) => {
        const colors = getFlavorColors(flavor);
        return (
          <motion.span
            key={flavor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            className={`inline-flex items-center rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${
              compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
            } font-semibold shadow-sm`}
          >
            {flavor}
          </motion.span>
        );
      })}
    </div>
  );
}
