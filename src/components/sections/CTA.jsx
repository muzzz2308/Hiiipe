import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../ui/ArrowIcon";
import ContactModal from "../ui/ContactModal";
import BookCallModal from "../ui/BookCallModal";

export default function CTA({ autoOpen = false }) {
  const [contactOpen, setContactOpen] = useState(autoOpen);
  const [callOpen, setCallOpen] = useState(false);

  return (
    <section id="contact" className="relative py-32 px-6 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-[1600px] relative rounded-3xl border border-border bg-card p-10 md:p-20 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
            // let&apos;s talk
          </p>
          <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] mb-10">
            Got a brief?
            <br />
            <span className="text-primary">Break it</span> with us.
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-7 py-4 font-semibold text-lg"
            >
              <span>info@hiiipe.com</span>
              <span className="w-9 h-9 rounded-full bg-primary-foreground text-primary flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowIcon />
              </span>
            </button>
            <Link
              to="/faq"
              className="inline-flex items-center gap-3 rounded-full border border-border px-7 py-4 font-semibold text-lg hover:border-primary hover:bg-secondary transition-colors"
            >
              Read FAQ
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-border">
            {[
              { l: "Studio", v: "Lahore & London" },
              { l: "Response", v: "< 24 hours" },
              { l: "Currency", v: "USD / EUR" },
            ].map((x) => (
              <div key={x.l}>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {x.l}
                </p>
                <p className="font-display text-2xl mt-1">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <BookCallModal open={callOpen} onClose={() => setCallOpen(false)} />
    </section>
  );
}
