export type DrinkType = "tea" | "coffee";

export type IngredientIcon =
  | "leaf"
  | "bean"
  | "flower"
  | "spice"
  | "citrus"
  | "root"
  | "seed";

export interface Ingredient {
  name: string;
  description: string;
  benefits: string[];
  icon: IngredientIcon;
}

export interface Drink {
  id: string;
  type: DrinkType;
  name: string;
  description: string;
  ingredients: Ingredient[];
  preparation: string[];
  healthBenefits: string[];
  flavorNotes: string[];
}

export interface HealthFocus {
  id: string;
  label: string;
  tagline: string;
  benefits: string[];
}

export const healthFocuses: HealthFocus[] = [
  {
    id: "calm-focus",
    label: "Calm & Focus",
    tagline: "Adaptogens and L-theanine to steady the mind",
    benefits: ["Stress relief", "Calming", "Focus support", "Gentle energy"],
  },
  {
    id: "immunity",
    label: "Immune Shield",
    tagline: "Citrus, antioxidants, and roots to guard your system",
    benefits: [
      "Immune support",
      "Antioxidant boost",
      "Anti-inflammatory",
      "Respiratory comfort",
    ],
  },
  {
    id: "metabolic",
    label: "Metabolic Spark",
    tagline: "Boost circulation and metabolic flow",
    benefits: ["Metabolism support", "Cardio health", "Energy lift", "Digestive comfort"],
  },
];

export const drinks: Drink[] = [
  {
    id: "jade-calm-matcha",
    type: "tea",
    name: "Jade Calm Matcha",
    description:
      "Silky ceremonial matcha layered with adaptogens for a lifted yet grounded focus.",
    ingredients: [
      {
        name: "Ceremonial Matcha",
        description: "Stone-ground young tea leaves, vibrant and smooth.",
        benefits: ["Antioxidant boost", "Gentle energy", "Focus support"],
        icon: "leaf",
      },
      {
        name: "Ashwagandha",
        description: "Adaptogenic root for stress resilience.",
        benefits: ["Stress relief", "Hormonal balance", "Calming"],
        icon: "root",
      },
      {
        name: "Oat Milk",
        description: "Creamy plant milk with soluble fiber.",
        benefits: ["Digestive comfort", "Heart nourishment"],
        icon: "seed",
      },
      {
        name: "Lemon Zest",
        description: "Bright citrus oils for aromatics.",
        benefits: ["Immune support", "Antioxidant boost"],
        icon: "citrus",
      },
    ],
    preparation: [
      "Whisk matcha with 80?C water until frothy.",
      "Steam oat milk with ashwagandha until warm.",
      "Combine and finish with lemon zest swirl.",
    ],
    healthBenefits: [
      "Antioxidant boost",
      "Gentle energy",
      "Focus support",
      "Stress relief",
      "Calming",
      "Digestive comfort",
      "Immune support",
    ],
    flavorNotes: ["Verdant", "Creamy", "Citrus finish"],
  },
  {
    id: "golden-root-chai",
    type: "tea",
    name: "Golden Root Chai",
    description:
      "A turmeric-forward chai that warms circulation and soothes inflammation.",
    ingredients: [
      {
        name: "Turmeric",
        description: "Golden root rich in curcumin.",
        benefits: ["Anti-inflammatory", "Joint support", "Antioxidant boost"],
        icon: "root",
      },
      {
        name: "Ginger",
        description: "Spicy root that warms digestion.",
        benefits: ["Digestive comfort", "Circulation support", "Immune support"],
        icon: "root",
      },
      {
        name: "Ceylon Cinnamon",
        description: "Sweet bark with blood-sugar balancing qualities.",
        benefits: ["Metabolism support", "Cardio health", "Anti-inflammatory"],
        icon: "spice",
      },
      {
        name: "Cardamom",
        description: "Floral spice that brightens the blend.",
        benefits: ["Digestive comfort", "Respiratory comfort"],
        icon: "spice",
      },
      {
        name: "Black Tea",
        description: "Robust base with tannins and caffeine.",
        benefits: ["Gentle energy", "Antioxidant boost"],
        icon: "leaf",
      },
    ],
    preparation: [
      "Simmer spices with oat milk for 10 minutes.",
      "Steep black tea for 3 minutes, strain.",
      "Sweeten lightly with date syrup.",
    ],
    healthBenefits: [
      "Anti-inflammatory",
      "Digestive comfort",
      "Metabolism support",
      "Cardio health",
      "Gentle energy",
      "Immune support",
      "Respiratory comfort",
    ],
    flavorNotes: ["Spiced", "Velvety", "Earthy"],
  },
  {
    id: "citrus-bloom-white-tea",
    type: "tea",
    name: "Citrus Bloom White Tea",
    description:
      "Delicate white tea layered with citrus and blossoms for immune-forward brightness.",
    ingredients: [
      {
        name: "White Peony Tea",
        description: "Young tea buds with subtle florals.",
        benefits: ["Antioxidant boost", "Gentle energy"],
        icon: "leaf",
      },
      {
        name: "Elderflower",
        description: "Fragrant blossom supporting immunity.",
        benefits: ["Immune support", "Respiratory comfort", "Calming"],
        icon: "flower",
      },
      {
        name: "Orange Peel",
        description: "Sun-dried peel rich in vitamin C oils.",
        benefits: ["Immune support", "Digestive comfort", "Antioxidant boost"],
        icon: "citrus",
      },
      {
        name: "Lemongrass",
        description: "Citrusy grass for clarity and digestion.",
        benefits: ["Digestive comfort", "Calming", "Focus support"],
        icon: "leaf",
      },
    ],
    preparation: [
      "Steep white tea at 75?C for 2 minutes.",
      "Add elderflower and lemongrass for 1 minute.",
      "Finish with expressed orange peel oils.",
    ],
    healthBenefits: [
      "Immune support",
      "Antioxidant boost",
      "Respiratory comfort",
      "Digestive comfort",
      "Calming",
      "Focus support",
      "Gentle energy",
    ],
    flavorNotes: ["Citrus", "Floral", "Feather-light"],
  },
  {
    id: "vitality-cold-brew",
    type: "coffee",
    name: "Vitality Cold Brew",
    description:
      "Slow-steeped cold brew energized with citrus and maca for steady momentum.",
    ingredients: [
      {
        name: "Single Origin Cold Brew",
        description: "Chocolatey cold brew concentrate.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Maca Root",
        description: "Endocrine balancing root with malty sweetness.",
        benefits: ["Metabolism support", "Energy lift", "Mood balance"],
        icon: "root",
      },
      {
        name: "Cascara Syrup",
        description: "Coffee cherry reduction rich in polyphenols.",
        benefits: ["Antioxidant boost", "Digestive comfort"],
        icon: "seed",
      },
      {
        name: "Grapefruit Twist",
        description: "Bittersweet citrus oils for lift.",
        benefits: ["Immune support", "Cardio health"],
        icon: "citrus",
      },
    ],
    preparation: [
      "Dilute cold brew with spring water.",
      "Shake with maca and cascara until silky.",
      "Serve over ice with grapefruit twist.",
    ],
    healthBenefits: [
      "Energy lift",
      "Antioxidant boost",
      "Metabolism support",
      "Cardio health",
      "Immune support",
      "Digestive comfort",
      "Mood balance",
    ],
    flavorNotes: ["Cocoa", "Citrus", "Caramel"],
  },
  {
    id: "cardio-glow-latte",
    type: "coffee",
    name: "Cardio Glow Latte",
    description:
      "Rose-infused espresso with beet crema to nourish circulation and the heart.",
    ingredients: [
      {
        name: "Light Roast Espresso",
        description: "Bright espresso with stone fruit notes.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Beetroot Velvet",
        description: "Steamed beet and almond milk crema.",
        benefits: ["Cardio health", "Circulation support", "Metabolism support"],
        icon: "root",
      },
      {
        name: "Rose Petal Honey",
        description: "Light honey infused with petals.",
        benefits: ["Mood balance", "Calming", "Immune support"],
        icon: "flower",
      },
      {
        name: "Cacao Nibs",
        description: "Crunchy topping rich in magnesium.",
        benefits: ["Antioxidant boost", "Mood balance", "Gentle energy"],
        icon: "seed",
      },
    ],
    preparation: [
      "Pull espresso shot over rose honey.",
      "Steam beetroot velvet until micro-foamed.",
      "Pour over espresso and finish with cacao.",
    ],
    healthBenefits: [
      "Cardio health",
      "Circulation support",
      "Energy lift",
      "Mood balance",
      "Calming",
      "Immune support",
      "Antioxidant boost",
    ],
    flavorNotes: ["Floral", "Velvet", "Cocoa"],
  },
  {
    id: "cacao-adaptogen-mocha",
    type: "coffee",
    name: "Cacao Adaptogen Mocha",
    description:
      "Silky mocha folded with reishi and lion's mane for resilient focus.",
    ingredients: [
      {
        name: "Organic Espresso",
        description: "Balanced espresso with caramel finish.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Reishi Extract",
        description: "Earthy mushroom for immune modulation.",
        benefits: ["Immune support", "Stress relief", "Calming"],
        icon: "root",
      },
      {
        name: "Lion's Mane",
        description: "Nootropic mushroom for mental clarity.",
        benefits: ["Focus support", "Neural health", "Gentle energy"],
        icon: "root",
      },
      {
        name: "Raw Cacao",
        description: "Mineral-rich cacao with mood lifting compounds.",
        benefits: ["Mood balance", "Antioxidant boost", "Gentle energy"],
        icon: "seed",
      },
      {
        name: "Coconut Cream",
        description: "Silky base with medium-chain triglycerides.",
        benefits: ["Metabolism support", "Digestive comfort"],
        icon: "seed",
      },
    ],
    preparation: [
      "Whisk cacao with reishi and coconut cream.",
      "Steam until glossy and fold into espresso.",
      "Dust with lion's mane powder.",
    ],
    healthBenefits: [
      "Focus support",
      "Immune support",
      "Stress relief",
      "Mood balance",
      "Gentle energy",
      "Metabolism support",
      "Digestive comfort",
      "Antioxidant boost",
    ],
    flavorNotes: ["Chocolate", "Toasted coconut", "Earthy"],
  },
];

export const drinkTypes: DrinkType[] = ["tea", "coffee"];
