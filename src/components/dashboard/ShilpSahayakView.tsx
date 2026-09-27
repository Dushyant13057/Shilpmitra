"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mic,
  Send,
  Sparkles,
  Wand2,
  FileText,
  BookOpen,
  TrendingUp,
  Package,
  ShoppingCart,
  Volume2,
  VolumeX,
  Languages,
  ArrowRight,
  Bot,
  User,
} from "lucide-react";
import { DashboardTab } from "@/types";

interface ShilpSahayakViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

interface Message {
  id: string;
  sender: "sahayak" | "artisan";
  text: string;
  actionTab?: DashboardTab;
  actionLabel?: string;
  timestamp: string;
}

export default function ShilpSahayakView({
  onBackToDashboard,
  onNavigateTab,
}: ShilpSahayakViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "sahayak",
      text: "Namaste! Main Shilp Sahayak hoon. Aaj main aapke product ko market ke liye ready karne mein madad karunga.",
      timestamp: "Just now",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Hindi");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Quick Action Handler
  const handleQuickAction = (
    label: string,
    prompt: string,
    reply: string,
    actionTab?: DashboardTab,
    actionLabel?: string
  ) => {
    const userMsg: Message = {
      id: "artisan-" + Date.now(),
      sender: "artisan",
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const sahayakMsg: Message = {
        id: "sahayak-" + Date.now(),
        sender: "sahayak",
        text: reply,
        actionTab,
        actionLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, sahayakMsg]);
    }, 450);
  };

  // Text input submission
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");

    const userMsg: Message = {
      id: "artisan-" + Date.now(),
      sender: "artisan",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simple deterministic intent matcher
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let reply = "Aapka message mil gaya. Main aapki handicrafts selling aur digital cataloging mein madad kar sakta hoon.";
      let actionTab: DashboardTab | undefined;
      let actionLabel: string | undefined;

      if (lower.includes("photo") || lower.includes("image") || lower.includes("picture") || lower.includes("tasveer")) {
        reply = "Product ki photo enhance karne ke liye hamara AI Vision Studio use karein. Yeh lighting aur craft textures ko instantly sharp banata hai.";
        actionTab = "image-enhancement";
        actionLabel = "Open Image Studio";
      } else if (lower.includes("price") || lower.includes("daam") || lower.includes("cost") || lower.includes("rate")) {
        reply = "Fair Price Calculator se aap raw material aur labor hours ke hisaab se sahi selling price nikaal sakte hain.";
        actionTab = "price-analysis";
        actionLabel = "Open Price Calculator";
      } else if (lower.includes("description") || lower.includes("vivaran") || lower.includes("listing")) {
        reply = "AI Description Generator se aapke craft ke liye search-optimized title aur bullet points instantly taiyar ho jaate hain.";
        actionTab = "ai-description";
        actionLabel = "Open AI Description";
      } else if (lower.includes("story") || lower.includes("kahani") || lower.includes("heritage")) {
        reply = "Story Generator aapke parivar ki generational art aur craft techniques ki aisi kahani banata hai jo buyers ko impress kare.";
        actionTab = "story-generator";
        actionLabel = "Open Story Generator";
      } else if (lower.includes("order") || lower.includes("dispatch") || lower.includes("delivery")) {
        reply = "Aapke paas 4 active orders hain. Order fulfillment tab par jakar stock verify aur pickup schedule kar sakte hain.";
        actionTab = "orders";
        actionLabel = "View Orders";
      } else if (lower.includes("product") || lower.includes("saman") || lower.includes("catalog")) {
        reply = "Aapke catalog mein 12 products listed hain. Naya product add karne ke liye niche button par click karein.";
        actionTab = "products";
        actionLabel = "Open My Products";
      } else {
        reply = "Main Shilp Sahayak hoon! Aap mujhse photo enhancement, pricing calculation, craft storytelling ya orders ke bare mein kabhi bhi pooch sakte hain.";
      }

      const sahayakMsg: Message = {
        id: "sahayak-" + Date.now(),
        sender: "sahayak",
        text: reply,
        actionTab,
        actionLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, sahayakMsg]);
    }, 500);
  };

  // Simulated Voice Toggle
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInputText("Mera product photo market ke liye enhance karo");
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              SAHAYAK • VOICE & CHAT CO-PILOT
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              Voice Architecture Ready
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Shilp Sahayak
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Aapka apna digital sahayak — products list karne, photos sudharne, fair daam tay karne aur orders track karne ke liye.
          </p>
        </div>

        {/* Language selector & back button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#FFFEFC] border border-warm-border rounded-xl px-2.5 py-1.5 text-xs text-shilp-charcoal-700">
            <Languages className="w-3.5 h-3.5 text-shilp-orange-600" />
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-transparent focus:outline-none font-semibold text-xs cursor-pointer"
            >
              <option value="Hindi">हिंदी (Hindi)</option>
              <option value="English">English</option>
              <option value="Bengali">বাংলা (Bengali)</option>
              <option value="Gujarati">ગુજરાતી (Gujarati)</option>
              <option value="Marathi">मराठी (Marathi)</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
            </select>
          </div>

          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-2 text-xs font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-700 bg-white border border-warm-border rounded-xl hover:bg-shilp-cream-50 transition-colors"
            >
              ← Back to Overview
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Chat Container */}
      <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl shadow-warm-sm overflow-hidden flex flex-col h-[620px]">
        {/* Chat Header Status */}
        <div className="px-6 py-3.5 bg-[#FAF6EE] border-b border-warm-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-shilp-orange-500 text-white flex items-center justify-center shadow-warm-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-shilp-charcoal-900 block leading-tight">
                Shilp Sahayak Co-Pilot
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active • Guided Assistant
              </span>
            </div>
          </div>

          {/* Audio toggle simulation */}
          <div className="text-xs text-shilp-charcoal-500 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-shilp-orange-600" />
            <span className="hidden sm:inline">Voice Assistant Mode Ready</span>
          </div>
        </div>

        {/* Chat Message Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isSahayak = msg.sender === "sahayak";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  isSahayak ? "self-start" : "self-end ml-auto flex-row-reverse"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                    isSahayak
                      ? "bg-shilp-orange-100 text-shilp-orange-700 border border-shilp-orange-200"
                      : "bg-stone-900 text-white"
                  }`}
                >
                  {isSahayak ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isSahayak
                        ? "bg-[#FAF6EE] text-shilp-charcoal-900 border border-warm-border rounded-tl-sm"
                        : "bg-shilp-orange-500 text-white rounded-tr-sm"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Action Button inside Sahayak message if tab navigation is provided */}
                    {isSahayak && msg.actionTab && onNavigateTab && (
                      <div className="pt-2 mt-2 border-t border-warm-border/60">
                        <button
                          type="button"
                          onClick={() => onNavigateTab(msg.actionTab!)}
                          className="px-3.5 py-1.5 rounded-lg bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-warm-xs transition-colors"
                        >
                          <span>{msg.actionLabel || "Open Feature"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[10px] text-stone-400 block px-1 ${
                      isSahayak ? "text-left" : "text-right"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Guided Quick Actions Bar (Requirement 7) */}
        <div className="px-4 py-2.5 bg-[#FAF6EE]/70 border-t border-warm-border overflow-x-auto">
          <div className="flex items-center gap-2 text-xs whitespace-nowrap">
            <span className="text-[10px] font-bold text-shilp-charcoal-400 uppercase tracking-wider shrink-0">
              Quick Actions:
            </span>

            <button
              type="button"
              onClick={() =>
                handleQuickAction(
                  "Add Product",
                  "Mujhe naya product list karna hai",
                  "Naya product list karne ke liye 'My Products' me jayein ya yahan se direct product details bharein.",
                  "products",
                  "Go to My Products"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 border border-warm-border font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Package className="w-3.5 h-3.5 text-shilp-orange-600" />
              <span>Add Product</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickAction(
                  "Enhance Image",
                  "Mere product ki photo ko sundar banao",
                  "Bilkul! Image Enhancement studio me photo upload karke studio-level lighting aur sharp texture payein.",
                  "image-enhancement",
                  "Open Image Enhancer"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 border border-warm-border font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Wand2 className="w-3.5 h-3.5 text-shilp-orange-600" />
              <span>Enhance Image</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickAction(
                  "Create Description",
                  "Product ka badhiya description likhna hai",
                  "AI Description Generator se aapke craft ke materials aur design ke hisaab se catalog listing taiyar ho jayegi.",
                  "ai-description",
                  "Open Description Generator"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 border border-warm-border font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-shilp-orange-600" />
              <span>Create Description</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickAction(
                  "Generate Story",
                  "Hamare parivar aur craft ki kahani sunao",
                  "Story Generator aapke ancestral craft aur artisan technique ki emotional kahani create karega.",
                  "story-generator",
                  "Open Story Generator"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 border border-warm-border font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-shilp-orange-600" />
              <span>Generate Story</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickAction(
                  "Check Price",
                  "Sahi selling price kaise tay karein?",
                  "Price Analysis tool me raw material aur artisan mehnat ke hisaab se living wage ke sath fair selling price calculate karein.",
                  "price-analysis",
                  "Open Price Analysis"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 border border-warm-border font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-shilp-orange-600" />
              <span>Check Price</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickAction(
                  "View Orders",
                  "Mere kitne orders pending hain?",
                  "Aapke 4 orders hain. 2 orders stock verification aur pickup preparation me hain.",
                  "orders",
                  "Go to Orders"
                )
              }
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-shilp-orange-50 text-shilp-charcoal-700 hover:text-shilp-orange-700 border border-warm-border font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-shilp-orange-600" />
              <span>View Orders</span>
            </button>
          </div>
        </div>

        {/* Voice Listening Simulation Waveform */}
        {isListening && (
          <div className="bg-shilp-orange-500 text-white px-4 py-2 flex items-center justify-between text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Listening to artisan speech... Speak your question</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-3 bg-white animate-bounce" />
              <span className="w-1 h-5 bg-white animate-bounce delay-100" />
              <span className="w-1 h-4 bg-white animate-bounce delay-200" />
              <span className="w-1 h-2 bg-white animate-bounce delay-75" />
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 bg-[#FFFEFC] border-t border-warm-border flex items-center gap-2 sm:gap-3"
        >
          {/* Mic Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-shilp-orange-50 hover:bg-shilp-orange-100 text-shilp-orange-600 border border-shilp-orange-200"
            }`}
            title={isListening ? "Listening..." : "Click to speak (Voice Input Demo)"}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question or click quick action chips above..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-shilp-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 focus:border-shilp-orange-500 text-shilp-charcoal-900 transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-11 h-11 rounded-2xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white flex items-center justify-center shrink-0 shadow-warm-xs transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
