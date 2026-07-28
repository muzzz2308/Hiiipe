export default function Banner() {
  const items = [
    "Brand Identity",
    "Product Design",
    "Web Development",
    "Motion",
    "Art Direction",
    "Strategy",
    "Copywriting",
    "3D & CGI",
  ];
  const doubled = [...items, ...items, ...items];
  return (
    <section className="relative border-y border-border py-8 overflow-hidden bg-primary text-primary-foreground">
      <div className="flex gap-12 animate-marquee whitespace-nowrap w-max">
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center gap-12 font-display text-4xl md:text-6xl">
            <span>{it}</span>
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current shrink-0">
              <path d="M12 2l2.5 7H22l-6 4.5L18.5 21 12 16.5 5.5 21 8 13.5 2 9h7.5z" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
