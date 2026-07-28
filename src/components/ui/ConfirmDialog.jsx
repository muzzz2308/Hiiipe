import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({
        title: options.title || "Are you sure?",
        message: options.message || "This action cannot be undone.",
        confirmLabel: options.confirmLabel || "Confirm",
        cancelLabel: options.cancelLabel || "Cancel",
        tone: options.tone || "danger",
        resolve,
      });
    });
  }, []);

  const close = (result) => {
    state?.resolve(result);
    setState(null);
  };

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {state && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Dismiss"
            className="absolute inset-0 bg-black/70 animate-[fadeIn_180ms_ease-out]"
            onClick={() => close(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-[popIn_220ms_cubic-bezier(0.22,1,0.36,1)]">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3">
              // confirm
            </p>
            <h3 className="font-display text-3xl mb-3">{state.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {state.message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => close(false)}
                className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest hover:border-foreground transition-colors"
              >
                {state.cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => close(true)}
                className={`rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest font-semibold transition-transform hover:scale-[1.02] ${
                  state.tone === "danger"
                    ? "bg-red-400 text-[#111110]"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {state.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx.confirm;
}
