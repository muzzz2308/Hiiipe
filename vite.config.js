import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Merge Vercel/CI process.env with local .env files for client bundle. */
function clientEnv(mode) {
  const fromFile = loadEnv(mode, process.cwd(), "VITE_");
  return {
    VITE_SUPABASE_URL:
      process.env.VITE_SUPABASE_URL?.trim() ??
      fromFile.VITE_SUPABASE_URL?.trim() ??
      "",
    VITE_SUPABASE_ANON_KEY:
      process.env.VITE_SUPABASE_ANON_KEY?.trim() ??
      fromFile.VITE_SUPABASE_ANON_KEY?.trim() ??
      "",
    VITE_WEB3FORMS_ACCESS_KEY:
      process.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ??
      fromFile.VITE_WEB3FORMS_ACCESS_KEY?.trim() ??
      "",
    VITE_CONTACT_TO_EMAIL:
      process.env.VITE_CONTACT_TO_EMAIL?.trim() ??
      fromFile.VITE_CONTACT_TO_EMAIL?.trim() ??
      "info@hiiipe.com",
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = clientEnv(mode);

  return {
    plugins: [react(), tailwindcss()],
    envPrefix: "VITE_",
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY,
      ),
      "import.meta.env.VITE_WEB3FORMS_ACCESS_KEY": JSON.stringify(
        env.VITE_WEB3FORMS_ACCESS_KEY,
      ),
      "import.meta.env.VITE_CONTACT_TO_EMAIL": JSON.stringify(
        env.VITE_CONTACT_TO_EMAIL,
      ),
    },
  };
});
