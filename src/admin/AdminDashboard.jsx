import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCounts } from "../lib/api";
import { Skeleton } from "../components/ui/skeletons";

const cards = [
  { key: "posts", label: "Posts", to: "/admin/posts" },
  { key: "team", label: "Team", to: "/admin/team" },
  { key: "testimonials", label: "Testimonials", to: "/admin/testimonials" },
  { key: "projects", label: "Projects", to: "/admin/projects" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    getCounts().then(setCounts).catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#e8cb2f] mb-2">
          // overview
        </p>
        <h1 className="font-display text-5xl">Dashboard</h1>
        <p className="mt-3 text-white/50 max-w-xl">
          Manage journal posts, team, testimonials, projects, and hero reviews.
          Changes appear on the public site immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.key}
            to={c.to}
            className="rounded-xl border border-white/10 bg-[#12100e] p-6 hover:border-[#e8cb2f]/50 transition-colors"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              {c.label}
            </p>
            {counts ? (
              <p className="mt-4 font-display text-5xl text-[#e8cb2f]">
                {counts[c.key]}
              </p>
            ) : (
              <Skeleton className="mt-4 h-12 w-16 bg-white/10" />
            )}
          </Link>
        ))}
      </div>

      <Link
        to="/admin/reviews"
        className="block rounded-xl border border-white/10 bg-[#12100e] p-6 hover:border-[#e8cb2f]/50 transition-colors"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Hero reviews
        </p>
        <p className="mt-3 font-display text-3xl">Rating badge & avatars</p>
        <p className="mt-2 text-sm text-white/45">
          Edit the 4.9/5 review summary shown at the top of the homepage.
        </p>
      </Link>
    </div>
  );
}
