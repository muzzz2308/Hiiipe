import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const AuthContext = createContext(null);

async function checkIsAdmin(user) {
  if (!user?.email || !supabase) return false;
  const { data, error } = await supabase.rpc("is_admin");
  if (error) {
    // Fallback if RPC not migrated yet: allowlist email client-side only as UX gate
    console.warn("[auth] is_admin rpc failed", error.message);
    return (
      user.email.toLowerCase() === "murtazach1235@gmail.com".toLowerCase()
    );
  }
  return Boolean(data);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    const applySession = async (next) => {
      setSession(next);
      if (!next?.user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const admin = await checkIsAdmin(next.user);
      if (!mounted) return;
      setIsAdmin(admin);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      applySession(data.session ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setLoading(true);
      applySession(next);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      isAdmin,
      loading,
      configured: isSupabaseConfigured,
      async signIn(email, password) {
        if (!supabase) throw new Error("Supabase is not configured");
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        const admin = await checkIsAdmin(data.user);
        if (!admin) {
          await supabase.auth.signOut();
          throw new Error("This account is not an admin.");
        }
      },
      async signOut() {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
    }),
    [session, isAdmin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
