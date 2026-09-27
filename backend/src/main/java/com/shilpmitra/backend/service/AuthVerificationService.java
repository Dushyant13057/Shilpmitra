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
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;

@Service
public class AuthVerificationService {

    private static final Logger log = LoggerFactory.getLogger(AuthVerificationService.class);
    private final SupabaseConfig supabaseConfig;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public AuthVerificationService(SupabaseConfig supabaseConfig) {
        this.supabaseConfig = supabaseConfig;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(15))
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Verifies the Bearer token against Supabase Auth /auth/v1/user endpoint.
     * Returns the verified User UUID, or throws SecurityException if invalid.
     */
    public UUID verifyTokenAndGetUserId(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new SecurityException("Missing or malformed Authorization header");
        }

        String token = authorizationHeader.substring(7).trim();
        if (token.isEmpty()) {
            throw new SecurityException("Empty authentication token");
        }

        // 1. Verify token with Supabase Auth endpoint
        try {
            String url = supabaseConfig.getSupabaseUrl() + "/auth/v1/user";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .timeout(Duration.ofSeconds(20))
                    .header("Authorization", "Bearer " + token)
                    .header("apikey", supabaseConfig.getApiKey())
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                JsonNode userNode = objectMapper.readTree(response.body());
                String idStr = userNode.path("id").asText(null);
                if (idStr != null && !idStr.isEmpty()) {
                    return UUID.fromString(idStr);
                }
            } else if (response.statusCode() == 401 || response.statusCode() == 403) {
                log.warn("Supabase auth verification rejected token with status: {}", response.statusCode());
                throw new SecurityException("Invalid or expired session token");
            }
        } catch (SecurityException se) {
            throw se;
        } catch (Exception e) {
            log.warn("Network issue verifying token with Supabase: {}. Validating JWT claims...", e.getMessage());
        }

        // 2. Fallback: Parse and validate JWT claims if Supabase endpoint experienced a network timeout
        try {
            String[] parts = token.split("\\.");
            if (parts.length >= 2) {
                String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
                JsonNode claims = objectMapper.readTree(payload);

                long exp = claims.path("exp").asLong(0);
                long now = Instant.now().getEpochSecond();
                if (exp > 0 && exp < now) {
                    throw new SecurityException("Session token has expired");
                }

                String sub = claims.path("sub").asText(null);
                String aud = claims.path("aud").asText("");
                if (sub != null && !sub.isEmpty() && "authenticated".equalsIgnoreCase(aud)) {
                    log.info("Successfully validated JWT claims for user: {}", sub);
                    return UUID.fromString(sub);
                }
            }
        } catch (SecurityException se) {
            throw se;
        } catch (Exception ex) {
            log.error("Failed to parse JWT claims: {}", ex.getMessage());
        }

        throw new SecurityException("Authentication verification failed");
    }
}
