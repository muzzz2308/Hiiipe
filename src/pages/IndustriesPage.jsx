import { Link } from "react-router-dom";
import SiteLayout from "../components/layout/SiteLayout";
import ArrowIcon from "../components/ui/ArrowIcon";
import { industries } from "../lib/siteContent";

export default function IndustriesPage() {
  return (
    <SiteLayout
      seo={{
        title: "Industries",
        path: "/industries",
        description:
          "Industry-focused digital marketing and software from HIIIPE — cafes, restaurants, salons, gyms, and hospitality brands.",
        keywords: [
          "restaurant marketing agency",
          "cafe digital marketing",
          "salon marketing",
          "gym marketing agency",
        ],
      }}
    >
      <section className="pt-36 pb-20 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // industries
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-4xl mb-6">
            Built for
            <br />
            <span className="text-primary">your vertical.</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed mb-16">
            We combine local SEO, paid social, and conversion-ready websites for
            businesses where foot traffic, bookings, and repeat visits matter.
          </p>

          <div className="grid gap-6">
            {industries.map((ind, i) => (
              <article
                key={ind.slug}
                id={ind.slug}
                className="grid lg:grid-cols-12 gap-8 rounded-3xl border border-border bg-card p-8 md:p-12"
              >
                <div className="lg:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    {String(i + 1).padStart(2, "0")} / {ind.title}
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight">
                    {ind.headline}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
                <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3 content-start">
                  {ind.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-xl border border-border bg-background/50 px-4 py-4 text-sm leading-relaxed"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold"
            >
              <span>Talk about your industry</span>
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
