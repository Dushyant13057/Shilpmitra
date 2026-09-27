package com.shilpmitra.backend.controller;

import com.shilpmitra.backend.model.*;
import com.shilpmitra.backend.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/image-enhancement")
public class ImageEnhancementController {

    private static final Logger log = LoggerFactory.getLogger(ImageEnhancementController.class);

    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
    );

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    private final AuthVerificationService authVerificationService;
    private final SupabaseStorageService supabaseStorageService;
    private final ProductImageRepositoryService productImageRepositoryService;
    private final ImageEnhancementService imageEnhancementService;

    public ImageEnhancementController(
            AuthVerificationService authVerificationService,
            SupabaseStorageService supabaseStorageService,
            ProductImageRepositoryService productImageRepositoryService,
            ImageEnhancementService imageEnhancementService
    ) {
        this.authVerificationService = authVerificationService;
        this.supabaseStorageService = supabaseStorageService;
        this.productImageRepositoryService = productImageRepositoryService;
        this.imageEnhancementService = imageEnhancementService;
    }

    /**
     * POST /api/image-enhancement/upload
     * Accepts image file and stores it in Supabase Storage and PostgreSQL product_images table.
     */
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam("file") MultipartFile file
    ) {
        UUID verifiedUserId;
        try {
            verifiedUserId = authVerificationService.verifyTokenAndGetUserId(authHeader);
        } catch (SecurityException se) {
            log.warn("Unauthorized upload attempt: {}", se.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized access. Please log in to upload product images."));
        }

        // Validate file presence
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please select an image file to upload."));
        }

        // Validate file size
        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.badRequest().body(Map.of("error", "File exceeds the 10MB maximum upload limit."));
        }

        // Validate MIME type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Unsupported image format. Accepted formats are JPG, JPEG, PNG, and WEBP."
            ));
        }

        try {
            String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.jpg";
            String safeBaseName = originalFilename.replaceAll("[^a-zA-Z0-9._-]", "_");
            String uniqueFilename = UUID.randomUUID() + "_" + safeBaseName;

            // Upload original image to private storage bucket under {user_id}/originals/...
            String storagePath = supabaseStorageService.uploadBytes(
                    verifiedUserId,
                    "originals",
                    uniqueFilename,
                    file.getBytes(),
                    contentType,
                    authHeader
            );

            // Generate signed URL for frontend display
            String originalUrl = supabaseStorageService.getSignedUrl(storagePath, 3600, authHeader);

            // Save record in PostgreSQL public.product_images
            ProductImage record = new ProductImage();
            record.setUserId(verifiedUserId);
            record.setOriginalPath(storagePath);
            record.setOriginalFilename(originalFilename);
            record.setMimeType(contentType);
            record.setFileSize(file.getSize());
            record.setEnhancementStatus(EnhancementStatus.uploaded.name());

            ProductImage saved = productImageRepositoryService.insert(record, authHeader);

            UploadResponse response = new UploadResponse(
                    saved.getId(),
                    saved.getOriginalPath(),
                    originalUrl,
                    saved.getEnhancementStatus(),
                    saved.getOriginalFilename(),
                    saved.getFileSize()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            log.error("Failed to process image upload: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Unable to upload and store product image. Please try again."));
        }
    }

    /**
     * POST /api/image-enhancement/{imageId}/enhance
     * Performs AI enhancement using the configured ImageEnhancementService.
     */
    @PostMapping("/{imageId}/enhance")
    public ResponseEntity<?> enhanceImage(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable("imageId") UUID imageId
    ) {
        UUID verifiedUserId;
        try {
            verifiedUserId = authVerificationService.verifyTokenAndGetUserId(authHeader);
        } catch (SecurityException se) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized access."));
        }

        // Fetch image record and verify artisan ownership
        Optional<ProductImage> imageOpt = productImageRepositoryService.findByIdAndUserId(imageId, verifiedUserId, authHeader);
        if (imageOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Image not found or unauthorized access."));
        }

        ProductImage record = imageOpt.get();

        // Check if AI service is configured
        if (!imageEnhancementService.isConfigured()) {
            productImageRepositoryService.updateEnhancementStatus(
                    imageId, verifiedUserId, EnhancementStatus.failed.name(), null, "replicate", authHeader
            );
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of("error", "AI enhancement service is not configured. Please ensure REPLICATE_API_TOKEN is set in backend environment variables."));
        }

        try {
            // Update status to processing
            productImageRepositoryService.updateEnhancementStatus(
                    imageId, verifiedUserId, EnhancementStatus.processing.name(), null, imageEnhancementService.getProviderName(), authHeader
            );

            // Get accessible original signed URL
            String originalSignedUrl = supabaseStorageService.getSignedUrl(record.getOriginalPath(), 1800, authHeader);

            // Call image enhancement service
            byte[] enhancedBytes = imageEnhancementService.enhanceImage(originalSignedUrl, record.getMimeType()).join();

            // Save enhanced image to Supabase Storage under {user_id}/enhanced/...
            String safeName = record.getOriginalFilename() != null ? record.getOriginalFilename().replaceAll("[^a-zA-Z0-9._-]", "_") : "image.png";
            String enhancedFilename = "enhanced_" + UUID.randomUUID() + "_" + safeName;

            String enhancedStoragePath = supabaseStorageService.uploadBytes(
                    verifiedUserId,
                    "enhanced",
                    enhancedFilename,
                    enhancedBytes,
                    "image/png",
                    authHeader
            );

            // Update database record to completed
            productImageRepositoryService.updateEnhancementStatus(
                    imageId, verifiedUserId, EnhancementStatus.completed.name(), enhancedStoragePath, imageEnhancementService.getProviderName(), authHeader
            );

            String enhancedSignedUrl = supabaseStorageService.getSignedUrl(enhancedStoragePath, 3600, authHeader);

            EnhanceResponse response = new EnhanceResponse(
                    imageId,
                    originalSignedUrl,
                    enhancedSignedUrl,
                    EnhancementStatus.completed.name(),
                    imageEnhancementService.getProviderName(),
                    "Product image enhanced successfully."
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("AI enhancement failed for image {}: {}", imageId, e.getMessage());
            try {
                productImageRepositoryService.updateEnhancementStatus(
                        imageId, verifiedUserId, EnhancementStatus.failed.name(), null, imageEnhancementService.getProviderName(), authHeader
                );
            } catch (Exception updateEx) {
                log.warn("Failed to mark image status as failed: {}", updateEx.getMessage());
            }

            String causeMsg = e.getCause() != null ? e.getCause().getMessage() : e.getMessage();
            String userMsg = "Image enhancement processing failed. Please try again.";
            if (causeMsg != null) {
                if (causeMsg.toLowerCase().contains("insufficient credit") || causeMsg.contains("402")) {
                    userMsg = "Replicate AI account has insufficient credits. Please purchase credit at replicate.com/account/billing or use a funded token.";
                } else if (causeMsg.toLowerCase().contains("rate limit") || causeMsg.contains("429")) {
                    userMsg = "AI service rate limit reached. Please wait a moment before trying again.";
                }
            }

            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", userMsg));
        }
    }

    /**
     * GET /api/image-enhancement/{imageId}
     * Returns image metadata and fresh signed URLs for original and enhanced versions.
     */
    @GetMapping("/{imageId}")
    public ResponseEntity<?> getImage(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable("imageId") UUID imageId
    ) {
        UUID verifiedUserId;
        try {
            verifiedUserId = authVerificationService.verifyTokenAndGetUserId(authHeader);
        } catch (SecurityException se) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Unauthorized access."));
        }

        Optional<ProductImage> imageOpt = productImageRepositoryService.findByIdAndUserId(imageId, verifiedUserId, authHeader);
        if (imageOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Image not found or unauthorized access."));
        }

        ProductImage record = imageOpt.get();

        ImageDetailResponse response = new ImageDetailResponse();
        response.setId(record.getId());
        response.setUserId(record.getUserId());
        response.setOriginalPath(record.getOriginalPath());
        response.setOriginalUrl(supabaseStorageService.getSignedUrl(record.getOriginalPath(), 3600, authHeader));
        response.setEnhancedPath(record.getEnhancedPath());
        if (record.getEnhancedPath() != null) {
            response.setEnhancedUrl(supabaseStorageService.getSignedUrl(record.getEnhancedPath(), 3600, authHeader));
        }
        response.setOriginalFilename(record.getOriginalFilename());
        response.setMimeType(record.getMimeType());
        response.setFileSize(record.getFileSize());
        response.setEnhancementStatus(record.getEnhancementStatus());
        response.setEnhancementProvider(record.getEnhancementProvider());
        response.setCreatedAt(record.getCreatedAt());
        response.setUpdatedAt(record.getUpdatedAt());

        return ResponseEntity.ok(response);
    }
}
