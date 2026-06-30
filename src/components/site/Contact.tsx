import { useId, useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  business_name: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().min(4, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(320),
  requirements: z.string().trim().min(5, "Tell us a bit more").max(5000),
});

export function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      business_name: String(form.get("business_name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      requirements: String(form.get("requirements") || ""),
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Please check your inputs");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/public/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("request_failed");
      toast.success("Thanks! Check your inbox — I'll reply within 24 hours.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Something went wrong. Please try again or message us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-95" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.6_0.2_240/0.3),transparent_60%)]" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-sky-300">Contact</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
            Let's Build Your <span className="bg-gradient-to-r from-sky-300 to-blue-300 bg-clip-text text-transparent">Website</span>
          </h2>
          <p className="mt-5 text-white/70 max-w-md">
            Tell me a bit about your project. I usually reply within a few hours and
            send a personalized quote based on your needs.
          </p>
          <div className="mt-8 space-y-3">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="h-10 w-10 rounded-xl glass flex items-center justify-center"><MessageCircle size={18} /></span>
              <span className="font-medium">WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>
            <a href={`tel:${WHATSAPP_DISPLAY.replace(/\s/g,"")}`} className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="h-10 w-10 rounded-xl glass flex items-center justify-center"><Phone size={18} /></span>
              <span className="font-medium">{WHATSAPP_DISPLAY}</span>
            </a>
            <a href="mailto:abdulwebagency@gmail.com" className="flex items-center gap-3 text-white/90 hover:text-white">
              <span className="h-10 w-10 rounded-xl glass flex items-center justify-center"><Mail size={18} /></span>
              <span className="font-medium">abdulwebagency@gmail.com</span>
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={onSubmit}
          className="glass rounded-3xl p-6 sm:p-8 shadow-glow"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" required maxLength={200} />
            <Field label="Business Name" name="business_name" maxLength={200} />
            <Field label="Phone Number" name="phone" required type="tel" maxLength={30} />
            <Field label="Email" name="email" required type="email" maxLength={320} />
          </div>
          <RequirementsField />
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-white text-ink py-3.5 font-semibold shadow-glow hover:bg-white/95 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Enquiry"}
          </button>
          <p className="mt-3 text-center text-xs text-white/50">
            Or message directly on WhatsApp for the fastest response.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, maxLength }: { label: string; name: string; type?: string; required?: boolean; maxLength?: number }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">{label}{required && " *"}</label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>
  );
}

function RequirementsField() {
  const id = useId();
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
        Project Requirements
      </label>
      <textarea
        id={id}
        name="requirements"
        required
        rows={4}
        maxLength={5000}
        className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400"
        placeholder="What kind of website do you need?"
      />
    </div>
  );
}