import { Link } from "react-router-dom";
import SiteLayout from "../components/layout/SiteLayout";
import Works from "../components/sections/Works";
import ArrowIcon from "../components/ui/ArrowIcon";

export default function WorkPage() {
  return (
    <SiteLayout
      seo={{
        title: "Work",
        path: "/work",
        description:
          "Selected projects from HIIIPE — brand, web, marketing, and software work for startups and growing businesses.",
        keywords: [
          "agency portfolio",
          "web design portfolio",
          "marketing case studies",
          "software projects",
        ],
      }}
    >
      <section className="pt-36 pb-8 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // portfolio
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-4xl">
            Work that
            <br />
            <span className="text-primary">earns attention.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A mix of marketing wins and software builds — the hybrid portfolio
            of a team that does both, not just one.
          </p>
        </div>
      </section>

      <Works fullPage />

      <section className="pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px] rounded-3xl border border-border bg-card p-8 md:p-12 flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-3xl md:text-4xl max-w-xl">
            Need a marketing case study or a build walkthrough?
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold"
          >
            <span>Request full deck</span>
            <span className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
