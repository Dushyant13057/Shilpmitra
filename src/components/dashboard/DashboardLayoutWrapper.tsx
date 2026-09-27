"use client";

import { useEffect, useState, Suspense, ReactNode } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { BasicProfile, DashboardTab } from "@/types";
import { demoBasicInfoData } from "@/data/dashboardDemoData";
import { createClient, isSupabaseConfigured, withTimeout } from "@/lib/supabase/client";

interface DashboardLayoutWrapperProps {
  activeTab: DashboardTab;
  children: (
    profile: BasicProfile | null,
    handleSelectTab: (tab: DashboardTab) => void
  ) => ReactNode;
}

export function DashboardLayoutWrapperContent({
  activeTab,
  children,
}: DashboardLayoutWrapperProps) {
  const router = useRouter();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState<BasicProfile | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initializeSessionAndProfile() {
      if (!isSupabaseConfigured()) {
        if (isMounted) {
          setProfile(demoBasicInfoData);
          setAuthLoading(false);
        }
        return;
      }

      try {
        const supabase = createClient();
        const userResult = await withTimeout(
          supabase.auth.getUser(),
          2500,
          "Supabase auth check timed out"
        );
        const {
          data: { user },
          error: userError,
        } = userResult;

        if (userError || !user) {
          if (isMounted) {
            setProfile(demoBasicInfoData);
            setAuthLoading(false);
          }
          return;
        }

        if (!isMounted) return;

        const profileResult = await withTimeout(
          supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle(),
          2500,
          "Supabase profile fetch timed out"
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const profileRow = (profileResult as any)?.data;

        if (!isMounted) return;

        if (profileRow) {
          setProfile({
            fullName: profileRow.full_name || user.user_metadata?.full_name || "Artisan",
            email: user.email || "",
            contactNumber: profileRow.contact_number || user.user_metadata?.contact_number || "",
            gender: profileRow.gender || user.user_metadata?.gender || "Not Specified",
            dob: profileRow.date_of_birth || user.user_metadata?.date_of_birth || "1990-01-01",
            city: profileRow.city || user.user_metadata?.city || "",
            state: profileRow.state || user.user_metadata?.state || "",
            pinCode: profileRow.pin_code || user.user_metadata?.pin_code || "",
            isRegistered: true,
          });
        } else {
          setProfile({
            fullName: user.user_metadata?.full_name || "Artisan",
            email: user.email || "",
            contactNumber: user.user_metadata?.contact_number || "",
            gender: user.user_metadata?.gender || "Not Specified",
            dob: user.user_metadata?.date_of_birth || "1990-01-01",
            city: user.user_metadata?.city || "",
            state: user.user_metadata?.state || "",
            pinCode: user.user_metadata?.pin_code || "",
            isRegistered: true,
          });
        }
      } catch (err) {
        console.warn("[ShilpMitra Supabase] Session verification error or timeout:", err);
        if (isMounted) {
          setProfile(demoBasicInfoData);
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    }

    initializeSessionAndProfile();

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_OUT") {
          router.replace("/login");
        }
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSelectTab = (tab: DashboardTab) => {
    if (tab === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard?tab=${tab}`);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("[ShilpMitra Supabase] Logout error:", err);
      }
    }
    router.replace("/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200 flex items-center justify-center shadow-warm-sm mb-4">
          <div className="w-6 h-6 border-2 border-shilp-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="font-serif text-lg font-bold text-shilp-charcoal-900">
          Loading ShilpMitra Studio...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-shilp-charcoal-900 flex flex-col font-sans selection:bg-shilp-orange-500/20 selection:text-shilp-orange-900">
      <DashboardHeader
        profile={profile}
        onToggleMobileMenu={() => setMobileDrawerOpen((prev) => !prev)}
        onToggleDesktopSidebar={() => setSidebarCollapsed((prev) => !prev)}
        onSelectTab={handleSelectTab}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex w-full">
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          mobileOpen={mobileDrawerOpen}
          onCloseMobile={() => setMobileDrawerOpen(false)}
          onLogout={handleLogout}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {children(profile, handleSelectTab)}
          </div>
        </main>
      </div>

      <footer className="border-t border-warm-border py-4 bg-[#FFFEFC] text-center text-xs text-shilp-charcoal-500">
        <p>© {new Date().getFullYear()} ShilpMitra Artisan Studio • Verified Artisan Ecosystem</p>
      </footer>
    </div>
  );
}

export default function DashboardLayoutWrapper(props: DashboardLayoutWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-shilp-orange-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <DashboardLayoutWrapperContent {...props} />
    </Suspense>
  );
}
