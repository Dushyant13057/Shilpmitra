export type EnhancementStatus = "uploaded" | "processing" | "completed" | "failed";

export interface ProductImage {
  id: string;
  user_id: string;
  product_id?: string | null;
  original_path: string;
  enhanced_path?: string | null;
  original_filename: string;
  mime_type: string;
  file_size: number;
  enhancement_status: EnhancementStatus;
  enhancement_provider?: string | null;
  created_at: string;
  updated_at: string;
  original_url?: string;
  enhanced_url?: string;
}

export interface UploadResponse {
  id: string;
  originalPath: string;
  originalUrl: string;
  status: EnhancementStatus;
  originalFilename: string;
  fileSize: number;
}

export interface EnhanceResponse {
  id: string;
  originalUrl: string;
  enhancedUrl: string;
  status: EnhancementStatus;
  provider: string;
  message?: string;
}

export interface ImageDetailResponse {
  id: string;
  userId: string;
  originalPath: string;
  originalUrl: string;
  enhancedPath?: string;
  enhancedUrl?: string;
  originalFilename: string;
  mimeType: string;
  fileSize: number;
  enhancementStatus: EnhancementStatus;
  enhancementProvider?: string;
  createdAt: string;
  updatedAt: string;
}

export type EnhancementUIState = "idle" | "preview" | "processing" | "completed" | "failed";
