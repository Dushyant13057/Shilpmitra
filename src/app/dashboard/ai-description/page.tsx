"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import AIProductAssistantView from "@/components/dashboard/AIProductAssistantView";

export default function AIDescriptionPage() {
  return (
    <DashboardLayoutWrapper activeTab="ai-description">
      {(_profile, handleSelectTab) => (
        <AIProductAssistantView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
