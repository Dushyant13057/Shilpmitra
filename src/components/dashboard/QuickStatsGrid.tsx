"use client";

import { Package, ShoppingCart, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { demoStatsData, DashboardStatItem } from "@/data/dashboardDemoData";
import { DashboardTab } from "@/types";

interface QuickStatsGridProps {
  onSelectTab: (tab: DashboardTab) => void;
}

export default function QuickStatsGrid({ onSelectTab }: QuickStatsGridProps) {
  // Map icons to categories
  const getIcon = (category: DashboardStatItem["category"]) => {
    switch (category) {
      case "products":
        return Package;
      case "orders":
        return ShoppingCart;
      case "pending":
        return Clock;
      case "setup":
        return CheckCircle2;
    }
  };

  const handleCardClick = (category: DashboardStatItem["category"]) => {
    if (category === "products") onSelectTab("products");
    else if (category === "orders" || category === "pending") onSelectTab("orders");
    else if (category === "setup") onSelectTab("basic-info");
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {demoStatsData.map((stat) => {
        const IconComponent = getIcon(stat.category);

        return (
          <button
            key={stat.id}
            type="button"
            onClick={() => handleCardClick(stat.category)}
            className="group text-left bg-[#FFFEFC] hover:bg-[#FAF6EE]/70 rounded-2xl p-4 sm:p-5 border border-warm-border hover:border-shilp-orange-300 transition-all duration-200 shadow-warm-xs hover:shadow-warm-sm focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20"
          >
            {/* Header: Label + Icon */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-medium text-shilp-charcoal-600 truncate">
                {stat.label}
              </span>
              <div className="w-8 h-8 rounded-xl bg-shilp-orange-50 text-shilp-orange-600 flex items-center justify-center shrink-0 group-hover:bg-shilp-orange-500 group-hover:text-white transition-colors duration-200">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            {/* Value */}
            <div className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 group-hover:text-shilp-orange-600 transition-colors">
              {stat.value}
            </div>

            {/* Subtext & Trend */}
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-shilp-charcoal-500">
              {stat.trend === "up" && (
                <TrendingUp className="w-3 h-3 text-emerald-600 shrink-0" />
              )}
              <span className="truncate">{stat.subtext}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
