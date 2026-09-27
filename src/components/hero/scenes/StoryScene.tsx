"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpenText, Feather, CheckCircle2, Sparkles } from "lucide-react";

const fullStoryText =
  "“Hand-shaped from natural alluvial clay on a village wheel and adorned with sacred peacock and lotus motifs using traditional earth pigments.”";

export default function StoryScene() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Progressive text generation animation to simulate the digital listing being prepared
  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsTypingDone(false);

    const timer = setInterval(() => {
      if (index < fullStoryText.length) {
        setDisplayedText(fullStoryText.slice(0, index + 2));
        index += 2;
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, []);

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
          <BookOpenText className="w-3.5 h-3.5 text-shilp-orange-500" />
          <span>AI Story & Description</span>
        </span>
        <span className="text-xs font-semibold text-shilp-charcoal-500 hidden sm:inline">
          Cultural Storytelling
        </span>
      </motion.div>

      {/* Central Product Listing Preparation Stage */}
      <div className="relative flex-1 flex flex-col sm:flex-row items-center justify-center gap-3.5 my-2">
        {/* Left Side: Product Card Thumbnail */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 sm:w-40 h-36 sm:h-52 rounded-2xl overflow-hidden shadow-warm border-2 border-[#FFFEFC] bg-shilp-cream-100 shrink-0"
        >
          <Image
            src="/images/pot-after.jpg"
            alt="Handcrafted Terracotta Earthenware"
            fill
            className="object-cover"
            sizes="160px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 text-white">
            <span className="text-[9px] font-bold bg-shilp-orange-500 px-2 py-0.5 rounded-full inline-block mb-1 shadow-sm">
              GI Tagged Craft
            </span>
            <p className="text-[11px] font-bold truncate">Terracotta Kalash</p>
          </div>
        </motion.div>

        {/* Right Side: Animated AI Story & Description Card */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 w-full bg-[#FFFEFC]/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-warm-border shadow-warm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-shilp-orange-600 flex items-center gap-1">
                <Feather className="w-3 h-3" />
                <span>Craft Narrative</span>
              </span>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                  isTypingDone
                    ? "text-shilp-orange-700 bg-shilp-orange-50 border-shilp-orange-200/70"
                    : "text-shilp-orange-600 bg-shilp-orange-50/60 border-shilp-orange-200/50 animate-pulse"
                }`}
              >
                {isTypingDone ? "✓ Ready to publish" : "Preparing narrative..."}
              </span>
            </div>

            <h4 className="font-serif text-sm sm:text-base font-bold text-shilp-charcoal-900 leading-snug mb-2">
              Madhubani Hand-Painted Sacred Clay Kalash
            </h4>

            {/* Generated Story Snippet with Progressive Typewriter Effect */}
            <div className="bg-shilp-cream-100/95 rounded-xl p-2.5 border border-warm-border/50 mb-2.5 min-h-[64px] sm:min-h-[72px] flex items-center">
              <p className="text-[11px] sm:text-xs text-shilp-charcoal-700 leading-relaxed italic">
                {displayedText}
                {!isTypingDone && (
                  <span className="inline-block w-1.5 h-3.5 bg-shilp-orange-500 ml-0.5 animate-pulse align-middle" />
                )}
              </p>
            </div>

            {/* Metadata Pills */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-shilp-charcoal-600">
              <div className="bg-shilp-orange-50/70 px-2 py-1 rounded-lg border border-warm-border/50">
                <span className="text-shilp-charcoal-400 block text-[8px] uppercase font-semibold">
                  Artisan Region
                </span>
                <span className="font-bold text-shilp-charcoal-800">Kutch, Gujarat</span>
              </div>
              <div className="bg-shilp-orange-50/70 px-2 py-1 rounded-lg border border-warm-border/50">
                <span className="text-shilp-charcoal-400 block text-[8px] uppercase font-semibold">
                  Craft Technique
                </span>
                <span className="font-bold text-shilp-charcoal-800">Natural Firing</span>
              </div>
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
          Every craft has a story.
        </p>
        <p className="text-[11px] text-shilp-charcoal-500">
          Turn generations of heritage into compelling product descriptions that buyers love.
        </p>
      </motion.div>
    </div>
  );
}

