"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpenText, TrendingUp, ShoppingBag, ArrowUpRight } from "lucide-react";
import { FeatureItem } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  BookOpenText,
  TrendingUp,
  ShoppingBag,
};

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const IconComponent = iconMap[feature.iconName] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-[#FFFEFC] rounded-3xl p-6 md:p-7 shadow-warm-sm hover:shadow-warm-lg border border-warm-border hover:border-shilp-orange-300 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Decorative Subtle Corner Glow on Hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-shilp-orange-500/5 rounded-tr-3xl rounded-bl-[40px] pointer-events-none group-hover:bg-shilp-orange-500/10 transition-colors" />

      <div>
        {/* Icon Pill */}
        <div className="w-12 h-12 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/60 group-hover:bg-shilp-orange-500 group-hover:border-transparent flex items-center justify-center text-shilp-orange-600 group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
          <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Feature Title */}
        <h3 className="font-serif text-lg md:text-xl font-bold text-shilp-charcoal-900 mb-3 group-hover:text-shilp-orange-600 transition-colors">
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p className="text-sm text-shilp-charcoal-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Card Footer Indicator */}
      <div className="mt-6 pt-4 border-t border-warm-border/50 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wide uppercase text-shilp-charcoal-400 group-hover:text-shilp-orange-500 transition-colors">
          {feature.badge || "AI Powered"}
        </span>
        <div className="w-6 h-6 rounded-full bg-shilp-cream-200 group-hover:bg-shilp-orange-50 flex items-center justify-center text-shilp-charcoal-500 group-hover:text-shilp-orange-600 transition-colors">
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
