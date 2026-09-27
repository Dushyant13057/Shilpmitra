import { createClient } from "@/lib/supabase/client";
import { UploadResponse, EnhanceResponse, ImageDetailResponse } from "@/types/imageEnhancement";

/**
 * Retrieves the current authenticated user's access token from Supabase.
 */
async function getAuthToken(): Promise<string> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error("You must be logged in to use this feature.");
  }
  return session.access_token;
}

/**
 * Uploads an artisan product image to the backend.
 */
export async function uploadProductImage(file: File): Promise<UploadResponse> {
  const token = await getAuthToken();

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/image-enhancement/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to upload image. Please try again.");
  }

  return data as UploadResponse;
}

/**
 * Triggers AI enhancement on an uploaded product image.
 */
export async function enhanceProductImage(imageId: string): Promise<EnhanceResponse> {
  const token = await getAuthToken();

  const res = await fetch(`/api/image-enhancement/${imageId}/enhance`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Image enhancement failed. Please try again.");
  }

  return data as EnhanceResponse;
}

/**
 * Fetches status and signed URLs of a product image record.
 */
export async function getProductImage(imageId: string): Promise<ImageDetailResponse> {
  const token = await getAuthToken();

  const res = await fetch(`/api/image-enhancement/${imageId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch image details.");
  }

  return data as ImageDetailResponse;
}
