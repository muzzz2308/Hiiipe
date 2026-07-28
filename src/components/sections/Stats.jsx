import ArrowIcon from "../ui/ArrowIcon";

export default function Stats() {
  const stats = [
    { n: "150+", label: "Partners", desc: "Founders and teams who ship with us." },
    { n: "1.5k", label: "Happy Clients", desc: "Trust compounds. So does our craft." },
    { n: "24", label: "Awards", desc: "Awwwards, CSSDA, FWA and counting." },
    { n: "07", label: "Years", desc: "Building the studio we wanted to hire." },
  ];
  return (
    <section className="relative py-32 px-6 md:px-10 bg-primary text-primary-foreground overflow-hidden">
      <div className="mx-auto max-w-[1600px] relative">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <h2 className="font-display text-6xl md:text-8xl max-w-4xl leading-[0.9]">
            Turning data into<br />dominance.
          </h2>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-primary-foreground text-primary px-7 py-4 font-semibold"
          >
            <span>Book an intro call</span>
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowIcon />
            </span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary-foreground/20">
          {stats.map((s) => (
            <div key={s.label} className="bg-primary p-6 md:p-10">
              <p className="font-display text-6xl md:text-8xl mb-4">{s.n}</p>
              <p className="font-mono text-xs uppercase tracking-widest mb-2 opacity-70">{s.label}</p>
              <p className="text-sm opacity-80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
