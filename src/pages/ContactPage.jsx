import SiteLayout from "../components/layout/SiteLayout";
import CTA from "../components/sections/CTA";
import { localBusinessSchema } from "../lib/seo";

export default function ContactPage() {
  return (
    <SiteLayout
      seo={{
        title: "Contact",
        path: "/contact",
        description:
          "Get in touch with HIIIPE — info@hiiipe.com. Digital marketing, software, and AI projects. Response within 24 hours.",
        keywords: [
          "contact HIIIPE",
          "hire digital agency",
          "info@hiiipe.com",
        ],
        schema: localBusinessSchema(),
      }}
    >
      <section className="pt-36 pb-8 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // contact
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9]">
            Let&apos;s build
            <br />
            <span className="text-primary">something.</span>
          </h1>
        </div>
      </section>
      <CTA autoOpen />
    </SiteLayout>
  );
}
