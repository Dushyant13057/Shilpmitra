"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, AlertCircle, ArrowRight, CheckCircle2, User, Volume2, Square, Sparkles, Mic, MicOff } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { speakText, stopSpeaking, startSpeechRecognition, isSpeechRecognitionSupported } from "@/lib/utils/speechUtils";
import { useRef } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isJustRegistered = searchParams.get("registered") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [registeredNotice, setRegisteredNotice] = useState(isJustRegistered);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const [guideLang, setGuideLang] = useState<"Hindi" | "English">("Hindi");
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  const handleListenGuide = (customText?: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak =
      customText ||
      (guideLang === "Hindi"
        ? "नमस्ते! शिल्पमित्र में आपका स्वागत है। लॉगिन करने के लिए अपना पंजीकृत ईमेल आईडी और गुप्त पासवर्ड दर्ज करें, फिर लॉगिन बटन दबाएं।"
        : "Namaste! Welcome to ShilpMitra. To log in, please enter your registered email ID and password, then click the login button.");

    setIsSpeaking(true);
    speakText(textToSpeak, guideLang, () => {
      setIsSpeaking(false);
    });
  };

  const handleToggleVoiceCommand = () => {
    setVoiceFeedback(null);

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setVoiceFeedback("Voice recognition is not supported in this browser.");
      return;
    }

    setIsListening(true);
    setVoiceFeedback(guideLang === "Hindi" ? "बोलिए... (जैसे 'साइन अप', 'मदद', या 'लॉगिन')" : "Listening... (say 'Sign up', 'Help', or 'Login')");

    const controller = startSpeechRecognition(
      guideLang,
      (transcript) => {
        const lower = transcript.toLowerCase().trim();
        setIsListening(false);

        if (lower.includes("sign up") || lower.includes("signup") || lower.includes("register") || lower.includes("साइन अप") || lower.includes("खाता")) {
          setVoiceFeedback(guideLang === "Hindi" ? "साइन अप पेज पर जाया जा रहा है..." : "Opening Sign up page...");
          speakText(guideLang === "Hindi" ? "साइन अप पेज खोला जा रहा है" : "Navigating to Sign up", guideLang, () => {
            router.push("/signup");
          });
        } else if (lower.includes("forgot") || lower.includes("password") || lower.includes("पासवर्ड")) {
          setVoiceFeedback(guideLang === "Hindi" ? "पासवर्ड रिकवरी पेज पर जाया जा रहा है..." : "Opening Forgot password page...");
          speakText(guideLang === "Hindi" ? "पासवर्ड रिकवरी पेज खोला जा रहा है" : "Opening Password Recovery", guideLang, () => {
            router.push("/forgot-password");
          });
        } else if (lower.includes("help") || lower.includes("मदद") || lower.includes("सहायता") || lower.includes("guide")) {
          handleListenGuide();
        } else if (lower.includes("login") || lower.includes("लॉगिन")) {
          setVoiceFeedback(guideLang === "Hindi" ? "लॉगिन किया जा रहा है..." : "Submitting login...");
          // Submit form programmatically
          const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
          handleSubmit(fakeEvent);
        } else {
          setVoiceFeedback(`'${transcript}' सुना। 'साइन अप', 'मदद', या 'लॉगिन' बोलें।`);
        }
      },
      (errorMsg) => {
        setVoiceFeedback(errorMsg);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    recognitionRef.current = controller;
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setAuthError(null);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    if (!isSupabaseConfigured()) {
      setAuthError(
        "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing in .env.local. Please configure them to enable real authentication."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (
          error.message.toLowerCase().includes("email not confirmed") ||
          error.code === "email_not_confirmed"
        ) {
          setAuthError(
            "Your email address has not been confirmed yet. Please check your email inbox for the verification link, or confirm this user in your Supabase Dashboard."
          );
        } else {
          setAuthError("Invalid email or password. Please check your credentials and try again.");
        }
        setIsSubmitting(false);
        return;
      }

      if (data.session) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("shilpmitra_welcome_speech_pending", "true");
        }
        router.push("/dashboard");
      } else {
        setAuthError("Unable to establish session. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An unexpected authentication error occurred.";
      setAuthError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#FFFEFC] rounded-3xl p-6 sm:p-8 md:p-10 shadow-warm-lg border border-warm-border">
      {/* Header */}
      <div className="mb-5">
        <span className="text-[11px] font-bold tracking-widest text-shilp-orange-600 uppercase block mb-1">
          Artisan Login
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-shilp-charcoal-900 tracking-tight">
          Welcome to Your Workspace
        </h2>
        <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1">
          Sign in to manage your craft listings, orders, and Sahayak voice assistant.
        </p>
      </div>

      {/* Sahayak Voice Guide Card */}
      <div className="mb-6 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs">
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

        <p className="text-xs text-shilp-charcoal-700 leading-relaxed mb-2.5">
          {guideLang === "Hindi"
            ? "नमस्ते! अपने शिल्पमित्र खाते में लॉगिन करने के लिए ईमेल व पासवर्ड भरें।"
            : "Namaste! Enter your registered email and password to enter your artisan workspace."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleListenGuide()}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
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
                <span>🔊 Listen ({guideLang === "Hindi" ? "हिन्दी" : "EN"})</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleVoiceCommand}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white shadow-xs"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-3.5 h-3.5" />
                <span>Listening... बोलिए</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5" />
                <span>🎤 बोलकर कमांड दें</span>
              </>
            )}
          </button>
        </div>

        {voiceFeedback && (
          <div className="mt-2.5 p-2 rounded-xl bg-amber-100/90 border border-amber-300 text-[11px] text-amber-900 flex items-center justify-between animate-in fade-in">
            <span>{voiceFeedback}</span>
            <button
              type="button"
              onClick={() => setVoiceFeedback(null)}
              className="text-stone-600 hover:text-stone-900 text-[10px] underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Registration Success Banner */}
      {registeredNotice && (
        <div className="mb-6 p-3.5 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/80 flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-shilp-orange-600 shrink-0 mt-0.5" />
          <div className="text-xs text-shilp-charcoal-800">
            <span className="font-bold block">Account created successfully!</span>
            <span>Enter your password to access your artisan dashboard.</span>
          </div>
        </div>
      )}

      {/* Auth Error Banner */}
      {authError && (
        <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">Authentication Failed</span>
            <span>{authError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="field-login-email"
            className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
          >
            Email Address <span className="text-shilp-orange-600">*</span>
          </label>
          <input
            id="field-login-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="artisan@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) {
                const errs = validate();
                setErrors((prev) => ({ ...prev, email: errs.email }));
              }
            }}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, email: true }));
              const errs = validate();
              setErrors((prev) => ({ ...prev, email: errs.email }));
            }}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
              errors.email && touched.email
                ? "border-red-500 bg-red-50/20"
                : "border-warm-border focus:border-shilp-orange-400"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "error-login-email" : undefined}
          />
          {errors.email && touched.email && (
            <p id="error-login-email" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="field-login-password"
              className="block text-xs font-bold text-shilp-charcoal-800"
            >
              Password <span className="text-shilp-orange-600">*</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-shilp-orange-600 hover:text-shilp-orange-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="field-login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (touched.password) {
                  const errs = validate();
                  setErrors((prev) => ({ ...prev, password: errs.password }));
                }
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, password: true }));
                const errs = validate();
                setErrors((prev) => ({ ...prev, password: errs.password }));
              }}
              className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                errors.password && touched.password
                  ? "border-red-500 bg-red-50/20"
                  : "border-warm-border focus:border-shilp-orange-400"
              }`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "error-login-password" : undefined}
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
            <p id="error-login-password" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 py-3.5 px-6 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 active:bg-shilp-orange-700 text-white font-semibold text-sm sm:text-base shadow-warm hover:shadow-warm-lg transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Entering Workspace...</span>
            </>
          ) : (
            <>
              <span>Login to Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Sign Up Link */}
        <div className="pt-3 text-center text-xs sm:text-sm text-shilp-charcoal-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-shilp-orange-600 hover:text-shilp-orange-700 underline underline-offset-4"
          >
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
