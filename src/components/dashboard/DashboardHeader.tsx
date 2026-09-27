"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Sparkles,
  ExternalLink,
  FileText,
  ShieldCheck,
  Mic,
} from "lucide-react";
import { BasicProfile, DashboardTab } from "@/types";

interface DashboardHeaderProps {
  profile?: BasicProfile | null;
  onToggleMobileMenu: () => void;
  onToggleDesktopSidebar: () => void;
  onSelectTab: (tab: DashboardTab) => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  profile,
  onToggleMobileMenu,
  onToggleDesktopSidebar,
  onSelectTab,
  onLogout,
}: DashboardHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe demo placeholders (No hard-coded real personal names or real locations)
  const displayName = profile?.fullName?.trim() || "Artisan";
  const displayLocation =
    profile?.city && profile?.state
      ? `${profile.city}, ${profile.state}`
      : "Demo City, Demo State";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7] border-b border-warm-border h-16 sm:h-18">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ========================================================
            LEFT AREA: Hamburger Menu + ShilpMitra Brand
           ======================================================== */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Hamburger Menu (Controls mobile drawer on mobile, desktop sidebar collapse on desktop) */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 768) {
                onToggleMobileMenu();
              } else {
                onToggleDesktopSidebar();
              }
            }}
            className="p-2 -ml-1 text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-shilp-cream-100 rounded-xl border border-warm-border transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20"
            aria-label="Toggle navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* ShilpMitra Brand Logo */}
          <button
            type="button"
            onClick={() => onSelectTab("dashboard")}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-shilp-orange-500 flex items-center justify-center shadow-warm-xs group-hover:scale-105 transition-transform duration-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
                <circle cx="8" cy="10" r="1.5" fill="currentColor" />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                <circle cx="16" cy="10" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-shilp-charcoal-900 group-hover:text-shilp-orange-600 transition-colors">
                Shilp<span className="text-shilp-orange-500">Mitra</span>
              </span>
              <span className="text-[10px] text-shilp-charcoal-500 uppercase tracking-widest font-medium hidden sm:block">
                Artisan Workspace
              </span>
            </div>
          </button>

          {/* Subtle Tag */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/60 text-xs font-medium text-shilp-orange-800 ml-2">
            <Sparkles className="w-3 h-3 text-shilp-orange-500" />
            <span>Workspace 2.0</span>
          </div>
        </div>

        {/* ========================================================
            RIGHT AREA: Notifications + Artisan Profile + Logout
           ======================================================== */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Voice Assistant Mic */}
          <button
            type="button"
            onClick={() => onSelectTab("sahayak")}
            className="p-2 text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-shilp-cream-100 rounded-xl transition-colors relative flex items-center gap-1.5 border border-warm-border text-xs font-semibold"
            title="Shilp Sahayak Voice Assistant"
          >
            <Mic className="w-4 h-4 text-shilp-orange-600" />
            <span className="hidden sm:inline text-[11px]">Voice</span>
          </button>

          {/* Notification Icon Placeholder */}
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-shilp-charcoal-600 hover:text-shilp-orange-600 hover:bg-shilp-cream-100 rounded-xl transition-colors relative"
              aria-label="View notifications"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {/* Subtle Notification Badge */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-shilp-orange-500 ring-2 ring-[#FDFBF7]" />
            </button>

            {/* Notification Dropdown Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#FFFEFC] rounded-2xl shadow-warm-lg border border-warm-border p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-warm-border mb-2.5">
                  <span className="text-xs font-bold text-shilp-charcoal-900">
                    Notifications
                  </span>
                  <span className="text-[10px] font-semibold text-shilp-orange-600 bg-shilp-orange-50 px-2 py-0.5 rounded-full">
                    Demo Mode
                  </span>
                </div>
                <div className="space-y-2 text-xs text-shilp-charcoal-700">
                  <div className="p-2 rounded-xl bg-shilp-cream-100/60 border border-warm-border/50">
                    <p className="font-semibold text-shilp-charcoal-900">
                      Welcome to ShilpMitra!
                    </p>
                    <p className="text-[11px] text-shilp-charcoal-600 mt-0.5">
                      Your basic artisan account setup is complete.
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-shilp-cream-100/60 border border-warm-border/50">
                    <p className="font-semibold text-shilp-charcoal-900">
                      New Order Received
                    </p>
                    <p className="text-[11px] text-shilp-charcoal-600 mt-0.5">
                      Order #SM1024 for Terracotta Pot is processing.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Artisan Profile & Dropdown Indicator */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-2xl bg-[#FFFEFC] hover:bg-shilp-cream-100/80 border border-warm-border transition-colors shadow-xs"
              aria-expanded={dropdownOpen}
              aria-label="User profile menu"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-shilp-orange-100 text-shilp-orange-800 font-bold text-xs flex items-center justify-center border border-shilp-orange-200 shrink-0">
                {initials || <User className="w-4 h-4" />}
              </div>

              {/* Name & Dropdown Chevron */}
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-shilp-charcoal-900 leading-tight">
                  {displayName}
                </span>
                <span className="text-[10px] text-shilp-charcoal-500 truncate max-w-[110px]">
                  {displayLocation}
                </span>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 text-shilp-charcoal-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#FFFEFC] rounded-2xl shadow-warm-lg border border-warm-border p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-warm-border mb-1">
                  <p className="text-xs font-bold text-shilp-charcoal-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-shilp-charcoal-500 truncate">
                    {displayLocation}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab("basic-info");
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-shilp-orange-50 rounded-xl transition-colors text-left"
                  >
                    <FileText className="w-4 h-4 text-shilp-charcoal-400" />
                    <span>Basic Information</span>
                  </button>

                  <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-shilp-orange-50 rounded-xl transition-colors text-left"
                  >
                    <ExternalLink className="w-4 h-4 text-shilp-charcoal-400" />
                    <span>View Public Landing Page</span>
                  </Link>

                  <div className="pt-1 mt-1 border-t border-warm-border">
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Direct Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-shilp-charcoal-700 hover:text-red-700 bg-[#FFFEFC] hover:bg-red-50/70 border border-warm-border hover:border-red-200 rounded-xl transition-all shadow-xs"
            aria-label="Logout"
            title="Logout of demo workspace"
          >
            <LogOut className="w-3.5 h-3.5 text-shilp-charcoal-500" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
