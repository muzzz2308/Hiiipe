import { useEffect, useState } from "react";
import heroBg from "/hero-bg.jpg";
import ArrowIcon from "../ui/ArrowIcon";
import { getHeroReviews } from "../../lib/api";
import { HeroSkeleton } from "../ui/skeletons";

export default function Hero() {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeroReviews()
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <HeroSkeleton />;

  const avatars = reviews?.avatars?.filter(Boolean) || [];
  const rating = reviews?.rating || "4.9";
  const label = reviews?.label || "200+ reviews";

  return (
    <section className="relative min-h-screen pt-32 pb-10 px-6 md:px-10">
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-[1600px] relative">
        <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--primary) opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-(--primary)" />
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-(--muted-foreground)">
              Available for new projects — Limited availability
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {(avatars.length ? avatars : [0, 1, 2]).map((item, i) =>
                typeof item === "string" ? (
                  <img
                    key={item + i}
                    src={item}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-(--background) object-cover"
                  />
                ) : (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-(--background)"
                    style={{
                      background: `linear-gradient(${i * 120}deg, #6a3f10, #d0ae00)`,
                    }}
                  />
                ),
              )}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="w-3 h-3 fill-(--primary)"
                  >
                    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                  </svg>
                ))}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-(--muted-foreground)">
                {rating}/5 · {label}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 lg:col-span-7 flex flex-col">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-mono text-xs text-(--muted-foreground)">
                [ 01 ]
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-(--muted-foreground)">
                Iterate / Integrate / Impact
              </span>
            </div>
            <h1 className="font-display text-[19vw] lg:text-[13vw] leading-[0.82] text-(--foreground)">
              <span className="block">Design</span>
              <span className="block text-(--primary)">Without</span>
              <span className="block">Limits.</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-(--primary) text-(--primary-foreground) px-7 py-4 font-semibold"
              >
                <span>Start a project</span>
                <span className="w-8 h-8 rounded-full bg-(--primary-foreground) text-(--primary) flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowIcon />
                </span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-3 rounded-full border border-(--border) px-7 py-4 font-semibold hover:bg-(--secondary) transition-colors"
              >
                <span>See our work</span>
              </a>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-(--border) h-125 lg:h-160 group">
              <img
                src={heroBg}
                alt="hiiipe creative direction"
                width={1600}
                height={1200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--background) via-transparent to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-(--background)/70 backdrop-blur px-2 py-1 rounded">
                  ° 001 / studio
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-(--primary) text-(--primary-foreground) px-2 py-1 rounded">
                  Est. 2019
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-2xl leading-tight">
                  We paint pixels
                  <br />
                  with <span className="text-(--primary)">intent.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
