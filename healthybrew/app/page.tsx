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
} from "@/components/icons";
import { HealthSummary } from "@/components/health-summary";
import { CherryBlossomRain } from "@/components/cherry-blossom-rain";
import {
  Check,
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
};

const highlightPalette = [
  "bg-emerald-50 text-emerald-700 ring-2 ring-inset ring-emerald-200",
  "bg-rose-50 text-rose-700 ring-2 ring-inset ring-rose-200",
  "bg-amber-50 text-amber-700 ring-2 ring-inset ring-amber-200",
  "bg-sky-50 text-sky-700 ring-2 ring-inset ring-sky-200",
];

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
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
            className="fixed bottom-24 right-6 z-50 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 p-4 shadow-2xl max-w-xs"
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
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 text-white shadow-2xl shadow-purple-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
        aria-label={isMusicPlaying ? "Pause lofi music" : "Play lofi music"}
      >
        <motion.div
          animate={isMusicPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.8, repeat: isMusicPlaying ? Infinity : 0 }}
        >
          {isMusicPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
        </motion.div>
      </motion.button>
      
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[2.5rem] border-4 border-purple-300/60 bg-gradient-to-br from-purple-100/90 via-pink-100/90 to-blue-100/90 p-8 shadow-2xl shadow-purple-500/20 backdrop-blur-xl relative overflow-hidden"
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
          
          {/* Big Animated Coffee/Tea Emoji */}
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
            className="absolute top-6 right-16 text-9xl cursor-pointer filter drop-shadow-2xl"
            style={{ 
              textShadow: "0 10px 40px rgba(147, 51, 234, 0.3)"
            }}
          >
            {activeType === 'tea' ? '🍵' : '☕'}
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
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent sm:text-5xl"
              >
                Tea & Coffee Wellness ♡
              </motion.h1>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl text-base text-purple-700/90"
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

        <div className="grid flex-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <motion.aside
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6 rounded-[2.5rem] border-4 border-blue-300/60 p-6 shadow-2xl shadow-blue-500/20 backdrop-blur-xl relative overflow-hidden"
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
                      return (
                        <button
                          key={focus.id}
                          type="button"
                          onClick={() => setSelectedFocus(isSelected ? null : focus.id)}
                          className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition-all transform hover:scale-105 ${
                            isSelected
                              ? "border-purple-400/80 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 shadow-lg shadow-purple-400/30"
                              : "border-purple-300/70 bg-white/70 text-purple-800 hover:bg-white/90 hover:border-purple-400/70 hover:shadow-md"
                          }`}
                        >
                          <p className="text-sm font-bold">{focus.label}</p>
                          <p className={`text-xs ${isSelected ? "text-purple-700/90" : "text-purple-700/70"}`}>
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
      className="group relative flex h-full flex-col rounded-[2.5rem] border-4 border-purple-300/60 bg-white p-7 shadow-2xl shadow-purple-500/20 backdrop-blur-sm overflow-hidden hover:shadow-purple-500/30 hover:border-purple-400/80"
    >
      {/* Gradient Accent */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${cardGradient}`} />
      
      {/* Drink Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative h-48 -mx-7 -mt-7 mb-4 overflow-hidden rounded-t-[2.25rem]"
      >
        <img
          src={drink.image}
          alt={drink.name}
          className="h-full w-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent`} />
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-4 right-4 text-5xl drop-shadow-lg"
        >
          {drink.type === 'tea' ? '🍵' : '☕'}
        </motion.div>
      </motion.div>
      
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
              className="mt-1 text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent"
            >
              {drink.name}
            </motion.h3>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${cardGradient} px-4 py-1.5 text-xs font-bold text-white shadow-lg`}
          >
            <CupSteamIcon className="h-4 w-4 text-white" />
            wellbeing
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-purple-900/80 leading-relaxed"
        >
          {drink.description}
        </motion.p>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
            <span>Ingredients</span>
            <span>{drink.ingredients.length}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {drink.ingredients.map((ingredient) => {
              const isHighlighted = highlightedBenefit
                ? ingredient.benefits.includes(highlightedBenefit)
                : false;
              return (
                <div
                  key={ingredient.name}
                  className={`flex items-start gap-3 rounded-2xl border-2 p-3 transition-all transform ${
                    isHighlighted
                      ? `border-purple-400 shadow-lg bg-purple-50`
                      : "border-purple-300/60 bg-white/80 hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${cardGradient} shadow-lg`}
                  >
                    {ingredientIconMap[ingredient.icon]}
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-purple-900">{ingredient.name}</p>
                    <p className="text-xs text-purple-700/70">{ingredient.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
            <span>Health Benefits</span>
            <span>{drink.healthBenefits.length}</span>
          </div>
          <div className="flex flex-wrap gap-2">
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
                  className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-all transform hover:scale-110 ${
                    isPinned
                      ? `border-transparent bg-gradient-to-r ${cardGradient} text-white shadow-lg`
                      : isActive
                        ? "border-purple-400 bg-purple-100 text-purple-800 shadow-md"
                        : "border-purple-300/60 bg-white/90 text-purple-700 hover:bg-purple-100 hover:border-purple-400 hover:shadow-md"
                  }`}
                >
                  {benefit}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
            <span>Preparation</span>
          </div>
          <ol className="space-y-2 text-sm text-purple-900/80">
            {drink.preparation.map((step, index) => (
              <li key={`${drink.id}-prep-${index}`} className="flex gap-3">
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${cardGradient} text-xs font-bold text-white shadow-lg`}
                >
                  {index + 1}
                </motion.span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </motion.article>
  );
}
