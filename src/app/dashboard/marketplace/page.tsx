"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import MarketplaceView from "@/components/dashboard/MarketplaceView";

export default function MarketplacePage() {
  return (
    <DashboardLayoutWrapper activeTab="marketplace">
      {(_profile, handleSelectTab) => (
        <MarketplaceView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
