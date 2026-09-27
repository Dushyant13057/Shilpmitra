"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { navItems } from "@/data/navigation";
import LanguageSelector from "../navbar/LanguageSelector";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F0] border-t border-warm-border text-shilp-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Tier: Branding, Nav Links, Socials & Language */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-warm-border">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 flex items-center justify-center text-white shadow-warm-sm group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 8 7 8 11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11C16 7 12 2 12 2Z" />
                <path d="M5 13C5 17 8 20 12 20C16 20 19 17 19 13C17.5 15 15 16 12 16C9 16 6.5 15 5 13Z" opacity="0.8" />
                <circle cx="12" cy="11" r="1.5" className="fill-shilp-orange-200" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-shilp-charcoal-900 block leading-tight">
                Shilp<span className="text-shilp-orange-500">Mitra</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-shilp-charcoal-500 block">
                Craft • Connect • Grow
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-shilp-charcoal-600 hover:text-shilp-orange-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons & Language Dropdown */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#FFFEFC] border border-warm-border flex items-center justify-center text-shilp-charcoal-600 hover:text-shilp-orange-500 hover:border-shilp-orange-300 hover:bg-shilp-orange-50 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#FFFEFC] border border-warm-border flex items-center justify-center text-shilp-charcoal-600 hover:text-shilp-orange-500 hover:border-shilp-orange-300 hover:bg-shilp-orange-50 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-[#FFFEFC] border border-warm-border flex items-center justify-center text-shilp-charcoal-600 hover:text-shilp-orange-500 hover:border-shilp-orange-300 hover:bg-shilp-orange-50 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#FFFEFC] border border-warm-border flex items-center justify-center text-shilp-charcoal-600 hover:text-shilp-orange-500 hover:border-shilp-orange-300 hover:bg-shilp-orange-50 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>

            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Mission Tag */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-shilp-charcoal-500 gap-4">
          <p>© 2026 ShilpMitra. All rights reserved.</p>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Made for Artisans</span>
            <span className="text-shilp-charcoal-400">•</span>
            <span>Powered by AI</span>
            <span className="text-shilp-orange-500">
              <Heart className="w-3.5 h-3.5 fill-current inline ml-1" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
