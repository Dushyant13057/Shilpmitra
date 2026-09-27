package com.shilpmitra.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.OffsetDateTime;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductImage {

    private UUID id;

    @JsonProperty("user_id")
    private UUID userId;

    @JsonProperty("product_id")
    private UUID productId;

    @JsonProperty("original_path")
    private String originalPath;

    @JsonProperty("enhanced_path")
    private String enhancedPath;

    @JsonProperty("original_filename")
    private String originalFilename;

    @JsonProperty("mime_type")
    private String mimeType;

    @JsonProperty("file_size")
    private Long fileSize;

    @JsonProperty("enhancement_status")
    private String enhancementStatus;

    @JsonProperty("enhancement_provider")
    private String enhancementProvider;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("updated_at")
    private String updatedAt;

    public ProductImage() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public String getOriginalPath() {
        return originalPath;
    }

    public void setOriginalPath(String originalPath) {
        this.originalPath = originalPath;
    }

    public String getEnhancedPath() {
        return enhancedPath;
    }

    public void setEnhancedPath(String enhancedPath) {
        this.enhancedPath = enhancedPath;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getEnhancementStatus() {
        return enhancementStatus;
    }

    public void setEnhancementStatus(String enhancementStatus) {
        this.enhancementStatus = enhancementStatus;
    }

    public String getEnhancementProvider() {
        return enhancementProvider;
    }

    public void setEnhancementProvider(String enhancementProvider) {
        this.enhancementProvider = enhancementProvider;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
