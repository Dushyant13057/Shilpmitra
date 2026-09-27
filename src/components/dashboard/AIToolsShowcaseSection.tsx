"use client";

import {
  Wand2,
  FileText,
  BookOpen,
  TrendingUp,
  Mic,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Megaphone,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface AIToolsShowcaseSectionProps {
  onSelectTab: (tab: DashboardTab) => void;
}

export default function AIToolsShowcaseSection({
  onSelectTab,
}: AIToolsShowcaseSectionProps) {
  const tools = [
    {
      id: "image-enhancement" as DashboardTab,
      title: "Image Enhancement",
      eyebrow: "AI VISION STUDIO",
      desc: "Turn phone photos into marketplace-ready visuals with studio lighting & texture sharpening.",
      icon: Wand2,
      badge: "Vision",
      cta: "Open Studio",
    },
    {
      id: "ai-description" as DashboardTab,
      title: "AI Product Assistant",
      eyebrow: "CONVERSATIONAL CREATION",
      desc: "Speak with Sahayak in your native language to generate catalog titles, craft narratives, and product drafts.",
      icon: Sparkles,
      badge: "Voice + AI",
      cta: "Create with Voice",
    },
    {
      id: "price-analysis" as DashboardTab,
      title: "Price Analysis",
      eyebrow: "FAIR TRADE VALUATION",
      desc: "Calculate living wages and ensure fair profit margins on materials and handiwork hours.",
      icon: TrendingUp,
      badge: "Fair Price",
      cta: "Calculate Price",
    },
    {
      id: "sahayak" as DashboardTab,
      title: "Shilp Sahayak",
      eyebrow: "VOICE CO-PILOT",
      desc: "Chat or speak in Hindi and regional dialects to get guided assistance across your shop.",
      icon: Mic,
      badge: "Assistant",
      cta: "Talk to Sahayak",
    },
    {
      id: "marketplace" as DashboardTab,
      title: "Marketplace Syndication",
      eyebrow: "COMMERCE CHANNELS",
      desc: "Publish your artisan listings directly to national buyers and open commerce networks.",
      icon: ShoppingBag,
      badge: "Channels",
      cta: "View Marketplace",
    },
  ];

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-shilp-orange-600" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900">
            Artisan AI Studio Tools
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-shilp-orange-50 text-shilp-orange-700 border border-shilp-orange-200/60">
            5 Active Modules
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <div
              key={tool.id}
              className="group bg-[#FFFEFC] rounded-3xl p-5 sm:p-6 border border-warm-border hover:border-shilp-orange-300 shadow-warm-xs hover:shadow-warm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200 text-shilp-orange-600 flex items-center justify-center group-hover:bg-shilp-orange-500 group-hover:text-white transition-colors duration-200 shadow-warm-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-shilp-orange-700 bg-shilp-orange-50 border border-shilp-orange-200/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    {tool.eyebrow}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900 group-hover:text-shilp-orange-600 transition-colors mt-0.5">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-shilp-charcoal-600 mt-1 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-warm-border/50">
                <button
                  type="button"
                  onClick={() => onSelectTab(tool.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-shilp-cream-100 hover:bg-shilp-orange-50 text-shilp-charcoal-800 hover:text-shilp-orange-700 font-semibold text-xs border border-warm-border transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
