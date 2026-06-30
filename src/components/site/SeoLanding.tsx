import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { whatsappLink } from "@/lib/whatsapp";

export type SeoFAQ = { q: string; a: string };
export type SeoSection = { heading: string; body: string[] };

export type SeoLandingProps = {
  eyebrow: string;
  h1: string;
  highlight: string;
  intro: string;
  highlights: string[];
  sections: SeoSection[];
  faqs: SeoFAQ[];
  ctaTitle: string;
  ctaSubtitle: string;
  internalLinks: { to: string; label: string; desc: string }[];
};

export function SeoLanding(props: SeoLandingProps) {
  const wa = whatsappLink(`Hi Abdul, I'm interested in ${props.h1}.`);
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-soft">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            {props.eyebrow}
          </span>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {props.h1.split(props.highlight)[0]}
            <span className="text-gradient-brand">{props.highlight}</span>
            {props.h1.split(props.highlight)[1]}
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {props.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40"
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {props.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5">
                <Check size={14} className="text-primary" /> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 space-y-12">
          {props.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gradient-soft">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">FAQ</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
              Frequently asked <span className="text-gradient-brand">questions</span>
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {props.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border bg-card p-5 shadow-card open:shadow-glow"
              >
                <summary className="cursor-pointer list-none font-display font-semibold text-foreground flex items-start justify-between gap-3">
                  <span>{f.q}</span>
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground">
            Explore related <span className="text-gradient-brand">services</span>
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {props.internalLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group block rounded-2xl border bg-card p-6 shadow-card hover:shadow-glow hover:-translate-y-1 transition-all"
              >
                <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {l.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-3xl bg-gradient-brand p-10 md:p-14 text-center shadow-glow">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground">
              {props.ctaTitle}
            </h2>
            <p className="mt-3 text-primary-foreground/90 max-w-2xl mx-auto">
              {props.ctaSubtitle}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground hover:opacity-95"
              >
                <MessageCircle size={16} /> WhatsApp Now
              </a>
              <Link
                to="/"
                hash="contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                Send an Enquiry <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}

export function faqJsonLd(faqs: SeoFAQ[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
}

export function serviceJsonLd(name: string, description: string, url: string) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    areaServed: { "@type": "City", name: "Hyderabad" },
    provider: {
      "@type": "Organization",
      name: "Abdul Web Agency",
      url: "https://abdulwebagency.online",
    },
  });
}