import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const feedbackSchema = z.object({
  type: z.literal('feedback'),
  message: z.string().trim().min(2).max(5000),
  rating: z.number().int().min(1).max(5).optional().nullable(),
  conversation_id: z.string().trim().max(200).optional().nullable(),
  user_agent: z.string().trim().max(500).optional().nullable(),
  page_url: z.string().trim().max(500).optional().nullable(),
})

const bugSchema = z.object({
  type: z.literal('bug'),
  description: z.string().trim().min(5).max(5000),
  // base64 data URL of screenshot, required
  screenshot_data_url: z
    .string()
    .trim()
    .regex(/^data:image\/(png|jpeg|jpg|webp|gif);base64,/i, 'Screenshot must be a PNG/JPEG/WEBP/GIF image'),
  screenshot_filename: z.string().trim().max(200).optional().nullable(),
  conversation_id: z.string().trim().max(200).optional().nullable(),
  last_messages: z.string().trim().max(8000).optional().nullable(),
  user_agent: z.string().trim().max(500).optional().nullable(),
  page_url: z.string().trim().max(500).optional().nullable(),
})

const schema = z.discriminatedUnion('type', [feedbackSchema, bugSchema])

function dataUrlToBytes(dataUrl: string): { bytes: Uint8Array; contentType: string; ext: string } {
  const match = dataUrl.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i)
  if (!match) throw new Error('Invalid data URL')
  const contentType = match[1].toLowerCase()
  const b64 = match[2]
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  const ext = contentType.split('/')[1].replace('jpeg', 'jpg')
  return { bytes, contentType, ext }
}

export const Route = createFileRoute('/api/public/feedback-submit')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = schema.safeParse(body)
        if (!parsed.success) {
          return Response.json(
            { error: parsed.error.issues[0]?.message || 'Invalid input' },
            { status: 400 },
          )
        }
        const data = parsed.data

        const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

        if (data.type === 'feedback') {
          const { error } = await supabaseAdmin.from('feedback').insert({
            message: data.message,
            rating: data.rating ?? null,
            conversation_id: data.conversation_id ?? null,
            user_agent: data.user_agent ?? null,
            page_url: data.page_url ?? null,
          })
          if (error) {
            console.error('feedback insert failed', error)
            return Response.json({ error: 'Failed to save feedback' }, { status: 500 })
          }
          return Response.json({ success: true })
        }

        // Bug report → upload screenshot then email admin.
        let screenshotUrl: string | null = null
        try {
          const { bytes, contentType, ext } = dataUrlToBytes(data.screenshot_data_url)
          if (bytes.byteLength > 8 * 1024 * 1024) {
            return Response.json({ error: 'Screenshot must be 8MB or smaller' }, { status: 400 })
          }
          const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`
          const { error: upErr } = await supabaseAdmin.storage
            .from('bug-screenshots')
            .upload(path, bytes, { contentType, upsert: false })
          if (upErr) {
            console.error('bug screenshot upload failed', upErr)
            return Response.json({ error: 'Failed to upload screenshot' }, { status: 500 })
          }
          // Long-lived signed URL (1 year)
          const { data: signed } = await supabaseAdmin.storage
            .from('bug-screenshots')
            .createSignedUrl(path, 60 * 60 * 24 * 365)
          screenshotUrl = signed?.signedUrl ?? null
        } catch (err) {
          console.error('bug screenshot processing failed', err)
          return Response.json({ error: 'Invalid screenshot' }, { status: 400 })
        }

        const { enqueueTemplateEmail } = await import('@/lib/email/enqueue.server')
        const res = await enqueueTemplateEmail({
          templateName: 'bug-report-admin',
          idempotencyKey: `bug-${crypto.randomUUID()}`,
          templateData: {
            description: data.description,
            screenshot_url: screenshotUrl,
            conversation_id: data.conversation_id ?? null,
            last_messages: data.last_messages ?? null,
            user_agent: data.user_agent ?? null,
            page_url: data.page_url ?? null,
            submitted_at: new Date().toISOString(),
          },
        })
        if (!res.success) {
          console.error('bug email enqueue failed', res)
          return Response.json({ error: 'Failed to send bug report email' }, { status: 500 })
        }
        return Response.json({ success: true })
      },
    },
  },
})