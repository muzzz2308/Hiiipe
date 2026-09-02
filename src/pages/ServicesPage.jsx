import { Link } from "react-router-dom";
import SiteLayout from "../components/layout/SiteLayout";
import SectionLabel from "../components/ui/SectionLabel";
import ArrowIcon from "../components/ui/ArrowIcon";
import { servicePillars } from "../lib/siteContent";
import { organizationSchema } from "../lib/seo";

export default function ServicesPage() {
  return (
    <SiteLayout
      seo={{
        title: "Services",
        path: "/services",
        description:
          "Digital marketing, custom software, and AI automation services from HIIIPE. SEO, Meta Ads, web apps, chatbots, and growth systems for ambitious brands.",
        keywords: [
          "digital marketing services",
          "SEO services",
          "software development",
          "AI automation services",
          "Meta Ads management",
        ],
        schema: organizationSchema(),
      }}
    >
      <section className="pt-36 pb-20 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <SectionLabel index="01" label="Services" />
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8 mb-16">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] max-w-5xl">
              Marketing.
              <br />
              Software.
              <br />
              <span className="text-primary">AI.</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              Three pillars. One team. We help you get found, build what you
              need, and automate what slows you down — without juggling three
              different agencies.
            </p>
          </div>

          <div className="space-y-6">
            {servicePillars.map((s) => (
              <article
                key={s.slug}
                id={s.slug}
                className="grid lg:grid-cols-12 gap-8 rounded-3xl border border-border bg-card p-8 md:p-12"
              >
                <div className="lg:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
                    /{s.n} · {s.title}
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight">
                    {s.headline}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono uppercase tracking-widest border border-border rounded-full px-3 py-1.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    What we deliver
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="rounded-xl border border-border bg-background/50 px-4 py-4 text-sm leading-relaxed"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/30 bg-primary/10 p-8 md:p-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                Not sure where to start?
              </p>
              <p className="font-display text-3xl md:text-4xl">
                We&apos;ll map the right pillar to your goal.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold"
            >
              <span>Book a free intro</span>
              <span className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
