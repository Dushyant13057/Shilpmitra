"use client";

import { useState, useRef, useEffect, ChangeEvent, DragEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Sparkles,
  RotateCcw,
  Download,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Columns,
  ShieldCheck,
  Check,
  Bot,
  Volume2,
  ArrowRight,
} from "lucide-react";
import {
  EnhancementUIState,
  UploadResponse,
  EnhanceResponse,
} from "@/types/imageEnhancement";
import { uploadProductImage, enhanceProductImage } from "@/lib/api/imageEnhancement";
import { enhanceImageLocally } from "@/lib/utils/localImageProcessor";
import { speakText, stopSpeaking } from "@/lib/utils/speechUtils";
import { DashboardTab } from "@/types";

interface ImageEnhancementViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageEnhancementView({
  onBackToDashboard,
  onNavigateTab,
}: ImageEnhancementViewProps) {
  const router = useRouter();
  const [uiState, setUiState] = useState<EnhancementUIState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAutoRedirecting, setIsAutoRedirecting] = useState<boolean>(false);

  // Uploaded and Enhanced Data
  const [uploadedRecord, setUploadedRecord] = useState<UploadResponse | null>(null);
  const [enhancedResult, setEnhancedResult] = useState<EnhanceResponse | null>(null);

  // Comparison UI Mode: 'side-by-side' (default) | 'slider'
  const [viewMode, setViewMode] = useState<"side-by-side" | "slider">("side-by-side");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const isDraggingSlider = useRef<boolean>(false);

  // Download & "Use Enhanced Image" tracking
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isSelectedForListing, setIsSelectedForListing] = useState<boolean>(false);

  // File input ref & drag state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // File validation
  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);

    const type = file.type.toLowerCase();
    const extension = file.name.split(".").pop()?.toLowerCase();
    const isSupportedExtension = ["jpg", "jpeg", "png", "webp"].includes(extension || "");

    if (!ALLOWED_TYPES.includes(type) && !isSupportedExtension) {
      setErrorMessage("Unsupported image format. Accepted formats are JPG, JPEG, PNG, and WEBP.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("Image too large. Maximum allowed file size is 10MB.");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUiState("preview");
    setIsSelectedForListing(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Mount: Speak upload prompt in Hindi
  useEffect(() => {
    const audioPrompt =
      "नमस्ते! कृपया अपने प्रोडक्ट की फोटो अपलोड करें ताकि हम इसे स्टूडियो क्वालिटी में बदल सकें।";
    const timer = setTimeout(() => {
      speakText(audioPrompt, "Hindi");
    }, 600);

    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
  }, []);

  // Save enhanced image and shift directly to AI Product Assistant
  const saveAndNavigateToAssistant = (result: EnhanceResponse) => {
    const selectedData = {
      imageId: result.id,
      originalUrl: result.originalUrl,
      enhancedUrl: result.enhancedUrl,
      originalFilename: selectedFile?.name || "product-image.jpg",
      selectedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("shilpmitra_selected_product_image", JSON.stringify(selectedData));
    } catch (e) {
      console.warn("Unable to save selected product image to localStorage:", e);
    }

    setIsSelectedForListing(true);
    setIsAutoRedirecting(true);

    // Speak completion feedback in Hindi
    speakText("आपकी फोटो स्टूडियो क्वालिटी में तैयार हो गई है! चलिए अब इसका प्रोडक्ट लिस्टिंग बनाते हैं।", "Hindi");

    // Automatically shift to AI Product Assistant
    setTimeout(() => {
      if (onNavigateTab) {
        onNavigateTab("ai-description");
      } else {
        router.push("/dashboard?tab=ai-description");
      }
    }, 1800);
  };

  // Enhance Image Action: Tries backend API first; falls back smoothly to local deterministic processor
  const handleEnhance = async () => {
    if (!selectedFile) return;

    setUiState("processing");
    setErrorMessage(null);

    try {
      // Step 1: Upload original image to backend & Supabase Storage
      let uploadRes = uploadedRecord;
      if (!uploadRes) {
        uploadRes = await uploadProductImage(selectedFile);
        setUploadedRecord(uploadRes);
      }

      // Step 2: Trigger AI enhancement on backend
      const enhanceRes = await enhanceProductImage(uploadRes.id);
      setEnhancedResult(enhanceRes);
      setUiState("completed");
      saveAndNavigateToAssistant(enhanceRes);
    } catch (err: unknown) {
      console.warn("Backend enhancement unavailable, falling back to local artisan enhancement engine:", err);
      try {
        // Fallback: apply deterministic local enhancement directly on the uploaded image
        const localEnhancedUrl = await enhanceImageLocally(selectedFile);
        const fallbackResult: EnhanceResponse = {
          id: "local-" + Date.now(),
          originalUrl: previewUrl || URL.createObjectURL(selectedFile),
          enhancedUrl: localEnhancedUrl,
          status: "completed",
          provider: "local-studio-enhancer",
          message: "Studio illumination, contrast balance, and micro-texture sharpening applied successfully.",
        };
        setEnhancedResult(fallbackResult);
        setUiState("completed");
        saveAndNavigateToAssistant(fallbackResult);
      } catch (localErr) {
        console.error("Local enhancement failed:", localErr);
        setErrorMessage("Unable to enhance image. Please verify file format and try again.");
        setUiState("failed");
      }
    }
  };

  // Reset to "Try Another"
  const handleReset = () => {
    setUiState("idle");
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadedRecord(null);
    setEnhancedResult(null);
    setErrorMessage(null);
    setSliderPosition(50);
    setIsSelectedForListing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // "Use Enhanced Image" action (stores for future product creation)
  const handleUseEnhancedImage = () => {
    if (!enhancedResult) return;

    const selectedData = {
      imageId: enhancedResult.id,
      originalUrl: enhancedResult.originalUrl,
      enhancedUrl: enhancedResult.enhancedUrl,
      originalFilename: selectedFile?.name || "product-image.jpg",
      selectedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("shilpmitra_selected_product_image", JSON.stringify(selectedData));
    } catch (e) {
      console.warn("Unable to save selected product image to localStorage:", e);
    }

    setIsSelectedForListing(true);
  };

  // Download enhanced image securely
  const handleDownload = async () => {
    if (!enhancedResult?.enhancedUrl) return;

    setIsDownloading(true);
    try {
      const response = await fetch(enhancedResult.enhancedUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      const baseName = (selectedFile?.name || "craft").replace(/\.[^/.]+$/, "");
      link.download = `enhanced-${baseName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open URL in a new tab
      window.open(enhancedResult.enhancedUrl, "_blank", "noopener,noreferrer");
    } finally {
      setIsDownloading(false);
    }
  };

  // Slider Mouse/Touch Handlers
  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const pos = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(pos);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              AI TOOLS • IMAGE ENHANCEMENT
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              MVP
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Image Enhancement
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Turn your product photo into a marketplace-ready image.
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

      {/* 2. Craft Quality Assurance Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950">
          <strong className="block font-semibold">Faithful Craft Integrity</strong>
          <span>
            This tool enhances lighting, contrast, sharpness, and clarity while faithfully preserving your craft’s authentic colors, intricate weave, carvings, and handcrafted identity.
          </span>
        </div>
      </div>

      {/* 2b. Sahayak Voice Guidance Prompt Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-shilp-orange-500 text-white flex items-center justify-center shrink-0 shadow-warm-xs">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wide">
                सहायक वॉयस गाइडेंस (Sahayak Voice)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-900 font-semibold">
                Auto Guide
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-shilp-charcoal-900 mt-0.5">
              &quot;नमस्ते! कृपया अपने प्रोडक्ट की फोटो अपलोड करें ताकि हम इसे स्टूडियो क्वालिटी में बदल सकें।&quot;
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            speakText("नमस्ते! कृपया अपने प्रोडक्ट की फोटो अपलोड करें ताकि हम इसे स्टूडियो क्वालिटी में बदल सकें।", "Hindi");
          }}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-orange-300 text-shilp-orange-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>निर्देश फिर से सुनें</span>
        </button>
      </div>

      {/* 2c. Auto-Redirecting to AI Assistant Banner */}
      {isAutoRedirecting && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-warm-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Studio Quality Ready • Handoff in Progress</span>
              </div>
              <p className="text-sm font-semibold mt-0.5">
                आपकी फोटो तैयार हो गई है! अब सीधे AI Product Assistant पर जा रहे हैं...
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab("ai-description");
              } else {
                router.push("/dashboard?tab=ai-description");
              }
            }}
            className="px-4 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <span>तुरंत आगे बढ़ें</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. Error Banner (Shown in failed state or on validation failure) */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs sm:text-sm text-red-900 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block mb-0.5">Notice</span>
            <span>{errorMessage}</span>
          </div>
          {uiState === "failed" && (
            <button
              type="button"
              onClick={handleEnhance}
              className="px-3.5 py-1.5 bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors shadow-warm-xs"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {/* 4. "Use Enhanced Image" Success Notification */}
      {isSelectedForListing && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Image Selected:</strong> This enhanced visual is now marked as your active craft photo for upcoming product listings.
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0">
            Ready for Listing
          </span>
        </div>
      )}

      {/* 5. STATE: IDLE (Upload Section) */}
      {uiState === "idle" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center transition-all bg-[#FFFEFC] ${
            isDragOver
              ? "border-shilp-orange-500 bg-shilp-orange-50/40 scale-[1.005]"
              : "border-warm-border hover:border-shilp-orange-300 hover:bg-shilp-cream-50/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="w-16 h-16 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200 flex items-center justify-center mx-auto mb-4 text-shilp-orange-600 shadow-warm-sm">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-shilp-charcoal-900">
            Upload Product Photo
          </h3>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-md mx-auto">
            Drag and drop your product photo here, or use the button below to select from your device.
          </p>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2.5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-xs sm:text-sm shadow-warm-md hover:shadow-warm-lg transition-all inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Choose Image</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-semibold text-shilp-charcoal-400">
            <span>Supported formats: JPG, JPEG, PNG, WEBP</span>
            <span>•</span>
            <span>Max file size: 10MB</span>
          </div>
        </div>
      )}

      {/* 6. STATE: PREVIEW & FAILED (Original Image Preview with Actions) */}
      {(uiState === "preview" || uiState === "failed") && previewUrl && (
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-shilp-charcoal-400 uppercase tracking-wider block">
                Original Product Photo
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-shilp-charcoal-900">
                {selectedFile?.name}
              </h3>
              <p className="text-xs text-shilp-charcoal-500 mt-0.5">
                {(selectedFile?.size ? selectedFile.size / (1024 * 1024) : 0).toFixed(2)} MB • {selectedFile?.type || "image"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 self-start sm:self-auto px-3.5 py-2 rounded-xl border border-warm-border hover:bg-stone-50 transition-colors"
            >
              Choose Different Image
            </button>
          </div>

          {/* Original Preview Area */}
          <div className="relative w-full max-h-[460px] min-h-[300px] rounded-2xl overflow-hidden bg-stone-900/5 border border-warm-border flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Uploaded Product Photo Preview"
              className="max-h-[440px] max-w-full object-contain rounded-xl shadow-warm-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-xs text-shilp-charcoal-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-shilp-orange-600 shrink-0" />
              <span>AI enhancement will balance lighting, sharpen details, and prepare studio-level visual clarity.</span>
            </div>
            <button
              type="button"
              onClick={handleEnhance}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-semibold text-sm shadow-warm-md hover:shadow-warm-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enhance Image</span>
            </button>
          </div>
        </div>
      )}

      {/* 7. STATE: PROCESSING (Proper Loading State, No Fake Percentages) */}
      {uiState === "processing" && (
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-warm-sm">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-shilp-orange-100" />
            <div className="absolute inset-0 rounded-full border-4 border-shilp-orange-500 border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-shilp-orange-600">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900">
              Enhancing your product image...
            </h3>
            <p className="text-xs sm:text-sm text-shilp-charcoal-600">
              Optimizing lighting balance, sharpening fine artisan textures, and preparing a professional marketplace presentation.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-shilp-cream-100 text-shilp-charcoal-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-shilp-orange-500 animate-ping" />
            <span>Processing via Secure Backend AI Pipeline</span>
          </div>
        </div>
      )}

      {/* 8. STATE: COMPLETED (Before/After Comparison & Actions) */}
      {uiState === "completed" && (
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-md">
          {/* Top Bar with View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-warm-border">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                  Enhancement Complete
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-shilp-charcoal-900 mt-0.5">
                Marketplace-Ready Visual
              </h3>
            </div>

            {/* View Mode Toggle: Side-by-Side vs Slider */}
            <div className="flex items-center gap-1.5 p-1 bg-shilp-cream-100 rounded-xl self-start sm:self-auto border border-warm-border">
              <button
                type="button"
                onClick={() => setViewMode("side-by-side")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === "side-by-side"
                    ? "bg-white text-shilp-charcoal-900 shadow-sm"
                    : "text-shilp-charcoal-600 hover:text-shilp-charcoal-900"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Side-by-Side</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("slider")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === "slider"
                    ? "bg-white text-shilp-charcoal-900 shadow-sm"
                    : "text-shilp-charcoal-600 hover:text-shilp-charcoal-900"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Comparison Slider</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE A: SIDE-BY-SIDE (Default: side by side on desktop, stacked on mobile) */}
          {viewMode === "side-by-side" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ORIGINAL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-shilp-charcoal-800 uppercase tracking-wider">
                    ORIGINAL
                  </span>
                  <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded font-medium">
                    Workshop Capture
                  </span>
                </div>
                <div className="relative h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-stone-100 border border-warm-border flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl || uploadedRecord?.originalUrl || ""}
                    alt="Original Product Photo"
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                </div>
              </div>

              {/* ENHANCED */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-shilp-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-shilp-orange-600" />
                    ENHANCED
                  </span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    Studio Clarity
                  </span>
                </div>
                <div className="relative h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-stone-100 border-2 border-shilp-orange-400/60 flex items-center justify-center p-2 shadow-warm-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={enhancedResult?.enhancedUrl || previewUrl || ""}
                    alt="Enhanced Product Photo"
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE B: INTERACTIVE BEFORE/AFTER SLIDER */}
          {viewMode === "slider" && (
            <div className="space-y-2">
              <div
                className="relative w-full h-[360px] sm:h-[480px] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-stone-900/10 border border-warm-border"
                onMouseDown={(e) => {
                  isDraggingSlider.current = true;
                  handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
                }}
                onMouseUp={() => {
                  isDraggingSlider.current = false;
                }}
                onMouseMove={(e) => {
                  if (isDraggingSlider.current) {
                    handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) {
                    handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
                  }
                }}
              >
                {/* 1. Enhanced Image (Full Background) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={enhancedResult?.enhancedUrl || previewUrl || ""}
                  alt="Enhanced Craft"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />

                {/* 2. Original Image (Clipped to Slider Percentage) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl || uploadedRecord?.originalUrl || ""}
                    alt="Original Craft"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    style={{
                      width: "100%",
                      maxWidth: "none",
                    }}
                  />
                </div>

                {/* 3. Divider Line & Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-warm-lg border border-warm-border flex items-center justify-center text-shilp-charcoal-700">
                    <Sliders className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 z-30 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase">
                    ORIGINAL
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-30 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-shilp-orange-600/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    ENHANCED
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-shilp-charcoal-400 px-1">
                <span>Drag the handle across to compare quality improvements</span>
                <span>Split: {Math.round(sliderPosition)}%</span>
              </div>
            </div>
          )}

          {/* Quality Assurance Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-shilp-cream-50 border border-warm-border">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-shilp-charcoal-900 block">Lighting & Contrast</span>
                <span className="text-[11px] text-shilp-charcoal-500">Natural studio illumination</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-shilp-charcoal-900 block">Texture Preservation</span>
                <span className="text-[11px] text-shilp-charcoal-500">Authentic details uncompromised</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-shilp-charcoal-900 block">Supabase Storage</span>
                <span className="text-[11px] text-shilp-charcoal-500">Separately secured in your bucket</span>
              </div>
            </div>
          </div>

          {/* Actions: "Use Enhanced Image", "Try Another", "Download" */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-warm-border">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-warm-border hover:bg-stone-50 text-shilp-charcoal-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Try Another</span>
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-shilp-orange-300 text-shilp-orange-800 bg-shilp-orange-50 hover:bg-shilp-orange-100 text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isDownloading ? "Downloading..." : "Download"}</span>
              </button>

              <button
                type="button"
                onClick={handleUseEnhancedImage}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs shadow-warm-md hover:shadow-warm-lg flex items-center justify-center gap-2 transition-all ${
                  isSelectedForListing
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white"
                }`}
              >
                {isSelectedForListing ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Selected for Listing</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Use Enhanced Image</span>
                  </>
                )}
              </button>

              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => {
                    handleUseEnhancedImage();
                    onNavigateTab("ai-description");
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs bg-stone-900 hover:bg-stone-800 text-white shadow-warm-md flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-shilp-orange-300" />
                  <span>Create Product with Sahayak →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
