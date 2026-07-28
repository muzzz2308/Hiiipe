-- Hero reviews summary (singleton row used in Hero section)
create table if not exists public.hero_reviews (
  id integer primary key default 1 check (id = 1),
  rating text not null default '4.9',
  label text not null default '200+ reviews',
  avatars text[] not null default '{}',
  updated_at timestamptz not null default now()
);

drop trigger if exists hero_reviews_set_updated_at on public.hero_reviews;
create trigger hero_reviews_set_updated_at
  before update on public.hero_reviews
  for each row execute function public.set_updated_at();

alter table public.hero_reviews enable row level security;

drop policy if exists "Public read hero_reviews" on public.hero_reviews;
create policy "Public read hero_reviews"
  on public.hero_reviews for select using (true);

drop policy if exists "Admin write hero_reviews" on public.hero_reviews;
create policy "Admin write hero_reviews"
  on public.hero_reviews
  for all using (public.is_admin())
  with check (public.is_admin());

insert into public.hero_reviews (id, rating, label, avatars)
values (1, '4.9', '200+ reviews', '{}')
on conflict (id) do nothing;
