-- =====================================================
-- Faz 2: Fiziksel Özellikler
-- =====================================================

-- Pattern enum
create type product_pattern as enum (
  'veined',
  'speckled',
  'uniform',
  'cloudy',
  'flowery',
  'layered'
);

-- Finish type enum
create type product_finish as enum (
  'polished',
  'honed',
  'brushed',
  'flamed',
  'tumbled',
  'sandblasted',
  'leathered'
);

-- Fiziksel özellik alanları
alter table products
  add column origin_country varchar(100),
  add column origin_region varchar(100),
  add column color_primary varchar(50),
  add column color_secondary varchar(50),
  add column pattern product_pattern,
  add column finish_types product_finish[] default '{}';

-- =====================================================
-- Faz 3: Teknik Özellikler
-- =====================================================

alter table products
  add column density decimal(8,2),
  add column water_absorption decimal(6,3),
  add column compressive_strength decimal(8,2),
  add column flexural_strength decimal(8,2),
  add column abrasion_resistance varchar(50),
  add column hardness_mohs decimal(3,1),
  add column frost_resistant boolean default false;

-- =====================================================
-- Faz 4: Boyut ve Stok Yönetimi
-- =====================================================

alter table products
  add column available_thicknesses decimal(5,2)[] default '{}',
  add column max_slab_width decimal(8,2),
  add column max_slab_length decimal(8,2),
  add column min_order_quantity integer default 1;

-- =====================================================
-- Faz 5: Kullanım Alanları ve SEO
-- =====================================================

-- Application type enum
create type product_application as enum (
  'flooring',
  'wall_cladding',
  'countertops',
  'stairs',
  'bathroom',
  'outdoor',
  'pool',
  'fireplace'
);

alter table products
  add column applications product_application[] default '{}',
  add column is_suitable_for_exterior boolean default false,
  add column is_suitable_for_kitchen boolean default false,
  add column seo_title varchar(255),
  add column seo_description text,
  add column tags text[] default '{}';

-- Index for new columns
create index idx_products_origin_country on products(origin_country);
create index idx_products_pattern on products(pattern);
create index idx_products_applications on products using gin(applications);
create index idx_products_tags on products using gin(tags);
