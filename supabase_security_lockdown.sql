
-- 1. Re-Enable RLS (Lock the door)
alter table public.profiles enable row level security;

-- 2. Add a Role column to identify Admins (if not exists)
alter table public.profiles add column if not exists role text default 'user';

-- 3. Drop existing loose policies
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Authenticated users can update any profile" on public.profiles;

-- 4. Define Strict Policies

-- VIEW: Everyone can view profiles (needed for validation/social), or restrict to auth
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

-- INSERT: Users can only create their OWN profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

-- UPDATE: Users can update OWN profile OR Admins can update ANY
create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

create policy "Admins can update any profile"
  on public.profiles for update
  using ( 
    (select role from public.profiles where id = auth.uid()) = 'admin' 
  );

-- 5. IMPORTANT: Make YOU the Admin!
-- Replace 'updates@storytime.com' with your actual email address you signed up with.
update public.profiles
set role = 'admin'
where email = 'updates@storytime.com'; 
-- ^^^ CHANGE THIS EMAIL BEFORE RUNNING IF YOU ARE NOT USING THIS EMAIL ^^^

-- Fallback: If you don't know the email, this command makes the MOST RECENT user an admin:
update public.profiles
set role = 'admin'
where id in (select id from public.profiles order by created_at desc limit 1);
