package com.shilpmitra.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shilpmitra.backend.config.SupabaseConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;
import java.util.UUID;

@Service
public class SupabaseStorageService {

    private static final Logger log = LoggerFactory.getLogger(SupabaseStorageService.class);
    private static final String BUCKET_NAME = "product-images";

    private final SupabaseConfig supabaseConfig;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public SupabaseStorageService(SupabaseConfig supabaseConfig) {
        this.supabaseConfig = supabaseConfig;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Uploads bytes to private bucket product-images at path:
     * {user_id}/originals/{filename} or {user_id}/enhanced/{filename}
     */
    public String uploadBytes(UUID userId, String folder, String filename, byte[] data, String contentType, String userToken) {
        String storagePath = userId.toString() + "/" + folder + "/" + filename;
        String url = supabaseConfig.getSupabaseUrl() + "/storage/v1/object/" + BUCKET_NAME + "/" + storagePath;

        try {
            HttpRequest.Builder reqBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", contentType != null ? contentType : "application/octet-stream")
                    .header("apikey", supabaseConfig.getApiKey());

            // If user token is provided, pass Bearer token to respect RLS; otherwise use API key
            if (userToken != null && !userToken.isEmpty()) {
                reqBuilder.header("Authorization", userToken.startsWith("Bearer ") ? userToken : "Bearer " + userToken);
            } else {
                reqBuilder.header("Authorization", "Bearer " + supabaseConfig.getApiKey());
            }

            reqBuilder.POST(HttpRequest.BodyPublishers.ofByteArray(data));

            HttpResponse<String> response = httpClient.send(reqBuilder.build(), HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200 && response.statusCode() != 201) {
                log.error("Failed to upload object to Supabase storage. Status: {}, Body: {}", response.statusCode(), response.body());
                throw new RuntimeException("Storage upload failed with status " + response.statusCode());
            }

            return storagePath;
        } catch (Exception e) {
            log.error("Exception uploading object to storage: {}", e.getMessage());
            throw new RuntimeException("Storage service exception: " + e.getMessage(), e);
        }
    }

    /**
     * Generates a signed URL for reading a private object (expires in 1 hour).
     */
    public String getSignedUrl(String storagePath, int expiresInSeconds) {
        return getSignedUrl(storagePath, expiresInSeconds, null);
    }

    /**
     * Generates a signed URL using either the provided user token or the configured API key.
     */
    public String getSignedUrl(String storagePath, int expiresInSeconds, String userToken) {
        if (storagePath == null || storagePath.isEmpty()) {
            return null;
        }

        String url = supabaseConfig.getSupabaseUrl() + "/storage/v1/object/sign/" + BUCKET_NAME + "/" + storagePath;

        try {
            String payload = objectMapper.writeValueAsString(Map.of("expiresIn", expiresInSeconds > 0 ? expiresInSeconds : 3600));

            HttpRequest.Builder reqBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(10))
                    .header("Content-Type", "application/json")
                    .header("apikey", supabaseConfig.getApiKey());

            if (userToken != null && !userToken.isEmpty()) {
                reqBuilder.header("Authorization", userToken.startsWith("Bearer ") ? userToken : "Bearer " + userToken);
            } else {
                reqBuilder.header("Authorization", "Bearer " + supabaseConfig.getApiKey());
            }

            reqBuilder.POST(HttpRequest.BodyPublishers.ofString(payload));

            HttpResponse<String> response = httpClient.send(reqBuilder.build(), HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode json = objectMapper.readTree(response.body());
                String signedPath = json.has("signedURL") ? json.path("signedURL").asText(null) : json.path("signedUrl").asText(null);
                if (signedPath != null && !signedPath.isEmpty()) {
                    if (signedPath.startsWith("http://") || signedPath.startsWith("https://")) {
                        return signedPath;
                    }
                    if (signedPath.startsWith("/storage/v1")) {
                        return supabaseConfig.getSupabaseUrl() + signedPath;
                    }
                    return supabaseConfig.getSupabaseUrl() + "/storage/v1" + (signedPath.startsWith("/") ? signedPath : "/" + signedPath);
                }
            } else {
                log.warn("Could not generate signed URL for path {}. Status: {}, Body: {}", storagePath, response.statusCode(), response.body());
            }
        } catch (Exception e) {
            log.warn("Error getting signed URL for {}: {}", storagePath, e.getMessage());
        }

        // Fallback to public URL format if signing fails
        return supabaseConfig.getSupabaseUrl() + "/storage/v1/object/public/" + BUCKET_NAME + "/" + storagePath;
    }
}
