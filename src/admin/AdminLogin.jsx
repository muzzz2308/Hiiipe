import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

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
    <div className="min-h-screen bg-[#0a0908] text-[#f7f6f1] flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-6 border border-white/10 rounded-2xl p-8 bg-[#12100e]"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#e8cb2f] mb-2">
            // studio access
          </p>
          <h1 className="font-display text-4xl">Sign in</h1>
        </div>

        {!configured && (
          <p className="text-sm text-red-300/90">
            Supabase env vars are missing. Copy `.env.example` to `.env` and fill
            in your project keys.
          </p>
        )}

        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:border-[#e8cb2f]"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Password
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:border-[#e8cb2f]"
          />
        </label>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !configured}
          className="w-full rounded-lg bg-[#e8cb2f] text-[#0a0908] py-3 font-mono text-xs uppercase tracking-widest font-semibold disabled:opacity-50"
        >
          {submitting ? "Signing in…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
