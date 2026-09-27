"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Wand2, Volume2, ShieldCheck, MapPin, Tag } from "lucide-react";

type HeroTab = "craft" | "enhance" | "sahayak";

export default function HeroVisual() {
  const [activeTab, setActiveTab] = useState<HeroTab>("craft");
  const [enhanceToggle, setEnhanceToggle] = useState<"after" | "before">("after");

  return (
    <div
      className="relative w-full max-w-xl mx-auto lg:max-w-none"
      role="region"
      aria-label="Artisan storytelling showcase"
    >
      {/* Subtle traditional motif */}
      <div className="absolute -top-8 -right-8 w-56 h-56 rounded-full border border-shilp-orange-500/10 pointer-events-none" />

      {/* Main Lightweight Stage Container */}
      <div className="relative w-full bg-[#FFFEFC] rounded-3xl shadow-warm border border-warm-border overflow-hidden min-h-[460px] sm:min-h-[490px] flex flex-col justify-between">
        {/* Tab Navigation Header */}
        <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-warm-border/60 flex items-center justify-between gap-2 bg-[#FAF7F0]">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab("craft")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 ${
                activeTab === "craft"
                  ? "bg-shilp-orange-500 text-white shadow-xs"
                  : "bg-white/80 text-shilp-charcoal-700 hover:bg-shilp-orange-50 hover:text-shilp-orange-700 border border-warm-border"
              }`}
            >
              Craft Heritage
            </button>
            <button
              onClick={() => setActiveTab("enhance")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 ${
                activeTab === "enhance"
                  ? "bg-shilp-orange-500 text-white shadow-xs"
                  : "bg-white/80 text-shilp-charcoal-700 hover:bg-shilp-orange-50 hover:text-shilp-orange-700 border border-warm-border"
              }`}
            >
              AI Photography
            </button>
            <button
              onClick={() => setActiveTab("sahayak")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 ${
                activeTab === "sahayak"
                  ? "bg-shilp-orange-500 text-white shadow-xs"
                  : "bg-white/80 text-shilp-charcoal-700 hover:bg-shilp-orange-50 hover:text-shilp-orange-700 border border-warm-border"
              }`}
            >
              Sahayak Voice
            </button>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-shilp-orange-700 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-shilp-orange-500" />
            AI Enabled
          </span>
        </div>

        {/* Visual Scene Area - Fast Static Rendering */}
        <div className="relative flex-1 p-4 sm:p-6 flex items-center justify-center">
          {/* TAB 1: Craft Heritage Listing */}
          {activeTab === "craft" && (
            <div className="w-full max-w-md bg-[#FAF7F0] rounded-2xl border border-warm-border/70 overflow-hidden shadow-warm-sm transition-opacity duration-150">
              <div className="relative h-52 sm:h-56 w-full bg-stone-100">
                <Image
                  src="/images/craft-weaving.jpg"
                  alt="Varanasi Silk Handloom Saree"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#FFFEFC] px-2.5 py-1 rounded-full text-[11px] font-bold text-shilp-orange-700 border border-warm-border shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-shilp-orange-500" />
                  GI Certified Handloom
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                  ₹ 2,499
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900">
                    Pure Silk Banarasi Brocade
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Artisan
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-shilp-charcoal-500">
                  <MapPin className="w-3.5 h-3.5 text-shilp-orange-500 shrink-0" />
                  <span>Lakshmi Devi • Varanasi, Uttar Pradesh</span>
                </div>
                <p className="text-xs text-shilp-charcoal-600 line-clamp-2 leading-relaxed pt-1 border-t border-warm-border/60">
                  Hand-woven on a traditional pit loom with pure mulberry silk yarn and sacred zari kadhwa motifs.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: AI Photography Enhancement */}
          {activeTab === "enhance" && (
            <div className="w-full max-w-md bg-[#FAF7F0] rounded-2xl border border-warm-border/70 p-4 shadow-warm-sm transition-opacity duration-150 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-shilp-charcoal-900 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-shilp-orange-500" />
                  Studio Lighting Transformation
                </span>
                <div className="inline-flex rounded-lg border border-warm-border bg-white p-0.5">
                  <button
                    onClick={() => setEnhanceToggle("before")}
                    className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-colors duration-150 ${
                      enhanceToggle === "before"
                        ? "bg-stone-800 text-white"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    Raw Photo
                  </button>
                  <button
                    onClick={() => setEnhanceToggle("after")}
                    className={`px-2.5 py-0.5 rounded-md text-xs font-semibold transition-colors duration-150 ${
                      enhanceToggle === "after"
                        ? "bg-shilp-orange-500 text-white"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    AI Enhanced
                  </button>
                </div>
              </div>

              <div className="relative h-56 w-full rounded-xl overflow-hidden border border-warm-border bg-stone-100">
                <Image
                  src={enhanceToggle === "after" ? "/images/pot-after.jpg" : "/images/pot-before.jpg"}
                  alt="Craft Enhancement"
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover transition-opacity duration-150"
                />
                <div className="absolute bottom-2 left-2 bg-[#FFFEFC] px-2.5 py-0.5 rounded-full text-[10px] font-bold text-shilp-charcoal-800 border border-warm-border shadow-xs">
                  {enhanceToggle === "after" ? "Studio Background • Warm Lighting" : "Original Smartphone Camera"}
                </div>
              </div>

              <p className="text-[11px] text-shilp-charcoal-500 leading-normal text-center">
                One-tap automated color calibration, texture sharpening, and rustic artisan studio background.
              </p>
            </div>
          )}

          {/* TAB 3: Sahayak Voice Assistant */}
          {activeTab === "sahayak" && (
            <div className="w-full max-w-md bg-[#FAF7F0] rounded-2xl border border-warm-border/70 p-4 shadow-warm-sm transition-opacity duration-150 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-shilp-charcoal-900 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-shilp-orange-500" />
                  Sahayak Voice Co-Pilot
                </span>
                <span className="bg-shilp-orange-50 text-shilp-orange-700 font-semibold px-2 py-0.5 rounded-full text-[10px] border border-shilp-orange-200">
                  Hindi • हिंदी
                </span>
              </div>

              <div className="space-y-2.5 py-1">
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-warm-border text-xs text-shilp-charcoal-800 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-shilp-orange-600">
                    <Sparkles className="w-3 h-3" /> Sahayak Assistant
                  </div>
                  <p className="leading-relaxed">
                    &ldquo;नमस्ते रमेश जी! आपके लकड़ी के फूलदान का एक नया ऑर्डर आया है। क्या स्टॉक तैयार है?&rdquo;
                  </p>
                </div>

                <div className="bg-shilp-orange-50 p-3 rounded-2xl rounded-tr-sm border border-shilp-orange-200 text-xs text-shilp-charcoal-800 ml-6 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-shilp-charcoal-600">
                    Artisan Voice Response
                  </div>
                  <p className="leading-relaxed font-serif italic text-shilp-charcoal-900">
                    &ldquo;हाँ, 5 पीस तैयार हैं। कल सुबह तक पार्सल भेज दूंगा।&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-warm-border/60 text-[11px] text-shilp-charcoal-500">
                <span>Hands-free voice recognition</span>
                <span className="font-semibold text-emerald-700">Order Updated</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Guarantee Strip */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#FAF7F0] border-t border-warm-border flex items-center justify-between text-xs text-shilp-charcoal-600">
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-shilp-orange-500" />
            <span className="font-medium">Direct to Artisan • 0% Platform Fee</span>
          </div>
          <span className="font-semibold text-shilp-orange-600 text-[11px]">Craft to Customer</span>
        </div>
      </div>
    </div>
  );
}
