"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { DrinkType } from "@/data/drinks";

interface Particle {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
  swayAmount: number;
  rotation: number;
  opacity: number;
}

const particleEmojis: Record<DrinkType, string[]> = {
  tea: ["🌸", "🍃", "🌿", "✿", "❀"],
  coffee: ["☕", "✨", "🫘", "💫", "⭐"],
  water: ["💧", "🫧", "💦", "❄️", "✧"],
};

// Pre-generate stable particle data using seeded pseudo-random values
function generateParticles(seed: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 20; i++) {
    const s = seed + i;
    particles.push({
      id: i,
      left: ((s * 17) % 100),
      animationDuration: 10 + ((s * 23) % 15),
      size: 16 + ((s * 13) % 16),
      delay: (s * 7) % 8,
      swayAmount: 20 + ((s * 11) % 40),
      rotation: (s * 31) % 720,
      opacity: 0.2 + ((s * 19) % 40) / 100,
    });
  }
  return particles;
}

interface DynamicParticlesProps {
  drinkType: DrinkType;
}

export function DynamicParticles({ drinkType }: DynamicParticlesProps) {
  const emojis = particleEmojis[drinkType];
  
  // Use useMemo with a stable seed based on drink type
  const particles = useMemo(() => {
    const seed = drinkType === "tea" ? 42 : drinkType === "coffee" ? 73 : 91;
    return generateParticles(seed);
  }, [drinkType]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <motion.div
          key={`${drinkType}-${particle.id}`}
          className="absolute -top-20"
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [
              0,
              particle.swayAmount,
              -particle.swayAmount * 0.5,
              particle.swayAmount * 0.8,
              -particle.swayAmount * 0.3,
              0,
            ],
            rotate: [0, particle.rotation],
          }}
          transition={{
            duration: particle.animationDuration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: particle.animationDuration,
              ease: "easeInOut",
            },
            rotate: {
              duration: particle.animationDuration * 0.5,
              ease: "linear",
            },
          }}
        >
          {emojis[particle.id % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
}
