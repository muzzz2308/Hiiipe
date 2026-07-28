-- Admin allowlist + tighten write policies to admins only
-- Run this in Supabase SQL Editor if you already applied 001_init.sql

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "Admins can read admin_users" on public.admin_users;
create policy "Admins can read admin_users"
  on public.admin_users for select
  using (
    lower(auth.jwt() ->> 'email') = lower(email)
  );

-- Assign admin role
insert into public.admin_users (email)
values ('murtazach1235@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Replace broad authenticated write policies with admin-only
drop policy if exists "Admin write posts" on public.posts;
create policy "Admin write posts" on public.posts
  for all using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write team" on public.team_members;
create policy "Admin write team" on public.team_members
  for all using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write testimonials" on public.testimonials;
create policy "Admin write testimonials" on public.testimonials
  for all using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write projects" on public.projects;
create policy "Admin write projects" on public.projects
  for all using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin upload media" on storage.objects;
create policy "Admin upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admin update media" on storage.objects;
create policy "Admin update media"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admin delete media" on storage.objects;
create policy "Admin delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());
