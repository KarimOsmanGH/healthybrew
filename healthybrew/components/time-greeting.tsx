"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Sunrise, Sunset, Coffee, Sparkles } from "lucide-react";

interface TimeGreetingData {
  greeting: string;
  message: string;
  iconType: "sunrise" | "sun" | "sunset" | "moon" | "coffee";
  recommendation: string;
  gradientFrom: string;
  gradientTo: string;
}

function getTimeGreetingData(): TimeGreetingData {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 9) {
    return {
      greeting: "Good Morning",
      message: "Start your day with intention",
      iconType: "sunrise",
      recommendation: "Perfect time for an energizing matcha or cold brew",
      gradientFrom: "from-amber-400",
      gradientTo: "to-orange-500",
    };
  } else if (hour >= 9 && hour < 12) {
    return {
      greeting: "Late Morning",
      message: "Stay focused and productive",
      iconType: "sun",
      recommendation: "Try a focus-enhancing tea or mushroom coffee",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-amber-500",
    };
  } else if (hour >= 12 && hour < 14) {
    return {
      greeting: "Good Afternoon",
      message: "Midday refresh awaits",
      iconType: "sun",
      recommendation: "Light green tea or infused water for gentle energy",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-500",
    };
  } else if (hour >= 14 && hour < 17) {
    return {
      greeting: "Afternoon",
      message: "Power through the rest of the day",
      iconType: "coffee",
      recommendation: "A gentle latte or oolong for sustained focus",
      gradientFrom: "from-blue-400",
      gradientTo: "to-indigo-500",
    };
  } else if (hour >= 17 && hour < 20) {
    return {
      greeting: "Good Evening",
      message: "Time to unwind and relax",
      iconType: "sunset",
      recommendation: "Herbal tea or calming infused water",
      gradientFrom: "from-purple-400",
      gradientTo: "to-pink-500",
    };
  } else {
    return {
      greeting: "Good Night",
      message: "Prepare for restful sleep",
      iconType: "moon",
      recommendation: "Lavender dreams or chamomile for peaceful rest",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-purple-600",
    };
  }
}

function getIcon(type: TimeGreetingData["iconType"]) {
  switch (type) {
    case "sunrise": return <Sunrise className="h-5 w-5" />;
    case "sun": return <Sun className="h-5 w-5" />;
    case "sunset": return <Sunset className="h-5 w-5" />;
    case "moon": return <Moon className="h-5 w-5" />;
    case "coffee": return <Coffee className="h-5 w-5" />;
  }
}

// Create a simple time store for SSR-safe time updates
function subscribeToTime(callback: () => void) {
  const interval = setInterval(callback, 60000);
  return () => clearInterval(interval);
}

function getTimeSnapshot() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getServerTimeSnapshot() {
  return ""; // Return empty on server
}

export function TimeGreeting() {
  const currentTime = useSyncExternalStore(
    subscribeToTime,
    getTimeSnapshot,
    getServerTimeSnapshot
  );
  
  const greeting = getTimeGreetingData();
  const icon = getIcon(greeting.iconType);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white/40 backdrop-blur-md p-4 shadow-lg"
    >
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${greeting.gradientFrom} ${greeting.gradientTo}`} />
      
      <div className="flex items-start gap-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${greeting.gradientFrom} ${greeting.gradientTo} text-white shadow-lg`}
        >
          {icon}
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={`text-lg font-bold bg-gradient-to-r ${greeting.gradientFrom} ${greeting.gradientTo} bg-clip-text text-transparent`}>
              {greeting.greeting}
            </h2>
            {currentTime && (
              <span className="text-xs font-medium text-purple-600/70 bg-purple-100/50 px-2 py-0.5 rounded-full">
                {currentTime}
              </span>
            )}
          </div>
          <p className="text-sm text-purple-700/80 font-medium">{greeting.message}</p>
          <div className="mt-2 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            <p className="text-xs text-purple-600/70 font-medium">{greeting.recommendation}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
