"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles, FileText, Tag, ShoppingCart, PackageCheck, Mic } from "lucide-react";
import { JourneyStepItem } from "@/types";

const stepIconMap: Record<string, React.ElementType> = {
  Camera,
  Sparkles,
  FileText,
  Tag,
  ShoppingCart,
  PackageCheck,
  Mic,
};

interface JourneyStepProps {
  step: JourneyStepItem;
  index: number;
  total: number;
}

export default function JourneyStep({ step, index, total }: JourneyStepProps) {
  const IconComponent = stepIconMap[step.iconName] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Icon Capsule */}
      <div className="relative mb-3">
        <div className="w-14 h-14 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/60 group-hover:bg-shilp-orange-500 group-hover:border-transparent flex items-center justify-center text-shilp-orange-600 group-hover:text-white transition-all duration-300 shadow-warm-sm group-hover:shadow-warm group-hover:scale-105">
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Small step number bubble */}
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FFFEFC] border border-warm-border text-[10px] font-bold text-shilp-charcoal-700 flex items-center justify-center shadow-xs">
          {step.step}
        </span>
      </div>

      {/* Step Title */}
      <h3 className="font-serif text-sm sm:text-base font-bold text-shilp-charcoal-900 mb-1 group-hover:text-shilp-orange-600 transition-colors">
        {step.title}
      </h3>

      {/* Step Description */}
      <p className="text-[11px] sm:text-xs text-shilp-charcoal-500 leading-tight max-w-[120px]">
        {step.description}
      </p>
    </motion.div>
  );
}
