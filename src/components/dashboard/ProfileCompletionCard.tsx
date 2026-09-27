"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { BasicProfile } from "@/types";

interface ProfileCompletionCardProps {
  profile?: BasicProfile | null;
}

const BASIC_FIELDS: Array<{
  key: keyof BasicProfile;
  label: string;
  category: string;
}> = [
  { key: "fullName", label: "Full Name", category: "Personal" },
  { key: "email", label: "Email Address", category: "Account" },
  { key: "contactNumber", label: "Contact Number", category: "Contact" },
  { key: "gender", label: "Gender", category: "Personal" },
  { key: "dob", label: "Date of Birth", category: "Personal" },
  { key: "city", label: "City / District", category: "Location" },
  { key: "state", label: "State / UT", category: "Location" },
  { key: "pinCode", label: "PIN Code", category: "Location" },
];

export default function ProfileCompletionCard({ profile }: ProfileCompletionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Default demo artisan fallback if user landed directly on /dashboard
  const effectiveProfile: BasicProfile = profile || {
    fullName: "Govind Prajapati",
    email: "govind.artisan@shilpmitra.com",
    contactNumber: "9876543210",
    gender: "Male",
    dob: "1984-06-15",
    city: "Bhuj, Kutch",
    state: "Gujarat",
    pinCode: "370001",
    isRegistered: true,
  };

  // Check 9 basic fields: (8 stored profile fields + password set at signup = 9 total fields)
  // Password is inherently completed upon account creation
  const fieldStatus = BASIC_FIELDS.map((f) => {
    const val = effectiveProfile[f.key];
    const isCompleted = typeof val === "string" && val.trim().length > 0;
    return {
      ...f,
      value: val,
      isCompleted,
    };
  });

  // 8 fields checked + 1 password field (always verified at registration) = 9
  const completedBaseCount = fieldStatus.filter((f) => f.isCompleted).length;
  const passwordCompleted = 1;
  const totalCompletedCount = completedBaseCount + passwordCompleted;
  const totalFields = 9;

  const percentage = Math.round((totalCompletedCount / totalFields) * 100);

  return (
    <div className="bg-[#FFFEFC] rounded-3xl p-6 sm:p-8 shadow-warm-md border border-warm-border">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shilp-orange-50 border border-shilp-orange-200/70 text-shilp-orange-700 text-[11px] font-bold tracking-wide uppercase mb-2">
            <UserCheck className="w-3.5 h-3.5 text-shilp-orange-500" />
            <span>Basic Profile Status</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900">
            Account Setup Completion
          </h3>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-0.5">
            Calculated based on your 9 core registration details.
          </p>
        </div>

        {/* Big percentage pill */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <div className="text-right">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-shilp-charcoal-900 leading-none">
              {percentage}%
            </span>
            <span className="block text-[11px] font-bold text-shilp-orange-600 mt-1">
              {totalCompletedCount} of {totalFields} Details Completed
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-shilp-cream-200 rounded-full overflow-hidden mb-4 p-0.5 border border-warm-border/50">
        <div
          className="h-full bg-gradient-to-r from-shilp-orange-500 to-shilp-orange-600 rounded-full transition-all duration-700 ease-out shadow-xs"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Explanatory Message */}
      <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed mb-5">
        Completing your 9 basic registration details helps verify your artisan credentials, secures your personal workspace, and ensures accurate fulfillment coordination when your products enter the digital marketplace.
      </p>

      {/* Extensible Future Phase Notice */}
      <div className="p-3.5 rounded-2xl bg-shilp-cream-100/70 border border-warm-border/60 flex items-start gap-2.5 text-xs text-shilp-charcoal-600 mb-4">
        <Sparkles className="w-4 h-4 text-shilp-orange-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-shilp-charcoal-800">Extensible Architecture: </span>
          <span>
            Upcoming modules (Artisan Skills, Workshop Capacity, and Marketplace Catalog) will seamlessly integrate into this profile tracker once requirements are finalized.
          </span>
        </div>
      </div>

      {/* Expandable Checklist Toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full py-2 px-3 text-xs font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-600 flex items-center justify-between border-t border-warm-border/60 pt-3 transition-colors"
      >
        <span>View Registered Basic Fields ({totalCompletedCount}/{totalFields})</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded Checklist */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-warm-border/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 animate-in fade-in duration-200">
          {/* Password Item */}
          <div className="p-2.5 rounded-xl bg-white border border-warm-border flex items-center justify-between text-xs">
            <span className="font-medium text-shilp-charcoal-700">Account Password</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Secured</span>
            </span>
          </div>

          {/* 8 Other Items */}
          {fieldStatus.map((field) => (
            <div
              key={field.key}
              className="p-2.5 rounded-xl bg-white border border-warm-border flex items-center justify-between text-xs"
            >
              <div className="truncate pr-2">
                <span className="font-medium text-shilp-charcoal-700 block truncate">
                  {field.label}
                </span>
                <span className="text-[10px] text-shilp-charcoal-500 truncate block">
                  {field.value || "Not provided"}
                </span>
              </div>
              {field.isCompleted ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Done</span>
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-shilp-orange-700 bg-shilp-orange-50 px-2 py-0.5 rounded-md border border-shilp-orange-200/70 shrink-0">
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
