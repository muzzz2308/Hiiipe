import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import { SITE } from "../../lib/seo";

const footerLinks = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Studio", to: "/studio" },
  { label: "Industries", to: "/industries" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Footer({ time }) {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-start justify-between gap-8 mb-10">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Digital marketing, software, and AI automation for brands that
              want to grow — Lahore & London.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            aria-label="Footer"
          >
            {footerLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {time || "-- : -- : -- UTC"}
            </span>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Facebook
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="font-display text-[18vw] leading-none text-foreground/95 select-none">
          HIIIPE
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span>© 2026 hiiipe — All rights reserved</span>
          <span>Designed & built in-house</span>
        </div>
      </div>
    </footer>
  );
}
