"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
  swayAmount: number;
  rotation: number;
  opacity: number;
}

export function CherryBlossomRain() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Create 25 cherry blossom petals with random properties
    const newPetals: Petal[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      animationDuration: 8 + Math.random() * 12, // 8-20 seconds fall time
      size: 20 + Math.random() * 20, // 20-40px size
      delay: Math.random() * 5, // 0-5s start delay
      swayAmount: 30 + Math.random() * 50, // 30-80px horizontal sway
      rotation: Math.random() * 720, // Random rotation amount
      opacity: 0.3 + Math.random() * 0.5, // 0.3-0.8 opacity
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute -top-20"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            opacity: petal.opacity,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [
              0,
              petal.swayAmount,
              -petal.swayAmount * 0.5,
              petal.swayAmount * 0.8,
              -petal.swayAmount * 0.3,
              0,
            ],
            rotate: [0, petal.rotation],
          }}
          transition={{
            duration: petal.animationDuration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: petal.animationDuration,
              ease: "easeInOut",
            },
            rotate: {
              duration: petal.animationDuration * 0.5,
              ease: "linear",
            },
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}
