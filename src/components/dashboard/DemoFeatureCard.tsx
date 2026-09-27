"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { DemoModalType } from "./DemoComingSoonModal";

interface DemoFeatureCardProps {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ElementType;
  sectionType: NonNullable<DemoModalType>;
  badgeText?: string;
  onOpenModal: (type: NonNullable<DemoModalType>) => void;
}

export default function DemoFeatureCard({
  title,
  description,
  buttonText,
  icon: Icon,
  sectionType,
  badgeText = "Coming Soon • Demo",
  onOpenModal,
}: DemoFeatureCardProps) {
  return (
    <div className="group relative bg-[#FFFEFC] rounded-3xl p-6 sm:p-7 shadow-warm-sm hover:shadow-warm-lg border border-warm-border hover:border-shilp-orange-300 transition-all duration-300 flex flex-col justify-between">
      {/* Decorative Subtle Corner Glow on Hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-shilp-orange-500/5 rounded-tr-3xl rounded-bl-[40px] pointer-events-none group-hover:bg-shilp-orange-500/10 transition-colors" />

      <div>
        {/* Top Header: Icon & Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/60 group-hover:bg-shilp-orange-500 group-hover:border-transparent flex items-center justify-center text-shilp-orange-600 group-hover:text-white transition-all duration-300 shadow-warm-sm">
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-shilp-orange-700 bg-shilp-orange-50 px-2.5 py-1 rounded-full border border-shilp-orange-200/60">
            <Sparkles className="w-2.5 h-2.5 text-shilp-orange-500" />
            <span>{badgeText}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-shilp-charcoal-900 group-hover:text-shilp-orange-600 transition-colors mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-shilp-charcoal-600 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Button with Demo Action */}
      <div className="pt-4 border-t border-warm-border/50">
        <button
          type="button"
          onClick={() => onOpenModal(sectionType)}
          className="w-full py-2.5 px-4 rounded-xl bg-shilp-cream-100 hover:bg-shilp-orange-500 text-shilp-charcoal-800 hover:text-white font-semibold text-xs sm:text-sm border border-warm-border hover:border-transparent shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-shilp-orange-500 group-hover:text-white"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
