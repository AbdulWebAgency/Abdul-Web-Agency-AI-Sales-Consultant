import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, faqJsonLd, serviceJsonLd } from "@/components/site/SeoLanding";

const URL = "https://abdulwebagency.online/web-designer-hyderabad";
const TITLE = "Web Designer in Hyderabad — Modern, Premium Websites";
const DESCRIPTION =
  "Freelance web designer in Hyderabad creating modern, premium, mobile-first websites that build trust and bring real customer enquiries. Founder-led, fixed pricing.";

const faqs = [
  { q: "What is the difference between a web designer and a web developer?", a: "A web designer focuses on layout, typography, colours, imagery, and how the site feels. A developer focuses on code and performance. At Abdul Web Agency you get both in one engagement — design and development from the same person, which keeps the vision consistent." },
  { q: "Do you design from scratch or use templates?", a: "Every design is created from scratch around your brand, industry, and customers. Templates are useful for reference, but the final layout, sections, colours, and content structure are tailored to your business." },
  { q: "Can you match my existing logo and brand colours?", a: "Yes. Share your logo, brand colours, and any printed marketing material, and the website design will be built around them. If you don't have a brand kit yet, basic colour and typography choices are guided as part of the project." },
  { q: "Will the design look good on mobile?", a: "Mobile is designed first, then scaled to tablet and desktop. Most Hyderabad customers visit your website from a phone, so the small screen experience is the priority — not an afterthought." },
  { q: "How many design revisions are included?", a: "Reasonable revisions are included until you're happy with the look and feel. Pixel-level changes, copy edits, and section reorders are part of the build, not extras." },
  { q: "Do you also write the content?", a: "Yes, basic copywriting for headlines, service descriptions, and the about section is included. For long-form content like blogs or product descriptions, copy can be written for an additional fee or you can supply your own." },
];

export const Route = createFileRoute("/web-designer-hyderabad")({
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
      { type: "application/ld+json", children: serviceJsonLd("Web Design in Hyderabad", DESCRIPTION, URL) },
      { type: "application/ld+json", children: faqJsonLd(faqs) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoLanding
      eyebrow="Web Designer • Hyderabad"
      h1="Web Designer in Hyderabad for Premium, Conversion-Focused Websites"
      highlight="Hyderabad"
      intro="Design that makes visitors trust you in five seconds — modern layouts, clean typography, real photography, and a structure built around enquiries, not awards."
      highlights={["Custom designs", "Mobile-first", "Brand-aligned", "Conversion focused", "Fixed pricing"]}
      sections={[
        {
          heading: "Design that earns trust in the first five seconds",
          body: [
            "When a customer in Hyderabad lands on your website, they decide whether to keep reading or hit the back button within five seconds. That decision is almost entirely visual — the hero image, the headline, the typography, the colours, and how the page feels on their phone.",
            "A good web designer in Hyderabad understands that design is not decoration. Every spacing choice, button size, and section order is calibrated to move the visitor from curiosity to enquiry. The goal is not to win a design competition — it is to win the next customer who is comparing you against three other businesses on Google.",
            "Across hundreds of brand interactions, the same patterns convert in Hyderabad: a clear, benefit-led headline, real photography of your work or products (not stock images), prominent WhatsApp and call buttons, social proof through reviews and project examples, and an enquiry form that asks for only what is needed.",
          ],
        },
        {
          heading: "A modern, premium design language",
          body: [
            "The design system avoids the generic AI-generated look — no overused fonts like Inter or Poppins by default, no purple gradients on white, no carbon-copy hero sections. Every project commits to a clear visual direction that suits the industry: editorial elegance for clinics and salons, bold confidence for construction and real estate, warm minimalism for food and lifestyle brands.",
            "Typography pairs a distinctive display font with a refined body font, the colour palette commits to two or three brand colours used with intent, and motion is used sparingly — one well-timed hero animation creates more delight than a dozen distracting micro-interactions.",
            "Premium does not mean expensive. It means considered. Generous spacing, intentional alignment, and consistent visual rhythm cost nothing extra but separate a serious brand from a template.",
          ],
        },
        {
          heading: "Designed for the phone first, then scaled up",
          body: [
            "Over 75% of Hyderabad website traffic now comes from mobile devices, often on slower 4G connections. A design that looks beautiful on a 27-inch monitor but breaks on a six-inch phone is a failed design.",
            "Every layout is designed in mobile dimensions first. Tap targets are large enough for thumbs, important information appears above the fold without scrolling, images are sized for fast loading, and forms use the native keyboard for phone numbers and email addresses.",
            "Once the mobile experience is right, the design scales up to tablet and desktop with extra whitespace and larger imagery — not by cramming in more content, but by letting the design breathe.",
          ],
        },
        {
          heading: "How the design process works",
          body: [
            "The process starts with a short conversation about your business, your competitors, and three or four websites you personally find appealing. From there a mood and direction are proposed — usually as a single hero section so you can react to the visual direction before the full design is built out.",
            "Once the direction is approved, the full design is built out section by section in real code, not static mockups. This is faster, lets you click and feel the design on your own phone immediately, and avoids the disappointment of a Figma file that looks one way and a live website that feels another.",
            "Revisions happen on the live preview link — you share comments, the design updates, you refresh. Most projects reach final design in under two weeks, with development continuing in parallel.",
          ],
        },
      ]}
      faqs={faqs}
      ctaTitle="Want a website that looks like your brand?"
      ctaSubtitle="Share your industry and a few references — get a personalised design direction within one day."
      internalLinks={[
        { to: "/website-developer-hyderabad", label: "Website Developer in Hyderabad", desc: "Full development with clean code, speed, and SEO foundations." },
        { to: "/small-business-website-hyderabad", label: "Small Business Websites", desc: "Affordable, premium design for shops, clinics, and local services." },
        { to: "/ecommerce-website-development-hyderabad", label: "E-commerce Development", desc: "Beautifully designed online stores with UPI and COD." },
        { to: "/product-catalog-websites-hyderabad", label: "Product Catalog Websites", desc: "Showcase your range with elegance and WhatsApp enquiry." },
      ]}
    />
  );
}