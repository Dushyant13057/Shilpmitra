"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";

interface CraftCluster {
  name: string;
  region: string;
  image: string;
  position: string;
  coords: { x: number; y: number };
  pinCoords: { x: number; y: number };
  delay: number;
}

const craftClusters: CraftCluster[] = [
  {
    name: "Handloom Weaving",
    region: "Varanasi",
    image: "/images/craft-weaving.jpg",
    position: "top-1 left-2 sm:left-4",
    coords: { x: 30, y: 30 },
    pinCoords: { x: 190, y: 135 },
    delay: 0.15,
  },
  {
    name: "Teak Wood Carving",
    region: "Saharanpur",
    image: "/images/wood-handicraft.jpg",
    position: "top-2 right-2 sm:right-4",
    coords: { x: 260, y: 35 },
    pinCoords: { x: 140, y: 85 },
    delay: 0.25,
  },
  {
    name: "Dhokra Brass Art",
    region: "Bastar",
    image: "/images/craft-brass.jpg",
    position: "bottom-14 left-2 sm:left-4",
    coords: { x: 35, y: 220 },
    pinCoords: { x: 165, y: 180 },
    delay: 0.35,
  },
  {
    name: "Terracotta Pottery",
    region: "Kutch",
    image: "/images/terracotta-craft.jpg",
    position: "bottom-12 right-2 sm:right-4",
    coords: { x: 255, y: 230 },
    pinCoords: { x: 95, y: 160 },
    delay: 0.45,
  },
];

export default function IndiaMosaicScene() {
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
          <Sparkles className="w-3.5 h-3.5 text-shilp-orange-500" />
          <span>India Artisan Mosaic</span>
        </span>
        <span className="text-xs font-semibold text-shilp-charcoal-500 hidden sm:inline">
          Traditional Craft Clusters
        </span>
      </motion.div>

      {/* Central India-Shaped Artisan Mosaic Composition */}
      <div className="relative flex-1 flex items-center justify-center my-1">
        {/* Subtle decorative orbital rings */}
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-dashed border-shilp-orange-400/20 pointer-events-none animate-spin-slow" />
        <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-shilp-orange-300/15 pointer-events-none" />

        {/* India Map Silhouette & Craft Mosaic Stage */}
        <div className="relative w-64 h-68 sm:w-72 sm:h-76 flex items-center justify-center">
          {/* SVG Map of India with Clip Path containing authentic artisan photography tiles */}
          <svg
            viewBox="0 0 280 320"
            className="w-full h-full drop-shadow-md z-10"
            aria-hidden="true"
          >
            <defs>
              {/* India Silhouette Clip Path */}
              <clipPath id="indiaMapClip">
                <path d="M142,12 C152,18 162,12 168,22 C174,32 168,48 178,60 C188,72 205,75 212,85 C222,95 248,92 258,105 C264,115 255,128 260,138 C252,148 238,142 228,150 C220,158 212,175 202,192 C194,208 185,228 174,250 C165,270 156,290 150,305 C146,295 138,268 130,245 C122,222 112,202 98,192 C88,185 75,182 65,168 C55,155 68,140 76,128 C84,115 98,110 106,98 C114,85 120,60 128,45 C132,30 136,18 142,12 Z" />
              </clipPath>

              <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E86C1F" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Ambient India Background Glow */}
            <path
              d="M142,12 C152,18 162,12 168,22 C174,32 168,48 178,60 C188,72 205,75 212,85 C222,95 248,92 258,105 C264,115 255,128 260,138 C252,148 238,142 228,150 C220,158 212,175 202,192 C194,208 185,228 174,250 C165,270 156,290 150,305 C146,295 138,268 130,245 C122,222 112,202 98,192 C88,185 75,182 65,168 C55,155 68,140 76,128 C84,115 98,110 106,98 C114,85 120,60 128,45 C132,30 136,18 142,12 Z"
              fill="#FAF6ED"
              stroke="#E86C1F"
              strokeWidth="2.5"
              strokeOpacity="0.4"
            />

            {/* Clipped Artisan Photo Mosaic forming India */}
            <g clipPath="url(#indiaMapClip)">
              {/* Tile 1: North - Woodcraft */}
              <image
                href="/images/wood-handicraft.jpg"
                x="110"
                y="10"
                width="85"
                height="80"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Tile 2: West - Terracotta Pottery */}
              <image
                href="/images/terracotta-craft.jpg"
                x="55"
                y="90"
                width="95"
                height="95"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Tile 3: Central - Master Potter & Heritage */}
              <image
                href="/images/artisan-hero.jpg"
                x="120"
                y="85"
                width="95"
                height="95"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Tile 4: East - Handloom Silk Weaving */}
              <image
                href="/images/craft-weaving.jpg"
                x="195"
                y="90"
                width="85"
                height="90"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Tile 5: Central-South - Dhokra Brass Casting */}
              <image
                href="/images/craft-brass.jpg"
                x="105"
                y="160"
                width="90"
                height="90"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Tile 6: South - Master Artisan & Painted Craft */}
              <image
                href="/images/elder-artisan.jpg"
                x="115"
                y="225"
                width="85"
                height="85"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Warm decorative mosaic tile dividers */}
              <line x1="110" y1="85" x2="205" y2="85" stroke="#FFF7ED" strokeWidth="2" strokeOpacity="0.9" />
              <line x1="140" y1="10" x2="140" y2="175" stroke="#FFF7ED" strokeWidth="2" strokeOpacity="0.9" />
              <line x1="60" y1="175" x2="215" y2="175" stroke="#FFF7ED" strokeWidth="2" strokeOpacity="0.9" />
              <line x1="115" y1="230" x2="190" y2="230" stroke="#FFF7ED" strokeWidth="2" strokeOpacity="0.9" />
            </g>

            {/* Glowing Cluster Connection Lines (Platform Network) */}
            <path
              d="M140,140 Q160,110 190,135"
              fill="none"
              stroke="url(#orbitGlow)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="animate-pulse"
            />
            <path
              d="M140,140 Q135,100 140,85"
              fill="none"
              stroke="url(#orbitGlow)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="animate-pulse"
            />
            <path
              d="M140,140 Q155,165 165,180"
              fill="none"
              stroke="url(#orbitGlow)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="animate-pulse"
            />
            <path
              d="M140,140 Q110,150 95,160"
              fill="none"
              stroke="url(#orbitGlow)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="animate-pulse"
            />

            {/* Regional Craft Hotspots / Nodes on Map */}
            {craftClusters.map((cluster) => (
              <g key={cluster.name}>
                <circle
                  cx={cluster.pinCoords.x}
                  cy={cluster.pinCoords.y}
                  r="4"
                  fill="#E86C1F"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <circle
                  cx={cluster.pinCoords.x}
                  cy={cluster.pinCoords.y}
                  r="8"
                  fill="none"
                  stroke="#E86C1F"
                  strokeWidth="1"
                  opacity="0.6"
                  className="animate-ping"
                />
              </g>
            ))}

            {/* Central ShilpMitra Platform Hub Node */}
            <circle cx="140" cy="140" r="7" fill="#E86C1F" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="140" cy="140" r="14" fill="none" stroke="#E86C1F" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Floating Satellite Cluster Nodes */}
        {craftClusters.map((cluster) => (
          <motion.div
            key={cluster.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: cluster.delay }}
            className={`absolute ${cluster.position} z-20 hidden sm:flex items-center gap-2 p-1.5 pr-2.5 bg-[#FFFEFC]/95 backdrop-blur-md rounded-2xl shadow-warm border border-warm-border hover:shadow-warm-lg transition-shadow`}
          >
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shrink-0 border border-shilp-orange-200/70">
              <Image
                src={cluster.image}
                alt={cluster.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-shilp-charcoal-900 leading-tight">
                {cluster.name}
              </p>
              <p className="text-[9px] text-shilp-orange-600 flex items-center gap-0.5 font-semibold">
                <MapPin className="w-2.5 h-2.5" />
                <span>{cluster.region}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Supporting Message */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-20 text-center bg-[#FFFEFC]/90 backdrop-blur-sm py-2 px-3 rounded-2xl border border-warm-border shadow-warm-sm"
      >
        <p className="font-serif text-sm sm:text-base font-bold text-shilp-charcoal-900">
          Thousands of artisans. One platform.
        </p>
        <p className="text-[11px] text-shilp-charcoal-500">
          Connecting traditional craft clusters across India through inclusive technology.
        </p>
      </motion.div>
    </div>
  );
}

