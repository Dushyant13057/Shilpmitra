"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { languages } from "@/data/navigation";

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("hi");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === selectedLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-shilp-charcoal-700 bg-[#FFFEFC]/85 hover:bg-[#FFFEFC] rounded-full border border-warm-border shadow-warm-sm transition-all duration-200 hover:border-shilp-orange-300"
        aria-label="Select regional language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-shilp-orange-500" />
        <span className="font-semibold text-shilp-charcoal-800">{current.nativeName}</span>
        <span className="text-shilp-charcoal-400">|</span>
        <span className="text-shilp-charcoal-600 hidden sm:inline">Language</span>
        <ChevronDown className={`w-3.5 h-3.5 text-shilp-charcoal-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-[#FFFEFC] rounded-2xl shadow-warm-lg border border-warm-border z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 border-b border-warm-border/50 mb-1">
            <p className="text-[11px] font-semibold tracking-wider text-shilp-charcoal-400 uppercase">
              Select Language
            </p>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {languages.map((lang) => {
              const isSelected = lang.code === selectedLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-shilp-orange-50 text-shilp-orange-700 font-semibold"
                      : "text-shilp-charcoal-700 hover:bg-shilp-orange-50/70 hover:text-shilp-orange-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-[11px] text-shilp-charcoal-400">({lang.name})</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-shilp-orange-500" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
