"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  drinks,
  drinkTypes,
  Drink,
  DrinkType,
  healthFocuses,
  Ingredient,
} from "@/data/drinks";
import {
  CoffeeBeanIcon,
  CupSteamIcon,
  HeartHerbIcon,
  SparkIcon,
  TeaLeafIcon,
  WaterDropIcon,
} from "@/components/icons";
import { DynamicParticles } from "@/components/dynamic-particles";
import { CaffeineIndicator } from "@/components/caffeine-indicator";
import { FlavorTags } from "@/components/flavor-tags";
import { MobileNav } from "@/components/mobile-nav";
import {
  Check,
  ChevronDown,
  Dices,
  Filter,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";

const ingredientIconMap: Record<Ingredient["icon"], ReactElement> = {
  leaf: <TeaLeafIcon className="h-7 w-7 text-white" />,
  bean: <CoffeeBeanIcon className="h-7 w-7 text-white" />,
  flower: <HeartHerbIcon className="h-7 w-7 text-white" />,
  spice: <SparkIcon className="h-7 w-7 text-white" />,
  citrus: <CupSteamIcon className="h-7 w-7 text-white" />,
  root: <SparkIcon className="h-7 w-7 text-white" />,
  seed: <CupSteamIcon className="h-7 w-7 text-white" />,
};

const categoryIconMap: Record<DrinkType, ReactElement> = {
  tea: <TeaLeafIcon className="h-8 w-8 text-white" />,
  coffee: <CoffeeBeanIcon className="h-8 w-8 text-white" />,
  water: <WaterDropIcon className="h-8 w-8 text-white" />,
};

const healthFocusColors: Record<string, { default: string; selected: string; text: string }> = {
  "calm-focus": {
    default: "border-cyan-300/70 dark:border-cyan-600/50 bg-white/70 dark:bg-slate-800/70 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-50/90 dark:hover:bg-cyan-900/40 hover:border-cyan-400/70 dark:hover:border-cyan-500/60",
    selected: "border-cyan-400/80 dark:border-cyan-500/60 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/60 dark:to-blue-900/60 text-cyan-900 dark:text-cyan-200 shadow-lg shadow-cyan-400/30 dark:shadow-cyan-500/20",
    text: "cyan"
  },
  "immunity": {
    default: "border-emerald-300/70 dark:border-emerald-600/50 bg-white/70 dark:bg-slate-800/70 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50/90 dark:hover:bg-emerald-900/40 hover:border-emerald-400/70 dark:hover:border-emerald-500/60",
    selected: "border-emerald-400/80 dark:border-emerald-500/60 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/60 dark:to-green-900/60 text-emerald-900 dark:text-emerald-200 shadow-lg shadow-emerald-400/30 dark:shadow-emerald-500/20",
    text: "emerald"
  },
  "metabolic": {
    default: "border-orange-300/70 dark:border-orange-600/50 bg-white/70 dark:bg-slate-800/70 text-orange-800 dark:text-orange-300 hover:bg-orange-50/90 dark:hover:bg-orange-900/40 hover:border-orange-400/70 dark:hover:border-orange-500/60",
    selected: "border-orange-400/80 dark:border-orange-500/60 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/60 dark:to-amber-900/60 text-orange-900 dark:text-orange-200 shadow-lg shadow-orange-400/30 dark:shadow-orange-500/20",
    text: "orange"
  },
  "digestive": {
    default: "border-lime-300/70 dark:border-lime-600/50 bg-white/70 dark:bg-slate-800/70 text-lime-800 dark:text-lime-300 hover:bg-lime-50/90 dark:hover:bg-lime-900/40 hover:border-lime-400/70 dark:hover:border-lime-500/60",
    selected: "border-lime-400/80 dark:border-lime-500/60 bg-gradient-to-r from-lime-100 to-green-100 dark:from-lime-900/60 dark:to-green-900/60 text-lime-900 dark:text-lime-200 shadow-lg shadow-lime-400/30 dark:shadow-lime-500/20",
    text: "lime"
  },
  "energy-mood": {
    default: "border-yellow-300/70 dark:border-yellow-600/50 bg-white/70 dark:bg-slate-800/70 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-50/90 dark:hover:bg-yellow-900/40 hover:border-yellow-400/70 dark:hover:border-yellow-500/60",
    selected: "border-yellow-400/80 dark:border-yellow-500/60 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/60 dark:to-amber-900/60 text-yellow-900 dark:text-yellow-200 shadow-lg shadow-yellow-400/30 dark:shadow-yellow-500/20",
    text: "yellow"
  },
  "heart-circulation": {
    default: "border-rose-300/70 dark:border-rose-600/50 bg-white/70 dark:bg-slate-800/70 text-rose-800 dark:text-rose-300 hover:bg-rose-50/90 dark:hover:bg-rose-900/40 hover:border-rose-400/70 dark:hover:border-rose-500/60",
    selected: "border-rose-400/80 dark:border-rose-500/60 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/60 dark:to-pink-900/60 text-rose-900 dark:text-rose-200 shadow-lg shadow-rose-400/30 dark:shadow-rose-500/20",
    text: "rose"
  },
  "anti-inflammatory": {
    default: "border-amber-300/70 dark:border-amber-600/50 bg-white/70 dark:bg-slate-800/70 text-amber-800 dark:text-amber-300 hover:bg-amber-50/90 dark:hover:bg-amber-900/40 hover:border-amber-400/70 dark:hover:border-amber-500/60",
    selected: "border-amber-400/80 dark:border-amber-500/60 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/60 dark:to-yellow-900/60 text-amber-900 dark:text-amber-200 shadow-lg shadow-amber-400/30 dark:shadow-amber-500/20",
    text: "amber"
  },
  "stress-relief": {
    default: "border-purple-300/70 dark:border-purple-600/50 bg-white/70 dark:bg-slate-800/70 text-purple-800 dark:text-purple-300 hover:bg-purple-50/90 dark:hover:bg-purple-900/40 hover:border-purple-400/70 dark:hover:border-purple-500/60",
    selected: "border-purple-400/80 dark:border-purple-500/60 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/60 dark:to-pink-900/60 text-purple-900 dark:text-purple-200 shadow-lg shadow-purple-400/30 dark:shadow-purple-500/20",
    text: "purple"
  }
};

export default function Home() {
  const [activeType, setActiveType] = useState<DrinkType>("tea");
  const [searchTerm] = useState("");
  const [selectedIngredientFilters] = useState<Set<string>>(new Set());
  const [selectedBenefitFilters] = useState<Set<string>>(new Set());
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);
  const [pinnedBenefit, setPinnedBenefit] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoplayAttempted = useRef(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [highlightedDrinkId, setHighlightedDrinkId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // This runs only on initial render
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Sync dark mode state with DOM on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDarkMode !== isDark) {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const triggerFeedback = (message: string) => {
    setFeedback(message);
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
    }
    feedbackTimeout.current = setTimeout(() => {
      setFeedback(null);
      feedbackTimeout.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (feedbackTimeout.current) {
        clearTimeout(feedbackTimeout.current);
      }
    };
  }, []);

  // Auto-play music on mount with better mobile handling
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current && !autoplayAttempted.current) {
        autoplayAttempted.current = true;
        
        try {
          // Try to play immediately
          await audioRef.current.play();
          setIsMusicPlaying(true);
          setShowMusicPrompt(false);
        } catch {
          // Autoplay blocked - show prompt and set up interaction listeners
          setShowMusicPrompt(true);
          
          const handleFirstInteraction = async () => {
            if (audioRef.current && !isMusicPlaying) {
              try {
                await audioRef.current.play();
                setIsMusicPlaying(true);
                setShowMusicPrompt(false);
              } catch (err) {
                console.log('Play attempt failed:', err);
              }
            }
          };

          // Add event listeners for first interaction
          const events = ['click', 'touchstart', 'keydown'];
          events.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
          });
          
          // Cleanup function
          return () => {
            events.forEach(event => {
              document.removeEventListener(event, handleFirstInteraction);
            });
          };
        }
      }
    };

    attemptAutoplay();
  }, [isMusicPlaying]);

  const activeFocus = useMemo(
    () => (selectedFocus ? healthFocuses.find((focus) => focus.id === selectedFocus) ?? null : null),
    [selectedFocus],
  );

  const drinksForType = useMemo(
    () => drinks.filter((drink) => drink.type === activeType),
    [activeType],
  );

  const highlightedBenefit = pinnedBenefit ?? hoveredBenefit;

  const filteredDrinks = useMemo(() => {
    const focusBenefits = activeFocus ? new Set(activeFocus.benefits) : null;

    const list = drinksForType
      .map((drink) => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const matchesSearch = normalizedSearch
          ? [drink.name, drink.description, drink.flavorNotes.join(" ")] // optional
              .join(" ")
              .toLowerCase()
              .includes(normalizedSearch)
          : true;

        const matchesIngredients = selectedIngredientFilters.size
          ? Array.from(selectedIngredientFilters).every((ingredient) =>
              drink.ingredients.some((item) => item.name === ingredient),
            )
          : true;

        const matchesBenefits = selectedBenefitFilters.size
          ? Array.from(selectedBenefitFilters).every((benefit) => drink.healthBenefits.includes(benefit))
          : true;

        const focusScore = focusBenefits
          ? drink.healthBenefits.reduce((score, benefit) => score + (focusBenefits.has(benefit) ? 1 : 0), 0)
          : 0;

        return {
          drink,
          matches: matchesSearch && matchesIngredients && matchesBenefits && (focusBenefits ? focusScore > 0 : true),
          focusScore,
        };
      })
      .filter(({ matches }) => matches)
      .sort((a, b) => b.focusScore - a.focusScore);

    return list.map((item) => item.drink);
  }, [activeFocus, drinksForType, searchTerm, selectedBenefitFilters, selectedIngredientFilters]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restriction
          triggerFeedback("Click to enable music");
        });
        setIsMusicPlaying(true);
      }
    }
  };

  const handleRandomBrew = () => {
    if (filteredDrinks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredDrinks.length);
    const randomDrink = filteredDrinks[randomIndex];
    setHighlightedDrinkId(randomDrink.id);
    triggerFeedback(`✨ Try ${randomDrink.name}!`);
    
    // Scroll to the drink card
    setTimeout(() => {
      const element = document.getElementById(`drink-${randomDrink.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
    
    // Remove highlight after animation
    setTimeout(() => {
      setHighlightedDrinkId(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900">
      {/* Japanese Background Image with Animation */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          x: [0, -20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/japan-nature-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: isDarkMode ? 0.08 : 0.15,
        }}
      />
      
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/90 via-purple-50/90 to-blue-50/90 dark:from-slate-950/95 dark:via-purple-950/95 dark:to-slate-900/95 pointer-events-none" />
      
      {/* Dynamic Particles based on drink type */}
      <DynamicParticles drinkType={activeType} />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-pink-300/20 to-purple-300/20 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-60 h-60 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 dark:from-yellow-500/10 dark:to-orange-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-1/3 w-54 h-54 bg-gradient-to-br from-rose-300/20 to-pink-300/20 dark:from-rose-500/10 dark:to-pink-500/10 rounded-full blur-2xl"
        />
      </div>
      {/* Lofi Music Player */}
      <audio ref={audioRef} loop preload="auto" playsInline className="hidden">
        <source src="https://stream.zeno.fm/f3wvbbqmdg8uv" type="audio/mpeg" />
      </audio>
      
      {/* Music Prompt for Mobile */}
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-44 right-6 sm:bottom-32 sm:right-8 z-50 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 p-5 sm:p-6 shadow-2xl max-w-[320px] sm:max-w-sm"
          >
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.play().then(() => {
                    setIsMusicPlaying(true);
                    setShowMusicPrompt(false);
                  }).catch(() => {
                    triggerFeedback("Could not play music");
                  });
                }
              }}
              className="w-full text-left"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                  <Volume2 className="h-7 w-7 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-white">Tap to play lofi music ♪</p>
                  <p className="text-sm text-white/80">Perfect for browsing</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setShowMusicPrompt(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100 text-lg"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dark Mode Toggle Button - Hidden on mobile (available in MobileNav) */}
      <motion.button
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-8 z-50 hidden sm:flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-500 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-500 text-white shadow-2xl shadow-purple-500/30 dark:shadow-amber-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-amber-300 focus:ring-offset-2"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? <Sun className="h-7 w-7 sm:h-8 sm:w-8" /> : <Moon className="h-7 w-7 sm:h-8 sm:w-8" />}
        </motion.div>
      </motion.button>
      
      {/* Music Control Button - Hidden on mobile (available in MobileNav) */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-44 right-8 z-50 hidden sm:flex h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 text-white shadow-2xl shadow-purple-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
        aria-label={isMusicPlaying ? "Pause lofi music" : "Play lofi music"}
      >
        <motion.div
          animate={isMusicPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.8, repeat: isMusicPlaying ? Infinity : 0 }}
        >
          {isMusicPlaying ? <Volume2 className="h-7 w-7 sm:h-8 sm:w-8" /> : <VolumeX className="h-7 w-7 sm:h-8 sm:w-8" />}
        </motion.div>
      </motion.button>
      
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 pb-32 pt-8 sm:gap-10 sm:px-8 sm:pb-14 sm:pt-14 lg:px-10">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[2.5rem] border-3 sm:rounded-[3rem] sm:border-4 border-purple-300/60 dark:border-purple-600/40 bg-gradient-to-br from-purple-100/90 via-pink-100/90 to-blue-100/90 dark:from-purple-900/50 dark:via-pink-900/50 dark:to-slate-800/50 p-6 sm:p-10 shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/30 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Sparkle Effects */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-6 right-6 text-5xl pointer-events-none"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-6 left-6 text-4xl pointer-events-none"
          >
            ☆
          </motion.div>
          
          {/* Big Animated Coffee/Tea/Water Emoji */}
          <motion.div
            key={activeType}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: 1, 
              rotate: 0, 
              opacity: 1,
              y: [0, -15, 0],
            }}
            transition={{ 
              scale: { duration: 0.5, ease: "easeOut" },
              rotate: { duration: 0.5, ease: "easeOut" },
              opacity: { duration: 0.3 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.15, 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
            className="absolute top-4 right-4 text-6xl sm:top-8 sm:right-20 sm:text-[10rem] cursor-pointer filter drop-shadow-2xl"
            style={{ 
              textShadow: "0 10px 40px rgba(147, 51, 234, 0.3)"
            }}
          >
            {activeType === 'tea' ? '🍵' : activeType === 'coffee' ? '☕' : '💧'}
          </motion.div>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent sm:text-4xl lg:text-6xl pr-16 sm:pr-0 flex items-center gap-4"
              >
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600 dark:text-purple-400" />
                Healthbrew
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl text-base sm:text-lg text-purple-700/90 dark:text-purple-300/90"
              >
                Explore delightful recipes and discover the perfect blend for your wellness journey ✨✿✨
              </motion.p>
            </div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 rounded-full bg-white/80 dark:bg-slate-800/80 p-1.5 sm:p-2 shadow-lg backdrop-blur-sm border-2 border-purple-200/50 dark:border-purple-600/30">
                {drinkTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActiveType(type)}
                    className={`flex items-center gap-2 sm:gap-3 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-bold transition-all ${
                      activeType === type
                        ? "bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 text-white shadow-lg shadow-purple-400/50"
                        : "text-purple-700/70 dark:text-purple-300/70 hover:text-purple-800 dark:hover:text-purple-200 hover:bg-white/60 dark:hover:bg-slate-700/60"
                    }`}
                  >
                    {categoryIconMap[type]}
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Random Brew Button */}
                <motion.button
                  onClick={handleRandomBrew}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-400/40 transition-all hover:shadow-orange-500/50"
                >
                  <Dices className="h-5 w-5" />
                  <span>Surprise!</span>
                </motion.button>
                
                <AnimatePresence>
                  {feedback && (
                    <motion.span
                      key={feedback}
                      initial={{ opacity: 0, y: -6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 px-6 py-3 text-base font-bold text-white shadow-lg shadow-green-400/50"
                    >
                      <Check className="h-5 w-5" />
                      {feedback}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.header>

        {/* Horizontal Health Focus Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-3xl border-3 border-purple-200/60 dark:border-purple-600/30 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-base font-bold text-purple-800 dark:text-purple-200">
              <Filter className="h-5 w-5" />
              <span>Health Focus</span>
            </div>
            {selectedFocus && (
              <button
                type="button"
                onClick={() => setSelectedFocus(null)}
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {healthFocuses.map((focus) => {
              const isSelected = selectedFocus === focus.id;
              const colors = healthFocusColors[focus.id] || healthFocusColors["calm-focus"];
              return (
                <motion.button
                  key={focus.id}
                  type="button"
                  onClick={() => setSelectedFocus(isSelected ? null : focus.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-2xl border-2 px-5 py-3 text-left transition-all ${
                    isSelected
                      ? colors.selected
                      : colors.default
                  }`}
                >
                  <p className="text-sm font-bold">{focus.label}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        <section className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-purple-700/70 dark:text-purple-300/70">
              {filteredDrinks.length} {filteredDrinks.length === 1 ? 'recipe' : 'recipes'} found
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredDrinks.map((drink) => (
                <DrinkCard
                  key={drink.id}
                  drink={drink}
                  highlightedBenefit={highlightedBenefit}
                  pinnedBenefit={pinnedBenefit}
                  onHoverBenefit={setHoveredBenefit}
                  onPinBenefit={(benefit) => setPinnedBenefit((current) => (current === benefit ? null : benefit))}
                  isHighlightedRandom={highlightedDrinkId === drink.id}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeType={activeType}
        onTypeChange={setActiveType}
        onRandomBrew={handleRandomBrew}
        isMusicPlaying={isMusicPlaying}
        onMusicToggle={toggleMusic}
      />
    </div>
  );
}

interface DrinkCardProps {
  drink: Drink;
  highlightedBenefit: string | null;
  pinnedBenefit: string | null;
  onHoverBenefit: (benefit: string | null) => void;
  onPinBenefit: (benefit: string) => void;
  isHighlightedRandom?: boolean;
}

function DrinkCard({
  drink,
  highlightedBenefit,
  pinnedBenefit,
  onHoverBenefit,
  onPinBenefit,
  isHighlightedRandom = false,
}: DrinkCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const gradientColors = [
    "from-rose-400 via-pink-400 to-purple-400",
    "from-blue-400 via-cyan-400 to-teal-400",
    "from-amber-400 via-orange-400 to-red-400",
    "from-emerald-400 via-green-400 to-lime-400",
    "from-violet-400 via-purple-400 to-fuchsia-400",
    "from-yellow-400 via-amber-400 to-orange-400",
  ];
  const gradientIndex = drink.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradientColors.length;
  const cardGradient = gradientColors[gradientIndex];
  
  return (
    <motion.article
      id={`drink-${drink.id}`}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: isHighlightedRandom ? 1.02 : 1,
        boxShadow: isHighlightedRandom 
          ? "0 0 0 4px rgba(251, 191, 36, 0.6), 0 10px 25px -5px rgba(147, 51, 234, 0.2)" 
          : "0 10px 25px -5px rgba(147, 51, 234, 0.15)"
      }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative flex flex-col rounded-3xl border-3 ${
        isHighlightedRandom 
          ? "border-amber-400 ring-2 ring-amber-400/30" 
          : "border-purple-200/60 dark:border-purple-600/30"
      } bg-white/95 dark:bg-slate-800/95 p-6 shadow-lg backdrop-blur-sm overflow-hidden hover:shadow-xl hover:border-purple-300/80 dark:hover:border-purple-500/50 cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Random highlight glow effect */}
      {isHighlightedRandom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-orange-100/40 dark:from-amber-900/20 dark:to-orange-900/20 pointer-events-none"
        />
      )}
      
      {/* Gradient Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cardGradient}`} />
      
      {/* Collapsed View - Title, Description, Labels */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${cardGradient} bg-clip-text text-transparent`}>
              {drink.type} blend
            </p>
            <h3 className="text-base font-bold text-purple-900 dark:text-purple-100 truncate">
              {drink.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <CaffeineIndicator drink={drink} />
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-purple-400 dark:text-purple-500"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>
        </div>
        
        <p className={`text-sm text-purple-700/80 dark:text-purple-300/80 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {drink.description}
        </p>

        {/* Health benefit labels - always visible */}
        <div className="flex flex-wrap gap-1.5">
          {drink.healthBenefits.slice(0, isExpanded ? undefined : 3).map((benefit) => {
            const isPinned = pinnedBenefit === benefit;
            const isActive = highlightedBenefit === benefit;
            return (
              <button
                key={benefit}
                type="button"
                onMouseEnter={() => onHoverBenefit(benefit)}
                onMouseLeave={() => onHoverBenefit(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onPinBenefit(benefit);
                }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                  isPinned
                    ? `border-transparent bg-gradient-to-r ${cardGradient} text-white`
                    : isActive
                      ? "border-purple-300 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                      : "border-purple-200/60 dark:border-purple-600/40 bg-purple-50/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800/40"
                }`}
              >
                {benefit}
              </button>
            );
          })}
          {!isExpanded && drink.healthBenefits.length > 3 && (
            <span className="text-xs text-purple-400 dark:text-purple-500 font-medium px-2">
              +{drink.healthBenefits.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pt-4 mt-4 border-t border-purple-100 dark:border-purple-700/50 space-y-4">
              {/* Flavor Notes */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">Flavor Notes</p>
                <FlavorTags flavors={drink.flavorNotes} />
              </div>

              {/* Preparation */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">Preparation</p>
                <ol className="space-y-2">
                  {drink.preparation.map((step, index) => (
                    <li key={`${drink.id}-prep-${index}`} className="flex gap-3 items-start">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${cardGradient} text-xs font-bold text-white flex-shrink-0`}>
                        {index + 1}
                      </span>
                      <span className="text-sm text-purple-800/80 dark:text-purple-200/80">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Ingredients */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                  Ingredients ({drink.ingredients.length})
                </p>
                <div className="grid gap-2">
                  {drink.ingredients.map((ingredient) => {
                    const isHighlighted = highlightedBenefit
                      ? ingredient.benefits.includes(highlightedBenefit)
                      : false;
                    return (
                      <div
                        key={ingredient.name}
                        className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                          isHighlighted
                            ? "border-purple-300 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/40"
                            : "border-purple-100 dark:border-purple-700/50 bg-white/80 dark:bg-slate-700/50"
                        }`}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${cardGradient} flex-shrink-0`}>
                          {ingredientIconMap[ingredient.icon]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">{ingredient.name}</p>
                          <p className="text-xs text-purple-600/70 dark:text-purple-400/70 truncate">{ingredient.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
