import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const links = [
  { to: "/admin", end: true, label: "Dashboard" },
  { to: "/admin/posts", label: "Posts" },
  { to: "/admin/team", label: "Team" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/reviews", label: "Reviews" },
];

export default function AdminLayout() {
  const { session, isAdmin, loading, configured, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      navigate("/", { replace: true });
      await signOut();
      toast.success("Signed out");
    } catch (err) {
      toast.error(err.message || "Sign out failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0908] text-[#f7f6f1]">
        <p className="font-mono text-xs uppercase tracking-widest text-white/50">
          Checking session…
        </p>
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0908] text-[#f7f6f1] px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-4xl">Admin unavailable</h1>
          <p className="text-white/60">
            Add <code className="text-[#e8cb2f]">VITE_SUPABASE_URL</code> and{" "}
            <code className="text-[#e8cb2f]">VITE_SUPABASE_ANON_KEY</code> to{" "}
            <code className="text-[#e8cb2f]">.env</code>, then restart the dev
            server.
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0908] text-[#f7f6f1] px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-4xl">Access denied</h1>
          <p className="text-white/60">
            Signed in as {session.user?.email}, but this account is not an
            admin.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg bg-[#e8cb2f] text-[#0a0908] px-4 py-2 font-mono text-[11px] uppercase tracking-widest font-semibold"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#f7f6f1]">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-display text-xl tracking-tight">
              h<span className="text-[#e8cb2f]">iii</span>pe
              <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                admin
              </span>
            </span>
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md font-mono text-[11px] uppercase tracking-widest transition-colors ${
                      isActive
                        ? "bg-[#e8cb2f] text-[#0a0908]"
                        : "text-white/50 hover:text-white"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/40 truncate max-w-[160px]">
              {session.user?.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/70 hover:border-[#e8cb2f] hover:text-[#e8cb2f]"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="lg:hidden flex gap-1 overflow-x-auto px-6 pb-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `shrink-0 px-3 py-1.5 rounded-md font-mono text-[11px] uppercase tracking-widest ${
                  isActive
                    ? "bg-[#e8cb2f] text-[#0a0908]"
                    : "text-white/50 border border-white/10"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
