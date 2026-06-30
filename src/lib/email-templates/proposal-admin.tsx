import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'
import { RenderMarkdown } from './render-markdown'

interface Props {
  name?: string
  business_name?: string | null
  email?: string
  phone?: string | null
  business_type?: string | null
  proposal_markdown?: string
  transcript?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '640px' }
const heading = { color: '#0b1220', fontSize: '20px', margin: '0 0 12px' }
const label = {
  color: '#64748b',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  margin: '12px 0 2px',
}
const value = { color: '#0b1220', fontSize: '15px', margin: 0 }
const card = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px',
  marginTop: '8px',
  color: '#0b1220',
  fontSize: '14px',
  lineHeight: '1.6',
}

const Email = ({
  name,
  business_name,
  email,
  phone,
  business_type,
  proposal_markdown,
  transcript,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>AI Consultant lead — {name || 'New visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New AI Sales Consultant lead</Heading>
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>

          <Text style={label}>Business</Text>
          <Text style={value}>{business_name || '—'}</Text>

          <Text style={label}>Business type</Text>
          <Text style={value}>{business_type || '—'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>

          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>

          <Text style={label}>Proposal</Text>
          <div style={card}>
            {proposal_markdown ? <RenderMarkdown source={proposal_markdown} /> : '—'}
          </div>

          {transcript ? (
            <>
              <Text style={label}>Conversation transcript</Text>
              <div style={card}>{transcript}</div>
            </>
          ) : null}
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `AI lead — ${data?.name || 'New visitor'}${data?.business_name ? ` (${data.business_name})` : ''}`,
  displayName: 'Proposal (admin)',
  to: 'abdulwebagency@gmail.com',
  previewData: {
    name: 'Jane Doe',
    business_name: 'Acme Co',
    business_type: 'Perfume store',
    email: 'jane@example.com',
    phone: '+91 99999 99999',
    proposal_markdown: 'Abdul Web Agency\nWebsite Proposal\n...',
    transcript: 'User: ...\nAssistant: ...',
  },
} satisfies TemplateEntry