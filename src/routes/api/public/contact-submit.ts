import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { enqueueTemplateEmail } from '@/lib/email/enqueue.server'

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  business_name: z.string().trim().max(200).optional().nullable(),
  phone: z.string().trim().min(4).max(30),
  email: z.string().trim().email().max(320),
  requirements: z.string().trim().min(5).max(5000),
})

export const Route = createFileRoute('/api/public/contact-submit')({
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
            { status: 400 }
          )
        }
        const data = parsed.data

        const { data: inserted, error: insertError } = await supabaseAdmin
          .from('contact_submissions')
          .insert({
            name: data.name,
            business_name: data.business_name || null,
            phone: data.phone,
            email: data.email,
            requirements: data.requirements,
          })
          .select('id')
          .single()

        if (insertError) {
          console.error('contact_submissions insert failed', insertError)
          return Response.json({ error: 'Failed to save enquiry' }, { status: 500 })
        }

        const submissionId = inserted?.id ?? crypto.randomUUID()

        // Fire both emails; don't fail the whole request if one fails.
        const [customerRes, adminRes] = await Promise.allSettled([
          enqueueTemplateEmail({
            templateName: 'contact-confirmation',
            recipientEmail: data.email,
            replyTo: 'abdulwebagency@gmail.com',
            idempotencyKey: `contact-confirm-${submissionId}`,
            templateData: {
              name: data.name,
              requirements: data.requirements,
            },
          }),
          enqueueTemplateEmail({
            templateName: 'contact-admin-alert',
            replyTo: data.email,
            idempotencyKey: `contact-admin-${submissionId}`,
            templateData: data,
          }),
        ])

        if (customerRes.status === 'rejected') console.error('customer email error', customerRes.reason)
        if (adminRes.status === 'rejected') console.error('admin email error', adminRes.reason)

        return Response.json({ success: true })
      },
    },
  },
})