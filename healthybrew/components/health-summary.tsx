"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactElement } from "react";
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

const iconMap: Record<string, ReactElement> = {
  calm: <TeaLeafIcon className="h-6 w-6 text-emerald-500" />,
  heart: <HeartHerbIcon className="h-6 w-6 text-rose-500" />,
  spark: <SparkIcon className="h-6 w-6 text-amber-500" />,
  vitality: <CupSteamIcon className="h-6 w-6 text-sky-500" />,
};

export function HealthSummary({ metrics, totalBenefits, focusTagline }: HealthSummaryProps) {
  const maxValue = Math.max(1, ...metrics.map((metric) => metric.value));

  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-5 shadow-md">
      <div className="mb-4 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
          Blend Health Profile
        </p>
        <h3 className="text-xl font-semibold text-emerald-900">
          {totalBenefits > 0 ? `${totalBenefits} health touchpoints` : "Explore recipes"}
        </h3>
        {focusTagline && (
          <p className="text-xs text-emerald-700/70">{focusTagline}</p>
        )}
      </div>

      <div className="space-y-3">
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
                className="rounded-xl bg-white/80 p-3 backdrop-blur"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                      {iconMap[metric.id] ?? <SparkIcon className="h-5 w-5 text-emerald-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-900">{metric.label}</p>
                      <p className="text-[10px] text-emerald-700/70">{metric.description}</p>
                    </div>
                  </div>
                  <motion.span
                    key={metric.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-xs font-semibold text-emerald-600"
                  >
                    {metric.value}
                  </motion.span>
                </div>
                <div className="h-1.5 rounded-full bg-emerald-100">
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
