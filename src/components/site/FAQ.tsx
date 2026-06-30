import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How much does a website cost?", a: "Pricing depends on project requirements. Contact for a personalized quote." },
  { q: "How long does development take?", a: "Most websites are delivered within 1–3 weeks, depending on the scope and how quickly we finalize content and feedback." },
  { q: "Can I request custom features?", a: "Absolutely. Custom requirements are welcome — share what you need and I'll build it around your business." },
  { q: "Will my website work on mobile devices?", a: "Yes. Every website I build is mobile-first and fully responsive across phones, tablets, and desktops." },
  { q: "Do you provide WhatsApp integration?", a: "Yes. WhatsApp chat buttons and click-to-message flows are a core part of how I help businesses capture leads." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">FAQ</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Frequently asked <span className="text-gradient-brand">questions</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border bg-card px-5 shadow-card data-[state=open]:shadow-glow transition"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}