"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowLeft, ShieldCheck, Heart } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  artisanQuote?: string;
  artisanName?: string;
  artisanRegion?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  artisanQuote = "“ShilpMitra gave my traditional pottery a voice and direct buyers across India.”",
  artisanName = "Govind Prajapati",
  artisanRegion = "Master Potter, Kutch, Gujarat",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between selection:bg-shilp-orange-100 selection:text-shilp-orange-700">
      {/* Top Header Navigation */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 flex items-center justify-center text-white shadow-warm-sm group-hover:scale-105 transition-transform duration-200">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C12 2 8 7 8 11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11C16 7 12 2 12 2Z" />
              <path
                d="M5 13C5 17 8 20 12 20C16 20 19 17 19 13C17.5 15 15 16 12 16C9 16 6.5 15 5 13Z"
                opacity="0.8"
              />
              <circle cx="12" cy="11" r="1.5" className="fill-shilp-orange-200" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-shilp-charcoal-900 block leading-tight">
              Shilp<span className="text-shilp-orange-500">Mitra</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-shilp-charcoal-500 block">
              Craft • Connect • Grow
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-shilp-charcoal-600 hover:text-shilp-orange-600 px-3.5 py-1.5 rounded-full border border-warm-border hover:bg-shilp-orange-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Decorative Artisan Heritage Column (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full py-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-xs font-bold tracking-wide uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-shilp-orange-500" />
                <span>Artisan Digital Portal</span>
              </div>

              <h1 className="font-serif text-3xl xl:text-4xl font-extrabold text-shilp-charcoal-900 leading-tight mb-4">
                {title}
              </h1>

              <p className="text-sm xl:text-base text-shilp-charcoal-600 leading-relaxed mb-8">
                {subtitle}
              </p>

              {/* Artisan Photo Card with Quote */}
              <div className="relative rounded-3xl overflow-hidden shadow-warm-md border border-warm-border bg-[#FFFEFC] p-5">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-shilp-cream-200">
                  <Image
                    src="/images/artisan-hero.jpg"
                    alt="Traditional Indian Artisan"
                    fill
                    className="object-cover"
                    sizes="400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-shilp-orange-500 px-2 py-0.5 rounded-full inline-block mb-1">
                      GI Heritage Cluster
                    </span>
                    <p className="text-xs font-bold">{artisanName}</p>
                    <p className="text-[10px] opacity-80">{artisanRegion}</p>
                  </div>
                </div>

                <blockquote className="text-xs text-shilp-charcoal-700 italic leading-relaxed mb-3">
                  {artisanQuote}
                </blockquote>

                <div className="flex items-center gap-2 pt-3 border-t border-warm-border/50 text-[11px] text-shilp-charcoal-500">
                  <ShieldCheck className="w-4 h-4 text-shilp-orange-600" />
                  <span>Direct Fair Marketplace • Zero Middlemen</span>
                </div>
              </div>
            </div>

            {/* Bottom Support Note */}
            <div className="mt-8 pt-4 border-t border-warm-border/60 flex items-center justify-between text-xs text-shilp-charcoal-500">
              <span>Need help? Sahayak Voice is available</span>
              <span className="font-semibold text-shilp-orange-700">10+ Regional Languages</span>
            </div>
          </div>

          {/* Right Form Card Column */}
          <div className="w-full lg:col-span-7 flex justify-center">
            {children}
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="w-full py-4 text-center text-xs text-shilp-charcoal-500 border-t border-warm-border/40">
        <p>© 2026 ShilpMitra. Empowering Indian Artisans with Inclusive AI.</p>
      </footer>
    </div>
  );
}
