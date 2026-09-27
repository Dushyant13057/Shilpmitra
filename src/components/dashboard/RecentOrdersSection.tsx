"use client";

import { ArrowRight, ShoppingCart, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { demoOrdersData, DashboardOrder } from "@/data/dashboardDemoData";

interface RecentOrdersSectionProps {
  onViewAll: () => void;
}

export default function RecentOrdersSection({ onViewAll }: RecentOrdersSectionProps) {
  const getStatusBadge = (status: DashboardOrder["status"]) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Delivered</span>
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Processing</span>
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-shilp-orange-50 text-shilp-orange-800 border border-shilp-orange-200">
            <AlertCircle className="w-3 h-3 text-shilp-orange-600" />
            <span>Pending</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900">
            Recent Orders
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-shilp-orange-50 text-shilp-orange-700 border border-shilp-orange-200/60">
            {demoOrdersData.length} Recent
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-shilp-orange-600 hover:text-shilp-orange-700 hover:underline transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ========================================================
          1. DESKTOP / TABLET COMPACT TABLE
         ======================================================== */}
      <div className="hidden md:block bg-[#FFFEFC] rounded-2xl border border-warm-border shadow-warm-xs overflow-hidden">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#FAF6EE] text-shilp-charcoal-500 font-semibold border-b border-warm-border uppercase text-[11px] tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Order
              </th>
              <th scope="col" className="px-5 py-3.5">
                Product
              </th>
              <th scope="col" className="px-5 py-3.5">
                Destination
              </th>
              <th scope="col" className="px-5 py-3.5">
                Date
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Amount
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-border/60">
            {demoOrdersData.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-shilp-cream-100/60 transition-colors"
              >
                <td className="px-5 py-4 font-mono font-bold text-shilp-charcoal-900">
                  {order.orderNumber}
                </td>
                <td className="px-5 py-4 font-medium text-shilp-charcoal-800">
                  {order.productName}
                </td>
                <td className="px-5 py-4 text-shilp-charcoal-600">
                  {order.customerCity}
                </td>
                <td className="px-5 py-4 text-shilp-charcoal-500 text-xs">
                  {order.date}
                </td>
                <td className="px-5 py-4 text-right font-bold text-shilp-charcoal-900">
                  {order.amountFormatted}
                </td>
                <td className="px-5 py-4 text-right">
                  {getStatusBadge(order.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================================================
          2. MOBILE-FRIENDLY CARD LIST (Zero horizontal overflow)
         ======================================================== */}
      <div className="md:hidden space-y-3">
        {demoOrdersData.map((order) => (
          <div
            key={order.id}
            className="bg-[#FFFEFC] rounded-2xl p-4 border border-warm-border shadow-warm-xs space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm text-shilp-charcoal-900">
                {order.orderNumber}
              </span>
              {getStatusBadge(order.status)}
            </div>

            <div className="flex items-center justify-between text-xs text-shilp-charcoal-700">
              <span className="font-medium text-shilp-charcoal-900">
                {order.productName}
              </span>
              <span className="font-bold text-shilp-orange-600">
                {order.amountFormatted}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-shilp-charcoal-500 pt-2 border-t border-warm-border/50">
              <span>{order.customerCity}</span>
              <span>{order.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
