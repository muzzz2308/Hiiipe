# Supabase setup for hiiipe

## 1. Create a Supabase project

1. Go to https://supabase.com and create a project.
2. Copy **Project URL** and **anon public** key from Settings → API.

## 2. Configure the app

```bash
cp .env.example .env
```

Fill in:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Restart `npm run dev` after changing env vars.

## 3. Run the database migration

In the Supabase SQL Editor, paste and run in order:

1. [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql) — tables, RLS, storage bucket
2. [`supabase/migrations/002_admin_role.sql`](supabase/migrations/002_admin_role.sql) — only if you already ran an older 001 without admin roles
3. [`supabase/migrations/003_project_url.sql`](supabase/migrations/003_project_url.sql) — project URL column
4. [`supabase/migrations/004_hero_reviews.sql`](supabase/migrations/004_hero_reviews.sql) — hero reviews badge
5. [`supabase/seed.sql`](supabase/seed.sql) — current posts, team, testimonials, projects

Or regenerate the seed anytime:

```bash
node scripts/generate-seed.mjs
```
## 4. Create the admin Auth user

1. In Supabase → Authentication → Users → **Add user**
2. Email: `murtazach1235@gmail.com`
3. Set a password (and confirm email if required)

That email is already in the `admin_users` allowlist (see migration `002_admin_role.sql`).

If you already ran `001_init.sql` before admin roles existed, also run:

[`supabase/migrations/002_admin_role.sql`](supabase/migrations/002_admin_role.sql)

To add another admin later:

```sql
insert into public.admin_users (email) values ('someone@example.com');
```

Use `murtazach1235@gmail.com` on `/admin/login`.

## 5. Open the admin panel

On the public site, **press and hold the nav logo for 6 seconds**. You will be taken to `/admin` (login if needed).

## Notes

- Without env vars, the site falls back to the static data in `src/lib/`.
- Logo hold is only a hidden entry; real security is Supabase Auth + RLS.
- Uploaded images go to the public `media` storage bucket.
