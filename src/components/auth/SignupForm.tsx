"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, UserCheck, Shield, Volume2, Square, Sparkles } from "lucide-react";
import { INDIAN_STATES } from "@/data/indianStates";
import { SignupFormData } from "@/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { speakText, stopSpeaking } from "@/lib/utils/speechUtils";

interface FormErrors {
  fullName?: string;
  email?: string;
  contactNumber?: string;
  gender?: string;
  dob?: string;
  password?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    contactNumber: "",
    gender: "",
    dob: "",
    password: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [guideLang, setGuideLang] = useState<"Hindi" | "English">("Hindi");

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleListenGuide = (customText?: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak =
      customText ||
      (guideLang === "Hindi"
        ? "नमस्ते! शिल्पमित्र में नया कारीगर खाता बनाने के लिए कृपया अपना पूरा नाम, ईमेल, 10 अंकों का मोबाइल नंबर, जन्म तिथि, गुप्त पासवर्ड और अपना शहर व राज्य दर्ज करें।"
        : "Namaste! To create an artisan account on ShilpMitra, enter your full name, email, 10-digit mobile number, date of birth, secure password, city, and state.");

    setIsSpeaking(true);
    speakText(textToSpeak, guideLang, () => {
      setIsSpeaking(false);
    });
  };

  // Password strength check
  const passwordCriteria = {
    hasMinLength: formData.password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecial: /[^a-zA-Z0-9]/.test(formData.password),
  };

  const getPasswordStrength = () => {
    if (!formData.password) return { label: "", percent: 0, color: "bg-stone-300" };
    let score = 0;
    if (passwordCriteria.hasMinLength) score += 25;
    if (passwordCriteria.hasLetter) score += 25;
    if (passwordCriteria.hasNumber) score += 25;
    if (passwordCriteria.hasSpecial) score += 25;

    if (score <= 50) return { label: "Weak", percent: 35, color: "bg-amber-500" };
    if (score === 75) return { label: "Good", percent: 75, color: "bg-shilp-orange-500" };
    return { label: "Strong", percent: 100, color: "bg-emerald-600" };
  };

  const validateField = (name: keyof SignupFormData, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        if (value.trim().length > 100) return "Name cannot exceed 100 characters";
        return undefined;

      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address (e.g. name@domain.com)";
        }
        return undefined;

      case "contactNumber": {
        const cleanPhone = value.replace(/\s|-/g, "");
        if (!cleanPhone) return "Contact number is required";
        if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
          return "Enter a valid 10-digit Indian mobile number starting with 6-9";
        }
        return undefined;
      }

      case "gender":
        if (!value) return "Please select your gender";
        return undefined;

      case "dob": {
        if (!value) return "Date of birth is required";
        const selectedDate = new Date(value);
        const today = new Date();
        if (isNaN(selectedDate.getTime())) return "Please enter a valid date";
        if (selectedDate > today) return "Date of birth cannot be in the future";
        // Check minimum age of 14 years
        const ageDifMs = today.getTime() - selectedDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 14) return "Artisan must be at least 14 years of age to register";
        return undefined;
      }

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters long";
        if (!/[a-zA-Z]/.test(value)) return "Password must contain at least one letter";
        if (!/[0-9]/.test(value)) return "Password must contain at least one number";
        return undefined;

      case "city":
        if (!value.trim()) return "City / Village / District is required";
        if (value.trim().length < 2) return "City must be at least 2 characters";
        return undefined;

      case "state":
        if (!value) return "Please select your state or union territory";
        return undefined;

      case "pinCode":
        if (!value.trim()) return "PIN Code is required";
        if (!/^[1-9][0-9]{5}$/.test(value.trim())) {
          return "Enter a valid 6-digit Indian PIN code (cannot start with 0)";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof SignupFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (
    field: keyof SignupFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched: Record<string, boolean> = {};
    const newErrors: FormErrors = {};
    let hasError = false;

    (Object.keys(formData) as Array<keyof SignupFormData>).forEach((key) => {
      allTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasError = true;
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);

    if (hasError) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    // Step 1: Create Supabase Auth user using email + password
    setIsSubmitting(true);
    setServerError(null);

    if (!isSupabaseConfigured()) {
      setServerError(
        "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing in .env.local. Please configure them in your environment to complete live account registration."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            contact_number: formData.contactNumber.trim(),
            gender: formData.gender,
            date_of_birth: formData.dob,
            city: formData.city.trim(),
            state: formData.state,
            pin_code: formData.pinCode.trim(),
          },
        },
      });

      if (authError) {
        if (
          authError.message.toLowerCase().includes("already registered") ||
          authError.message.toLowerCase().includes("already exists")
        ) {
          setServerError("An artisan account with this email already exists. Please log in instead.");
        } else if (authError.message.toLowerCase().includes("rate limit")) {
          setServerError(
            "Supabase built-in email rate limit reached. To sign up instantly without email restrictions, turn OFF 'Confirm email' in your Supabase Dashboard: Authentication -> Providers -> Email -> Toggle 'Confirm email' OFF -> Save."
          );
        } else {
          setServerError(authError.message || "Unable to register account. Please check your details.");
        }
        setIsSubmitting(false);
        return;
      }

      // Step 2, 3, 4: Upsert basic profile record linked to auth.users id
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: authData.user.id,
          full_name: formData.fullName.trim(),
          contact_number: formData.contactNumber.trim(),
          gender: formData.gender,
          date_of_birth: formData.dob,
          city: formData.city.trim(),
          state: formData.state,
          pin_code: formData.pinCode.trim(),
          role: "artisan",
          status: "active",
        });

        if (profileError) {
          console.warn("[ShilpMitra Supabase] Profile upsert notice:", profileError.message);
        }
      }

      // Check if session was returned or email verification is required
      if (authData.session) {
        setSuccessMessage("Account created successfully! Preparing your digital workspace...");
        setTimeout(() => {
          setIsSubmitting(false);
          router.push("/dashboard");
        }, 1200);
      } else {
        setSuccessMessage("Account created! Please check your email to verify your account, or sign in now.");
        setTimeout(() => {
          setIsSubmitting(false);
          router.push("/login?registered=true");
        }, 1800);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected network or server error occurred.";
      setServerError(errorMsg);
      setIsSubmitting(false);
    }
  };

  const strength = getPasswordStrength();

  return (
    <div className="w-full max-w-2xl bg-[#FFFEFC] rounded-3xl p-6 sm:p-8 md:p-10 shadow-warm-lg border border-warm-border">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold tracking-widest text-shilp-orange-600 uppercase">
            Step 1 • Basic Registration
          </span>
          <span className="text-xs text-shilp-charcoal-400">
            All fields marked <span className="text-shilp-orange-600 font-bold">*</span> are required
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-shilp-charcoal-900 tracking-tight">
          Create Your Artisan Account
        </h2>
        <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1">
          Join thousands of Indian craftspeople taking their heritage digital.
        </p>
      </div>

      {/* Sahayak Voice Guide Card */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-shilp-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-shilp-charcoal-900">
              शिल्प सहायक Voice Guide
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setGuideLang("Hindi")}
              className={`px-2 py-0.5 rounded-full font-medium transition-colors ${
                guideLang === "Hindi"
                  ? "bg-shilp-orange-500 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setGuideLang("English")}
              className={`px-2 py-0.5 rounded-full font-medium transition-colors ${
                guideLang === "English"
                  ? "bg-shilp-orange-500 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <p className="text-xs text-shilp-charcoal-700 leading-relaxed mb-3">
          {guideLang === "Hindi"
            ? "नमस्ते कारीगर साथी! खाता बनाने के लिए अपना नाम, ईमेल, संपर्क नंबर व राज्य चुनें। सहायता के लिए नीचे बटन दबाकर निर्देश सुनें।"
            : "Namaste! To create your artisan account, provide your basic details. Tap below to listen to step-by-step guidance."}
        </p>

        <button
          type="button"
          onClick={() => handleListenGuide()}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            isSpeaking
              ? "bg-red-500 text-white hover:bg-red-600 shadow-sm"
              : "bg-shilp-orange-100/90 text-shilp-orange-800 hover:bg-shilp-orange-200/90"
          }`}
        >
          {isSpeaking ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop Voice / आवाज रोकें</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>🔊 Listen Registration Guide / निर्देश सुनें ({guideLang === "Hindi" ? "हिन्दी" : "English"})</span>
            </>
          )}
        </button>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/80 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-shilp-orange-600 shrink-0" />
          <div className="text-xs sm:text-sm font-semibold text-shilp-charcoal-900">
            {successMessage}
          </div>
        </div>
      )}

      {/* Server Error Banner */}
      {serverError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">Registration Error</span>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Row 1: Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Full Name */}
          <div>
            <label
              htmlFor="field-fullName"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              Full Name <span className="text-shilp-orange-600">*</span>
            </label>
            <input
              id="field-fullName"
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="e.g. Ramesh Sharma"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.fullName && touched.fullName
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "error-fullName" : undefined}
            />
            {errors.fullName && touched.fullName && (
              <p id="error-fullName" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* 2. Email */}
          <div>
            <label
              htmlFor="field-email"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              Email Address <span className="text-shilp-orange-600">*</span>
            </label>
            <input
              id="field-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="artisan@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.email && touched.email
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "error-email" : undefined}
            />
            {errors.email && touched.email && (
              <p id="error-email" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Contact Number & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 3. Contact Number */}
          <div>
            <label
              htmlFor="field-contactNumber"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              Contact Number <span className="text-shilp-orange-600">*</span>
            </label>
            <div className="relative flex rounded-xl border border-warm-border focus-within:ring-2 focus-within:ring-shilp-orange-500/20 focus-within:border-shilp-orange-400 overflow-hidden bg-shilp-cream-50">
              <span className="inline-flex items-center px-3 bg-shilp-cream-200/60 text-xs font-bold text-shilp-charcoal-700 border-r border-warm-border select-none">
                +91
              </span>
              <input
                id="field-contactNumber"
                type="tel"
                name="contactNumber"
                autoComplete="tel-national"
                placeholder="9876543210"
                maxLength={10}
                value={formData.contactNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  handleChange("contactNumber", val);
                }}
                onBlur={() => handleBlur("contactNumber")}
                className="w-full px-3 py-2.5 text-sm bg-transparent text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 focus:outline-none"
                aria-invalid={!!errors.contactNumber}
                aria-describedby={errors.contactNumber ? "error-contactNumber" : undefined}
              />
            </div>
            {errors.contactNumber && touched.contactNumber && (
              <p id="error-contactNumber" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.contactNumber}</span>
              </p>
            )}
          </div>

          {/* 4. Gender */}
          <div>
            <label
              htmlFor="field-gender"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              Gender <span className="text-shilp-orange-600">*</span>
            </label>
            <select
              id="field-gender"
              name="gender"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              onBlur={() => handleBlur("gender")}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.gender && touched.gender
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.gender}
              aria-describedby={errors.gender ? "error-gender" : undefined}
            >
              <option value="">Select Gender</option>
              <option value="Female">Female (महिला)</option>
              <option value="Male">Male (पुरुष)</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && touched.gender && (
              <p id="error-gender" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.gender}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Date of Birth & Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 5. Date of Birth */}
          <div>
            <label
              htmlFor="field-dob"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              Date of Birth <span className="text-shilp-orange-600">*</span>
            </label>
            <input
              id="field-dob"
              type="date"
              name="dob"
              value={formData.dob}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleChange("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.dob && touched.dob
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.dob}
              aria-describedby={errors.dob ? "error-dob" : undefined}
            />
            {errors.dob && touched.dob && (
              <p id="error-dob" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.dob}</span>
              </p>
            )}
          </div>

          {/* 6. Password */}
          <div>
            <label
              htmlFor="field-password"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              Password <span className="text-shilp-orange-600">*</span>
            </label>
            <div className="relative">
              <input
                id="field-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                  errors.password && touched.password
                    ? "border-red-500 bg-red-50/20"
                    : "border-warm-border focus:border-shilp-orange-400"
                }`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "error-password" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-shilp-charcoal-400 hover:text-shilp-charcoal-700 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p id="error-password" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>
        </div>

        {/* Password Strength Requirement Checklist */}
        {formData.password && (
          <div className="p-3 bg-shilp-cream-100/80 rounded-xl border border-warm-border/60 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-shilp-charcoal-700">Password Strength:</span>
              <span className="font-bold text-shilp-orange-700">{strength.label}</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-shilp-charcoal-600">
              <span className={`flex items-center gap-1 ${passwordCriteria.hasMinLength ? "text-emerald-700 font-semibold" : ""}`}>
                <CheckCircle2 className={`w-3 h-3 ${passwordCriteria.hasMinLength ? "text-emerald-600" : "text-stone-300"}`} />
                <span>8+ Characters</span>
              </span>
              <span className={`flex items-center gap-1 ${passwordCriteria.hasLetter ? "text-emerald-700 font-semibold" : ""}`}>
                <CheckCircle2 className={`w-3 h-3 ${passwordCriteria.hasLetter ? "text-emerald-600" : "text-stone-300"}`} />
                <span>At least one letter</span>
              </span>
              <span className={`flex items-center gap-1 ${passwordCriteria.hasNumber ? "text-emerald-700 font-semibold" : ""}`}>
                <CheckCircle2 className={`w-3 h-3 ${passwordCriteria.hasNumber ? "text-emerald-600" : "text-stone-300"}`} />
                <span>At least one number</span>
              </span>
              <span className={`flex items-center gap-1 ${passwordCriteria.hasSpecial ? "text-emerald-700 font-semibold" : ""}`}>
                <CheckCircle2 className={`w-3 h-3 ${passwordCriteria.hasSpecial ? "text-emerald-600" : "text-stone-300"}`} />
                <span>Special character</span>
              </span>
            </div>
          </div>
        )}

        {/* Row 4: City, State, PIN Code (3 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 7. City */}
          <div>
            <label
              htmlFor="field-city"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              City / District <span className="text-shilp-orange-600">*</span>
            </label>
            <input
              id="field-city"
              type="text"
              name="city"
              placeholder="e.g. Varanasi"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.city && touched.city
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "error-city" : undefined}
            />
            {errors.city && touched.city && (
              <p id="error-city" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          {/* 8. State */}
          <div>
            <label
              htmlFor="field-state"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              State / UT <span className="text-shilp-orange-600">*</span>
            </label>
            <select
              id="field-state"
              name="state"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              onBlur={() => handleBlur("state")}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.state && touched.state
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? "error-state" : undefined}
            >
              <option value="">Select State</option>
              <optgroup label="States">
                {INDIAN_STATES.filter((s) => s.type === "state").map((state) => (
                  <option key={state.code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Union Territories">
                {INDIAN_STATES.filter((s) => s.type === "ut").map((ut) => (
                  <option key={ut.code} value={ut.name}>
                    {ut.name}
                  </option>
                ))}
              </optgroup>
            </select>
            {errors.state && touched.state && (
              <p id="error-state" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.state}</span>
              </p>
            )}
          </div>

          {/* 9. PIN Code */}
          <div>
            <label
              htmlFor="field-pinCode"
              className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
            >
              PIN Code <span className="text-shilp-orange-600">*</span>
            </label>
            <input
              id="field-pinCode"
              type="text"
              name="pinCode"
              placeholder="e.g. 221001"
              maxLength={6}
              value={formData.pinCode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                handleChange("pinCode", val);
              }}
              onBlur={() => handleBlur("pinCode")}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.pinCode && touched.pinCode
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.pinCode}
              aria-describedby={errors.pinCode ? "error-pinCode" : undefined}
            />
            {errors.pinCode && touched.pinCode && (
              <p id="error-pinCode" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.pinCode}</span>
              </p>
            )}
          </div>
        </div>

        {/* Terms notice */}
        <p className="text-[11px] text-shilp-charcoal-500 leading-normal pt-1">
          By creating an account, you agree to ShilpMitra&apos;s artisan community guidelines and digital commerce principles.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 active:bg-shilp-orange-700 text-white font-semibold text-sm sm:text-base shadow-warm hover:shadow-warm-lg transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying Details...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="pt-2 text-center text-xs sm:text-sm text-shilp-charcoal-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-shilp-orange-600 hover:text-shilp-orange-700 underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
