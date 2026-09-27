import { Metadata } from "next";
import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Artisan Login — ShilpMitra",
  description: "Sign in to your ShilpMitra artisan workspace to manage listings, orders, and voice assistance.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Access Your Craft Workspace"
      subtitle="Welcome back! Continue managing your traditional products, checking orders, and speaking with Sahayak."
      artisanQuote="“With Sahayak voice assistance in Hindi, I can check my orders on the go without typing.”"
      artisanName="Ramesh Sharma"
      artisanRegion="Master Wood Carver, Saharanpur, Uttar Pradesh"
    >
      <Suspense fallback={<div className="p-8 text-center text-shilp-charcoal-500">Loading workspace login...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
