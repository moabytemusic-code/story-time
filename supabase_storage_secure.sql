
-- Re-Secure Storage now that we know the issue
-- Drop the "Open to All" policy
drop policy if exists "Give me access" on storage.objects;

-- Re-Apply "Authenticated Only" Uploads
create policy "Authenticated users can upload images"
on storage.objects for insert
with check ( bucket_id = 'uploads' and auth.role() = 'authenticated' );

-- Public View remains
create policy "Public images are viewable"
on storage.objects for select
using ( bucket_id = 'uploads' );

-- Admins Update
create policy "Authenticated users can update images"
on storage.objects for update
using ( bucket_id = 'uploads' and auth.role() = 'authenticated' );
