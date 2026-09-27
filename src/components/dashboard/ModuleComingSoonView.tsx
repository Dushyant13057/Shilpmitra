"use client";

import {
  ArrowLeft,
  Sparkles,
  Check,
  Info,
  Hammer,
  Building2,
  ShoppingBag,
  Mic,
  Megaphone,
  Package,
  ShoppingCart,
  Settings,
  Wand2,
  FileText,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { demoFeatureModules, FeatureModuleInfo } from "@/data/dashboardDemoData";
import { DashboardTab } from "@/types";

interface ModuleComingSoonViewProps {
  moduleId: DashboardTab;
  onBackToDashboard: () => void;
}

export default function ModuleComingSoonView({
  moduleId,
  onBackToDashboard,
}: ModuleComingSoonViewProps) {
  const moduleInfo: FeatureModuleInfo = demoFeatureModules[moduleId] || {
    id: moduleId,
    title: "Module Preview",
    category: "AI TOOLS",
    eyebrow: "UPCOMING WORKSPACE MODULE",
    description: "This feature is currently scheduled for development in Phase 2.",
    badge: "Phase 2 • Coming Soon",
    buttonText: "Coming Soon",
    plannedCapabilities: [
      "Modular cloud API connectivity via Java 17 Spring Boot",
      "Persistent state management via Supabase PostgreSQL",
      "Regional artisan interface support",
    ],
    disclaimer: "Feature requirements and data schema will be finalized before implementation.",
  };

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "image-enhancement":
        return Wand2;
      case "ai-description":
        return FileText;
      case "story-generator":
        return BookOpen;
      case "price-analysis":
        return TrendingUp;
      case "products":
        return Package;
      case "orders":
        return ShoppingCart;
      case "marketplace":
        return ShoppingBag;
      case "sahayak":
        return Mic;
      case "ads":
        return Megaphone;
      case "artisan-profile":
        return Hammer;
      case "business-profile":
        return Building2;
      case "settings":
        return Settings;
      default:
        return Sparkles;
    }
  };

  const IconComponent = getModuleIcon(moduleId);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-shilp-charcoal-500 hover:text-shilp-orange-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Feature Container Card */}
      <div className="bg-[#FFFEFC] rounded-3xl p-6 sm:p-10 border border-warm-border shadow-warm-sm max-w-3xl">
        {/* Header with Icon & Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/80 flex items-center justify-center text-shilp-orange-600 shrink-0 shadow-warm-xs">
            <IconComponent className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-shilp-orange-700 uppercase tracking-wider bg-shilp-orange-50 px-2 py-0.5 rounded-full border border-shilp-orange-200/60">
                {moduleInfo.badge}
              </span>
              <span className="text-[10px] text-shilp-charcoal-400 font-semibold uppercase tracking-wider">
                {moduleInfo.category}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900">
              {moduleInfo.title}
            </h1>
          </div>
        </div>

        {/* Primary Description */}
        <p className="text-sm sm:text-base text-shilp-charcoal-700 leading-relaxed mb-6 font-medium">
          {moduleInfo.description}
        </p>

        {/* Planned Capabilities */}
        <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-warm-border/80 mb-6">
          <h2 className="text-xs font-bold text-shilp-charcoal-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-shilp-orange-600" />
            <span>Planned Capabilities in Next Release</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-shilp-charcoal-700">
            {moduleInfo.plannedCapabilities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-shilp-orange-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer Box */}
        <div className="p-4 rounded-xl bg-shilp-cream-100/70 border border-warm-border/60 text-xs text-shilp-charcoal-600 leading-relaxed mb-8 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-shilp-charcoal-500 shrink-0 mt-0.5" />
          <span>{moduleInfo.disclaimer}</span>
        </div>

        {/* Coming Soon Button (Disabled or non-functional placeholder as requested) */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-shilp-cream-200 text-shilp-charcoal-700 font-semibold text-sm cursor-not-allowed border border-warm-border/80 flex items-center justify-center gap-2"
            disabled
          >
            <span>{moduleInfo.buttonText}</span>
          </button>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="w-full sm:w-auto py-3 px-5 rounded-xl text-shilp-orange-600 hover:text-shilp-orange-700 hover:bg-shilp-orange-50 font-semibold text-xs sm:text-sm transition-colors text-center"
          >
            Return to Dashboard Overview
          </button>
        </div>
      </div>
    </div>
  );
}
