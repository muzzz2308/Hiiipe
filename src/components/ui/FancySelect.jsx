import { useEffect, useId, useRef, useState } from "react";

/**
 * Themed custom select — animated menu, keyboard support, site styling.
 */
export default function FancySelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  placement = "bottom",
}) {
  const listId = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const selected = options.find((o) => o === value);
  const showMenu = open || closing;

  const close = () => {
    if (!open) return;
    setClosing(true);
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setHighlight(-1);
    }, 180);
  };

  const toggle = () => {
    if (open) close();
    else {
      setClosing(false);
      setOpen(true);
      const idx = options.findIndex((o) => o === value);
      setHighlight(idx >= 0 ? idx : 0);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) close();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const pick = (option) => {
    onChange(option);
    close();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        toggle();
        return;
      }
      if (highlight >= 0 && options[highlight]) pick(options[highlight]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        toggle();
        return;
      }
      setHighlight((h) => Math.min((h < 0 ? -1 : h) + 1, options.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        toggle();
        return;
      }
      setHighlight((h) => Math.max((h < 0 ? options.length : h) - 1, 0));
    }
  };

  return (
    <div className="block space-y-2" ref={rootRef}>
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      )}

      <div className={`relative ${showMenu ? "z-30" : "z-0"}`}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={toggle}
          onKeyDown={onKeyDown}
          className={`group flex w-full items-center justify-between gap-3 rounded-xl border bg-background/60 px-4 py-3 text-left text-sm transition-all duration-200 ${
            open
              ? "border-primary shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_35%,transparent)]"
              : "border-border hover:border-primary/50"
          }`}
        >
          <span className={selected ? "text-foreground" : "text-muted-foreground"}>
            {selected || placeholder}
          </span>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              open
                ? "rotate-180 border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground group-hover:border-primary/40 group-hover:text-primary"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        {showMenu && (
          <ul
            id={listId}
            role="listbox"
            className={`absolute left-0 right-0 z-30 overflow-hidden rounded-2xl border border-border bg-[#0c0b09] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)] ${
              placement === "top"
                ? "bottom-[calc(100%+8px)] origin-bottom"
                : "top-[calc(100%+8px)] origin-top"
            } ${
              closing
                ? "animate-[selectOut_180ms_ease-in_forwards]"
                : "animate-[selectIn_220ms_cubic-bezier(0.22,1,0.36,1)]"
            }`}
          >
            <li className="border-b border-border/60 px-4 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                Choose one
              </p>
            </li>
            {options.map((option, index) => {
              const isActive = option === value;
              const isHot = index === highlight;
              return (
                <li key={option} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlight(index)}
                    onClick={() => pick(option)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors ${
                      isHot || isActive
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors ${
                          isActive ? "bg-primary" : isHot ? "bg-primary/50" : "bg-border"
                        }`}
                      />
                      {option}
                    </span>
                    {isActive && (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
