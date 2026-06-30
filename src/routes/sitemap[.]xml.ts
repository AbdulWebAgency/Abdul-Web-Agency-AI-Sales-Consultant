import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://abdulwebagency.online";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/website-developer-hyderabad", changefreq: "monthly", priority: "0.9" },
          { path: "/web-designer-hyderabad", changefreq: "monthly", priority: "0.9" },
          { path: "/small-business-website-hyderabad", changefreq: "monthly", priority: "0.9" },
          { path: "/ecommerce-website-development-hyderabad", changefreq: "monthly", priority: "0.9" },
          { path: "/product-catalog-websites-hyderabad", changefreq: "monthly", priority: "0.9" },
        ];

        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data } = await supabaseAdmin
            .from("projects")
            .select("id,updated_at");
          for (const row of data ?? []) {
            entries.push({
              path: `/portfolio/${row.id}`,
              lastmod: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
              changefreq: "monthly",
              priority: "0.7",
            });
          }
        } catch (err) {
          console.error("[sitemap] failed to load projects", err);
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});