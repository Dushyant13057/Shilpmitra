package com.shilpmitra.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.nio.file.Files;
import java.util.List;

@SpringBootApplication
public class ShilpmitraBackendApplication {

    private static final Logger log = LoggerFactory.getLogger(ShilpmitraBackendApplication.class);

    public static void main(String[] args) {
        System.setProperty("java.awt.headless", "true");
        loadDotEnvIfPresent();
        SpringApplication.run(ShilpmitraBackendApplication.class, args);
    }

    private static void loadDotEnvIfPresent() {
        String[] potentialPaths = {
            ".env.local",
            ".env",
            "../.env.local",
            "../.env",
            "backend/.env.local",
            "backend/.env"
        };
        for (String p : potentialPaths) {
            File f = new File(p);
            if (f.exists() && f.isFile()) {
                log.info("Loading environment configurations from {}", f.getAbsolutePath());
                try {
                    List<String> lines = Files.readAllLines(f.toPath());
                    for (String line : lines) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#")) continue;
                        int eqIdx = line.indexOf('=');
                        if (eqIdx > 0) {
                            String key = line.substring(0, eqIdx).trim();
                            String val = line.substring(eqIdx + 1).trim();
                            if (val.startsWith("\"") && val.endsWith("\"") && val.length() >= 2) {
                                val = val.substring(1, val.length() - 1);
                            } else if (val.startsWith("'") && val.endsWith("'") && val.length() >= 2) {
                                val = val.substring(1, val.length() - 1);
                            }
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, val);
                            }
                        }
                    }
                } catch (Exception e) {
                    log.warn("Could not read {}: {}", p, e.getMessage());
                }
            }
        }
    }
}
