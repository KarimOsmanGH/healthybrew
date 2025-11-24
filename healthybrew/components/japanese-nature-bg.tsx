"use client";

import { motion } from "framer-motion";

export function JapaneseNatureBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Sky Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(to bottom, #fef3c7 0%, #fde68a 20%, #fca5a5 40%, #ddd6fe 70%, #e0e7ff 100%)",
            "linear-gradient(to bottom, #fde68a 0%, #fed7aa 20%, #fbb6ce 40%, #e9d5ff 70%, #dbeafe 100%)",
            "linear-gradient(to bottom, #fef3c7 0%, #fde68a 20%, #fca5a5 40%, #ddd6fe 70%, #e0e7ff 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Sun/Moon */}
      <motion.div
        className="absolute top-20 right-32 w-32 h-32 rounded-full"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          background: [
            "radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, rgba(251, 191, 36, 0) 70%)",
            "radial-gradient(circle, #fde047 0%, #fbbf24 50%, rgba(253, 224, 71, 0) 70%)",
            "radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, rgba(251, 191, 36, 0) 70%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 60px 30px rgba(251, 191, 36, 0.3)",
          filter: "blur(2px)",
        }}
      />

      {/* Animated Clouds */}
      <motion.div
        className="absolute top-32 left-10 w-40 h-20 rounded-full bg-white/40"
        animate={{
          x: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "blur(8px)",
        }}
      />
      <motion.div
        className="absolute top-48 right-20 w-56 h-24 rounded-full bg-white/30"
        animate={{
          x: [0, -120, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "blur(10px)",
        }}
      />
      <motion.div
        className="absolute top-24 left-1/3 w-48 h-20 rounded-full bg-white/35"
        animate={{
          x: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: "blur(7px)",
        }}
      />

      {/* Distant Mountains (Back Layer) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        animate={{
          opacity: [0.6, 0.7, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="#c4b5fd"
            fillOpacity="0.5"
            d="M0,160 L60,150 C120,140 240,120 360,130 C480,140 600,180 720,180 C840,180 960,140 1080,120 C1200,100 1320,100 1380,100 L1440,100 L1440,320 L0,320 Z"
            animate={{
              d: [
                "M0,160 L60,150 C120,140 240,120 360,130 C480,140 600,180 720,180 C840,180 960,140 1080,120 C1200,100 1320,100 1380,100 L1440,100 L1440,320 L0,320 Z",
                "M0,165 L60,155 C120,145 240,125 360,135 C480,145 600,185 720,185 C840,185 960,145 1080,125 C1200,105 1320,105 1380,105 L1440,105 L1440,320 L0,320 Z",
                "M0,160 L60,150 C120,140 240,120 360,130 C480,140 600,180 720,180 C840,180 960,140 1080,120 C1200,100 1320,100 1380,100 L1440,100 L1440,320 L0,320 Z",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Middle Mountains (Mount Fuji style) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        animate={{
          y: [0, -5, 0],
          opacity: [0.7, 0.8, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#mountainGradient)"
            d="M0,192 L80,180 C160,168 320,144 480,144 C640,144 800,168 960,180 C1120,192 1280,192 1360,192 L1440,192 L1440,320 L0,320 Z M600,100 L720,180 L840,100 L720,40 Z"
            animate={{
              d: [
                "M0,192 L80,180 C160,168 320,144 480,144 C640,144 800,168 960,180 C1120,192 1280,192 1360,192 L1440,192 L1440,320 L0,320 Z M600,100 L720,180 L840,100 L720,40 Z",
                "M0,195 L80,183 C160,171 320,147 480,147 C640,147 800,171 960,183 C1120,195 1280,195 1360,195 L1440,195 L1440,320 L0,320 Z M600,95 L720,175 L840,95 L720,35 Z",
                "M0,192 L80,180 C160,168 320,144 480,144 C640,144 800,168 960,180 C1120,192 1280,192 1360,192 L1440,192 L1440,320 L0,320 Z M600,100 L720,180 L840,100 L720,40 Z",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Foreground Mountains with Trees */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="foregroundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#foregroundGradient)"
            d="M0,224 L48,234.7 C96,245,192,267,288,261.3 C384,256,480,224,576,208 C672,192,768,192,864,202.7 C960,213,1056,235,1152,229.3 C1248,224,1344,192,1392,176 L1440,160 L1440,320 L0,320 Z"
            animate={{
              d: [
                "M0,224 L48,234.7 C96,245,192,267,288,261.3 C384,256,480,224,576,208 C672,192,768,192,864,202.7 C960,213,1056,235,1152,229.3 C1248,224,1344,192,1392,176 L1440,160 L1440,320 L0,320 Z",
                "M0,228 L48,238.7 C96,249,192,271,288,265.3 C384,260,480,228,576,212 C672,196,768,196,864,206.7 C960,217,1056,239,1152,233.3 C1248,228,1344,196,1392,180 L1440,164 L1440,320 L0,320 Z",
                "M0,224 L48,234.7 C96,245,192,267,288,261.3 C384,256,480,224,576,208 C672,192,768,192,864,202.7 C960,213,1056,235,1152,229.3 C1248,224,1344,192,1392,176 L1440,160 L1440,320 L0,320 Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Animated Water/Waves at Bottom */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-32">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#waterGradient)"
            d="M0,30 Q360,50 720,30 T1440,30 L1440,100 L0,100 Z"
            animate={{
              d: [
                "M0,30 Q360,50 720,30 T1440,30 L1440,100 L0,100 Z",
                "M0,35 Q360,25 720,35 T1440,35 L1440,100 L0,100 Z",
                "M0,30 Q360,50 720,30 T1440,30 L1440,100 L0,100 Z",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            fill="url(#waterGradient)"
            d="M0,50 Q360,70 720,50 T1440,50 L1440,100 L0,100 Z"
            animate={{
              d: [
                "M0,50 Q360,70 720,50 T1440,50 L1440,100 L0,100 Z",
                "M0,55 Q360,45 720,55 T1440,55 L1440,100 L0,100 Z",
                "M0,50 Q360,70 720,50 T1440,50 L1440,100 L0,100 Z",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </svg>
      </motion.div>

      {/* Floating Particles/Fireflies */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-yellow-200/60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 80}%`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Bamboo Silhouettes on sides */}
      <motion.div
        className="absolute left-0 bottom-20 w-16 h-96 opacity-20"
        animate={{
          x: [-5, 5, -5],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full"
            style={{
              height: `${200 + Math.random() * 100}px`,
              left: `${i * 12}px`,
              bottom: 0,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute right-0 bottom-20 w-16 h-96 opacity-20"
        animate={{
          x: [5, -5, 5],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full"
            style={{
              height: `${200 + Math.random() * 100}px`,
              right: `${i * 12}px`,
              bottom: 0,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
