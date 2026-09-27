-- ==============================================================================
-- SHILPMITRA — PHASE 3 MIGRATION: PRODUCT IMAGES & SUPABASE STORAGE
-- ==============================================================================

-- 1. Create product_images table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NULL,
    original_path TEXT NOT NULL,
    enhanced_path TEXT NULL,
    original_filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    enhancement_status TEXT NOT NULL DEFAULT 'uploaded' CHECK (enhancement_status IN ('uploaded', 'processing', 'completed', 'failed')),
    enhancement_provider TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast user queries
CREATE INDEX IF NOT EXISTS idx_product_images_user_id ON public.product_images(user_id);
CREATE INDEX IF NOT EXISTS idx_product_images_created_at ON public.product_images(created_at DESC);

-- Trigger function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-update updated_at timestamp
DROP TRIGGER IF EXISTS set_product_images_updated_at ON public.product_images;
CREATE TRIGGER set_product_images_updated_at
    BEFORE UPDATE ON public.product_images
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 2. Enable Row-Level Security on product_images
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Authenticated users can only access their own records
CREATE POLICY "Users can view their own product images"
    ON public.product_images
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own product images"
    ON public.product_images
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own product images"
    ON public.product_images
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own product images"
    ON public.product_images
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- 3. Supabase Storage Setup: Private bucket "product-images"
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    false,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
SET public = false,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- Storage RLS Policies: Users can only upload and read files in their own folder ({user_id}/*)
CREATE POLICY "Users can upload their own product images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'product-images' AND
        (auth.uid())::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view their own product images in storage"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
        bucket_id = 'product-images' AND
        (auth.uid())::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own product images in storage"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'product-images' AND
        (auth.uid())::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own product images in storage"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'product-images' AND
        (auth.uid())::text = (storage.foldername(name))[1]
    );
