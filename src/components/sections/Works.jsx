import { useEffect, useState } from "react";
import { getProjects } from "../../lib/api";
import ArrowIcon from "../ui/ArrowIcon";
import SectionLabel from "../ui/SectionLabel";
import { WorksSkeleton } from "../ui/skeletons";

export default function Works() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setWorks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <WorksSkeleton />;

  const spans = [
    "col-span-12 md:col-span-7",
    "col-span-12 md:col-span-5",
    "col-span-12 md:col-span-5",
    "col-span-12 md:col-span-7",
  ];

  return (
    <section id="work" className="relative py-32 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="04" label="Selected Work" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 mb-12">
          <h2 className="font-display text-6xl md:text-8xl">
            Recent
            <br />
            Masterpieces
          </h2>
          <a
            href="#"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest"
          >
            View all archive
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
              <ArrowIcon />
            </span>
          </a>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {works.map((w, i) => (
            <a
              href={w.url || "#"}
              target={w.url ? "_blank" : undefined}
              rel={w.url ? "noopener noreferrer" : undefined}
              key={w.id || i}
              className={`group relative ${spans[i % spans.length]} h-[105 md:h-135 block rounded-2xl overflow-hidden border border-border`}
            >
              <img
                src={w.img}
                alt={w.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent" />
              <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-background/70 backdrop-blur px-2.5 py-1 rounded-full border border-border">
                  0{i + 1} / {String(works.length).padStart(2, "0")}
                </span>
                <span className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowIcon />
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                    {w.cat}
                  </p>
                  <h3 className="font-display text-4xl md:text-5xl">
                    {w.title}
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {w.year}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
