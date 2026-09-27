"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Wand2,
  FileText,
  BookOpen,
  TrendingUp,
  ShoppingBag,
  Megaphone,
  Mic,
  Package,
  ShoppingCart,
  User,
  ShieldCheck,
  Hammer,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

interface NavItemConfig {
  id: DashboardTab | "logout";
  label: string;
  icon: React.ElementType;
  badge?: string;
  isAction?: boolean;
}

interface NavSection {
  title: string;
  items: NavItemConfig[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "DASHBOARD",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "AI TOOLS",
    items: [
      {
        id: "image-enhancement",
        label: "Image Enhancement",
        icon: Wand2,
        badge: "AI",
      },
      {
        id: "ai-description",
        label: "AI Product Assistant",
        icon: Sparkles,
        badge: "Voice • AI",
      },
      {
        id: "price-analysis",
        label: "Price Analysis",
        icon: TrendingUp,
        badge: "AI",
      },
    ],
  },
  {
    title: "COMMERCE",
    items: [
      {
        id: "marketplace",
        label: "Marketplace",
        icon: ShoppingBag,
        badge: "Ready",
      },
      {
        id: "ads",
        label: "Ads",
        icon: Megaphone,
        badge: "Active",
      },
    ],
  },
  {
    title: "SAHAYAK",
    items: [
      {
        id: "sahayak",
        label: "Shilp Sahayak",
        icon: Mic,
        badge: "Voice",
      },
    ],
  },
  {
    title: "MY WORKSPACE",
    items: [
      {
        id: "products",
        label: "Products",
        icon: Package,
        badge: "Demo",
      },
      {
        id: "orders",
        label: "Orders",
        icon: ShoppingCart,
        badge: "Demo",
      },
    ],
  },
  {
    title: "PROFILE",
    items: [
      {
        id: "my-profile",
        label: "My Profile",
        icon: User,
      },
      {
        id: "basic-info",
        label: "Basic Information",
        icon: ShieldCheck,
        badge: "Active",
      },
      {
        id: "artisan-profile",
        label: "Artisan Profile",
        icon: Hammer,
        badge: "Active",
      },
      {
        id: "business-profile",
        label: "Business Profile",
        icon: Building2,
        badge: "Active",
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
      {
        id: "logout",
        label: "Logout",
        icon: LogOut,
        isAction: true,
      },
    ],
  },
];

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  onLogout,
}: DashboardSidebarProps) {
  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        onCloseMobile();
      }
    };
    if (mobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen, onCloseMobile]);

  const handleItemClick = (id: DashboardTab | "logout") => {
    if (id === "logout") {
      if (mobileOpen) onCloseMobile();
      onLogout();
      return;
    }
    onSelectTab(id);
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  // Reusable Nav Content rendering
  const renderNavContent = (isMobile: boolean = false) => {
    const isCollapsed = !isMobile && collapsed;

    return (
      <div className="flex flex-col h-full justify-between">
        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              {/* Section Header */}
              {(!isCollapsed || isMobile) && (
                <p className="px-3 text-[10px] font-bold text-shilp-charcoal-400 tracking-wider uppercase mb-1.5 select-none">
                  {section.title}
                </p>
              )}

              {/* Items in this section */}
              {section.items.map((item) => {
                const IconComponent = item.icon;
                const isActive =
                  activeTab === item.id ||
                  (item.id === "ai-description" &&
                    (activeTab === "story-generator" || activeTab === "ai-product-assistant"));

                return (
                  <div key={item.id} className="relative group">
                    <button
                      type="button"
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 select-none ${
                        isCollapsed ? "justify-center" : "justify-between"
                      } ${
                        isActive
                          ? "bg-shilp-orange-50 text-shilp-orange-600 font-semibold shadow-xs"
                          : "text-shilp-charcoal-700 hover:text-shilp-orange-600 hover:bg-shilp-cream-100/80"
                      }`}
                      title={isCollapsed ? item.label : undefined}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <IconComponent
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isActive
                              ? "text-shilp-orange-500 scale-105"
                              : "text-shilp-charcoal-500 group-hover:text-shilp-orange-600 group-hover:scale-105"
                          }`}
                        />
                        {(!isCollapsed || isMobile) && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {/* Badge if present and expanded */}
                      {(!isCollapsed || isMobile) && item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold shrink-0 uppercase tracking-wide ${
                            item.badge === "Active"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : item.badge === "AI"
                              ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                              : "bg-shilp-orange-50 text-shilp-orange-700 border border-shilp-orange-200/50"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>

                    {/* Tooltip for collapsed desktop mode */}
                    {isCollapsed && (
                      <div className="hidden md:group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-shilp-charcoal-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50 items-center gap-1.5 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] bg-white/20 px-1 rounded text-shilp-orange-200">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Actions: Logout & Collapse Toggle */}
        <div className="p-3 border-t border-warm-border space-y-1.5 bg-[#FAF6EE]/50">
          {/* Logout Action */}
          <div className="relative group">
            <button
              type="button"
              onClick={onLogout}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-shilp-charcoal-700 hover:text-red-700 hover:bg-red-50/70 transition-colors select-none ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-4 h-4 text-shilp-charcoal-500 group-hover:text-red-600 shrink-0" />
              {(!isCollapsed || isMobile) && <span>Logout</span>}
            </button>
            {isCollapsed && (
              <div className="hidden md:group-hover:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 bg-shilp-charcoal-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                Logout
              </div>
            )}
          </div>

          {/* Desktop Collapse / Expand Toggle Button */}
          {!isMobile && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className={`w-full hidden md:flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-shilp-charcoal-500 hover:text-shilp-orange-600 hover:bg-shilp-cream-100 transition-colors ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 shrink-0" />
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-medium">Collapse Menu</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ========================================================
          1. DESKTOP SIDEBAR (EXPANDABLE / COLLAPSIBLE)
          Resizes naturally, never overlaps main content.
         ======================================================== */}
      <aside
        className={`hidden md:flex flex-col bg-[#FFFEFC] border-r border-warm-border shrink-0 transition-all duration-300 z-30 select-none ${
          collapsed ? "w-20" : "w-64"
        }`}
        style={{ height: "calc(100vh - 4.5rem)", position: "sticky", top: "4.5rem" }}
        aria-label="Artisan Workspace Sidebar"
      >
        {renderNavContent(false)}
      </aside>

      {/* ========================================================
          2. MOBILE SLIDE-IN DRAWER
          Slide-in navigation drawer with backdrop & close button.
         ======================================================== */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Slide-in Drawer Container */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#FFFEFC] shadow-warm-xl border-r border-warm-border z-10 flex flex-col animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-warm-border bg-[#FDFBF7]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-shilp-orange-500 flex items-center justify-center text-white shadow-warm-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-base font-bold text-shilp-charcoal-900 block leading-tight">
                    Shilp<span className="text-shilp-orange-500">Mitra</span>
                  </span>
                  <span className="text-[10px] text-shilp-charcoal-500 uppercase tracking-wider">
                    Workspace Menu
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-shilp-charcoal-500 hover:text-shilp-charcoal-900 hover:bg-shilp-cream-100 transition-colors"
                aria-label="Close menu drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-hidden">
              {renderNavContent(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
