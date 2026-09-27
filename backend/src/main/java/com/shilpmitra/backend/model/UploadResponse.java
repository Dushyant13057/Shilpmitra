package com.shilpmitra.backend.model;

import java.util.UUID;

public class UploadResponse {

    private UUID id;
    private String originalPath;
    private String originalUrl;
    private String status;
    private String originalFilename;
    private Long fileSize;

    public UploadResponse() {}

    public UploadResponse(UUID id, String originalPath, String originalUrl, String status, String originalFilename, Long fileSize) {
        this.id = id;
        this.originalPath = originalPath;
        this.originalUrl = originalUrl;
        this.status = status;
        this.originalFilename = originalFilename;
        this.fileSize = fileSize;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOriginalFilename() {
        return originalFilename;
    }

    public void setOriginalFilename(String originalFilename) {
        this.originalFilename = originalFilename;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }
}
