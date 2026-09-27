"use client";

import { motion } from "framer-motion";
import { featuresData } from "@/data/features";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 relative bg-[#FDFBF7]">
      {/* Subtle mandala watermark decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full border border-shilp-orange-500/10 pointer-events-none -translate-x-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full border border-shilp-orange-500/10 pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-widest uppercase mb-4"
          >
            AI Powered Solutions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-shilp-charcoal-900 tracking-tight mb-4"
          >
            Everything You Need to Take Your Craft Digital
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-shilp-charcoal-600"
          >
            Empowering India&apos;s master craftspeople with intuitive, voice-first tools to showcase, sell, and grow without digital friction.
          </motion.p>
        </div>

        {/* Feature Cards Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {featuresData.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
