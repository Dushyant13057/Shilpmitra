"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] to-[#FAF5EC]">
      {/* Decorative Warm Accents */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-shilp-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-6 relative"
          >
            {/* Background Accent */}
            <div className="absolute -inset-4 bg-shilp-orange-500/5 rounded-3xl -z-10" />

            <div className="relative">
              {/* Primary Artisan Workshop Photo */}
              <div className="relative h-80 sm:h-96 md:h-[440px] w-full rounded-[2.5rem] overflow-hidden shadow-warm-lg border-4 border-[#FFFEFC] bg-shilp-cream-100">
                <Image
                  src="/images/elder-artisan.jpg"
                  alt="Senior traditional Indian potter teaching craft to his grandson"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-shilp-orange-200 font-semibold block mb-1">
                    Heritage Preserved
                  </span>
                  <p className="font-serif text-lg font-bold">
                    Empowering 200+ Craft Clusters Across India
                  </p>
                </div>
              </div>

              {/* Inset Secondary Artisan Photo (Top Right) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="absolute -top-6 -right-4 sm:-right-8 w-32 sm:w-40 h-32 sm:h-40 rounded-2xl overflow-hidden shadow-warm-lg border-4 border-[#FFFEFC] z-10 hidden sm:block bg-shilp-cream-100"
              >
                <Image
                  src="/images/pot-after.jpg"
                  alt="Completed handcrafted terracotta vase"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </motion.div>

              {/* Floating Stat Badge (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-6 -right-2 sm:right-6 bg-[#FFFEFC] p-4 rounded-2xl shadow-warm-lg border border-warm-border z-20 flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-shilp-orange-50 flex items-center justify-center text-shilp-orange-600">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-shilp-charcoal-400 font-medium block">
                    Middleman Markup
                  </span>
                  <span className="font-serif text-lg font-bold text-shilp-charcoal-900">
                    Reduced by 60%
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-widest uppercase mb-4">
              About ShilpMitra
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-shilp-charcoal-900 leading-tight tracking-tight mb-6">
              Turning Traditional Craft into Digital Opportunity
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-shilp-charcoal-600 leading-relaxed mb-6 font-normal">
              ShilpMitra is an AI-powered digital assistant designed to help artisans showcase, market, and sell their traditional products with zero technical complexity. We bring state-of-the-art computer vision, multilingual natural language storytelling, and fair pricing to your fingertips — so you can focus on what you do best: <strong className="text-shilp-charcoal-900 font-semibold">create</strong>.
            </p>

            {/* Value checklist */}
            <div className="space-y-3.5 mb-8 w-full">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-shilp-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-shilp-charcoal-700">
                  <strong className="font-semibold text-shilp-charcoal-900">Zero English Barrier:</strong> Voice and text interaction in 10+ regional Indian languages.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-shilp-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-shilp-charcoal-700">
                  <strong className="font-semibold text-shilp-charcoal-900">Studio Quality from Phone:</strong> AI automatically fixes smartphone camera lighting and clutter.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-shilp-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-shilp-charcoal-700">
                  <strong className="font-semibold text-shilp-charcoal-900">Direct Fair Profits:</strong> Real-time demand pricing prevents artisans from undercharging.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-shilp-orange-500 hover:bg-shilp-orange-600 rounded-full shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Explore ShilpMitra</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  const journeySec = document.getElementById("journey");
                  journeySec?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-medium text-shilp-charcoal-800 bg-[#FFFEFC] hover:bg-shilp-cream-100 rounded-full border border-warm-border shadow-warm-sm transition-all duration-300 hover:border-shilp-orange-300"
              >
                <div className="w-5 h-5 rounded-full bg-shilp-orange-50 flex items-center justify-center text-shilp-orange-600">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch How It Works</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
