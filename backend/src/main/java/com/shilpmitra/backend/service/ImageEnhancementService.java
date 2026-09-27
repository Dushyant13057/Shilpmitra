package com.shilpmitra.backend.service;

import java.util.concurrent.CompletableFuture;

/**
 * Dedicated Image Enhancement service abstraction.
 * Decouples the frontend and controller from the specific AI provider (Replicate, local model, etc.)
 * so the provider can be swapped at any time without modifying controllers or frontend code.
 */
public interface ImageEnhancementService {

    /**
     * Enhances an image given an accessible URL of the original image.
     *
     * @param imageUrl Accessible URL of the original image (e.g. signed URL)
     * @param mimeType MIME type of the original image
     * @return CompletableFuture containing the enhanced image byte array or public result URL
     */
    CompletableFuture<byte[]> enhanceImage(String imageUrl, String mimeType);

    /**
     * Name/identifier of the AI provider (e.g., "replicate/real-esrgan").
     */
    String getProviderName();

    /**
     * Indicates whether the AI service is properly configured with credentials.
     */
    boolean isConfigured();
}
