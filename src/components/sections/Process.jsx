import ArrowIcon from "../ui/ArrowIcon";
import SectionLabel from "../ui/SectionLabel";

export default function Process() {
  const steps = [
    { n: "01", t: "Discovery", d: "We bring a unique blend of creativity and strategy." },
    { n: "02", t: "Strategy", d: "Every project starts with a strong roadmap." },
    { n: "03", t: "Design", d: "Fast and scalable web experiences." },
    { n: "04", t: "Launch", d: "Built to convert and grow businesses." },
  ];
  return (
    <section id="process" className="relative py-32 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="05" label="Process" />
        <div className="mt-10 mb-16">
          <h2 className="font-display text-6xl md:text-8xl">
            How we <span className="text-primary">work.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8 md:p-10 hover:bg-card transition-colors">
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-2xl text-primary">/{s.n}</span>
                {/* <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                  <ArrowIcon />
                </span> */}
              </div>
              <h3 className="font-display text-4xl mb-4">{s.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
