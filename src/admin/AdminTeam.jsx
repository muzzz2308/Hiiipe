import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { useConfirm } from "../components/ui/ConfirmDialog";
import { AdminTableSkeleton } from "../components/ui/skeletons";
import {
  AdminShell,
  Field,
  ImageUpload,
  MemberProjectsEditor,
  Modal,
  RowActions,
  SkillsEditor,
  TagInput,
  inputClass,
  slugify,
  textareaClass,
} from "./ui";

const empty = {
  slug: "",
  name: "",
  role: "",
  bio: "",
  photo: "",
  gradient: "180",
  years: "",
  based: "",
  quote: "",
  orbit: [],
  skills: [],
  toolkit: [],
  projects: [],
  email: "",
  handle: "",
  sort_order: "0",
};

export default function AdminTeam() {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const { data, error: err } = await supabase
      .from("team_members")
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
    setForm({
      ...empty,
      skills: [{ label: "", level: 80 }],
      projects: [{ name: "", year: "", tag: "" }],
    });
    setError("");
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      slug: row.slug || "",
      name: row.name || "",
      role: row.role || "",
      bio: row.bio || "",
      photo: row.photo || "",
      gradient: String(row.gradient ?? 180),
      years: row.years || "",
      based: row.based || "",
      quote: row.quote || "",
      orbit: row.orbit || [],
      skills: row.skills || [],
      toolkit: row.toolkit || [],
      projects: row.projects || [],
      email: row.contact?.email || "",
      handle: row.contact?.handle || "",
      sort_order: String(row.sort_order ?? 0),
    });
    setError("");
  };

  const onDelete = async (id) => {
    const ok = await confirm({
      title: "Delete team member?",
      message: "This person will be removed from the public team pages.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    const { error: err } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id);
    if (err) {
      toast.error(err.message);
      return;
    }
    toast.success("Team member deleted");
    await load();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        slug: form.slug.trim() || slugify(form.name),
        name: form.name.trim(),
        role: form.role.trim(),
        bio: form.bio.trim(),
        photo: form.photo.trim(),
        gradient: Number(form.gradient) || 180,
        years: form.years.trim(),
        based: form.based.trim(),
        quote: form.quote.trim(),
        orbit: form.orbit,
        skills: form.skills.filter((s) => s.label?.trim()),
        toolkit: form.toolkit,
        projects: form.projects.filter((p) => p.name?.trim()),
        contact: { email: form.email.trim(), handle: form.handle.trim() },
        sort_order: Number(form.sort_order) || 0,
      };
      const { error: err } = editingId
        ? await supabase.from("team_members").update(payload).eq("id", editingId)
        : await supabase.from("team_members").insert(payload);
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
      title="Team"
      subtitle="People shown on the Team section and portfolio pages."
      actions={
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-[#e8cb2f] text-[#111110] px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest font-semibold"
        >
          New member
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
              <th className="px-4 py-3 hidden md:table-cell">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-4 py-3 flex items-center gap-3">
                  {r.photo && (
                    <img
                      src={r.photo}
                      alt=""
                      className="h-10 w-10 rounded object-cover border border-white/10"
                    />
                  )}
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="font-mono text-[10px] text-white/40">{r.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-white/60">
                  {r.role}
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
                <td colSpan={3} className="px-4 py-10 text-center text-white/40">
                  No team members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}

      {form && (
        <Modal
          title={editingId ? "Edit member" : "New member"}
          onClose={() => setForm(null)}
          onSubmit={onSubmit}
          saving={saving}
        >
          {error && <p className="text-sm text-red-300">{error}</p>}
          <ImageUpload
            label="Photo"
            value={form.photo}
            folder="team"
            onChange={(url) => setForm((f) => ({ ...f, photo: url }))}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm((f) => ({
                    ...f,
                    name,
                    slug: editingId ? f.slug : slugify(name),
                  }));
                }}
                required
              />
            </Field>
            <Field label="Role">
              <input className={inputClass} value={form.role} onChange={set("role")} />
            </Field>
            <Field label="URL slug">
              <input className={inputClass} value={form.slug} onChange={set("slug")} required />
            </Field>
            <Field label="Sort order">
              <input className={inputClass} type="number" value={form.sort_order} onChange={set("sort_order")} />
            </Field>
            <Field label="Years experience">
              <input className={inputClass} value={form.years} onChange={set("years")} placeholder="2 yrs" />
            </Field>
            <Field label="Based in">
              <input className={inputClass} value={form.based} onChange={set("based")} />
            </Field>
            <Field label="Email">
              <input className={inputClass} type="email" value={form.email} onChange={set("email")} />
            </Field>
            <Field label="Handle">
              <input className={inputClass} value={form.handle} onChange={set("handle")} placeholder="@handle" />
            </Field>
          </div>
          <Field label="Bio">
            <textarea className={textareaClass} value={form.bio} onChange={set("bio")} />
          </Field>
          <Field label="Quote">
            <textarea className={textareaClass} value={form.quote} onChange={set("quote")} />
          </Field>
          <TagInput
            label="Orbit labels"
            value={form.orbit}
            onChange={(orbit) => setForm((f) => ({ ...f, orbit }))}
          />
          <TagInput
            label="Toolkit"
            value={form.toolkit}
            onChange={(toolkit) => setForm((f) => ({ ...f, toolkit }))}
          />
          <SkillsEditor
            value={form.skills}
            onChange={(skills) => setForm((f) => ({ ...f, skills }))}
          />
          <MemberProjectsEditor
            value={form.projects}
            onChange={(projects) => setForm((f) => ({ ...f, projects }))}
          />
        </Modal>
      )}
    </AdminShell>
  );
}
