import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { FeedbackWidget } from "./FeedbackWidget";

const STARTERS = [
  "get started",
  "I want a website for my perfume store",
  "How much for an e-commerce site?",
  "I run a restaurant — what do you recommend?",
];

const GREETING: UIMessage = {
  id: "greeting",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "👋 Hi! I'm Abdul Web Agency's AI Sales Consultant.\n\nTell me about your business and I'll recommend the right kind of website, suggest features, and put together a personalized proposal for you. Type **get started** to begin a guided consultation, or just describe what you need.",
    },
  ],
};

export function AIConsultantChat({ embedded = false }: { embedded?: boolean }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error, id: chatId } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [GREETING],
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  async function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage({ text: trimmed });
  }

  return (
    <div
      className={
        embedded ? "flex h-full flex-col" : "mx-auto flex h-[calc(100vh-5rem)] max-w-3xl flex-col px-4 py-6 sm:py-10"
      }
    >
      {!embedded && (
        <header className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-glow">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">AI Sales Consultant</h1>
            <p className="text-xs text-muted-foreground">
              Abdul Web Agency — chat, get a personalized proposal, book a free consultation.
            </p>
          </div>
        </header>
      )}

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {status === "submitted" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 size={14} className="animate-spin" /> Thinking…
            </div>
          )}
          {error ? (
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
              Something went wrong. Please try again or message us on WhatsApp.
            </div>
          ) : null}
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {STARTERS.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-foreground/80 transition hover:bg-accent"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void submit(input);
        }}
        className="mt-3 flex items-end gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit(input);
            }
          }}
          rows={1}
          placeholder="Tell me about your business or type 'get started'…"
          className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-50"
          aria-label="Send"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </form>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Powered by Abdul Web Agency AI . We Respect Your Privacy. Your Information is strictly used for enquiry purpose
        only .
      </p>
      <FeedbackWidget
        conversationId={chatId}
        getLastMessages={() =>
          messages
            .slice(-6)
            .map((m) => {
              const txt = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("")
                .trim();
              return txt ? `${m.role.toUpperCase()}: ${txt}` : "";
            })
            .filter(Boolean)
            .join("\n\n")
        }
      />
    </div>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const rawText = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();
  const text = isUser ? rawText : sanitizeAssistantText(rawText);

  const toolParts = message.parts.filter((p) => typeof p.type === "string" && p.type.startsWith("tool-"));

  if (!text && toolParts.length === 0) return null;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground"
            : "max-w-[90%] text-sm text-foreground"
        }
      >
        {text && (
          <div
            className={
              isUser
                ? "whitespace-pre-wrap"
                : "prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-headings:mt-3 prose-headings:mb-2 prose-ol:my-2 prose-ul:my-2"
            }
          >
            {isUser ? (
              text
            ) : (
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    />
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          </div>
        )}
        {toolParts.map((p, i) => {
          const anyPart = p as any;
          const sent = anyPart.output?.customer_email_sent || anyPart.output?.admin_email_sent;
          return (
            <div
              key={i}
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-300"
            >
              <CheckCircle2 size={14} />
              {sent ? "Proposal emailed" : "Preparing proposal…"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function sanitizeAssistantText(input: string): string {
  let out = input;
  // Strip ```json ... ``` and ``` ... ``` fenced blocks that contain a tool-call shape.
  out = out.replace(/```(?:json)?\s*\{[\s\S]*?\}\s*```/gi, (block) => {
    return /call_tool|send_proposal|proposal_markdown|"tool"\s*:/i.test(block) ? "" : block;
  });
  // Strip bare JSON objects that look like a tool call leaked into chat.
  out = out.replace(
    /\{[\s\S]*?(?:"call_tool"|"send_proposal"|"proposal_markdown"|"transcript_summary"|"price_range_inr")[\s\S]*?\}\s*\}?/gi,
    "",
  );
  return out.trim();
}
