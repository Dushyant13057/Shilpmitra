"use client";

import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import ProductsView from "@/components/dashboard/ProductsView";

export default function ProductsPage() {
  return (
    <DashboardLayoutWrapper activeTab="products">
      {(_profile, handleSelectTab) => (
        <ProductsView
          onBackToDashboard={() => handleSelectTab("dashboard")}
          onNavigateTab={handleSelectTab}
        />
      )}
    </DashboardLayoutWrapper>
  );
}
