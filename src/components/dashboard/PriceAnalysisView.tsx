"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Volume2,
} from "lucide-react";
import { DashboardTab } from "@/types";
import { speakText, stopSpeaking } from "@/lib/utils/speechUtils";

interface PriceAnalysisViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

export default function PriceAnalysisView({
  onBackToDashboard,
  onNavigateTab,
}: PriceAnalysisViewProps) {
  // Inputs
  const [productType, setProductType] = useState("Terracotta Floral Decorative Vase");
  const [materialCost, setMaterialCost] = useState<number>(180);
  const [labourCost, setLabourCost] = useState<number>(320);
  const [otherCost, setOtherCost] = useState<number>(100);
  const [desiredMargin, setDesiredMargin] = useState<number>(35); // in %

  // Sync with active draft and speak voice instruction on mount
  useEffect(() => {
    try {
      const activeDraftStr = localStorage.getItem("shilpmitra_active_product_draft");
      if (activeDraftStr) {
        const draftObj = JSON.parse(activeDraftStr);
        if (draftObj.title) {
          setProductType(draftObj.title);
        }
      }
    } catch {
      // ignore
    }

    const timer = setTimeout(() => {
      speakText(
        "नमस्ते! चलिए आपके प्रोडक्ट का सही और उचित मूल्य तय करते हैं। कच्चा माल, कारीगरी मेहनत, और अन्य खर्च दर्ज करें या सुझाई गई कीमत की पुष्टि करें।",
        "Hindi"
      );
    }, 500);

    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
  }, []);

  // Feedback states
  const [savedNotice, setSavedNotice] = useState(false);

  // Calculations
  const totalCost = Math.max(0, materialCost + labourCost + otherCost);
  // Formula: Suggested Price based on cost plus desired margin %
  const suggestedPrice = Math.round(totalCost * (1 + desiredMargin / 100));
  const estimatedMargin = Math.max(0, suggestedPrice - totalCost);

  // Percentages for breakdown bar
  const materialPct = totalCost > 0 ? Math.round((materialCost / suggestedPrice) * 100) : 0;
  const labourPct = totalCost > 0 ? Math.round((labourCost / suggestedPrice) * 100) : 0;
  const otherPct = totalCost > 0 ? Math.round((otherCost / suggestedPrice) * 100) : 0;
  const marginPct = Math.max(0, 100 - (materialPct + labourPct + otherPct));

  // Quick preset loader
  const loadPreset = (preset: "terracotta" | "saree" | "wood" | "brass") => {
    if (preset === "terracotta") {
      setProductType("Terracotta Floral Decorative Vase");
      setMaterialCost(180);
      setLabourCost(320);
      setOtherCost(100);
      setDesiredMargin(35);
    } else if (preset === "saree") {
      setProductType("Handwoven Mulberry Silk Saree");
      setMaterialCost(1400);
      setLabourCost(1800);
      setOtherCost(350);
      setDesiredMargin(40);
    } else if (preset === "wood") {
      setProductType("Hand-Carved Teakwood Keepsake Box");
      setMaterialCost(350);
      setLabourCost(550);
      setOtherCost(120);
      setDesiredMargin(30);
    } else if (preset === "brass") {
      setProductType("Dhokra Lost-Wax Bell Metal Figurine");
      setMaterialCost(480);
      setLabourCost(720);
      setOtherCost(150);
      setDesiredMargin(45);
    }
  };

  const handleApplyPrice = () => {
    setSavedNotice(true);
    try {
      localStorage.setItem(
        "shilpmitra_analyzed_price",
        JSON.stringify({
          productType,
          totalCost,
          suggestedPrice,
          estimatedMargin,
          desiredMargin,
          appliedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Fallback
    }
    setTimeout(() => setSavedNotice(false), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              AI TOOLS • FAIR TRADE VALUATION
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              Fair Trade Calculator
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Handicraft Price Analysis
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Ensure your intricate artisanal labor and materials are fairly compensated while maintaining competitive market pricing.
          </p>
        </div>

        {onBackToDashboard && (
          <button
            type="button"
            onClick={onBackToDashboard}
            className="self-start sm:self-auto px-3.5 py-2 text-xs font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-700 bg-white border border-warm-border rounded-xl hover:bg-shilp-cream-50 transition-colors"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      {/* 1b. Sahayak Voice Guidance Prompt Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-shilp-orange-500 text-white flex items-center justify-center shrink-0 shadow-warm-xs">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wide">
              सहायक प्राइस गाइडेंस (Fair Valuation)
            </span>
            <p className="text-xs sm:text-sm font-medium text-shilp-charcoal-900 mt-0.5">
              &quot;नमस्ते! चलिए आपके प्रोडक्ट का सही और उचित मूल्य तय करते हैं। कच्चा माल, कारीगरी मेहनत, और अन्य खर्च दर्ज करें या सुझाई गई कीमत की पुष्टि करें।&quot;
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            speakText(
              "नमस्ते! चलिए आपके प्रोडक्ट का सही और उचित मूल्य तय करते हैं। कच्चा माल, कारीगरी मेहनत, और अन्य खर्च दर्ज करें या सुझाई गई कीमत की पुष्टि करें।",
              "Hindi"
            );
          }}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-orange-300 text-shilp-orange-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>निर्देश फिर से सुनें</span>
        </button>
      </div>

      {/* 2. Success Alert */}
      {savedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Price Applied:</strong> Selling price of ₹{suggestedPrice} with {desiredMargin}% profit margin has been recorded for your catalog.
            </span>
          </div>
          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab("products")}
              className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg shrink-0 transition-colors"
            >
              View in Products →
            </button>
          )}
        </div>
      )}

      {/* 3. Preset Quick Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-shilp-charcoal-500 font-semibold text-[11px] uppercase tracking-wide shrink-0">
          Load Sample:
        </span>
        <button
          type="button"
          onClick={() => loadPreset("terracotta")}
          className="px-3 py-1 rounded-lg bg-shilp-cream-100 hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 font-medium border border-warm-border transition-colors shrink-0"
        >
          🏺 Terracotta Vase
        </button>
        <button
          type="button"
          onClick={() => loadPreset("saree")}
          className="px-3 py-1 rounded-lg bg-shilp-cream-100 hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 font-medium border border-warm-border transition-colors shrink-0"
        >
          🧵 Silk Saree
        </button>
        <button
          type="button"
          onClick={() => loadPreset("wood")}
          className="px-3 py-1 rounded-lg bg-shilp-cream-100 hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 font-medium border border-warm-border transition-colors shrink-0"
        >
          🪵 Carved Wood Box
        </button>
        <button
          type="button"
          onClick={() => loadPreset("brass")}
          className="px-3 py-1 rounded-lg bg-shilp-cream-100 hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 font-medium border border-warm-border transition-colors shrink-0"
        >
          🪙 Dhokra Brass Idol
        </button>
      </div>

      {/* 4. Two-Column Layout: Inputs (Left) and Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Cost Variables (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-warm-border/60">
              <Calculator className="w-4 h-4 text-shilp-orange-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Cost & Margin Inputs
              </h3>
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Product Type / Craft Name
              </label>
              <input
                type="text"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Raw Material Cost */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-shilp-charcoal-700">
                  Raw Material Cost (₹)
                </label>
                <span className="text-[11px] text-shilp-charcoal-400">Clay, Yarn, Pigments, Wood</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 font-bold transition-all"
                />
              </div>
            </div>

            {/* Labour Cost */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-shilp-charcoal-700">
                  Artisan Handwork & Labour (₹)
                </label>
                <span className="text-[11px] text-shilp-charcoal-400">Fair living wage hours</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  value={labourCost}
                  onChange={(e) => setLabourCost(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 font-bold transition-all"
                />
              </div>
            </div>

            {/* Other Cost */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-shilp-charcoal-700">
                  Packaging, Kiln & Overheads (₹)
                </label>
                <span className="text-[11px] text-shilp-charcoal-400">Bubble wrap, fuel, transport</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  value={otherCost}
                  onChange={(e) => setOtherCost(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 font-bold transition-all"
                />
              </div>
            </div>

            {/* Desired Margin Slider */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-shilp-charcoal-700">
                  Desired Profit Margin
                </label>
                <span className="text-xs font-bold text-shilp-orange-600 bg-shilp-orange-50 px-2 py-0.5 rounded-md border border-shilp-orange-200">
                  {desiredMargin}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={70}
                step={5}
                value={desiredMargin}
                onChange={(e) => setDesiredMargin(Number(e.target.value))}
                className="w-full accent-shilp-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>10% (Volume/Wholesale)</span>
                <span>35% (Fair Retail)</span>
                <span>70% (Luxury/Export)</span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={handleApplyPrice}
              className="w-full py-3 px-4 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-sm shadow-warm-md hover:shadow-warm-lg flex items-center justify-center gap-2 transition-all mt-4"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Price to Product</span>
            </button>
          </div>
        </div>

        {/* Right Output: Calculation & Visual Valuation (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Pricing Cards */}
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-7 space-y-6 shadow-warm-sm">
            <div className="flex items-center justify-between pb-3 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900">
                  Pricing Breakdown & Valuation
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Fair Trade Certified
              </span>
            </div>

            {/* 3 Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Total Cost */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-warm-border space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide block">
                  Total Production Cost
                </span>
                <span className="font-serif text-2xl font-bold text-stone-900 block">
                  ₹{totalCost}
                </span>
                <span className="text-[10px] text-stone-500">Materials + Labour + Overhead</span>
              </div>

              {/* Suggested Selling Price */}
              <div className="p-4 rounded-2xl bg-shilp-orange-50/80 border-2 border-shilp-orange-300 space-y-1 shadow-warm-xs">
                <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wide block">
                  Suggested Selling Price
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-shilp-orange-600 block">
                  ₹{suggestedPrice}
                </span>
                <span className="text-[10px] text-shilp-orange-700 font-medium">
                  Includes {desiredMargin}% Artisan Margin
                </span>
              </div>

              {/* Estimated Net Margin */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block">
                  Estimated Margin
                </span>
                <span className="font-serif text-2xl font-bold text-emerald-700 block">
                  ₹{estimatedMargin}
                </span>
                <span className="text-[10px] text-emerald-700">Net artisan income per unit</span>
              </div>
            </div>

            {/* Visual Color-Coded Breakdown Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-shilp-charcoal-700">
                <span className="flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5 text-shilp-orange-600" />
                  Cost Distribution (% of Final Price)
                </span>
                <span>100% Total</span>
              </div>

              {/* Multi-segment progress bar */}
              <div className="h-5 w-full rounded-xl overflow-hidden flex bg-stone-100 p-0.5 border border-warm-border">
                <div
                  style={{ width: `${materialPct}%` }}
                  title={`Materials: ${materialPct}%`}
                  className="bg-amber-500 h-full rounded-l-lg transition-all duration-300"
                />
                <div
                  style={{ width: `${labourPct}%` }}
                  title={`Artisan Labour: ${labourPct}%`}
                  className="bg-blue-600 h-full transition-all duration-300"
                />
                <div
                  style={{ width: `${otherPct}%` }}
                  title={`Overhead: ${otherPct}%`}
                  className="bg-stone-400 h-full transition-all duration-300"
                />
                <div
                  style={{ width: `${marginPct}%` }}
                  title={`Net Margin: ${marginPct}%`}
                  className="bg-emerald-500 h-full rounded-r-lg transition-all duration-300"
                />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span>Materials ({materialPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span>Labour ({labourPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-400 shrink-0" />
                  <span>Overheads ({otherPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Profit Margin ({marginPct}%)</span>
                </div>
              </div>
            </div>

            {/* Simple Required Explanation Banner */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1">
                <strong className="block font-semibold">Fair Price Methodology</strong>
                <p>Suggested price is based on your entered costs and desired margin.</p>
                <p className="text-[11px] text-amber-800">
                  This transparent calculation ensures that raw material investments are recovered, your intricate handcraft hours receive fair living compensation, and your workshop earns sustainable surplus to invest in new craft batches.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-warm-border">
              <span className="text-xs text-shilp-charcoal-500">
                Ready to review orders with this pricing?
              </span>
              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => {
                    handleApplyPrice();
                    speakText(
                      "बधाई हो! आपका प्रोडक्ट सफलतापूर्वक मार्केटप्लेस पर लाइव लिस्ट हो गया है।",
                      "Hindi"
                    );
                    onNavigateTab("marketplace");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-warm-xs"
                >
                  <span>Publish to Marketplace →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
