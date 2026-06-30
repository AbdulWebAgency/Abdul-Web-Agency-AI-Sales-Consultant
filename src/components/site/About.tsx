import { motion } from "framer-motion";
import founderAsset from "@/assets/founder.jpg.asset.json";
const founder = founderAsset.url;
import { Check } from "lucide-react";

const pillars = [
  "Professional website design",
  "Business-focused solutions",
  "Affordable development",
  "Modern user experience",
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-15 blur-2xl" />
          <div className="relative rounded-3xl overflow-hidden shadow-card">
            <img
              src={founder}
              alt="Abdul Rahim, founder"
              loading="lazy"
              width={896}
              height={1152}
              className="w-full object-cover aspect-[4/5]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">About</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            About <span className="text-gradient-brand">Abdul Web Agency</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            I'm Abdul Rahim — founder of Abdul Web Agency. I help businesses
            establish a strong, professional online presence with modern websites
            that look great, load fast, and turn visitors into real enquiries.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Working directly with you (no middlemen, no oversized teams), I deliver
            premium results at prices that make sense for growing businesses.
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {pillars.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}