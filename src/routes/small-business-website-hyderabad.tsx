import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, faqJsonLd, serviceJsonLd } from "@/components/site/SeoLanding";

const URL = "https://abdulwebagency.online/small-business-website-hyderabad";
const TITLE = "Small Business Website in Hyderabad — Affordable & Professional";
const DESCRIPTION =
  "Affordable small business websites in Hyderabad with WhatsApp enquiry, Google Maps, and mobile-first design. Perfect for shops, clinics, consultants, and local services.";

const faqs = [
  { q: "How much does a small business website cost in Hyderabad?", a: "A 4–6 page small business website is one of the most affordable categories. Exact pricing depends on whether you need a basic informational site, a multi-language site, or extra features like booking or payments. You receive a fixed quote on day one." },
  { q: "What pages does a small business website need?", a: "At minimum: Home, About, Services or Products, and Contact. Most businesses also benefit from a Gallery or Portfolio page, a Reviews section, and a dedicated landing page for their primary service. The structure is decided in the discovery call." },
  { q: "Will customers be able to enquire directly from the website?", a: "Yes. Every small business website ships with an enquiry form that sends submissions to your email, a click-to-call button on mobile, and a WhatsApp chat button that opens with a pre-filled message." },
  { q: "Can I add my Google Maps location?", a: "Yes. Embedded Google Maps on the Contact page is standard. If your business has a Google Business Profile, the site is also optimised to support your local SEO and Maps ranking." },
  { q: "Do I need to know anything technical to manage the site?", a: "No. The admin area uses simple forms — change a phone number, update business hours, add a new photo, or edit a service description by clicking a field and typing. No code, no plugins to manage." },
  { q: "Is hosting and domain included?", a: "Domain and hosting are quoted separately so you stay in control of both. You own the domain in your name, and hosting is recommended based on the expected traffic for your business." },
];

export const Route = createFileRoute("/small-business-website-hyderabad")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: serviceJsonLd("Small Business Website Development in Hyderabad", DESCRIPTION, URL) },
      { type: "application/ld+json", children: faqJsonLd(faqs) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoLanding
      eyebrow="Small Business Websites • Hyderabad"
      h1="Small Business Website in Hyderabad That Brings Real Customers"
      highlight="Hyderabad"
      intro="An affordable, modern website for your shop, clinic, consultancy, or local service — built around WhatsApp enquiries, Google Maps, and the way your customers actually find you."
      highlights={["From a few pages", "WhatsApp enquiry", "Google Maps", "Mobile-first", "You own everything"]}
      sections={[
        {
          heading: "Why every small business in Hyderabad needs a real website",
          body: [
            "A Google Business Profile and an Instagram page are not a website. They are great for discovery, but they belong to a platform that can change its rules tomorrow. A real website is the one digital asset your business actually owns — a permanent address that works whether or not the algorithm is in your favour.",
            "For a small business in Hyderabad, the website is also where customers verify that you are legitimate. After they find your business on Google Maps or WhatsApp, the very next step is typing your name into Google. If the result is a Justdial listing from 2017 or nothing at all, the trust you built with that first impression evaporates.",
            "A clean, modern website fixes this in one move. It shows your services, prices or 'enquire for price', real photos of your work, customer reviews, location, and a clear way to contact you — all within five seconds of landing.",
          ],
        },
        {
          heading: "What a small business website should actually do",
          body: [
            "The job of a small business website is not to win design awards or rank for impossible keywords. It is to do four specific things: build instant trust, answer the top five customer questions, make contact effortless, and capture an enquiry — through a form, a WhatsApp click, or a phone call.",
            "Trust comes from real photography, a real founder story, and visible reviews. Answering questions comes from a clear services or products page with pricing context. Effortless contact comes from a sticky WhatsApp button, click-to-call on mobile, and embedded Google Maps. Capturing enquiries comes from a short form that asks for name, phone, and what they need — nothing more.",
            "Every small business website I deliver in Hyderabad is structured around these four jobs. If a section does not help with one of them, it does not make it onto the page.",
          ],
        },
        {
          heading: "Built for Hyderabad's local search and Google Maps",
          body: [
            "Most small business customers in Hyderabad find you in one of three ways: Google search for 'dentist near me' or 'AC repair Madhapur', the Google Maps result that appears below it, or word-of-mouth followed by a Google search for your name.",
            "The website is built with the foundations Google needs to rank you locally: city and locality mentioned in the right places, schema markup for LocalBusiness with your address and hours, fast load speed on mobile, and a strong link between the website and your Google Business Profile. None of this is magic — it is just doing the basics that most local websites skip.",
            "Long-term ranking still depends on reviews, content, and time. But shipping a website that is technically correct from day one is the difference between a site that slowly climbs and one that never moves.",
          ],
        },
        {
          heading: "Affordable does not mean cheap",
          body: [
            "There is a real difference between an affordable website and a cheap one. A cheap website is a generic template with your logo dropped in — it looks the same as every other business in your area, loads slowly, and stops working when the template author moves on.",
            "An affordable, founder-led website costs less than hiring a freelancer through a marketplace because there is no agency overhead, no project manager, and no upsells. You pay for the actual website, once, and the price is fixed before anything starts.",
            "Most small business websites in Hyderabad are delivered in one to two weeks. You can be live, ranking, and receiving WhatsApp enquiries this month — not next quarter.",
          ],
        },
      ]}
      faqs={faqs}
      ctaTitle="Let's get your business online — properly."
      ctaSubtitle="Share your business name and city on WhatsApp. Get a fixed quote and a delivery timeline within hours."
      internalLinks={[
        { to: "/website-developer-hyderabad", label: "Website Developer in Hyderabad", desc: "Full development with clean code, speed, and SEO." },
        { to: "/web-designer-hyderabad", label: "Web Designer in Hyderabad", desc: "Modern, brand-aligned design tailored to your industry." },
        { to: "/product-catalog-websites-hyderabad", label: "Product Catalog Websites", desc: "Showcase your range with WhatsApp enquiry." },
        { to: "/ecommerce-website-development-hyderabad", label: "E-commerce Development", desc: "Full online store with UPI, COD, and orders." },
      ]}
    />
  );
}