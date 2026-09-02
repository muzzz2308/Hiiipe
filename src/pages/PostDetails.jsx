import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug, getPosts } from "../lib/api";
import Logo from "../components/ui/Logo";
import SEO from "../components/seo/SEO";
import { DetailPageSkeleton } from "../components/ui/skeletons";

export default function JournalDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getPostBySlug(slug), getPosts()])
      .then(([found, all]) => {
        if (cancelled) return;
        setPost(found);
        setPosts(all);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setProgress(Math.min(percentage, 100));
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
        }) + " UTC",
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // 404
          </p>

          <h1 className="font-display text-6xl mb-6">Entry not found.</h1>

          <Link to="/" className="underline underline-offset-4">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts.length ? posts[(idx + 1) % posts.length] : null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/journal/${post.slug}`}
        image={post.img}
        type="article"
        keywords={post.tags}
      />
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 h-0.75 bg-transparent z-60">
        <div
          className="h-full bg-primary transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <JournalNav />
      <Hero post={post} idx={Math.max(idx, 0)} total={posts.length || 1} />
      <Cover post={post} />
      <Body post={post} />
      <ShareBlock post={post} />
      {next && <NextUp next={next} />}
      <Foot time={time} />
    </div>
  );
}

function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={"w-4 h-4 " + className}>
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function JournalNav() {
  return (
    <header className="fixed top-0.75 left-0 right-0 z-50 px-6 md:px-10 py-5">
      <div className="mx-auto max-w-[1600px] flex items-center justify-between rounded-full border border-border bg-background/70 backdrop-blur-xl px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          {/* <div className="relative w-7 h-7">
            <div className="absolute inset-0 bg-primary rounded-full" />
            <div className="absolute inset-1.5 bg-background rounded-full" />
            <div className="absolute inset-2.5 bg-primary rounded-full" />
          </div>
          <span className="font-display text-xl tracking-tight">
            
          </span> */}
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Journal
          </Link>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-foreground">Entry</span>
        </div>
        <Link
          to="/"
          hash="contact"
          className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 font-semibold text-sm"
        >
          <span>Hire</span>
          <span className="w-5 h-5 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
            <Arrow className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </header>
  );
}
function Hero({ post, idx, total }) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 px-6 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-175 rounded-full blur-[160px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, oklch(0.89 0.19 100 / 0.55), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 grid-lines opacity-20" />
      </div>
      <div className="relative mx-auto max-w-300">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-primary">
            // journal · {String(idx + 1).padStart(2, "0")} of{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span>
            {post.date} — {post.read} read
          </span>
        </div>
        <span className="inline-block font-mono text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1.5 rounded-full mb-8">
          {post.cat}
        </span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-10">
          {post.title}
        </h1>
        <p className="max-w-3xl text-xl md:text-2xl leading-snug text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-border pt-8">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full border border-border"
              style={{
                background:
                  "conic-gradient(from 220deg, oklch(0.89 0.19 100), oklch(0.11 0.005 90))",
              }}
            />
            <div>
              <p className="font-display text-xl leading-none">
                {post.author.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                {post.author.role}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            {post.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-widest border border-border rounded-full px-3 py-1.5 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Cover({ post }) {
  return (
    <section className="relative px-6 md:px-10">
      <div className="mx-auto max-w-300">
        <div className="relative rounded-3xl overflow-hidden border border-border aspect-[16/9]">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
function Body({ post }) {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10">
      <div className="mx-auto max-w-300 grid md:grid-cols-12 gap-10">
        <aside className="hidden md:block md:col-span-3">
          <div className="sticky top-32">
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
              // contents
            </p>
            <ul className="space-y-3">
              {post.content
                .filter((s) => s.type === "h2")
                .map((s, i) => (
                  <li
                    key={i}
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    <span className="text-primary mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.text}
                  </li>
                ))}
            </ul>
          </div>
        </aside>
        <article className="md:col-span-9 space-y-8">
          {post.content.map((s, i) => (
            <Section key={i} section={s} first={i === 0} />
          ))}
        </article>
      </div>
    </section>
  );
}
function Section({ section, first }) {
  if (section.type === "p") {
    return (
      <p
        className={
          first
            ? "text-2xl md:text-3xl leading-snug font-display normal-case tracking-normal text-foreground"
            : "text-lg md:text-xl leading-relaxed text-muted-foreground"
        }
      >
        {section.text}
      </p>
    );
  }
  if (section.type === "h2") {
    return (
      <h2 className="font-display text-4xl md:text-5xl leading-none pt-8 border-t border-border">
        <span className="text-primary mr-3">§</span>
        {section.text}
      </h2>
    );
  }
  if (section.type === "quote") {
    return (
      <figure className="relative my-4 rounded-3xl border border-primary/40 bg-card p-8 md:p-12 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-100 h-100 rounded-full blur-[120px] opacity-30 pointer-events-none"
          style={{ background: "oklch(0.89 0.19 100)" }}
        />
        <div className="relative">
          <span className="font-display text-primary text-6xl leading-none block mb-4">
            "
          </span>
          <blockquote className="font-display text-3xl md:text-5xl leading-[0.95] normal-case tracking-tight">
            {section.text}
          </blockquote>
          {section.cite ? (
            <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              — {section.cite}
            </figcaption>
          ) : null}
        </div>
      </figure>
    );
  }
  // list
  return (
    <ul className="divide-y divide-border border-y border-border">
      {section.items.map((it, i) => (
        <li key={i} className="flex items-start gap-6 py-5">
          <span className="font-mono text-xs text-primary pt-1">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-lg md:text-xl leading-snug text-foreground">
            {it}
          </span>
        </li>
      ))}
    </ul>
  );
}
function ShareBlock({ post }) {
  return (
    <section className="relative py-16 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-300 flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // end of entry
          </p>
          <p className="font-display text-3xl md:text-4xl">
            Written by <span className="text-primary">{post.author.name}</span>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {["Copy link", "Share on X", "Email"].map((label) => (
            <button
              key={label}
              type="button"
              className="font-mono text-xs uppercase tracking-widest border border-border rounded-full px-5 py-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
function NextUp({ next }) {
  return (
    <section className="relative py-20 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-300">
        <Link
          to={`/journal/${next.slug}`}
          className="group grid md:grid-cols-12 gap-6 items-center rounded-3xl border border-border p-6 md:p-10 hover:border-primary transition-colors"
        >
          <div className="md:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={next.img}
              alt={next.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
              // next entry
            </p>
            <p className="font-display text-4xl md:text-6xl leading-[0.95] group-hover:text-primary transition-colors">
              {next.title}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {next.cat} · {next.read} read
            </p>
          </div>
          <span className="md:col-span-1 justify-self-end w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
            <Arrow className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
function Foot({ time }) {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1600px] flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          ← Back to Journal
        </Link>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {time || "-- : -- : -- UTC"}
        </span>
        <span>© 2026 hiiipe</span>
      </div>
    </footer>
  );
}
