"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import ShilpSahayakView from "@/components/dashboard/ShilpSahayakView";

export default function SahayakPage() {
  return (
    <DashboardLayoutWrapper activeTab="sahayak">
      {(_profile, handleSelectTab) => (
        <ShilpSahayakView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
