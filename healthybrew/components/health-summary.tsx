"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CupSteamIcon, HeartHerbIcon, SparkIcon, TeaLeafIcon } from "@/components/icons";

type HealthMetric = {
  id: string;
  label: string;
  value: number;
  description: string;
};

interface HealthSummaryProps {
  metrics: HealthMetric[];
  totalBenefits: number;
  focusTagline?: string;
}

const iconMap: Record<string, JSX.Element> = {
  calm: <TeaLeafIcon className="h-6 w-6 text-emerald-500" />,
  heart: <HeartHerbIcon className="h-6 w-6 text-rose-500" />,
  spark: <SparkIcon className="h-6 w-6 text-amber-500" />,
  vitality: <CupSteamIcon className="h-6 w-6 text-sky-500" />,
};

export function HealthSummary({ metrics, totalBenefits, focusTagline }: HealthSummaryProps) {
  const maxValue = Math.max(1, ...metrics.map((metric) => metric.value));

  return (
    <div className="rounded-3xl bg-gradient-to-br from-green-100 via-white to-amber-100 p-6 shadow-lg shadow-emerald-100/60 dark:shadow-none">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">
            Blend Health Profile
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-emerald-900">
            {totalBenefits > 0 ? `${totalBenefits} health touchpoints` : "Start curating your blend"}
          </h3>
          {focusTagline && (
            <p className="mt-2 text-sm text-emerald-700/80">{focusTagline}</p>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-inner"
        >
          {totalBenefits > 0 ? "Balanced" : "Awaiting ingredients"}
        </motion.div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="sync">
          {metrics.map((metric) => {
            const percentage = Math.round((metric.value / maxValue) * 100);
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="rounded-2xl bg-white/70 p-4 backdrop-blur"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-inner">
                      {iconMap[metric.id] ?? <SparkIcon className="h-6 w-6 text-emerald-500" />}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-emerald-900">{metric.label}</p>
                      <p className="text-xs text-emerald-700/80">{metric.description}</p>
                    </div>
                  </div>
                  <motion.span
                    key={metric.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-sm font-semibold text-emerald-600"
                  >
                    {metric.value}
                  </motion.span>
                </div>
                <div className="h-2 rounded-full bg-emerald-100">
                  <motion.div
                    key={`${metric.id}-${percentage}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
