import { motion } from "framer-motion";
import { MessageSquare, PencilRuler, Code2, Eye, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, title: "Discuss Requirements", desc: "We start with a call to understand your business and goals." },
  { icon: PencilRuler, title: "Planning & Design", desc: "I plan the structure and design a modern, on-brand layout." },
  { icon: Code2, title: "Development", desc: "Clean, fast code with mobile-first responsive layouts." },
  { icon: Eye, title: "Review & Revisions", desc: "You review, we refine until everything feels just right." },
  { icon: Rocket, title: "Launch", desc: "We go live — your professional website is ready for customers." },
];

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Process</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            A simple, transparent <span className="text-gradient-brand">workflow</span>
          </h2>
        </div>

        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-14 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl bg-card border p-5 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-xl bg-gradient-brand text-primary-foreground flex items-center justify-center shadow-glow">
                    <s.icon size={20} />
                  </div>
                  <span className="font-display text-3xl font-extrabold text-primary/15">0{i+1}</span>
                </div>
                <h3 className="mt-4 font-display font-bold text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}