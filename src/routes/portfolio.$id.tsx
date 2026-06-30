import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { safeHttpUrl } from "@/lib/safe-url";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  media_url: string;
  media_type: "image" | "video";
  live_url: string | null;
};

const SITE_URL = "https://abdulwebagency.online";

function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trimEnd() + "…";
}

function buildDescription(p: { title: string; category: string; description: string | null }): string {
  const base = p.description?.trim();
  if (base && base.length >= 50) return truncate(base);
  const fallback = `${p.title} — a ${p.category} project by Abdul Web Agency. Modern, mobile-first website built for growing businesses.`;
  return truncate(fallback);
}

export const Route = createFileRoute("/portfolio/$id")({
  loader: async ({ params }) => {
    const { data } = await supabase
      .from("projects")
      .select("id,title,category,description")
      .eq("id", params.id)
      .maybeSingle();
    if (!data) throw notFound();
    return data as { id: string; title: string; category: string; description: string | null };
  },
  head: ({ params, loaderData }) => {
    const url = `${SITE_URL}/portfolio/${params.id}`;
    if (!loaderData) {
      return {
        meta: [
          { title: "Project — Abdul Web Agency" },
          { name: "description", content: "Portfolio case study by Abdul Web Agency — modern, mobile-first websites built for growing businesses." },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    const title = `${loaderData.title} — ${loaderData.category} | Abdul Web Agency`;
    const description = buildDescription(loaderData);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: loaderData.title,
            description,
            url,
            genre: loaderData.category,
            creator: { "@type": "Organization", name: "Abdul Web Agency", url: SITE_URL },
          }),
        },
      ],
    };
  },
  component: ProjectDetail,
});

async function resolveUrl(mediaUrl: string): Promise<string> {
  if (/^https?:\/\//i.test(mediaUrl)) return mediaUrl;
  const { data } = await supabase.storage.from("portfolio").createSignedUrl(mediaUrl, 60 * 60);
  return data?.signedUrl ?? "";
}

function ProjectDetail() {
  const { id } = Route.useParams();
  const [project, setProject] = useState<(Project & { resolvedUrl: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,category,description,media_url,media_type,live_url")
        .eq("id", id)
        .maybeSingle();
      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const resolvedUrl = await resolveUrl((data as Project).media_url);
      setProject({ ...(data as Project), resolvedUrl });
      setLoading(false);
    })();
  }, [id]);

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            to="/"
            hash="portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>

          {loading ? (
            <div className="mt-8 aspect-video rounded-2xl bg-muted animate-pulse" />
          ) : notFound || !project ? (
            <div className="mt-12 text-center py-16 rounded-3xl border border-dashed">
              <p className="text-muted-foreground">Project not found.</p>
            </div>
          ) : (
            <article className="mt-8">
              <div className="rounded-2xl overflow-hidden bg-muted border shadow-card">
                {project.media_type === "video" ? (
                  <video
                    src={project.resolvedUrl}
                    controls
                    playsInline
                    controlsList="nodownload"
                    className="w-full h-auto max-h-[80vh] object-contain bg-black"
                  />
                ) : (
                  <img
                    src={project.resolvedUrl}
                    alt={project.title}
                    className="w-full h-auto max-h-[80vh] object-contain bg-muted"
                  />
                )}
              </div>

              <div className="mt-8">
                <div className="text-xs font-semibold tracking-widest uppercase text-primary">
                  {project.category}
                </div>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="mt-6 text-base md:text-lg text-muted-foreground whitespace-pre-line leading-relaxed">
                    {project.description}
                  </p>
                )}
                {safeHttpUrl(project.live_url) && (
                  <a
                    href={safeHttpUrl(project.live_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
                  >
                    Visit live site <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </article>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}