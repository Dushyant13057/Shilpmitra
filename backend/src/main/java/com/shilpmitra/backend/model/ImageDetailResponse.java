package com.shilpmitra.backend.model;

import java.util.UUID;

public class ImageDetailResponse {

    private UUID id;
    private UUID userId;
    private String originalPath;
    private String originalUrl;
    private String enhancedPath;
    private String enhancedUrl;
    private String originalFilename;
    private String mimeType;
    private Long fileSize;
    private String enhancementStatus;
    private String enhancementProvider;
    private String createdAt;
    private String updatedAt;

    public ImageDetailResponse() {}

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

    public String getOriginalPath() {
        return originalPath;
    }

    public void setOriginalPath(String originalPath) {
        this.originalPath = originalPath;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public String getEnhancedPath() {
        return enhancedPath;
    }

    public void setEnhancedPath(String enhancedPath) {
        this.enhancedPath = enhancedPath;
    }

    public String getEnhancedUrl() {
        return enhancedUrl;
    }

    public void setEnhancedUrl(String enhancedUrl) {
        this.enhancedUrl = enhancedUrl;
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
