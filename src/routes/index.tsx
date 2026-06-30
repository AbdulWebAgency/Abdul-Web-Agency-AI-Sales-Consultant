import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import heroBg from "@/assets/hero-bg.jpg";

const FAQS = [
  { q: "How much does a website cost?", a: "Pricing depends on project requirements. Contact for a personalized quote." },
  { q: "How long does development take?", a: "Most websites are delivered within 1–3 weeks, depending on the scope and how quickly we finalize content and feedback." },
  { q: "Can I request custom features?", a: "Absolutely. Custom requirements are welcome — share what you need and I'll build it around your business." },
  { q: "Will my website work on mobile devices?", a: "Yes. Every website I build is mobile-first and fully responsive across phones, tablets, and desktops." },
  { q: "Do you provide WhatsApp integration?", a: "Yes. WhatsApp chat buttons and click-to-message flows are a core part of how I help businesses capture leads." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdul Web Agency — Modern Websites For Growing Businesses" },
      { name: "description", content: "Abdul Web Agency builds modern, mobile-first websites that boost credibility, visibility, and customer enquiries. Founder-led, affordable, WhatsApp-integrated." },
      { property: "og:title", content: "Abdul Web Agency — Modern Websites For Growing Businesses" },
      { property: "og:description", content: "Professional websites for businesses. Affordable, responsive, and built to convert." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://abdulwebagency.online/" },
      { rel: "preload", as: "image", href: heroBg, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
