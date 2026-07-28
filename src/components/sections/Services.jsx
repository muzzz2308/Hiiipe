import ArrowIcon from "../ui/ArrowIcon";
import SectionLabel from "../ui/SectionLabel";

const services = [
  {
    n: "01",
    title: "Brand Identity",
    desc: "Logos, systems, wordmarks and guidelines that survive contact with the real world.",
    tags: ["Logo", "Guidelines", "Naming", "Voice"],
  },
  {
    n: "02",
    title: "Product & UI/UX",
    desc: "End-to-end interface design for SaaS, fintech and consumer products people actually want to open.",
    tags: ["Research", "Wireframes", "UI", "Prototyping"],
  },
  {
    n: "03",
    title: "Web & Development",
    desc: "Marketing sites and web apps engineered to load fast, rank high and feel expensive.",
    tags: ["Next.js", "Webflow", "CMS", "Motion"],
  },
  {
    n: "04",
    title: "Growth & Content",
    desc: "Positioning, campaigns and content systems that turn attention into revenue.",
    tags: ["Strategy", "SEO", "Ads", "Editorial"],
  },
];
export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6 md:px-10 bg-secondary/30">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="03" label="Services" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 mb-12">
          <h2 className="font-display text-6xl md:text-8xl">
            Our<br />Expertise
          </h2>
          <p className="max-w-md text-muted-foreground text-lg">
            Four disciplines. One studio. We plug in from strategy to shipping so nothing gets lost in the handoff.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div
              key={s.n}
              className="group relative bg-card border border-border rounded-2xl p-8 md:p-10 overflow-hidden hover:border-primary transition-colors"
            >
              <div className="absolute -right-8 -top-8 font-display text-[10rem] text-primary/5 leading-none pointer-events-none group-hover:text-primary/10 transition-colors">
                {s.n}
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    /{s.n}
                  </span>
                </div>
                <h3 className="font-display text-4xl md:text-5xl mb-4">{s.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}