"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import AIProductAssistantView from "@/components/dashboard/AIProductAssistantView";

export default function AIProductAssistantPage() {
  return (
    <DashboardLayoutWrapper activeTab="ai-product-assistant">
      {(_profile, handleSelectTab) => (
        <AIProductAssistantView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
