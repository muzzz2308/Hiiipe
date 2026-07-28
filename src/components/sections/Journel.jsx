import { useEffect, useState } from "react";
import { getPosts } from "../../lib/api";
import ArrowIcon from "../ui/ArrowIcon";
import { Link } from "react-router-dom";
import SectionLabel from "../ui/SectionLabel";
import { JournalSkeleton } from "../ui/skeletons";

export default function Journal() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <JournalSkeleton />;

  const featured = posts.slice(0, 3);

  return (
    <section
      id="journal"
      className="relative py-32 px-6 md:px-10 bg-secondary/30"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="06" label="Journal" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 mb-12">
          <h2 className="font-display text-6xl md:text-8xl">
            Field
            <br />
            Notes
          </h2>
          <p className="max-w-md text-muted-foreground text-lg">
            Half-manifesto, half-lab report. Long-form thinking from the studio
            on brand, product and the state of the web.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <Link
              to={`/journal/${p.slug}`}
              key={p.slug || p.n}
              className={`group relative block rounded-2xl overflow-hidden border border-border bg-card hover:border-primary transition-colors ${
                i === 0
                  ? "col-span-12 md:col-span-8 md:row-span-2"
                  : "col-span-12 md:col-span-4"
              }`}
            >
              <div
                className={`relative overflow-hidden ${i === 0 ? "h-90 md:h-105" : "h-55"}`}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                  {p.cat}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                  <span>/{p.n}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>{p.date}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>{p.read} read</span>
                </div>
                <h3
                  className={`font-display leading-[0.95] mb-4 ${i === 0 ? "text-4xl md:text-6xl" : "text-3xl"}`}
                >
                  {p.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {p.excerpt}
                </p>
                <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
                  Read entry
                  <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    <ArrowIcon />
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // new dispatches every other Tuesday
          </p>
          <Link
            to="/journals"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest"
          >
            Browse the archive
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
