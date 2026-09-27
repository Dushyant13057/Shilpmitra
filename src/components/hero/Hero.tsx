"use client";

import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden bg-gradient-to-b from-[#FAF6ED] via-[#FDFBF7] to-[#FDFBF7]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-shilp-orange-500" />
              <span>ShilpMitra</span>
              <span className="text-shilp-charcoal-400">•</span>
              <span className="text-shilp-charcoal-600 font-normal">AI Digital Companion</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-shilp-charcoal-900 leading-[1.12] tracking-tight mb-6">
              Your Craft. <br />
              <span className="text-shilp-orange-500">Your Story.</span> <br />
              Your Market.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg md:text-xl text-shilp-charcoal-600 leading-relaxed max-w-2xl mb-8 font-normal">
              ShilpMitra uses inclusive AI to help traditional Indian artisans transform their handmade heritage into professional digital products, reach national and global buyers, and manage orders from creation to doorstep.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="#journey"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-shilp-orange-500 hover:bg-shilp-orange-600 rounded-full shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#sahayak"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-medium text-shilp-charcoal-800 bg-[#FFFEFC]/90 hover:bg-[#FFFEFC] rounded-full border border-warm-border shadow-warm-sm hover:border-shilp-orange-300 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-6 h-6 rounded-full bg-shilp-orange-50 flex items-center justify-center text-shilp-orange-600">
                  <Mic className="w-3.5 h-3.5" />
                </div>
                <span>Meet Sahayak</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-warm-border w-full max-w-xl">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900">
                  10+
                </span>
                <span className="text-xs text-shilp-charcoal-500 mt-0.5">
                  Regional Languages
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-shilp-orange-600">
                  Zero
                </span>
                <span className="text-xs text-shilp-charcoal-500 mt-0.5">
                  Tech Barriers
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900">
                  100%
                </span>
                <span className="text-xs text-shilp-charcoal-500 mt-0.5">
                  Artisan First
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition Column */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
