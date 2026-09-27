"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-[#1A1513] text-[#FFFEFC]">
      {/* Background Artisan Craft Photography with Rich Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=80"
          alt="Indian artisan weaving intricate traditional handloom textile"
          fill
          className="object-cover object-center opacity-25 filter brightness-75 contrast-125"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1513] via-[#1A1513]/90 to-[#1A1513]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-shilp-orange-200 text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-shilp-orange-400" />
          <span>Begin Your Digital Transformation</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight"
        >
          Your Craft Deserves to Be Seen.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-shilp-cream-300 max-w-2xl mx-auto mb-9 font-normal leading-relaxed"
        >
          Let AI handle the digital complexity while you focus on what you love — your craft. Zero setup fees, 100% voice guided.
        </motion.p>

        {/* Action CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#journey"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-shilp-orange-500 hover:bg-shilp-orange-600 rounded-full shadow-warm-lg hover:shadow-warm-glow transition-all duration-300 hover:scale-105 active:scale-100"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
