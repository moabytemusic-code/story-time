
-- 1. DROP ALL Existing Storage Policies to be absolutely clean
drop policy if exists "Authenticated users can upload images" on storage.objects;
drop policy if exists "Public images are viewable" on storage.objects;
drop policy if exists "Authenticated users can update images" on storage.objects;

-- 2. RE-CREATE Policies
create policy "Authenticated users can upload images"
on storage.objects for insert
with check ( bucket_id = 'uploads' and auth.role() = 'authenticated' );

create policy "Public images are viewable"
on storage.objects for select
using ( bucket_id = 'uploads' );

create policy "Authenticated users can update images"
on storage.objects for update
using ( bucket_id = 'uploads' and auth.role() = 'authenticated' );
