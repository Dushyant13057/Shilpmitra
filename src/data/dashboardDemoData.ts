import { BasicProfile } from "@/types";

export interface DashboardArtisan {
  name: string;
  role: string;
  location: string;
  contact: string;
  status: "Active" | "Pending" | "Inactive";
  joinedDate: string;
}

export interface DashboardStatItem {
  id: string;
  label: string;
  value: string | number;
  subtext: string;
  change?: string;
  trend?: "up" | "neutral";
  category: "products" | "orders" | "pending" | "setup";
}

export interface DashboardProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
  status: "Active" | "Draft" | "Out of Stock";
  imageUrl: string;
  salesCount: number;
  stock: number;
}

export interface DashboardOrder {
  id: string;
  orderNumber: string;
  productName: string;
  amount: number;
  amountFormatted: string;
  status: "Processing" | "Delivered" | "Pending" | "Cancelled";
  date: string;
  customerCity: string;
}

export interface FeatureModuleInfo {
  id: string;
  title: string;
  category: "DASHBOARD" | "AI TOOLS" | "COMMERCE" | "SAHAYAK" | "MY WORKSPACE" | "PROFILE" | "SETTINGS";
  eyebrow: string;
  description: string;
  badge: string;
  buttonText: string;
  plannedCapabilities: string[];
  disclaimer: string;
}

/**
 * Safe Demo Artisan Data (No hard-coded real names or real locations)
 * Ready to be replaced by Supabase Auth + Spring Boot profile data in Phase 2.
 */
export const demoArtisanData: DashboardArtisan = {
  name: "Demo Artisan",
  role: "Master Craftsman",
  location: "Demo City, Demo State",
  contact: "+91 98765 43210",
  status: "Active",
  joinedDate: "September 2026",
};

/**
 * Safe Demo Basic Signup Info (9 finalized fields)
 */
export const demoBasicInfoData: BasicProfile = {
  fullName: "Demo Artisan",
  email: "artisan.demo@shilpmitra.com",
  contactNumber: "9876543210",
  gender: "Not Specified",
  dob: "1990-01-01",
  city: "Demo City",
  state: "Demo State",
  pinCode: "110001",
  isRegistered: true,
};

/**
 * Demo Workspace Statistics
 */
export const demoStatsData: DashboardStatItem[] = [
  {
    id: "stat-products",
    label: "Products",
    value: "12",
    subtext: "Craft listings in catalog",
    change: "+3 this month",
    trend: "up",
    category: "products",
  },
  {
    id: "stat-orders",
    label: "Orders",
    value: "4",
    subtext: "Total artisan orders",
    change: "+2 this week",
    trend: "up",
    category: "orders",
  },
  {
    id: "stat-pending",
    label: "Pending Orders",
    value: "2",
    subtext: "Awaiting dispatch",
    change: "Requires attention",
    trend: "neutral",
    category: "pending",
  },
  {
    id: "stat-setup",
    label: "Basic Account Setup",
    value: "100%",
    subtext: "9 of 9 basic details completed",
    change: "Verified",
    trend: "up",
    category: "setup",
  },
];

/**
 * Demo Products (3 primary cards as specified in Requirement 11)
 */
export const demoProductsData: DashboardProduct[] = [
  {
    id: "prod-1",
    name: "Terracotta Pot",
    category: "Clay Craft",
    price: 850,
    priceFormatted: "₹850",
    status: "Active",
    imageUrl: "/images/terracotta-craft.jpg",
    salesCount: 18,
    stock: 24,
  },
  {
    id: "prod-2",
    name: "Handcrafted Vase",
    category: "Wood Carving",
    price: 1200,
    priceFormatted: "₹1,200",
    status: "Active",
    imageUrl: "/images/wood-handicraft.jpg",
    salesCount: 9,
    stock: 15,
  },
  {
    id: "prod-3",
    name: "Handwoven Bag",
    category: "Handloom",
    price: 950,
    priceFormatted: "₹950",
    status: "Draft",
    imageUrl: "/images/craft-weaving.jpg",
    salesCount: 0,
    stock: 10,
  },
];

/**
 * Demo Orders (as specified in Requirement 12)
 */
export const demoOrdersData: DashboardOrder[] = [
  {
    id: "ord-1",
    orderNumber: "#SM1024",
    productName: "Terracotta Pot",
    amount: 850,
    amountFormatted: "₹850",
    status: "Processing",
    date: "25 Sep 2026",
    customerCity: "Jaipur, Rajasthan",
  },
  {
    id: "ord-2",
    orderNumber: "#SM1023",
    productName: "Handwoven Bag",
    amount: 950,
    amountFormatted: "₹950",
    status: "Delivered",
    date: "23 Sep 2026",
    customerCity: "Ahmedabad, Gujarat",
  },
  {
    id: "ord-3",
    orderNumber: "#SM1022",
    productName: "Handcrafted Vase",
    amount: 1200,
    amountFormatted: "₹1,200",
    status: "Pending",
    date: "21 Sep 2026",
    customerCity: "Pune, Maharashtra",
  },
];

/**
 * Demo / Coming Soon Feature Module Specifications
 */
export const demoFeatureModules: Record<string, FeatureModuleInfo> = {
  "image-enhancement": {
    id: "image-enhancement",
    title: "Image Enhancement",
    category: "AI TOOLS",
    eyebrow: "AI VISION ENGINE",
    description: "Enhance smartphone photos of your handmade crafts into studio-grade marketplace listings with automated lighting and rustic artisan background tuning.",
    badge: "AI • Demo",
    buttonText: "Image Enhancement Coming Soon",
    plannedCapabilities: [
      "Automatic studio lighting and shadow correction for handmade crafts",
      "Traditional Indian fabric weave and wooden texture detail sharpening",
      "Smart background replacement with authentic heritage workshop scenes",
      "One-tap aspect ratio optimization for marketplace and social media",
    ],
    disclaimer: "Computer vision and image enhancement pipelines will be integrated in Phase 2 with serverless GPU microservices.",
  },
  "ai-description": {
    id: "ai-description",
    title: "AI Description",
    category: "AI TOOLS",
    eyebrow: "CRAFT CATALOGING",
    description: "Transform simple craft notes and material keywords into evocative, search-optimized product descriptions tailored for domestic and international buyers.",
    badge: "AI • Demo",
    buttonText: "AI Description Coming Soon",
    plannedCapabilities: [
      "Authentic craft terminology suggestions (e.g., Zari, Dokra, Bidriware, Terracotta)",
      "SEO-optimized product titles and bullet points for digital discovery",
      "Material care instructions and artisan heritage preservation notes",
      "Automated multi-language generation in English and Hindi",
    ],
    disclaimer: "Natural language generation models are being tuned with state handicraft dictionaries. Full API will be available in Phase 2.",
  },
  "story-generator": {
    id: "story-generator",
    title: "Story Generator",
    category: "AI TOOLS",
    eyebrow: "HERITAGE & NARRATIVE",
    description: "Capture your workshop's generational journey, traditional techniques, and cultural legacy in captivating narratives that connect buyers to your authentic craft.",
    badge: "AI • Demo",
    buttonText: "Story Generator Coming Soon",
    plannedCapabilities: [
      "Generational lineage storytelling based on your family apprenticeship",
      "Cultural narrative tags for GI-certified regional craft traditions",
      "Shareable short-form stories for exhibition cards and product hangtags",
      "Buyer emotional connection index and authenticity scoring",
    ],
    disclaimer: "Artisan story synthesis models will connect to verified artisan profile data in Phase 2.",
  },
  "price-analysis": {
    id: "price-analysis",
    title: "Price Analysis",
    category: "AI TOOLS",
    eyebrow: "FAIR TRADE VALUATION",
    description: "Calculate fair and profitable selling prices based on raw material costs, hours of intricate handiwork, and national handicraft market benchmarks.",
    badge: "AI • Demo",
    buttonText: "Price Analysis Coming Soon",
    plannedCapabilities: [
      "Handmade labor-hour valuation ensuring living wages for artisans",
      "Real-time raw material cost index (natural clay, silk yarn, brass ingots)",
      "Tiered pricing recommendations: Direct Buyer vs. Exhibition vs. Corporate Bulk",
      "Competitive pricing comparison across national craft emporiums",
    ],
    disclaimer: "Pricing benchmark algorithms are being formulated in partnership with artisan cooperatives. Full pricing tool launches in Phase 2.",
  },
  marketplace: {
    id: "marketplace",
    title: "Marketplace",
    category: "COMMERCE",
    eyebrow: "SALES CHANNELS",
    description: "Marketplace functionality is being prepared for the next phase. Connect your workshop directly to national buyers, government exhibitions, and corporate gifting.",
    badge: "Commerce • Demo",
    buttonText: "Marketplace Syndication Coming Soon",
    plannedCapabilities: [
      "One-click listing syndication across ONDC & GeM portals",
      "Direct buyer inquiry chat with regional language translation",
      "Fair pricing recommendations based on artisanal labor hours",
      "Seasonal handicraft exhibition booking passes",
    ],
    disclaimer: "Marketplace seller agreements and commission-free guild contracts are under review. No marketplace database is active yet.",
  },
  ads: {
    id: "ads",
    title: "Ads & Promotions",
    category: "COMMERCE",
    eyebrow: "GROWTH TOOLS",
    description: "Simple, one-click social media promotions and local craft festival banners designed specifically for small artisan studios.",
    badge: "Commerce • Demo",
    buttonText: "Ads Manager Coming Soon",
    plannedCapabilities: [
      "Automated Instagram & Facebook showcase posts from product photos",
      "Festival greeting cards featuring your handmade craft",
      "Micro-budget local area promotion for exhibitions",
      "Artisan badge for authentic handmade certification",
    ],
    disclaimer: "Advertising and promotional tools will be activated once product listings and marketplace channels are live.",
  },
  sahayak: {
    id: "sahayak",
    title: "Shilp Sahayak",
    category: "SAHAYAK",
    eyebrow: "VOICE AI CO-PILOT",
    description: "Your personalized voice assistant capable of conversing in Hindi, Gujarati, Bengali, Tamil, and 8+ Indian regional dialects to manage your shop hands-free.",
    badge: "Voice • Demo",
    buttonText: "Voice Assistant Coming Soon",
    plannedCapabilities: [
      "Voice-to-listing: Speak about your craft to auto-fill product details",
      "Daily order briefings in your mother tongue",
      "Government scheme & PM Vishwakarma eligibility guidance",
      "Market trend advice on high-demand craft designs",
    ],
    disclaimer: "Speech recognition models for regional craft terminology are currently being benchmarked. Full voice interface will launch in Phase 2.",
  },
  products: {
    id: "products",
    title: "My Products",
    category: "MY WORKSPACE",
    eyebrow: "CATALOG WORKSPACE",
    description: "Full product inventory, handmade batch tracking, and multi-photo artisanal gallery controls will be configured here.",
    badge: "Workspace • Demo",
    buttonText: "Product Creation Coming Soon",
    plannedCapabilities: [
      "AI-assisted smartphone photography enhancement",
      "Handmade craft storytelling & material description generator",
      "Batch inventory and raw material cost estimator",
      "Direct publishing to ONDC & ShilpMitra buyer app",
    ],
    disclaimer: "Product schema and inventory models are being finalized with artisan guild stakeholders. Full catalog CRUD will be integrated with Java Spring Boot API.",
  },
  orders: {
    id: "orders",
    title: "Orders & Fulfillment",
    category: "MY WORKSPACE",
    eyebrow: "LOGISTICS WORKSPACE",
    description: "Track customer orders, generate shipping waybills, and receive automated packaging instructions for fragile artisanal crafts.",
    badge: "Workspace • Demo",
    buttonText: "Fulfillment Pipeline Coming Soon",
    plannedCapabilities: [
      "Live order notifications via SMS & WhatsApp in local languages",
      "Discounted artisan shipping pickup partnerships (India Post / Shiprocket)",
      "Automated fragile packaging guidance for terracotta & brass crafts",
      "Instant UPI payout upon verified customer delivery",
    ],
    disclaimer: "Logistics and payment gateway integration will be implemented in subsequent phases after marketplace specifications are approved.",
  },
  "artisan-profile": {
    id: "artisan-profile",
    title: "Artisan Profile",
    category: "PROFILE",
    eyebrow: "HERITAGE & CRAFT IDENTITY",
    description: "Your craft profile will be configured here once your artisan information requirements are finalized.",
    badge: "Phase 2 • Coming Soon",
    buttonText: "Coming Soon",
    plannedCapabilities: [
      "Traditional craft category & GI cluster mapping",
      "Generational lineage and master apprenticeship history",
      "State & National Master Artisan award verification",
      "Artisan ID (Pehchan Card) digital linking",
    ],
    disclaimer: "Artisan profile requirements have not been finalized yet. No forms or database tables are created in this phase.",
  },
  "business-profile": {
    id: "business-profile",
    title: "Business Profile",
    category: "PROFILE",
    eyebrow: "WORKSHOP & ENTERPRISE",
    description: "Your business information will be configured here once the business requirements are finalized.",
    badge: "Phase 2 • Coming Soon",
    buttonText: "Coming Soon",
    plannedCapabilities: [
      "Workshop location, equipment, kiln/loom capacity details",
      "Self-Help Group (SHG) / Family cooperative structure",
      "Monthly handmade production volume and capacity estimates",
      "Udyam / GST / MSME registration details",
    ],
    disclaimer: "Business and enterprise workflow specifications are under active stakeholder review. Requirements will be finalized before database schema implementation.",
  },
  settings: {
    id: "settings",
    title: "Workspace Settings",
    category: "SETTINGS",
    eyebrow: "PREFERENCES",
    description: "Manage workspace display language, notification channels, and account security preferences.",
    badge: "Phase 2 • Coming Soon",
    buttonText: "Preferences Coming Soon",
    plannedCapabilities: [
      "Primary regional dialect and voice playback speed",
      "SMS, WhatsApp, or Phone call notification preferences",
      "Password change and two-factor artisan authentication",
      "Offline sync settings for remote craft workshops",
    ],
    disclaimer: "Workspace settings will connect to Supabase Auth and user preferences table in Phase 2.",
  },
};
