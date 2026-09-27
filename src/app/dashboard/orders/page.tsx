"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import OrdersView from "@/components/dashboard/OrdersView";

export default function OrdersPage() {
  return (
    <DashboardLayoutWrapper activeTab="orders">
      {(_profile, handleSelectTab) => (
        <OrdersView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
