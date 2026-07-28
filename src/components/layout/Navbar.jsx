import ArrowIcon from "../ui/ArrowIcon";
import Logo from "../ui/Logo";

export default function Nav() {
  const links = ["Work", "Services", "Studio", "Process", "Journal", "Team"];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5">
      <div className="mx-auto max-w-[1600px] flex items-center justify-between rounded-full border border-border bg-background/70 backdrop-blur-xl px-5 py-3">
        <Logo enableAdminHold />
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="group relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="group relative overflow-hidden rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
        >
          <span>Start a Project</span>
          <ArrowIcon />
        </a>
      </div>
    </header>
  );
}