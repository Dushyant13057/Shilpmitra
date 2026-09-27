"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ArtisanOverviewCard from "@/components/dashboard/ArtisanOverviewCard";
import QuickStatsGrid from "@/components/dashboard/QuickStatsGrid";
import MyProductsSection from "@/components/dashboard/MyProductsSection";
import RecentOrdersSection from "@/components/dashboard/RecentOrdersSection";
import dynamic from "next/dynamic";
import AIToolsShowcaseSection from "@/components/dashboard/AIToolsShowcaseSection";

const ViewLoadingFallback = () => (
  <div className="p-8 text-center text-shilp-charcoal-400 text-xs flex items-center justify-center gap-2">
    <div className="w-4 h-4 border-2 border-shilp-orange-500 border-t-transparent rounded-full animate-spin" />
    <span>Loading workspace module...</span>
  </div>
);

import VoiceCommandCompanion from "@/components/voice/VoiceCommandCompanion";

const BasicInformationView = dynamic(() => import("@/components/dashboard/BasicInformationView"), { loading: ViewLoadingFallback });
const ImageEnhancementView = dynamic(() => import("@/components/dashboard/ImageEnhancementView"), { loading: ViewLoadingFallback });
const AIProductAssistantView = dynamic(() => import("@/components/dashboard/AIProductAssistantView"), { loading: ViewLoadingFallback });
const PriceAnalysisView = dynamic(() => import("@/components/dashboard/PriceAnalysisView"), { loading: ViewLoadingFallback });
const MarketplaceView = dynamic(() => import("@/components/dashboard/MarketplaceView"), { loading: ViewLoadingFallback });
const AdsView = dynamic(() => import("@/components/dashboard/AdsView"), { loading: ViewLoadingFallback });
const ShilpSahayakView = dynamic(() => import("@/components/dashboard/ShilpSahayakView"), { loading: ViewLoadingFallback });
const ProductsView = dynamic(() => import("@/components/dashboard/ProductsView"), { loading: ViewLoadingFallback });
const OrdersView = dynamic(() => import("@/components/dashboard/OrdersView"), { loading: ViewLoadingFallback });
const ArtisanProfileView = dynamic(() => import("@/components/dashboard/ArtisanProfileView"), { loading: ViewLoadingFallback });
const BusinessProfileView = dynamic(() => import("@/components/dashboard/BusinessProfileView"), { loading: ViewLoadingFallback });
const SettingsView = dynamic(() => import("@/components/dashboard/SettingsView"), { loading: ViewLoadingFallback });
import { BasicProfile, DashboardTab } from "@/types";
import { demoBasicInfoData } from "@/data/dashboardDemoData";
import { createClient, isSupabaseConfigured, withTimeout } from "@/lib/supabase/client";
import { AlertCircle, Sparkles, Key } from "lucide-react";
import Link from "next/link";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab state synced with URL search params or fallback "dashboard"
  const tabParam = (searchParams.get("tab") as DashboardTab) || "dashboard";
  const [activeTab, setActiveTab] = useState<DashboardTab>(tabParam);

  // Sidebar responsive states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Supabase Auth & Profile states
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState<BasicProfile | null>(null);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [supabaseMissing, setSupabaseMissing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initializeSessionAndProfile() {
      if (!isSupabaseConfigured()) {
        if (isMounted) {
          setSupabaseMissing(true);
          setAuthLoading(false);
          // Fallback to demo profile if Supabase keys aren't set yet
          setProfile(demoBasicInfoData);
        }
        return;
      }

      try {
        const supabase = createClient();

        // 1. Get authenticated user with timeout
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
        setUserId(user.id);

        // 2. Fetch profile from public.profiles with timeout
        const profileResult = await withTimeout(
          supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle(),
          2500,
          "Supabase profile query timed out"
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
          // Fallback to user metadata if profile row is pending trigger
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
        console.warn("[ShilpMitra Supabase] Dashboard session check error or timeout:", err);
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

    // Listen to Supabase auth events
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

  // Sync state if tabParam changes
  useEffect(() => {
    if (tabParam === "image-enhancement") {
      router.replace("/dashboard/image-enhancement");
    } else if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab, router]);

  const handleSelectTab = (tab: DashboardTab) => {
    if (tab === "image-enhancement") {
      router.push("/dashboard/image-enhancement");
      return;
    }
    setActiveTab(tab);
    const url = tab === "dashboard" ? "/dashboard" : `/dashboard?tab=${tab}`;
    router.replace(url, { scroll: false });
  };

  // Real Supabase Logout (Requirement 10)
  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("[ShilpMitra Supabase] Logout error:", err);
      }
    }
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("shilpmitra_demo_profile");
    }
    router.replace("/login");
  };

  const handleProfileUpdated = (updated: BasicProfile) => {
    setProfile(updated);
  };

  // Safe greeting name (Requirement 7 & 12: uses real authenticated profile name)
  const artisanGreetingName = profile?.fullName
    ? profile.fullName.split(" ")[0]
    : "Artisan";

  // Loading state (Requirement 21)
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200 flex items-center justify-center shadow-warm-sm mb-4">
          <div className="w-6 h-6 border-2 border-shilp-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="font-serif text-lg font-bold text-shilp-charcoal-900">
          Verifying Artisan Session...
        </p>
        <p className="text-xs text-shilp-charcoal-500 mt-1">
          Loading your ShilpMitra workspace
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-shilp-charcoal-900 flex flex-col font-sans selection:bg-shilp-orange-500/20 selection:text-shilp-orange-900">
      {/* 1. TOP HEADER */}
      <DashboardHeader
        profile={profile}
        onToggleMobileMenu={() => setMobileDrawerOpen((prev) => !prev)}
        onToggleDesktopSidebar={() => setSidebarCollapsed((prev) => !prev)}
        onSelectTab={handleSelectTab}
        onLogout={handleLogout}
      />

      {/* Supabase Environment Notice (Displayed only if keys are not configured yet) */}
      {supabaseMissing && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Key className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Supabase Setup Required:</strong> Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code> to activate live Supabase Authentication and PostgreSQL profiles.
            </span>
          </div>
        </div>
      )}

      {/* 2. BODY LAYOUT: LEFT SIDEBAR + MAIN WORKSPACE */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          mobileOpen={mobileDrawerOpen}
          onCloseMobile={() => setMobileDrawerOpen(false)}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Voice Welcome & Command Companion */}
            <VoiceCommandCompanion
              artisanName={artisanGreetingName}
              onNavigateTab={handleSelectTab}
              onLogout={handleLogout}
              autoWelcome={true}
            />

            {/* VIEW A: MAIN DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <>
                {/* Welcome Section */}
                <section className="space-y-1">
                  <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
                    ARTISAN WORKSPACE
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-shilp-charcoal-900 tracking-tight">
                    Welcome back, {artisanGreetingName}
                  </h1>
                  <p className="text-xs sm:text-sm text-shilp-charcoal-600 max-w-xl">
                    Manage your craft, products and orders from one place.
                  </p>
                </section>

                {/* Artisan Overview Card (Displays real authenticated profile & dynamic completion) */}
                <ArtisanOverviewCard
                  profile={profile}
                  onViewBasicInfo={() => handleSelectTab("basic-info")}
                />

                {/* Quick Statistics (Demo values preserved as requested in Requirement 12 & 17) */}
                <section className="space-y-2">
                  <h2 className="text-xs font-bold text-shilp-charcoal-400 uppercase tracking-wider">
                    Quick Overview
                  </h2>
                  <QuickStatsGrid onSelectTab={handleSelectTab} />
                </section>

                {/* My Products Section */}
                <MyProductsSection
                  onViewAll={() => handleSelectTab("products")}
                />

                {/* Recent Orders Section */}
                <RecentOrdersSection
                  onViewAll={() => handleSelectTab("orders")}
                />

                {/* AI Tools Showcase Section (Requirement 11) */}
                <AIToolsShowcaseSection
                  onSelectTab={handleSelectTab}
                />
              </>
            )}

            {/* VIEW B: BASIC INFORMATION / PROFILE */}
            {(activeTab === "basic-info" || activeTab === "my-profile") && (
              <BasicInformationView
                profile={profile}
                userId={userId}
                onProfileUpdated={handleProfileUpdated}
                onBackToDashboard={() => handleSelectTab("dashboard")}
              />
            )}

            {/* VIEW C: AI TOOLS - IMAGE ENHANCEMENT */}
            {activeTab === "image-enhancement" && (
              <ImageEnhancementView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW D: AI PRODUCT CREATION ASSISTANT (Merged AI Description & Story) */}
            {(activeTab === "ai-description" ||
              activeTab === "ai-product-assistant" ||
              activeTab === "story-generator") && (
              <AIProductAssistantView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW F: PRICE ANALYSIS */}
            {activeTab === "price-analysis" && (
              <PriceAnalysisView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW G: MARKETPLACE */}
            {activeTab === "marketplace" && (
              <MarketplaceView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW H: ADS */}
            {activeTab === "ads" && (
              <AdsView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW I: SHILP SAHAYAK */}
            {activeTab === "sahayak" && (
              <ShilpSahayakView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW J: MY PRODUCTS */}
            {activeTab === "products" && (
              <ProductsView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW K: ORDERS */}
            {activeTab === "orders" && (
              <OrdersView
                onBackToDashboard={() => handleSelectTab("dashboard")}
                onNavigateTab={handleSelectTab}
              />
            )}

            {/* VIEW L: ARTISAN PROFILE */}
            {activeTab === "artisan-profile" && (
              <ArtisanProfileView
                profile={profile}
                onBackToDashboard={() => handleSelectTab("dashboard")}
              />
            )}

            {/* VIEW M: BUSINESS PROFILE */}
            {activeTab === "business-profile" && (
              <BusinessProfileView
                profile={profile}
                onBackToDashboard={() => handleSelectTab("dashboard")}
              />
            )}

            {/* VIEW N: SETTINGS */}
            {activeTab === "settings" && (
              <SettingsView
                onBackToDashboard={() => handleSelectTab("dashboard")}
              />
            )}
          </div>
        </main>
      </div>

      {/* Minimal Footer */}
      <footer className="border-t border-warm-border py-4 bg-[#FFFEFC] text-center text-xs text-shilp-charcoal-500">
        <p>© {new Date().getFullYear()} ShilpMitra Artisan Studio • Supabase Auth Integrated</p>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-shilp-orange-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
