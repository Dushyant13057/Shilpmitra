"use client";

import { useState } from "react";
import {
  Hammer,
  ShieldCheck,
  Edit3,
  Award,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  X,
  Save,
  Users,
  Feather,
} from "lucide-react";
import { BasicProfile } from "@/types";

interface ArtisanProfileViewProps {
  profile?: BasicProfile | null;
  onBackToDashboard?: () => void;
}

export default function ArtisanProfileView({
  profile,
  onBackToDashboard,
}: ArtisanProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Artisan Profile State
  const [artisanData, setArtisanData] = useState({
    artisanName: profile?.fullName || "Rameshwar Kumbhakar",
    craftCategory: "Terracotta Pottery & Relief Art",
    craftCluster: "Bankura & Bishnupur GI Cluster",
    region: `${profile?.city || "Bankura"}, ${profile?.state || "West Bengal"}`,
    pehchanCardId: "WB-BNK-2018-84920",
    vishwakarmaId: "PMV-2024-991823",
    yearsOfExperience: 24,
    lineage: "3rd Generation Master Potter (Apprenticed under Grandfather Haradhan Kumbhakar)",
    masterSkills: [
      "Open-pit smoke kiln firing with rice husk insulation",
      "Traditional heavy flywheel throwing without electric motors",
      "Delicate floral jaali openwork relief carving on leather-hard clay",
      "All-natural river silt preparation and organic iron-oxide mineral slip",
    ],
    awards: [
      "State Handicrafts Master Craftsman Merit Award (2019)",
      "National Vishwakarma Guild Excellence Certification (2024)",
    ],
    apprenticesTrained: 14,
  });

  const [editForm, setEditForm] = useState({ ...artisanData });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setArtisanData({ ...editForm });
    setIsEditing(false);
    showToast("Artisan Profile updated successfully.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              ARTISAN PROFILE • HERITAGE IDENTITY
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Verified Artisan
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Artisan Craft Profile
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Your certified artisan identity, generational lineage, traditional techniques, and government Pehchan recognition.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setEditForm({ ...artisanData });
              setIsEditing(true);
            }}
            className="px-4 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs shadow-warm-xs flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Artisan Profile</span>
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

      {/* 2. Success Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. Main Profile Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pehchan Digital ID Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-[#2D231E] to-[#1A1412] text-white rounded-3xl p-6 shadow-warm-lg border border-stone-800 space-y-4 relative overflow-hidden">
            {/* Background watermark */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
              <Hammer className="w-48 h-48 text-white" />
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-stone-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-shilp-orange-400" />
                <span className="text-[11px] font-bold tracking-wider uppercase text-shilp-orange-300">
                  SHILPMITRA ARTISAN PEHCHAN
                </span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono">
                ACTIVE
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400 uppercase tracking-wider block">
                MASTER ARTISAN
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">
                {artisanData.artisanName}
              </h2>
              <span className="text-xs text-shilp-orange-300 block font-medium">
                {artisanData.craftCategory}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-stone-700/60">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wide block">
                  PEHCHAN CARD ID
                </span>
                <span className="font-mono text-xs font-semibold text-stone-200">
                  {artisanData.pehchanCardId}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wide block">
                  VISHWAKARMA REG.
                </span>
                <span className="font-mono text-xs font-semibold text-stone-200">
                  {artisanData.vishwakarmaId}
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs border-t border-stone-700/60 flex items-center justify-between text-stone-300">
              <span>Cluster: {artisanData.craftCluster}</span>
              <span>{artisanData.yearsOfExperience} Yrs Exp.</span>
            </div>
          </div>

          {/* Profile Completion Indicator */}
          <div className="p-4 rounded-2xl bg-[#FFFEFC] border border-warm-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-shilp-charcoal-800">Profile Completion</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                92% Completed
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
              <div className="w-[92%] h-full bg-emerald-500 rounded-full" />
            </div>
            <span className="text-[11px] text-stone-500 block">
              Government GI linking and workshop awards verified.
            </span>
          </div>
        </div>

        {/* Right: Detailed Sections (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Section 1: Lineage & Heritage */}
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 space-y-4 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-warm-border/60">
              <Feather className="w-4 h-4 text-shilp-orange-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Craft Lineage & Tradition
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed font-medium">
              {artisanData.lineage}
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-shilp-orange-600" /> {artisanData.region}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-shilp-orange-600" /> {artisanData.apprenticesTrained} apprentices trained
              </span>
            </div>
          </div>

          {/* Section 2: Master Techniques */}
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 space-y-3.5 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-warm-border/60">
              <Hammer className="w-4 h-4 text-shilp-orange-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Ancestral Techniques Mastered
              </h3>
            </div>
            <ul className="space-y-2.5">
              {artisanData.masterSkills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-shilp-charcoal-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-shilp-orange-500 shrink-0 mt-1.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: State & National Recognitions */}
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 space-y-3.5 shadow-warm-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-warm-border/60">
              <Award className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
                Awards & Guild Recognitions
              </h3>
            </div>
            <ul className="space-y-2">
              {artisanData.awards.map((award, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs font-semibold text-amber-950 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
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
                  Edit Artisan Profile
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
                  Artisan Full Name
                </label>
                <input
                  type="text"
                  value={editForm.artisanName}
                  onChange={(e) => setEditForm({ ...editForm, artisanName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Craft Tradition
                  </label>
                  <input
                    type="text"
                    value={editForm.craftCategory}
                    onChange={(e) => setEditForm({ ...editForm, craftCategory: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    value={editForm.yearsOfExperience}
                    onChange={(e) =>
                      setEditForm({ ...editForm, yearsOfExperience: Number(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  GI Cluster / Geographical Region
                </label>
                <input
                  type="text"
                  value={editForm.craftCluster}
                  onChange={(e) => setEditForm({ ...editForm, craftCluster: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Pehchan Card Number
                </label>
                <input
                  type="text"
                  value={editForm.pehchanCardId}
                  onChange={(e) => setEditForm({ ...editForm, pehchanCardId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ancestral Lineage Summary
                </label>
                <textarea
                  rows={2}
                  value={editForm.lineage}
                  onChange={(e) => setEditForm({ ...editForm, lineage: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-border bg-stone-50 focus:bg-white focus:outline-none resize-none"
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
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
