import { useRef, useState } from "react";
import { MessageSquare, Bug, Star, X, Loader2, CheckCircle2, Upload } from "lucide-react";

type Mode = null | "choose" | "feedback" | "bug" | "done";

interface Props {
  conversationId?: string;
  getLastMessages?: () => string;
}

export function FeedbackWidget({ conversationId, getLastMessages }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [doneLabel, setDoneLabel] = useState("");

  function close() {
    setOpen(false);
    setTimeout(() => {
      setMode(null);
      setDoneLabel("");
    }, 200);
  }

  return (
    <>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => {
            setMode("choose");
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-semibold text-foreground/80 shadow-sm backdrop-blur transition hover:bg-accent"
        >
          <MessageSquare size={14} /> Feedback
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-glow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                {mode === "feedback"
                  ? "Share your feedback"
                  : mode === "bug"
                    ? "Report a bug"
                    : mode === "done"
                      ? doneLabel
                      : "How can we help?"}
              </h3>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {mode === "choose" && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setMode("feedback")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  <span className="text-2xl">👍</span>
                  General Feedback
                </button>
                <button
                  onClick={() => setMode("bug")}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  <span className="text-2xl">🐞</span>
                  Report a Bug
                </button>
              </div>
            )}

            {mode === "feedback" && (
              <FeedbackForm
                conversationId={conversationId}
                onDone={() => {
                  setDoneLabel("Thanks for your feedback!");
                  setMode("done");
                }}
              />
            )}

            {mode === "bug" && (
              <BugForm
                conversationId={conversationId}
                getLastMessages={getLastMessages}
                onDone={() => {
                  setDoneLabel("Bug report sent. Thank you!");
                  setMode("done");
                }}
              />
            )}

            {mode === "done" && (
              <div className="mt-5 flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 className="text-emerald-500" size={36} />
                <p className="text-sm text-muted-foreground">
                  Your feedback helps us continuously improve our AI consultant.
                </p>
                <button
                  onClick={close}
                  className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Close
                </button>
              </div>
            )}

            {mode !== "done" && (
              <p className="mt-4 text-center text-[11px] text-muted-foreground">
                Your feedback helps us continuously improve our AI consultant.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function FeedbackForm({
  conversationId,
  onDone,
}: {
  conversationId?: string;
  onDone: () => void;
}) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/public/feedback-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "feedback",
          message: message.trim(),
          rating: rating > 0 ? rating : null,
          conversation_id: conversationId || null,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          page_url: typeof window !== "undefined" ? window.location.href : null,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to submit");
      }
      onDone();
    } catch (err: any) {
      setError(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div>
        <label className="text-xs font-semibold text-muted-foreground">Rating (optional)</label>
        <div className="mt-1 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(rating === n ? 0 : n)}
              className="rounded p-1 transition hover:scale-110"
              aria-label={`${n} star`}
            >
              <Star
                size={22}
                className={
                  n <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground">Your feedback</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          required
          placeholder="Tell us what you think…"
          className="mt-1 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !message.trim()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
      >
        {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
        {submitting ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}

function BugForm({
  conversationId,
  getLastMessages,
  onDone,
}: {
  conversationId?: string;
  getLastMessages?: () => string;
  onDone: () => void;
}) {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function fileToDataUrl(f: File): Promise<string> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(f);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    if (!file) {
      setError("Please attach a screenshot of the bug.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Screenshot must be 8MB or smaller.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await fetch("/api/public/feedback-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bug",
          description: description.trim(),
          screenshot_data_url: dataUrl,
          screenshot_filename: file.name,
          conversation_id: conversationId || null,
          last_messages: getLastMessages?.() || null,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
          page_url: typeof window !== "undefined" ? window.location.href : null,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to submit");
      }
      onDone();
    } catch (err: any) {
      setError(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div>
        <label className="text-xs font-semibold text-muted-foreground">
          Describe the issue
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          placeholder="What went wrong? Steps to reproduce, what you expected…"
          className="mt-1 w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-muted-foreground">
          Screenshot of the bug <span className="text-destructive">*</span>
        </label>
        <label className="mt-1 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm hover:bg-accent">
          <Upload size={16} />
          <span className="truncate">{file ? file.name : "Choose an image (PNG/JPEG)"}</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !description.trim() || !file}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
      >
        {submitting ? <Loader2 size={14} className="animate-spin" /> : <Bug size={14} />}
        {submitting ? "Sending…" : "Send bug report"}
      </button>
    </form>
  );
}