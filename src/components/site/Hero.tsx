import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import founderAsset from "@/assets/founder.jpg.asset.json";
const founder = founderAsset.url;
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-28">
      <div
        className="absolute inset-0 bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, oklch(0.14 0.06 260 / 0.92), oklch(0.12 0.05 260 / 0.96)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.6_0.2_240/0.35),transparent_50%)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-white/90">
            <Sparkles size={14} className="text-sky-300" />
            Modern websites built for growing businesses
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
            Modern Websites For{" "}
            <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Growing Businesses
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
            I help businesses build professional websites that improve credibility,
            visibility, and customer enquiries.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3.5 text-sm font-semibold shadow-glow hover:bg-white/95 transition"
            >
              Get Your Website
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              View Portfolio
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-white/60 text-xs">
            <div><span className="text-white text-2xl font-bold">100%</span><div>Mobile responsive</div></div>
            <div className="h-8 w-px bg-white/20" />
            <div><span className="text-white text-2xl font-bold">24h</span><div>Fast response</div></div>
            <div className="h-8 w-px bg-white/20" />
            <div><span className="text-white text-2xl font-bold">★</span><div>Founder-led</div></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-brand blur-3xl opacity-50" />
            <div className="relative rounded-[2rem] p-1 bg-gradient-to-br from-sky-300/60 via-blue-400/40 to-indigo-500/40 shadow-glow">
              <div className="rounded-[1.85rem] overflow-hidden bg-ink">
                <img
                  src={founder}
                  alt="Abdul Rahim, founder of Abdul Web Agency"
                  width={896}
                  height={1152}
                  className="w-72 sm:w-80 md:w-96 object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 text-white text-sm shadow-glow">
              <div className="font-semibold">Abdul Rahim</div>
              <div className="text-white/70 text-xs">Founder & Developer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}