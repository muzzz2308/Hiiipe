import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import ArrowIcon from "./ArrowIcon";
import FancySelect from "./FancySelect";
import { isContactFormConfigured, sendContactEmail } from "../../lib/contactForm";

const services = [
  "Brand Identity",
  "Web / Product",
  "Motion / 3D",
  "Marketing",
  "Something else",
];

const empty = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const fieldClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

export default function ContactModal({ open, onClose }) {
  const titleId = useId();
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setClosing(false);
      setVisible(true);
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const requestClose = () => {
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setForm(empty);
      onClose?.();
    }, 220);
  };

  if (!visible && !open) return null;

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const honeypot = e.currentTarget.elements.namedItem("_gotcha")?.value ?? "";

    setSubmitting(true);
    try {
      await sendContactEmail({
        name: form.name,
        email: form.email,
        company: form.company,
        service: form.service,
        message: form.message,
        honeypot,
      });
      toast.success("Message sent — we'll get back within 24 hours.");
      requestClose();
    } catch (err) {
      toast.error(err.message || "Could not send message.");
    } finally {
      setSubmitting(false);
    }
  };

  const animOut = closing;

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className={`absolute inset-0 bg-black/70 backdrop-blur-[2px] ${
          animOut
            ? "animate-[fadeOut_220ms_ease-in_forwards]"
            : "animate-[fadeIn_220ms_ease-out]"
        }`}
        onClick={requestClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl ${
          animOut
            ? "animate-[popOut_220ms_cubic-bezier(0.4,0,1,1)_forwards]"
            : "animate-[popIn_280ms_cubic-bezier(0.22,1,0.36,1)]"
        }`}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
              // let&apos;s talk
            </p>
            <h2
              id={titleId}
              className="font-display text-4xl sm:text-5xl leading-[0.95]"
            >
              Write us at
              <br />
              <span className="text-primary">info@hiiipe.com</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="rounded-full border border-border min-h-11 min-w-11 h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {!isContactFormConfigured && (
          <p className="mb-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary/90">
            Form is ready. Add your Web3Forms access key to{" "}
            <code className="font-mono">.env</code> to start delivering mail.
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
            className="absolute -left-[9999px] opacity-0 h-0 w-0 pointer-events-none"
            aria-hidden
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Name *
              </span>
              <input
                required
                maxLength={120}
                value={form.name}
                onChange={set("name")}
                className={fieldClass}
                placeholder="Your name"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Email *
              </span>
              <input
                required
                type="email"
                maxLength={200}
                value={form.email}
                onChange={set("email")}
                className={fieldClass}
                placeholder="you@company.com"
              />
            </label>
            <label className="block space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Company
              </span>
              <input
                maxLength={200}
                value={form.company}
                onChange={set("company")}
                className={fieldClass}
                placeholder="Studio / brand"
              />
            </label>
            <FancySelect
              label="Service"
              value={form.service}
              options={services}
              placeholder="What do you need?"
              onChange={(service) => setForm((f) => ({ ...f, service }))}
            />
          </div>

          <label className="block space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Message *
            </span>
            <textarea
              required
              maxLength={5000}
              rows={5}
              value={form.message}
              onChange={set("message")}
              className={`${fieldClass} min-h-32 resize-y`}
              placeholder="Tell us about the project…"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={requestClose}
              className="rounded-full border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold disabled:opacity-60"
            >
              <span>{submitting ? "Sending…" : "Send message"}</span>
              <span className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
