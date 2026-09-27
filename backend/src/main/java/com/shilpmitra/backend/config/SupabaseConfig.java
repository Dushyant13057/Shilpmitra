package com.shilpmitra.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SupabaseConfig {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.anon-key}")
    private String anonKey;

    @Value("${supabase.service-role-key:}")
    private String serviceRoleKey;

    public String getSupabaseUrl() {
        return supabaseUrl != null ? supabaseUrl.trim().replaceAll("/+$", "") : "";
    }

    public String getAnonKey() {
        return anonKey != null ? anonKey.trim() : "";
    }

    public String getServiceRoleKey() {
        return serviceRoleKey != null ? serviceRoleKey.trim() : "";
    }

    public String getApiKey() {
        if (serviceRoleKey != null && !serviceRoleKey.trim().isEmpty()) {
            return serviceRoleKey.trim();
        }
        return anonKey != null ? anonKey.trim() : "";
    }
}
