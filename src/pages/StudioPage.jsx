import SiteLayout from "../components/layout/SiteLayout";
import About from "../components/sections/About";
import Process from "../components/sections/Process";
import Stats from "../components/sections/Stats";

export default function StudioPage() {
  return (
    <SiteLayout
      seo={{
        title: "Studio",
        path: "/studio",
        description:
          "Meet HIIIPE — a Lahore & London studio blending digital marketing, software engineering, and AI automation for brands ready to grow.",
        keywords: [
          "HIIIPE studio",
          "digital agency Lahore",
          "marketing and software agency",
        ],
      }}
    >
      <section className="pt-36 pb-8 px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            // studio
          </p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.9] max-w-4xl">
            Small team.
            <br />
            <span className="text-primary">Serious range.</span>
          </h1>
        </div>
      </section>
      <About />
      <Stats />
      <Process />
    </SiteLayout>
  );
}
