"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import AdsView from "@/components/dashboard/AdsView";

export default function AdsPage() {
  return (
    <DashboardLayoutWrapper activeTab="ads">
      {(_profile, handleSelectTab) => (
        <AdsView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
