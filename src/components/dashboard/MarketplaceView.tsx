"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  CheckCircle2,
  Globe,
  Share2,
  ExternalLink,
  Tag,
  ArrowRight,
  Sparkles,
  Eye,
  SlidersHorizontal,
  X,
  ShieldCheck,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface MarketplaceViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

interface MarketplaceProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  priceFormatted: string;
  description: string;
  imageUrl: string;
  status: "Draft" | "Ready to Publish" | "Live on Marketplace";
  ondcStatus: "Pending" | "Ready" | "Verified";
  views: number;
  stock: number;
}

export default function MarketplaceView({
  onBackToDashboard,
  onNavigateTab,
}: MarketplaceViewProps) {
  const [filter, setFilter] = useState<"all" | "live" | "draft">("all");
  const [publishMessage, setPublishMessage] = useState<string | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<MarketplaceProduct | null>(null);

  // Initial marketplace catalog
  const [products, setProducts] = useState<MarketplaceProduct[]>([
    {
      id: "mkt-1",
      title: "Handcrafted Heritage Terracotta Floral Vase",
      category: "Clay Craft",
      price: 850,
      priceFormatted: "₹850",
      description:
        "Sculpted on a traditional potters flywheel using pure river Ganges alluvial clay. Naturally porous with authentic kiln smoke finish.",
      imageUrl: "/images/terracotta-craft.jpg",
      status: "Ready to Publish",
      ondcStatus: "Ready",
      views: 142,
      stock: 24,
    },
    {
      id: "mkt-2",
      title: "Master Hand-Carved Teakwood Decorative Keepsake",
      category: "Wood Carving",
      price: 1200,
      priceFormatted: "₹1,200",
      description:
        "Sustainably harvested seasoned teakwood hand-chiseled with traditional Indian floral relief motifs. Finished with organic beeswax polish.",
      imageUrl: "/images/wood-handicraft.jpg",
      status: "Live on Marketplace",
      ondcStatus: "Verified",
      views: 298,
      stock: 15,
    },
    {
      id: "mkt-3",
      title: "Natural Organic Handwoven Artisan Tote Bag",
      category: "Handloom",
      price: 950,
      priceFormatted: "₹950",
      description:
        "Woven on traditional pit looms using organic indigenous cotton fibers and natural indigo/turmeric herbal dyes.",
      imageUrl: "/images/craft-weaving.jpg",
      status: "Ready to Publish",
      ondcStatus: "Ready",
      views: 89,
      stock: 10,
    },
  ]);

  // Check for newly enhanced image, description, or listed marketplace products in localStorage
  useEffect(() => {
    try {
      // 1. Check for products explicitly listed to marketplace
      const storedMkt = localStorage.getItem("shilpmitra_marketplace_products");
      if (storedMkt) {
        const mktList: MarketplaceProduct[] = JSON.parse(storedMkt);
        if (Array.isArray(mktList) && mktList.length > 0) {
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const newItems = mktList.filter((item) => !existingIds.has(item.id));
            return [...newItems, ...prev];
          });
        }
      }

      // 2. Check for newly enhanced image or description in localStorage to prepend as draft
      const storedImage = localStorage.getItem("shilpmitra_selected_product_image");
      const storedDesc = localStorage.getItem("shilpmitra_saved_description");

      if (storedImage) {
        const imgObj = JSON.parse(storedImage);
        let title = "Studio Enhanced Handcrafted Masterpiece";
        let desc = "Marketplace-ready handcrafted artisan creation with balanced lighting and authentic micro-textures.";

        if (storedDesc) {
          const descObj = JSON.parse(storedDesc);
          if (descObj.title) title = descObj.title;
          if (descObj.shortDescription) desc = descObj.shortDescription;
        }

        const newListing: MarketplaceProduct = {
          id: "mkt-new-enhanced",
          title,
          category: "Artisan Studio Reserve",
          price: 1150,
          priceFormatted: "₹1,150",
          description: desc,
          imageUrl: imgObj.enhancedUrl || imgObj.originalUrl || "/images/pot-after.jpg",
          status: "Ready to Publish",
          ondcStatus: "Ready",
          views: 0,
          stock: 12,
        };

        setProducts((prev) => {
          if (prev.some((p) => p.id === "mkt-new-enhanced")) return prev;
          return [newListing, ...prev];
        });
      }
    } catch {
      // Fallback
    }
  }, []);

  const handlePublish = (productId: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              status: "Live on Marketplace",
              ondcStatus: "Verified",
            }
          : item
      )
    );

    // Requirement 5: On click show "Product ready for marketplace listing."
    setPublishMessage("Product ready for marketplace listing.");
    setTimeout(() => {
      setPublishMessage(null);
    }, 4500);
  };

  const filteredProducts = products.filter((p) => {
    if (filter === "live") return p.status === "Live on Marketplace";
    if (filter === "draft") return p.status === "Ready to Publish" || p.status === "Draft";
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              COMMERCE • MULTI-CHANNEL DISTRIBUTION
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Demo Active
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Artisan Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Preview, manage, and publish your handcrafted creations directly to national buyers, corporate gifting catalogs, and open digital commerce networks.
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

      {/* 2. Success Banner on Publish (Requirement 5) */}
      {publishMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>{publishMessage}</strong> Your craft listing has been syndicated to ShilpMitra Direct Guild & ONDC network.
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg shrink-0">
            Live Syndication
          </span>
        </div>
      )}

      {/* 3. Filter Tabs & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 p-1 bg-shilp-cream-100 rounded-xl border border-warm-border self-start">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "all"
                ? "bg-white text-shilp-charcoal-900 shadow-xs"
                : "text-shilp-charcoal-600 hover:text-shilp-charcoal-900"
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("live")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "live"
                ? "bg-white text-shilp-charcoal-900 shadow-xs"
                : "text-shilp-charcoal-600 hover:text-shilp-charcoal-900"
            }`}
          >
            Live on Marketplace ({products.filter((p) => p.status === "Live on Marketplace").length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("draft")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === "draft"
                ? "bg-white text-shilp-charcoal-900 shadow-xs"
                : "text-shilp-charcoal-600 hover:text-shilp-charcoal-900"
            }`}
          >
            Ready to Publish ({products.filter((p) => p.status !== "Live on Marketplace").length})
          </button>
        </div>

        {onNavigateTab && (
          <button
            type="button"
            onClick={() => onNavigateTab("image-enhancement")}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-shilp-orange-50 hover:bg-shilp-orange-100 text-shilp-orange-800 border border-shilp-orange-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-shilp-orange-600" />
            <span>Add Enhanced Craft Photo</span>
          </button>
        )}
      </div>

      {/* 4. Product Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => {
          const isLive = product.status === "Live on Marketplace";

          return (
            <div
              key={product.id}
              className="bg-[#FFFEFC] rounded-3xl border border-warm-border hover:border-shilp-orange-300 shadow-warm-xs hover:shadow-warm transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-xs backdrop-blur-xs ${
                        isLive
                          ? "bg-emerald-500/90 text-white"
                          : "bg-amber-500/90 text-white"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{product.status}</span>
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-semibold text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-base font-bold text-shilp-charcoal-900 line-clamp-1">
                      {product.title}
                    </h3>
                    <span className="font-sans text-base font-bold text-shilp-orange-600 shrink-0">
                      {product.priceFormatted}
                    </span>
                  </div>

                  <p className="text-xs text-shilp-charcoal-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 border-t border-warm-border/60 flex items-center justify-between text-xs text-shilp-charcoal-500">
                    <span>Stock: {product.stock} units</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {product.views} views
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Preview & Publish */}
              <div className="p-4 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPreview(product)}
                    className="py-2.5 px-3 rounded-xl bg-shilp-cream-100 hover:bg-stone-100 text-shilp-charcoal-800 font-semibold text-xs border border-warm-border transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-500" />
                    <span>Buyer Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePublish(product.id)}
                    className={`py-2.5 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      isLive
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default"
                        : "bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white shadow-warm-xs"
                    }`}
                  >
                    {isLive ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Published</span>
                      </>
                    ) : (
                      <>
                        <Globe className="w-3.5 h-3.5" />
                        <span>Publish Product</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Buyer Preview Modal */}
      {selectedPreview && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#FFFEFC] rounded-3xl max-w-xl w-full border border-warm-border shadow-warm-xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-warm-border bg-[#FDFBF7]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-sm font-bold text-shilp-charcoal-900">
                  Buyer Mobile & Web Storefront Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 border border-warm-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPreview.imageUrl}
                  alt={selectedPreview.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-md font-semibold">
                  Direct from Artisan Studio
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-shilp-orange-700 uppercase tracking-wide">
                  {selectedPreview.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-shilp-charcoal-900 mt-1">
                  {selectedPreview.title}
                </h3>
                <span className="font-sans text-2xl font-bold text-shilp-orange-600 block mt-2">
                  {selectedPreview.priceFormatted}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed">
                {selectedPreview.description}
              </p>

              <div className="p-3 rounded-xl bg-shilp-cream-50 border border-warm-border flex items-center gap-2 text-xs text-shilp-charcoal-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified Indian Master Artisan • Fair Living Wage Guarantee</span>
              </div>

              {/* Action */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-warm-border">
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="px-4 py-2 rounded-xl border border-warm-border text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handlePublish(selectedPreview.id);
                    setSelectedPreview(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-warm-xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Publish to Marketplace</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
