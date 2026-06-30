import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Login — Abdul Web Agency" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return toast.error(error.message);
      navigate({ to: "/admin", replace: true });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. Sign in below.");
      setMode("signin");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-glow text-white">
        <Link to="/" className="text-xs text-white/60 hover:text-white">← Back to site</Link>
        <h1 className="mt-3 text-2xl font-display font-bold">Admin {mode === "signin" ? "Sign In" : "Sign Up"}</h1>
        <p className="mt-1 text-sm text-white/60">Manage portfolio and enquiries.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Password</label>
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-400" />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-white text-ink py-3 font-semibold shadow-glow hover:bg-white/95 transition disabled:opacity-60">
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 w-full text-sm text-white/70 hover:text-white">
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}