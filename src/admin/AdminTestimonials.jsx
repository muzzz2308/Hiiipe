import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { useConfirm } from "../components/ui/ConfirmDialog";
import { AdminTableSkeleton } from "../components/ui/skeletons";
import {
  AdminShell,
  Field,
  Modal,
  RowActions,
  inputClass,
  textareaClass,
} from "./ui";

const empty = {
  quote: "",
  name: "",
  role: "",
  company: "",
  metric: "",
  sort_order: "0",
};

export default function AdminTestimonials() {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const { data, error: err } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });
    if (err) throw err;
    setRows(data || []);
  };

  useEffect(() => {
    load()
      .catch((err) => toast.error(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...empty });
    setError("");
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      quote: row.quote || "",
      name: row.name || "",
      role: row.role || "",
      company: row.company || "",
      metric: row.metric || "",
      sort_order: String(row.sort_order ?? 0),
    });
    setError("");
  };

  const onDelete = async (id) => {
    const ok = await confirm({
      title: "Delete testimonial?",
      message: "This quote will be removed from the site.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    const { error: err } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);
    if (err) {
      toast.error(err.message);
      return;
    }
    toast.success("Testimonial deleted");
    await load();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        quote: form.quote.trim(),
        name: form.name.trim(),
        role: form.role.trim(),
        company: form.company.trim(),
        metric: form.metric.trim(),
        sort_order: Number(form.sort_order) || 0,
      };
      const { error: err } = editingId
        ? await supabase.from("testimonials").update(payload).eq("id", editingId)
        : await supabase.from("testimonials").insert(payload);
      if (err) throw err;
      toast.success("Saved successfully");
      setForm(null);
      await load();
    } catch (err) {
      setError(err.message || "Save failed");
      toast.error(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target?.value ?? e }));

  return (
    <AdminShell
      title="Testimonials"
      subtitle="Quotes shown in the testimonials carousel."
      actions={
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-[#c4a574] text-[#0a0908] px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest font-semibold"
        >
          New testimonial
        </button>
      }
    >
      {loading ? (
        <AdminTableSkeleton />
      ) : (
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 hidden md:table-cell">Company</th>
              <th className="px-4 py-3 hidden sm:table-cell">Metric</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <p className="font-medium">{r.name}</p>
                  <p className="text-white/40 text-xs line-clamp-1">{r.quote}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-white/60">
                  {r.company}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-white/60">
                  {r.metric}
                </td>
                <td className="px-4 py-3">
                  <RowActions
                    onEdit={() => openEdit(r)}
                    onDelete={() => onDelete(r.id)}
                  />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-white/40">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}

      {form && (
        <Modal
          title={editingId ? "Edit testimonial" : "New testimonial"}
          onClose={() => setForm(null)}
          onSubmit={onSubmit}
          saving={saving}
        >
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Field label="Quote">
            <textarea className={textareaClass} value={form.quote} onChange={set("quote")} required />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input className={inputClass} value={form.name} onChange={set("name")} required />
            </Field>
            <Field label="Role">
              <input className={inputClass} value={form.role} onChange={set("role")} />
            </Field>
            <Field label="Company">
              <input className={inputClass} value={form.company} onChange={set("company")} />
            </Field>
            <Field label="Metric">
              <input className={inputClass} value={form.metric} onChange={set("metric")} />
            </Field>
            <Field label="Sort order">
              <input className={inputClass} type="number" value={form.sort_order} onChange={set("sort_order")} />
            </Field>
          </div>
        </Modal>
      )}
    </AdminShell>
  );
}
