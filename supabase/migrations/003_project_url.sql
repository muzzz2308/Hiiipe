-- Add project URL for masterpieces
alter table public.projects
  add column if not exists url text not null default '';
