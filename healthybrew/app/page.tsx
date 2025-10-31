"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
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
} from "lucide-react";

type SelectedIngredient = {
  name: string;
  count: number;
  benefits: string[];
  sources: string[];
  icon: Ingredient["icon"];
};

const ingredientIconMap: Record<Ingredient["icon"], JSX.Element> = {
  leaf: <TeaLeafIcon className="h-5 w-5 text-emerald-500" />,
  bean: <CoffeeBeanIcon className="h-5 w-5 text-amber-500" />,
  flower: <HeartHerbIcon className="h-5 w-5 text-rose-500" />,
  spice: <SparkIcon className="h-5 w-5 text-orange-500" />,
  citrus: <CupSteamIcon className="h-5 w-5 text-yellow-500" />,
  root: <SparkIcon className="h-5 w-5 text-emerald-600" />,
  seed: <CupSteamIcon className="h-5 w-5 text-amber-600" />,
};

const categoryIconMap: Record<DrinkType, JSX.Element> = {
  tea: <TeaLeafIcon className="h-6 w-6 text-emerald-500" />,
  coffee: <CoffeeBeanIcon className="h-6 w-6 text-amber-500" />,
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(110,231,183,0.18)_0%,_rgba(253,230,138,0.12)_40%,_rgba(255,255,255,1)_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl shadow-emerald-100/50 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-emerald-600">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.3em]">HealthyBrew</span>
              </div>
              <h1 className="text-3xl font-semibold text-emerald-950 sm:text-4xl">
                Curate healthy tea & coffee blends tailored to your rituals
              </h1>
              <p className="max-w-2xl text-base text-emerald-800/80">
                Explore hand-crafted recipes, spotlight targeted health benefits, and assemble a custom
                blend designed for the way you want to feel.
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-200 via-white to-amber-200 p-4 shadow-inner">
              <div className="flex items-center gap-2">
                <TeaLeafIcon className="h-8 w-8 text-emerald-600" />
                <span className={`text-sm font-semibold ${activeType === "tea" ? "text-emerald-700" : "text-emerald-400"}`}>
                  Tea Rituals
                </span>
              </div>
              <div className="h-8 w-px bg-emerald-200" />
              <div className="flex items-center gap-2">
                <CoffeeBeanIcon className="h-8 w-8 text-amber-600" />
                <span
                  className={`text-sm font-semibold ${activeType === "coffee" ? "text-amber-700" : "text-amber-400"}`}
                >
                  Coffee Rituals
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 rounded-full bg-emerald-50/80 p-1 shadow-inner">
              {drinkTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(type)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeType === type
                      ? "bg-white text-emerald-900 shadow"
                      : "text-emerald-500 hover:text-emerald-700"
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
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-600 shadow"
                >
                  <Check className="h-4 w-4" />
                  {feedback}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)_320px]">
          <aside className="flex flex-col gap-6 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-emerald-100/50 backdrop-blur">
            <div>
              <label className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm text-emerald-500 shadow-inner">
                <Search className="h-4 w-4" />
                <input
                  type="search"
                  placeholder="Search blends, ingredients, or benefits"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-emerald-900 placeholder:text-emerald-400 focus:outline-none"
                />
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-emerald-800">
                <span className="inline-flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </span>
                {(selectedIngredientFilters.size > 0 || selectedBenefitFilters.size > 0 || selectedFocus) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIngredientFilters(new Set());
                      setSelectedBenefitFilters(new Set());
                      setSelectedFocus(null);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:text-emerald-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                )}
              </div>

              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                  Ingredients
                </p>
                <div className="flex flex-wrap gap-2">
                  {ingredientOptions.map((ingredient, index) => {
                    const isSelected = selectedIngredientFilters.has(ingredient);
                    const palette = highlightPalette[index % highlightPalette.length];
                    return (
                      <button
                        key={ingredient}
                        type="button"
                        onClick={() => handleToggleSet(ingredient, setSelectedIngredientFilters)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                          isSelected
                            ? `border-transparent ${palette}`
                            : "border-emerald-100 bg-white text-emerald-500 hover:border-emerald-200 hover:text-emerald-700"
                        }`}
                      >
                        {ingredient}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                  Health Benefits
                </p>
                <div className="flex flex-wrap gap-2">
                  {benefitOptions.map((benefit) => {
                    const isSelected = selectedBenefitFilters.has(benefit);
                    return (
                      <button
                        key={benefit}
                        type="button"
                        onClick={() => handleToggleSet(benefit, setSelectedBenefitFilters)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-transparent bg-emerald-500 text-white shadow"
                            : "border-emerald-100 bg-white text-emerald-500 hover:border-emerald-200 hover:text-emerald-700"
                        }`}
                      >
                        {benefit}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                  Health Focus
                </p>
                <div className="space-y-2">
                  {healthFocuses.map((focus) => {
                    const isSelected = selectedFocus === focus.id;
                    return (
                      <button
                        key={focus.id}
                        type="button"
                        onClick={() => setSelectedFocus(isSelected ? null : focus.id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                          isSelected
                            ? "border-transparent bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-lg"
                            : "border-emerald-100 bg-white text-emerald-600 hover:border-emerald-200"
                        }`}
                      >
                        <p className="text-sm font-semibold">{focus.label}</p>
                        <p className={`text-xs ${isSelected ? "text-white/80" : "text-emerald-500/80"}`}>
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-emerald-900">
                {filteredDrinks.length} {activeType} blends curated for wellness
              </h2>
              {activeFocus && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" /> Focus: {activeFocus.label}
                </span>
              )}
            </div>
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
                    onAddToBlend={() => handleAddDrinkToBlend(drink)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </section>

          <aside className="flex flex-col gap-5 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-emerald-100/60 backdrop-blur">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-emerald-900">Blend Creator</h2>
                <p className="text-sm text-emerald-600/80">
                  Ingredients you collect will appear here. Highlight benefits to fine-tune synergy.
                </p>
              </div>
              <CupSteamIcon className="h-8 w-8 text-emerald-500" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                <span>Selected Ingredients</span>
                <span>{Object.keys(selectedIngredients).length}</span>
              </div>
              {Object.keys(selectedIngredients).length === 0 ? (
                <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/70 p-4 text-sm text-emerald-500">
                  Add a blend to start crafting your signature brew.
                </div>
              ) : (
                <ul className="space-y-3">
                  {Object.values(selectedIngredients).map((ingredient) => (
                    <li
                      key={ingredient.name}
                      className={`group rounded-2xl border border-emerald-100 bg-white p-4 transition-shadow hover:shadow-md ${
                        highlightedBenefit && ingredient.benefits.includes(highlightedBenefit)
                          ? "shadow-emerald-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            {ingredientIconMap[ingredient.icon]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-emerald-900">{ingredient.name}</p>
                            <p className="text-xs text-emerald-500/80">
                              {ingredient.sources.join(", ")} - {ingredient.count}x
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(ingredient.name)}
                          className="rounded-full bg-emerald-50 p-1 text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label={`Remove ${ingredient.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {ingredient.benefits.map((benefit) => (
                          <span
                            key={benefit}
                            className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                              highlightedBenefit === benefit
                                ? "bg-emerald-500 text-white"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <HealthSummary
              metrics={healthMetrics}
              totalBenefits={totalTouchpoints}
              focusTagline={activeFocus?.tagline}
            />

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Highlighted Benefits
              </p>
              {combinedBenefitList.length === 0 ? (
                <p className="rounded-2xl bg-white p-4 text-sm text-emerald-500">
                  Hover or pin a benefit to see contributing ingredients.
                </p>
              ) : (
                <div className="space-y-2">
                  {combinedBenefitList.map(([benefit, count]) => (
                    <button
                      key={benefit}
                      type="button"
                      onClick={() => setPinnedBenefit((current) => (current === benefit ? null : benefit))}
                      onMouseEnter={() => setHoveredBenefit(benefit)}
                      onMouseLeave={() => setHoveredBenefit(null)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                        pinnedBenefit === benefit
                          ? "border-transparent bg-emerald-500 text-white shadow-lg"
                          : highlightedBenefit === benefit
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-emerald-100 bg-white text-emerald-600 hover:border-emerald-200"
                      }`}
                    >
                      <span className="text-sm font-semibold">{benefit}</span>
                      <span className="text-xs font-semibold">{count}x</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-auto space-y-3">
              <div className="grid gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSaveAction("save")}
                  disabled={Object.keys(selectedIngredients).length === 0}
                  className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-200"
                  type="button"
                >
                  <Save className="h-4 w-4" /> Save Blend
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSaveAction("export")}
                  disabled={Object.keys(selectedIngredients).length === 0}
                  className="flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-600 shadow transition hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  type="button"
                >
                  <Share2 className="h-4 w-4" /> Export Recipe
                </motion.button>
              </div>
              <button
                type="button"
                onClick={handleClearBlend}
                disabled={Object.keys(selectedIngredients).length === 0}
                className="w-full text-xs font-semibold text-emerald-500/70 transition hover:text-emerald-600 disabled:cursor-not-allowed disabled:text-emerald-300"
              >
                Clear blend
              </button>
            </div>
          </aside>
        </div>

        <footer className="pb-6 text-center text-sm text-emerald-600">
          Made with ?? ? Hosted on Vercel
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
  onAddToBlend: () => void;
}

function DrinkCard({
  drink,
  highlightedBenefit,
  pinnedBenefit,
  onHoverBenefit,
  onPinBenefit,
  onAddToBlend,
}: DrinkCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex h-full flex-col justify-between rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-emerald-100/50 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
              {drink.type} blend
            </p>
            <h3 className="mt-1 text-xl font-semibold text-emerald-900">{drink.name}</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            <CupSteamIcon className="h-4 w-4 text-emerald-500" />
            wellbeing
          </div>
        </div>
        <p className="text-sm text-emerald-700/80">{drink.description}</p>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
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
                  className={`flex items-start gap-3 rounded-2xl border bg-white p-3 transition-all ${
                    isHighlighted
                      ? "border-emerald-300 shadow-md shadow-emerald-100"
                      : "border-emerald-100"
                  }`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    {ingredientIconMap[ingredient.icon]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">{ingredient.name}</p>
                    <p className="text-xs text-emerald-500/80">{ingredient.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
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
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                    isPinned
                      ? "border-transparent bg-emerald-600 text-white shadow"
                      : isActive
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-emerald-100 bg-white text-emerald-500 hover:border-emerald-200 hover:text-emerald-700"
                  }`}
                >
                  {benefit}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            <span>Preparation</span>
          </div>
          <ol className="space-y-2 text-sm text-emerald-600">
            {drink.preparation.map((step, index) => (
              <li key={`${drink.id}-prep-${index}`} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-600">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-wrap gap-2">
          {drink.flavorNotes.map((note) => (
            <span key={note} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              {note}
            </span>
          ))}
        </section>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onAddToBlend}
        type="button"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition group-hover:translate-y-0.5 group-hover:from-emerald-500 group-hover:to-emerald-600"
      >
        <Sparkles className="h-4 w-4" /> Add to blend
      </motion.button>
    </motion.article>
  );
}
