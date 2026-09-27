"use client";

import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  RotateCcw,
  Edit3,
  Save,
  Copy,
  Check,
  CheckCircle2,
  Share2,
  Heart,
  Compass,
  Award,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface StoryGeneratorViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

interface GeneratedStory {
  craftStory: string;
  artisanStory: string;
  socialMediaVersion: string;
}

export default function StoryGeneratorView({
  onBackToDashboard,
  onNavigateTab,
}: StoryGeneratorViewProps) {
  // Inputs
  const [artisanName, setArtisanName] = useState("Rameshwar Kumbhakar");
  const [craftType, setCraftType] = useState("Terracotta Pottery & Relief Art");
  const [materials, setMaterials] = useState("River Ganges Alluvial Clay, Rice Husk, Mineral Pigments");
  const [location, setLocation] = useState("Bishnupur, Bankura District, West Bengal");
  const [artisanDesc, setArtisanDesc] = useState(
    "3rd generation potter continuing a 40-year ancestral workshop tradition learned from his late grandfather."
  );

  // States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generated Story Content
  const [story, setStory] = useState<GeneratedStory>({
    craftStory:
      "Deep in the red-soil heartlands of Bankura, terracotta is far more than shaped clay — it is an uninterrupted cultural hymn that dates back to 17th-century terracotta temples. The craft relies on patient harmony with natural cycles: clay dredged during pre-monsoon river flows, sieved through muslin cloths, kneaded with bare heels, and turned on a balanced flywheel. The signature deep burnt-ochre hue is born within wood-fired pit kilns where rice husk smoke imbues every surface with organic warmth that no industrial chemical glaze can ever replicate.",
    artisanStory:
      "For Rameshwar Kumbhakar, the pottery wheel has spun alongside the rhythm of his entire life. Taught at the age of nine by his grandfather under the shade of a neem tree, Rameshwar learned that terracotta requires conversation rather than force. 'The clay tells you when it is ready to rise,' he often reflects. Over four decades of devotion, his hands have preserved traditional temple relief motifs while training over fifteen young village apprentices, ensuring that this sacred craft remains an enduring livelihood for future generations.",
    socialMediaVersion:
      "Behind every curve of this terracotta piece is 40 years of patience, river clay, and ancestral fire. 🔥🏺\n\nMeet Rameshwar Kumbhakar from Bishnupur, where master craftsmen have kept the flame of Indian temple pottery burning for generations. When you bring this piece home, you don't just decorate a shelf — you sustain a living legacy.\n\n✨ 100% Handcrafted • Sustainable Clay • Direct Artisan Guild\n\n#ShilpMitra #TerracottaCraft #IndianArtisans #BishnupurPottery #VocalForLocal #HandmadeWithLove #HeritageIndia",
  });

  const generateStories = (alternate = false) => {
    setIsGenerating(true);
    setIsSaved(false);

    setTimeout(() => {
      const name = artisanName.trim() || "Artisan";
      const craft = craftType.trim() || "Handmade Craft";
      const loc = location.trim() || "India";
      const mat = materials.trim() || "Natural materials";

      if (alternate) {
        setStory({
          craftStory: `Centuries of artistic intuition are sealed within every millimeter of ${craft}. Originating from the cultural soil of ${loc}, this technique embodies an unhurried devotion to slow crafting. Using only ${mat.toLowerCase()}, artisans align their process with nature's rhythm. From raw harvest to final wood-fired curing, each phase celebrates raw human touch over automated perfection.`,
          artisanStory: `In an era of fleeting mass production, ${name} stands steadfast as a guardian of cultural continuity. Working from their workshop in ${loc}, ${name} practices techniques honed across decades. Every curve and textured impression reflects countless hours of quiet focus at dawn, transforming humble ${mat.toLowerCase()} into heirlooms infused with identity, dignity, and generational pride.`,
          socialMediaVersion: `Crafted by hand. Rooted in history. Honored by time. 🌿\n\n${name} transforms ${mat.toLowerCase()} into timeless ${craft.toLowerCase()} in ${loc}. Each piece represents weeks of dedicated mastery.\n\nOwn a genuine piece of Indian heritage directly from the artisan's hands.\n\n#ShilpMitra #${craft.replace(/[^a-zA-Z0-9]/g, "")} #SupportArtisans #HandmadeInIndia #ArtisanStories`,
        });
      } else {
        setStory({
          craftStory: `Deep in the cultural heartland of ${loc}, ${craft} is more than a livelihood — it is an unbroken heritage lineage. The craft relies on patient harmony with traditional elements: ${mat.toLowerCase()} prepared without chemical stabilizers, shaped with ancestral wisdom, and naturally cured. The organic texture carries the authentic identity of India's artisan guilds.`,
          artisanStory: `For ${name}, practicing ${craft} in ${loc} is a sacred calling. Shaped by years of dedicated practice and inspired by generational teachers, ${name} brings an artisan's quiet devotion to every creation. 'Our craft connects our ancestors' memory to modern homes,' ${name} shares. Each piece produced is a testament to perseverance, fair trade, and cultural resilience.`,
          socialMediaVersion: `Behind every handcrafted piece is a story of patience, heritage, and human soul. 💫\n\nMeet ${name} from ${loc}, preserving the timeless tradition of ${craft.toLowerCase()} using ${mat.toLowerCase()}.\n\nSupport genuine handmade craftsmanship.\n\n#ShilpMitra #${craft.replace(/[^a-zA-Z0-9]/g, "")} #VocalForLocal #LivingHeritage #IndianArtisans`,
        });
      }

      setIsGenerating(false);
      setIsEditing(false);
    }, 600);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    setIsSaved(true);
    try {
      localStorage.setItem("shilpmitra_saved_story", JSON.stringify(story));
    } catch {
      // Fallback
    }
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              AI TOOLS • HERITAGE NARRATIVE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              Demo Active
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Artisan & Craft Story Generator
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Weave your family lineage, traditional technique, and cultural heritage into captivating narratives that build deep emotional connection with buyers.
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

      {/* 2. Success Alert */}
      {isSaved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Story Saved:</strong> Your craft narrative has been saved to your artisan profile and product storytelling archive.
            </span>
          </div>
        </div>
      )}

      {/* 3. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-warm-border/60">
              <Compass className="w-4 h-4 text-shilp-orange-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Heritage Story Inputs
              </h3>
            </div>

            {/* Artisan Name */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Artisan / Workshop Name
              </label>
              <input
                type="text"
                value={artisanName}
                onChange={(e) => setArtisanName(e.target.value)}
                placeholder="e.g. Rameshwar Kumbhakar"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Craft Type */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Craft Tradition
              </label>
              <input
                type="text"
                value={craftType}
                onChange={(e) => setCraftType(e.target.value)}
                placeholder="e.g. Terracotta Pottery, Handloom Weaving"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Artisan Region / Workshop Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bishnupur, Bankura, West Bengal"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Materials */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Natural Materials Used
              </label>
              <input
                type="text"
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="e.g. River clay, rice husk, natural mineral pigments"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
              />
            </div>

            {/* Optional Short Artisan Description */}
            <div>
              <label className="block text-xs font-semibold text-shilp-charcoal-700 mb-1.5">
                Artisan Lineage & Background Notes
              </label>
              <textarea
                rows={3}
                value={artisanDesc}
                onChange={(e) => setArtisanDesc(e.target.value)}
                placeholder="e.g. 3rd generation potter continuing ancestral technique taught by grandfather"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={() => generateStories(false)}
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-sm shadow-warm-md hover:shadow-warm-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Weaving Artisan Story...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Story</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output Display (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-7 space-y-6 shadow-warm-sm">
            {/* Top Bar with Regenerate, Edit, Save */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900">
                  Curated Narratives
                </span>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => generateStories(true)}
                  disabled={isGenerating}
                  className="px-3 py-1.5 rounded-lg border border-warm-border hover:bg-stone-50 text-shilp-charcoal-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Generate alternative perspective"
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

            {/* 1. Craft Story */}
            <div className="space-y-2 p-4 rounded-2xl bg-shilp-cream-50/70 border border-warm-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-shilp-orange-600" />
                  <span className="text-xs font-bold text-shilp-charcoal-900 uppercase tracking-wide">
                    1. The Craft Story (Heritage & Technique)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(story.craftStory, "craft")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedKey === "craft" ? (
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
                  rows={4}
                  value={story.craftStory}
                  onChange={(e) => setStory({ ...story, craftStory: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-shilp-orange-300 focus:outline-none bg-white"
                />
              ) : (
                <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed font-serif">
                  {story.craftStory}
                </p>
              )}
            </div>

            {/* 2. Artisan Story */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#FFFEFC] border border-warm-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold text-shilp-charcoal-900 uppercase tracking-wide">
                    2. The Artisan Story (Human Journey & Dedication)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(story.artisanStory, "artisan")}
                  className="text-stone-400 hover:text-stone-700 text-xs flex items-center gap-1"
                >
                  {copiedKey === "artisan" ? (
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
                  rows={4}
                  value={story.artisanStory}
                  onChange={(e) => setStory({ ...story, artisanStory: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-shilp-orange-300 focus:outline-none bg-shilp-cream-50/50"
                />
              ) : (
                <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed">
                  {story.artisanStory}
                </p>
              )}
            </div>

            {/* 3. Short Social Media Version */}
            <div className="space-y-2 p-4 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-shilp-orange-400" />
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wide">
                    3. Short Social Media Version (Instagram / WhatsApp)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(story.socialMediaVersion, "social")}
                  className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1"
                >
                  {copiedKey === "social" ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {isEditing ? (
                <textarea
                  rows={4}
                  value={story.socialMediaVersion}
                  onChange={(e) => setStory({ ...story, socialMediaVersion: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl bg-stone-800 text-stone-100 border border-stone-700 focus:outline-none"
                />
              ) : (
                <p className="text-xs text-stone-300 whitespace-pre-line leading-relaxed font-mono">
                  {story.socialMediaVersion}
                </p>
              )}
            </div>

            {/* Quick Navigation Action */}
            {onNavigateTab && (
              <div className="pt-2 flex items-center justify-between text-xs text-shilp-charcoal-500">
                <span>Want to run social ads with this story?</span>
                <button
                  type="button"
                  onClick={() => onNavigateTab("ads")}
                  className="font-semibold text-shilp-orange-600 hover:text-shilp-orange-700 hover:underline flex items-center gap-1"
                >
                  <span>Create Ad Campaign →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
