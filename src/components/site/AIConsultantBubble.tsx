import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MessageCircle, Sparkles, X } from 'lucide-react'

export function AIConsultantBubble() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 3500)
    return () => clearTimeout(t)
  }, [])

  if (pathname === '/aiconsultation' || pathname.startsWith('/auth') || pathname.startsWith('/admin')) {
    return null
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2 sm:bottom-6 sm:left-6">
      {open && !dismissed && (
        <div className="relative max-w-[260px] rounded-2xl border border-border bg-card/95 p-3 pr-7 text-xs shadow-xl backdrop-blur animate-in fade-in slide-in-from-bottom-2">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute right-1.5 top-1.5 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Dismiss"
          >
            <X size={12} />
          </button>
          <p className="font-semibold text-foreground">Need a website?</p>
          <p className="mt-0.5 text-muted-foreground">
            Chat with our AI consultant for a free personalized proposal in minutes.
          </p>
        </div>
      )}
      <Link
        to="/aiconsultation"
        aria-label="Chat with AI Sales Consultant"
        className="group flex items-center gap-2 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/30 transition hover:scale-105 hover:shadow-2xl"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <Sparkles size={18} />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-emerald-400 ring-2 ring-white" />
        </span>
        <span className="hidden sm:inline">AI Consultant</span>
        <MessageCircle size={16} className="sm:hidden" />
      </Link>
    </div>
  )
}