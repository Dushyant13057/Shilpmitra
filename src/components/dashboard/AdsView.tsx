"use client";

import { useState } from "react";
import {
  Megaphone,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Share2,
  Users,
  Smartphone,
  Eye,
  CheckCircle2,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface AdsViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

interface GeneratedAd {
  headline: string;
  adCopy: string;
  socialCaption: string;
  cta: string;
  suggestedAudience: string;
  suggestedPlatforms: string[];
}

export default function AdsView({ onBackToDashboard, onNavigateTab }: AdsViewProps) {
  // Product Selector
  const [selectedProduct, setSelectedProduct] = useState("Terracotta Floral Decorative Vase");
  const [campaignGoal, setCampaignGoal] = useState("Festival Season & Home Decor");
  const [targetCity, setTargetCity] = useState("Delhi NCR, Bengaluru, Mumbai");

  // States
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generated Ad Content
  const [ad, setAd] = useState<GeneratedAd>({
    headline: "Bring 400 Years of Indian Clay Heritage into Your Living Room",
    adCopy:
      "Tired of generic mass-produced decor? This pure terracotta vase is individually wheel-thrown and wood-fired by master craftsmen in West Bengal. Naturally porous, eco-friendly, and carrying an authentic earthy aroma, it turns any modern corner into a warm cultural sanctuary. Support genuine Indian artisans directly with zero middlemen markups.",
    socialCaption:
      "When clay meets ancestral fire, magic happens. 🏺✨ Handcrafted with love by certified master artisans. Click below to bring authentic heritage home today! Free shipping across India. 🇮🇳 #ShilpMitra #VocalForLocal #IndianCrafts #TerracottaArt",
    cta: "Shop Authentic Craft Direct",
    suggestedAudience:
      "Home Decor Enthusiasts, Eco-Friendly Living, Age 26–52, Urban Metro & Tier-1 Cities, Interest in Indian Handicrafts & Sustainable Fashion",
    suggestedPlatforms: [
      "Instagram Feed & Reels",
      "Facebook Handicraft Communities",
      "WhatsApp Business Catalog",
      "Google Search & Shopping",
    ],
  });

  const generateAd = (variation = false) => {
    setIsGenerating(true);

    setTimeout(() => {
      if (variation) {
        setAd({
          headline: `Slow-Crafted Perfection: The ${selectedProduct} You Won't Find in Malls`,
          adCopy: `Celebrate timeless Indian handiwork. Every contour of our ${selectedProduct.toLowerCase()} is formed through days of patient craftsmanship. Zero synthetic glazes, 100% fair living wages for rural artisans. Transform your gifting or home sanctuary with verified artisan authenticity.`,
          socialCaption: `Handmade has a soul that machines can never touch. 💫 Elevate your space with this limited artisan reserve ${selectedProduct.toLowerCase()}. Tap now to order before the current batch sells out! 📦🏺 #ShilpMitra #HandcraftedLuxury #IndianArtisans`,
          cta: "Claim Your Handcrafted Piece",
          suggestedAudience: `Conscious Shoppers, Architects & Interior Designers, Age 28–58, Metro areas (${targetCity}), Affinity for GI-tagged traditional goods`,
          suggestedPlatforms: [
            "Instagram Story Ads",
            "Facebook Lifestyle Ads",
            "Pinterest Home Decor",
            "WhatsApp Status Broadcast",
          ],
        });
      } else {
        setAd({
          headline: `Bring 400 Years of Indian Heritage into Your Space with ${selectedProduct}`,
          adCopy: `Tired of generic mass-produced decor? This authentic ${selectedProduct.toLowerCase()} is individually shaped and cured by master craftsmen. Naturally sustainable and carrying generational character, it connects modern homes to India's finest craft roots.`,
          socialCaption: `Real craft. Real artisans. Real heritage. 🏺✨ Support fair-trade master craftsmen with our direct-to-artisan ${selectedProduct.toLowerCase()}. Free nationwide delivery! #ShilpMitra #VocalForLocal #ArtisanDirect`,
          cta: "Shop Authentic Craft Direct",
          suggestedAudience: `Home Decor Enthusiasts, Eco-Friendly Living, Age 26–52, Urban Metro & Tier-1 Cities (${targetCity}), Interest in Indian Handicrafts`,
          suggestedPlatforms: [
            "Instagram Feed & Reels",
            "Facebook Handicraft Communities",
            "WhatsApp Business Catalog",
            "Google Search & Shopping",
          ],
        });
      }
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              COMMERCE • DIGITAL MARKETING
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              Demo Active
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Artisan Ads & Social Promotions
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Generate high-converting digital advertising campaigns, social media captions, and targeted audience profiles for your handmade products.
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

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-warm-border/60">
              <Megaphone className="w-4 h-4 text-shilp-orange-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Campaign Parameters
              </h3>
            </div>

            {/* Select Product */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Select Product to Promote
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              >
                <option value="Terracotta Floral Decorative Vase">Terracotta Floral Decorative Vase</option>
                <option value="Handcrafted Teakwood Keepsake Box">Handcrafted Teakwood Keepsake Box</option>
                <option value="Organic Handwoven Artisan Bag">Organic Handwoven Artisan Bag</option>
                <option value="Dhokra Brass Bell Metal Figurine">Dhokra Brass Bell Metal Figurine</option>
                <option value="Handloom Mulberry Silk Saree">Handloom Mulberry Silk Saree</option>
              </select>
            </div>

            {/* Campaign Objective */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Campaign Goal
              </label>
              <select
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              >
                <option value="Festival Season & Home Decor">Festival Season & Home Decor</option>
                <option value="Direct Artisan Storytelling">Direct Artisan Storytelling</option>
                <option value="Local Craft Exhibition Booking">Local Craft Exhibition Booking</option>
                <option value="Corporate & Wedding Gifting">Corporate & Wedding Gifting</option>
              </select>
            </div>

            {/* Target Cities */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Target Regions & Cities
              </label>
              <input
                type="text"
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                placeholder="e.g. Delhi, Mumbai, Bengaluru"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Generate Action Button */}
            <button
              type="button"
              onClick={() => generateAd(false)}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-sm shadow-warm-md hover:shadow-warm-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Drafting Ad Creative...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Ad</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output: Creative Ad Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-7 space-y-6 shadow-warm-sm">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900">
                  Ad Campaign Copy
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => generateAd(true)}
                  disabled={isGenerating}
                  className="px-3 py-1.5 rounded-lg border border-warm-border hover:bg-stone-50 text-shilp-charcoal-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `${ad.headline}\n\n${ad.adCopy}\n\n${ad.socialCaption}\n\nCTA: ${ad.cta}`,
                      "all"
                    )
                  }
                  className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-warm-xs"
                >
                  {copiedKey === "all" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 1. Ad Headline */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-shilp-orange-700 uppercase tracking-wider">
                  AD HEADLINE
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(ad.headline, "headline")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedKey === "headline" ? (
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <h2 className="font-serif text-lg font-bold text-shilp-charcoal-900 leading-snug">
                {ad.headline}
              </h2>
            </div>

            {/* 2. Ad Copy */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-shilp-charcoal-500 uppercase tracking-wider">
                  PRIMARY AD COPY
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(ad.adCopy, "copy")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedKey === "copy" ? (
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed bg-shilp-cream-50/70 p-3.5 rounded-2xl border border-warm-border">
                {ad.adCopy}
              </p>
            </div>

            {/* 3. Short Social Caption */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-shilp-charcoal-500 uppercase tracking-wider">
                  SHORT SOCIAL CAPTION (Instagram / WhatsApp)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(ad.socialCaption, "caption")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedKey === "caption" ? (
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
              <p className="text-xs text-shilp-charcoal-800 whitespace-pre-line leading-relaxed font-mono bg-stone-50 p-3 rounded-2xl border border-warm-border">
                {ad.socialCaption}
              </p>
            </div>

            {/* 4. CTA Button Preview */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">
                  RECOMMENDED CALL TO ACTION
                </span>
                <span className="text-xs font-bold text-amber-950 mt-0.5 block">{ad.cta}</span>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 bg-shilp-orange-500 text-white rounded-lg text-xs font-semibold shadow-warm-xs"
              >
                {ad.cta}
              </button>
            </div>

            {/* 5. Audience & Platforms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-warm-border space-y-1">
                <div className="flex items-center gap-1.5 text-shilp-charcoal-700">
                  <Users className="w-3.5 h-3.5 text-shilp-orange-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Target Audience
                  </span>
                </div>
                <p className="text-xs text-shilp-charcoal-600 leading-relaxed">
                  {ad.suggestedAudience}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-warm-border space-y-1">
                <div className="flex items-center gap-1.5 text-shilp-charcoal-700">
                  <Smartphone className="w-3.5 h-3.5 text-shilp-orange-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Recommended Channels
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ad.suggestedPlatforms.map((plat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border border-warm-border text-stone-700"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
