import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { useConfirm } from "../components/ui/ConfirmDialog";
import { AdminTableSkeleton } from "../components/ui/skeletons";
import {
  AdminShell,
  ContentBlocksEditor,
  Field,
  ImageUpload,
  Modal,
  RowActions,
  TagInput,
  inputClass,
  slugify,
  textareaClass,
} from "./ui";

const empty = {
  slug: "",
  n: "",
  cat: "",
  date: "",
  read: "",
  title: "",
  excerpt: "",
  img: "",
  authorName: "hiiipe studio",
  authorRole: "",
  tags: [],
  content: [],
};

export default function AdminPosts() {
  const confirm = useConfirm();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const { data, error: err } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) throw err;
    setRows(data || []);
  };

  useEffect(() => {
    load()
      .catch((err) => toast.error(err.message || "Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...empty, content: [{ type: "p", text: "" }] });
    setError("");
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      slug: row.slug || "",
      n: row.n || "",
      cat: row.cat || "",
      date: row.date || "",
      read: row.read || "",
      title: row.title || "",
      excerpt: row.excerpt || "",
      img: row.img || "",
      authorName: row.author?.name || "",
      authorRole: row.author?.role || "",
      tags: row.tags || [],
      content: row.content || [],
    });
    setError("");
  };

  const onDelete = async (id) => {
    const ok = await confirm({
      title: "Delete post?",
      message: "This journal entry will be permanently removed.",
      confirmLabel: "Delete",
    });
    if (!ok) return;
    const { error: err } = await supabase.from("posts").delete().eq("id", id);
    if (err) {
      toast.error(err.message);
      return;
    }
    toast.success("Post deleted");
    await load();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        slug: form.slug.trim() || slugify(form.title),
        n: form.n.trim(),
        cat: form.cat.trim(),
        date: form.date.trim(),
        read: form.read.trim(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        img: form.img.trim(),
        author: { name: form.authorName.trim(), role: form.authorRole.trim() },
        tags: form.tags,
        content: form.content,
      };
      const { error: err } = editingId
        ? await supabase.from("posts").update(payload).eq("id", editingId)
        : await supabase.from("posts").insert(payload);
      if (err) throw err;
      toast.success(editingId ? "Post updated" : "Post created");
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
      title="Posts"
      subtitle="Journal entries shown on Field Notes and the archive."
      actions={
        <button
          type="button"
          onClick={openCreate}
          className="rounded-lg bg-[#e8cb2f] text-[#111110] px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest font-semibold"
        >
          New post
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
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Cat</th>
                <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {r.img && (
                        <img
                          src={r.img}
                          alt=""
                          className="h-12 w-16 rounded object-cover border border-white/10"
                        />
                      )}
                      <div>
                        <p className="font-medium">{r.title}</p>
                        <p className="font-mono text-[10px] text-white/40">{r.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-white/60">
                    {r.cat}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-white/60">
                    {r.date}
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
                    No posts yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {form && (
        <Modal
          title={editingId ? "Edit post" : "New post"}
          onClose={() => setForm(null)}
          onSubmit={onSubmit}
          saving={saving}
        >
          {error && <p className="text-sm text-red-300">{error}</p>}
          <ImageUpload
            label="Cover image"
            value={form.img}
            folder="posts"
            onChange={(url) => setForm((f) => ({ ...f, img: url }))}
          />
          <Field label="Title">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({
                  ...f,
                  title,
                  slug: editingId ? f.slug : slugify(title),
                }));
              }}
              required
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="URL slug">
              <input className={inputClass} value={form.slug} onChange={set("slug")} required />
            </Field>
            <Field label="Category">
              <input className={inputClass} value={form.cat} onChange={set("cat")} />
            </Field>
            <Field label="Display number">
              <input className={inputClass} value={form.n} onChange={set("n")} placeholder="01" />
            </Field>
            <Field label="Date">
              <input className={inputClass} value={form.date} onChange={set("date")} placeholder="Jul 12, 2026" />
            </Field>
            <Field label="Read time">
              <input className={inputClass} value={form.read} onChange={set("read")} placeholder="6 min" />
            </Field>
            <Field label="Author name">
              <input className={inputClass} value={form.authorName} onChange={set("authorName")} />
            </Field>
            <Field label="Author role">
              <input className={inputClass} value={form.authorRole} onChange={set("authorRole")} />
            </Field>
          </div>
          <TagInput
            label="Tags"
            value={form.tags}
            onChange={(tags) => setForm((f) => ({ ...f, tags }))}
            placeholder="Add a tag and press Enter"
          />
          <Field label="Excerpt">
            <textarea className={textareaClass} value={form.excerpt} onChange={set("excerpt")} />
          </Field>
          <ContentBlocksEditor
            value={form.content}
            onChange={(content) => setForm((f) => ({ ...f, content }))}
          />
        </Modal>
      )}
    </AdminShell>
  );
}
