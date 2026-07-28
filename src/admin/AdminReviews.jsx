import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import {
  AdminShell,
  Field,
  ImageUpload,
  inputClass,
} from "./ui";

const empty = {
  rating: "4.9",
  label: "200+ reviews",
  avatars: ["", "", ""],
};

export default function AdminReviews() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("hero_reviews")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    if (data) {
      const avatars = [...(data.avatars || [])];
      while (avatars.length < 3) avatars.push("");
      setForm({
        rating: data.rating || "4.9",
        label: data.label || "200+ reviews",
        avatars: avatars.slice(0, 3),
      });
    }
  };

  useEffect(() => {
    load()
      .catch((err) => toast.error(err.message || "Failed to load reviews"))
      .finally(() => setLoading(false));
  }, []);

  const setAvatar = (index, url) => {
    setForm((f) => {
      const avatars = [...f.avatars];
      avatars[index] = url;
      return { ...f, avatars };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        id: 1,
        rating: form.rating.trim(),
        label: form.label.trim(),
        avatars: form.avatars.filter(Boolean),
      };
      const { error } = await supabase
        .from("hero_reviews")
        .upsert(payload, { onConflict: "id" });
      if (error) throw error;
      toast.success("Hero reviews updated");
      await load();
    } catch (err) {
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell title="Reviews" subtitle="Hero rating badge and avatars.">
        <div className="animate-pulse space-y-4">
          <div className="h-10 rounded-lg bg-white/5" />
          <div className="h-10 rounded-lg bg-white/5" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-40 rounded-xl bg-white/5" />
            <div className="h-40 rounded-xl bg-white/5" />
            <div className="h-40 rounded-xl bg-white/5" />
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="Reviews"
      subtitle="Controls the rating badge in the hero section."
    >
      <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Rating">
            <input
              className={inputClass}
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
              placeholder="4.9"
              required
            />
          </Field>
          <Field label="Label">
            <input
              className={inputClass}
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              placeholder="200+ reviews"
              required
            />
          </Field>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
            Avatar images (up to 3)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <ImageUpload
                key={i}
                label={`Avatar ${i + 1}`}
                value={form.avatars[i] || ""}
                folder="reviews"
                onChange={(url) => setAvatar(i, url)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">
            Preview
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {(form.avatars.filter(Boolean).length
                ? form.avatars.filter(Boolean)
                : [0, 1, 2]
              ).map((item, i) =>
                typeof item === "string" ? (
                  <img
                    key={item + i}
                    src={item}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-[#0a0908] object-cover"
                  />
                ) : (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0a0908]"
                    style={{
                      background: `linear-gradient(${i * 120}deg, #6a3f10, #d0ae00)`,
                    }}
                  />
                ),
              )}
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="w-3 h-3 fill-[#e8cb2f]">
                    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                  </svg>
                ))}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                {form.rating}/5 · {form.label}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#e8cb2f] text-[#111110] px-5 py-3 font-mono text-[11px] uppercase tracking-widest font-semibold disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save reviews"}
        </button>
      </form>
    </AdminShell>
  );
}
