import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Artisan Account — ShilpMitra",
  description: "Register your artisan profile with ShilpMitra to begin digitizing your handmade crafts with inclusive AI.",
};

export default function SignupPage() {
  return (
    <AuthLayout
      title="Empowering India's Heritage Craftspeople"
      subtitle="Register your basic artisan details to access your personal digital workspace, smart pricing, and Sahayak voice assistant."
      artisanQuote="“With ShilpMitra, I didn't need to learn complicated technology. My craft speaks for itself.”"
      artisanName="Lakshmi Devi"
      artisanRegion="Master Weaver, Varanasi, Uttar Pradesh"
    >
      <SignupForm />
    </AuthLayout>
  );
}
