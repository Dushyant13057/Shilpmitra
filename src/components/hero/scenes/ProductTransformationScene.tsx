"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";

export default function ProductTransformationScene() {
  const [sliderPosition, setSliderPosition] = useState(52);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth periodic sweep across the photograph to reveal the transformation
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setSliderPosition((prev) => (prev > 70 ? 28 : prev + 14));
    }, 1400);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(percent);
    setIsHovered(true);
  };

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
          <Wand2 className="w-3.5 h-3.5 text-shilp-orange-500" />
          <span>AI Product Enhancement</span>
        </span>
        <span className="text-xs font-semibold text-shilp-charcoal-500 hidden sm:inline">
          Visual Demonstration
        </span>
      </motion.div>

      {/* Central Interactive Before / After Transformation Stage */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-2">
        <div
          className="relative w-full max-w-[340px] sm:max-w-[370px] h-60 sm:h-64 rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white/95 cursor-ew-resize touch-none"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setIsHovered(false)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setSliderPosition(Math.round((x / rect.width) * 100));
          }}
        >
          {/* Layer 1: Enhanced After Image (Base) */}
          <div className="absolute inset-0 bg-shilp-cream-100">
            <Image
              src="/images/pot-after.jpg"
              alt="Enhanced Studio Craft Pottery"
              fill
              className="object-cover"
              sizes="370px"
              priority
            />
            {/* After Tag */}
            <div className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full bg-shilp-orange-500 text-white text-[10px] font-bold shadow-md uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>After • Studio AI</span>
            </div>
          </div>

          {/* Layer 2: Original Before Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden bg-shilp-cream-300 transition-all duration-500 ease-out"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-[340px] sm:w-[370px] h-full">
              <Image
                src="/images/pot-before.jpg"
                alt="Raw Earthenware Before Enhancement"
                fill
                className="object-cover"
                sizes="370px"
                priority
              />
              <div className="absolute inset-0 bg-black/15" />
              {/* Before Tag */}
              <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-shilp-charcoal-900/90 backdrop-blur-sm text-white text-[10px] font-bold shadow-md uppercase tracking-wider">
                Before • Workshop Photo
              </div>
            </div>
          </div>

          {/* Vertical Slider Divider Line with Glowing Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-xl transition-all duration-500 ease-out z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 border-2 border-white text-white flex items-center justify-center shadow-warm">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Feature Highlights Pills below image */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3">
          <span className="text-[10px] sm:text-xs font-semibold text-shilp-charcoal-700 bg-[#FFFEFC]/90 px-2.5 py-1 rounded-xl border border-warm-border shadow-xs">
            ✨ Studio Lighting
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-shilp-charcoal-700 bg-[#FFFEFC]/90 px-2.5 py-1 rounded-xl border border-warm-border shadow-xs">
            🧹 Clutter Removal
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-shilp-charcoal-700 bg-[#FFFEFC]/90 px-2.5 py-1 rounded-xl border border-warm-border shadow-xs">
            🎨 Color Vibrance
          </span>
        </div>
      </div>

      {/* Bottom Supporting Message */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-20 text-center bg-[#FFFEFC]/90 backdrop-blur-sm py-2 px-3 rounded-2xl border border-warm-border shadow-warm-sm"
      >
        <p className="font-serif text-sm sm:text-base font-bold text-shilp-charcoal-900">
          Turn your craft into a professional digital presentation.
        </p>
        <p className="text-[11px] text-shilp-charcoal-500">
          Transform ordinary workshop snapshots into marketplace-ready showcase photography.
        </p>
      </motion.div>
    </div>
  );
}

