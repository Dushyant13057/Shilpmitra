"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  CheckCircle2,
  Edit3,
  RotateCcw,
  Save,
  ArrowRight,
  Languages,
  ShoppingBag,
  Package,
  Plus,
  Upload,
  Check,
  X,
  Bot,
  User,
  Tag,
  Palette,
  Layers,
  HelpCircle,
  Calculator,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { DashboardTab } from "@/types";
import {
  SupportedLanguage,
  speakText,
  stopSpeaking,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
} from "@/lib/utils/speechUtils";

interface AIProductAssistantViewProps {
  onBackToDashboard?: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
}

interface StoredEnhancedImage {
  imageId?: string;
  originalUrl?: string;
  enhancedUrl?: string;
  originalFilename?: string;
}

interface ChatMessage {
  id: string;
  sender: "sahayak" | "artisan";
  text: string;
  slotKey?: string;
  timestamp: string;
}

interface CollectedAnswers {
  name: string;
  craft: string;
  materials: string;
  technique: string;
  features: string;
  colorsDesign: string;
  speciality: string;
  story: string;
  additional: string;
}

interface ProductDraft {
  title: string;
  category: string;
  craftType: string;
  materials: string;
  technique: string;
  keyFeatures: string[];
  colorsDesign: string;
  shortDescription: string;
  detailedDescription: string;
  craftStory: string;
  artisanStory: string;
  suggestedTags: string[];
}

interface QuestionDef {
  key: keyof CollectedAnswers;
  text: Record<SupportedLanguage, string>;
}

// 8 Core Structured Questions across 6 Indian Languages
const QUESTION_DEFINITIONS: QuestionDef[] = [
  {
    key: "name",
    text: {
      Hindi: "Aapke product ka naam kya hai?",
      Marathi: "तुमच्या उत्पादनाचे नाव काय आहे?",
      English: "What is the name of your product?",
      Gujarati: "તમારા ઉત્પાદનનું નામ શું છે?",
      Bengali: "আপনার পণ্যের নাম কী?",
      Tamil: "உங்கள் பொருளின் பெயர் என்ன?",
    },
  },
  {
    key: "craft",
    text: {
      Hindi: "Ye kis type ka craft hai? (Jaise Terracotta, Handloom, Wood carving, Brass metal, etc.)",
      Marathi: "हा कोणत्या प्रकारचा हस्तकला प्रकार आहे? (उदा. मातीकाम, हातमाग, लाकडी कोरीवकाम, धातूकाम)",
      English: "What type of craft is this? (e.g. Terracotta, Handloom, Wood carving, Brass metal)",
      Gujarati: "આ કયા પ્રકારની હસ્તકલા છે? (જેમ કે માટીકામ, હાથવણાટ, લાકડાની કોતરણી, પિત્તળ)",
      Bengali: "এটি কোন ধরনের হস্তশিল্প? (যেমন পোড়ামাটির শিল্প, তাঁতবস্ত্র, কাঠের কাজ, পিতল)",
      Tamil: "இது எந்த வகையான கைவினைப் பாரம்பரியம்? (மண்பாண்டம், கைத்தறி, மரச்சிற்பம், பித்தளை)",
    },
  },
  {
    key: "materials",
    text: {
      Hindi: "Is product ko banane mein kaunse materials use hue hain?",
      Marathi: "हे उत्पादन बनवण्यासाठी कोणते साहित्य वापरले आहे?",
      English: "What materials are used to make it?",
      Gujarati: "આ ઉત્પાદન બનાવવા માટે કઈ સામગ્રી વપરાઈ છે?",
      Bengali: "এই পণ্যটি তৈরিতে কী কী উপকরণ ব্যবহার করা হয়েছে?",
      Tamil: "இதை உருவாக்க என்ன மூலப்பொருட்கள் பயன்படுத்தப்பட்டன?",
    },
  },
  {
    key: "technique",
    text: {
      Hindi: "Isse banane ki traditional technique kya hai?",
      Marathi: "हे उत्पादन कोणत्या पारंपारिक पद्धतीने बनवले जाते?",
      English: "How is this product traditionally made?",
      Gujarati: "આ બનાવવાની પરંપરાગત પદ્ધતિ કઈ છે?",
      Bengali: "এটি তৈরির ঐতিহ্যবাহী কৌশলটি কী?",
      Tamil: "இதை உருவாக்கப் பயன்படுத்தப்பட்ட பாரம்பரிய முறை என்ன?",
    },
  },
  {
    key: "colorsDesign",
    text: {
      Hindi: "Is product ke main features aur rang ya design elements kya hain?",
      Marathi: "या उत्पादनाची मुख्य वैशिष्ट्ये आणि रंग किंवा डिझाइन काय आहेत?",
      English: "What are the main features, colors, or design elements?",
      Gujarati: "આ પ્રોડક્ટની મુખ્ય વિશેષતાઓ અને રંગ કે ડિઝાઇન શું છે?",
      Bengali: "পণ্যটির প্রধান বৈশিষ্ট্য এবং রঙ বা নকশা কী?",
      Tamil: "இதன் முக்கிய அம்சங்கள் மற்றும் நிறங்கள் என்ன?",
    },
  },
  {
    key: "speciality",
    text: {
      Hindi: "Is product ki khaas baat kya hai jo buyers ko sabse zyada pasand aayegi?",
      Marathi: "या उत्पादनाची खासियत काय आहे जी ग्राहकांना सर्वात जास्त आवडेल?",
      English: "What makes this product special that buyers will love?",
      Gujarati: "આ ઉત્પાદનની ખાસિયત શું છે?",
      Bengali: "এই পণ্যের বিশেষত্ব কী?",
      Tamil: "இந்தப் பொருளின் சிறப்பு என்ன?",
    },
  },
  {
    key: "story",
    text: {
      Hindi: "Is product ki koi kahani ya traditional connection hai?",
      Marathi: "या उत्पादनामागे काही खास कथा किंवा पारंपारिक संबंध आहे का?",
      English: "Is there a story or traditional connection behind this product?",
      Gujarati: "આ ઉત્પાદન પાછળ કોઈ પરંપરાગત વાર્તા કે કથા છે?",
      Bengali: "এই পণ্যের পেছনে কোনো ঐতিহ্যবাহী গল্প আছে কি?",
      Tamil: "இதற்குப் பின்னால் ஏதேனும் பாரம்பரியக் கதை உள்ளதா?",
    },
  },
  {
    key: "additional",
    text: {
      Hindi: "Koi aur aisi zaroori jaankari jo customer ko pata honi chahiye?",
      Marathi: "ग्राहकांना माहित असावी अशी कोणतीही अतिरिक्त माहिती आहे का?",
      English: "Is there any additional detail the customer should know?",
      Gujarati: "ગ્રાહકને જાણવા જેવી કોઈ વધારાની વિગત છે?",
      Bengali: "ক্রেতাদের জানা প্রয়োজন এমন কোনো অতিরিক্ত তথ্য আছে কি?",
      Tamil: "வாடிக்கையாளர் தெரிந்து கொள்ள வேண்டிய கூடுதல் விவரம் ஏதேனும் உள்ளதா?",
    },
  },
];

// Sahayak Greetings per Language
const GREETINGS: Record<SupportedLanguage, string> = {
  Hindi: "Namaste! Chaliye aapke product ki listing ready karte hain.",
  Marathi: "नमस्कार! चला तुमच्या उत्पादनाची लिस्टिंग तयार करूया.",
  English: "Namaste! Let's prepare your product listing together.",
  Gujarati: "નમસ્તે! ચાલો તમારા ઉત્પાદનની યાદી તૈયાર કરીએ.",
  Bengali: "নমস্কার! চলুন আপনার পণ্যের তালিকা তৈরি করি।",
  Tamil: "வணக்கம்! உங்கள் பொருளுக்கான பட்டியலைத் தயார் செய்வோம்.",
};

export default function AIProductAssistantView({
  onBackToDashboard,
  onNavigateTab,
}: AIProductAssistantViewProps) {
  // Navigation / Workflow steps: 'language' | 'chat' | 'draft' | 'price' | 'review' | 'saved'
  const [currentStep, setCurrentStep] = useState<"language" | "chat" | "draft" | "price" | "review" | "saved">("language");

  // Selected Language
  const [language, setLanguage] = useState<SupportedLanguage>("Hindi");

  // Enhanced Product Image
  const [enhancedImage, setEnhancedImage] = useState<StoredEnhancedImage | null>(null);

  // Price Decision & Calculation States
  const [materialCost, setMaterialCost] = useState<number>(180);
  const [labourCost, setLabourCost] = useState<number>(320);
  const [otherCost, setOtherCost] = useState<number>(100);
  const [desiredMargin, setDesiredMargin] = useState<number>(35); // in %
  const [stockQuantity, setStockQuantity] = useState<number>(12);

  const totalCost = Math.max(0, materialCost + labourCost + otherCost);
  const calculatedPrice = Math.round(totalCost * (1 + desiredMargin / 100));
  const estimatedMargin = Math.max(0, calculatedPrice - totalCost);
  const materialPct = totalCost > 0 && calculatedPrice > 0 ? Math.round((materialCost / calculatedPrice) * 100) : 0;
  const labourPct = totalCost > 0 && calculatedPrice > 0 ? Math.round((labourCost / calculatedPrice) * 100) : 0;
  const otherPct = totalCost > 0 && calculatedPrice > 0 ? Math.round((otherCost / calculatedPrice) * 100) : 0;
  const marginPct = Math.max(0, 100 - (materialPct + labourPct + otherPct));

  // Conversational Interview State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  const [collectedAnswers, setCollectedAnswers] = useState<CollectedAnswers>({
    name: "",
    craft: "",
    materials: "",
    technique: "",
    features: "",
    colorsDesign: "",
    speciality: "",
    story: "",
    additional: "",
  });
  const [inputText, setInputText] = useState("");

  // STT Voice State
  const [isListening, setIsListening] = useState(false);
  const [sttError, setSttError] = useState<string | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // TTS Audio state
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  // Generated Product Draft
  const [draft, setDraft] = useState<ProductDraft | null>(null);
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [regenerationCount, setRegenerationCount] = useState(0);

  // Saved confirmation
  const [savedProductResult, setSavedProductResult] = useState<{
    title: string;
    craft: string;
    imageUrl: string;
    priceFormatted: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message in chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentStep]);

  // Load existing enhanced image on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("shilpmitra_selected_product_image");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.enhancedUrl || parsed.originalUrl) {
          setEnhancedImage(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Cleanup speech synthesis & recognition on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Handle Image Upload from Local Device
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newImg: StoredEnhancedImage = {
        imageId: "local-" + Date.now(),
        originalUrl: dataUrl,
        enhancedUrl: dataUrl,
        originalFilename: file.name,
      };
      setEnhancedImage(newImg);
      try {
        localStorage.setItem("shilpmitra_selected_product_image", JSON.stringify(newImg));
      } catch {
        // ignore
      }
    };
    reader.readAsDataURL(file);
  };

  // 1. Language Selection Handler
  const handleSelectLanguage = (chosen: SupportedLanguage) => {
    setLanguage(chosen);
    setCurrentStep("chat");

    const greetingText = GREETINGS[chosen];
    const firstQText = QUESTION_DEFINITIONS[0].text[chosen];

    const initialMessages: ChatMessage[] = [
      {
        id: "sahayak-greeting",
        sender: "sahayak",
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        id: `sahayak-q-0`,
        sender: "sahayak",
        text: firstQText,
        slotKey: QUESTION_DEFINITIONS[0].key,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];

    setMessages(initialMessages);
    setCurrentSlotIndex(0);
    speakText(`${greetingText} ${firstQText}`, chosen);
  };

  // 2. TTS Handler
  const handlePlayTTS = (msgId: string, text: string) => {
    if (currentlySpeakingId === msgId) {
      stopSpeaking();
      setCurrentlySpeakingId(null);
      return;
    }

    setCurrentlySpeakingId(msgId);
    speakText(text, language, () => {
      setCurrentlySpeakingId(null);
    });
  };

  // 3. STT Toggle (Browser Web Speech API)
  const toggleSpeechRecognition = () => {
    setSttError(null);

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setSttError("Voice input is not supported in this browser. You can type your answer.");
      return;
    }

    setIsListening(true);
    const controller = startSpeechRecognition(
      language,
      (transcript) => {
        // Transcribed text is placed into the input box so the artisan can review/edit
        setInputText(transcript);
      },
      (errorMsg) => {
        setSttError(errorMsg);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    recognitionRef.current = controller;
  };

  // 4. Send Answer Handler with Intelligent Redundancy Skipping
  const handleSendAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    stopSpeaking();
    setCurrentlySpeakingId(null);

    const userAns = inputText.trim();
    setInputText("");
    setSttError(null);

    const currentQ = QUESTION_DEFINITIONS[currentSlotIndex];
    const currentKey = currentQ ? currentQ.key : "name";

    // Update collected answers
    const updatedAnswers: CollectedAnswers = {
      ...collectedAnswers,
      [currentKey]: userAns,
    };

    // Intelligent extraction / redundancy detection
    const lower = userAns.toLowerCase();

    // If answer contains craft hints
    if (currentKey === "name" && !updatedAnswers.craft) {
      if (lower.includes("terracotta") || lower.includes("clay") || lower.includes("mitti")) {
        updatedAnswers.craft = "Terracotta & Clay Craft";
      } else if (lower.includes("handloom") || lower.includes("saree") || lower.includes("vankar") || lower.includes("khadi")) {
        updatedAnswers.craft = "Handloom & Textiles";
      } else if (lower.includes("wood") || lower.includes("wooden") || lower.includes("lakdi")) {
        updatedAnswers.craft = "Wood Carving";
      } else if (lower.includes("brass") || lower.includes("metal") || lower.includes("dhokra")) {
        updatedAnswers.craft = "Brass & Metal Craft";
      } else if (lower.includes("bamboo") || lower.includes("cane")) {
        updatedAnswers.craft = "Bamboo & Cane Craft";
      }
    }

    // If materials were mentioned
    if (!updatedAnswers.materials && (lower.includes("clay") || lower.includes("silk") || lower.includes("cotton") || lower.includes("teakwood") || lower.includes("sheesham") || lower.includes("brass") || lower.includes("natural colors") || lower.includes("mitti"))) {
      if (currentKey !== "materials") {
        updatedAnswers.materials = userAns;
      }
    }

    setCollectedAnswers(updatedAnswers);

    // Record user chat bubble
    const userMsg: ChatMessage = {
      id: `artisan-${Date.now()}`,
      sender: "artisan",
      text: userAns,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Find next unanswered slot
    let nextIdx = currentSlotIndex + 1;
    while (
      nextIdx < QUESTION_DEFINITIONS.length &&
      Boolean(updatedAnswers[QUESTION_DEFINITIONS[nextIdx].key]) &&
      updatedAnswers[QUESTION_DEFINITIONS[nextIdx].key].trim().length > 0
    ) {
      nextIdx++;
    }

    if (nextIdx < QUESTION_DEFINITIONS.length) {
      setCurrentSlotIndex(nextIdx);
      setTimeout(() => {
        const nextQ = QUESTION_DEFINITIONS[nextIdx];
        const nextMsg: ChatMessage = {
          id: `sahayak-q-${nextIdx}`,
          sender: "sahayak",
          text: nextQ.text[language],
          slotKey: nextQ.key,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, nextMsg]);
        speakText(nextQ.text[language], language);
      }, 300);
    } else {
      // Completed all questions -> Generate Product Draft
      setTimeout(() => {
        buildProductDraft(updatedAnswers, 0);
        setCurrentStep("draft");
        speakText("उत्कृष्ट! आपके जवाबों के आधार पर प्रोडक्ट लिस्टिंग का ड्राफ्ट तैयार कर दिया गया है।", language);
      }, 400);
    }
  };

  // 5. Generate Structured Product Draft (Strictly based on collected answers)
  const buildProductDraft = (answers: CollectedAnswers, variant: number = 0) => {
    const pName = answers.name || "Handcrafted Artisan Item";
    const pCraft = answers.craft || "Traditional Handicraft";
    const pMaterials = answers.materials || "Natural traditional materials";
    const pTechnique = answers.technique || "Handcrafted technique";
    const pColors = answers.colorsDesign || "Natural earthy finish";
    const pSpeciality = answers.speciality || "Artisan handcrafted finish";
    const pStory = answers.story || "Rooted in generational artisanal tradition";
    const pAdditional = answers.additional || "";

    // Parse features
    const rawFeatures = answers.features || answers.colorsDesign || pSpeciality;
    const featuresList = rawFeatures
      .split(/[,.;\n]/)
      .map((f) => f.trim())
      .filter((f) => f.length > 2);

    if (featuresList.length === 0) {
      featuresList.push(`Handcrafted using ${pMaterials}`);
      featuresList.push(`Created with ${pTechnique}`);
      if (pSpeciality) featuresList.push(pSpeciality);
    }

    const shortDesc = variant === 0
      ? `Handcrafted ${pName} made using ${pMaterials}. Crafted with ${pTechnique}, featuring ${pColors}. ${pSpeciality}.`
      : `Authentic ${pCraft} piece: ${pName}. Intricately prepared with ${pMaterials} through ${pTechnique}, showcasing ${pColors}.`;

    const detailedDesc = variant === 0
      ? `This ${pName} is an authentic handmade ${pCraft} creation. It is meticulously formed using ${pMaterials} through ${pTechnique}. The piece features ${pColors} and is characterized by its ${pSpeciality}. ${pAdditional ? `Additional details: ${pAdditional}.` : ""} Each unit reflects the patient skill and human touch of traditional craftsmanship.`
      : `Crafted in the spirit of living heritage, the ${pName} combines ${pMaterials} with time-honored ${pTechnique}. Its distinctive appearance is highlighted by ${pColors}, and what makes it truly unique is ${pSpeciality}. ${pAdditional ? `Care & craft notes: ${pAdditional}.` : ""} A timeless handmade work designed for conscious living spaces.`;

    const craftStory = variant === 0
      ? `${pCraft} embodies authentic artisanal traditions. This ${pName} honors the materials and methods passed down through craft communities, celebrating ${pMaterials} shaped with ${pTechnique}.`
      : `The craft of ${pCraft} represents cultural heritage and artisanal discipline. Using ${pMaterials}, this piece was fashioned with ${pTechnique} to preserve the authenticity of the craft.`;

    const artisanStory = variant === 0
      ? `${pStory}. Each creation supports authentic artisanal livelihood and keeps living craft practices alive.`
      : `${pStory}. For the artisan studio, each ${pName} is made with personal dedication and cultural respect.`;

    const cleanCraftTag = pCraft.replace(/[^a-zA-Z0-9]/g, "");
    const cleanNameTag = pName.replace(/[^a-zA-Z0-9]/g, "");

    const draftData: ProductDraft = {
      title: `Handcrafted ${pName} — ${pCraft}`,
      category: pCraft,
      craftType: pCraft,
      materials: pMaterials,
      technique: pTechnique,
      keyFeatures: featuresList,
      colorsDesign: pColors,
      shortDescription: shortDesc,
      detailedDescription: detailedDesc,
      craftStory: craftStory,
      artisanStory: artisanStory,
      suggestedTags: [
        `#${cleanCraftTag || "HandmadeCraft"}`,
        `#${cleanNameTag || "ArtisanCraft"}`,
        "#HandmadeInIndia",
        "#ArtisanMade",
        "#VocalForLocal",
        "#TraditionalCraft",
      ],
    };

    setDraft(draftData);
  };

  // 6. Regenerate Product Draft using alternative phrasing from SAME answers
  const handleRegenerateDraft = () => {
    const nextCount = regenerationCount + 1;
    setRegenerationCount(nextCount);
    buildProductDraft(collectedAnswers, nextCount % 2);
  };

  // Step: Draft -> Price Decision
  const handleApproveDraft = () => {
    if (!draft) return;
    try {
      localStorage.setItem(
        "shilpmitra_active_product_draft",
        JSON.stringify({
          ...draft,
          enhancedImage,
        })
      );
      localStorage.setItem("shilpmitra_saved_description", JSON.stringify(draft));
    } catch {
      // fallback
    }

    setCurrentStep("price");
    speakText(
      "नमस्ते! चलिए आपके प्रोडक्ट का सही और उचित मूल्य तय करते हैं। कच्चा माल, कारीगरी मेहनत, और अन्य खर्च दर्ज करें या सुझाई गई कीमत की पुष्टि करें।",
      language
    );
  };

  // Step: Price Decision -> Final Verification Review
  const handleProceedToReview = () => {
    try {
      localStorage.setItem(
        "shilpmitra_analyzed_price",
        JSON.stringify({
          productType: draft?.title,
          totalCost,
          suggestedPrice: calculatedPrice,
          estimatedMargin,
          desiredMargin,
          appliedAt: new Date().toISOString(),
        })
      );
    } catch {
      // fallback
    }

    setCurrentStep("review");
    speakText(
      "बधाई हो! आपकी पूरी प्रोडक्ट डिटेल्स, फोटो और प्राइस तैयार है। कृपया एक बार सब कुछ वेरिफाई करें और 'List to Marketplace' बटन पर क्लिक करें।",
      language
    );
  };

  // Step: Final Review -> List to Marketplace
  const handleListToMarketplace = () => {
    if (!draft) return;

    const finalPrice = calculatedPrice || 850;
    const finalProduct = {
      id: "prod-" + Date.now(),
      name: draft.title,
      craft: draft.craftType,
      price: finalPrice,
      priceFormatted: `₹${finalPrice}`,
      status: "Active" as const,
      imageUrl: enhancedImage?.enhancedUrl || enhancedImage?.originalUrl || "/images/terracotta-craft.jpg",
      stock: stockQuantity,
      salesCount: 0,
      description: draft.shortDescription,
      detailedDescription: draft.detailedDescription,
      materials: draft.materials,
      technique: draft.technique,
      craftStory: draft.craftStory,
      artisanStory: draft.artisanStory,
      tags: draft.suggestedTags,
      listedAt: new Date().toISOString(),
    };

    const mktProduct = {
      id: "mkt-" + Date.now(),
      title: draft.title,
      category: draft.craftType,
      price: finalPrice,
      priceFormatted: `₹${finalPrice}`,
      description: draft.shortDescription,
      imageUrl: finalProduct.imageUrl,
      status: "Live on Marketplace" as const,
      ondcStatus: "Verified" as const,
      views: 1,
      stock: stockQuantity,
    };

    try {
      // 1. Last created product
      localStorage.setItem("shilpmitra_last_created_product", JSON.stringify(finalProduct));

      // 2. Custom products catalog
      const existingCustom = localStorage.getItem("shilpmitra_custom_products");
      let customList = [];
      if (existingCustom) customList = JSON.parse(existingCustom);
      if (!Array.isArray(customList)) customList = [];
      customList.unshift(finalProduct);
      localStorage.setItem("shilpmitra_custom_products", JSON.stringify(customList));

      // 3. Marketplace catalog
      const existingMkt = localStorage.getItem("shilpmitra_marketplace_products");
      let mktList = [];
      if (existingMkt) mktList = JSON.parse(existingMkt);
      if (!Array.isArray(mktList)) mktList = [];
      mktList.unshift(mktProduct);
      localStorage.setItem("shilpmitra_marketplace_products", JSON.stringify(mktList));
    } catch {
      // ignore
    }

    setSavedProductResult({
      title: finalProduct.name,
      craft: finalProduct.craft,
      imageUrl: finalProduct.imageUrl,
      priceFormatted: finalProduct.priceFormatted,
    });

    speakText(
      "बधाई हो! आपका प्रोडक्ट सफलतापूर्वक मार्केटप्लेस पर लाइव लिस्ट हो गया है। खरीदार अब इसे देख और ऑर्डर कर सकते हैं।",
      language
    );
    setCurrentStep("saved");
  };

  // Legacy Save Product to Existing Catalog & Flow
  const handleSaveProduct = () => {
    handleListToMarketplace();
  };

  // Reset to create another product
  const handleCreateAnother = () => {
    setDraft(null);
    setIsEditingDraft(false);
    setCollectedAnswers({
      name: "",
      craft: "",
      materials: "",
      technique: "",
      features: "",
      colorsDesign: "",
      speciality: "",
      story: "",
      additional: "",
    });
    setMessages([]);
    setCurrentSlotIndex(0);
    setCurrentStep("language");
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input for uploading craft photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-warm-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-shilp-orange-700 tracking-wider uppercase">
              AI PRODUCT ASSISTANT
            </span>
            <span className="px-2 py-0.5 rounded-full bg-shilp-orange-100 text-shilp-orange-800 text-[10px] font-bold">
              Conversational Cataloging
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-shilp-charcoal-900 tracking-tight mt-1">
            Create Product with Sahayak
          </h1>
          <p className="text-xs sm:text-sm text-shilp-charcoal-600 mt-1 max-w-2xl">
            Sahayak asks questions one-by-one in your native language. Speak or type your answers naturally to generate a rich, structured product draft.
          </p>
        </div>

        {/* Action / Language control */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {currentStep !== "language" && (
            <div className="flex items-center gap-1.5 bg-[#FFFEFC] border border-warm-border rounded-xl px-3 py-1.5 text-xs text-shilp-charcoal-700">
              <Languages className="w-3.5 h-3.5 text-shilp-orange-600" />
              <span className="font-semibold">{language}</span>
              <button
                type="button"
                onClick={() => setCurrentStep("language")}
                className="text-[10px] text-shilp-orange-600 underline ml-1 hover:text-shilp-orange-800"
              >
                Change
              </button>
            </div>
          )}

          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="px-3.5 py-1.5 text-xs font-semibold text-shilp-charcoal-700 hover:text-shilp-orange-700 bg-white border border-warm-border rounded-xl hover:bg-shilp-cream-50 transition-colors"
            >
              ← Overview
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Product Image Context Banner */}
      {enhancedImage ? (
        <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-shilp-orange-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-shilp-orange-200 shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={enhancedImage.enhancedUrl || enhancedImage.originalUrl}
                alt="Product Visual"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-shilp-orange-600 shrink-0" />
                <span>Your enhanced product image</span>
              </span>
              <p className="text-xs text-shilp-charcoal-700 truncate mt-0.5">
                {enhancedImage.originalFilename || "Enhanced Artisan Craft Photo"}
              </p>
              <p className="text-[11px] text-shilp-charcoal-500">
                Let&apos;s create your product listing.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-semibold text-shilp-charcoal-700 bg-white hover:bg-shilp-cream-50 px-2.5 py-1.5 rounded-xl border border-warm-border shrink-0 transition-colors"
          >
            Change Photo
          </button>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-warm-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-shilp-orange-100 text-shilp-orange-700 flex items-center justify-center shrink-0">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-shilp-charcoal-900 block">
                Have a product photo?
              </span>
              <p className="text-[11px] text-shilp-charcoal-600">
                Attach an enhanced photo or smartphone picture to include with this draft.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-semibold text-shilp-orange-700 bg-white hover:bg-shilp-orange-50 px-3 py-1.5 rounded-xl border border-shilp-orange-200 shrink-0 transition-colors"
          >
            Attach Photo
          </button>
        </div>
      )}

      {/* ========================================================
          STEP 1: LANGUAGE SELECTION
         ======================================================== */}
      {currentStep === "language" && (
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-warm-xs max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-shilp-orange-50 border border-shilp-orange-200 text-shilp-orange-600 flex items-center justify-center mx-auto">
            <Languages className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-shilp-charcoal-900">
              Choose your preferred language
            </h2>
            <p className="text-xs sm:text-sm text-shilp-charcoal-600">
              Sahayak will ask questions and listen in your native language.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {[
              { id: "Hindi" as SupportedLanguage, label: "हिंदी", sub: "Hindi • पूर्ण समर्थन" },
              { id: "English" as SupportedLanguage, label: "English", sub: "English • Full Support" },
              { id: "Marathi" as SupportedLanguage, label: "मराठी", sub: "मराठी • संपूर्ण समर्थन" },
              { id: "Bengali" as SupportedLanguage, label: "বাংলা", sub: "Bengali" },
              { id: "Gujarati" as SupportedLanguage, label: "ગુજરાતી", sub: "Gujarati" },
              { id: "Tamil" as SupportedLanguage, label: "தமிழ்", sub: "Tamil" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectLanguage(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-150 ${
                  language === item.id
                    ? "border-shilp-orange-500 bg-shilp-orange-50/70"
                    : "border-warm-border hover:border-shilp-orange-300 bg-[#FAF6EE]/50 hover:bg-[#FAF6EE]"
                }`}
              >
                <span className="font-bold text-sm sm:text-base text-shilp-charcoal-900 block">
                  {item.label}
                </span>
                <span className="text-[11px] text-stone-500 mt-0.5 block">
                  {item.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 2: CONVERSATION UI
         ======================================================== */}
      {currentStep === "chat" && (
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl shadow-warm-xs overflow-hidden flex flex-col h-[520px]">
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-[#FAF6EE] border-b border-warm-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-shilp-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-shilp-charcoal-900 block leading-tight">
                  🟠 Sahayak AI Companion
                </span>
                <span className="text-[10px] text-stone-500">
                  Question {Math.min(currentSlotIndex + 1, QUESTION_DEFINITIONS.length)} of{" "}
                  {QUESTION_DEFINITIONS.length} • {language}
                </span>
              </div>
            </div>

            {/* Skip to draft if at least name is known */}
            {collectedAnswers.name && (
              <button
                type="button"
                onClick={() => {
                  buildProductDraft(collectedAnswers, 0);
                  setCurrentStep("draft");
                }}
                className="text-[11px] font-semibold text-shilp-orange-700 bg-white hover:bg-shilp-orange-50 px-2.5 py-1 rounded-lg border border-shilp-orange-200 transition-colors"
              >
                Generate Draft Now →
              </button>
            )}
          </div>

          {/* Conversation Bubble Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isSahayak = m.sender === "sahayak";
              const isSpeaking = currentlySpeakingId === m.id;

              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${
                    isSahayak ? "self-start" : "self-end ml-auto flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                      isSahayak
                        ? "bg-shilp-orange-100 text-shilp-orange-700 border border-shilp-orange-200"
                        : "bg-stone-900 text-white"
                    }`}
                  >
                    {isSahayak ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isSahayak
                          ? "bg-[#FAF6EE] text-shilp-charcoal-900 border border-warm-border rounded-tl-sm"
                          : "bg-shilp-orange-600 text-white rounded-tr-sm"
                      }`}
                    >
                      <p>{m.text}</p>

                      {/* 🔊 Listen Button on Sahayak Questions */}
                      {isSahayak && (
                        <div className="pt-2 mt-2 border-t border-warm-border/60 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handlePlayTTS(m.id, m.text)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                              isSpeaking
                                ? "bg-shilp-orange-500 text-white"
                                : "bg-white hover:bg-stone-100 text-stone-700 border border-warm-border"
                            }`}
                            title="Listen to question aloud"
                          >
                            {isSpeaking ? (
                              <>
                                <VolumeX className="w-3 h-3" />
                                <span>Stop</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3 h-3 text-shilp-orange-600" />
                                <span>🔊 Listen</span>
                              </>
                            )}
                          </button>
                          <span className="text-[10px] text-stone-400">{language}</span>
                        </div>
                      )}
                    </div>

                    <span
                      className={`text-[10px] text-stone-400 block px-1 ${
                        isSahayak ? "text-left" : "text-right"
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Notice / Error */}
          {sttError && (
            <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span>{sttError}</span>
              <button
                type="button"
                onClick={() => setSttError(null)}
                className="text-stone-500 text-[10px] underline ml-2"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Answer Input Bar: [🎤] [Type your answer...] [Send] */}
          <form
            onSubmit={handleSendAnswer}
            className="p-3 bg-[#FFFEFC] border-t border-warm-border flex items-center gap-2 sm:gap-3"
          >
            {/* Microphone button (Web Speech API) */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                isListening
                  ? "bg-red-500 text-white"
                  : "bg-shilp-orange-50 hover:bg-shilp-orange-100 text-shilp-orange-600 border border-shilp-orange-200"
              }`}
              title={isListening ? "Listening... click to stop" : "Speak through microphone"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text input (User reviews / edits voice transcription here before sending) */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? "Listening... Speak your answer now..."
                  : "Type your answer here or speak through the microphone..."
              }
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-border bg-[#FAF6EE]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-shilp-orange-500/20 text-stone-900"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-11 h-11 rounded-2xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white flex items-center justify-center shrink-0 shadow-warm-xs transition-colors disabled:opacity-40"
              title="Send answer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================
          STEP 3: GENERATED PRODUCT DRAFT
         ======================================================== */}
      {currentStep === "draft" && draft && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Sahayak Review Voice Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-shilp-orange-500 text-white flex items-center justify-center shrink-0 shadow-warm-xs">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wide">
                  सहायक निर्देश (Sahayak Guidance)
                </span>
                <p className="text-xs sm:text-sm font-medium text-shilp-charcoal-900 mt-0.5">
                  &quot;कृपया अपना प्रोडक्ट डिस्क्रिप्शन एक बार ध्यान से चेक कर लीजिए। अगर सब कुछ सही है, तो &apos;Approve &amp; Go to Price Decision&apos; बटन पर क्लिक करें।&quot;
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                speakText(
                  "कृपया अपना प्रोडक्ट डिस्क्रिप्शन एक बार ध्यान से चेक कर लीजिए। अगर सब कुछ सही है, तो 'Approve & Go to Price Decision' बटन पर क्लिक करें।",
                  language
                );
              }}
              className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-orange-300 text-shilp-orange-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>निर्देश फिर से सुनें</span>
            </button>
          </div>

          <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-xs">
            {/* Draft Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-warm-border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Product Draft Ready
                  </span>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-shilp-charcoal-900">
                    Synthesized Product Listing
                  </h2>
                </div>
              </div>

              {/* Actions: Edit, Regenerate, Approve & Go to Price Decision */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsEditingDraft(!isEditingDraft)}
                  className="px-3.5 py-2 rounded-xl border border-warm-border text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingDraft ? "Done Editing" : "Edit"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateDraft}
                  className="px-3.5 py-2 rounded-xl border border-warm-border text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 transition-colors"
                  title="Regenerate descriptions from same collected answers"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>

                <button
                  type="button"
                  onClick={handleApproveDraft}
                  className="px-4 py-2 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-warm-xs transition-colors"
                >
                  <span>Approve &amp; Go to Price Decision</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-shilp-orange-700 uppercase tracking-wider block">
                PRODUCT TITLE
              </span>
              {isEditingDraft ? (
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  className="w-full p-2 text-sm font-serif font-bold rounded-lg border border-shilp-orange-300 bg-white"
                />
              ) : (
                <h3 className="font-serif text-xl font-bold text-shilp-charcoal-900">{draft.title}</h3>
              )}
            </div>

            {/* Category, Craft Type & Materials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-warm-border text-xs">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide block">
                  CATEGORY &amp; CRAFT TYPE
                </span>
                {isEditingDraft ? (
                  <input
                    type="text"
                    value={draft.craftType}
                    onChange={(e) => setDraft({ ...draft, craftType: e.target.value, category: e.target.value })}
                    className="w-full mt-1 p-1.5 text-xs rounded border border-shilp-orange-300 bg-white font-semibold text-stone-800"
                  />
                ) : (
                  <span className="font-semibold text-stone-800 mt-0.5 block">{draft.craftType}</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-warm-border text-xs">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide block">
                  MATERIALS
                </span>
                {isEditingDraft ? (
                  <input
                    type="text"
                    value={draft.materials}
                    onChange={(e) => setDraft({ ...draft, materials: e.target.value })}
                    className="w-full mt-1 p-1.5 text-xs rounded border border-shilp-orange-300 bg-white font-semibold text-stone-800"
                  />
                ) : (
                  <span className="font-semibold text-stone-800 mt-0.5 block truncate">{draft.materials}</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-warm-border text-xs">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide block">
                  TECHNIQUE
                </span>
                {isEditingDraft ? (
                  <input
                    type="text"
                    value={draft.technique}
                    onChange={(e) => setDraft({ ...draft, technique: e.target.value })}
                    className="w-full mt-1 p-1.5 text-xs rounded border border-shilp-orange-300 bg-white font-semibold text-stone-800"
                  />
                ) : (
                  <span className="font-semibold text-stone-800 mt-0.5 block truncate">{draft.technique}</span>
                )}
              </div>
            </div>

            {/* Key Features & Colors */}
            <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-warm-border text-xs space-y-1.5">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                KEY FEATURES &amp; DESIGN
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {draft.keyFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-warm-border text-stone-800 text-xs font-medium"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-warm-border text-xs sm:text-sm">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  SHORT DESCRIPTION
                </span>
                {isEditingDraft ? (
                  <textarea
                    rows={2}
                    value={draft.shortDescription}
                    onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-shilp-orange-300 bg-white"
                  />
                ) : (
                  <p className="text-stone-700 leading-relaxed">{draft.shortDescription}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-warm-border text-xs sm:text-sm space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  DETAILED PRODUCT DESCRIPTION
                </span>
                {isEditingDraft ? (
                  <textarea
                    rows={4}
                    value={draft.detailedDescription}
                    onChange={(e) => setDraft({ ...draft, detailedDescription: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-shilp-orange-300 bg-white"
                  />
                ) : (
                  <p className="text-stone-700 leading-relaxed">{draft.detailedDescription}</p>
                )}
              </div>
            </div>

            {/* Stories: Craft Story + Artisan Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-shilp-orange-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-shilp-orange-900 uppercase tracking-wider block">
                  CRAFT STORY
                </span>
                {isEditingDraft ? (
                  <textarea
                    rows={3}
                    value={draft.craftStory}
                    onChange={(e) => setDraft({ ...draft, craftStory: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-shilp-orange-300 bg-white"
                  />
                ) : (
                  <p className="text-shilp-orange-950 leading-relaxed">{draft.craftStory}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-shilp-orange-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-shilp-orange-900 uppercase tracking-wider block">
                  ARTISAN STORY
                </span>
                {isEditingDraft ? (
                  <textarea
                    rows={3}
                    value={draft.artisanStory}
                    onChange={(e) => setDraft({ ...draft, artisanStory: e.target.value })}
                    className="w-full p-2 text-xs rounded-xl border border-shilp-orange-300 bg-white"
                  />
                ) : (
                  <p className="text-shilp-orange-950 leading-relaxed">{draft.artisanStory}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                DISCOVERY TAGS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {draft.suggestedTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-[11px] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Approval Card */}
            <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-warm-border flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <span className="text-xs text-shilp-charcoal-700 font-medium">
                विवरण चेक कर लिया? अब सही कीमत तय करने के लिए अगले स्टेप पर बढ़ें।
              </span>
              <button
                type="button"
                onClick={handleApproveDraft}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-warm-md hover:shadow-warm-lg transition-all"
              >
                <span>स्वीकार करें और प्राइस डिसीजन पर जाएं (Approve &amp; Go to Price Decision)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 4: PRICE DECISION & ANALYSIS
         ======================================================== */}
      {currentStep === "price" && draft && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Voice Prompt Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-shilp-orange-500 text-white flex items-center justify-center shrink-0 shadow-warm-xs">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wide">
                  सहायक प्राइस गाइडेंस (Price Decision)
                </span>
                <p className="text-xs sm:text-sm font-medium text-shilp-charcoal-900 mt-0.5">
                  &quot;नमस्ते! चलिए आपके प्रोडक्ट का सही और उचित मूल्य तय करते हैं। कच्चा माल, कारीगरी मेहनत, और अन्य खर्च दर्ज करें या सुझाई गई कीमत की पुष्टि करें।&quot;
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                speakText(
                  "नमस्ते! चलिए आपके प्रोडक्ट का सही और उचित मूल्य तय करते हैं। कच्चा माल, कारीगरी मेहनत, और अन्य खर्च दर्ज करें या सुझाई गई कीमत की पुष्टि करें।",
                  language
                );
              }}
              className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-orange-300 text-shilp-orange-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>निर्देश फिर से सुनें</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Cost Inputs */}
            <div className="lg:col-span-7 bg-[#FFFEFC] border border-warm-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-xs">
              <div>
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-shilp-orange-600" />
                  <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wider">
                    मूल्य निर्धारण (Price Calculation)
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-shilp-charcoal-900 mt-1">
                  {draft.title}
                </h3>
                <p className="text-xs text-shilp-charcoal-600 mt-0.5">
                  पारदर्शी लागत और उचित कारीगर मुनाफा तय करें।
                </p>
              </div>

              {/* Input 1: Material Cost */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-shilp-charcoal-800 flex items-center gap-1.5">
                    <span>1. कच्चा माल (Raw Material Cost)</span>
                  </label>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">₹{materialCost}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={3000}
                  step={10}
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className="w-full accent-shilp-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>₹50 (न्यूनतम)</span>
                  <span>₹3,000 (अधिकतम)</span>
                </div>
              </div>

              {/* Input 2: Labour Cost */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-shilp-charcoal-800 flex items-center gap-1.5">
                    <span>2. कारीगरी मेहनत (Artisan Labour Hours)</span>
                  </label>
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">₹{labourCost}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={20}
                  value={labourCost}
                  onChange={(e) => setLabourCost(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>₹100 (न्यूनतम)</span>
                  <span>₹5,000 (उच्च शिल्प)</span>
                </div>
              </div>

              {/* Input 3: Overhead / Packaging */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-shilp-charcoal-800 flex items-center gap-1.5">
                    <span>3. पैकेजिंग व अन्य खर्च (Packaging &amp; Overhead)</span>
                  </label>
                  <span className="font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">₹{otherCost}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={1000}
                  step={10}
                  value={otherCost}
                  onChange={(e) => setOtherCost(Number(e.target.value))}
                  className="w-full accent-stone-600 cursor-pointer"
                />
              </div>

              {/* Input 4: Desired Profit Margin */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-shilp-charcoal-800 flex items-center gap-1.5">
                    <span>4. कारीगर मुनाफा मार्जिन (Artisan Profit %)</span>
                  </label>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{desiredMargin}% (₹{estimatedMargin})</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={70}
                  step={5}
                  value={desiredMargin}
                  onChange={(e) => setDesiredMargin(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Cost Breakdown Visual Bar */}
              <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-warm-border space-y-2">
                <div className="flex justify-between text-xs font-bold text-shilp-charcoal-800">
                  <span>लागत व मुनाफा संरचना (Cost Breakdown)</span>
                  <span>कुल लागत: ₹{totalCost}</span>
                </div>
                <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden flex">
                  <div style={{ width: `${materialPct}%` }} className="bg-amber-500 h-full" title={`Material ${materialPct}%`} />
                  <div style={{ width: `${labourPct}%` }} className="bg-blue-600 h-full" title={`Labour ${labourPct}%`} />
                  <div style={{ width: `${otherPct}%` }} className="bg-stone-400 h-full" title={`Overhead ${otherPct}%`} />
                  <div style={{ width: `${marginPct}%` }} className="bg-emerald-500 h-full" title={`Margin ${marginPct}%`} />
                </div>
                <div className="flex flex-wrap justify-between text-[11px] text-stone-600 pt-1">
                  <span>कच्चा माल: {materialPct}%</span>
                  <span>कारीगरी: {labourPct}%</span>
                  <span>अन्य: {otherPct}%</span>
                  <span className="font-bold text-emerald-700">मुनाफा: {marginPct}%</span>
                </div>
              </div>
            </div>

            {/* Right: Suggested Price & Final Review Trigger */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FFFEFC] border-2 border-shilp-orange-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-md">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-shilp-orange-600" />
                  <span className="text-[11px] font-bold text-shilp-orange-800 uppercase tracking-wider">
                    सुझाई गई उचित बिक्री कीमत (Fair Price)
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFF9F0] to-[#FAF6EE] border border-shilp-orange-200 text-center space-y-1">
                  <span className="text-xs text-shilp-charcoal-600 block uppercase font-medium">
                    Marketplace Selling Price
                  </span>
                  <div className="font-serif text-4xl sm:text-5xl font-extrabold text-shilp-charcoal-900 tracking-tight">
                    ₹{calculatedPrice}
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold inline-block pt-1">
                    ✓ कारीगर की शुद्ध बचत: +₹{estimatedMargin} प्रति पीस
                  </span>
                </div>

                {/* Stock Quantity */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-shilp-charcoal-800 block">
                    स्टॉक मात्रा (Available Inventory Units)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2.5 rounded-xl border border-warm-border text-sm font-semibold bg-white"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={handleProceedToReview}
                    className="w-full py-3.5 px-4 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white font-bold text-sm shadow-warm-md flex items-center justify-center gap-2 transition-all hover:shadow-warm-lg"
                  >
                    <span>Verify &amp; Proceed to Final Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("draft")}
                    className="w-full py-2.5 px-4 rounded-xl border border-warm-border text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
                  >
                    ← वापस विवरण चेक करें (Back to Description)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 5: FINAL VERIFICATION REVIEW & LIST TO MARKETPLACE
         ======================================================== */}
      {currentStep === "review" && draft && (
        <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
          {/* Voice Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-warm-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-warm-xs">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                  सहायक फाइनल रिव्यू (Final Verification)
                </span>
                <p className="text-xs sm:text-sm font-medium text-emerald-950 mt-0.5">
                  &quot;बधाई हो! आपकी पूरी प्रोडक्ट डिटेल्स, फोटो और प्राइस तैयार है। कृपया एक बार सब कुछ वेरिफाई करें और &apos;List to Marketplace&apos; बटन पर क्लिक करें।&quot;
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                speakText(
                  "बधाई हो! आपकी पूरी प्रोडक्ट डिटेल्स, फोटो और प्राइस तैयार है। कृपया एक बार सब कुछ वेरिफाई करें और 'List to Marketplace' बटन पर क्लिक करें।",
                  language
                );
              }}
              className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>निर्देश फिर से सुनें</span>
            </button>
          </div>

          {/* Master Final Review Card */}
          <div className="bg-[#FFFEFC] border-2 border-warm-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-warm-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-warm-border">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Ready for National Commerce
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-shilp-charcoal-900 mt-0.5">
                  Final Product Verification
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold self-start sm:self-auto">
                All Details Verified
              </span>
            </div>

            {/* Split layout: Photo + Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Photo */}
              <div className="md:col-span-5 space-y-2">
                <div className="relative h-[280px] sm:h-[340px] rounded-2xl overflow-hidden bg-stone-100 border border-warm-border flex items-center justify-center p-2 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={enhancedImage?.enhancedUrl || enhancedImage?.originalUrl || "/images/terracotta-craft.jpg"}
                    alt={draft.title}
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-shilp-orange-600 text-white text-[10px] font-bold tracking-wide uppercase flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      Studio Enhanced Photo
                    </span>
                  </div>
                </div>
                <div className="text-center text-[11px] text-stone-500">
                  {enhancedImage?.originalFilename || "Enhanced Artisan Craft Photo"}
                </div>
              </div>

              {/* Core Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-shilp-orange-700 uppercase tracking-wider block">
                    {draft.craftType} • {draft.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-shilp-charcoal-900 mt-0.5">
                    {draft.title}
                  </h3>
                </div>

                {/* Price & Stock Badge */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-stone-600 block">Marketplace Selling Price</span>
                    <span className="font-serif text-3xl font-extrabold text-shilp-charcoal-900">₹{calculatedPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-medium text-stone-600 block">Inventory Available</span>
                    <span className="text-base font-bold text-emerald-700">{stockQuantity} Units In Stock</span>
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Product Summary
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#FAF6EE] p-3 rounded-xl border border-warm-border">
                    {draft.shortDescription}
                  </p>
                </div>

                {/* Craft Story */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    Authentic Craft Story
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#FAF6EE] p-3 rounded-xl border border-warm-border">
                    {draft.craftStory}
                  </p>
                </div>

                {/* Materials & Technique */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Materials</span>
                    <span className="font-semibold text-stone-800">{draft.materials}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">Technique</span>
                    <span className="font-semibold text-stone-800">{draft.technique}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Back to Price, List to Marketplace */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-warm-border">
              <button
                type="button"
                onClick={() => setCurrentStep("price")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-warm-border text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
              >
                ← Edit Price (कीमत बदलें)
              </button>

              <button
                type="button"
                onClick={handleListToMarketplace}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-warm-lg hover:shadow-warm-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>🚀 List to Marketplace (मार्केटप्लेस पर लाइव लिस्ट करें)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 6: SAVED PRODUCT CONFIRMATION
         ======================================================== */}
      {currentStep === "saved" && savedProductResult && (
        <div className="bg-[#FFFEFC] border border-warm-border rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-warm-xs max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-shilp-charcoal-900">
              Product Successfully Listed on Marketplace!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              आपका प्रोडक्ट अब मार्केटप्लेस पर लाइव लिस्ट हो चुका है। राष्ट्रीय व अंतर्राष्ट्रीय खरीदार अब इसे ऑर्डर कर सकते हैं।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-warm-border flex items-center gap-3 text-left">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-warm-border shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={savedProductResult.imageUrl}
                alt={savedProductResult.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-serif font-bold text-sm text-stone-900 block truncate">
                {savedProductResult.title}
              </span>
              <span className="text-xs text-stone-500 block">
                {savedProductResult.craft}
              </span>
              <span className="font-bold text-emerald-700 text-xs">
                {savedProductResult.priceFormatted} • Live on Marketplace
              </span>
            </div>
          </div>

          {/* Action Buttons: [View in Marketplace] [View in My Products] [Create Another Product] */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigateTab?.("marketplace")}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-warm-xs transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View in Marketplace</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab?.("products")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-warm-border bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Package className="w-3.5 h-3.5" />
              <span>View in My Products</span>
            </button>

            <button
              type="button"
              onClick={handleCreateAnother}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-shilp-orange-500 hover:bg-shilp-orange-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-warm-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Another Product</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
