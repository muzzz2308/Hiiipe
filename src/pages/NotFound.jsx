import { Link } from "react-router-dom";
import ArrowIcon from "../components/ui/ArrowIcon";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-20" />
      <div className="pointer-events-none absolute -bottom-24 right-0 select-none font-display text-[28vw] leading-none text-foreground/4">
        404
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col justify-center px-6 py-24 md:px-10">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-primary">
          // page not found
        </p>
        <h1 className="font-display text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
          Lost in
          <br />
          the <span className="text-primary">studio.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          This route doesn&apos;t exist — or it got cut in the edit. Head home
          and keep exploring the work.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground"
          >
            <span>Back home</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground text-primary transition-transform group-hover:rotate-45">
              <ArrowIcon />
            </span>
          </Link>
          <Link
            to="/journals"
            className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 font-semibold transition-colors hover:bg-secondary"
          >
            Browse journal
          </Link>
        </div>
      </div>
    </main>
  );
}
