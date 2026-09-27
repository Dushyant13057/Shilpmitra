"use client";

import { useState } from "react";
import {
  Settings,
  Globe,
  Bell,
  Lock,
  Save,
  CheckCircle2,
  Moon,
  Smartphone,
  Shield,
} from "lucide-react";

interface SettingsViewProps {
  onBackToDashboard?: () => void;
}

export default function SettingsView({ onBackToDashboard }: SettingsViewProps) {
  const [language, setLanguage] = useState("Hindi");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [orderSound, setOrderSound] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    setToastMessage("Preferences updated successfully.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              SETTINGS • WORKSPACE PREFERENCES
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Workspace Settings
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Configure your preferred regional language, notification channels, and order alerts.
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

      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-900 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="max-w-2xl space-y-5">
        {/* Language */}
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 space-y-4 shadow-warm-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-warm-border/60">
            <Globe className="w-4 h-4 text-shilp-orange-600" />
            <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
              Language & Regional Dialect
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {["Hindi", "English", "Bengali", "Gujarati", "Marathi", "Tamil"].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                  language === lang
                    ? "bg-shilp-orange-50 border-shilp-orange-300 text-shilp-orange-800 shadow-2xs"
                    : "border-warm-border hover:bg-stone-50 text-stone-700"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 space-y-4 shadow-warm-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-warm-border/60">
            <Bell className="w-4 h-4 text-shilp-orange-600" />
            <h3 className="font-serif text-base font-bold text-shilp-charcoal-900">
              Order Notifications & Alerts
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-warm-border cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">WhatsApp Order Alerts</span>
                <span className="text-stone-500">Receive instant order slip on WhatsApp</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 accent-shilp-orange-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-warm-border cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">SMS Order Confirmations</span>
                <span className="text-stone-500">Pickup dispatch notifications via SMS</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-shilp-orange-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-warm-border cursor-pointer">
              <div>
                <span className="font-bold text-stone-900 block">Audible Sahayak Chime</span>
                <span className="text-stone-500">Play alert sound when buyer order arrives</span>
              </div>
              <input
                type="checkbox"
                checked={orderSound}
                onChange={(e) => setOrderSound(e.target.checked)}
                className="w-4 h-4 accent-shilp-orange-500"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          className="w-full py-3 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-warm-xs transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
}
