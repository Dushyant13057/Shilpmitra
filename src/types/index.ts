export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  badge?: string;
  accentColor?: string;
}

export interface JourneyStepItem {
  step: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SahayakMessage {
  id: string;
  sender: 'sahayak' | 'artisan';
  text: string;
  audioDuration?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  rawPrice: number;
  category: string;
  imageUrl: string;
  artisanName?: string;
  artisanRegion?: string;
  tag?: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  gender: string;
  dob: string;
  password: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface BasicProfile {
  fullName: string;
  email: string;
  contactNumber: string;
  gender: string;
  dob: string;
  city: string;
  state: string;
  pinCode: string;
  isRegistered?: boolean;
}

export interface Profile {
  id: string;
  full_name: string;
  contact_number: string;
  gender: string;
  date_of_birth: string;
  city: string;
  state: string;
  pin_code: string;
  role?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export type DashboardTab =
  | "dashboard"
  | "image-enhancement"
  | "ai-description"
  | "ai-product-assistant"
  | "story-generator"
  | "price-analysis"
  | "marketplace"
  | "ads"
  | "sahayak"
  | "products"
  | "orders"
  | "my-profile"
  | "basic-info"
  | "artisan-profile"
  | "business-profile"
  | "settings";

export interface SidebarNavItem {
  id: DashboardTab;
  label: string;
  badge?: string;
  iconName: string;
}

