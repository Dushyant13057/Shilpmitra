"use client";

import { User, MapPin, Phone, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { BasicProfile } from "@/types";
import { demoArtisanData } from "@/data/dashboardDemoData";

interface ArtisanOverviewCardProps {
  profile?: BasicProfile | null;
  onViewBasicInfo: () => void;
}

export default function ArtisanOverviewCard({
  profile,
  onViewBasicInfo,
}: ArtisanOverviewCardProps) {
  // Use real authenticated profile if available, or safe demo placeholder
  const name = profile?.fullName?.trim() || demoArtisanData.name;
  const location =
    profile?.city && profile?.state
      ? `${profile.city}, ${profile.state}`
      : demoArtisanData.location;

  const contact = profile?.contactNumber
    ? `+91 ${profile.contactNumber.replace(/(\d{5})(\d{5})/, "$1 $2")}`
    : demoArtisanData.contact;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Dynamic calculation based strictly on the 9 basic registration fields (Requirement 15)
  // 8 demographic/contact fields + 1 account security password
  const fieldsToCheck = [
    Boolean(profile?.fullName?.trim()),
    Boolean(profile?.email?.trim()),
    Boolean(profile?.contactNumber?.trim()),
    Boolean(profile?.gender?.trim()),
    Boolean(profile?.dob?.trim()),
    Boolean(profile?.city?.trim()),
    Boolean(profile?.state?.trim()),
    Boolean(profile?.pinCode?.trim()),
    true, // Account security password established at registration
  ];

  const completedCount = fieldsToCheck.filter(Boolean).length;
  const totalFields = 9;
  const completionPercentage = Math.round((completedCount / totalFields) * 100);

  return (
    <div className="bg-[#FFFEFC] rounded-3xl p-5 sm:p-6 border border-warm-border shadow-warm-sm hover:shadow-warm transition-shadow duration-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Avatar & Details */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          {/* Avatar with Craft Badge */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-shilp-orange-100 to-shilp-cream-100 text-shilp-orange-800 font-serif font-bold text-xl sm:text-2xl flex items-center justify-center border-2 border-shilp-orange-200 shadow-warm-xs">
              {initials || <User className="w-8 h-8" />}
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white"
              title="Verified Artisan Account"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Core Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-shilp-charcoal-400">
                Artisan Overview
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Account
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900 leading-snug">
              {name}
            </h2>

            {/* Location & Contact Meta Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2 text-xs text-shilp-charcoal-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-shilp-orange-600 shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-shilp-charcoal-400 shrink-0" />
                <span>{contact}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-shilp-orange-500 shrink-0" />
                <span>Basic Registration Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Basic Account Setup Status Indicator (Requirement 10 & 15) */}
        <div className="pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-warm-border/70 flex flex-col sm:flex-row lg:flex-col justify-between sm:items-center lg:items-start gap-3 min-w-[220px]">
          <div className="w-full">
            <div className="flex items-center justify-between text-xs font-semibold text-shilp-charcoal-800 mb-1.5">
              <span>Basic Account Setup</span>
              <span className="text-shilp-orange-600 font-bold">{completionPercentage}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-shilp-cream-200 overflow-hidden">
              <div
                className="h-full bg-shilp-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-shilp-charcoal-500 mt-1.5">
              {completedCount} of {totalFields} basic details completed
            </p>
          </div>

          <button
            type="button"
            onClick={onViewBasicInfo}
            className="inline-flex items-center gap-1 text-xs font-semibold text-shilp-orange-600 hover:text-shilp-orange-700 transition-colors self-start"
          >
            <span>View Basic Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
