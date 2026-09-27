import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Checks whether the Supabase public environment variables are properly set.
 */
export const isSupabaseConfigured = (): boolean => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return Boolean(
    url &&
      key &&
      url.trim().length > 0 &&
      key.trim().length > 0 &&
      !url.includes("your-project-id")
  );
};

let clientInstance: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client for client-side components.
 * If credentials are not configured, throws a clear diagnostic error or returns null.
 */
export const createClient = (): SupabaseClient => {
  if (clientInstance) return clientInstance;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "";

  if (!isSupabaseConfigured()) {
    // If not configured, create with dummy placeholder to prevent immediate JS crash
    // but warn clearly in console
    console.warn(
      "[ShilpMitra Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Please configure your .env.local file."
    );
    clientInstance = createBrowserClient(
      url || "https://placeholder.supabase.co",
      key || "placeholder-anon-key"
    );
    return clientInstance;
  }

  clientInstance = createBrowserClient(url, key);
  return clientInstance;
};

/**
 * Executes a promise with a timeout fallback to prevent infinite loading.
 */
export const withTimeout = <T>(
  promise: PromiseLike<T>,
  ms: number = 3000,
  fallbackMessage: string = "Request timed out"
): Promise<T> => {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(fallbackMessage)), ms)
    ),
  ]);
};

