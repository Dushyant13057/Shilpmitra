import { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — ShilpMitra",
  description: "Reset your ShilpMitra artisan account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Recover Your Artisan Account"
      subtitle="Enter your email to receive password reset instructions. Our support and Sahayak team are always here to help."
      artisanQuote="“Even if you forget your password, your craft portfolio and store are safe with ShilpMitra.”"
      artisanName="Govind Prajapati"
      artisanRegion="Master Potter, Kutch, Gujarat"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
