
-- NUCLEAR OPTION: Create a 'public' bucket that is truly public
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do update set public = true;

-- Drop all policies on objects to clear slate
drop policy if exists "Authenticated users can upload images" on storage.objects;
drop policy if exists "Public images are viewable" on storage.objects;
drop policy if exists "Authenticated users can update images" on storage.objects;
drop policy if exists "Give me access" on storage.objects;

-- Create a policy that allows ANYONE (even anon) to do ANYTHING
-- ONLY USE FOR DEBUGGING TO PROVE IT IS RLS
create policy "Give me access"
on storage.objects for all
using ( bucket_id = 'uploads' )
with check ( bucket_id = 'uploads' );
