"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Star, PackageCheck, Truck, Check, ShieldCheck } from "lucide-react";

export default function DigitalMarketScene() {
  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[470px] flex flex-col justify-between p-4 sm:p-5 overflow-hidden select-none">
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-shilp-orange-500/10 via-shilp-orange-500/5 to-transparent rounded-3xl" />

      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 flex items-center justify-between"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-wide uppercase">
          <ShoppingBag className="w-3.5 h-3.5 text-shilp-orange-500" />
          <span>Digital Marketplace</span>
        </span>
        <span className="text-xs font-semibold text-shilp-orange-700 bg-shilp-orange-50 px-2.5 py-0.5 rounded-full border border-shilp-orange-200/70">
          Live Listing
        </span>
      </motion.div>

      {/* Central E-Commerce Listing Card + Clean Order Notification */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative w-full max-w-[310px] sm:max-w-[335px] bg-[#FFFEFC] rounded-3xl p-3 shadow-warm-lg border border-warm-border"
        >
          {/* Product Image */}
          <div className="relative h-28 sm:h-32 w-full rounded-2xl overflow-hidden bg-shilp-cream-100 mb-2.5">
            <Image
              src="/images/pot-after.jpg"
              alt="Handcrafted Sacred Clay Kalash"
              fill
              className="object-cover"
              sizes="335px"
              priority
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              GI Tagged Craft
            </div>
            <div className="absolute top-2 right-2 bg-shilp-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
              <Check className="w-2.5 h-2.5" />
              <span>In Stock</span>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-sm font-bold text-shilp-charcoal-900 truncate">
                Handcrafted Terracotta Vase
              </h4>
              <div className="flex text-shilp-orange-500 shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-[10px] text-shilp-charcoal-500 mt-0.5">
              Direct from artisan workshop • Kutch, Gujarat
            </p>

            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-warm-border/50">
              <div>
                <span className="text-[8px] text-shilp-charcoal-400 block font-semibold uppercase">
                  Fair Price
                </span>
                <span className="font-serif text-base font-extrabold text-shilp-charcoal-900">
                  ₹1,299
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-shilp-orange-700 bg-shilp-orange-50 px-2 py-1 rounded-lg border border-shilp-orange-200/70">
                <ShieldCheck className="w-3 h-3 text-shilp-orange-600" />
                <span>Verified Artisan</span>
              </div>
            </div>
          </div>

          {/* Floating Order Notification Banner (Placed with clean positioning) */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-2.5 bg-gradient-to-r from-shilp-orange-50 to-[#FDFBF7] p-2 rounded-2xl border border-shilp-orange-200/70 shadow-warm-sm flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-xl bg-shilp-orange-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-shilp-charcoal-900 leading-tight">
                New Order Received!
              </p>
              <p className="text-[9px] text-shilp-orange-700 flex items-center gap-1 font-medium truncate">
                <Truck className="w-2.5 h-2.5 shrink-0" />
                <span>Pickup scheduled tomorrow</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Supporting Message */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-20 text-center bg-[#FFFEFC]/90 backdrop-blur-sm py-2 px-3 rounded-2xl border border-warm-border shadow-warm-sm"
      >
        <p className="font-serif text-sm sm:text-base font-bold text-shilp-charcoal-900">
          From your workshop to your customer.
        </p>
        <p className="text-[11px] text-shilp-charcoal-500">
          Enabling direct digital sales without technical barriers or middlemen commissions.
        </p>
      </motion.div>
    </div>
  );
}

