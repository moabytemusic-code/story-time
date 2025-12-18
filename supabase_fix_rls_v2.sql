
-- Safe fix: Drop potential conflicting policies first
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Authenticated users can update any profile" on public.profiles;

-- Re-create the permissive policy
create policy "Authenticated users can update any profile"
  on public.profiles for update
  using ( auth.role() = 'authenticated' );
