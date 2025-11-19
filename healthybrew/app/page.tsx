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

  // Auto-play music on mount
  useEffect(() => {
    const attemptAutoplay = () => {
      if (audioRef.current && !autoplayAttempted.current) {
        autoplayAttempted.current = true;
        audioRef.current.play()
          .then(() => {
            setIsMusicPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked - try on first user interaction
            console.log('Autoplay blocked - will try on first interaction');
            
            // Set up listener for first user interaction
            const handleFirstInteraction = () => {
              if (audioRef.current) {
                audioRef.current.play()
                  .then(() => {
                    setIsMusicPlaying(true);
                  })
                  .catch((err) => {
                    console.log('Play attempt failed:', err);
                  });
              }
            };

            // Add event listeners for first interaction (once each)
            document.addEventListener('click', handleFirstInteraction, { once: true });
            document.addEventListener('keydown', handleFirstInteraction, { once: true });
            document.addEventListener('touchstart', handleFirstInteraction, { once: true });
          });
      }
    };

    // Try immediate autoplay
    attemptAutoplay();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20">
      {/* Lofi Music Player */}
      <audio ref={audioRef} loop className="hidden">
        <source src="https://stream.zeno.fm/f3wvbbqmdg8uv" type="audio/mpeg" />
      </audio>
      
      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-200 text-amber-800 shadow-xl shadow-amber-900/10 transition-all hover:scale-110 hover:shadow-amber-900/20 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
        aria-label={isMusicPlaying ? "Pause lofi music" : "Play lofi music"}
      >
        {isMusicPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </button>
      
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border-4 border-amber-300/80 bg-gradient-to-br from-amber-100 via-orange-100/80 to-yellow-100/60 p-8 shadow-xl shadow-amber-900/10 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-amber-700/80">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-[0.3em]">HealthyBrew</span>
              </div>
              <h1 className="text-3xl font-bold text-amber-800 sm:text-4xl">
                Tea & Coffee Wellness ♡
              </h1>
              <p className="max-w-2xl text-base text-amber-700/80">
                Explore delightful recipes and discover the perfect blend for your wellness journey ✿
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 rounded-full bg-white/60 p-1.5 shadow-inner">
              {drinkTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                    activeType === type
                      ? "bg-amber-200 text-amber-800 shadow-md"
                      : "text-amber-700/70 hover:text-amber-800 hover:bg-white/40"
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
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-amber-800 shadow-md"
                >
                  <Check className="h-4 w-4" />
                  {feedback}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-6 rounded-[2rem] border-4 border-stone-300/80 bg-gradient-to-br from-stone-100 via-amber-50/50 to-orange-50/30 p-6 shadow-lg shadow-stone-900/10 backdrop-blur">
            <div>
              <label className="flex items-center gap-2 rounded-2xl bg-white/60 px-4 py-3 text-sm text-amber-800 shadow-inner">
                <Search className="h-4 w-4" />
                <input
                  type="search"
                  placeholder="Search blends..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-amber-800 placeholder:text-amber-600/50 focus:outline-none"
                />
              </label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-bold text-amber-800">
                <span className="inline-flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Health Focus
                </span>
                {selectedFocus && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFocus(null);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-800"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                )}
              </div>

              <section className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700/70">
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
                        className={`w-full rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                          isSelected
                            ? "border-amber-400/80 bg-amber-100 text-amber-900 shadow-md"
                            : "border-stone-300/70 bg-white/50 text-amber-800 hover:bg-white/70 hover:border-stone-400/70"
                        }`}
                      >
                        <p className="text-sm font-bold">{focus.label}</p>
                        <p className={`text-xs ${isSelected ? "text-amber-700/90" : "text-amber-700/70"}`}>
                          {focus.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </aside>

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

        <footer className="pb-6 text-center text-sm text-amber-600/70 font-bold">
          ✿ Crafted with care and botanicals ✿
        </footer>
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
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col rounded-[2rem] border-4 border-amber-400/80 bg-white p-7 shadow-xl shadow-amber-900/15 backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20 hover:border-amber-500"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-700">
              {drink.type} blend
            </p>
            <h3 className="mt-1 text-2xl font-bold text-amber-900">{drink.name}</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-200 to-orange-200 px-4 py-1.5 text-xs font-bold text-amber-800 shadow-sm">
            <CupSteamIcon className="h-4 w-4 text-amber-700" />
            wellbeing
          </div>
        </div>
        <p className="text-sm text-stone-700 leading-relaxed">{drink.description}</p>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
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
                  className={`flex items-start gap-3 rounded-2xl border-2 bg-white/80 p-3 transition-all ${
                    isHighlighted
                      ? "border-amber-400 shadow-md shadow-amber-900/10 bg-white"
                      : "border-amber-300/60"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-200 shadow-sm">
                    {ingredientIconMap[ingredient.icon]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-900">{ingredient.name}</p>
                    <p className="text-xs text-stone-600">{ingredient.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
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
                  className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-all ${
                    isPinned
                      ? "border-amber-400 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 shadow-md"
                      : isActive
                        ? "border-amber-400 bg-amber-100 text-amber-800"
                        : "border-amber-300/60 bg-white/90 text-amber-700 hover:bg-amber-100 hover:border-amber-400"
                  }`}
                >
                  {benefit}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            <span>Preparation</span>
          </div>
          <ol className="space-y-2 text-sm text-stone-700">
            {drink.preparation.map((step, index) => (
              <li key={`${drink.id}-prep-${index}`} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-stone-300 to-stone-400 text-xs font-bold text-white shadow-sm">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-wrap gap-2">
          {drink.flavorNotes.map((note) => (
            <span key={note} className="rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300/70 px-4 py-1.5 text-xs font-bold text-amber-800 shadow-sm">
              {note}
            </span>
          ))}
        </section>
      </div>
    </motion.article>
  );
}
