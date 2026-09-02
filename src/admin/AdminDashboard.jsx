import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCounts } from "../lib/api";
import { Skeleton } from "../components/ui/skeletons";

const cards = [
  { key: "posts", label: "Posts", to: "/admin/posts", desc: "Journal entries" },
  { key: "team", label: "Team", to: "/admin/team", desc: "Team members" },
  { key: "testimonials", label: "Testimonials", to: "/admin/testimonials", desc: "Client quotes" },
  { key: "projects", label: "Projects", to: "/admin/projects", desc: "Portfolio work" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    getCounts().then(setCounts).catch(console.error);
  }, []);

  return (
    <div className="space-y-10">
      <div className="pb-6 border-b border-border/60">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">
          Manage journal posts, team, testimonials, projects, and hero reviews.
          Changes appear on the public site immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.key}
            to={c.to}
            className="group rounded-2xl border border-border bg-card/30 p-6 hover:border-primary/40 hover:bg-card/50 transition-colors"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {c.label}
            </p>
            {counts ? (
              <p className="mt-4 text-4xl font-semibold tracking-tight text-primary tabular-nums">
                {counts[c.key]}
              </p>
            ) : (
              <Skeleton className="mt-4 h-10 w-14 bg-muted/80" />
            )}
            <p className="mt-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
              {c.desc}
            </p>
          </Link>
        ))}
      </div>

      <Link
        to="/admin/reviews"
        className="group block rounded-2xl border border-border bg-card/30 p-6 hover:border-primary/40 hover:bg-card/50 transition-colors"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Hero reviews
        </p>
        <p className="mt-3 text-lg font-medium tracking-tight">Rating badge & avatars</p>
        <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
          Edit the review summary shown at the top of the homepage.
        </p>
      </Link>
    </div>
  );
}
