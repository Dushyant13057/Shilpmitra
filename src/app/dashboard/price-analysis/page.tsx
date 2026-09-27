"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import PriceAnalysisView from "@/components/dashboard/PriceAnalysisView";

export default function PriceAnalysisPage() {
  return (
    <DashboardLayoutWrapper activeTab="price-analysis">
      {(_profile, handleSelectTab) => (
        <PriceAnalysisView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
