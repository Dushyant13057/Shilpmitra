package com.shilpmitra.backend.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shilpmitra.backend.config.ReplicateConfig;
import com.shilpmitra.backend.service.ImageEnhancementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service("replicateImageEnhancementService")
public class ReplicateImageEnhancementService implements ImageEnhancementService {

    private static final Logger log = LoggerFactory.getLogger(ReplicateImageEnhancementService.class);
    private final ReplicateConfig replicateConfig;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public ReplicateImageEnhancementService(ReplicateConfig replicateConfig) {
        this.replicateConfig = replicateConfig;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(20))
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String getProviderName() {
        return "replicate:" + replicateConfig.getModel();
    }

    @Override
    public boolean isConfigured() {
        return replicateConfig.isConfigured();
    }

    @Override
    public CompletableFuture<byte[]> enhanceImage(String imageUrl, String mimeType) {
        return CompletableFuture.supplyAsync(() -> {
            if (!isConfigured()) {
                throw new IllegalStateException("REPLICATE_API_TOKEN is not configured in backend environment variables.");
            }

            try {
                String token = replicateConfig.getApiToken();
                String modelConfig = replicateConfig.getModel();

                // Build Replicate prediction endpoint and payload
                String endpoint;
                Map<String, Object> payload = new LinkedHashMap<>();
                Map<String, Object> input = new LinkedHashMap<>();
                input.put("image", imageUrl);
                if (modelConfig.toLowerCase().contains("real-esrgan")) {
                    input.put("scale", 2);
                    input.put("face_enhance", false);
                }

                String cleanModel = modelConfig.trim();
                if (cleanModel.startsWith("nightmareai/real-esrgan")) {
                    endpoint = "https://api.replicate.com/v1/models/nightmareai/real-esrgan/predictions";
                    payload.put("input", input);
                } else if (cleanModel.contains(":")) {
                    // Format: owner/model:version_id
                    String[] parts = cleanModel.split(":");
                    String version = parts[1];
                    endpoint = "https://api.replicate.com/v1/predictions";
                    payload.put("version", version);
                    payload.put("input", input);
                } else {
                    // Format: owner/model
                    endpoint = "https://api.replicate.com/v1/models/" + cleanModel + "/predictions";
                    payload.put("input", input);
                }

                String requestBody = objectMapper.writeValueAsString(payload);

                log.info("Sending prediction request to Replicate at endpoint: {}", endpoint);

                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(endpoint))
                        .timeout(Duration.ofSeconds(60))
                        .header("Authorization", "Bearer " + token)
                        .header("Content-Type", "application/json")
                        .header("Prefer", "wait")
                        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                        .build();

                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() != 200 && response.statusCode() != 201) {
                    log.error("Replicate API returned HTTP {}: {}", response.statusCode(), response.body());
                    String detail = "";
                    try {
                        JsonNode errNode = objectMapper.readTree(response.body());
                        detail = errNode.path("detail").asText("");
                    } catch (Exception ignored) {}

                    if (response.statusCode() == 402 || detail.toLowerCase().contains("insufficient credit")) {
                        throw new RuntimeException("Replicate AI account has insufficient credits. Please purchase credit at replicate.com/account/billing or use a funded API token.");
                    }
                    if (response.statusCode() == 429) {
                        throw new RuntimeException("Replicate API rate limit reached. Please wait a moment and try again.");
                    }
                    throw new RuntimeException("AI enhancement service error: HTTP " + response.statusCode() + (detail.isEmpty() ? "" : " - " + detail));
                }

                JsonNode root = objectMapper.readTree(response.body());
                String status = root.path("status").asText("");
                String pollUrl = root.path("urls").path("get").asText(null);

                // If not yet finished, poll until completed or timeout
                int attempts = 0;
                int maxAttempts = replicateConfig.getTimeoutSeconds() / 2;

                while (!"succeeded".equalsIgnoreCase(status) && attempts < maxAttempts) {
                    if ("failed".equalsIgnoreCase(status) || "canceled".equalsIgnoreCase(status)) {
                        String errorMsg = root.path("error").asText("Enhancement prediction failed");
                        log.error("Replicate prediction failed: {}", errorMsg);
                        throw new RuntimeException("AI enhancement failed: " + errorMsg);
                    }

                    if (pollUrl == null || pollUrl.isEmpty()) {
                        break;
                    }

                    Thread.sleep(2000);
                    attempts++;

                    HttpRequest pollReq = HttpRequest.newBuilder()
                            .uri(URI.create(pollUrl))
                            .timeout(Duration.ofSeconds(15))
                            .header("Authorization", "Bearer " + token)
                            .GET()
                            .build();

                    HttpResponse<String> pollRes = httpClient.send(pollReq, HttpResponse.BodyHandlers.ofString());
                    if (pollRes.statusCode() == 200) {
                        root = objectMapper.readTree(pollRes.body());
                        status = root.path("status").asText("");
                    }
                }

                if (!"succeeded".equalsIgnoreCase(status)) {
                    throw new RuntimeException("Enhancement timed out after " + replicateConfig.getTimeoutSeconds() + " seconds");
                }

                // Extract output URL
                JsonNode outputNode = root.path("output");
                String outputUrl = null;

                if (outputNode.isTextual()) {
                    outputUrl = outputNode.asText();
                } else if (outputNode.isArray() && outputNode.size() > 0) {
                    outputUrl = outputNode.get(0).asText();
                }

                if (outputUrl == null || outputUrl.isEmpty()) {
                    throw new RuntimeException("Replicate returned succeeded status but output image URL was empty");
                }

                log.info("Enhancement succeeded. Downloading enhanced image from: {}", outputUrl);

                // Download enhanced image bytes
                HttpRequest downloadReq = HttpRequest.newBuilder()
                        .uri(URI.create(outputUrl))
                        .timeout(Duration.ofSeconds(30))
                        .GET()
                        .build();

                HttpResponse<byte[]> downloadRes = httpClient.send(downloadReq, HttpResponse.BodyHandlers.ofByteArray());

                if (downloadRes.statusCode() != 200) {
                    throw new RuntimeException("Failed to download enhanced image from Replicate CDN, status: " + downloadRes.statusCode());
                }

                return downloadRes.body();
            } catch (Exception e) {
                log.error("Exception in ReplicateImageEnhancementService: {}", e.getMessage());
                throw new RuntimeException(e.getMessage(), e);
            }
        });
    }
}
