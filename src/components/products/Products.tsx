"use client";

import { motion } from "framer-motion";
import { Sparkles, Quote, ArrowRight } from "lucide-react";
import { productsData } from "@/data/products";
import ProductCard from "./ProductCard";

export default function Products() {
  const displayProducts = productsData.slice(0, 3);

  return (
    <section id="products" className="py-20 md:py-28 relative bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-widest uppercase mb-3"
          >
            Featured Products
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-shilp-charcoal-900 tracking-tight mb-3"
          >
            Artisans Creating a Better Tomorrow
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-shilp-charcoal-600"
          >
            Crafts that deserve to be seen, treasured, and celebrated across India and the world.
          </motion.p>
        </div>

        {/* Products Grid + Artistic Impact Quote */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* 3 Product Cards */}
          {displayProducts.map((product, index) => (
            <div key={product.id} className="lg:col-span-1">
              <ProductCard product={product} index={index} />
            </div>
          ))}

          {/* 4th Column: Artistic Impact Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="lg:col-span-1 rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#FAF3E3] via-[#F7EDE1] to-[#F2E4D2] border border-warm-border shadow-warm-sm"
          >
            {/* Decorative background watermark */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full border border-shilp-orange-500/15 pointer-events-none" />

            <div>
              <div className="w-10 h-10 rounded-2xl bg-shilp-orange-50 flex items-center justify-center text-shilp-orange-600 mb-6">
                <Quote className="w-5 h-5 fill-current" />
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl font-extrabold text-shilp-charcoal-900 leading-snug tracking-tight mb-4">
                &ldquo;Real people. <br />
                Real crafts. <br />
                <span className="text-shilp-orange-600">Real impact.&rdquo;</span>
              </blockquote>

              <p className="text-xs text-shilp-charcoal-600 leading-relaxed">
                Every purchase directly sustains traditional Indian households, keeps ancient craft traditions alive, and prevents forced distress migration.
              </p>
            </div>

            <div className="pt-6 border-t border-warm-border mt-6">
              <span className="text-[11px] font-bold text-shilp-charcoal-400 uppercase tracking-wider block mb-1">
                ShilpMitra Mission
              </span>
              <p className="font-serif text-sm font-semibold text-shilp-charcoal-800">
                100% Direct Artisan Benefit
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
