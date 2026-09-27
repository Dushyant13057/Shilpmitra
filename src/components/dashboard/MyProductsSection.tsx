"use client";

import Image from "next/image";
import { ArrowRight, Package, Sparkles } from "lucide-react";
import { demoProductsData, DashboardProduct } from "@/data/dashboardDemoData";

interface MyProductsSectionProps {
  onViewAll: () => void;
  onSelectProduct?: (product: DashboardProduct) => void;
}

export default function MyProductsSection({
  onViewAll,
  onSelectProduct,
}: MyProductsSectionProps) {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900">
            My Products
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-shilp-orange-50 text-shilp-orange-700 border border-shilp-orange-200/60">
            {demoProductsData.length} Listings
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-shilp-orange-600 hover:text-shilp-orange-700 hover:underline transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Cards Grid (3 cards as specified in Requirement 11) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {demoProductsData.map((product) => {
          const isActive = product.status === "Active";

          return (
            <div
              key={product.id}
              className="group bg-[#FFFEFC] rounded-2xl border border-warm-border hover:border-shilp-orange-300 shadow-warm-xs hover:shadow-warm transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-shilp-cream-200">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-xs backdrop-blur-xs ${
                        isActive
                          ? "bg-white/95 text-emerald-800 border border-emerald-200"
                          : "bg-white/95 text-amber-800 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      <span>{product.status}</span>
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-semibold text-white/95 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900 group-hover:text-shilp-orange-600 transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="font-sans text-base font-bold text-shilp-orange-600 shrink-0">
                      {product.priceFormatted}
                    </span>
                  </div>

                  {/* Inventory Meta */}
                  <div className="flex items-center justify-between text-xs text-shilp-charcoal-500 mt-2 pt-2 border-t border-warm-border/50">
                    <span>Stock: {product.stock} units</span>
                    <span>{product.salesCount} sold</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={onViewAll}
                  className="w-full py-2 px-3 rounded-xl bg-shilp-cream-100 hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 font-semibold text-xs border border-warm-border transition-colors flex items-center justify-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5 text-shilp-charcoal-400 group-hover:text-shilp-orange-600" />
                  <span>Product Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
