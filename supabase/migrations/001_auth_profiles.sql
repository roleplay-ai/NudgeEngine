-- ═══════════════════════════════════════════════════════
-- PHASE 1: Auth + Role Identity
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════

-- 1. Organisations
create table if not exists organisations (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  created_at   timestamptz default now()
);

-- 2. Profiles (extends auth.users with role + org)
create table if not exists profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  organisation_id uuid references organisations(id) on delete set null,
  full_name       text,
  role            text not null check (role in ('superadmin', 'hr', 'participant', 'trainer')),
  avatar_initials text,
  created_at      timestamptz default now()
);

-- 3. Auto-create a profile row when a new user signs up
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'participant')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ═══════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════

alter table organisations enable row level security;
alter table profiles      enable row level security;

-- Helper: returns true when the calling user has the superadmin role.
-- Used in every superadmin policy so the check is DRY.
create or replace function is_superadmin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'superadmin'
  );
$$;

-- ── Organisations ────────────────────────────────────────
-- Anyone authenticated can read organisations
create policy "Authenticated users can read organisations"
  on organisations for select
  to authenticated
  using (true);

-- Only superadmins can create organisations
create policy "Superadmins can insert organisations"
  on organisations for insert
  to authenticated
  with check (is_superadmin());

-- Only superadmins can update organisations
create policy "Superadmins can update organisations"
  on organisations for update
  to authenticated
  using (is_superadmin())
  with check (is_superadmin());

-- Only superadmins can delete organisations
create policy "Superadmins can delete organisations"
  on organisations for delete
  to authenticated
  using (is_superadmin());

-- ── Profiles ─────────────────────────────────────────────
-- All authenticated users can read any profile (needed for cohort views)
create policy "Authenticated users can read profiles"
  on profiles for select
  to authenticated
  using (true);

-- Users can update their own profile; superadmins can update any profile
create policy "Users can update own profile"
  on profiles for update
  to authenticated
  using  (auth.uid() = id or is_superadmin())
  with check (auth.uid() = id or is_superadmin());

-- Only superadmins can insert profiles directly (normal sign-up uses the trigger)
create policy "Superadmins can insert profiles"
  on profiles for insert
  to authenticated
  with check (is_superadmin());

-- Only superadmins can delete profiles
create policy "Superadmins can delete profiles"
  on profiles for delete
  to authenticated
  using (is_superadmin());

-- ═══════════════════════════════════════════════════════
-- SEED DATA — Demo organisation + 4 demo users
-- Run AFTER creating users in Supabase Dashboard Auth section:
--   superadmin@demo.com  / demo1234
--   hr@demo.com          / demo1234
--   participant@demo.com / demo1234
--   trainer@demo.com     / demo1234
-- Then update the UUIDs below to match your created users.
-- ═══════════════════════════════════════════════════════

-- Insert demo organisation
insert into organisations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Meridian Corp')
on conflict (id) do nothing;

-- After creating users in the Auth dashboard, update profiles manually:
-- UPDATE profiles SET
--   full_name = 'Super Admin',
--   role = 'superadmin',
--   avatar_initials = 'SA',
--   organisation_id = null          -- superadmin is platform-wide, not org-scoped
-- WHERE id = '<superadmin-user-uuid>';
--
-- UPDATE profiles SET
--   full_name = 'Ritu Sharma',
--   role = 'hr',
--   avatar_initials = 'RS',
--   organisation_id = '00000000-0000-0000-0000-000000000001'
-- WHERE id = '<hr-user-uuid>';
--
-- UPDATE profiles SET
--   full_name = 'Priya Rao',
--   role = 'participant',
--   avatar_initials = 'PR',
--   organisation_id = '00000000-0000-0000-0000-000000000001'
-- WHERE id = '<participant-user-uuid>';
--
-- UPDATE profiles SET
--   full_name = 'Gaurav Patel',
--   role = 'trainer',
--   avatar_initials = 'GP',
--   organisation_id = '00000000-0000-0000-0000-000000000001'
-- WHERE id = '<trainer-user-uuid>';
