package com.shilpmitra.backend.model;

import java.util.UUID;

public class EnhanceResponse {

    private UUID id;
    private String originalUrl;
    private String enhancedUrl;
    private String status;
    private String provider;
    private String message;

    public EnhanceResponse() {}

    public EnhanceResponse(UUID id, String originalUrl, String enhancedUrl, String status, String provider, String message) {
        this.id = id;
        this.originalUrl = originalUrl;
        this.enhancedUrl = enhancedUrl;
        this.status = status;
        this.provider = provider;
        this.message = message;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public String getEnhancedUrl() {
        return enhancedUrl;
    }

    public void setEnhancedUrl(String enhancedUrl) {
        this.enhancedUrl = enhancedUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
