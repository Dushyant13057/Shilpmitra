package com.shilpmitra.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReplicateConfig {

    @Value("${replicate.api-token:}")
    private String apiToken;

    @Value("${replicate.model:nightmareai/real-esrgan:da2e21a1900456450451a5d3dd61b073b646c0d8b4e72337b51b725c404cf4c9}")
    private String model;

    @Value("${replicate.timeout-seconds:120}")
    private int timeoutSeconds;

    public String getApiToken() {
        if (apiToken != null && !apiToken.trim().isEmpty()) {
            return apiToken.trim();
        }
        String sysProp = System.getProperty("REPLICATE_API_TOKEN");
        if (sysProp != null && !sysProp.trim().isEmpty()) {
            return sysProp.trim();
        }
        String envVal = System.getenv("REPLICATE_API_TOKEN");
        return envVal != null ? envVal.trim() : "";
    }

    public String getModel() {
        if (model != null && !model.trim().isEmpty()) {
            return model.trim();
        }
        String sysProp = System.getProperty("IMAGE_ENHANCEMENT_MODEL");
        if (sysProp != null && !sysProp.trim().isEmpty()) {
            return sysProp.trim();
        }
        String envVal = System.getenv("IMAGE_ENHANCEMENT_MODEL");
        return (envVal != null && !envVal.trim().isEmpty()) ? envVal.trim() : "nightmareai/real-esrgan:da2e21a1900456450451a5d3dd61b073b646c0d8b4e72337b51b725c404cf4c9";
    }

    public int getTimeoutSeconds() {
        return timeoutSeconds > 0 ? timeoutSeconds : 120;
    }

    public boolean isConfigured() {
        String token = getApiToken();
        return token != null && !token.trim().isEmpty();
    }
}
