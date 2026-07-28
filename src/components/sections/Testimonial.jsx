import { useEffect, useRef, useState } from "react";
import { getTestimonials } from "../../lib/api";
import SectionLabel from "../ui/SectionLabel";
import { TestimonialSkeleton } from "../ui/skeletons";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    getTestimonials()
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(id);
  }, [isPaused, testimonials.length]);

  const goTo = (index) => {
    if (testimonials.length === 0) return;
    setActive((index + testimonials.length) % testimonials.length);
  };

  const handlePointerDown = (e) => {
    setDragStart(e.clientX);
    setIsPaused(true);
  };

  const handlePointerMove = (e) => {
    if (dragStart === null) return;
    setDragOffset(e.clientX - dragStart);
  };

  const handlePointerUp = () => {
    if (dragStart === null) return;

    if (dragOffset < -60) {
      goTo(active + 1);
    } else if (dragOffset > 60) {
      goTo(active - 1);
    }

    setDragStart(null);
    setDragOffset(0);
    setIsPaused(false);
  };

  if (loading) return <TestimonialSkeleton />;

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-secondary/30 py-32 px-6 md:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="08" label="Testimonials" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 mb-16">
          <h2 className="font-display text-6xl md:text-8xl">
            Words from<br />the <span className="text-primary">wild.</span>
          </h2>
          <p className="max-w-md text-muted-foreground text-lg">
            Praise from the brave founders who let us tear their briefs apart and build something sharper.
          </p>
        </div>

        <div
          className="relative"
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative cursor-grab touch-pan-y active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateX(calc(-${active * 100}% - ${dragOffset}px))`,
                }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={t.id || i}
                    className="w-full shrink-0 md:px-12"
                    aria-hidden={i !== active}
                  >
                    <div className="relative overflow-hidden rounded-4xl border border-border bg-card p-8 transition-colors hover:border-primary md:p-16">
                      <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-10 md:p-12">
                        <svg
                          viewBox="0 0 120 100"
                          className="h-28 w-32 fill-primary md:h-40 md:w-48"
                        >
                          <path d="M0 56.4c0-29 19.7-51.8 48-56.4l5.2 14.4C34.8 17.5 22.4 33.6 22.4 50.8c0 1.6.2 3.1.4 4.6h27.6v39.2H0V56.4zm64.8 0c0-29 19.7-51.8 48-56.4l5.2 14.4c-18.4 3.1-30.8 19.2-30.8 36.4 0 1.6.2 3.1.4 4.6h27.6v39.2H64.8V56.4z" />
                        </svg>
                      </div>

                      <div className="mb-8 flex items-center gap-1 md:mb-10">
                        {[...Array(5)].map((_, j) => (
                          <svg
                            key={j}
                            viewBox="0 0 24 24"
                            className="h-5 w-5 fill-primary"
                          >
                            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                          </svg>
                        ))}
                      </div>

                      <p className="relative mb-12 max-w-5xl font-display text-2xl leading-[1.2] md:mb-16 md:text-4xl lg:text-5xl">
                        "{t.quote}"
                      </p>

                      <div className="flex flex-col justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-display text-xl text-primary">
                            {t.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-display text-2xl md:text-3xl">
                              {t.name}
                            </p>

                            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                              {t.role}, {t.company}
                            </p>
                          </div>
                        </div>

                        <span className="w-fit rounded-full bg-primary px-5 py-2.5 font-mono text-sm uppercase tracking-widest text-primary-foreground">
                          {t.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between md:mt-12">
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`relative h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-10 bg-primary"
                      : "w-2 bg-border hover:bg-primary/50"
                  }`}
                >
                  {i === active && (
                    <span className="absolute inset-0 animate-pulse rounded-full bg-primary/30" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(active - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 rotate-180"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </button>

              <button
                onClick={() => goTo(active + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[18vw] leading-none text-foreground/3">
            PRAISE
          </div>
        </div>
      </div>
    </section>
  );
}
