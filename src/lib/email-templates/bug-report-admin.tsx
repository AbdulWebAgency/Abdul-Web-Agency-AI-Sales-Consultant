import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  description?: string
  screenshot_url?: string | null
  conversation_id?: string | null
  last_messages?: string | null
  user_agent?: string | null
  page_url?: string | null
  submitted_at?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '640px' }
const heading = { color: '#0b1220', fontSize: '20px', margin: '0 0 12px' }
const label = {
  color: '#64748b',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  margin: '14px 0 2px',
}
const value = { color: '#0b1220', fontSize: '14px', margin: 0, lineHeight: '1.6' }
const card = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '14px',
  marginTop: '6px',
  color: '#0b1220',
  fontSize: '14px',
  lineHeight: '1.6',
  whiteSpace: 'pre-wrap' as const,
}
const imageStyle = {
  marginTop: '10px',
  maxWidth: '100%',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
}

const Email = ({
  description,
  screenshot_url,
  conversation_id,
  last_messages,
  user_agent,
  page_url,
  submitted_at,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New bug report from your website</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>🐞 New bug report</Heading>
        <Section>
          <Text style={label}>Date &amp; time</Text>
          <Text style={value}>{submitted_at || new Date().toISOString()}</Text>

          <Text style={label}>Description</Text>
          <div style={card}>{description || '—'}</div>

          {screenshot_url ? (
            <>
              <Text style={label}>Screenshot</Text>
              <Img src={screenshot_url} alt="Bug screenshot" style={imageStyle} />
              <Text style={{ ...value, marginTop: '6px', fontSize: '12px' }}>
                <Link href={screenshot_url}>Open full image</Link>
              </Text>
            </>
          ) : null}

          <Text style={label}>Conversation ID</Text>
          <Text style={value}>{conversation_id || '—'}</Text>

          {last_messages ? (
            <>
              <Text style={label}>Last AI messages</Text>
              <div style={card}>{last_messages}</div>
            </>
          ) : null}

          <Text style={label}>Browser / User agent</Text>
          <Text style={value}>{user_agent || '—'}</Text>

          <Text style={label}>Page URL</Text>
          <Text style={value}>{page_url || '—'}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Bug report from Abdul Web Agency website',
  displayName: 'Bug report (admin)',
  to: 'abdulwebagency@gmail.com',
  previewData: {
    description: 'The submit button does nothing on mobile.',
    screenshot_url: 'https://example.com/bug.png',
    conversation_id: 'abc-123',
    last_messages: 'User: ...\nAssistant: ...',
    user_agent: 'Mozilla/5.0 ...',
    page_url: 'https://abdulwebagency.online/aiconsultation',
    submitted_at: new Date().toISOString(),
  },
} satisfies TemplateEntry