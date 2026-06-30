import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, faqJsonLd, serviceJsonLd } from "@/components/site/SeoLanding";

const URL = "https://abdulwebagency.online/ecommerce-website-development-hyderabad";
const TITLE = "E-commerce Website Development in Hyderabad — UPI, COD, Orders";
const DESCRIPTION =
  "E-commerce website development in Hyderabad with shopping cart, UPI payments, Cash on Delivery, product management, and order tracking. Founder-led, fixed pricing.";

const faqs = [
  { q: "How much does an e-commerce website cost in Hyderabad?", a: "E-commerce sites are scoped based on product count, payment options, and delivery features. After a 15-minute discovery call you receive a fixed quote covering design, development, payment integration, and admin training." },
  { q: "Do you integrate UPI and Cash on Delivery?", a: "Yes. UPI is offered through gateways like Razorpay or Cashfree, and Cash on Delivery is supported as a checkout option with the COD orders flagged in the admin so you can confirm by phone or WhatsApp before dispatch." },
  { q: "Can I manage products myself?", a: "Yes. The admin dashboard lets you add and edit products, upload images, manage stock, set variants like size and colour, apply discounts, and update prices — without touching code." },
  { q: "How are orders managed?", a: "Every order appears in the admin dashboard with customer details, items, total, payment status, and shipping address. You can mark orders as confirmed, packed, shipped, or delivered, and the customer is notified at each stage." },
  { q: "Does it work with Shiprocket or other couriers?", a: "Standard integrations with Shiprocket, Delhivery, or manual courier workflows can be added based on your shipping setup. Integration is quoted as part of the build." },
  { q: "Will the store be mobile-friendly?", a: "Yes. Over 80% of e-commerce traffic in India is on mobile. Every store is built mobile-first with a fast checkout that works smoothly on small screens and slow networks." },
];

export const Route = createFileRoute("/ecommerce-website-development-hyderabad")({
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
      { type: "application/ld+json", children: serviceJsonLd("E-commerce Website Development in Hyderabad", DESCRIPTION, URL) },
      { type: "application/ld+json", children: faqJsonLd(faqs) },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoLanding
      eyebrow="E-commerce Development • Hyderabad"
      h1="E-commerce Website Development in Hyderabad — Built to Sell"
      highlight="Hyderabad"
      intro="Full online stores with shopping cart, UPI and Cash on Delivery, product variants, order management, and an admin dashboard simple enough to run from your phone."
      highlights={["UPI + COD", "Order management", "Admin dashboard", "Mobile-first checkout", "Inventory tracking"]}
      sections={[
        {
          heading: "Beyond Instagram and WhatsApp — your own store",
          body: [
            "Many Hyderabad brands start selling on Instagram and WhatsApp. It is the fastest way to test a product. But beyond a certain volume — usually around twenty orders a month — managing DMs, payment screenshots, and address messages becomes a full-time job that does not scale.",
            "A real e-commerce website moves this work off your phone and onto a structured system. Customers browse the catalog, add to cart, pay through UPI or choose Cash on Delivery, and the order appears in your admin dashboard with everything you need to fulfil it. You stop chasing screenshots and start packing parcels.",
            "More importantly, your brand stops being a social media handle and starts being a destination. Customers can find you on Google, share a clean product link, and trust the checkout because it looks and behaves like every other e-commerce site they already use.",
          ],
        },
        {
          heading: "What an Indian e-commerce checkout needs to get right",
          body: [
            "The checkout is where most Indian e-commerce sites lose customers. Forms that ask for too much, missing UPI, no Cash on Delivery option, broken pincode validation, or surprise shipping charges at the last step — every one of these kills conversions.",
            "The stores I build follow the patterns that actually convert in India: UPI as the first payment option (Razorpay, Cashfree, or PhonePe), Cash on Delivery clearly available with the option to charge a small COD handling fee, address autofill, pincode-based delivery checks, and a single-page checkout that works on a low-end Android phone over 4G.",
            "Order confirmation goes by email and WhatsApp where possible, with a tracking link the customer can re-open at any time. The fewer 'where is my order' messages your admin has to answer, the more time you spend growing the business.",
          ],
        },
        {
          heading: "An admin dashboard you can actually use",
          body: [
            "Every store ships with a custom admin built around how your team actually works. Add a new product in under a minute, upload multiple images, set sizes or colours as variants, manage stock so out-of-stock items hide automatically, run a flash discount over the weekend, and bulk-update prices when needed.",
            "On the order side, every order has a clear status: pending payment, confirmed, packed, shipped, delivered, or cancelled. Each status change can notify the customer automatically. COD orders are flagged so you or your team can confirm by call or WhatsApp before dispatch, reducing return-to-origin losses.",
            "Reports show daily orders, revenue, top products, abandoned carts, and stock alerts. Nothing fancy — just the numbers you need to make decisions on Monday morning.",
          ],
        },
        {
          heading: "Built to grow with your business",
          body: [
            "Most Hyderabad brands launch with 20–100 products and scale from there. The store is built on a stack that can comfortably handle thousands of products and tens of thousands of monthly visitors without re-architecture.",
            "Common add-ons after launch include Google Shopping feeds, Meta Pixel and Conversion API for ad tracking, abandoned cart emails, loyalty discounts, gift cards, and integration with accounting tools. Each is quoted separately and added when your business actually needs it — not bolted on at launch because the template happened to include it.",
            "If you outgrow the platform later, the code and data are yours. You can export everything and move on. That is a level of control most hosted e-commerce platforms do not give you.",
          ],
        },
      ]}
      faqs={faqs}
      ctaTitle="Ready to sell online with your own store?"
      ctaSubtitle="Send a quick message on WhatsApp with your product category and approximate count — get a fixed quote within the day."
      internalLinks={[
        { to: "/product-catalog-websites-hyderabad", label: "Product Catalog Websites", desc: "Show your range without checkout, enquire via WhatsApp." },
        { to: "/website-developer-hyderabad", label: "Website Developer in Hyderabad", desc: "Clean code, fast performance, SEO foundations." },
        { to: "/web-designer-hyderabad", label: "Web Designer in Hyderabad", desc: "Premium, brand-aligned visual design." },
        { to: "/small-business-website-hyderabad", label: "Small Business Websites", desc: "Affordable websites for shops and services." },
      ]}
    />
  );
}