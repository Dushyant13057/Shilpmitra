"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  Edit3,
  ArrowLeft,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
} from "lucide-react";
import { BasicProfile } from "@/types";
import { demoBasicInfoData } from "@/data/dashboardDemoData";
import { INDIAN_STATES } from "@/data/indianStates";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface BasicInformationViewProps {
  profile?: BasicProfile | null;
  userId?: string;
  onProfileUpdated?: (updated: BasicProfile) => void;
  onBackToDashboard: () => void;
}

export default function BasicInformationView({
  profile,
  userId,
  onProfileUpdated,
  onBackToDashboard,
}: BasicInformationViewProps) {
  // Use session profile or safe demo fallback
  const effectiveProfile: BasicProfile = profile || demoBasicInfoData;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    fullName: effectiveProfile.fullName || "",
    contactNumber: effectiveProfile.contactNumber || "",
    gender: effectiveProfile.gender || "Male",
    dob: effectiveProfile.dob || "1990-01-01",
    city: effectiveProfile.city || "",
    state: effectiveProfile.state || "",
    pinCode: effectiveProfile.pinCode || "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sync edit form data when profile prop updates
  useEffect(() => {
    if (profile) {
      setEditFormData({
        fullName: profile.fullName || "",
        contactNumber: profile.contactNumber || "",
        gender: profile.gender || "Male",
        dob: profile.dob || "1990-01-01",
        city: profile.city || "",
        state: profile.state || "",
        pinCode: profile.pinCode || "",
      });
    }
  }, [profile]);

  const validateEditForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!editFormData.fullName.trim()) {
      errs.fullName = "Full name is required";
    } else if (editFormData.fullName.trim().length < 2) {
      errs.fullName = "Name must be at least 2 characters";
    }

    const cleanPhone = editFormData.contactNumber.replace(/\s|-/g, "");
    if (!cleanPhone) {
      errs.contactNumber = "Contact number is required";
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.contactNumber = "Enter a valid 10-digit Indian mobile number";
    }

    if (!editFormData.gender) {
      errs.gender = "Please select gender";
    }

    if (!editFormData.dob) {
      errs.dob = "Date of birth is required";
    }

    if (!editFormData.city.trim()) {
      errs.city = "City / District is required";
    }

    if (!editFormData.state) {
      errs.state = "Please select state";
    }

    if (!editFormData.pinCode.trim()) {
      errs.pinCode = "PIN Code is required";
    } else if (!/^[1-9][0-9]{5}$/.test(editFormData.pinCode.trim())) {
      errs.pinCode = "Enter a valid 6-digit Indian PIN code";
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEditForm()) return;

    setIsSaving(true);
    setSaveError(null);

    const updatedProfile: BasicProfile = {
      ...effectiveProfile,
      fullName: editFormData.fullName.trim(),
      contactNumber: editFormData.contactNumber.trim(),
      gender: editFormData.gender,
      dob: editFormData.dob,
      city: editFormData.city.trim(),
      state: editFormData.state,
      pinCode: editFormData.pinCode.trim(),
    };

    if (isSupabaseConfigured() && userId) {
      try {
        const supabase = createClient();

        // 1. Update public.profiles row
        const { error: dbError } = await supabase
          .from("profiles")
          .update({
            full_name: updatedProfile.fullName,
            contact_number: updatedProfile.contactNumber,
            gender: updatedProfile.gender,
            date_of_birth: updatedProfile.dob,
            city: updatedProfile.city,
            state: updatedProfile.state,
            pin_code: updatedProfile.pinCode,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (dbError) {
          throw new Error(dbError.message || "Failed to update profile record in database.");
        }

        // 2. Also update auth user metadata
        await supabase.auth.updateUser({
          data: {
            full_name: updatedProfile.fullName,
            contact_number: updatedProfile.contactNumber,
            gender: updatedProfile.gender,
            date_of_birth: updatedProfile.dob,
            city: updatedProfile.city,
            state: updatedProfile.state,
            pin_code: updatedProfile.pinCode,
          },
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unable to save profile changes.";
        setSaveError(message);
        setIsSaving(false);
        return;
      }
    }

    // Update parent state
    if (onProfileUpdated) {
      onProfileUpdated(updatedProfile);
    }

    setIsSaving(false);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const personalDetails = [
    {
      label: "Full Name",
      value: effectiveProfile.fullName || "Artisan",
      icon: User,
    },
    {
      label: "Email Address",
      value: effectiveProfile.email || "artisan@shilpmitra.com",
      icon: Mail,
    },
    {
      label: "Contact Number",
      value: effectiveProfile.contactNumber
        ? `+91 ${effectiveProfile.contactNumber}`
        : "+91 98765 43210",
      icon: Phone,
    },
    {
      label: "Gender",
      value: effectiveProfile.gender || "Not Specified",
      icon: User,
    },
    {
      label: "Date of Birth",
      value: effectiveProfile.dob || "1990-01-01",
      icon: Calendar,
    },
  ];

  const locationDetails = [
    {
      label: "City / District",
      value: effectiveProfile.city || "Demo City",
      icon: MapPin,
    },
    {
      label: "State / UT",
      value: effectiveProfile.state || "Demo State",
      icon: MapPin,
    },
    {
      label: "PIN Code",
      value: effectiveProfile.pinCode || "110001",
      icon: MapPin,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-warm-border">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-shilp-charcoal-500 hover:text-shilp-orange-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-shilp-orange-700 uppercase tracking-wider">
              Profile Management
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified Basic Setup
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 mt-1">
            Basic Information
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 max-w-xl mt-1">
            These are the 9 finalized demographic and location fields established during account creation.
          </p>
        </div>

        {/* Real Edit Button */}
        <div className="self-start sm:self-center">
          <button
            type="button"
            onClick={() => {
              setEditFormData({
                fullName: effectiveProfile.fullName || "",
                contactNumber: effectiveProfile.contactNumber || "",
                gender: effectiveProfile.gender || "Male",
                dob: effectiveProfile.dob || "1990-01-01",
                city: effectiveProfile.city || "",
                state: effectiveProfile.state || "",
                pinCode: effectiveProfile.pinCode || "",
              });
              setFormErrors({});
              setSaveError(null);
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-shilp-cream-100 hover:bg-shilp-orange-500 text-shilp-charcoal-800 hover:text-white font-semibold text-xs sm:text-sm border border-warm-border hover:border-transparent transition-all duration-200 shadow-xs"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Information</span>
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">Your basic profile information has been updated successfully!</span>
        </div>
      )}

      {/* Grid of Personal & Location Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Personal Details */}
        <div className="bg-[#FFFEFC] rounded-3xl p-6 sm:p-7 border border-warm-border shadow-warm-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-warm-border/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-shilp-orange-50 text-shilp-orange-600 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-lg font-bold text-shilp-charcoal-900">
                Personal Details
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-shilp-charcoal-400">
              5 Fields
            </span>
          </div>

          <div className="space-y-4">
            {personalDetails.map((field) => {
              const IconComp = field.icon;
              return (
                <div
                  key={field.label}
                  className="flex items-center justify-between p-3 rounded-xl bg-shilp-cream-100/50 border border-warm-border/40"
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4 text-shilp-charcoal-400 shrink-0" />
                    <div>
                      <p className="text-[11px] text-shilp-charcoal-500 font-medium">
                        {field.label}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-shilp-charcoal-900">
                        {field.value}
                      </p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 2: Location & Address */}
        <div className="bg-[#FFFEFC] rounded-3xl p-6 sm:p-7 border border-warm-border shadow-warm-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-warm-border/60 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-shilp-orange-50 text-shilp-orange-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="font-serif text-lg font-bold text-shilp-charcoal-900">
                  Location & Postal Code
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-shilp-charcoal-400">
                3 Fields
              </span>
            </div>

            <div className="space-y-4">
              {locationDetails.map((field) => {
                const IconComp = field.icon;
                return (
                  <div
                    key={field.label}
                    className="flex items-center justify-between p-3 rounded-xl bg-shilp-cream-100/50 border border-warm-border/40"
                  >
                    <div className="flex items-center gap-3">
                      <IconComp className="w-4 h-4 text-shilp-charcoal-400 shrink-0" />
                      <div>
                        <p className="text-[11px] text-shilp-charcoal-500 font-medium">
                          {field.label}
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-shilp-charcoal-900">
                          {field.value}
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Account Password Field Note */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2.5 mt-4">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Account Security (Field 9 of 9)</span>
              <span>Encrypted password created during registration. Password recovery is managed via Supabase Auth.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Banner Explaining Phase 2 Artisan & Business Profile Separation */}
      <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-warm-border text-xs text-shilp-charcoal-700 flex items-start gap-3">
        <Info className="w-5 h-5 text-shilp-orange-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-shilp-charcoal-900 block mb-0.5">
            Architecture Notice: Basic Information vs. Artisan & Business Profiles
          </span>
          <p className="text-shilp-charcoal-600 leading-relaxed">
            This screen displays only the <strong>9 finalized basic registration fields</strong> stored in Supabase PostgreSQL. The upcoming <strong>Artisan Profile</strong> (craft heritage, GI tags, guild affiliations) and <strong>Business Profile</strong> (workshop machinery, cooperative structure, production volume) are separate Phase 2 modules whose requirements are actively being finalized with craft stakeholders.
          </p>
        </div>
      </div>

      {/* ========================================================
          REAL EDIT BASIC INFORMATION MODAL (Requirement 14)
         ======================================================== */}
      {isEditing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
        >
          <div
            className="fixed inset-0"
            onClick={() => !isSaving && setIsEditing(false)}
          />
          <div className="relative w-full max-w-lg bg-[#FFFEFC] rounded-3xl p-6 sm:p-8 shadow-warm-xl border border-warm-border z-10 animate-in zoom-in-95 duration-150 my-8">
            {/* Close Button */}
            <button
              onClick={() => !isSaving && setIsEditing(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-shilp-charcoal-400 hover:text-shilp-charcoal-800 hover:bg-shilp-cream-100 transition-colors"
              aria-label="Close edit dialog"
              disabled={isSaving}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-5">
              <span className="text-[10px] font-bold text-shilp-orange-700 uppercase tracking-wider bg-shilp-orange-50 px-2.5 py-0.5 rounded-full border border-shilp-orange-200/60 inline-block mb-1">
                Profile Editor
              </span>
              <h3 id="edit-profile-title" className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900">
                Edit Basic Information
              </h3>
              <p className="text-xs text-shilp-charcoal-500 mt-0.5">
                Update your contact and workshop location details.
              </p>
            </div>

            {/* Error Banner */}
            {saveError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{saveError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-shilp-charcoal-800 mb-1">
                  Full Name <span className="text-shilp-orange-600">*</span>
                </label>
                <input
                  type="text"
                  value={editFormData.fullName}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                    formErrors.fullName ? "border-red-500" : "border-warm-border focus:border-shilp-orange-400"
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-red-600 mt-0.5">{formErrors.fullName}</p>
                )}
              </div>

              {/* Contact Number & Gender Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Contact Number */}
                <div>
                  <label className="block text-xs font-bold text-shilp-charcoal-800 mb-1">
                    Contact Number <span className="text-shilp-orange-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={editFormData.contactNumber}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, contactNumber: e.target.value }))
                    }
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                      formErrors.contactNumber ? "border-red-500" : "border-warm-border focus:border-shilp-orange-400"
                    }`}
                  />
                  {formErrors.contactNumber && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.contactNumber}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-shilp-charcoal-800 mb-1">
                    Gender <span className="text-shilp-orange-600">*</span>
                  </label>
                  <select
                    value={editFormData.gender}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-shilp-cream-50 border border-warm-border text-shilp-charcoal-900 focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-400"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-shilp-charcoal-800 mb-1">
                  Date of Birth <span className="text-shilp-orange-600">*</span>
                </label>
                <input
                  type="date"
                  value={editFormData.dob}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-shilp-cream-50 border border-warm-border text-shilp-charcoal-900 focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-400"
                />
              </div>

              {/* City & PIN Code Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-shilp-charcoal-800 mb-1">
                    City / District <span className="text-shilp-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.city}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                      formErrors.city ? "border-red-500" : "border-warm-border focus:border-shilp-orange-400"
                    }`}
                  />
                  {formErrors.city && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.city}</p>
                  )}
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-xs font-bold text-shilp-charcoal-800 mb-1">
                    PIN Code <span className="text-shilp-orange-600">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={editFormData.pinCode}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, pinCode: e.target.value.replace(/\D/g, "") }))
                    }
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                      formErrors.pinCode ? "border-red-500" : "border-warm-border focus:border-shilp-orange-400"
                    }`}
                  />
                  {formErrors.pinCode && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.pinCode}</p>
                  )}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold text-shilp-charcoal-800 mb-1">
                  State / Union Territory <span className="text-shilp-orange-600">*</span>
                </label>
                <select
                  value={editFormData.state}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-shilp-cream-50 border border-warm-border text-shilp-charcoal-900 focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-400"
                >
                  <option value="">Select State / UT</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st.code} value={st.name}>
                      {st.name} {st.type === "ut" ? "(UT)" : ""}
                    </option>
                  ))}
                </select>
                {formErrors.state && (
                  <p className="text-[11px] text-red-600 mt-0.5">{formErrors.state}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-warm-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-shilp-charcoal-600 hover:bg-shilp-cream-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs sm:text-sm shadow-warm-sm transition-colors disabled:opacity-60"
                >
                  {isSaving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
