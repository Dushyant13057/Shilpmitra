"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import AIProductAssistantView from "@/components/dashboard/AIProductAssistantView";

export default function StoryGeneratorPage() {
  return (
    <DashboardLayoutWrapper activeTab="story-generator">
      {(_profile, handleSelectTab) => (
        <AIProductAssistantView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
