import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowIcon from "../ui/ArrowIcon";
import Logo from "../ui/Logo";
import MobileMenu from "./MobileMenu";

const links = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Studio", to: "/studio" },
  { label: "Industries", to: "/industries" },
  { label: "Journal", to: "/journals" },
  { label: "Team", to: "/team" },
];

function MenuIcon() {
  return (
    <span className="flex flex-col gap-[5px]" aria-hidden="true">
      <span className="block h-px w-[18px] bg-current" />
      <span className="block h-px w-[18px] bg-current" />
    </span>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to) => pathname === to || pathname.startsWith(`${to}/`);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="lg:px-10 lg:py-5 px-0 py-0 lg:mx-auto lg:max-w-[1600px]">
          <div className="flex items-center justify-between border-b border-border/80 bg-background/95 backdrop-blur-xl px-6 h-[72px] lg:rounded-full lg:border lg:h-auto lg:px-5 lg:py-3 lg:bg-background/80">
            <Logo enableAdminHold />

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`group relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(l.to)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-60 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className="group relative hidden lg:flex overflow-hidden rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold items-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowIcon />
              </Link>

              <button
                type="button"
                className="lg:hidden flex items-center gap-3 min-h-11 text-foreground hover:text-primary transition-colors"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen(true)}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                  Menu
                </span>
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
        pathname={pathname}
      />
    </>
  );
}
