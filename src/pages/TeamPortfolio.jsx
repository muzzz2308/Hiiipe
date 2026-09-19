import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemberBySlug, getTeam } from "../lib/api";
import ArrowIcon from "../components/ui/ArrowIcon";
import Logo from "../components/ui/Logo";
import SEO from "../components/seo/SEO";
import { DetailPageSkeleton } from "../components/ui/skeletons";

export default function PortfolioPage() {
  const { slug } = useParams();

  const [member, setMember] = useState(null);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getMemberBySlug(slug), getTeam()])
      .then(([found, all]) => {
        if (cancelled) return;
        setMember(found);
        setTeam(all);
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
      behavior: "smooth",
    });
  }, [slug]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
        }) + " UTC",
      );
    };

    tick();

    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <h1 className="text-4xl font-bold">404 - Member Not Found</h1>
      </div>
    );
  }

  const idx = team.findIndex((m) => m.slug === member.slug);
  const next = team.length ? team[(idx + 1) % team.length] : null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SEO
        title={member.name}
        description={`${member.name} — ${member.role} at HIIIPE. ${member.bio}`}
        path={`/team/${member.slug}`}
        image={member.photo}
        type="profile"
      />
      <PortfolioNav name={member.name} />
      <Hero member={member} team={team} />
      <Bio member={member} />
      <Skills member={member} />
      <Toolkit member={member} />
      <Projects member={member} />
      <Contact member={member} />
      {next && <NextUp next={next} />}
      <Foot time={time} />
    </div>
  );
}

export function TeamMember() {
  const { slug } = useParams();

  //   const member = getMember(slug);
  const member = team.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            // 404
          </p>

          <h1 className="font-display text-6xl mb-6">No such member.</h1>

          <Link to="/" className="underline underline-offset-4">
            Back to studio
          </Link>
        </div>
      </div>
    );
  }
}

function PortfolioNav({ name }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5">
      <div className="mx-auto max-w-[1600px] flex items-center justify-between rounded-full border border-border bg-background/70 backdrop-blur-xl px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Studio
          </Link>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-foreground">{name}</span>
        </div>
        <Link
          to="/"
          hash="contact"
          className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 font-semibold text-sm"
        >
          <span>Hire</span>
          <span className="w-5 h-5 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
            <ArrowIcon className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </header>
  );
}
function Hero({ member, team }) {
  // Break role into words and distribute around the portrait
  const roleWords = member.role.split(/\s+/).filter((w) => w !== "&");
  const orbit = member.orbit;
  return (
    <section className="relative pt-32 md:pt-40 pb-24 px-6 md:px-10 min-h-screen flex items-center">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 rounded-full blur-[160px] opacity-40"
          style={{
            background: `radial-gradient(circle, oklch(0.89 0.19 100 / 0.6), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 grid-lines opacity-30" />
      </div>
      <div className="relative mx-auto max-w-[1600px] w-full">
        {/* Top meta bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-primary">
            // portfolio ·{" "}
            {String(team.findIndex((m) => m.slug === member.slug) + 1).padStart(
              2,
              "0",
            )}{" "}
            of {String(team.length).padStart(2, "0")}
          </span>
          <span>
            {member.based} — {member.years} in the game
          </span>
        </div>
        <div className="relative flex items-center justify-center">
          {/* Giant background name */}
          <h1
            aria-hidden
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[20vw] leading-none text-foreground/5 select-none pointer-events-none whitespace-nowrap"
          >
            {member.name.split(" ")[0]}
          </h1>
          {/* Orbit ring with rotating specialties */}
          <div className="relative aspect-square w-[min(90vw,780px)] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-border/60" />
            <div className="absolute inset-[6%] rounded-full border border-border/40 border-dashed" />
            <div className="absolute inset-[14%] rounded-full border border-primary/20" />
            {/* Orbiting specialty tags */}
            {orbit.map((word, i) => {
              const angle = (360 / orbit.length) * i - 90;
              const rad = (angle * Math.PI) / 180;
              const r = 50; // percent from center
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              return (
                <span
                  key={word}
                  className="absolute font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground px-3 py-1 rounded-full bg-background/70 backdrop-blur border border-border"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {word}
                </span>
              );
            })}
            {/* Photo slot in the center — user will add pic later, no bg */}
            <div className="relative w-[60%] aspect-[3/4] flex items-end justify-center">
              {/* Yellow spotlight behind subject */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[85%] rounded-full bg-primary blur-2xl opacity-40" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[70%] rounded-t-full bg-primary/80" />
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]"
                />
              ) : (
                <div className="relative z-10 w-[80%] aspect-[3/4] rounded-t-[50%] border-2 border-dashed border-foreground/40 flex flex-col items-center justify-center text-center px-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/60">
                    Photo slot
                  </span>
                  <span className="mt-2 font-display text-2xl text-foreground/70">
                    Add PNG
                  </span>
                  <span className="mt-1 font-mono text-[10px] text-foreground/40">
                    transparent bg
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Name + role block */}
        <div className="mt-8 md:mt-4 grid md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">
              {roleWords.join(" · ")}
            </p>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85]">
              {member.name}
            </h2>
          </div>
          <div className="border-l border-border pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              // manifesto
            </p>
            <p className="text-lg md:text-xl leading-snug">"{member.quote}"</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Bio({ member }) {
  return (
    <section className="relative py-24 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-[1600px] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // 01 · about
          </p>
          <h3 className="font-display text-5xl md:text-6xl leading-none">
            The
            <br />
            work
            <br />
            <span className="text-primary">so far.</span>
          </h3>
        </div>
        <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p className="text-foreground text-2xl md:text-3xl leading-snug font-display normal-case tracking-normal">
            {member.bio}
          </p>
          <p>
            {member.name.split(" ")[0]} joined hiiipe to sharpen the
            studio's edge in{" "}
            <span className="text-foreground">{member.role.toLowerCase()}</span>
            . {member.years} deep and still allergic to the obvious answer — the
            kind of practitioner who treats every brief like a small rebellion.
          </p>
          <p>
            Currently based in{" "}
            <span className="text-foreground">{member.based}</span>, working
            across time zones with founders, in-house teams, and the occasional
            insomniac client who calls at 2AM with a "quick idea."
          </p>
        </div>
      </div>
    </section>
  );
}
function Skills({ member }) {
  return (
    <section className="relative py-24 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
              // 02 · expertise
            </p>
            <h3 className="font-display text-5xl md:text-7xl">
              The sharp <span className="text-primary">tools.</span>
            </h3>
          </div>
          <p className="max-w-md text-muted-foreground">
            A short list. Because deep beats wide when the deadline is tomorrow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {member.skills.map((s, i) => (
            <div key={s.label} className="bg-background p-8 md:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-display text-3xl md:text-4xl">
                    {s.label}
                  </h4>
                </div>
                <span className="font-mono text-sm text-primary">
                  {s.level}
                </span>
              </div>
              <div className="h-0.5 w-full bg-border relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Toolkit({ member }) {
  return (
    <section className="relative py-20 px-6 md:px-10 border-t border-border overflow-hidden">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
          // 03 · toolkit
        </p>
        <div className="flex flex-wrap gap-3">
          {member.toolkit.map((t) => (
            <span
              key={t}
              className="font-display text-2xl md:text-4xl px-6 py-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
function Projects({ member }) {
  return (
    <section className="relative py-24 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
              // 04 · selected work
            </p>
            <h3 className="font-display text-5xl md:text-7xl">Receipts.</h3>
          </div>
          <p className="max-w-md text-muted-foreground">
            A slice of the archive. Full case studies on request.
          </p>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {member.projects.map((p, i) => (
            <li
              key={p.name}
              className="group grid grid-cols-12 items-center gap-4 py-6 md:py-8 hover:bg-card transition-colors px-2"
            >
              <span className="col-span-2 font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-6 font-display text-3xl md:text-5xl">
                {p.name}
              </span>
              <span className="col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {p.tag}
              </span>
              <span className="col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {p.year}
              </span>
              {/* <span className="col-span-1 justify-self-end w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                <ArrowIcon />
              </span> */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function Contact({ member }) {
  return (
    <section className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px] relative rounded-3xl border border-border bg-card p-10 md:p-20 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-125 h-125 rounded-full blur-[120px] pointer-events-none"
          style={{
            background: `linear-gradient(${member.gradient}deg, oklch(0.89 0.19 100 / 0.35), transparent)`,
          }}
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
            // 05 · direct line
          </p>
          <h3 className="font-display text-5xl md:text-8xl leading-[0.9] mb-10">
            Work with
            <br />
            <span className="text-primary">
              {member.name.split(" ")[0]}
            </span>{" "}
            directly.
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${member.contact.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold text-lg"
            >
              <span>{member.contact.email}</span>
              <span className="w-9 h-9 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowIcon />
              </span>
            </a>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              or find me on the internet — {member.contact.handle}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function NextUp({ next }) {
  return (
    <section className="relative py-16 px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-[1600px]">
        <Link
          to={`/team/${next.slug}`}
          params={{ slug: next.slug }}
          className="group flex flex-wrap items-center justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
              // next up
            </p>
            <p className="font-display text-5xl md:text-7xl group-hover:text-primary transition-colors">
              {next.name} →
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {next.role}
            </p>
          </div>
          <span className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
            <ArrowIcon className="w-6 h-6" />
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
          ← Back to hiiipe
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
