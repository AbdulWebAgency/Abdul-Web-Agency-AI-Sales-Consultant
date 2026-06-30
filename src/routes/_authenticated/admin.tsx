import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Pencil, Image as ImageIcon, Video, ExternalLink, X, Upload } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { safeHttpUrl } from "@/lib/safe-url";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Abdul Web Agency" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  media_url: string;
  media_type: "image" | "video";
  live_url: string | null;
  display_order: number;
  created_at: string;
  website_type: string | null;
  features: string[] | null;
};

type Submission = {
  id: string;
  name: string;
  business_name: string | null;
  phone: string;
  email: string;
  requirements: string;
  status: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate({ to: "/auth" }); return; }
      setUserEmail(user.email || "");
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
    })();
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
        <div className="max-w-md text-center bg-card border rounded-3xl p-8 shadow-card">
          <h1 className="text-xl font-display font-bold text-foreground">Admin access required</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account ({userEmail}) doesn't have admin privileges yet. Ask the site owner to grant you the
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">admin</code> role.
          </p>
          <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-soft">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-lg bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold">A</span>
            <div>
              <div className="font-display font-bold text-foreground leading-none">Admin Dashboard</div>
              <div className="text-xs text-muted-foreground mt-0.5">{userEmail}</div>
            </div>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-secondary">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">Portfolio</TabsTrigger>
            <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6"><ProjectsManager /></TabsContent>
          <TabsContent value="enquiries" className="mt-6"><EnquiriesManager /></TabsContent>
          <TabsContent value="feedback" className="mt-6"><FeedbackManager /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function ProjectsManager() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("display_order").order("created_at", { ascending: false });
    setItems((data as Project[]) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function remove(id: string, mediaUrl: string) {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    if (!/^https?:\/\//i.test(mediaUrl)) {
      await supabase.storage.from("portfolio").remove([mediaUrl]);
    }
    toast.success("Deleted");
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">Manage portfolio items shown on the website.</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow">
          <Plus size={16} /> Add project
        </button>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">No projects yet. Add your first one.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p) => (
            <ProjectCard key={p.id} project={p} onEdit={() => { setEditing(p); setShowForm(true); }} onDelete={() => remove(p.id, p.media_url)} />
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={() => { setShowForm(false); setEditing(null); load(); }}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, onEdit, onDelete }: { project: Project; onEdit: () => void; onDelete: () => void }) {
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    (async () => {
      if (/^https?:\/\//i.test(project.media_url)) setUrl(project.media_url);
      else {
        const { data } = await supabase.storage.from("portfolio").createSignedUrl(project.media_url, 3600);
        setUrl(data?.signedUrl || "");
      }
    })();
  }, [project.media_url]);

  return (
    <div className="rounded-2xl border bg-card overflow-hidden shadow-card">
      <div className="relative aspect-[4/3] bg-muted">
        {url && (project.media_type === "video"
          ? <video src={url} muted loop playsInline autoPlay className="w-full h-full object-cover" />
          : <img src={url} alt={project.title} className="w-full h-full object-cover" />)}
        <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full glass-light px-2 py-1 text-[10px] font-bold uppercase">
          {project.media_type === "video" ? <Video size={10} /> : <ImageIcon size={10} />} {project.media_type}
        </div>
      </div>
      <div className="p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">{project.category}</div>
        <div className="mt-0.5 font-display font-bold text-foreground">{project.title}</div>
        {safeHttpUrl(project.live_url) && (
          <a href={safeHttpUrl(project.live_url)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
            Live <ExternalLink size={11} />
          </a>
        )}
        <div className="mt-3 flex gap-2">
          <button onClick={onEdit} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-semibold hover:bg-secondary">
            <Pencil size={12} /> Edit
          </button>
          <button onClick={onDelete} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-destructive/30 text-destructive py-2 px-3 text-xs font-semibold hover:bg-destructive/5">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectForm({ project, onClose, onSaved }: { project: Project | null; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(project?.title || "");
  const [category, setCategory] = useState(project?.category || "");
  const [description, setDescription] = useState(project?.description || "");
  const [mediaType, setMediaType] = useState<"image" | "video">(project?.media_type || "image");
  const [liveUrl, setLiveUrl] = useState(project?.live_url || "");
  const [order, setOrder] = useState<number>(project?.display_order || 0);
  const [websiteType, setWebsiteType] = useState<string>(project?.website_type || "");
  const [features, setFeatures] = useState<string[]>(project?.features || []);
  const [mediaUrlText, setMediaUrlText] = useState(
    project && /^https?:\/\//i.test(project.media_url) ? project.media_url : "",
  );
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let media_url = project?.media_url || "";
    try {
      const trimmedLiveUrl = liveUrl.trim();
      if (trimmedLiveUrl && !/^https?:\/\//i.test(trimmedLiveUrl)) {
        toast.error("Live URL must start with http:// or https://");
        setSaving(false);
        return;
      }
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("portfolio").upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        media_url = path;
      } else if (mediaUrlText) {
        media_url = mediaUrlText.trim();
      }
      if (!media_url) throw new Error("Please upload a file or paste a URL");

      const payload = {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        media_url,
        media_type: mediaType,
        live_url: trimmedLiveUrl || null,
        display_order: order,
        website_type: websiteType || null,
        features,
      };

      if (project) {
        const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
      }
      toast.success("Saved");
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <form onSubmit={save} className="my-8 w-full max-w-2xl rounded-3xl bg-card border shadow-glow p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-foreground">{project ? "Edit project" : "Add project"}</h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-secondary"><X size={18} /></button>
        </div>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <FieldLight label="Title *" value={title} onChange={setTitle} required />
          <FieldLight label="Category *" value={category} onChange={setCategory} required placeholder="e.g. Real Estate" />
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="input" />
          </div>
          <div>
            <Label>Media type</Label>
            <select value={mediaType} onChange={(e) => setMediaType(e.target.value as any)} className="input">
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>
          <FieldLight label="Display order" type="number" value={String(order)} onChange={(v) => setOrder(Number(v) || 0)} />
          <FieldLight label="Live URL (optional)" value={liveUrl} onChange={setLiveUrl} placeholder="https://example.com" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <Label>Website type</Label>
            <select value={websiteType} onChange={(e) => setWebsiteType(e.target.value)} className="input">
              <option value="">— Select —</option>
              <option value="Business Website">Business Website</option>
              <option value="Product Catalog Website">Product Catalog Website</option>
              <option value="E-commerce Website">E-commerce Website</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label>Features</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {["WhatsApp Integration","Admin Dashboard","Enquiry Form","Product Catalog","Shopping Cart","UPI Payments","Cash On Delivery (COD)","Mobile Responsive","Product Management","Order Management"].map((f) => {
                const active = features.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFeatures((prev) => active ? prev.filter((x) => x !== f) : [...prev, f])}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-secondary"}`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="sm:col-span-2">
            <Label>Upload {mediaType}</Label>
            <label className="mt-1 flex items-center gap-3 rounded-xl border border-dashed px-4 py-3 cursor-pointer hover:bg-secondary">
              <Upload size={16} />
              <span className="text-sm">{file ? file.name : "Choose a file"}</span>
              <input type="file" accept={mediaType === "video" ? "video/*" : "image/*"} onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
            </label>
          </div>
          <div className="sm:col-span-2">
            <Label>…or paste a URL</Label>
            <input value={mediaUrlText} onChange={(e) => setMediaUrlText(e.target.value)} placeholder="https://…" className="input" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60">
            {saving ? "Saving…" : "Save project"}
          </button>
        </div>
        <style>{`.input{margin-top:.25rem;display:block;width:100%;border:1px solid var(--color-border);border-radius:.75rem;padding:.65rem .9rem;background:var(--color-card);font-size:.875rem;color:var(--color-foreground);outline:none}.input:focus{box-shadow:0 0 0 2px var(--color-ring)}`}</style>
      </form>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</label>;
}
function FieldLight({ label, value, onChange, type = "text", required, placeholder, className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; className?: string }) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <input type={type} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="input" />
    </div>
  );
}

function EnquiriesManager() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as Submission[]) || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-xl font-bold text-foreground">Enquiries</h2>
        <p className="text-sm text-muted-foreground">Submissions from the contact form.</p>
      </div>
      {loading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">No enquiries yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-display font-bold text-foreground">{s.name} {s.business_name && <span className="text-muted-foreground font-normal">· {s.business_name}</span>}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <a href={`mailto:${s.email}`} className="hover:text-primary">{s.email}</a>
                    {" · "}
                    <a href={`tel:${s.phone}`} className="hover:text-primary">{s.phone}</a>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <select value={s.status} onChange={(e) => setStatus(s.id, e.target.value)} className="rounded-full border px-3 py-1.5 text-xs font-semibold bg-card">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button onClick={() => remove(s.id)} className="rounded-full border border-destructive/30 text-destructive p-2 hover:bg-destructive/5"><Trash2 size={14} /></button>
                </div>
              </div>
      <p className="mt-3 text-sm text-foreground/90 whitespace-pre-wrap">{s.requirements}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type Feedback = {
  id: string;
  message: string;
  rating: number | null;
  conversation_id: string | null;
  user_agent: string | null;
  page_url: string | null;
  status: string;
  created_at: string;
};

function FeedbackManager() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as Feedback[]) || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("feedback").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setItems((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this feedback?")) return;
    const { error } = await supabase.from("feedback").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setItems((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-extrabold tracking-tight">User Feedback</h2>
        <span className="text-xs text-muted-foreground">{items.length} total</span>
      </div>
      {loading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">No feedback yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f.id} className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">{new Date(f.created_at).toLocaleString()}</div>
                  <div className="mt-1 text-sm">
                    {f.rating ? (
                      <span className="font-semibold text-yellow-500">
                        {"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No rating</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={f.status}
                    onChange={(e) => setStatus(f.id, e.target.value)}
                    className="rounded-full border px-3 py-1.5 text-xs font-semibold bg-card"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                  </select>
                  <button
                    onClick={() => remove(f.id)}
                    className="rounded-full border border-destructive/30 text-destructive p-2 hover:bg-destructive/5"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground/90 whitespace-pre-wrap">{f.message}</p>
              <div className="mt-3 grid grid-cols-1 gap-1 text-[11px] text-muted-foreground sm:grid-cols-2">
                {f.conversation_id && <div>Conversation: <span className="font-mono">{f.conversation_id}</span></div>}
                {f.page_url && <div className="truncate">Page: {f.page_url}</div>}
                {f.user_agent && <div className="truncate sm:col-span-2">UA: {f.user_agent}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}