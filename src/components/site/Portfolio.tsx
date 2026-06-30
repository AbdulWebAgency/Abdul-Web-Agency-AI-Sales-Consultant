import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Play, Search, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { safeHttpUrl } from "@/lib/safe-url";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  media_url: string;
  media_type: "image" | "video";
  live_url: string | null;
  website_type: string | null;
  features: string[] | null;
};

const WEBSITE_TYPES = [
  "All Projects",
  "Business Website",
  "Product Catalog Website",
  "E-commerce Website",
] as const;

const FEATURE_OPTIONS = [
  "WhatsApp Integration",
  "Admin Dashboard",
  "Enquiry Form",
  "Product Catalog",
  "Shopping Cart",
  "UPI Payments",
  "Cash On Delivery (COD)",
  "Mobile Responsive",
  "Product Management",
  "Order Management",
] as const;

async function resolveUrl(mediaUrl: string): Promise<string> {
  if (/^https?:\/\//i.test(mediaUrl)) return mediaUrl;
  // storage path → signed URL
  const { data } = await supabase.storage.from("portfolio").createSignedUrl(mediaUrl, 60 * 60);
  return data?.signedUrl ?? "";
}

export function Portfolio() {
  const [projects, setProjects] = useState<(Project & { resolvedUrl: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All Projects");
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,category,description,media_url,media_type,live_url,website_type,features")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error || !data) { setLoading(false); return; }
      const resolved = await Promise.all(
        data.map(async (p) => ({ ...(p as Project), resolvedUrl: await resolveUrl(p.media_url) })),
      );
      setProjects(resolved);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (typeFilter !== "All Projects" && (p.website_type || "") !== typeFilter) return false;
      if (activeFeatures.length > 0) {
        const pf = p.features || [];
        if (!activeFeatures.every((f) => pf.includes(f))) return false;
      }
      if (q) {
        const hay = [
          p.title,
          p.description,
          p.category,
          p.website_type || "",
          ...(p.features || []),
        ].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [projects, query, typeFilter, activeFeatures]);

  const toggleFeature = (f: string) =>
    setActiveFeatures((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const clearAll = () => { setQuery(""); setTypeFilter("All Projects"); setActiveFeatures([]); };
  const hasFilters = query || typeFilter !== "All Projects" || activeFeatures.length > 0;

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Portfolio</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Recent <span className="text-gradient-brand">work</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Search and filter to find examples that match your industry and requirements.</p>
        </div>

        {/* Search + Filters */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, type, or feature…"
              className="w-full rounded-full border border-border bg-card pl-11 pr-11 py-3 text-sm shadow-card focus:outline-none focus:ring-2 focus:ring-primary/40"
              aria-label="Search projects"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="mt-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Website type</div>
            <div className="flex flex-wrap gap-2">
              {WEBSITE_TYPES.map((t) => {
                const active = typeFilter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`text-xs sm:text-sm px-4 py-2 rounded-full border font-semibold transition-all ${active ? "bg-gradient-brand text-primary-foreground border-transparent shadow-glow" : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-secondary"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Features</div>
            <div className="flex flex-wrap gap-2">
              {FEATURE_OPTIONS.map((f) => {
                const active = activeFeatures.includes(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFeature(f)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${active ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40"}`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{filtered.length} {filtered.length === 1 ? "project" : "projects"} found</span>
              <button onClick={clearAll} className="font-semibold text-primary hover:underline">Clear all</button>
            </div>
          )}
        </div>

        <div className="mt-14">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0,1,2].map(i => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border border-dashed">
              <p className="text-muted-foreground">
                {projects.length === 0 ? "Portfolio projects coming soon." : "No projects match your filters."}
              </p>
              {hasFilters && projects.length > 0 && (
                <button onClick={clearAll} className="mt-4 text-sm font-semibold text-primary hover:underline">Reset filters</button>
              )}
            </div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.2) }}
                  className="group rounded-2xl overflow-hidden bg-card border shadow-card hover:shadow-glow hover:-translate-y-1 transition-all"
                >
                  <Link
                    to="/portfolio/$id"
                    params={{ id: p.id }}
                    className="relative block aspect-[4/3] overflow-hidden bg-muted"
                  >
                    {p.media_type === "video" ? (
                      <video
                        src={p.resolvedUrl}
                        muted
                        loop
                        playsInline
                        autoPlay
                        controls
                        controlsList="nodownload"
                        className="w-full h-full object-contain bg-muted"
                      />
                    ) : (
                      <img
                        src={p.resolvedUrl}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-contain bg-muted group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    )}
                    {p.media_type === "video" && (
                      <div className="absolute top-3 right-3 rounded-full glass px-2.5 py-1 text-[10px] font-bold text-white inline-flex items-center gap-1">
                        <Play size={10} /> VIDEO
                      </div>
                    )}
                    {p.website_type && (
                      <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-foreground border">
                        {p.website_type}
                      </div>
                    )}
                  </Link>
                  <div className="p-5">
                    <div className="text-xs font-semibold tracking-wider uppercase text-primary">{p.category}</div>
                    <Link to="/portfolio/$id" params={{ id: p.id }}>
                      <h3 className="mt-1 font-display text-lg font-bold text-foreground hover:text-primary transition-colors">{p.title}</h3>
                    </Link>
                    {p.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                    )}
                    {p.features && p.features.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.features.slice(0, 4).map((f) => (
                          <span key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{f}</span>
                        ))}
                        {p.features.length > 4 && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">+{p.features.length - 4}</span>
                        )}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-4">
                      <Link
                        to="/portfolio/$id"
                        params={{ id: p.id }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      >
                        View demo
                      </Link>
                      {safeHttpUrl(p.live_url) && (
                        <a
                          href={safeHttpUrl(p.live_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                        >
                          Live site <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}