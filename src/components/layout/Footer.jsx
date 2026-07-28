import Logo from "../ui/Logo";

export default function Footer({ time }) {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <Logo />
          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {time || "-- : -- : -- UTC"}
            </span>
            <a
              href="https://www.instagram.com/hiiipe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/hiiipe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              Facebook
            </a>

            <a
              href="https://www.linkedin.com/company/hiiipe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
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
