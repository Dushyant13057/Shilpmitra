import { NavItem, LanguageOption } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "How It Works", href: "#journey" },
  { label: "Features", href: "#features" },
  { label: "Sahayak", href: "#sahayak" },
  { label: "About", href: "#about" },
];

export const languages: LanguageOption[] = [
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
];
