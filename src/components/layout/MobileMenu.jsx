import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

const secondaryLinks = [
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function MobileMenu({ open, onClose, links, pathname }) {
  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div
      className={`fixed inset-0 z-[100] lg:hidden flex flex-col bg-background transition-[visibility,opacity] duration-300 ${
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="flex h-full flex-col"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-6 h-[72px]">
          <Logo onNavigate={onClose} />
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors px-2 py-2 min-h-11"
          >
            Close
          </button>
        </div>

        {/* Primary navigation */}
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-10">
          <ul className="space-y-1">
            {links.map((l, i) => {
              const active = isActive(l.to);
              return (
                <li
                  key={l.to}
                  className={open ? "animate-[menuItemIn_0.45s_ease-out_both]" : ""}
                  style={open ? { animationDelay: `${80 + i * 45}ms` } : undefined}
                >
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className={`block border-l-2 py-3.5 pl-5 -ml-px text-[1.625rem] leading-tight font-normal tracking-[-0.02em] transition-colors ${
                      active
                        ? "border-primary text-foreground"
                        : "border-transparent text-foreground/75 hover:border-border hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={`mt-10 pt-8 border-t border-border/60 flex flex-wrap gap-x-6 gap-y-3 ${
              open ? "animate-[menuItemIn_0.45s_ease-out_both]" : ""
            }`}
            style={open ? { animationDelay: `${80 + links.length * 45}ms` } : undefined}
          >
            {secondaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={onClose}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive(l.to)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div
          className={`shrink-0 border-t border-border/60 px-6 py-8 space-y-6 ${
            open ? "animate-[menuItemIn_0.45s_ease-out_both]" : ""
          }`}
          style={open ? { animationDelay: `${120 + links.length * 45}ms` } : undefined}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Email
              </p>
              <a
                href="mailto:info@hiiipe.com"
                className="text-sm text-foreground hover:text-primary transition-colors"
              >
                info@hiiipe.com
              </a>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Studio
              </p>
              <p className="text-sm text-muted-foreground">Lahore · London</p>
            </div>
          </div>

          <Link
            to="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-tight hover:bg-primary/90 transition-colors"
          >
            Start a project
          </Link>
        </div>
      </div>
    </div>
  );
}
