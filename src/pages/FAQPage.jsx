import { Link } from "react-router-dom";
import SiteLayout from "../components/layout/SiteLayout";
import ArrowIcon from "../components/ui/ArrowIcon";
import { faqItems } from "../lib/siteContent";
import { faqSchema } from "../lib/seo";

export default function FAQPage() {
  return (
    <SiteLayout
      seo={{
        title: "FAQ",
        path: "/faq",
        description:
          "Frequently asked questions about HIIIPE digital marketing, software development, and AI automation services.",
        keywords: [
          "digital marketing FAQ",
          "SEO questions",
          "AI automation FAQ",
          "agency FAQ",
        ],
        schema: faqSchema(faqItems),
      }}
    >
      <section className="pt-36 pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // faq
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-3xl mb-16">
            Straight
            <br />
            <span className="text-primary">answers.</span>
          </h1>

          <div className="grid gap-4 max-w-4xl">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-card open:border-primary/40 transition-colors"
              >
                <summary className="cursor-pointer list-none px-6 py-5 md:px-8 md:py-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                      {item.pillar}
                    </p>
                    <p className="font-display text-xl md:text-2xl leading-snug">
                      {item.q}
                    </p>
                  </div>
                  <span className="mt-1 text-primary shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 md:px-8 md:pb-8 text-muted-foreground leading-relaxed border-t border-border/60 pt-4 mx-6 md:mx-8">
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-border bg-secondary/30 p-8 md:p-12 flex flex-wrap items-center justify-between gap-6">
            <p className="font-display text-3xl max-w-lg">
              Still have questions? Ask us directly.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold"
            >
              <span>Contact HIIIPE</span>
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
