import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE_URL = "https://hiiipe.com";

const staticRoutes = [
  "/",
  "/services",
  "/work",
  "/studio",
  "/team",
  "/industries",
  "/faq",
  "/contact",
  "/journals",
];

const teamSlugs = [
  "murtaza-humayun",
  "abdullah-zeeshan",
  "muhammad-asad",
];

const journalSlugs = [
  "10-signs-your-website-is-killing-your-business",
  "why-good-graphic-design-is-the-secret-weapon",
  "how-ai-automation-are-changing-digital-marketing-in-2025",
  "why-every-small-business-needs-meta-ads-in-2025",
  "how-data-analysis-can-double-your-marketing-results",
  "social-media-marketing-vs-meta-ads",
];

const urls = [
  ...staticRoutes,
  ...teamSlugs.map((s) => `/team/${s}`),
  ...journalSlugs.map((s) => `/journal/${s}`),
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(resolve("public/sitemap.xml"), xml, "utf8");
console.log(`[sitemap] Wrote ${urls.length} URLs to public/sitemap.xml`);
