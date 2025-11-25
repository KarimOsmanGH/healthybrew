"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
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
import { HealthSummary } from "@/components/health-summary";
import { CherryBlossomRain } from "@/components/cherry-blossom-rain";
import { JapaneseNatureBg } from "@/components/japanese-nature-bg";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  RotateCcw,
  Save,
  Search,
  Share2,
  Sparkles,
  Trash2,
  Volume2,
  VolumeX,
} from "lucide-react";

type SelectedIngredient = {
  name: string;
  count: number;
  benefits: string[];
  sources: string[];
  icon: Ingredient["icon"];
};

const ingredientIconMap: Record<Ingredient["icon"], ReactElement> = {
  leaf: <TeaLeafIcon className="h-5 w-5 text-white" />,
  bean: <CoffeeBeanIcon className="h-5 w-5 text-white" />,
  flower: <HeartHerbIcon className="h-5 w-5 text-white" />,
  spice: <SparkIcon className="h-5 w-5 text-white" />,
  citrus: <CupSteamIcon className="h-5 w-5 text-white" />,
  root: <SparkIcon className="h-5 w-5 text-white" />,
  seed: <CupSteamIcon className="h-5 w-5 text-white" />,
};

const categoryIconMap: Record<DrinkType, ReactElement> = {
  tea: <TeaLeafIcon className="h-6 w-6 text-white" />,
  coffee: <CoffeeBeanIcon className="h-6 w-6 text-white" />,
  water: <WaterDropIcon className="h-6 w-6 text-white" />,
};

const highlightPalette = [
  "bg-emerald-50 text-emerald-700 ring-2 ring-inset ring-emerald-200",
  "bg-rose-50 text-rose-700 ring-2 ring-inset ring-rose-200",
  "bg-amber-50 text-amber-700 ring-2 ring-inset ring-amber-200",
  "bg-sky-50 text-sky-700 ring-2 ring-inset ring-sky-200",
];

const healthFocusColors: Record<string, { default: string; selected: string; text: string }> = {
  "calm-focus": {
    default: "border-cyan-300/70 bg-white/70 text-cyan-800 hover:bg-cyan-50/90 hover:border-cyan-400/70",
    selected: "border-cyan-400/80 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-900 shadow-lg shadow-cyan-400/30",
    text: "cyan"
  },
  "immunity": {
    default: "border-emerald-300/70 bg-white/70 text-emerald-800 hover:bg-emerald-50/90 hover:border-emerald-400/70",
    selected: "border-emerald-400/80 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-900 shadow-lg shadow-emerald-400/30",
    text: "emerald"
  },
  "metabolic": {
    default: "border-orange-300/70 bg-white/70 text-orange-800 hover:bg-orange-50/90 hover:border-orange-400/70",
    selected: "border-orange-400/80 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-900 shadow-lg shadow-orange-400/30",
    text: "orange"
  },
  "digestive": {
    default: "border-lime-300/70 bg-white/70 text-lime-800 hover:bg-lime-50/90 hover:border-lime-400/70",
    selected: "border-lime-400/80 bg-gradient-to-r from-lime-100 to-green-100 text-lime-900 shadow-lg shadow-lime-400/30",
    text: "lime"
  },
  "energy-mood": {
    default: "border-yellow-300/70 bg-white/70 text-yellow-800 hover:bg-yellow-50/90 hover:border-yellow-400/70",
    selected: "border-yellow-400/80 bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-900 shadow-lg shadow-yellow-400/30",
    text: "yellow"
  },
  "heart-circulation": {
    default: "border-rose-300/70 bg-white/70 text-rose-800 hover:bg-rose-50/90 hover:border-rose-400/70",
    selected: "border-rose-400/80 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-900 shadow-lg shadow-rose-400/30",
    text: "rose"
  },
  "anti-inflammatory": {
    default: "border-amber-300/70 bg-white/70 text-amber-800 hover:bg-amber-50/90 hover:border-amber-400/70",
    selected: "border-amber-400/80 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 shadow-lg shadow-amber-400/30",
    text: "amber"
  },
  "stress-relief": {
    default: "border-purple-300/70 bg-white/70 text-purple-800 hover:bg-purple-50/90 hover:border-purple-400/70",
    selected: "border-purple-400/80 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 shadow-lg shadow-purple-400/30",
    text: "purple"
  }
};

export default function Home() {
  const [activeType, setActiveType] = useState<DrinkType>("tea");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredientFilters, setSelectedIngredientFilters] = useState<Set<string>>(new Set());
  const [selectedBenefitFilters, setSelectedBenefitFilters] = useState<Set<string>>(new Set());
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);
  const [pinnedBenefit, setPinnedBenefit] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, SelectedIngredient>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoplayAttempted = useRef(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);

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
        } catch (error) {
          // Autoplay blocked - show prompt and set up interaction listeners
          console.log('Autoplay blocked - showing music prompt');
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

  const ingredientOptions = useMemo(() => {
    const set = new Set<string>();
    drinksForType.forEach((drink) => {
      drink.ingredients.forEach((ingredient) => set.add(ingredient.name));
    });
    return Array.from(set).sort();
  }, [drinksForType]);

  const benefitOptions = useMemo(() => {
    const set = new Set<string>();
    drinksForType.forEach((drink) => {
      drink.healthBenefits.forEach((benefit) => set.add(benefit));
    });
    return Array.from(set).sort();
  }, [drinksForType]);

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

  const combinedBenefits = useMemo(() => {
    const map = new Map<string, number>();
    Object.values(selectedIngredients).forEach((ingredient) => {
      ingredient.benefits.forEach((benefit) => {
        map.set(benefit, (map.get(benefit) ?? 0) + ingredient.count);
      });
    });
    return map;
  }, [selectedIngredients]);

  const totalTouchpoints = useMemo(
    () => Array.from(combinedBenefits.values()).reduce((total, value) => total + value, 0),
    [combinedBenefits],
  );

  const healthMetrics = useMemo(() => {
    const buckets = [
      {
        id: "calm",
        label: "Calm & Clarity",
        description: "Stress relief, focus, gentle lift",
        tags: ["Calming", "Stress relief", "Focus support", "Gentle energy", "Hormonal balance"],
      },
      {
        id: "heart",
        label: "Heart & Immunity",
        description: "Cardio flow and immune resilience",
        tags: ["Cardio health", "Circulation support", "Immune support", "Respiratory comfort", "Heart nourishment"],
      },
      {
        id: "spark",
        label: "Metabolic Spark",
        description: "Energy, metabolism, mood",
        tags: ["Energy lift", "Metabolism support", "Mood balance"],
      },
      {
        id: "vitality",
        label: "Soothe & Restore",
        description: "Anti-inflammatory comfort",
        tags: ["Digestive comfort", "Anti-inflammatory", "Joint support"],
      },
    ];

    return buckets.map((bucket) => ({
      id: bucket.id,
      label: bucket.label,
      description: bucket.description,
      value: bucket.tags.reduce((score, tag) => score + (combinedBenefits.get(tag) ?? 0), 0),
    }));
  }, [combinedBenefits]);

  const combinedBenefitList = useMemo(() => {
    return Array.from(combinedBenefits.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [combinedBenefits]);

  const handleToggleSet = (
    value: string,
    setter: Dispatch<SetStateAction<Set<string>>>,
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const handleAddDrinkToBlend = (drink: Drink) => {
    setSelectedIngredients((prev) => {
      const next = { ...prev };
      drink.ingredients.forEach((ingredient) => {
        if (!next[ingredient.name]) {
          next[ingredient.name] = {
            name: ingredient.name,
            count: 0,
            benefits: [...ingredient.benefits],
            sources: [drink.name],
            icon: ingredient.icon,
          };
        }

        const current = next[ingredient.name];
        current.count += 1;
        current.benefits = Array.from(new Set([...current.benefits, ...ingredient.benefits]));
        if (!current.sources.includes(drink.name)) {
          current.sources.push(drink.name);
        }
      });
      return next;
    });

    triggerFeedback(`${drink.name} added to blend`);
  };

  const handleRemoveIngredient = (name: string) => {
    setSelectedIngredients((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleClearBlend = () => {
    setSelectedIngredients({});
    triggerFeedback("Blend cleared");
  };

  const handleSaveAction = (action: "save" | "export") => {
    const label = action === "save" ? "Blend saved as favorite" : "Recipe exported";
    triggerFeedback(label);
  };

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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
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
          opacity: 0.15,
        }}
      />
      
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/90 via-purple-50/90 to-blue-50/90 pointer-events-none" />
      
      {/* Cherry Blossom Rain */}
      <CherryBlossomRain />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 right-1/3 w-36 h-36 bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-full blur-2xl"
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
            className="fixed bottom-36 right-4 sm:bottom-24 sm:right-6 z-50 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 p-3 sm:p-4 shadow-2xl max-w-[280px] sm:max-w-xs"
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
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                  <Volume2 className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Tap to play lofi music ♪</p>
                  <p className="text-xs text-white/80">Perfect for browsing</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setShowMusicPrompt(false)}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-100"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Music Control Button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 text-white shadow-2xl shadow-purple-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
        aria-label={isMusicPlaying ? "Pause lofi music" : "Play lofi music"}
      >
        <motion.div
          animate={isMusicPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.8, repeat: isMusicPlaying ? Infinity : 0 }}
        >
          {isMusicPlaying ? <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" /> : <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" />}
        </motion.div>
      </motion.button>
      
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-3 pb-24 pt-6 sm:gap-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[2rem] border-2 sm:rounded-[2.5rem] sm:border-4 border-purple-300/60 bg-gradient-to-br from-purple-100/90 via-pink-100/90 to-blue-100/90 p-4 sm:p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Sparkle Effects */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4 text-4xl pointer-events-none"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-4 left-4 text-3xl pointer-events-none"
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
            className="absolute top-3 right-3 text-5xl sm:top-6 sm:right-16 sm:text-9xl cursor-pointer filter drop-shadow-2xl"
            style={{ 
              textShadow: "0 10px 40px rgba(147, 51, 234, 0.3)"
            }}
          >
            {activeType === 'tea' ? '🍵' : activeType === 'coffee' ? '☕' : '💧'}
          </motion.div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-purple-600"
              >
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-[0.3em]">HealthyBrew</span>
              </motion.div>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent sm:text-3xl lg:text-5xl pr-12 sm:pr-0"
              >
                Tea & Coffee Wellness ♡
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl text-sm sm:text-base text-purple-700/90"
              >
                Explore delightful recipes and discover the perfect blend for your wellness journey ✨✿✨
              </motion.p>
            </div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3 rounded-full bg-white/80 p-1.5 shadow-lg backdrop-blur-sm border-2 border-purple-200/50">
              {drinkTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                    activeType === type
                      ? "bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 text-white shadow-lg shadow-purple-400/50"
                      : "text-purple-700/70 hover:text-purple-800 hover:bg-white/60"
                  }`}
                >
                  {categoryIconMap[type]}
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
            <AnimatePresence>
              {feedback && (
                <motion.span
                  key={feedback}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-green-400/50"
                >
                  <Check className="h-4 w-4" />
                  {feedback}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.header>

        <div className="grid flex-1 gap-4 lg:gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <motion.aside
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 sm:gap-6 rounded-[2rem] border-2 sm:rounded-[2.5rem] sm:border-4 border-blue-300/60 p-4 sm:p-6 shadow-2xl shadow-blue-500/20 backdrop-blur-xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(219, 234, 254, 0.95) 0%, rgba(243, 232, 255, 0.95) 50%, rgba(252, 231, 243, 0.95) 100%)"
            }}
          >
            {/* Animated Japanese Wave Pattern Background */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(147, 197, 253, 0.8) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(196, 181, 253, 0.8) 0%, transparent 50%),
                  radial-gradient(circle at 40% 20%, rgba(249, 168, 212, 0.8) 0%, transparent 50%)
                `,
                backgroundSize: "200% 200%",
              }}
            />
            
            {/* Flowing Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full blur-3xl"
            />
            
            <motion.div
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-pink-400/40 to-purple-400/40 rounded-full blur-3xl"
            />
            
            {/* Subtle Wave Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M0,100 Q50,50 100,100 T200,100"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                animate={{
                  d: [
                    "M0,100 Q50,50 100,100 T200,100",
                    "M0,100 Q50,150 100,100 T200,100",
                    "M0,100 Q50,50 100,100 T200,100",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d="M0,150 Q50,100 100,150 T200,150"
                stroke="url(#gradient2)"
                strokeWidth="2"
                fill="none"
                animate={{
                  d: [
                    "M0,150 Q50,100 100,150 T200,150",
                    "M0,150 Q50,200 100,150 T200,150",
                    "M0,150 Q50,100 100,150 T200,150",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#C084FC" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F472B6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Content with higher z-index */}
            <div className="relative z-10 flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-bold text-purple-800">
                  <span className="inline-flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Health Focus
                  </span>
                  {selectedFocus && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFocus(null);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-800"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset
                    </button>
                  )}
                </div>

                <section className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-700/70">
                    Select your goal
                  </p>
                  <div className="space-y-2">
                    {healthFocuses.map((focus) => {
                      const isSelected = selectedFocus === focus.id;
                      const colors = healthFocusColors[focus.id] || healthFocusColors["calm-focus"];
                      return (
                        <button
                          key={focus.id}
                          type="button"
                          onClick={() => setSelectedFocus(isSelected ? null : focus.id)}
                          className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition-all transform hover:scale-105 ${
                            isSelected
                              ? colors.selected
                              : colors.default + " hover:shadow-md"
                          }`}
                        >
                          <p className="text-sm font-bold">{focus.label}</p>
                          <p className={`text-xs ${isSelected ? `text-${colors.text}-700/90` : `text-${colors.text}-700/70`}`}>
                            {focus.tagline}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </motion.aside>

          <section className="space-y-4">
            <div className="grid gap-5 xl:grid-cols-2">
              <AnimatePresence>
                {filteredDrinks.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                    highlightedBenefit={highlightedBenefit}
                    pinnedBenefit={pinnedBenefit}
                    onHoverBenefit={setHoveredBenefit}
                    onPinBenefit={(benefit) => setPinnedBenefit((current) => (current === benefit ? null : benefit))}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pb-6 text-center text-sm text-purple-600/70 font-bold"
        >
          ✨ Crafted with love and botanicals ✨
        </motion.footer>
      </div>
    </div>
  );
}

interface DrinkCardProps {
  drink: Drink;
  highlightedBenefit: string | null;
  pinnedBenefit: string | null;
  onHoverBenefit: (benefit: string | null) => void;
  onPinBenefit: (benefit: string) => void;
}

function DrinkCard({
  drink,
  highlightedBenefit,
  pinnedBenefit,
  onHoverBenefit,
  onPinBenefit,
}: DrinkCardProps) {
  const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(false);
  const [isPreparationExpanded, setIsPreparationExpanded] = useState(true);
  const [isBenefitsExpanded, setIsBenefitsExpanded] = useState(false);
  
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
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex h-full flex-col rounded-[2rem] border-2 sm:rounded-[2.5rem] sm:border-4 border-purple-300/60 bg-white p-4 sm:p-7 shadow-2xl shadow-purple-500/20 backdrop-blur-sm overflow-hidden hover:shadow-purple-500/30 hover:border-purple-400/80"
    >
      {/* Gradient Accent */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${cardGradient}`} />
      
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] bg-gradient-to-r ${cardGradient} bg-clip-text text-transparent`}
            >
              {drink.type} blend
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-1 text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent"
            >
              {drink.name}
            </motion.h3>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r ${cardGradient} px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-white shadow-lg flex-shrink-0`}
          >
            <CupSteamIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            <span className="hidden sm:inline">wellbeing</span>
            <span className="sm:hidden">wellness</span>
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm text-purple-900/80 leading-relaxed"
        >
          {drink.description}
        </motion.p>

        <section className="space-y-2">
          <button
            onClick={() => setIsPreparationExpanded(!isPreparationExpanded)}
            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-purple-700 hover:text-purple-900 transition-colors"
          >
            <span>Preparation</span>
            {isPreparationExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <AnimatePresence>
            {isPreparationExpanded && (
              <motion.ol
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 text-sm text-purple-900/80 overflow-hidden"
              >
                {drink.preparation.map((step, index) => (
                  <li key={`${drink.id}-prep-${index}`} className="flex gap-2">
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${cardGradient} text-xs font-bold text-white shadow-md flex-shrink-0`}
                    >
                      {index + 1}
                    </motion.span>
                    <span className="text-xs">{step}</span>
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </section>

        <section className="space-y-1.5 sm:space-y-2">
          <button
            onClick={() => setIsIngredientsExpanded(!isIngredientsExpanded)}
            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-purple-700 hover:text-purple-900 transition-colors"
          >
            <span>Ingredients</span>
            <div className="flex items-center gap-2">
              <span>{drink.ingredients.length}</span>
              {isIngredientsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>
          <AnimatePresence>
            {isIngredientsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-2 sm:grid-cols-2 overflow-hidden"
              >
                {drink.ingredients.map((ingredient) => {
                  const isHighlighted = highlightedBenefit
                    ? ingredient.benefits.includes(highlightedBenefit)
                    : false;
                  return (
                    <div
                      key={ingredient.name}
                      className={`flex items-start gap-2 rounded-xl border-2 p-2 transition-all ${
                        isHighlighted
                          ? `border-purple-400 shadow-lg bg-purple-50`
                          : "border-purple-300/60 bg-white/80 hover:shadow-md"
                      }`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${cardGradient} shadow-md flex-shrink-0`}
                      >
                        {ingredientIconMap[ingredient.icon]}
                      </motion.div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-purple-900">{ingredient.name}</p>
                        <p className="text-xs text-purple-700/70 line-clamp-2">{ingredient.description}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="space-y-2">
          <button
            onClick={() => setIsBenefitsExpanded(!isBenefitsExpanded)}
            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-purple-700 hover:text-purple-900 transition-colors"
          >
            <span>Health Benefits</span>
            <div className="flex items-center gap-2">
              <span>{drink.healthBenefits.length}</span>
              {isBenefitsExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </button>
          <AnimatePresence>
            {isBenefitsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-1.5 overflow-hidden"
              >
                {drink.healthBenefits.map((benefit) => {
                  const isPinned = pinnedBenefit === benefit;
                  const isActive = highlightedBenefit === benefit;
                  return (
                    <button
                      key={benefit}
                      type="button"
                      onMouseEnter={() => onHoverBenefit(benefit)}
                      onMouseLeave={() => onHoverBenefit(null)}
                      onClick={() => onPinBenefit(benefit)}
                      className={`rounded-full border-2 px-2.5 py-1 text-xs font-bold transition-all transform hover:scale-105 ${
                        isPinned
                          ? `border-transparent bg-gradient-to-r ${cardGradient} text-white shadow-md`
                          : isActive
                            ? "border-purple-400 bg-purple-100 text-purple-800 shadow-sm"
                            : "border-purple-300/60 bg-white/90 text-purple-700 hover:bg-purple-100 hover:border-purple-400"
                      }`}
                    >
                      {benefit}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </motion.article>
  );
}
