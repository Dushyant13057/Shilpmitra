"use client";

import { useEffect } from "react";
import { X, Sparkles, Hammer, Building2, ShoppingBag, Check } from "lucide-react";

export type DemoModalType = "artisan" | "business" | "marketplace" | null;

interface DemoComingSoonModalProps {
  type: DemoModalType;
  onClose: () => void;
}

const modalContent: Record<
  NonNullable<DemoModalType>,
  {
    title: string;
    badge: string;
    icon: React.ElementType;
    description: string;
    points: string[];
    upcomingStatus: string;
  }
> = {
  artisan: {
    title: "Artisan Profile",
    badge: "Phase 2 • Planned Module",
    icon: Hammer,
    description:
      "Tell us more about your craft, skills and experience. This module will allow craftspeople to document their traditional techniques, generational heritage, and master certifications.",
    points: [
      "Traditional craft category & cluster mapping (Handloom, Terracotta, Metal, Wood, etc.)",
      "Generational lineage and years of artisanal master experience",
      "State & National master artisan award verification",
      "Geographical Indication (GI) tag authentication",
    ],
    upcomingStatus:
      "Note: The detailed schema and verification requirements for the Artisan Profile are currently being finalized with state craft guilds. No actual form or database is implemented in this phase.",
  },
  business: {
    title: "Business Profile",
    badge: "Phase 2 • Planned Module",
    icon: Building2,
    description:
      "Add information about your business and workshop. This module will support workshop registration, artisan cooperative details, and production estimates.",
    points: [
      "Workshop location, tooling, and kiln/loom equipment details",
      "Artisan cooperative (SHG) / Family enterprise structure",
      "Monthly handmade production volume and capacity estimates",
      "GST / Udyam / Artisan ID card upload and verification",
    ],
    upcomingStatus:
      "Note: Business and enterprise workflow specifications are under active stakeholder review. Requirements will be finalized before database schema implementation.",
  },
  marketplace: {
    title: "Marketplace",
    badge: "Phase 2 • Planned Module",
    icon: ShoppingBag,
    description:
      "Prepare your products for the digital marketplace. This module will connect your craft to national buyers, government e-marketplace (GeM), and international exhibitions.",
    points: [
      "AI-assisted smartphone product photography enhancement",
      "Multilingual storytelling and cultural narrative generator",
      "Direct-to-buyer fair pricing suggestions based on artisanal effort",
      "One-click listing syndication across digital craft marketplaces",
    ],
    upcomingStatus:
      "Note: Marketplace cataloging and logistics integrations will roll out in the subsequent phase after artisan and business profiles are established.",
  },
};

export default function DemoComingSoonModal({ type, onClose }: DemoComingSoonModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (type) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  const content = modalContent[type];
  const IconComponent = content.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#FFFEFC] rounded-3xl p-6 sm:p-8 shadow-warm-lg border border-warm-border z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-shilp-charcoal-400 hover:text-shilp-charcoal-800 hover:bg-shilp-cream-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/80 flex items-center justify-center text-shilp-orange-600 shadow-warm-sm shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-shilp-orange-700 bg-shilp-orange-50 px-2 py-0.5 rounded-full border border-shilp-orange-200/60 inline-block mb-1">
              {content.badge}
            </span>
            <h3 id="modal-title" className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900 leading-snug">
              {content.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-shilp-charcoal-600 leading-relaxed mb-4">
          {content.description}
        </p>

        {/* Planned Features List */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-shilp-cream-100/80 border border-warm-border/60 mb-4">
          <span className="text-[11px] font-bold text-shilp-charcoal-800 uppercase tracking-wide block mb-2">
            Planned Capabilities for this Section:
          </span>
          <ul className="space-y-1.5 text-xs text-shilp-charcoal-700">
            {content.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-shilp-orange-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notice explaining requirements are not finalized */}
        <div className="p-3 rounded-xl bg-shilp-orange-50/70 border border-shilp-orange-200/50 text-[11px] text-shilp-charcoal-600 leading-relaxed mb-6">
          <span className="font-bold text-shilp-orange-800 flex items-center gap-1 mb-0.5">
            <Sparkles className="w-3 h-3 text-shilp-orange-600" />
            <span>Requirements Finalization in Progress</span>
          </span>
          <p>{content.upcomingStatus}</p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 active:bg-shilp-orange-700 text-white font-semibold text-sm shadow-warm transition-colors text-center"
        >
          Got It, Thanks!
        </button>
      </div>
    </div>
  );
}
