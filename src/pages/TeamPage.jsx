import SiteLayout from "../components/layout/SiteLayout";
import Team from "../components/sections/Team";

export default function TeamPage() {
  return (
    <SiteLayout
      seo={{
        title: "Team",
        path: "/team",
        description:
          "Meet the HIIIPE team — marketers, engineers, and builders working across Lahore and London.",
        keywords: ["HIIIPE team", "digital agency team", "marketing engineers"],
      }}
    >
      <section className="pt-36 pb-4 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // team
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-4xl">
            Marketers &amp;
            <br />
            <span className="text-primary">engineers.</span>
          </h1>
        </div>
      </section>
      <Team fullPage />
    </SiteLayout>
  );
}
