"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, User } from "lucide-react";
import { navItems } from "@/data/navigation";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ["hero", "journey", "features", "sahayak", "about"];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#FDFBF7] shadow-warm-sm border-b border-warm-border py-3"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Branding */}
          <Link href="#hero" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 flex items-center justify-center text-white shadow-warm-sm group-hover:scale-105 transition-transform duration-200">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Traditional lotus/diya craft flame motif */}
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#FFFEFC] px-4 py-1.5 rounded-full border border-warm-border shadow-warm-sm">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-shilp-orange-600 bg-shilp-orange-50 font-semibold"
                      : "text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-shilp-orange-50/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <LanguageSelector />

            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs md:text-sm font-medium text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-shilp-orange-50 rounded-full transition-colors border border-transparent hover:border-warm-border"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>

            <Link
              href="#journey"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-shilp-orange-500 hover:bg-shilp-orange-600 rounded-full shadow-warm-sm hover:shadow-warm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-[#FFFEFC] rounded-xl border border-warm-border transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-warm-border px-4 pt-3 pb-6 shadow-warm-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-shilp-charcoal-800 hover:text-shilp-orange-600 hover:bg-shilp-orange-50 rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 mt-2 border-t border-warm-border flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-shilp-charcoal-700 bg-[#FFFEFC] border border-warm-border rounded-xl hover:text-shilp-orange-600 hover:bg-shilp-orange-50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Artisan Login</span>
              </Link>

              <Link
                href="#journey"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-shilp-orange-500 hover:bg-shilp-orange-600 rounded-xl shadow-warm-sm text-center"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
