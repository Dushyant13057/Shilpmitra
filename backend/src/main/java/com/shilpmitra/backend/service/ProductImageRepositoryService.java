package com.shilpmitra.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shilpmitra.backend.config.SupabaseConfig;
import com.shilpmitra.backend.model.ProductImage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.*;

@Service
public class ProductImageRepositoryService {

    private static final Logger log = LoggerFactory.getLogger(ProductImageRepositoryService.class);
    private final SupabaseConfig supabaseConfig;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public ProductImageRepositoryService(SupabaseConfig supabaseConfig) {
        this.supabaseConfig = supabaseConfig;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .build();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Inserts a new record into public.product_images table.
     */
    public ProductImage insert(ProductImage image, String userToken) {
        String url = supabaseConfig.getSupabaseUrl() + "/rest/v1/product_images";

        try {
            Map<String, Object> map = new LinkedHashMap<>();
            if (image.getId() != null) map.put("id", image.getId().toString());
            map.put("user_id", image.getUserId().toString());
            if (image.getProductId() != null) map.put("product_id", image.getProductId().toString());
            map.put("original_path", image.getOriginalPath());
            map.put("original_filename", image.getOriginalFilename());
            map.put("mime_type", image.getMimeType());
            map.put("file_size", image.getFileSize());
            map.put("enhancement_status", image.getEnhancementStatus());
            if (image.getEnhancementProvider() != null) map.put("enhancement_provider", image.getEnhancementProvider());

            String payload = objectMapper.writeValueAsString(map);

            HttpRequest.Builder reqBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/json")
                    .header("apikey", supabaseConfig.getApiKey())
                    .header("Prefer", "return=representation");

            if (userToken != null && !userToken.isEmpty()) {
                reqBuilder.header("Authorization", userToken.startsWith("Bearer ") ? userToken : "Bearer " + userToken);
            } else {
                reqBuilder.header("Authorization", "Bearer " + supabaseConfig.getApiKey());
            }

            reqBuilder.POST(HttpRequest.BodyPublishers.ofString(payload));

            HttpResponse<String> response = httpClient.send(reqBuilder.build(), HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 201 && response.statusCode() != 200) {
                log.error("Failed to insert product image record. Status: {}, Body: {}", response.statusCode(), response.body());
                throw new RuntimeException("Database insert failed with status " + response.statusCode());
            }

            List<ProductImage> list = objectMapper.readValue(response.body(), new TypeReference<List<ProductImage>>() {});
            if (list != null && !list.isEmpty()) {
                return list.get(0);
            }

            return image;
        } catch (Exception e) {
            log.error("Error inserting product image into database: {}", e.getMessage());
            throw new RuntimeException("Database operation failed: " + e.getMessage(), e);
        }
    }

    /**
     * Finds a ProductImage by ID and verifies that it belongs to verifiedUserId.
     */
    public Optional<ProductImage> findByIdAndUserId(UUID id, UUID verifiedUserId, String userToken) {
        String url = supabaseConfig.getSupabaseUrl() + "/rest/v1/product_images?id=eq." + id + "&user_id=eq." + verifiedUserId + "&select=*";

        try {
            HttpRequest.Builder reqBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(10))
                    .header("apikey", supabaseConfig.getApiKey());

            if (userToken != null && !userToken.isEmpty()) {
                reqBuilder.header("Authorization", userToken.startsWith("Bearer ") ? userToken : "Bearer " + userToken);
            } else {
                reqBuilder.header("Authorization", "Bearer " + supabaseConfig.getApiKey());
            }

            reqBuilder.GET();

            HttpResponse<String> response = httpClient.send(reqBuilder.build(), HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                List<ProductImage> list = objectMapper.readValue(response.body(), new TypeReference<List<ProductImage>>() {});
                if (list != null && !list.isEmpty()) {
                    return Optional.of(list.get(0));
                }
            } else {
                log.warn("Querying product image returned status {}: {}", response.statusCode(), response.body());
            }

            return Optional.empty();
        } catch (Exception e) {
            log.error("Error querying product image: {}", e.getMessage());
            throw new RuntimeException("Database query error: " + e.getMessage(), e);
        }
    }

    /**
     * Updates enhancement status and enhanced path.
     */
    public void updateEnhancementStatus(UUID id, UUID verifiedUserId, String status, String enhancedPath, String provider, String userToken) {
        String url = supabaseConfig.getSupabaseUrl() + "/rest/v1/product_images?id=eq." + id + "&user_id=eq." + verifiedUserId;

        try {
            Map<String, Object> updates = new LinkedHashMap<>();
            updates.put("enhancement_status", status);
            if (enhancedPath != null) {
                updates.put("enhanced_path", enhancedPath);
            }
            if (provider != null) {
                updates.put("enhancement_provider", provider);
            }
            updates.put("updated_at", new Date().toInstant().toString());

            String payload = objectMapper.writeValueAsString(updates);

            HttpRequest.Builder reqBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(15))
                    .header("Content-Type", "application/json")
                    .header("apikey", supabaseConfig.getApiKey());

            if (userToken != null && !userToken.isEmpty()) {
                reqBuilder.header("Authorization", userToken.startsWith("Bearer ") ? userToken : "Bearer " + userToken);
            } else {
                reqBuilder.header("Authorization", "Bearer " + supabaseConfig.getApiKey());
            }

            reqBuilder.method("PATCH", HttpRequest.BodyPublishers.ofString(payload));

            HttpResponse<String> response = httpClient.send(reqBuilder.build(), HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200 && response.statusCode() != 204) {
                log.error("Failed to update product image status. Status: {}, Body: {}", response.statusCode(), response.body());
                throw new RuntimeException("Database update failed with status " + response.statusCode());
            }
        } catch (Exception e) {
            log.error("Error updating product image in database: {}", e.getMessage());
            throw new RuntimeException("Database update error: " + e.getMessage(), e);
        }
    }
}
