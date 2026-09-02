import ArrowIcon from "../ui/ArrowIcon";
import { Link } from "react-router-dom";

export default function Stats() {
  const stats = [
    {
      n: "15",
      label: "Early partners",
      desc: "Founders who bet on us before the case studies existed.",
    },
    {
      n: "0",
      label: "Middle layers",
      desc: "You talk to the people who design, build, and ship. Not their assistant.",
    },
    {
      n: "100%",
      label: "Founder-led",
      desc: "The team on your intro call is the team on your project.",
    },
    {
      n: "48h",
      label: "To first roadmap",
      desc: "Brief to plan in two days. No six-week discovery theater.",
    },
  ];

  return (
    <section className="relative py-32 px-6 md:px-10 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <div className="absolute inset-0 grid-lines" />
      </div>

      <div className="mx-auto max-w-[1600px] relative">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-6">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] mb-6 text-primary-foreground">
              // early studio · honest numbers
            </p>
            <h2 className="font-display text-6xl md:text-8xl leading-[0.9]">
              New agency.
              <br />
              No old playbook.
            </h2>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-primary-foreground text-primary px-7 py-4 font-semibold shrink-0"
          >
            <span>Start a Project</span>
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowIcon />
            </span>
          </Link>
        </div>

        <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-primary-foreground mb-16">
          We&apos;re not going to inflate our stats to look like a 200-person shop.
          What you get instead: a small team that moves fast, stays close, and
          treats your project like it matters — because it does.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/20 rounded-2xl overflow-hidden border border-primary-foreground/15">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-primary p-8 md:p-10 flex flex-col justify-between min-h-[220px]"
            >
              <p className="font-display text-6xl md:text-7xl lg:text-8xl leading-none mb-6">
                {s.n}
              </p>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-2 text-primary-foreground">
                  {s.label}
                </p>
                <p className="text-sm leading-relaxed text-primary-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-primary-foreground">
          Launched 2025 · Lahore &amp; London · Selective about who we take on
        </p>
      </div>
    </section>
  );
}
