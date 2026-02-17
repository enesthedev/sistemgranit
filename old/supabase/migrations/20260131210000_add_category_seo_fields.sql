-- Add SEO fields to categories table
ALTER TABLE public.categories
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_description TEXT;
