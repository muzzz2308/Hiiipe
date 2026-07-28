import fs from "fs";
import posts from "../src/lib/post.js";
import team from "../src/lib/team.js";
import testimonials from "../src/lib/testimonials.js";

function esc(s) {
  return String(s).replace(/'/g, "''");
}
function j(v) {
  return `'${esc(JSON.stringify(v))}'::jsonb`;
}
function arr(a) {
  return `ARRAY[${a.map((x) => `'${esc(x)}'`).join(",")}]::text[]`;
}

const sql = [];
sql.push("-- Seed data from existing static content");
sql.push("TRUNCATE posts, team_members, testimonials, projects RESTART IDENTITY CASCADE;");
sql.push("");
sql.push("-- Posts");
for (const p of posts) {
  sql.push(`INSERT INTO posts (slug, n, cat, date, read, title, excerpt, img, author, tags, content) VALUES (
  '${esc(p.slug)}', '${esc(p.n)}', '${esc(p.cat)}', '${esc(p.date)}', '${esc(p.read)}',
  '${esc(p.title)}', '${esc(p.excerpt)}', '${esc(p.img)}',
  ${j(p.author)}, ${arr(p.tags)}, ${j(p.content)}
);`);
}
sql.push("");
sql.push("-- Team");
team.forEach((m, i) => {
  sql.push(`INSERT INTO team_members (slug, name, role, bio, photo, gradient, years, based, quote, orbit, skills, toolkit, projects, contact, sort_order) VALUES (
  '${esc(m.slug)}', '${esc(m.name)}', '${esc(m.role)}', '${esc(m.bio)}', '${esc(m.photo)}',
  ${m.gradient}, '${esc(m.years)}', '${esc(m.based)}', '${esc(m.quote)}',
  ${arr(m.orbit)}, ${j(m.skills)}, ${arr(m.toolkit)}, ${j(m.projects)}, ${j(m.contact)}, ${i}
);`);
});
sql.push("");
sql.push("-- Testimonials");
testimonials.forEach((t, i) => {
  sql.push(`INSERT INTO testimonials (quote, name, role, company, metric, sort_order) VALUES (
  '${esc(t.quote)}', '${esc(t.name)}', '${esc(t.role)}', '${esc(t.company)}', '${esc(t.metric)}', ${i}
);`);
});
sql.push("");
sql.push("-- Projects (masterpieces)");
const projects = [
  { img: "/work-1.webp", title: "Lumina Splash", cat: "Brand Identity", year: "2026" },
  { img: "/work-2.webp", title: "Odal Papers", cat: "Print & Editorial", year: "2025" },
  { img: "/work-3.webp", title: "Nexus Finance", cat: "Product Design", year: "2025" },
  { img: "/hero-bg.jpg", title: "Kult Studio", cat: "Art Direction", year: "2024" },
];
projects.forEach((p, i) => {
  sql.push(`INSERT INTO projects (title, cat, year, img, url, sort_order) VALUES (
  '${esc(p.title)}', '${esc(p.cat)}', '${esc(p.year)}', '${esc(p.img)}', '', ${i}
);`);
});

fs.mkdirSync("supabase", { recursive: true });
fs.writeFileSync("supabase/seed.sql", sql.join("\n"));
console.log("Wrote supabase/seed.sql");
