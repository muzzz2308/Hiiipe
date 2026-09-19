import { isSupabaseConfigured, supabase } from "./supabase";
import staticPosts from "./post";
import staticTeam from "./team";
import staticTestimonials from "./testimonials";
import staticProjects from "./projects";

const staticHeroReviews = {
  rating: "4.9",
  label: "200+ reviews",
  avatars: [],
};

function stripDbFields(row) {
  if (!row) return row;
  const { created_at, updated_at, sort_order, ...rest } = row;
  return rest;
}

async function fromTable(table, { orderBy = "created_at", ascending = false } = {}) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order(orderBy, { ascending });
  if (error) throw error;
  return data ?? [];
}

export async function getPosts() {
  try {
    const data = await fromTable("posts", { orderBy: "created_at", ascending: false });
    if (data) return data.map(stripDbFields);
  } catch (e) {
    console.warn("[api] getPosts failed, using static", e);
  }
  return staticPosts;
}

export async function getPostBySlug(slug) {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (data) return stripDbFields(data);
    }
  } catch (e) {
    console.warn("[api] getPostBySlug failed, using static", e);
  }
  return staticPosts.find((p) => p.slug === slug) ?? null;
}

export async function getTeam() {
  try {
    const data = await fromTable("team_members", { orderBy: "sort_order", ascending: true });
    if (data) return data.map(stripDbFields);
  } catch (e) {
    console.warn("[api] getTeam failed, using static", e);
  }
  return staticTeam;
}

export async function getMemberBySlug(slug) {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (data) return stripDbFields(data);
    }
  } catch (e) {
    console.warn("[api] getMemberBySlug failed, using static", e);
  }
  return staticTeam.find((m) => m.slug === slug) ?? null;
}

export async function getTestimonials() {
  try {
    const data = await fromTable("testimonials", { orderBy: "sort_order", ascending: true });
    if (data) return data.map(stripDbFields);
  } catch (e) {
    console.warn("[api] getTestimonials failed, using static", e);
  }
  return staticTestimonials;
}

function enrichProject(row) {
  const meta = staticProjects.find(
    (p) =>
      p.title === row.title || (p.url && row.url && p.url === row.url),
  );

  const base = stripDbFields(row);
  return {
    ...base,
    url: base.url || meta?.url || "",
    accent: meta?.accent,
  };
}

export async function getProjects() {
  try {
    const data = await fromTable("projects", { orderBy: "sort_order", ascending: true });
    if (data?.length) return data.map((row) => enrichProject(row));
  } catch (e) {
    console.warn("[api] getProjects failed, using static", e);
  }
  return staticProjects;
}

export async function getHeroReviews() {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from("hero_reviews")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        return {
          rating: data.rating || "4.9",
          label: data.label || "200+ reviews",
          avatars: data.avatars || [],
        };
      }
    }
  } catch (e) {
    console.warn("[api] getHeroReviews failed, using static", e);
  }
  return staticHeroReviews;
}

export async function uploadMedia(file, folder = "misc") {
  if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function getCounts() {
  if (!isSupabaseConfigured) {
    return {
      posts: staticPosts.length,
      team: staticTeam.length,
      testimonials: staticTestimonials.length,
      projects: staticProjects.length,
    };
  }
  const tables = ["posts", "team_members", "testimonials", "projects"];
  const results = await Promise.all(
    tables.map(async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    }),
  );
  return {
    posts: results[0],
    team: results[1],
    testimonials: results[2],
    projects: results[3],
  };
}
