-- ═══════════════════════════════════════════════════════
-- PHASE 1: Auth + Role Identity (Idempotent)
-- ═══════════════════════════════════════════════════════

-- Required for gen_random_uuid(), crypt(), gen_salt()
create extension if not exists pgcrypto;

-- 1) Organisations
create table if not exists public.organisations (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  created_at   timestamptz default now()
);

-- 2) Profiles (extends auth.users with role + org)
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  organisation_id uuid references public.organisations(id) on delete set null,
  full_name       text,
  role            text not null check (role in ('superadmin', 'hr', 'participant', 'trainer')),
  avatar_initials text,
  created_at      timestamptz default now()
);

-- 3) Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
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
  for each row execute function public.handle_new_user();

-- Helper function: superadmin check
create or replace function public.is_superadmin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'superadmin'
  );
$$;

-- Optional hardening (recommended):
-- revoke execute on function public.is_superadmin() from public, anon, authenticated;
-- revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- ═══════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (Idempotent)
-- ═══════════════════════════════════════════════════════

alter table public.organisations enable row level security;
alter table public.profiles enable row level security;

-- Organisations policies
drop policy if exists "Authenticated users can read organisations" on public.organisations;
drop policy if exists "Superadmins can insert organisations" on public.organisations;
drop policy if exists "Superadmins can update organisations" on public.organisations;
drop policy if exists "Superadmins can delete organisations" on public.organisations;

create policy "Authenticated users can read organisations"
  on public.organisations for select
  to authenticated
  using (true);

create policy "Superadmins can insert organisations"
  on public.organisations for insert
  to authenticated
  with check (public.is_superadmin());

create policy "Superadmins can update organisations"
  on public.organisations for update
  to authenticated
  using (public.is_superadmin())
  with check (public.is_superadmin());

create policy "Superadmins can delete organisations"
  on public.organisations for delete
  to authenticated
  using (public.is_superadmin());

-- Profiles policies
drop policy if exists "Authenticated users can read profiles" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Superadmins can insert profiles" on public.profiles;
drop policy if exists "Superadmins can delete profiles" on public.profiles;

create policy "Authenticated users can read profiles"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id or public.is_superadmin())
  with check ((select auth.uid()) = id or public.is_superadmin());

create policy "Superadmins can insert profiles"
  on public.profiles for insert
  to authenticated
  with check (public.is_superadmin());

create policy "Superadmins can delete profiles"
  on public.profiles for delete
  to authenticated
  using (public.is_superadmin());

-- ═══════════════════════════════════════════════════════
-- SEED DATA (Idempotent)
-- ═══════════════════════════════════════════════════════

-- Organisation seed
insert into public.organisations (id, name)
values ('00000000-0000-0000-0000-000000000001', 'Nudge Engine')
on conflict (id) do update
set name = excluded.name;

-- Auth users seed
insert into auth.users (
  id, aud, role, email, encrypted_password,
  email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data,
  is_super_admin, created_at, updated_at,
  confirmation_token, recovery_token,
  email_change_token_new, email_change
)
values
  (
    '00000000-0000-0000-0000-000000000010',
    'authenticated', 'authenticated',
    'superadmin@nudgeengine',
    crypt('superadmin@nudgeengine', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}', '{}',
    false, now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    'authenticated', 'authenticated',
    'hr@nudgeengine',
    crypt('hr@nudgeengine', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}', '{}',
    false, now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000012',
    'authenticated', 'authenticated',
    'participant@nudgeengine',
    crypt('participant@nudgeengine', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}', '{}',
    false, now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000013',
    'authenticated', 'authenticated',
    'trainer@nudgeengine',
    crypt('trainer@nudgeengine', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}', '{}',
    false, now(), now(), '', '', '', ''
  )
on conflict (id) do update
set
  aud = excluded.aud,
  role = excluded.role,
  email = excluded.email,
  encrypted_password = excluded.encrypted_password,
  email_confirmed_at = excluded.email_confirmed_at,
  raw_app_meta_data = excluded.raw_app_meta_data,
  raw_user_meta_data = excluded.raw_user_meta_data,
  updated_at = now();

-- Auth identities seed
insert into auth.identities (
  id, user_id, provider_id, provider, identity_data,
  last_sign_in_at, created_at, updated_at
)
values
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000010',
    'superadmin@nudgeengine', 'email',
    '{"sub":"00000000-0000-0000-0000-000000000010","email":"superadmin@nudgeengine","email_verified":true,"phone_verified":false}',
    now(), now(), now()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000011',
    'hr@nudgeengine', 'email',
    '{"sub":"00000000-0000-0000-0000-000000000011","email":"hr@nudgeengine","email_verified":true,"phone_verified":false}',
    now(), now(), now()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000012',
    'participant@nudgeengine', 'email',
    '{"sub":"00000000-0000-0000-0000-000000000012","email":"participant@nudgeengine","email_verified":true,"phone_verified":false}',
    now(), now(), now()
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000013',
    'trainer@nudgeengine', 'email',
    '{"sub":"00000000-0000-0000-0000-000000000013","email":"trainer@nudgeengine","email_verified":true,"phone_verified":false}',
    now(), now(), now()
  )
on conflict (provider, provider_id) do update
set
  identity_data = excluded.identity_data,
  last_sign_in_at = excluded.last_sign_in_at,
  updated_at = now();

-- Profiles seed
insert into public.profiles (id, role, full_name, avatar_initials, organisation_id)
values
  ('00000000-0000-0000-0000-000000000010', 'superadmin',  'Super Admin',  'SA', null),
  ('00000000-0000-0000-0000-000000000011', 'hr',          'Ritu Sharma',  'RS', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000012', 'participant', 'Priya Rao',    'PR', '00000000-0000-0000-0000-000000000001'),
  ('00000000-0000-0000-0000-000000000013', 'trainer',     'Gaurav Patel', 'GP', '00000000-0000-0000-0000-000000000001')
on conflict (id) do update
set
  role = excluded.role,
  full_name = excluded.full_name,
  avatar_initials = excluded.avatar_initials,
  organisation_id = excluded.organisation_id;