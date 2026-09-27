"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { journeySteps } from "@/data/journey";
import JourneyStep from "./JourneyStep";

export default function Journey() {
  return (
    <section id="journey" className="py-20 md:py-28 relative bg-[#FFFEFC] border-y border-warm-border/50">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-mandala-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-widest uppercase mb-3"
          >
            The Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-shilp-charcoal-900 tracking-tight mb-3"
          >
            From Craft to Customer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-shilp-charcoal-600"
          >
            A simple journey. A powerful transformation.
          </motion.p>
        </div>

        {/* Desktop 7-Step Sequence with Flow Connectors */}
        <div className="hidden lg:flex items-start justify-between relative px-2">
          {journeySteps.map((step, index) => (
            <div key={step.step} className="flex items-center flex-1 last:flex-none">
              <div className="flex-1 flex justify-center">
                <JourneyStep step={step} index={index} total={journeySteps.length} />
              </div>
              {index < journeySteps.length - 1 && (
                <div className="text-amber-900/25 -mt-10 shrink-0 px-1">
                  <ChevronRight className="w-5 h-5 text-shilp-orange-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Responsive Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 lg:hidden">
          {journeySteps.map((step, index) => (
            <div
              key={step.step}
              className="bg-shilp-cream-100/80 p-4 rounded-2xl border border-warm-border flex flex-col items-center shadow-warm-sm"
            >
              <JourneyStep step={step} index={index} total={journeySteps.length} />
            </div>
          ))}
        </div>

        {/* Journey Footnote / Assurance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#FDFBF7] border border-warm-border shadow-warm-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-shilp-orange-500 shrink-0" />
            <p className="text-xs sm:text-sm text-shilp-charcoal-700">
              <strong className="text-shilp-charcoal-900">Supported at Every Step:</strong> No smartphone expertise required. Sahayak talks you through each stage.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const sahayakSec = document.getElementById("sahayak");
              sahayakSec?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs font-bold text-shilp-orange-600 hover:text-shilp-orange-700 underline underline-offset-4 whitespace-nowrap"
          >
            Try Sahayak Voice Demo →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
