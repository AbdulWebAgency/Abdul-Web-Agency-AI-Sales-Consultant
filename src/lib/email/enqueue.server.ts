import * as React from 'react'
import { render as renderAsync } from '@react-email/components'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'abdulwebagency'
const SENDER_DOMAIN = 'notify.abdulwebagency.online'
const FROM_DOMAIN = 'abdulwebagency.online'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function enqueueTemplateEmail(opts: {
  templateName: string
  recipientEmail?: string
  replyTo?: string
  templateData?: Record<string, any>
  idempotencyKey?: string
}): Promise<{ success: boolean; reason?: string; error?: string }> {
  const { templateName, recipientEmail, replyTo, templateData = {}, idempotencyKey } = opts
  const template = TEMPLATES[templateName]
  if (!template) return { success: false, error: `Template '${templateName}' not found` }

  const effectiveRecipient = template.to || recipientEmail
  if (!effectiveRecipient) return { success: false, error: 'recipientEmail required' }

  const messageId = crypto.randomUUID()
  const idemKey = idempotencyKey || messageId
  const supabase = supabaseAdmin

  // Suppression check
  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', effectiveRecipient.toLowerCase())
    .maybeSingle()
  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: 'suppressed',
    })
    return { success: false, reason: 'email_suppressed' }
  }

  // Unsubscribe token (one per email)
  const normalized = effectiveRecipient.toLowerCase()
  let unsubscribeToken: string
  const { data: existingToken } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalized)
    .maybeSingle()
  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token
  } else {
    unsubscribeToken = generateToken()
    await supabase
      .from('email_unsubscribe_tokens')
      .upsert(
        { token: unsubscribeToken, email: normalized },
        { onConflict: 'email', ignoreDuplicates: true }
      )
    const { data: stored } = await supabase
      .from('email_unsubscribe_tokens')
      .select('token')
      .eq('email', normalized)
      .maybeSingle()
    if (stored?.token) unsubscribeToken = stored.token
  }

  // Render
  const element = React.createElement(template.component, templateData)
  const html = await renderAsync(element)
  const plainText = await renderAsync(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: effectiveRecipient,
    status: 'pending',
  })

  const { error: enqueueError } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${SENDER_DOMAIN}>`,
      reply_to: replyTo || `abdulwebagency@gmail.com`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text: plainText,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idemKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (enqueueError) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: 'failed',
      error_message: enqueueError.message,
    })
    return { success: false, error: enqueueError.message }
  }
  return { success: true }
}