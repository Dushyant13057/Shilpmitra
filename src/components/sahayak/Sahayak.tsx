"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Languages, Mic, Footprints } from "lucide-react";
import VoiceSimulation from "./VoiceSimulation";

export default function Sahayak() {
  return (
    <section id="sahayak" className="py-20 md:py-28 relative bg-[#FAF6EE] overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-shilp-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-shilp-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Artisan holding phone */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            {/* Header elements */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-widest uppercase mb-4">
              Sahayak Voice Assistant
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-shilp-charcoal-900 leading-tight tracking-tight mb-5 text-center lg:text-left">
              Your Voice-Based <br className="hidden sm:inline" />
              <span className="text-shilp-orange-500">Digital Companion</span>
            </h2>

            <p className="text-base sm:text-lg text-shilp-charcoal-600 leading-relaxed mb-8 text-center lg:text-left">
              From onboarding to order fulfilment, Sahayak guides artisans in their mother tongue — step by step, through natural voice conversations that require zero typing.
            </p>

            {/* Artisan Visual Portrait with Soft Halo */}
            <div className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 shadow-warm-lg mb-8">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#FFFEFC] bg-shilp-cream-100">
                <Image
                  src="/images/artisan-hero.jpg"
                  alt="Indian woman artisan interacting with Sahayak voice assistant"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>

              {/* Active Audio Indicator */}
              <div className="absolute -bottom-2 -right-2 bg-[#FFFEFC] px-3.5 py-1.5 rounded-full shadow-warm-sm border border-warm-border flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-shilp-orange-500" />
                <span className="text-xs font-bold text-shilp-charcoal-800">
                  Aapki Bhasha
                </span>
              </div>
            </div>

            {/* 3 Value Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FFFEFC]/95 border border-warm-border text-xs font-semibold text-shilp-charcoal-800 shadow-warm-sm">
                <Languages className="w-4 h-4 text-shilp-orange-500" />
                <span>Regional Languages</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FFFEFC]/95 border border-warm-border text-xs font-semibold text-shilp-charcoal-800 shadow-warm-sm">
                <Mic className="w-4 h-4 text-shilp-orange-500" />
                <span>Voice Interaction</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FFFEFC]/95 border border-warm-border text-xs font-semibold text-shilp-charcoal-800 shadow-warm-sm">
                <Footprints className="w-4 h-4 text-shilp-orange-500" />
                <span>Step-by-Step Guidance</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Voice Simulation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <VoiceSimulation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
