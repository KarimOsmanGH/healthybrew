export type DrinkType = "tea" | "coffee" | "water";

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
  image: string;
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
  {
    id: "digestive",
    label: "Digestive Comfort",
    tagline: "Soothing herbs for gentle digestion and gut health",
    benefits: ["Digestive comfort", "Anti-inflammatory", "Calming", "Metabolism support"],
  },
  {
    id: "energy-mood",
    label: "Energy & Mood",
    tagline: "Natural lift for vitality and emotional balance",
    benefits: ["Energy lift", "Mood balance", "Gentle energy", "Focus support"],
  },
  {
    id: "heart-circulation",
    label: "Heart & Circulation",
    tagline: "Support cardiovascular health and blood flow",
    benefits: ["Cardio health", "Circulation support", "Heart nourishment", "Metabolism support"],
  },
  {
    id: "anti-inflammatory",
    label: "Anti-Inflammatory",
    tagline: "Reduce inflammation and support joint health",
    benefits: ["Anti-inflammatory", "Joint support", "Antioxidant boost", "Digestive comfort"],
  },
  {
    id: "stress-relief",
    label: "Stress Relief",
    tagline: "Adaptogenic support for resilience and balance",
    benefits: ["Stress relief", "Calming", "Hormonal balance", "Mood balance"],
  },
];

export const drinks: Drink[] = [
  {
    id: "jade-calm-matcha",
    type: "tea",
    name: "Jade Calm Matcha",
    description:
      "Silky ceremonial matcha layered with adaptogens for a lifted yet grounded focus.",
    image: "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=800",
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
      "Whisk matcha with 80C water until frothy.",
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
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    name: "Citrus Bloom Tea",
    description:
      "Delicate white tea layered with citrus and blossoms for immune-forward brightness.",
    image: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=800",
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
      "Steep white tea at 75C for 2 minutes.",
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
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
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
    name: "Adaptogen Mocha",
    description:
      "Silky mocha folded with reishi and lion's mane for resilient focus.",
    image: "https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=800",
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
  {
    id: "lavender-dreams-tea",
    type: "tea",
    name: "Lavender Dreams",
    description:
      "Chamomile and lavender unite for deep relaxation and restful evenings.",
    image: "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Chamomile Flowers",
        description: "Gentle flowers for calming nerves.",
        benefits: ["Calming", "Stress relief", "Digestive comfort"],
        icon: "flower",
      },
      {
        name: "Lavender Buds",
        description: "Aromatic buds for sleep and relaxation.",
        benefits: ["Calming", "Stress relief", "Mood balance"],
        icon: "flower",
      },
      {
        name: "Valerian Root",
        description: "Natural sedative root for deep rest.",
        benefits: ["Calming", "Stress relief"],
        icon: "root",
      },
      {
        name: "Honey Crystals",
        description: "Raw honey for sweetness and throat comfort.",
        benefits: ["Immune support", "Respiratory comfort"],
        icon: "seed",
      },
    ],
    preparation: [
      "Steep flowers and valerian at 95C for 5 minutes.",
      "Strain and stir in honey crystals.",
      "Sip slowly before bedtime.",
    ],
    healthBenefits: [
      "Calming",
      "Stress relief",
      "Mood balance",
      "Digestive comfort",
      "Immune support",
      "Respiratory comfort",
    ],
    flavorNotes: ["Floral", "Sweet", "Herbal"],
  },
  {
    id: "mint-green-refresh",
    type: "tea",
    name: "Mint Green Refresh",
    description:
      "Cooling peppermint meets antioxidant-rich green tea for digestive ease.",
    image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Sencha Green Tea",
        description: "Steamed Japanese green tea with grassy notes.",
        benefits: ["Antioxidant boost", "Gentle energy", "Focus support"],
        icon: "leaf",
      },
      {
        name: "Peppermint Leaves",
        description: "Cooling herb for digestion and alertness.",
        benefits: ["Digestive comfort", "Respiratory comfort", "Focus support"],
        icon: "leaf",
      },
      {
        name: "Spearmint",
        description: "Milder mint for balanced flavor.",
        benefits: ["Digestive comfort", "Calming"],
        icon: "leaf",
      },
      {
        name: "Lemon Balm",
        description: "Citrus herb for mood support.",
        benefits: ["Calming", "Mood balance", "Digestive comfort"],
        icon: "leaf",
      },
    ],
    preparation: [
      "Steep green tea at 70C for 2 minutes.",
      "Add mint leaves for 1 additional minute.",
      "Serve hot or iced with lemon balm.",
    ],
    healthBenefits: [
      "Digestive comfort",
      "Antioxidant boost",
      "Focus support",
      "Calming",
      "Mood balance",
      "Gentle energy",
      "Respiratory comfort",
    ],
    flavorNotes: ["Minty", "Fresh", "Herbaceous"],
  },
  {
    id: "hibiscus-berry-boost",
    type: "tea",
    name: "Hibiscus Berry Boost",
    description:
      "Tart hibiscus blended with berries for cardiovascular vitality.",
    image: "https://images.pexels.com/photos/434295/pexels-photo-434295.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Hibiscus Petals",
        description: "Ruby petals rich in anthocyanins.",
        benefits: ["Cardio health", "Circulation support", "Antioxidant boost"],
        icon: "flower",
      },
      {
        name: "Rosehips",
        description: "Vitamin C powerhouse from rose fruit.",
        benefits: ["Immune support", "Antioxidant boost", "Joint support"],
        icon: "flower",
      },
      {
        name: "Dried Blueberries",
        description: "Sweet berries packed with flavonoids.",
        benefits: ["Antioxidant boost", "Cardio health", "Focus support"],
        icon: "seed",
      },
      {
        name: "Schisandra Berry",
        description: "Adaptogenic berry for stamina.",
        benefits: ["Stress relief", "Energy lift", "Immune support"],
        icon: "seed",
      },
    ],
    preparation: [
      "Steep hibiscus and rosehips at 95C for 5 minutes.",
      "Add berries for final minute.",
      "Enjoy hot or over ice.",
    ],
    healthBenefits: [
      "Cardio health",
      "Circulation support",
      "Antioxidant boost",
      "Immune support",
      "Energy lift",
      "Stress relief",
      "Joint support",
    ],
    flavorNotes: ["Tart", "Fruity", "Tangy"],
  },
  {
    id: "rooibos-vanilla-sunset",
    type: "tea",
    name: "Rooibos Vanilla",
    description:
      "Caffeine-free rooibos with vanilla and warming spices for evening calm.",
    image: "https://images.pexels.com/photos/1638281/pexels-photo-1638281.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Red Rooibos",
        description: "South African herb rich in minerals.",
        benefits: ["Antioxidant boost", "Calming", "Digestive comfort"],
        icon: "leaf",
      },
      {
        name: "Vanilla Bean",
        description: "Aromatic pod for sweet warmth.",
        benefits: ["Mood balance", "Calming"],
        icon: "seed",
      },
      {
        name: "Star Anise",
        description: "Licorice-scented spice for digestion.",
        benefits: ["Digestive comfort", "Respiratory comfort"],
        icon: "spice",
      },
      {
        name: "Nutmeg",
        description: "Warming spice with sedative qualities.",
        benefits: ["Calming", "Digestive comfort"],
        icon: "spice",
      },
    ],
    preparation: [
      "Steep rooibos with spices at 95C for 7 minutes.",
      "Add vanilla bean for depth.",
      "Sweeten with maple syrup if desired.",
    ],
    healthBenefits: [
      "Antioxidant boost",
      "Calming",
      "Digestive comfort",
      "Mood balance",
      "Respiratory comfort",
    ],
    flavorNotes: ["Woody", "Vanilla", "Spiced"],
  },
  {
    id: "jasmine-pearl-serenity",
    type: "tea",
    name: "Jasmine Pearl Tea",
    description:
      "Hand-rolled jasmine pearls unfurl into aromatic tranquility.",
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Jasmine Pearls",
        description: "Green tea leaves scented with jasmine blossoms.",
        benefits: ["Antioxidant boost", "Calming", "Focus support"],
        icon: "leaf",
      },
      {
        name: "Rose Petals",
        description: "Delicate petals for heart opening.",
        benefits: ["Mood balance", "Calming", "Heart nourishment"],
        icon: "flower",
      },
      {
        name: "Chrysanthemum",
        description: "Cooling flower for eye and liver health.",
        benefits: ["Antioxidant boost", "Calming", "Immune support"],
        icon: "flower",
      },
    ],
    preparation: [
      "Rinse jasmine pearls with 80C water briefly.",
      "Steep for 3 minutes at 80C with flowers.",
      "Re-steep up to 3 times for evolving notes.",
    ],
    healthBenefits: [
      "Antioxidant boost",
      "Calming",
      "Focus support",
      "Mood balance",
      "Heart nourishment",
      "Immune support",
    ],
    flavorNotes: ["Jasmine", "Floral", "Delicate"],
  },
  {
    id: "oolong-stone-fruit",
    type: "tea",
    name: "Oolong Stone Fruit",
    description:
      "Semi-oxidized oolong with peach and apricot for metabolism support.",
    image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Ti Kuan Yin Oolong",
        description: "Iron Goddess oolong with orchid notes.",
        benefits: ["Metabolism support", "Antioxidant boost", "Focus support"],
        icon: "leaf",
      },
      {
        name: "Dried Peach",
        description: "Sweet stone fruit for natural sweetness.",
        benefits: ["Digestive comfort", "Antioxidant boost"],
        icon: "seed",
      },
      {
        name: "Apricot Essence",
        description: "Concentrated fruit essence.",
        benefits: ["Immune support", "Antioxidant boost"],
        icon: "seed",
      },
      {
        name: "Osmanthus Flower",
        description: "Golden flower with peachy aroma.",
        benefits: ["Digestive comfort", "Mood balance"],
        icon: "flower",
      },
    ],
    preparation: [
      "Steep oolong at 90C for 4 minutes.",
      "Add dried fruit for sweetness.",
      "Garnish with osmanthus petals.",
    ],
    healthBenefits: [
      "Metabolism support",
      "Antioxidant boost",
      "Focus support",
      "Digestive comfort",
      "Immune support",
      "Mood balance",
    ],
    flavorNotes: ["Peachy", "Floral", "Smooth"],
  },
  {
    id: "espresso-tonic-uplift",
    type: "coffee",
    name: "Espresso Tonic",
    description:
      "Effervescent tonic water meets bold espresso for refreshing energy.",
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Double Espresso",
        description: "Intense shot with bold crema.",
        benefits: ["Energy lift", "Antioxidant boost", "Focus support"],
        icon: "bean",
      },
      {
        name: "Tonic Water",
        description: "Sparkling quinine water for brightness.",
        benefits: ["Digestive comfort"],
        icon: "seed",
      },
      {
        name: "Lime Zest",
        description: "Bright citrus oils for aromatics.",
        benefits: ["Immune support", "Digestive comfort"],
        icon: "citrus",
      },
      {
        name: "Rosemary Sprig",
        description: "Herbal accent for focus.",
        benefits: ["Focus support", "Antioxidant boost", "Circulation support"],
        icon: "leaf",
      },
    ],
    preparation: [
      "Fill glass with ice and tonic water.",
      "Pour espresso over slowly to layer.",
      "Garnish with lime and rosemary.",
    ],
    healthBenefits: [
      "Energy lift",
      "Focus support",
      "Antioxidant boost",
      "Digestive comfort",
      "Immune support",
      "Circulation support",
    ],
    flavorNotes: ["Bitter", "Citrus", "Herbal"],
  },
  {
    id: "maple-pecan-brew",
    type: "coffee",
    name: "Maple Pecan Brew",
    description:
      "Nutty medium roast enhanced with maple and pecans for cozy warmth.",
    image: "https://images.pexels.com/photos/373639/pexels-photo-373639.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Medium Roast Coffee",
        description: "Balanced brew with nutty undertones.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Maple Syrup",
        description: "Pure tree sap with minerals.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "seed",
      },
      {
        name: "Toasted Pecans",
        description: "Crunchy nuts rich in healthy fats.",
        benefits: ["Cardio health", "Metabolism support", "Gentle energy"],
        icon: "seed",
      },
      {
        name: "Cinnamon Stick",
        description: "Warming spice for blood sugar balance.",
        benefits: ["Metabolism support", "Anti-inflammatory"],
        icon: "spice",
      },
    ],
    preparation: [
      "Brew coffee with cinnamon stick.",
      "Stir in maple syrup while hot.",
      "Top with crushed toasted pecans.",
    ],
    healthBenefits: [
      "Energy lift",
      "Antioxidant boost",
      "Cardio health",
      "Metabolism support",
      "Gentle energy",
      "Anti-inflammatory",
    ],
    flavorNotes: ["Nutty", "Sweet", "Warm"],
  },
  {
    id: "collagen-vanilla-latte",
    type: "coffee",
    name: "Vanilla Latte",
    description:
      "Creamy latte boosted with collagen peptides for skin and joint health.",
    image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Blonde Espresso",
        description: "Light roast with bright acidity.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Collagen Peptides",
        description: "Hydrolyzed protein for tissue repair.",
        benefits: ["Joint support", "Anti-inflammatory"],
        icon: "seed",
      },
      {
        name: "Vanilla Extract",
        description: "Pure vanilla for aromatic sweetness.",
        benefits: ["Mood balance", "Calming"],
        icon: "seed",
      },
      {
        name: "Macadamia Milk",
        description: "Buttery nut milk with healthy fats.",
        benefits: ["Heart nourishment", "Metabolism support"],
        icon: "seed",
      },
    ],
    preparation: [
      "Blend hot espresso with collagen until dissolved.",
      "Steam macadamia milk with vanilla.",
      "Pour milk over espresso for latte art.",
    ],
    healthBenefits: [
      "Joint support",
      "Energy lift",
      "Anti-inflammatory",
      "Heart nourishment",
      "Metabolism support",
      "Mood balance",
      "Antioxidant boost",
    ],
    flavorNotes: ["Creamy", "Vanilla", "Smooth"],
  },
  {
    id: "turmeric-golden-coffee",
    type: "coffee",
    name: "Golden Coffee",
    description:
      "Anti-inflammatory golden latte with coffee's energizing kick.",
    image: "https://images.pexels.com/photos/1793037/pexels-photo-1793037.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Medium Roast Coffee",
        description: "Smooth base with chocolate notes.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Turmeric Paste",
        description: "Concentrated golden paste with black pepper.",
        benefits: ["Anti-inflammatory", "Joint support", "Antioxidant boost"],
        icon: "root",
      },
      {
        name: "Coconut Oil",
        description: "MCT-rich oil for sustained energy.",
        benefits: ["Metabolism support", "Energy lift"],
        icon: "seed",
      },
      {
        name: "Black Pepper",
        description: "Enhances turmeric absorption.",
        benefits: ["Digestive comfort", "Anti-inflammatory"],
        icon: "spice",
      },
      {
        name: "Cashew Cream",
        description: "Thick nut cream for richness.",
        benefits: ["Heart nourishment", "Gentle energy"],
        icon: "seed",
      },
    ],
    preparation: [
      "Blend hot coffee with turmeric paste and coconut oil.",
      "Add cashew cream and blend until frothy.",
      "Dust with black pepper and turmeric.",
    ],
    healthBenefits: [
      "Anti-inflammatory",
      "Joint support",
      "Energy lift",
      "Metabolism support",
      "Antioxidant boost",
      "Digestive comfort",
      "Heart nourishment",
    ],
    flavorNotes: ["Golden", "Earthy", "Rich"],
  },
  {
    id: "hazelnut-praline-brew",
    type: "coffee",
    name: "Hazelnut Praline",
    description:
      "Decadent coffee with hazelnut and caramelized sweetness for indulgent moments.",
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Dark Roast Coffee",
        description: "Bold brew with smoky undertones.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Hazelnut Butter",
        description: "Ground hazelnuts for creamy richness.",
        benefits: ["Cardio health", "Antioxidant boost", "Gentle energy"],
        icon: "seed",
      },
      {
        name: "Date Caramel",
        description: "Whole food caramel from blended dates.",
        benefits: ["Energy lift", "Digestive comfort"],
        icon: "seed",
      },
      {
        name: "Sea Salt Flakes",
        description: "Mineral salt to balance sweetness.",
        benefits: ["Metabolism support"],
        icon: "spice",
      },
    ],
    preparation: [
      "Brew dark roast coffee.",
      "Blend with hazelnut butter and date caramel.",
      "Top with sea salt flakes.",
    ],
    healthBenefits: [
      "Energy lift",
      "Antioxidant boost",
      "Cardio health",
      "Digestive comfort",
      "Metabolism support",
      "Gentle energy",
    ],
    flavorNotes: ["Nutty", "Caramel", "Smooth"],
  },
  {
    id: "mushroom-coffee-focus",
    type: "coffee",
    name: "Mushroom Coffee",
    description:
      "Coffee blended with cordyceps and chaga for sustained mental clarity.",
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Light Roast Coffee",
        description: "Bright coffee with fruity notes.",
        benefits: ["Energy lift", "Antioxidant boost"],
        icon: "bean",
      },
      {
        name: "Cordyceps Extract",
        description: "Adaptogenic mushroom for stamina.",
        benefits: ["Energy lift", "Metabolism support", "Immune support"],
        icon: "root",
      },
      {
        name: "Chaga Powder",
        description: "King of mushrooms for immune resilience.",
        benefits: ["Immune support", "Antioxidant boost", "Anti-inflammatory"],
        icon: "root",
      },
      {
        name: "MCT Oil",
        description: "Brain fuel from coconut.",
        benefits: ["Focus support", "Energy lift", "Metabolism support"],
        icon: "seed",
      },
    ],
    preparation: [
      "Brew coffee and blend with mushroom extracts.",
      "Add MCT oil and blend until emulsified.",
      "Enjoy as morning ritual.",
    ],
    healthBenefits: [
      "Focus support",
      "Energy lift",
      "Immune support",
      "Metabolism support",
      "Antioxidant boost",
      "Anti-inflammatory",
    ],
    flavorNotes: ["Earthy", "Smooth", "Balanced"],
  },
  {
    id: "cucumber-mint-hydration",
    type: "water",
    name: "Cucumber Mint Water",
    description:
      "Crisp cucumber paired with cooling mint for ultimate hydration and freshness.",
    image: "https://images.pexels.com/photos/1332189/pexels-photo-1332189.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Cucumber Slices",
        description: "Hydrating vegetable with silica for skin.",
        benefits: ["Digestive comfort", "Anti-inflammatory", "Heart nourishment"],
        icon: "leaf",
      },
      {
        name: "Fresh Mint",
        description: "Cooling herb for digestion.",
        benefits: ["Digestive comfort", "Calming", "Respiratory comfort"],
        icon: "leaf",
      },
      {
        name: "Lime Wedges",
        description: "Citrus for vitamin C and alkalinity.",
        benefits: ["Immune support", "Digestive comfort", "Antioxidant boost"],
        icon: "citrus",
      },
      {
        name: "Spring Water",
        description: "Pure mineral water base.",
        benefits: ["Gentle energy"],
        icon: "seed",
      },
    ],
    preparation: [
      "Slice cucumber thinly and muddle mint leaves.",
      "Add to pitcher with lime wedges.",
      "Fill with cold spring water and refrigerate 2 hours.",
      "Serve over ice with cucumber ribbon garnish.",
    ],
    healthBenefits: [
      "Digestive comfort",
      "Anti-inflammatory",
      "Immune support",
      "Calming",
      "Heart nourishment",
      "Antioxidant boost",
    ],
    flavorNotes: ["Crisp", "Refreshing", "Light"],
  },
  {
    id: "berry-basil-detox",
    type: "water",
    name: "Berry Basil Detox",
    description:
      "Antioxidant-rich berries with aromatic basil for gentle detoxification.",
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Mixed Berries",
        description: "Strawberries, blueberries for antioxidants.",
        benefits: ["Antioxidant boost", "Cardio health", "Immune support"],
        icon: "seed",
      },
      {
        name: "Fresh Basil",
        description: "Aromatic herb with anti-inflammatory compounds.",
        benefits: ["Anti-inflammatory", "Digestive comfort", "Stress relief"],
        icon: "leaf",
      },
      {
        name: "Lemon Slices",
        description: "Alkalizing citrus for cleansing.",
        benefits: ["Immune support", "Digestive comfort", "Metabolism support"],
        icon: "citrus",
      },
    ],
    preparation: [
      "Gently muddle berries to release juices.",
      "Add torn basil leaves and lemon slices.",
      "Pour cold filtered water and let infuse 3-4 hours.",
      "Strain if desired or serve with fruit.",
    ],
    healthBenefits: [
      "Antioxidant boost",
      "Anti-inflammatory",
      "Immune support",
      "Digestive comfort",
      "Cardio health",
      "Stress relief",
      "Metabolism support",
    ],
    flavorNotes: ["Berry-sweet", "Herbal", "Zesty"],
  },
  {
    id: "citrus-ginger-spark",
    type: "water",
    name: "Citrus Ginger Spark",
    description:
      "Vibrant citrus trio with spicy ginger for immune-boosting hydration.",
    image: "https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Orange Slices",
        description: "Sweet citrus rich in vitamin C.",
        benefits: ["Immune support", "Antioxidant boost", "Mood balance"],
        icon: "citrus",
      },
      {
        name: "Lemon Wheels",
        description: "Tart citrus for alkalizing properties.",
        benefits: ["Immune support", "Digestive comfort", "Metabolism support"],
        icon: "citrus",
      },
      {
        name: "Grapefruit Segments",
        description: "Bitter citrus for metabolism.",
        benefits: ["Metabolism support", "Cardio health", "Antioxidant boost"],
        icon: "citrus",
      },
      {
        name: "Fresh Ginger",
        description: "Spicy root for warming circulation.",
        benefits: ["Digestive comfort", "Anti-inflammatory", "Circulation support"],
        icon: "root",
      },
    ],
    preparation: [
      "Slice all citrus fruits into wheels.",
      "Peel and thinly slice fresh ginger.",
      "Layer in large pitcher with ice.",
      "Add cold water and steep 1-2 hours.",
    ],
    healthBenefits: [
      "Immune support",
      "Metabolism support",
      "Digestive comfort",
      "Anti-inflammatory",
      "Antioxidant boost",
      "Cardio health",
      "Circulation support",
    ],
    flavorNotes: ["Citrus-bright", "Spicy", "Invigorating"],
  },
  {
    id: "watermelon-rosemary-cooler",
    type: "water",
    name: "Watermelon Rosemary",
    description:
      "Sweet watermelon meets aromatic rosemary for summer hydration bliss.",
    image: "https://images.pexels.com/photos/5946068/pexels-photo-5946068.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Fresh Watermelon",
        description: "Hydrating fruit rich in lycopene.",
        benefits: ["Cardio health", "Antioxidant boost", "Gentle energy"],
        icon: "seed",
      },
      {
        name: "Rosemary Sprigs",
        description: "Pine-scented herb for focus.",
        benefits: ["Focus support", "Circulation support", "Antioxidant boost"],
        icon: "leaf",
      },
      {
        name: "Lime Juice",
        description: "Tart citrus for balance.",
        benefits: ["Immune support", "Digestive comfort"],
        icon: "citrus",
      },
    ],
    preparation: [
      "Cube fresh watermelon and muddle lightly.",
      "Bruise rosemary sprigs to release oils.",
      "Combine in pitcher with lime juice.",
      "Add ice water and refrigerate 2 hours minimum.",
    ],
    healthBenefits: [
      "Cardio health",
      "Antioxidant boost",
      "Focus support",
      "Circulation support",
      "Immune support",
      "Digestive comfort",
    ],
    flavorNotes: ["Sweet", "Herbal", "Summery"],
  },
  {
    id: "pineapple-turmeric-anti-inflammatory",
    type: "water",
    name: "Pineapple Turmeric Water",
    description:
      "Tropical pineapple with golden turmeric for anti-inflammatory hydration.",
    image: "https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Fresh Pineapple",
        description: "Tropical fruit with bromelain enzyme.",
        benefits: ["Digestive comfort", "Anti-inflammatory", "Immune support"],
        icon: "seed",
      },
      {
        name: "Fresh Turmeric",
        description: "Golden root with curcumin.",
        benefits: ["Anti-inflammatory", "Joint support", "Antioxidant boost"],
        icon: "root",
      },
      {
        name: "Black Pepper",
        description: "Enhances turmeric absorption.",
        benefits: ["Digestive comfort", "Anti-inflammatory"],
        icon: "spice",
      },
      {
        name: "Coconut Water",
        description: "Electrolyte-rich natural water.",
        benefits: ["Gentle energy", "Heart nourishment"],
        icon: "seed",
      },
    ],
    preparation: [
      "Chunk fresh pineapple and grate turmeric.",
      "Add pinch of black pepper for absorption.",
      "Mix with coconut water base.",
      "Refrigerate overnight for best flavor.",
    ],
    healthBenefits: [
      "Anti-inflammatory",
      "Joint support",
      "Digestive comfort",
      "Immune support",
      "Antioxidant boost",
      "Heart nourishment",
    ],
    flavorNotes: ["Tropical", "Golden", "Spiced"],
  },
  {
    id: "apple-cinnamon-metabolism",
    type: "water",
    name: "Apple Cinnamon Water",
    description:
      "Crisp apple with warming cinnamon for metabolism and blood sugar balance.",
    image: "https://images.pexels.com/photos/1332189/pexels-photo-1332189.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Green Apple",
        description: "Tart apple rich in fiber and pectin.",
        benefits: ["Digestive comfort", "Metabolism support", "Antioxidant boost"],
        icon: "seed",
      },
      {
        name: "Cinnamon Sticks",
        description: "Sweet spice for blood sugar regulation.",
        benefits: ["Metabolism support", "Anti-inflammatory", "Cardio health"],
        icon: "spice",
      },
      {
        name: "Fresh Ginger",
        description: "Warming root for digestion.",
        benefits: ["Digestive comfort", "Circulation support", "Anti-inflammatory"],
        icon: "root",
      },
    ],
    preparation: [
      "Thinly slice green apple with skin on.",
      "Add cinnamon sticks and sliced ginger.",
      "Pour cold filtered water over ingredients.",
      "Steep overnight in refrigerator for best results.",
    ],
    healthBenefits: [
      "Metabolism support",
      "Digestive comfort",
      "Anti-inflammatory",
      "Cardio health",
      "Circulation support",
      "Antioxidant boost",
    ],
    flavorNotes: ["Crisp", "Spiced", "Autumn-inspired"],
  },
  {
    id: "strawberry-kiwi-vitamin-boost",
    type: "water",
    name: "Strawberry Kiwi Boost",
    description:
      "Vitamin C powerhouse combination for immune support and radiant energy.",
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Fresh Strawberries",
        description: "Sweet berries packed with vitamin C.",
        benefits: ["Immune support", "Antioxidant boost", "Cardio health"],
        icon: "seed",
      },
      {
        name: "Kiwi Fruit",
        description: "Tangy fruit rich in vitamins and fiber.",
        benefits: ["Immune support", "Digestive comfort", "Antioxidant boost"],
        icon: "seed",
      },
      {
        name: "Fresh Mint",
        description: "Cooling herb for freshness.",
        benefits: ["Digestive comfort", "Calming", "Respiratory comfort"],
        icon: "leaf",
      },
    ],
    preparation: [
      "Slice strawberries and kiwi into rounds.",
      "Muddle mint leaves gently.",
      "Layer fruit and mint in pitcher.",
      "Add cold water and refrigerate 3-4 hours.",
    ],
    healthBenefits: [
      "Immune support",
      "Antioxidant boost",
      "Digestive comfort",
      "Cardio health",
      "Calming",
      "Respiratory comfort",
    ],
    flavorNotes: ["Sweet-tart", "Fruity", "Fresh"],
  },
  {
    id: "beetroot-berry-circulation",
    type: "water",
    name: "Beetroot Berry Water",
    description:
      "Earthy beets with berries for cardiovascular support and vibrant color.",
    image: "https://images.pexels.com/photos/1435740/pexels-photo-1435740.jpeg?auto=compress&cs=tinysrgb&w=800",
    ingredients: [
      {
        name: "Fresh Beetroot",
        description: "Root vegetable with nitrates for circulation.",
        benefits: ["Cardio health", "Circulation support", "Metabolism support"],
        icon: "root",
      },
      {
        name: "Raspberries",
        description: "Tart berries with fiber and antioxidants.",
        benefits: ["Antioxidant boost", "Digestive comfort", "Immune support"],
        icon: "seed",
      },
      {
        name: "Orange Zest",
        description: "Citrus oils for brightness.",
        benefits: ["Immune support", "Mood balance", "Antioxidant boost"],
        icon: "citrus",
      },
    ],
    preparation: [
      "Thinly slice raw beetroot.",
      "Add whole raspberries and orange zest.",
      "Pour filtered water and steep 4-6 hours.",
      "Strain before serving for clarity or leave fruit in.",
    ],
    healthBenefits: [
      "Cardio health",
      "Circulation support",
      "Antioxidant boost",
      "Digestive comfort",
      "Immune support",
      "Metabolism support",
    ],
    flavorNotes: ["Earthy", "Berry-tart", "Colorful"],
  },
];

export const drinkTypes: DrinkType[] = ["tea", "coffee", "water"];
