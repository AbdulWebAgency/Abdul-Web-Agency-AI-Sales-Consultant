import { createFileRoute } from '@tanstack/react-router'
import { AIConsultantChat } from '@/components/site/AIConsultantChat'

export const Route = createFileRoute('/aiconsultation')({
  head: () => ({
    meta: [
      { title: 'AI Sales Consultant — Abdul Web Agency' },
      {
        name: 'description',
        content:
          "Chat with Abdul Web Agency's AI Sales Consultant. Share your business details, get a personalized website proposal, and book a free consultation.",
      },
      { name: 'robots', content: 'noindex, follow' },
    ],
  }),
  component: AiConsultationPage,
})

function AiConsultationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <AIConsultantChat />
    </main>
  )
}