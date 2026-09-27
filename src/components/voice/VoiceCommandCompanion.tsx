"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Command,
  ArrowRight,
  CheckCircle2,
  X,
  Bot,
  HelpCircle,
} from "lucide-react";
import { DashboardTab } from "@/types";
import {
  SupportedLanguage,
  speakText,
  stopSpeaking,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
} from "@/lib/utils/speechUtils";

interface VoiceCommandCompanionProps {
  artisanName?: string;
  onNavigateTab: (tab: DashboardTab) => void;
  onLogout?: () => void;
  autoWelcome?: boolean;
}

export default function VoiceCommandCompanion({
  artisanName = "Artisan",
  onNavigateTab,
  onLogout,
  autoWelcome = true,
}: VoiceCommandCompanionProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechLanguage, setSpeechLanguage] = useState<"Hindi" | "English">("Hindi");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [transcribedCommand, setTranscribedCommand] = useState<string | null>(null);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Welcome speech text
  const welcomeTextHindi = `नमस्ते ${artisanName} जी! शिल्पमित्र डैशबोर्ड में आपका स्वागत है। आपका क्राफ्ट वर्कस्पेस तैयार है। आप बोलकर उत्पाद, ऑर्डर, या फोटो सुधार सकते हैं।`;
  const welcomeTextEnglish = `Welcome ${artisanName} to ShilpMitra dashboard. Your artisan workspace is ready. You can navigate products, orders, and photo enhancement using voice commands.`;

  // Auto welcome on mount if pending
  useEffect(() => {
    if (!autoWelcome || hasWelcomed) return;

    const checkAndSpeak = () => {
      try {
        const isPending = sessionStorage.getItem("shilpmitra_welcome_speech_pending");
        if (isPending === "true" || !sessionStorage.getItem("shilpmitra_welcomed_once")) {
          sessionStorage.setItem("shilpmitra_welcomed_once", "true");
          sessionStorage.removeItem("shilpmitra_welcome_speech_pending");
          setHasWelcomed(true);

          const text = speechLanguage === "Hindi" ? welcomeTextHindi : welcomeTextEnglish;
          setIsSpeaking(true);
          speakText(text, speechLanguage, () => {
            setIsSpeaking(false);
          });
        }
      } catch {
        // ignore storage errors
      }
    };

    const timer = setTimeout(checkAndSpeak, 600);
    return () => clearTimeout(timer);
  }, [autoWelcome, artisanName, speechLanguage, hasWelcomed, welcomeTextHindi, welcomeTextEnglish]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Manual trigger for welcome greeting
  const handlePlayWelcome = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const text = speechLanguage === "Hindi" ? welcomeTextHindi : welcomeTextEnglish;
    setIsSpeaking(true);
    speakText(text, speechLanguage, () => {
      setIsSpeaking(false);
    });
  };

  // Process Recognized Voice Command
  const processVoiceCommand = (commandText: string) => {
    const lower = commandText.toLowerCase().trim();
    setTranscribedCommand(commandText);

    let feedback = "";
    let targetTab: DashboardTab | null = null;

    if (
      lower.includes("product") ||
      lower.includes("saman") ||
      lower.includes("utpad") ||
      lower.includes("उत्पाद") ||
      lower.includes("सामान") ||
      lower.includes("catalog")
    ) {
      feedback = speechLanguage === "Hindi" ? "आपके उत्पाद खोले जा रहे हैं..." : "Opening your products catalog...";
      targetTab = "products";
    } else if (
      lower.includes("order") ||
      lower.includes("ऑर्डर") ||
      lower.includes("dispatch") ||
      lower.includes("delivery")
    ) {
      feedback = speechLanguage === "Hindi" ? "आपके ऑर्डर्स खोले जा रहे हैं..." : "Opening your orders...";
      targetTab = "orders";
    } else if (
      lower.includes("new product") ||
      lower.includes("create") ||
      lower.includes("assistant") ||
      lower.includes("sahayak") ||
      lower.includes("नया उत्पाद") ||
      lower.includes("सहायक")
    ) {
      feedback = speechLanguage === "Hindi" ? "एआई प्रोडक्ट असिस्टेंट शुरू किया जा रहा है..." : "Opening AI Product Assistant...";
      targetTab = "ai-product-assistant";
    } else if (
      lower.includes("photo") ||
      lower.includes("image") ||
      lower.includes("tasveer") ||
      lower.includes("फोटो") ||
      lower.includes("तस्वीर") ||
      lower.includes("enhance")
    ) {
      feedback = speechLanguage === "Hindi" ? "इमेज एनहांसमेंट स्टूडियो खोला जा रहा है..." : "Opening Image Enhancement Studio...";
      targetTab = "image-enhancement";
    } else if (
      lower.includes("price") ||
      lower.includes("rate") ||
      lower.includes("cost") ||
      lower.includes("दाम") ||
      lower.includes("कीमत") ||
      lower.includes("calculator")
    ) {
      feedback = speechLanguage === "Hindi" ? "प्राइस एनालिसिस कैलकुलेटर खोला जा रहा है..." : "Opening Price Analysis...";
      targetTab = "price-analysis";
    } else if (
      lower.includes("market") ||
      lower.includes("marketplace") ||
      lower.includes("bazaar") ||
      lower.includes("मार्केट") ||
      lower.includes("बाजार")
    ) {
      feedback = speechLanguage === "Hindi" ? "मार्केटप्लेस खोला जा रहा है..." : "Opening Marketplace...";
      targetTab = "marketplace";
    } else if (
      lower.includes("profile") ||
      lower.includes("info") ||
      lower.includes("प्रोफाइल") ||
      lower.includes("जानकारी") ||
      lower.includes("basic")
    ) {
      feedback = speechLanguage === "Hindi" ? "आपकी प्रोफाइल खोली जा रही है..." : "Opening Artisan Profile...";
      targetTab = "basic-info";
    } else if (
      lower.includes("dashboard") ||
      lower.includes("home") ||
      lower.includes("डैशबोर्ड") ||
      lower.includes("होम") ||
      lower.includes("overview")
    ) {
      feedback = speechLanguage === "Hindi" ? "डैशबोर्ड पर जाया जा रहा है..." : "Navigating to Dashboard...";
      targetTab = "dashboard";
    } else if (
      lower.includes("logout") ||
      lower.includes("लॉगआउट") ||
      lower.includes("sign out") ||
      lower.includes("bahar")
    ) {
      feedback = speechLanguage === "Hindi" ? "लॉगआउट किया जा रहा है..." : "Logging out...";
      speakText(feedback, speechLanguage, () => {
        onLogout?.();
      });
      setStatusMessage(feedback);
      return;
    } else if (
      lower.includes("help") ||
      lower.includes("madad") ||
      lower.includes("मदद") ||
      lower.includes("command") ||
      lower.includes("कमांड")
    ) {
      feedback =
        speechLanguage === "Hindi"
          ? "आप बोल सकते हैं: 'उत्पाद दिखाओ', 'ऑर्डर', 'नया उत्पाद', 'फोटो सुधारो', 'कीमत', या 'डैशबोर्ड'।"
          : "You can say: 'Open products', 'Orders', 'Create product', 'Enhance photo', 'Price', or 'Dashboard'.";
      speakText(feedback, speechLanguage);
      setStatusMessage(feedback);
      return;
    } else {
      feedback =
        speechLanguage === "Hindi"
          ? `कमांड '${commandText}' समझ नहीं आया। 'मदद' बोलें या उत्पाद/ऑर्डर कहें।`
          : `Command '${commandText}' not recognized. Say 'Help' or 'Products'.`;
    }

    setStatusMessage(feedback);

    if (targetTab) {
      speakText(feedback, speechLanguage, () => {
        setIsSpeaking(false);
      });
      setTimeout(() => {
        onNavigateTab(targetTab!);
      }, 500);
    } else {
      speakText(feedback, speechLanguage, () => {
        setIsSpeaking(false);
      });
    }
  };

  // Toggle Speech Recognition
  const toggleListening = () => {
    setStatusMessage(null);
    setTranscribedCommand(null);

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setStatusMessage("Voice recognition is not supported in this browser.");
      return;
    }

    setIsListening(true);
    setStatusMessage(speechLanguage === "Hindi" ? "सुन रहे हैं... बोलिए..." : "Listening... Speak your command...");

    const controller = startSpeechRecognition(
      speechLanguage,
      (transcript) => {
        setTranscribedCommand(transcript);
      },
      (errorMsg) => {
        setStatusMessage(errorMsg);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (controller) {
      recognitionRef.current = {
        stop: () => {
          controller.stop();
          setIsListening(false);
        },
      };
    }
  };

  // When speech transcript completes, process it
  useEffect(() => {
    if (!isListening && transcribedCommand) {
      processVoiceCommand(transcribedCommand);
    }
  }, [isListening, transcribedCommand]);

  return (
    <>
      {/* 1. Prominent Voice Welcome & Command Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#FFF9F0] border border-shilp-orange-200/90 shadow-warm-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-shilp-orange-500 text-white flex items-center justify-center shrink-0 shadow-warm-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wider">
                  शिल्प सहायक VOICE COMPANION
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-shilp-charcoal-900 leading-snug">
                {speechLanguage === "Hindi"
                  ? `नमस्ते ${artisanName} जी! आपका स्वागत है।`
                  : `Welcome to your workspace, ${artisanName}!`}
              </h3>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white border border-warm-border rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setSpeechLanguage("Hindi")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                speechLanguage === "Hindi"
                  ? "bg-shilp-orange-500 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setSpeechLanguage("English")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                speechLanguage === "English"
                  ? "bg-shilp-orange-500 text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Spoken Quote / Instructions */}
        <p className="text-xs sm:text-sm text-shilp-charcoal-700 leading-relaxed bg-white/70 border border-shilp-orange-100 rounded-2xl p-3">
          {speechLanguage === "Hindi" ? welcomeTextHindi : welcomeTextEnglish}
        </p>

        {/* Action Controls: [🔊 Listen Welcome] [🎤 Speak Command] [Help] */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {/* 🔊 Listen / Stop */}
          <button
            type="button"
            onClick={handlePlayWelcome}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isSpeaking
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white hover:bg-shilp-orange-50 text-shilp-orange-800 border border-shilp-orange-200"
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Voice / आवाज रोकें</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-shilp-orange-600" />
                <span>🔊 Listen Welcome / स्वागत संदेश सुनें</span>
              </>
            )}
          </button>

          {/* 🎤 Speak Command */}
          <button
            type="button"
            onClick={toggleListening}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isListening
                ? "bg-red-500 text-white"
                : "bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white shadow-warm-xs"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>Listening... Click to send / सुन रहे हैं...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>🎤 बोलकर कमांड दें / Speak Voice Command</span>
              </>
            )}
          </button>

          {/* Help Button */}
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-warm-border hover:bg-stone-50 flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Voice Commands Help</span>
          </button>
        </div>

        {/* Live Feedback Message */}
        {statusMessage && (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between animate-in fade-in">
            <span className="font-medium">{statusMessage}</span>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-stone-500 hover:text-stone-800 text-[11px] underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Voice Commands Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-warm-lg animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-shilp-orange-600" />
                <h4 className="font-serif text-lg font-bold text-shilp-charcoal-900">
                  Voice Commands Available
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-shilp-charcoal-600">
              Click the microphone button and speak in Hindi or English:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-warm-border">
                <span className="font-bold text-shilp-orange-800 block">“उत्पाद” / “Products”</span>
                <span className="text-stone-600 text-[11px]">Opens your products catalog</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-warm-border">
                <span className="font-bold text-shilp-orange-800 block">“ऑर्डर” / “Orders”</span>
                <span className="text-stone-600 text-[11px]">Opens order fulfillment list</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-warm-border">
                <span className="font-bold text-shilp-orange-800 block">“नया उत्पाद” / “New Product”</span>
                <span className="text-stone-600 text-[11px]">Opens AI Product Assistant</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-warm-border">
                <span className="font-bold text-shilp-orange-800 block">“फोटो” / “Photo Enhancement”</span>
                <span className="text-stone-600 text-[11px]">Opens studio lighting tool</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-warm-border">
                <span className="font-bold text-shilp-orange-800 block">“दाम” / “Price”</span>
                <span className="text-stone-600 text-[11px]">Calculates fair selling price</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-warm-border">
                <span className="font-bold text-shilp-orange-800 block">“मार्केट” / “Marketplace”</span>
                <span className="text-stone-600 text-[11px]">Opens buyer sales channels</span>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-semibold"
              >
                Understood / ठीक है
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
