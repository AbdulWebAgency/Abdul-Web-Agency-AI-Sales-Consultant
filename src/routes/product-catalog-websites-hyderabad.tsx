import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, faqJsonLd, serviceJsonLd } from "@/components/site/SeoLanding";

const URL = "https://abdulwebagency.online/product-catalog-websites-hyderabad";
const TITLE = "Product Catalog Website in Hyderabad — Showcase & Enquire";
const DESCRIPTION =
  "Product catalog websites in Hyderabad with WhatsApp enquiry, search, filters, and admin product management — perfect for wholesalers, showrooms, and B2B brands.";

const faqs = [
  { q: "What is a product catalog website?", a: "It is a website that showcases your products with images, descriptions, and specifications, but does not include a checkout. Customers enquire via WhatsApp, a contact form, or a phone call instead of paying online. It is ideal for wholesale, B2B, made-to-order, or price-on-request businesses." },
  { q: "How is it different from an e-commerce website?", a: "An e-commerce website has a cart and accepts payments online. A product catalog website focuses on display and enquiry, with no cart or checkout. Catalog sites are faster to build, cheaper to maintain, and convert well for businesses where every order needs a human conversation first." },
  { q: "Can customers enquire directly from a product page?", a: "Yes. Every product has a 'WhatsApp Enquire' button that opens WhatsApp with a pre-filled message containing the product name and a link back to the page. You can also enable an enquiry form per product." },
  { q: "Can I hide prices and show 'enquire for price'?", a: "Yes. Prices can be shown publicly, hidden entirely, shown only after enquiry, or replaced with a 'Get Quote' button. This is configurable per product." },
  { q: "Can I manage the catalog myself?", a: "Yes. The admin lets you add new products, upload multiple images, edit descriptions and specifications, organise products into categories, mark items as out of stock, and reorder how products appear on the site." },
  { q: "Will my catalog rank on Google?", a: "Each product page has its own URL, title, description, and schema markup so Google can index every item. Combined with strong category pages and fast loading, this drives long-term organic traffic for product-related searches." },
];

export const Route = createFileRoute("/product-catalog-websites-hyderabad")({
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
      { type: "application/ld+json", children: serviceJsonLd("Product Catalog Website Development in Hyderabad", DESCRIPTION, URL) },
      { type: "application/ld+json", children: faqJsonLd(faqs) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoLanding
      eyebrow="Product Catalog Websites • Hyderabad"
      h1="Product Catalog Website in Hyderabad — Show, Don't Sell"
      highlight="Hyderabad"
      intro="A clean, searchable catalog of your products with WhatsApp enquiry on every item. Perfect for wholesalers, showrooms, B2B brands, and made-to-order businesses where every deal starts with a conversation."
      highlights={["WhatsApp enquiry", "Search + filters", "Category pages", "Hide or show price", "Easy admin"]}
      sections={[
        {
          heading: "When a catalog beats a full e-commerce store",
          body: [
            "Not every product business needs a cart and checkout. Wholesalers quote based on volume. Showrooms want customers to visit. Made-to-order brands need to confirm specifications before accepting payment. B2B businesses negotiate pricing per buyer. For all of these, a full e-commerce checkout adds friction without adding revenue.",
            "A product catalog website solves the same discovery and trust problem an e-commerce store does — without forcing a checkout that does not fit your business model. Customers browse, filter, search, and find what they need. Then they enquire on WhatsApp, fill an enquiry form, or call — and a real conversation closes the deal.",
            "This pattern is especially strong in Hyderabad's wholesale and showroom segments — textiles, electronics, hardware, kitchen equipment, building materials, modular furniture, and machinery — where every order has variables that need human input.",
          ],
        },
        {
          heading: "Designed around how customers actually shop a catalog",
          body: [
            "Customers shopping a catalog have one of three jobs to do: browse a category to discover what's available, search for a specific product name or SKU, or compare a few options before deciding who to call. The site is designed around all three.",
            "Category pages show clean grids of products with primary image, name, and a quick action. Filters narrow by attribute — size, material, price range, brand. Search returns instant results as the customer types. Each product page shows multiple images, full specifications, related products, and a prominent WhatsApp enquiry button.",
            "The enquiry message is pre-filled with the product name and page URL, so when a customer messages you, you instantly know what they are asking about. No 'which product?' back and forth.",
          ],
        },
        {
          heading: "An admin built for catalogs of any size",
          body: [
            "Whether you have 30 products or 3,000, the admin makes managing the catalog straightforward. Add a product, drop in images, write a description and specifications, assign categories and tags, decide whether to show price, set stock status, and publish.",
            "Bulk operations save hours — import products from a spreadsheet, bulk-update prices across a category, archive old SKUs, and reorder how products appear in featured slots on the homepage. Out-of-stock items can be hidden automatically or shown with an 'enquire for availability' label.",
            "If your catalog comes from an existing ERP or inventory tool, a one-time import is part of the build. Ongoing sync with external systems is available as a separate integration when it actually saves your team time.",
          ],
        },
        {
          heading: "SEO that turns a catalog into a steady traffic source",
          body: [
            "A product catalog is one of the best SEO assets a business can own. Every product page is a separate URL that can rank for that product's name. Every category page can rank for the broader keyword. Done well, a catalog of a few hundred products can pull in steady organic traffic from Google for years.",
            "The technical foundations are built in: clean URLs, unique titles and descriptions per product, structured data with Product schema, breadcrumb navigation, internal links between related products, fast page speed, and a sitemap that updates automatically as new products are added.",
            "Long-term SEO still depends on the quality of your product descriptions, real product photography, and time. But starting with a technically correct catalog means the first review, the first backlink, and the first month of traffic all compound instead of being held back by basics that were never set up.",
          ],
        },
      ]}
      faqs={faqs}
      ctaTitle="Ready to put your catalog online?"
      ctaSubtitle="Send your product category and approximate count on WhatsApp — get a fixed quote and timeline within the day."
      internalLinks={[
        { to: "/ecommerce-website-development-hyderabad", label: "E-commerce Development", desc: "Add a full cart, UPI and COD checkout when you're ready." },
        { to: "/website-developer-hyderabad", label: "Website Developer in Hyderabad", desc: "Clean code, fast performance, SEO foundations." },
        { to: "/web-designer-hyderabad", label: "Web Designer in Hyderabad", desc: "Premium, brand-aligned visual design." },
        { to: "/small-business-website-hyderabad", label: "Small Business Websites", desc: "Affordable websites for shops, services, and clinics." },
      ]}
    />
  );
}