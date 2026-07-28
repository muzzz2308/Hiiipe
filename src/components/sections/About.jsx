import SectionLabel from "../ui/SectionLabel";

export default function About() {
  return (
    <section id="studio" className="relative py-32 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="02" label="Studio" />
        <div className="grid grid-cols-12 gap-6 mt-10">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="font-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.9]">
              A small studio
              <br />
              with a <span className="text-primary">loud</span> point
              <br />
              of view.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pt-6 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              HIIIPE is a digital marketing agency that helps small
              businesses and startups grow online fast. From SEO and social
              media to Meta Ads and web design, we handle your entire digital
              presence so you can focus on running your business. We don't do
              fluff. We do results.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No decks. No filler. Just work you'll be caught staring at.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Founded
                </p>
                <p className="font-display text-3xl mt-1">2026</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Studio
                </p>
                <p className="font-display text-3xl mt-1">LHR,PK</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

