-- Products storage bucket oluştur
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Herkes okuyabilir
create policy "Public read access for products bucket"
on storage.objects for select
using (bucket_id = 'products');

-- Authenticated kullanıcılar yükleyebilir
create policy "Authenticated users can upload to products bucket"
on storage.objects for insert
with check (
  bucket_id = 'products'
  and auth.role() = 'authenticated'
);

-- Kullanıcılar kendi dosyalarını silebilir
create policy "Users can delete own files from products bucket"
on storage.objects for delete
using (
  bucket_id = 'products'
  and auth.role() = 'authenticated'
);
