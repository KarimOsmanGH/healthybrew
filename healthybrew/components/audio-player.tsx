"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lo-fi/ambient audio URL - using a free ambient track
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3";

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.5; // Use initial volume directly
    audioRef.current = audio;
    
    // Attempt to autoplay
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Autoplay was blocked by browser
        setAutoplayBlocked(true);
        setIsPlaying(false);
      });
    
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay was prevented
      });
    }
    setIsPlaying(!isPlaying);
    setAutoplayBlocked(false);
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => {
          if (autoplayBlocked) {
            // User interaction - try to play audio
            togglePlay();
          }
          setIsExpanded(!isExpanded);
        }}
        className="w-10 h-10 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:scale-110 transition-transform border border-stone-200 dark:border-zinc-700"
        whileTap={{ scale: 0.95 }}
        aria-label="Audio controls"
        animate={autoplayBlocked ? { scale: [1, 1.1, 1] } : {}}
        transition={autoplayBlocked ? { duration: 1.5, repeat: Infinity } : {}}
      >
        <span className="text-xl">{isPlaying ? "🎵" : "🔇"}</span>
      </motion.button>
      
      {/* Prompt when autoplay is blocked */}
      <AnimatePresence>
        {autoplayBlocked && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-12 top-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
          >
            Click to play music 🎶
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-12 right-0 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-stone-200 dark:border-zinc-700 min-w-[200px]"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-700 dark:text-zinc-300">
                  Ambient Music
                </span>
                <motion.button
                  type="button"
                  onClick={togglePlay}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isPlaying
                      ? "bg-amber-500 text-white"
                      : "bg-stone-200 dark:bg-zinc-700 text-stone-600 dark:text-zinc-400"
                  }`}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 dark:text-zinc-500">🔈</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-stone-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer accent-amber-500"
                />
                <span className="text-xs text-stone-500 dark:text-zinc-500">🔊</span>
              </div>

              {isPlaying && (
                <div className="flex items-center justify-center gap-1 pt-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-amber-500 rounded-full"
                      animate={{
                        height: [8, 16, 8],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
