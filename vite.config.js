import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";

const ENV_KEYS = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
  "VITE_WEB3FORMS_ACCESS_KEY",
  "VITE_CONTACT_TO_EMAIL",
];

/** Merge Vercel/CI process.env with local .env / .env.local for the client bundle. */
function clientEnv(mode) {
  const fromFile = loadEnv(mode, process.cwd(), "");
  const env = {};

  for (const key of ENV_KEYS) {
    env[key] = process.env[key]?.trim() ?? fromFile[key]?.trim() ?? "";
  }

  if (!env.VITE_CONTACT_TO_EMAIL) {
    env.VITE_CONTACT_TO_EMAIL = "info@hiiipe.com";
  }

  return env;
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = clientEnv(mode);
  const isProd = mode === "production";

  return {
    plugins: [
      react(),
      tailwindcss(),
      isProd &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz",
          threshold: 1024,
        }),
      isProd &&
        viteCompression({
          algorithm: "brotliCompress",
          ext: ".br",
          threshold: 1024,
        }),
    ].filter(Boolean),
    envPrefix: "VITE_",
    define: Object.fromEntries(
      ENV_KEYS.map((key) => [
        `import.meta.env.${key}`,
        JSON.stringify(env[key]),
      ]),
    ),
    build: {
      minify: "oxc",
      cssMinify: true,
      sourcemap: false,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("@supabase")) return "supabase";
            if (
              id.includes("react-dom") ||
              id.includes("react-router") ||
              id.includes("/react/")
            ) {
              return "react-vendor";
            }
            if (id.includes("react-helmet")) return "helmet";
            if (id.includes("sonner")) return "sonner";
          },
        },
      },
    },
  };
});
