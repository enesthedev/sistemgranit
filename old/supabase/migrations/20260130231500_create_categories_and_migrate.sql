-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Public categories are viewable by everyone"
ON public.categories FOR SELECT
USING (true);

CREATE POLICY "Admins can insert categories"
ON public.categories FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update categories"
ON public.categories FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete categories"
ON public.categories FOR DELETE
USING (auth.role() = 'authenticated');

-- 2. Insert existing categories from ENUM
-- We migrate known enum values to the new table
DO $$
BEGIN
    -- Marble
    INSERT INTO public.categories (name, slug, description)
    VALUES ('Mermer', 'mermer', 'Doğal taşların en asili mermer çeşitleri.')
    ON CONFLICT (slug) DO NOTHING;

    -- Granite
    INSERT INTO public.categories (name, slug, description)
    VALUES ('Granit', 'granit', 'Dayanıklı ve şık granit çeşitleri.')
    ON CONFLICT (slug) DO NOTHING;

    -- Travertine
    INSERT INTO public.categories (name, slug, description)
    VALUES ('Traverten', 'traverten', 'Doğal dokusuyla traverten çeşitleri.')
    ON CONFLICT (slug) DO NOTHING;

    -- Onyx
    INSERT INTO public.categories (name, slug, description)
    VALUES ('Onyx', 'onyx', 'Işığı geçiren yapısıyla eşsiz onyx taşları.')
    ON CONFLICT (slug) DO NOTHING;

    -- Limestone
    INSERT INTO public.categories (name, slug, description)
    VALUES ('Limra (Limestone)', 'limra', 'Yumuşak dokulu limra taşları.')
    ON CONFLICT (slug) DO NOTHING;

    -- Quartzite
    INSERT INTO public.categories (name, slug, description)
    VALUES ('Kuvarsit', 'kuvarsit', 'Sert ve dayanıklı kuvarsit taşları.')
    ON CONFLICT (slug) DO NOTHING;
END $$;

-- 3. Add category_id to products table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id);

-- 4. Data Migration: Update category_id based on old category enum
UPDATE public.products p
SET category_id = c.id
FROM public.categories c
WHERE
    (p.category = 'marble' AND c.slug = 'mermer') OR
    (p.category = 'granite' AND c.slug = 'granit') OR
    (p.category = 'travertine' AND c.slug = 'traverten') OR
    (p.category = 'onyx' AND c.slug = 'onyx') OR
    (p.category = 'limestone' AND c.slug = 'limra') OR
    (p.category = 'quartzite' AND c.slug = 'kuvarsit');

-- 5. Add triggers for updated_at (if extensions and function exist)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'moddatetime') THEN
        CREATE TRIGGER handle_updated_at_categories
            BEFORE UPDATE ON public.categories
            FOR EACH ROW
            EXECUTE PROCEDURE moddatetime (updated_at);
    END IF;
END $$;
