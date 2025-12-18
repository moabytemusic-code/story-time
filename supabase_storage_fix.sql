
-- It seems the Storage Bucket policies might be missing or too strict!
-- This SQL fixes STORAGE permissions (for uploading images)

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Allow Authenticated users to upload to 'uploads' bucket
create policy "Authenticated users can upload images"
on storage.objects for insert
with check (
  bucket_id = 'uploads' 
  and auth.role() = 'authenticated'
);

-- Allow Public to view images
create policy "Public images are viewable"
on storage.objects for select
using ( bucket_id = 'uploads' );
