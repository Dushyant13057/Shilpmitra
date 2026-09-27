"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, Volume2, Sparkles, CheckCircle2 } from "lucide-react";

export default function SahayakScene() {
  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[470px] flex flex-col justify-between p-4 sm:p-5 overflow-hidden select-none">
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-shilp-orange-500/10 via-shilp-orange-500/5 to-transparent rounded-3xl" />

      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 flex items-center justify-between"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-wide uppercase">
          <Volume2 className="w-3.5 h-3.5 text-shilp-orange-500" />
          <span>Meet Sahayak</span>
        </span>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-shilp-orange-700 bg-shilp-orange-50 px-2.5 py-0.5 rounded-full border border-shilp-orange-200/70">
          <span className="w-1.5 h-1.5 rounded-full bg-shilp-orange-500 animate-pulse" />
          <span>Voice Active • हिन्दी</span>
        </div>
      </motion.div>

      {/* Central Voice Dialogue Simulation */}
      <div className="relative flex-1 flex flex-col justify-center gap-2.5 my-2">
        {/* Dialogue Bubble 1: Sahayak Query */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex items-start gap-2.5 max-w-[92%]"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="bg-[#FFFEFC]/95 backdrop-blur-md p-3 rounded-2xl rounded-tl-sm border border-warm-border shadow-warm-sm">
            <p className="text-xs font-medium text-shilp-charcoal-800 leading-snug">
              &ldquo;Namaskar! Aapke product ka order aaya hai. Kya stock available hai?&rdquo;
            </p>
            {/* Subtle Live Audio Wave Indicator */}
            <div className="flex items-center gap-1 mt-2 pt-1 border-t border-warm-border/50">
              <span className="w-1 h-3 bg-shilp-orange-500 rounded-full animate-pulse" />
              <span className="w-1 h-4.5 bg-shilp-orange-600 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-shilp-orange-300 rounded-full animate-pulse delay-150" />
              <span className="w-1 h-4 bg-shilp-orange-500 rounded-full animate-pulse delay-100" />
              <span className="w-1 h-2.5 bg-shilp-orange-400 rounded-full animate-pulse delay-200" />
              <span className="text-[9px] text-shilp-charcoal-500 ml-1.5 font-mono">
                Sahayak • Audio Note
              </span>
            </div>
          </div>
        </motion.div>

        {/* Dialogue Bubble 2: Artisan Voice Reply */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="flex items-start justify-end gap-2.5 max-w-[92%] self-end"
        >
          <div className="bg-gradient-to-r from-shilp-orange-600 to-shilp-orange-500 text-white p-3 rounded-2xl rounded-tr-sm shadow-warm">
            <p className="text-xs font-semibold leading-snug">
              &ldquo;Haan, available hai.&rdquo;
            </p>
            <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-shilp-orange-100 font-medium">
              <Mic className="w-2.5 h-2.5 text-shilp-orange-200" />
              <span>Voice Reply • 0:02</span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full overflow-hidden border border-shilp-orange-400 shrink-0 mt-0.5 relative shadow-xs">
            <Image
              src="/images/elder-artisan.jpg"
              alt="Master Artisan"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
        </motion.div>

        {/* Dialogue Bubble 3: Sahayak Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 1.0 }}
          className="flex items-start gap-2.5 max-w-[92%]"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 flex items-center justify-center text-white shrink-0 shadow-sm mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="bg-[#FFFEFC]/95 backdrop-blur-md p-3 rounded-2xl rounded-tl-sm border border-warm-border shadow-warm-sm">
            <p className="text-xs font-medium text-shilp-charcoal-800 leading-snug">
              &ldquo;Bahut badhiya. Product ko ready rakhiye.&rdquo;
            </p>
            <div className="flex items-center gap-1.5 mt-2 pt-1 border-t border-warm-border/50 text-[9px] text-shilp-orange-700 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-shilp-orange-600" />
              <span>Order confirmed for dispatch</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Supporting Message */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-20 text-center bg-[#FFFEFC]/90 backdrop-blur-sm py-2 px-3 rounded-2xl border border-warm-border shadow-warm-sm"
      >
        <p className="font-serif text-sm sm:text-base font-bold text-shilp-charcoal-900">
          Your Voice-Based Digital Companion
        </p>
        <p className="text-[11px] text-shilp-charcoal-500">
          Guiding artisans through orders, stock updates, and dispatch in their mother tongue.
        </p>
      </motion.div>
    </div>
  );
}

