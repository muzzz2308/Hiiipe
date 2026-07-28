import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { useConfirm } from "../components/ui/ConfirmDialog";
import { AdminTableSkeleton } from "../components/ui/skeletons";
import {
  AdminShell,
  Field,
  ImageUpload,
  Modal,
  RowActions,
  inputClass,
} from "./ui";

const empty = {
  title: "",
  cat: "",
  year: "",
  img: "",
  url: "",
  sort_order: "0",
};

export default function AdminProjects() {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const { data, error: err } = await supabase
      .from("projects")
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
      title: row.title || "",
      cat: row.cat || "",
      year: row.year || "",
      img: row.img || "",
      url: row.url || "",
      sort_order: String(row.sort_order ?? 0),
    });
    setError("");
  };

  const onDelete = async (id) => {
    const ok = await confirm({
      title: "Delete project?",
      message: "This masterpiece will be removed from Selected Work.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    const { error: err } = await supabase.from("projects").delete().eq("id", id);
    if (err) {
      toast.error(err.message);
      return;
    }
    toast.success("Project deleted");
    await load();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title.trim(),
        cat: form.cat.trim(),
        year: form.year.trim(),
        img: form.img.trim(),
        url: form.url.trim(),
        sort_order: Number(form.sort_order) || 0,
      };
      const { error: err } = editingId
        ? await supabase.from("projects").update(payload).eq("id", editingId)
        : await supabase.from("projects").insert(payload);
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
      title="Projects"
      subtitle="Masterpieces shown in Selected Work."
      actions={
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-[#e8cb2f] text-[#111110] px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest font-semibold"
        >
          New project
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
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3 hidden md:table-cell">Category</th>
              <th className="px-4 py-3 hidden lg:table-cell">URL</th>
              <th className="px-4 py-3 hidden sm:table-cell">Year</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-4 py-3 flex items-center gap-3">
                  {r.img && (
                    <img
                      src={r.img}
                      alt=""
                      className="h-12 w-16 rounded object-cover border border-white/10"
                    />
                  )}
                  <p className="font-medium">{r.title}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-white/60">
                  {r.cat}
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-white/40 font-mono text-[11px] truncate max-w-[180px]">
                  {r.url || "—"}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-white/60">
                  {r.year}
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
                <td colSpan={5} className="px-4 py-10 text-center text-white/40">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}

      {form && (
        <Modal
          title={editingId ? "Edit project" : "New project"}
          onClose={() => setForm(null)}
          onSubmit={onSubmit}
          saving={saving}
        >
          {error && <p className="text-sm text-red-300">{error}</p>}
          <ImageUpload
            label="Cover image"
            value={form.img}
            folder="projects"
            onChange={(url) => setForm((f) => ({ ...f, img: url }))}
          />
          <Field label="Title">
            <input className={inputClass} value={form.title} onChange={set("title")} required />
          </Field>
          <Field label="Project URL">
            <input
              className={inputClass}
              type="url"
              value={form.url}
              onChange={set("url")}
              placeholder="https://example.com"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Category">
              <input className={inputClass} value={form.cat} onChange={set("cat")} />
            </Field>
            <Field label="Year">
              <input className={inputClass} value={form.year} onChange={set("year")} />
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
