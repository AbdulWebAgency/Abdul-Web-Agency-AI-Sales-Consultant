import { motion } from "framer-motion";
import {
  Briefcase, Home, Car, Trees, User, Target, MessageCircle, LayoutDashboard,
} from "lucide-react";

const services = [
  { icon: Briefcase, title: "Business Websites", desc: "Professional websites that build trust and drive enquiries for any business." },
  { icon: Home, title: "Real Estate Websites", desc: "Property listings, virtual tours, and lead capture for real estate agents." },
  { icon: Car, title: "Vehicle Showroom Websites", desc: "Stunning showcases for dealerships with inventory filters and enquiry forms." },
  { icon: Trees, title: "Landscaping Business Websites", desc: "Visual-first sites that highlight projects and convert local customers." },
  { icon: User, title: "Portfolio Websites", desc: "Beautifully crafted portfolios for creatives, consultants, and freelancers." },
  { icon: Target, title: "Lead Generation Websites", desc: "High-conversion landing pages designed to capture qualified leads." },
  { icon: MessageCircle, title: "WhatsApp Integrated Websites", desc: "Instant chat buttons and click-to-message flows that boost conversions." },
  { icon: LayoutDashboard, title: "Admin Dashboard Development", desc: "Custom dashboards to manage content, customers, and operations." },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Services</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Websites built around your <span className="text-gradient-brand">business goals</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to look professional online and convert visitors into customers.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-2xl border bg-card p-6 shadow-card hover:shadow-glow hover:-translate-y-1 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center text-primary-foreground shadow-glow">
                <s.icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}