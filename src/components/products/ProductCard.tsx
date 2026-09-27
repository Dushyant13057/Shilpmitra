"use client";

import Image from "next/image";
import { ArrowRight, MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { ProductItem } from "@/types";

interface ProductCardProps {
  product: ProductItem;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-[#FFFEFC] rounded-3xl overflow-hidden shadow-warm-sm hover:shadow-warm-lg border border-warm-border hover:border-shilp-orange-300 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-shilp-cream-200">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, 360px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Craft Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-[#FFFEFC] text-[11px] font-semibold text-shilp-charcoal-800 shadow-xs border border-warm-border">
              {product.category}
            </span>
          </div>

          {/* Special Craft Tag */}
          {product.tag && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded-full bg-shilp-orange-500 text-white text-[10px] font-bold tracking-wide shadow-sm">
                {product.tag}
              </span>
            </div>
          )}

          {/* Artisan Location info */}
          {product.artisanName && (
            <div className="absolute bottom-2.5 left-3 text-white text-[11px] flex items-center gap-1 font-medium drop-shadow-sm">
              <MapPin className="w-3 h-3 text-shilp-orange-200" />
              <span>{product.artisanName} ({product.artisanRegion})</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold text-shilp-charcoal-900 group-hover:text-shilp-orange-600 transition-colors mb-1.5">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-shilp-charcoal-500 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-warm-border/50">
        <div>
          <span className="text-[10px] text-shilp-charcoal-400 uppercase tracking-wider block font-semibold">
            Fair Price
          </span>
          <span className="font-serif text-lg font-extrabold text-shilp-charcoal-900">
            {product.price}
          </span>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-shilp-orange-50 hover:bg-shilp-orange-500 text-shilp-orange-700 hover:text-white text-xs font-semibold transition-all duration-200"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
