
-- 1. Check if policy exists, drop it to avoid conflicts
drop policy if exists "Authenticated users can upload images" on storage.objects;
drop policy if exists "Public images are viewable" on storage.objects;

-- 2. Create Permissive Policies for 'uploads' bucket
create policy "Authenticated users can upload images"
on storage.objects for insert
with check ( bucket_id = 'uploads' and auth.role() = 'authenticated' );

create policy "Public images are viewable"
on storage.objects for select
using ( bucket_id = 'uploads' );

-- 3. (Fallback) If updating an existing image causes issues
create policy "Authenticated users can update images"
on storage.objects for update
using ( bucket_id = 'uploads' and auth.role() = 'authenticated' );
