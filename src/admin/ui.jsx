import { useRef, useState } from "react";
import { uploadMedia } from "../lib/api";

export function Field({ label, hint, children }) {
  return (
    <div className="block space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          {label}
        </span>
        {hint && (
          <span className="font-mono text-[10px] text-white/25">{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-[#f7f6f1] placeholder:text-white/25 focus:outline-none focus:border-[#e8cb2f]/70";

export const textareaClass = `${inputClass} min-h-28`;

export function ImageUpload({ label, value, folder, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const url = await uploadMedia(file, folder);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    await uploadFile(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          uploadFile(e.dataTransfer.files?.[0]);
        }}
        className={`relative overflow-hidden rounded-xl border border-dashed transition-colors ${
          dragOver
            ? "border-[#e8cb2f] bg-[#e8cb2f]/10"
            : "border-white/15 bg-white/[0.02]"
        }`}
      >
        {value ? (
          <div className="relative group">
            <img
              src={value}
              alt=""
              className="h-48 w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg bg-[#e8cb2f] text-[#111110] px-3 py-2 font-mono text-[10px] uppercase tracking-widest font-semibold"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-lg border border-white/30 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex w-full flex-col items-center justify-center gap-3 px-6 py-12 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[#e8cb2f]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/70">
              {uploading ? "Uploading…" : "Drop image or click to upload"}
            </span>
            <span className="text-xs text-white/35">PNG, JPG, WEBP</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={onFile}
        />
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
    </div>
  );
}

export function TagInput({ label, value = [], onChange, placeholder = "Add item and press Enter" }) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const next = draft.trim();
    if (!next || value.includes(next)) {
      setDraft("");
      return;
    }
    onChange([...value, next]);
    setDraft("");
  };

  return (
    <Field label={label}>
      <div className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 min-h-12">
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-[#e8cb2f]/15 text-[#e8cb2f] px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((t) => t !== tag))}
                className="text-[#e8cb2f]/70 hover:text-[#e8cb2f]"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          onBlur={add}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm placeholder:text-white/25 focus:outline-none"
        />
      </div>
    </Field>
  );
}

export function ContentBlocksEditor({ value = [], onChange }) {
  const updateBlock = (index, patch) => {
    onChange(value.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  };

  const removeBlock = (index) => onChange(value.filter((_, i) => i !== index));

  const moveBlock = (index, dir) => {
    const next = [...value];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addBlock = (type) => {
    if (type === "list") {
      onChange([...value, { type: "list", items: [""] }]);
      return;
    }
    onChange([...value, { type, text: "" }]);
  };

  return (
    <Field label="Article content" hint={`${value.length} blocks`}>
      <div className="space-y-3">
        {value.map((block, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#e8cb2f]">
                {block.type === "p"
                  ? "Paragraph"
                  : block.type === "h2"
                    ? "Heading"
                    : block.type === "quote"
                      ? "Quote"
                      : "List"}
              </span>
              <div className="flex gap-1">
                <button type="button" onClick={() => moveBlock(index, -1)} className="px-2 py-1 text-white/40 hover:text-white text-xs">↑</button>
                <button type="button" onClick={() => moveBlock(index, 1)} className="px-2 py-1 text-white/40 hover:text-white text-xs">↓</button>
                <button type="button" onClick={() => removeBlock(index)} className="px-2 py-1 text-red-300/70 hover:text-red-300 text-xs">Remove</button>
              </div>
            </div>

            {block.type === "list" ? (
              <div className="space-y-2">
                {(block.items || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={item}
                      onChange={(e) => {
                        const items = [...(block.items || [])];
                        items[itemIndex] = e.target.value;
                        updateBlock(index, { items });
                      }}
                      placeholder={`Item ${itemIndex + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const items = (block.items || []).filter((_, i) => i !== itemIndex);
                        updateBlock(index, { items });
                      }}
                      className="px-2 text-white/40 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => updateBlock(index, { items: [...(block.items || []), ""] })}
                  className="font-mono text-[10px] uppercase tracking-widest text-[#e8cb2f]"
                >
                  + Add list item
                </button>
              </div>
            ) : (
              <textarea
                className={textareaClass}
                value={block.text || ""}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
                placeholder={
                  block.type === "h2"
                    ? "Heading text"
                    : block.type === "quote"
                      ? "Quote text"
                      : "Paragraph text"
                }
              />
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-2 pt-1">
          {[
            ["p", "Paragraph"],
            ["h2", "Heading"],
            ["quote", "Quote"],
            ["list", "List"],
          ].map(([type, label]) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:border-[#e8cb2f] hover:text-[#e8cb2f]"
            >
              + {label}
            </button>
          ))}
        </div>
      </div>
    </Field>
  );
}

export function SkillsEditor({ value = [], onChange }) {
  const update = (index, patch) => {
    onChange(value.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  return (
    <Field label="Skills" hint="0–100">
      <div className="space-y-3">
        {value.map((skill, index) => (
          <div key={index} className="grid grid-cols-[1fr_120px_auto] gap-2 items-center">
            <input
              className={inputClass}
              value={skill.label || ""}
              onChange={(e) => update(index, { label: e.target.value })}
              placeholder="Skill name"
            />
            <input
              type="number"
              min="0"
              max="100"
              className={inputClass}
              value={skill.level ?? 0}
              onChange={(e) => update(index, { level: Number(e.target.value) || 0 })}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              className="px-2 text-white/40 hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { label: "", level: 80 }])}
          className="font-mono text-[10px] uppercase tracking-widest text-[#e8cb2f]"
        >
          + Add skill
        </button>
      </div>
    </Field>
  );
}

export function MemberProjectsEditor({ value = [], onChange }) {
  const update = (index, patch) => {
    onChange(value.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  };

  return (
    <Field label="Featured projects">
      <div className="space-y-3">
        {value.map((project, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[1.4fr_0.7fr_0.8fr_auto] gap-2">
            <input
              className={inputClass}
              value={project.name || ""}
              onChange={(e) => update(index, { name: e.target.value })}
              placeholder="Project name"
            />
            <input
              className={inputClass}
              value={project.year || ""}
              onChange={(e) => update(index, { year: e.target.value })}
              placeholder="Year"
            />
            <input
              className={inputClass}
              value={project.tag || ""}
              onChange={(e) => update(index, { tag: e.target.value })}
              placeholder="Tag"
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              className="px-2 text-white/40 hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { name: "", year: "", tag: "" }])}
          className="font-mono text-[10px] uppercase tracking-widest text-[#e8cb2f]"
        >
          + Add project
        </button>
      </div>
    </Field>
  );
}

export function AdminShell({ title, subtitle, actions, children }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#e8cb2f] mb-2">
            // manage
          </p>
          <h1 className="font-display text-5xl">{title}</h1>
          {subtitle && <p className="mt-2 text-white/50">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

export function RowActions({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest hover:border-[#e8cb2f]"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="rounded-md border border-red-400/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-red-300 hover:border-red-300"
      >
        Delete
      </button>
    </div>
  );
}

export function Modal({ title, onClose, children, onSubmit, saving }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4">
      <form
        onSubmit={onSubmit}
        className="admin-scroll w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#12100e] p-6 space-y-5"
      >
        <div className="flex items-start justify-between gap-4 sticky top-0 bg-[#12100e] pb-2 z-10">
          <h2 className="font-display text-3xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white"
          >
            Close
          </button>
        </div>
        {children}
        <div className="flex justify-end gap-3 pt-2 sticky bottom-0 bg-[#12100e]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#e8cb2f] text-[#111110] px-4 py-2 font-mono text-[11px] uppercase tracking-widest font-semibold disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
