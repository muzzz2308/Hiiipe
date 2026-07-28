import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import ArrowIcon from "./ArrowIcon";

const PHONE_DISPLAY = "+92 313 175 3997";
const PHONE_TEL = "+923131753997";

export default function BookCallModal({ open, onClose }) {
  const titleId = useId();
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
      onClose?.();
    }, 220);
  };

  if (!visible && !open) return null;

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_TEL);
      toast.success("Number copied");
    } catch {
      toast.error("Could not copy number");
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
        className={`relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl ${
          animOut
            ? "animate-[popOut_220ms_cubic-bezier(0.4,0,1,1)_forwards]"
            : "animate-[popIn_280ms_cubic-bezier(0.22,1,0.36,1)]"
        }`}
      >
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/15 blur-[80px] pointer-events-none" />

        <div className="relative flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
              // 20-min call
            </p>
            <h2
              id={titleId}
              className="font-display text-4xl sm:text-5xl leading-[0.95]"
            >
              Let&apos;s
              <br />
              <span className="text-primary">talk.</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="rounded-full border border-border w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="relative rounded-2xl border border-border bg-background/50 px-5 py-6 mb-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
            Studio line
          </p>
          <p className="font-display text-3xl sm:text-4xl tracking-tight mb-2">
            {PHONE_DISPLAY}
          </p>
          <p className="text-sm text-muted-foreground">
            Available for a quick intro usually under 20 minutes.
          </p>
        </div>

        <div className="relative flex flex-col gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold"
          >
            <span>Call now</span>
            <span className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowIcon />
            </span>
          </a>
          <button
            type="button"
            onClick={copyNumber}
            className="rounded-full border border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          >
            Copy number
          </button>
        </div>
      </div>
    </div>
  );
}
