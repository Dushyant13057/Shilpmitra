package com.shilpmitra.backend.config;

import com.shilpmitra.backend.service.ImageEnhancementService;
import com.shilpmitra.backend.service.impl.DemoImageEnhancementService;
import com.shilpmitra.backend.service.impl.ReplicateImageEnhancementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * Configuration selecting the active ImageEnhancementService provider.
 * Supports:
 * - IMAGE_ENHANCEMENT_PROVIDER=demo (Local server-side image enhancement, default)
 * - IMAGE_ENHANCEMENT_PROVIDER=replicate (Replicate API external provider)
 */
@Configuration
public class ImageEnhancementConfig {

    private static final Logger log = LoggerFactory.getLogger(ImageEnhancementConfig.class);

    @Value("${image.enhancement.provider:demo}")
    private String configuredProvider;

    @Bean
    @Primary
    public ImageEnhancementService imageEnhancementService(
            @Qualifier("replicateImageEnhancementService") ReplicateImageEnhancementService replicateService,
            @Qualifier("demoImageEnhancementService") DemoImageEnhancementService demoService
    ) {
        String activeProvider = resolveProvider();
        if ("replicate".equalsIgnoreCase(activeProvider)) {
            log.info("Active Image Enhancement Provider: REPLICATE [{}]", replicateService.getProviderName());
            return replicateService;
        } else {
            log.info("Active Image Enhancement Provider: DEMO / LOCAL [{}]", demoService.getProviderName());
            return demoService;
        }
    }

    private String resolveProvider() {
        if (configuredProvider != null && !configuredProvider.trim().isEmpty()) {
            return configuredProvider.trim();
        }
        String sysProp = System.getProperty("IMAGE_ENHANCEMENT_PROVIDER");
        if (sysProp != null && !sysProp.trim().isEmpty()) {
            return sysProp.trim();
        }
        String envVal = System.getenv("IMAGE_ENHANCEMENT_PROVIDER");
        return (envVal != null && !envVal.trim().isEmpty()) ? envVal.trim() : "demo";
    }
}
