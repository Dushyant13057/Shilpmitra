"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Box,
  Eye,
  Check,
  Printer,
  X,
  Search,
  Filter,
  ArrowRight,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface OrdersViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

export type OrderStatus =
  | "New"
  | "Stock Verification"
  | "Preparing"
  | "Ready for Pickup"
  | "Completed";

interface OrderItem {
  id: string;
  orderNumber: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  shippingAddress: string;
  quantity: number;
  amount: number;
  amountFormatted: string;
  status: OrderStatus;
  date: string;
  imageUrl: string;
  paymentMethod: string;
}

export default function OrdersView({ onBackToDashboard, onNavigateTab }: OrdersViewProps) {
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "ord-1",
      orderNumber: "#SM1024",
      productName: "Handcrafted Terracotta Earthen Pot",
      customerName: "Aarav Sharma",
      customerPhone: "+91 98201 44521",
      customerCity: "Jaipur, Rajasthan",
      shippingAddress: "Flat 402, Royal Residency, C-Scheme, Jaipur 302001",
      quantity: 1,
      amount: 850,
      amountFormatted: "₹850",
      status: "Stock Verification",
      date: "25 Sep 2026",
      imageUrl: "/images/terracotta-craft.jpg",
      paymentMethod: "Prepaid UPI (Verified)",
    },
    {
      id: "ord-2",
      orderNumber: "#SM1025",
      productName: "Master Wood-Carved Keepsake Box",
      customerName: "Priyanka Nair",
      customerPhone: "+91 97402 11984",
      customerCity: "Bengaluru, Karnataka",
      shippingAddress: "12/4, 2nd Cross, Indiranagar, Bengaluru 560038",
      quantity: 1,
      amount: 1200,
      amountFormatted: "₹1,200",
      status: "New",
      date: "26 Sep 2026",
      imageUrl: "/images/wood-handicraft.jpg",
      paymentMethod: "Prepaid Card (Razorpay)",
    },
    {
      id: "ord-3",
      orderNumber: "#SM1023",
      productName: "Organic Handwoven Artisan Tote Bag",
      customerName: "Rohan Patel",
      customerPhone: "+91 99099 33210",
      customerCity: "Ahmedabad, Gujarat",
      shippingAddress: "B-501, Shivalik Heights, Bodakdev, Ahmedabad 380054",
      quantity: 2,
      amount: 1900,
      amountFormatted: "₹1,900",
      status: "Preparing",
      date: "23 Sep 2026",
      imageUrl: "/images/craft-weaving.jpg",
      paymentMethod: "Prepaid UPI (Verified)",
    },
    {
      id: "ord-4",
      orderNumber: "#SM1021",
      productName: "Dhokra Bell Metal Figurine",
      customerName: "Sneha Mukherjee",
      customerPhone: "+91 98310 77412",
      customerCity: "Kolkata, West Bengal",
      shippingAddress: "88/A Southern Avenue, Keyatala, Kolkata 700029",
      quantity: 1,
      amount: 1650,
      amountFormatted: "₹1,650",
      status: "Ready for Pickup",
      date: "22 Sep 2026",
      imageUrl: "/images/craft-brass.jpg",
      paymentMethod: "Prepaid NetBanking",
    },
    {
      id: "ord-5",
      orderNumber: "#SM1019",
      productName: "Handcrafted Terracotta Earthen Pot",
      customerName: "Ananya Deshmukh",
      customerPhone: "+91 94220 55198",
      customerCity: "Pune, Maharashtra",
      shippingAddress: "Bungalow 7, Koregaon Park Lane 3, Pune 411001",
      quantity: 1,
      amount: 850,
      amountFormatted: "₹850",
      status: "Completed",
      date: "19 Sep 2026",
      imageUrl: "/images/terracotta-craft.jpg",
      paymentMethod: "Delivered & Settled",
    },
  ]);

  // Filters & State
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status progression action
  const advanceOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: nextStatus });
    }
    showToast(`Order status updated to "${nextStatus}".`);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "New":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>New</span>
          </span>
        );
      case "Stock Verification":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Stock Verification</span>
          </span>
        );
      case "Preparing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-shilp-orange-50 text-shilp-orange-800 border border-shilp-orange-200">
            <Box className="w-3 h-3 text-shilp-orange-600" />
            <span>Preparing</span>
          </span>
        );
      case "Ready for Pickup":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Truck className="w-3 h-3 text-indigo-600" />
            <span>Ready for Pickup</span>
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter =
      activeStatusFilter === "All" || o.status === activeStatusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              MY WORKSPACE • FULFILLMENT PIPELINE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              {orders.length} Total Orders
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Artisan Orders & Logistics
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Track incoming buyer orders, verify handmade inventory, and manage secure logistics pickup.
          </p>
        </div>

        {onBackToDashboard && (
          <button
            type="button"
            onClick={onBackToDashboard}
            className="self-start sm:self-auto px-3.5 py-2 text-xs font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-700 bg-white border border-warm-border rounded-xl hover:bg-shilp-cream-50 transition-colors"
          >
            ← Back to Overview
          </button>
        )}
      </div>

      {/* 2. Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 3. Search and Status Filter Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order # or customer..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-warm-border bg-[#FFFEFC] focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 text-shilp-charcoal-900"
          />
        </div>

        {/* Status Filters (Requirement 9) */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-shilp-cream-100 rounded-xl border border-warm-border self-start sm:self-auto text-xs max-w-full">
          {[
            "All",
            "New",
            "Stock Verification",
            "Preparing",
            "Ready for Pickup",
            "Completed",
          ].map((statusTab) => (
            <button
              key={statusTab}
              type="button"
              onClick={() => setActiveStatusFilter(statusTab)}
              className={`px-3 py-1 rounded-lg font-semibold text-[11px] whitespace-nowrap transition-colors ${
                activeStatusFilter === statusTab
                  ? "bg-white text-shilp-charcoal-900 shadow-xs"
                  : "text-shilp-charcoal-600 hover:text-shilp-charcoal-900"
              }`}
            >
              {statusTab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Orders Table (Desktop) & Cards (Mobile) */}
      <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl overflow-hidden shadow-warm-xs">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FAF6EE] text-shilp-charcoal-500 font-semibold border-b border-warm-border uppercase text-[11px] tracking-wider">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Order ID
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Product
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Customer
                </th>
                <th scope="col" className="px-5 py-3.5 text-center">
                  Qty
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Amount
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-border/60">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-shilp-cream-100/50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4 font-mono font-bold text-shilp-charcoal-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-stone-100 border border-warm-border shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={order.imageUrl}
                          alt={order.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-shilp-charcoal-900 line-clamp-1">
                        {order.productName}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-medium text-stone-900 block">{order.customerName}</span>
                    <span className="text-[11px] text-stone-500">{order.customerCity}</span>
                  </td>
                  <td className="px-5 py-4 text-center font-bold text-stone-700">
                    {order.quantity}
                  </td>
                  <td className="px-5 py-4 font-bold text-shilp-orange-600">
                    {order.amountFormatted}
                  </td>
                  <td className="px-5 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="px-3 py-1 rounded-lg bg-shilp-cream-100 hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 font-semibold text-xs border border-warm-border"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-warm-border">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="p-4 space-y-3 cursor-pointer hover:bg-shilp-cream-50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-stone-900">
                  {order.orderNumber}
                </span>
                {getStatusBadge(order.status)}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-warm-border shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={order.imageUrl}
                    alt={order.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-xs text-stone-900 block truncate">
                    {order.productName}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {order.customerName} • {order.customerCity}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-shilp-orange-600 text-xs">
                      {order.amountFormatted}
                    </span>
                    <span className="text-[10px] text-stone-400">Qty: {order.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ORDER DETAILS MODAL / DRAWER (Requirement 9) */}
      {selectedOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-[#FFFEFC] rounded-3xl max-w-lg w-full border border-warm-border shadow-warm-xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-warm-border bg-[#FDFBF7]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-base text-shilp-charcoal-900">
                    {selectedOrder.orderNumber}
                  </span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <span className="text-[11px] text-stone-500">Placed on {selectedOrder.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-stone-500 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Product Info */}
              <div className="p-3.5 rounded-2xl bg-shilp-cream-50 border border-warm-border flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-warm-border shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedOrder.imageUrl}
                    alt={selectedOrder.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-sm text-stone-900 block truncate">
                    {selectedOrder.productName}
                  </span>
                  <span className="text-xs text-stone-600 block">
                    Quantity: {selectedOrder.quantity} unit
                  </span>
                  <span className="text-sm font-bold text-shilp-orange-600 block mt-0.5">
                    {selectedOrder.amountFormatted} • {selectedOrder.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Customer & Shipping Details */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-stone-50 border border-warm-border text-xs">
                <span className="font-bold text-stone-700 block uppercase tracking-wide text-[10px]">
                  Buyer & Shipping Information
                </span>
                <div className="flex items-center gap-2 text-stone-900 font-semibold">
                  <span>{selectedOrder.customerName}</span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-stone-400" />
                    {selectedOrder.customerPhone}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-stone-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{selectedOrder.shippingAddress}</span>
                </div>
              </div>

              {/* Status Progression Workflow Buttons */}
              <div className="space-y-2 pt-2 border-t border-warm-border">
                <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                  Fulfillment Actions
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {selectedOrder.status === "New" && (
                    <button
                      type="button"
                      onClick={() => advanceOrderStatus(selectedOrder.id, "Stock Verification")}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-warm-xs"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Start Stock Check</span>
                    </button>
                  )}

                  {selectedOrder.status === "Stock Verification" && (
                    <button
                      type="button"
                      onClick={() => advanceOrderStatus(selectedOrder.id, "Preparing")}
                      className="w-full py-2 px-3 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-warm-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Stock Verified → Pack</span>
                    </button>
                  )}

                  {selectedOrder.status === "Preparing" && (
                    <button
                      type="button"
                      onClick={() => advanceOrderStatus(selectedOrder.id, "Ready for Pickup")}
                      className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-warm-xs"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Mark Ready for Pickup</span>
                    </button>
                  )}

                  {selectedOrder.status === "Ready for Pickup" && (
                    <button
                      type="button"
                      onClick={() => advanceOrderStatus(selectedOrder.id, "Completed")}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-warm-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Delivered</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => showToast(`Printing packing slip for ${selectedOrder.orderNumber}...`)}
                    className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-warm-border"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-500" />
                    <span>Print Packing Slip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
