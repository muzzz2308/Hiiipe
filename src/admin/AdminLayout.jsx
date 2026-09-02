import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "../components/ui/Logo";
import { useAuth } from "./AuthContext";
import { btnPrimary } from "./ui";

const links = [
  { to: "/admin", end: true, label: "Dashboard" },
  { to: "/admin/posts", label: "Posts" },
  { to: "/admin/team", label: "Team" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/reviews", label: "Reviews" },
];

function NavItem({ to, end, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `block border-l-2 py-2.5 pl-4 -ml-px text-sm font-medium transition-colors ${
          isActive
            ? "border-primary text-foreground"
            : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

function AdminMobileNav({ open, onClose, email, onSignOut }) {
  const { pathname } = useLocation();
  const isActive = (to, end) =>
    end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div
      className={`fixed inset-0 z-[100] lg:hidden transition-[visibility,opacity] duration-300 ${
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className={`absolute top-0 right-0 flex h-full w-full max-w-[min(100vw,320px)] flex-col border-l border-border bg-background transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border/60 px-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Admin
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground min-h-11 px-2"
          >
            Close
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={`block border-l-2 py-3 pl-4 -ml-px text-[15px] font-medium transition-colors ${
                isActive(l.to, l.end)
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 border-t border-border/60 px-6 py-6 space-y-4">
          <p className="text-xs text-muted-foreground truncate">{email}</p>
          <Link
            to="/"
            onClick={onClose}
            className="block text-sm text-foreground hover:text-primary transition-colors"
          >
            View public site →
          </Link>
          <button
            type="button"
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="w-full rounded-full border border-border py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>
    </div>
  );
}

function StatusScreen({ title, children, action }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-md w-full text-center space-y-5">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
        {action}
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { session, isAdmin, loading, configured, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

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
      <StatusScreen title="Loading">
        <p className="font-mono text-xs uppercase tracking-widest">Checking session…</p>
      </StatusScreen>
    );
  }

  if (!configured) {
    return (
      <StatusScreen title="Admin unavailable">
        <p>
          Add <code className="text-primary">VITE_SUPABASE_URL</code> and{" "}
          <code className="text-primary">VITE_SUPABASE_ANON_KEY</code> to{" "}
          <code className="text-primary">.env</code>, then restart the dev server.
        </p>
      </StatusScreen>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <StatusScreen
        title="Access denied"
        action={
          <button type="button" onClick={handleSignOut} className={btnPrimary}>
            Sign out
          </button>
        }
      >
        <p>
          Signed in as <span className="text-foreground">{session.user?.email}</span>, but
          this account is not an admin.
        </p>
      </StatusScreen>
    );
  }

  const email = session.user?.email;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-border/60 bg-card/20">
        <div className="h-[72px] flex items-center px-6 border-b border-border/60">
          <div className="flex items-baseline gap-2">
            <Logo to="/admin" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Admin
            </span>
          </div>
        </div>

        <nav aria-label="Admin" className="flex-1 py-6 px-5 space-y-1">
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
        </nav>

        <div className="p-5 border-t border-border/60 space-y-4">
          <p className="text-xs text-muted-foreground truncate" title={email}>
            {email}
          </p>
          <Link
            to="/"
            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View public site →
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-full border border-border py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden flex h-[72px] shrink-0 items-center justify-between border-b border-border/60 bg-background/95 backdrop-blur-xl px-6">
          <Logo to="/admin" />
          <button
            type="button"
            className="flex items-center gap-3 min-h-11 text-foreground hover:text-primary transition-colors"
            aria-label="Open admin menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Menu</span>
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="block h-px w-[18px] bg-current" />
              <span className="block h-px w-[18px] bg-current" />
            </span>
          </button>
        </header>

        <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>

      <AdminMobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        email={email}
        onSignOut={handleSignOut}
      />
    </div>
  );
}
