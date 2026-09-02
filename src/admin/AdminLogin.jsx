import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "../components/ui/Logo";
import { useAuth } from "./AuthContext";
import { btnPrimary, inputClass } from "./ui";

export default function AdminLogin() {
  const { session, loading, configured, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      toast.success("Welcome back");
      navigate("/admin", { replace: true });
    } catch (err) {
      const message = err.message || "Sign in failed";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="h-[72px] flex items-center px-6 border-b border-border/60">
        <Logo />
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm space-y-6 border border-border rounded-3xl p-8 bg-card/40"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              HIIIPE Admin
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage site content and media.
            </p>
          </div>

          {!configured && (
            <p className="text-sm text-red-300/90 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
              Supabase env vars are missing. Copy `.env.example` to `.env.local` and
              add your project keys.
            </p>
          )}

          <label className="block space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            disabled={submitting || !configured}
            className={`w-full ${btnPrimary} py-3.5`}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              ← Back to site
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
