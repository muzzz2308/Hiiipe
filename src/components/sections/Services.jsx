import { Link } from "react-router-dom";
import ArrowIcon from "../ui/ArrowIcon";
import SectionLabel from "../ui/SectionLabel";
import { servicePillars } from "../../lib/siteContent";

export default function Services({ compact = false }) {
  return (
    <section
      id="services"
      className={`relative ${compact ? "py-16" : "py-32"} px-6 md:px-10 bg-secondary/30`}
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="02" label="Services" />
        <div
          className={`${compact ? "mt-6 mb-8" : "mt-10 mb-12"} flex flex-wrap items-end justify-between gap-6`}
        >
          <h2
            className={`font-display ${compact ? "text-4xl md:text-6xl" : "text-6xl md:text-8xl"}`}
          >
            Marketing.
            <br />
            Software.
            <br />
            <span className="text-primary">AI.</span>
          </h2>
          {!compact && (
            <p className="max-w-md text-muted-foreground text-lg">
              Three pillars, one team — from SEO and ads to custom builds and
              intelligent automation.
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {servicePillars.map((s) => (
            <div
              key={s.slug}
              className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-colors flex flex-col ${compact ? "p-6 md:p-7" : "p-8 md:p-10"}`}
            >
              <div className="absolute -right-6 -top-6 font-display text-[8rem] text-primary/5 leading-none pointer-events-none group-hover:text-primary/10 transition-colors">
                {s.n}
              </div>
              <div className="relative flex-1">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  /{s.n}
                </p>
                <h3 className={`font-display mb-3 ${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"}`}>
                  {s.title}
                </h3>
                <p className={`text-muted-foreground leading-relaxed ${compact ? "mb-4 text-sm" : "mb-6"}`}>
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono uppercase tracking-widest border border-border rounded-full px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={compact ? "mt-6" : "mt-10"}>
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest"
          >
            Explore all services
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
