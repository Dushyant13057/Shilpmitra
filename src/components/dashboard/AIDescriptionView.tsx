"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  RotateCcw,
  Edit3,
  Check,
  Copy,
  Save,
  Tag,
  ShoppingBag,
  ArrowRight,
  Layers,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface AIDescriptionViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

interface StoredEnhancedImage {
  imageId: string;
  originalUrl: string;
  enhancedUrl: string;
  originalFilename: string;
  name?: string;
}

interface GeneratedListing {
  title: string;
  shortDescription: string;
  detailedDescription: string;
  keyFeatures: string[];
  materials: string;
  craftType: string;
  suggestedTags: string[];
}

export default function AIDescriptionView({
  onBackToDashboard,
  onNavigateTab,
}: AIDescriptionViewProps) {
  // Product Information Inputs
  const [productName, setProductName] = useState("Terracotta Floral Decorative Vase");
  const [craftType, setCraftType] = useState("Terracotta & Clay Pottery");
  const [materials, setMaterials] = useState("River Ganges Natural Alluvial Clay, Eco-Friendly Mineral Slip, Rice Husk Fuel");
  const [keyFeaturesInput, setKeyFeaturesInput] = useState(
    "Wheel-thrown by master artisan, Kiln fired at 850°C, Natural porous cooling, Traditional relief carving"
  );
  const [tone, setTone] = useState<"heritage" | "modern" | "luxury">("heritage");

  // Enhanced Image Detection from LocalStorage
  const [enhancedImage, setEnhancedImage] = useState<StoredEnhancedImage | null>(null);
  const [useEnhancedPhoto, setUseEnhancedPhoto] = useState(true);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Generated Result Content
  const [listing, setListing] = useState<GeneratedListing>({
    title: "Handcrafted Heritage Terracotta Vase — Natural Alluvial Clay with Traditional Relief Engravings",
    shortDescription:
      "Sculpted on a traditional potters wheel using pure alluvial river clay, this artisanal vase brings earthy warmth and timeless Indian craft heritage to your home.",
    detailedDescription:
      "Crafted through generational techniques preserved over centuries, this exquisite piece begins with clay harvested along riverbanks, kneaded by hand to remove impurities, and thrown on a stone flywheel. Each floral contour is delicately carved with wooden tools while the clay is leather-hard, before undergoing a slow, smoke-cured open kiln firing. The natural porous texture allows subtle breathing, while the organic mineral slip imparts an authentic burnt-sienna hue that will never fade with time.",
    keyFeatures: [
      "100% Biodegradable and sustainably sourced river clay",
      "Individually hand-turned without electric machinery or synthetic molds",
      "Traditional open-fire smoke curing technique yields unique natural variations",
      "Breathable terracotta surface naturally balances ambient indoor humidity",
      "Signed and authenticated by certified master craft guild",
    ],
    materials: "River Ganges Natural Alluvial Clay, Eco-Friendly Mineral Slip, Rice Husk Fuel",
    craftType: "Terracotta & Clay Pottery",
    suggestedTags: [
      "#HandmadeInIndia",
      "#TerracottaArt",
      "#VocalForLocal",
      "#ArtisanMade",
      "#HeritageCraft",
      "#SustainableLiving",
      "#IndianHandicrafts",
    ],
  });

  // Check for enhanced image on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("shilpmitra_selected_product_image");
      if (stored) {
        const parsed = JSON.parse(stored) as StoredEnhancedImage;
        if (parsed.enhancedUrl || parsed.originalUrl) {
          setEnhancedImage(parsed);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Deterministic local generator
  const generateListing = (variation = false) => {
    setIsGenerating(true);
    setIsSaved(false);

    setTimeout(() => {
      const cleanName = productName.trim() || "Artisan Craft";
      const cleanCraft = craftType.trim() || "Handmade Artisan Craft";
      const cleanMaterials = materials.trim() || "Natural Traditional Materials";

      const variationSuffix = variation ? " (Studio Reserve)" : "";

      const newListing: GeneratedListing = {
        title: variation
          ? `Authentic ${cleanName} — Master-Crafted ${cleanCraft}${variationSuffix}`
          : `Handcrafted ${cleanName} — Traditional ${cleanCraft} with Natural Artisan Finish`,
        shortDescription: variation
          ? `An ode to Indian heritage, this ${cleanName.toLowerCase()} is meticulously shaped using ${cleanMaterials.toLowerCase()}, combining ancestral wisdom with contemporary grace.`
          : `Sculpted on a traditional workshop setup using ${cleanMaterials.toLowerCase()}, this ${cleanName.toLowerCase()} brings earthy warmth and timeless Indian craft heritage to your home.`,
        detailedDescription: variation
          ? `Every contour of this ${cleanName.toLowerCase()} carries the soul of Indian artisan traditions. Formed by seasoned master hands using pure, locally sourced raw elements, the piece undergoes an unhurried, multi-day preparation process. The surface is hand-finished to highlight genuine textures, ensuring that no two creations are identical. Perfect as a timeless centerpiece that honors fair-trade craftsmanship.`
          : `Crafted through generational techniques preserved over centuries, this exquisite piece begins with ${cleanMaterials.toLowerCase()}, kneaded by hand to remove impurities, and meticulously shaped. Each contour is delicately refined with traditional tools, before undergoing artisanal finishing. The natural texture celebrates the authentic identity of ${cleanCraft}, delivering a piece that is both culturally resonant and enduring.`,
        keyFeatures: [
          `100% authentically hand-worked using ${cleanMaterials.toLowerCase()}`,
          "Master craftsman guild authenticated with certified fair-trade living wages",
          "Zero toxic synthetic binders or artificial petrochemical glazes",
          "Naturally heat and age-resistant with rich traditional character",
          "Ideal for heritage home decor, conscious gifting, and collectors",
        ],
        materials: cleanMaterials,
        craftType: cleanCraft,
        suggestedTags: [
          `#${cleanCraft.replace(/[^a-zA-Z0-9]/g, "")}`,
          `#${cleanName.replace(/[^a-zA-Z0-9]/g, "")}`,
          "#HandmadeInIndia",
          "#ArtisanMade",
          "#VocalForLocal",
          "#HeritageCrafts",
          "#EcoFriendlyLiving",
        ],
      };

      setListing(newListing);
      setIsGenerating(false);
      setHasGenerated(true);
      setIsEditing(false);
    }, 600);
  };

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSave = () => {
    setIsSaved(true);
    // Save to localStorage for demo persistence
    try {
      localStorage.setItem("shilpmitra_saved_description", JSON.stringify(listing));
    } catch {
      // Fallback
    }
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              AI TOOLS • CATALOG GENERATOR
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              Demo Active
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            AI Product Description
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Transform your craft materials and techniques into compelling, marketplace-ready catalog listings with SEO keywords.
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

      {/* 2. Success Toast on Save */}
      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Product Listing Saved:</strong> Title, descriptions, and tags have been successfully saved to your active product draft.
            </span>
          </div>
          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab("marketplace")}
              className="text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg shrink-0 transition-colors"
            >
              View in Marketplace →
            </button>
          )}
        </div>
      )}

      {/* 3. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Product Information Form (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-warm-xs">
            <div className="flex items-center justify-between pb-3 border-b border-warm-border/60">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-shilp-orange-600" />
                <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                  Product Details
                </h3>
              </div>
              <span className="text-[11px] text-shilp-charcoal-500 font-medium">Step 1 of 2</span>
            </div>

            {/* Optional Enhanced Image Preview Card */}
            {enhancedImage && (
              <div className="p-3 rounded-2xl bg-shilp-orange-50/60 border border-shilp-orange-200 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-shilp-orange-200 shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={enhancedImage.enhancedUrl || enhancedImage.originalUrl}
                    alt="Enhanced Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-shilp-orange-600" />
                    <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wide">
                      Using Enhanced Studio Photo
                    </span>
                  </div>
                  <p className="text-xs text-shilp-charcoal-600 truncate mt-0.5">
                    {enhancedImage.originalFilename}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setUseEnhancedPhoto(!useEnhancedPhoto)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                    useEnhancedPhoto
                      ? "bg-shilp-orange-500 text-white"
                      : "bg-white text-stone-600 border border-warm-border"
                  }`}
                >
                  {useEnhancedPhoto ? "Active" : "Omit"}
                </button>
              </div>
            )}

            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Royal Blue Terracotta Vase"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Craft Type */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Craft Category
              </label>
              <select
                value={craftType}
                onChange={(e) => setCraftType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              >
                <option value="Terracotta & Clay Pottery">Terracotta & Clay Pottery</option>
                <option value="Handloom Silk & Cotton Weaving">Handloom Silk & Cotton Weaving</option>
                <option value="Brass & Bell Metal Dhokra">Brass & Bell Metal Dhokra</option>
                <option value="Wood Carving & Channapatna">Wood Carving & Channapatna</option>
                <option value="Jaipur Blue Pottery">Jaipur Blue Pottery</option>
                <option value="Madhubani Hand Painting">Madhubani Hand Painting</option>
                <option value="Leather Mojari Craft">Leather Mojari Craft</option>
                <option value="Bidriware Silver Inlay">Bidriware Silver Inlay</option>
              </select>
            </div>

            {/* Materials */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Primary Materials Used
              </label>
              <input
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="e.g. River clay, organic mineral pigments"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Key Features & Technique
              </label>
              <textarea
                rows={3}
                value={keyFeaturesInput}
                onChange={(e) => setKeyFeaturesInput(e.target.value)}
                placeholder="e.g. Wheel-thrown, wood kiln fired, hand-carved motifs"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all resize-none"
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Narrative Tone
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "heritage", label: "Heritage" },
                  { id: "modern", label: "Rustic" },
                  { id: "luxury", label: "Luxury" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTone(item.id as typeof tone)}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                      tone === item.id
                        ? "bg-shilp-orange-50 border-shilp-orange-300 text-shilp-orange-800 shadow-xs"
                        : "border-warm-border bg-white text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              type="button"
              onClick={() => generateListing(false)}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-sm shadow-warm-md hover:shadow-warm-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Listing...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Description</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Generated Product Listing Showcase (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-7 space-y-6 shadow-warm-sm">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900">
                  Generated Product Listing
                </span>
              </div>

              {/* Action Buttons: Regenerate, Edit, Save */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => generateListing(true)}
                  disabled={isGenerating}
                  className="px-3 py-1.5 rounded-lg border border-warm-border hover:bg-stone-50 text-shilp-charcoal-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Generate alternative phrasing"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isEditing
                      ? "bg-shilp-orange-500 text-white"
                      : "border border-warm-border hover:bg-stone-50 text-shilp-charcoal-700"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? "Done Editing" : "Edit"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-warm-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: Product Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-shilp-orange-700 uppercase tracking-wider">
                  SEO PRODUCT TITLE
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(listing.title, "title")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedSection === "title" ? (
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={listing.title}
                  onChange={(e) => setListing({ ...listing, title: e.target.value })}
                  className="w-full p-2.5 text-base font-serif font-bold rounded-xl border border-shilp-orange-300 focus:outline-none bg-shilp-cream-50/50"
                />
              ) : (
                <h2 className="font-serif text-lg sm:text-xl font-bold text-shilp-charcoal-900 leading-snug">
                  {listing.title}
                </h2>
              )}
            </div>

            {/* SECTION 2: Short Description */}
            <div className="space-y-1.5 bg-shilp-cream-50/60 p-4 rounded-2xl border border-warm-border">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-shilp-charcoal-500 uppercase tracking-wider">
                  SHORT OVERVIEW (Search & Marketplace Cards)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(listing.shortDescription, "short")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedSection === "short" ? (
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {isEditing ? (
                <textarea
                  rows={2}
                  value={listing.shortDescription}
                  onChange={(e) => setListing({ ...listing, shortDescription: e.target.value })}
                  className="w-full p-2 text-xs sm:text-sm rounded-lg border border-shilp-orange-300 focus:outline-none bg-white resize-none"
                />
              ) : (
                <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed font-medium">
                  {listing.shortDescription}
                </p>
              )}
            </div>

            {/* SECTION 3: Detailed Artisan Narrative */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-shilp-charcoal-500 uppercase tracking-wider">
                  DETAILED STORY & CRAFT HERITAGE
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(listing.detailedDescription, "detailed")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedSection === "detailed" ? (
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {isEditing ? (
                <textarea
                  rows={5}
                  value={listing.detailedDescription}
                  onChange={(e) => setListing({ ...listing, detailedDescription: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-shilp-orange-300 focus:outline-none bg-shilp-cream-50/50"
                />
              ) : (
                <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed">
                  {listing.detailedDescription}
                </p>
              )}
            </div>

            {/* SECTION 4: Key Features & Specifications */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-shilp-charcoal-500 uppercase tracking-wider block">
                KEY FEATURES & CRAFTSMANSHIP GUARANTEE
              </span>
              <ul className="space-y-2">
                {listing.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-shilp-charcoal-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-shilp-orange-500 shrink-0 mt-1.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECTION 5: Materials & Craft Type Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-shilp-cream-50 border border-warm-border">
                <span className="text-[10px] font-bold text-shilp-charcoal-400 uppercase tracking-wider block">
                  CRAFT CATEGORY
                </span>
                <span className="text-xs font-semibold text-shilp-charcoal-900 mt-0.5 block">
                  {listing.craftType}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-shilp-cream-50 border border-warm-border">
                <span className="text-[10px] font-bold text-shilp-charcoal-400 uppercase tracking-wider block">
                  AUTHENTIC MATERIALS
                </span>
                <span className="text-xs font-semibold text-shilp-charcoal-900 mt-0.5 block truncate" title={listing.materials}>
                  {listing.materials}
                </span>
              </div>
            </div>

            {/* SECTION 6: Suggested SEO & Social Tags */}
            <div className="space-y-2 pt-2 border-t border-warm-border">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-shilp-charcoal-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-shilp-orange-600" />
                  SUGGESTED DISCOVERY TAGS
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(listing.suggestedTags.join(" "), "tags")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedSection === "tags" ? (
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {listing.suggestedTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 font-mono font-medium transition-colors select-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action: Direct Next Step in Workflow */}
            {onNavigateTab && (
              <div className="pt-4 border-t border-warm-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-shilp-charcoal-500">
                  Ready to present this piece to national buyers?
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateTab("marketplace")}
                  className="px-5 py-2.5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-warm-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Preview in Marketplace →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
