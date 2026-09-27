"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      return "Email address is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const err = validate();
    setError(err);

    if (err) return;

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${origin}/login`,
        });
      }
    } catch (authError) {
      console.warn("[ShilpMitra Supabase] Password reset notice:", authError);
    } finally {
      setIsSubmitting(false);
      // Always show success state without revealing whether email exists
      setIsSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#FFFEFC] rounded-3xl p-6 sm:p-8 md:p-10 shadow-warm-lg border border-warm-border">
      {!isSubmitted ? (
        <>
          {/* Header */}
          <div className="mb-6">
            <span className="text-[11px] font-bold tracking-widest text-shilp-orange-600 uppercase block mb-1">
              Account Recovery
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-shilp-charcoal-900 tracking-tight">
              Reset Your Password
            </h2>
            <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1">
              Enter your registered artisan email address, and we will send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="field-forgot-email"
                className="block text-xs font-bold text-shilp-charcoal-800 mb-1.5"
              >
                Registered Email Address <span className="text-shilp-orange-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="field-forgot-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="artisan@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched) {
                      setError(validate());
                    }
                  }}
                  onBlur={() => {
                    setTouched(true);
                    setError(validate());
                  }}
                  className={`w-full px-3.5 py-2.5 pl-10 text-sm rounded-xl bg-shilp-cream-50 border text-shilp-charcoal-900 placeholder:text-shilp-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 ${
                    error && touched
                      ? "border-red-500 bg-red-50/20"
                      : "border-warm-border focus:border-shilp-orange-400"
                  }`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "error-forgot-email" : undefined}
                />
                <Mail className="w-4 h-4 text-shilp-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {error && touched && (
                <p id="error-forgot-email" className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{error}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-6 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 active:bg-shilp-orange-700 text-white font-semibold text-sm sm:text-base shadow-warm hover:shadow-warm-lg transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Instructions...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Instructions</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-3 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-600 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        </>
      ) : (
        /* Demo Success State */
        <div className="text-center py-2 animate-in fade-in">
          <div className="w-14 h-14 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200/80 flex items-center justify-center text-shilp-orange-600 mx-auto mb-4 shadow-warm-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-shilp-charcoal-900 mb-2">
            Check Your Email
          </h3>

          <p className="text-xs sm:text-sm text-shilp-charcoal-600 leading-relaxed mb-6">
            Password reset instructions will be sent to{" "}
            <strong className="text-shilp-charcoal-900 font-bold">{email}</strong>.
            Please check your inbox as well as your spam folder.
          </p>

          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full py-3 px-5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-sm shadow-warm flex items-center justify-center gap-2 transition-colors"
            >
              <span>Return to Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
                setTouched(false);
              }}
              className="text-xs text-shilp-charcoal-500 hover:text-shilp-orange-600 underline underline-offset-4"
            >
              Resend to a different email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
