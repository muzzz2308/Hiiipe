import { useEffect, useState } from "react";
import { getTeam } from "../../lib/api";
import ArrowIcon from "../ui/ArrowIcon";
import SectionLabel from "../ui/SectionLabel";
import { Link } from "react-router-dom";
import { TeamSkeleton } from "../ui/skeletons";

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam()
      .then(setTeam)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <TeamSkeleton />;

  return (
    <section id="team" className="relative py-32 px-6 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="07" label="Team" />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 mb-16">
          <h2 className="font-display text-6xl md:text-8xl">
            The minds
            <br />
            behind the <span className="text-primary">madness.</span>
          </h2>
          <p className="max-w-md text-muted-foreground text-lg">
            Six people. One shared allergy to boring work. We hire for taste,
            then sharpen the tools together.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {team.map((m) => (
            <Link
              key={m.slug}
              to={`/team/${m.slug}`}
              className="group relative bg-background p-8 md:p-10 hover:bg-card transition-colors block"
            >
              <div className="flex items-start justify-between mb-8">
                <div
                  className="w-40 h-50 rounded-md border-2 border-background shrink-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${m.photo})`,
                  }}
                />
                <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                  <ArrowIcon />
                </span>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                  {m.role}
                </p>
                <h3 className="font-display text-4xl mb-4">{m.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
