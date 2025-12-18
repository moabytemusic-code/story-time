
-- Update policies to allow the Admin (you) to edit other users.
-- For this MVP, we will allow any logged-in user to update profiles.
-- In a real app, you would add a check like: verify(auth.jwt()->>'email' = 'admin@example.com')

-- 1. Drop the restrictive policy
drop policy if exists "Users can update own profile" on public.profiles;

-- 2. Create a permissive policy for Admin use
create policy "Authenticated users can update any profile"
  on public.profiles for update
  using ( auth.role() = 'authenticated' );

-- 3. Also allow Delete if you want to be able to delete users
create policy "Authenticated users can delete profiles"
  on public.profiles for delete
  using ( auth.role() = 'authenticated' );
