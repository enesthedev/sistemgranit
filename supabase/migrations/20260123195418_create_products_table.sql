-- Kategori enum'u
create type product_category as enum (
  'marble',
  'granite',
  'travertine',
  'onyx',
  'limestone',
  'quartzite'
);

-- Durum enum'u
create type product_status as enum (
  'active',
  'draft',
  'archived'
);

-- Ürünler tablosu
create table products (
  id uuid default gen_random_uuid() primary key,
  name varchar(255) not null,
  slug varchar(255) unique not null,
  description text,
  category product_category not null default 'marble',
  status product_status not null default 'draft',

  -- Fiyatlandırma
  price_per_sqm decimal(12,2),
  currency varchar(3) default 'TRY',

  -- Medya
  images text[] default '{}',
  thumbnail varchar(500),

  -- Sistem
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id)
);

-- Updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

create trigger update_products_updated_at
  before update on products
  for each row
  execute function update_updated_at_column();

-- RLS Policies
alter table products enable row level security;

-- Herkes okuyabilir
create policy "Products are viewable by everyone" on products
  for select using (true);

-- Authenticated kullanıcılar ekleyebilir
create policy "Authenticated users can insert products" on products
  for insert with check (auth.role() = 'authenticated');

-- Authenticated kullanıcılar güncelleyebilir
create policy "Authenticated users can update products" on products
  for update using (auth.role() = 'authenticated');

-- Authenticated kullanıcılar silebilir
create policy "Authenticated users can delete products" on products
  for delete using (auth.role() = 'authenticated');

-- Indexes
create index idx_products_category on products(category);
create index idx_products_status on products(status);
create index idx_products_slug on products(slug);
create index idx_products_created_at on products(created_at desc);
