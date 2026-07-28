-- hiiipe CMS schema: posts, team_members, testimonials, projects
-- Run in Supabase SQL Editor, then run supabase/seed.sql

create extension if not exists "pgcrypto";

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Posts (journal)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  n text not null default '',
  cat text not null default '',
  date text not null default '',
  read text not null default '',
  title text not null,
  excerpt text not null default '',
  img text not null default '',
  author jsonb not null default '{"name":"","role":""}'::jsonb,
  tags text[] not null default '{}',
  content jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_cat_idx on public.posts (cat);
create index if not exists posts_created_at_idx on public.posts (created_at desc);

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- Team members
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  role text not null default '',
  bio text not null default '',
  photo text not null default '',
  gradient integer not null default 180,
  years text not null default '',
  based text not null default '',
  quote text not null default '',
  orbit text[] not null default '{}',
  skills jsonb not null default '[]'::jsonb,
  toolkit text[] not null default '{}',
  projects jsonb not null default '[]'::jsonb,
  contact jsonb not null default '{"email":"","handle":""}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_sort_idx on public.team_members (sort_order);

drop trigger if exists team_members_set_updated_at on public.team_members;
create trigger team_members_set_updated_at
  before update on public.team_members
  for each row execute function public.set_updated_at();

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null default '',
  company text not null default '',
  metric text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_sort_idx on public.testimonials (sort_order);

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

-- Projects (masterpieces / selected work)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cat text not null default '',
  year text not null default '',
  img text not null default '',
  url text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_idx on public.projects (sort_order);

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Admin allowlist
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

-- RLS
alter table public.posts enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;
alter table public.projects enable row level security;

-- Public read
drop policy if exists "Public read posts" on public.posts;
create policy "Public read posts" on public.posts for select using (true);

drop policy if exists "Public read team" on public.team_members;
create policy "Public read team" on public.team_members for select using (true);

drop policy if exists "Public read testimonials" on public.testimonials;
create policy "Public read testimonials" on public.testimonials for select using (true);

drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects" on public.projects for select using (true);

-- Admin-only write
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

-- Storage bucket for media
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

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
