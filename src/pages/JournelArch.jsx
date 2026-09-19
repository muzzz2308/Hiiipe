import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../lib/api";
import SiteLayout from "../components/layout/SiteLayout";
import Logo from "../components/ui/Logo";
import { ArchiveSkeleton } from "../components/ui/skeletons";

export default function JournalArch() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((p) => {
    const catOk = active === "All" || p.cat === active;
    const term = q.trim().toLowerCase();

    const qOk =
      !term ||
      p.title.toLowerCase().includes(term) ||
      p.excerpt.toLowerCase().includes(term) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(term));

    return catOk && qOk;
  });
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.cat)))],
    [posts],
  );

  if (loading) return <ArchiveSkeleton />;

  return (
    <SiteLayout
      seo={{
        title: "Journal",
        path: "/journals",
        description:
          "Insights on digital marketing, SEO, AI automation, and software from the HIIIPE studio.",
      }}
    >
    <div className="pt-24">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-5 flex items-center justify-between">
          <Logo to="/" />
          <Link
            to="/"
            hash="journal"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest"
          >
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors rotate-180">
              <ArrowIcon />
            </span>
            Back home
          </Link>
        </div>
      </header>
      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-24 pb-16 border-b border-border overflow-hidden">
        <div className="mx-auto max-w-[1600px] relative z-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
            // The Archive — {posts.length.toString().padStart(2, "0")} entries
          </p>
          <h1 className="font-display text-6xl md:text-[9vw] leading-[0.9] uppercase">
            Every
            <br />
            dispatch.
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground">
            Field notes, arguments and receipts from inside the studio. No SEO
            filler, no rewritten LinkedIn takes — just the thinking behind the
            work we actually ship.
          </p>
        </div>
        <div className="pointer-events-none absolute -bottom-16 right-0 font-display text-[22vw] leading-none text-foreground/4 select-none">
          JOURNAL
        </div>
      </section>
      {/* Controls */}
      <section className="px-6 md:px-10 py-8 border-b border-border">
        <div className="mx-auto max-w-[1600px] flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest border transition-colors ${
                  active === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search entries…"
              className="w-full bg-transparent border border-border rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-widest placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>
      {/* List */}
      <section className="px-6 md:px-10 py-16">
        <div className="mx-auto max-w-[1600px]">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                // no matches
              </p>
              <p className="font-display text-4xl">
                Nothing in the archive fits that.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/journal/${p.slug}`}
                    className="group grid grid-cols-12 gap-6 items-center py-8 md:py-10"
                  >
                    <span className="col-span-2 md:col-span-1 font-mono text-xs text-muted-foreground">
                      {p.n}
                    </span>
                    <div className="col-span-10 md:col-span-6">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
                        {p.cat} · {p.read}
                      </p>
                      <h2 className="font-display text-3xl md:text-5xl leading-[0.95] group-hover:text-primary transition-colors">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-muted-foreground max-w-2xl hidden md:block">
                        {p.excerpt}
                      </p>
                    </div>
                    <div className="hidden md:flex col-span-3 flex-wrap gap-2">
                      {(p.tags || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full border border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="col-span-12 md:col-span-2 flex md:justify-end items-center gap-3 font-mono text-xs uppercase tracking-widest">
                      <span>{p.date}</span>
                      <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                        <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {/* Footer CTA */}
      <section className="px-6 md:px-10 py-24 border-t border-border">
        <div className="mx-auto max-w-[1600px] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Got a story worth
            <br />
            arguing about?
          </h2>
          <Link
            to="/"
            hash="contact"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest self-start md:self-auto"
          >
            Pitch the studio
            <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>
    </div>
    </SiteLayout>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );
}