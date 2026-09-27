"use client";

import { useState } from "react";
import {
  Building2,
  ShieldCheck,
  Edit3,
  Flame,
  Package,
  FileCheck,
  Users,
  MapPin,
  CheckCircle2,
  X,
  Save,
  Check,
} from "lucide-react";
import { BasicProfile } from "@/types";

interface BusinessProfileViewProps {
  profile?: BasicProfile | null;
  onBackToDashboard?: () => void;
}

export default function BusinessProfileView({
  profile,
  onBackToDashboard,
}: BusinessProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Business Profile State
  const [businessData, setBusinessData] = useState({
    workshopName: "Kumbhakar Heritage Pottery Works",
    enterpriseType: "Micro Handicrafts Enterprise (Artisan SHG Guild)",
    workshopAddress: "Ward 4, College Road, Bishnupur, Bankura, West Bengal 722122",
    udyamRegistration: "UDYAM-WB-02-0098412",
    gstStatus: "Exempt Handicrafts Producer (Under Threshold)",
    productionSetup: [
      "1 Traditional open wood-fired pit kiln (1,200 unit monthly baking capacity)",
      "3 Balanced granite flywheels for hand-turning",
      "Dedicated shaded pre-cure drying courtyard",
      "Muslin silt filtering tanks and natural clay settling pits",
    ],
    monthlyCapacityUnits: 250,
    cooperativeName: "Bankura District Terracotta Artisans Welfare Society",
    bankAccountStatus: "Verified Jan Dhan / MSME Business Account",
  });

  const [editForm, setEditForm] = useState({ ...businessData });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setBusinessData({ ...editForm });
    setIsEditing(false);
    showToast("Workshop & Enterprise details updated.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              BUSINESS PROFILE • WORKSHOP & CAPACITY
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Udyam Registered
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Workshop & Business Profile
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Workshop production setup, kiln/loom capacity, MSME enterprise credentials, and cooperative federation details.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setEditForm({ ...businessData });
              setIsEditing(true);
            }}
            className="px-4 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs shadow-warm-xs flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Business Profile</span>
          </button>

          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-2 text-xs font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-700 bg-white border border-warm-border rounded-xl hover:bg-shilp-cream-50 transition-colors"
            >
              ← Overview
            </button>
          )}
        </div>
      </div>

      {/* 2. Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Enterprise Badge & Verification (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 shadow-warm-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200 text-shilp-orange-600 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-shilp-charcoal-400 uppercase tracking-wide block">
                  REGISTERED WORKSHOP
                </span>
                <h3 className="font-serif text-lg font-bold text-shilp-charcoal-900 leading-tight">
                  {businessData.workshopName}
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-warm-border/60">
              <div className="flex items-start gap-2 text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>{businessData.workshopAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Udyam: {businessData.udyamRegistration}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{businessData.gstStatus}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-shilp-cream-50 border border-warm-border space-y-1">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wide block">
                MONTHLY PRODUCTION CAPACITY
              </span>
              <span className="font-serif text-2xl font-bold text-shilp-orange-600 block">
                {businessData.monthlyCapacityUnits} Units / Month
              </span>
              <span className="text-[11px] text-stone-500">
                Bulk corporate orders & seasonal festival batches accepted
              </span>
            </div>
          </div>

          {/* Cooperative Affiliation */}
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-5 shadow-warm-xs space-y-2 text-xs">
            <div className="flex items-center gap-2 text-shilp-charcoal-900 font-bold">
              <Users className="w-4 h-4 text-shilp-orange-600" />
              <span>Artisan Cooperative Affiliation</span>
            </div>
            <p className="text-stone-700">{businessData.cooperativeName}</p>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block">
              ✓ Verified Fair Trade Guild Member
            </span>
          </div>
        </div>

        {/* Right: Equipment Setup & Capabilities (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 space-y-4 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-warm-border/60">
              <Flame className="w-4 h-4 text-shilp-orange-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Workshop Equipment & Kiln Infrastructure
              </h3>
            </div>

            <ul className="space-y-3">
              {businessData.productionSetup.map((item, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-2xl bg-shilp-cream-50/70 border border-warm-border flex items-start gap-2.5 text-xs sm:text-sm text-stone-800"
                >
                  <span className="w-2 h-2 rounded-full bg-shilp-orange-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Banking & Payout Status */}
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 space-y-3 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-warm-border/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Commercial Settlement & Direct UPI
              </h3>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-950 block">Bank Account Verification</span>
                <span className="text-emerald-800">{businessData.bankAccountStatus}</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. EDIT MODAL */}
      {isEditing && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#FFFEFC] rounded-3xl max-w-lg w-full border border-warm-border shadow-warm-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-warm-border bg-[#FDFBF7]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-shilp-orange-600" />
                <span className="font-serif text-sm font-bold text-shilp-charcoal-900">
                  Edit Workshop & Business Details
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Workshop Trade Name
                </label>
                <input
                  type="text"
                  value={editForm.workshopName}
                  onChange={(e) => setEditForm({ ...editForm, workshopName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Workshop Physical Address
                </label>
                <textarea
                  rows={2}
                  value={editForm.workshopAddress}
                  onChange={(e) => setEditForm({ ...editForm, workshopAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Udyam / MSME Number
                  </label>
                  <input
                    type="text"
                    value={editForm.udyamRegistration}
                    onChange={(e) => setEditForm({ ...editForm, udyamRegistration: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Monthly Units Capacity
                  </label>
                  <input
                    type="number"
                    value={editForm.monthlyCapacityUnits}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        monthlyCapacityUnits: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Cooperative / SHG Society
                </label>
                <input
                  type="text"
                  value={editForm.cooperativeName}
                  onChange={(e) => setEditForm({ ...editForm, cooperativeName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-warm-border">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-warm-border text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-warm-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Workshop Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
