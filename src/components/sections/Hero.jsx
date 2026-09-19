import { Link } from "react-router-dom";
import ArrowIcon from "../ui/ArrowIcon";

const PILLARS = ["SEO & Ads", "Web Apps", "AI Automation"];

export default function Hero() {
  return (
    <section className="relative pt-28 pb-10 md:pt-32 md:pb-14 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-16 w-[min(520px,70vw)] h-[min(520px,55vh)] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute inset-0 grid-lines opacity-15" />
      </div>

      <div className="mx-auto max-w-[1600px] relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary mb-4">
              Available for new projects
            </p>

            <h1 className="font-display text-[clamp(2.75rem,11vw,7.5rem)] leading-[0.88] text-foreground">
              <span className="block">Grow.</span>
              <span className="block text-primary">Build.</span>
              <span className="block">Automate.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              HIIIPE is a hybrid agency — digital marketing that converts,
              software that ships, and AI systems that save your team hours
              every week.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold text-sm md:text-base"
              >
                <span>Start a project</span>
                <span
                  className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform"
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center rounded-full border border-border px-6 py-3.5 font-semibold text-sm md:text-base hover:bg-secondary transition-colors"
              >
                See our work
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                What we do
              </p>
              <ul className="space-y-3">
                {PILLARS.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-foreground/90"
                  >
                    <span className="text-primary font-display text-lg leading-none">
                      0{i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="rounded-full border border-border px-3 py-1.5">
                Lahore & London
              </span>
              <span className="rounded-full border border-border px-3 py-1.5">
                Response &lt; 24h
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
