import { motion } from "framer-motion";
import { Wallet, Palette, Smartphone, Target, MessageCircle, Settings2 } from "lucide-react";

const items = [
  { icon: Wallet, title: "Affordable solutions", desc: "Premium websites at prices growing businesses can actually afford." },
  { icon: Palette, title: "Modern design", desc: "Clean, trendy aesthetics that make your brand look established." },
  { icon: Smartphone, title: "Mobile responsive", desc: "Looks flawless on every phone, tablet, and desktop screen." },
  { icon: Target, title: "Business-focused", desc: "Designed around your goals — credibility, leads, and conversions." },
  { icon: MessageCircle, title: "WhatsApp integration", desc: "Direct chat buttons so customers reach you in one tap." },
  { icon: Settings2, title: "Custom requirements", desc: "Have a specific need? I'll build it around your business." },
];

export function WhyUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Why choose us</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Why businesses pick <span className="text-gradient-brand">Abdul Web Agency</span>
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative rounded-2xl border bg-card p-6 shadow-card overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-brand opacity-10 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-secondary text-primary flex items-center justify-center">
                  <it.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}