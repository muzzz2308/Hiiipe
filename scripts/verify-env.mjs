/**
 * Fail Vercel builds early if required VITE_* vars are missing.
 * Local builds still work without them (static fallback).
 */
const required = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
  "VITE_WEB3FORMS_ACCESS_KEY",
];

if (process.env.VERCEL) {
  const missing = required.filter((key) => !process.env[key]?.trim());

  if (missing.length) {
    console.error("\n[Vercel build] Missing environment variables:");
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error(
      "\nAdd them in Vercel → Project → Settings → Environment Variables.",
    );
    console.error("Enable Production + Preview (Development does NOT apply to deploys).");
    console.error("Then redeploy without build cache.\n");
    process.exit(1);
  }

  console.log("[Vercel build] Required env vars detected.");
}
