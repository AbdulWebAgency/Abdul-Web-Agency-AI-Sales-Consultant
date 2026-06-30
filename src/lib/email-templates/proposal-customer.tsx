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
  Link as EmailLink,
} from '@react-email/components'
import type { TemplateEntry } from './registry'
import { RenderMarkdown } from './render-markdown'

interface Props {
  name?: string
  business_name?: string | null
  proposal_markdown?: string
  calendly_url?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '640px' }
const heading = { color: '#0b1220', fontSize: '22px', margin: '0 0 8px' }
const text = { color: '#334155', fontSize: '15px', lineHeight: '1.6' }
const card = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px',
  marginTop: '12px',
  color: '#0b1220',
  fontSize: '14px',
  lineHeight: '1.6',
}
const cta = {
  display: 'inline-block',
  background: '#0ea5e9',
  color: '#ffffff',
  padding: '12px 20px',
  borderRadius: '999px',
  fontWeight: 600,
  textDecoration: 'none',
  marginTop: '16px',
}
const footer = { color: '#64748b', fontSize: '12px', marginTop: '24px' }

const Email = ({ name, business_name, proposal_markdown, calendly_url }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your website proposal from Abdul Web Agency</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Your Website Proposal</Heading>
        <Text style={text}>
          Hi{name ? ` ${name}` : ''}{business_name ? ` (${business_name})` : ''}, thanks for chatting
          with our AI Sales Consultant. Here is the personalized proposal we prepared for you.
        </Text>
        <div style={card}>
          {proposal_markdown ? <RenderMarkdown source={proposal_markdown} /> : '—'}
        </div>
        {calendly_url ? (
          <Section style={{ textAlign: 'center' }}>
            <Text style={{ ...text, marginTop: '20px' }}>
              If you'd like, schedule a free consultation to discuss the project in more detail:
            </Text>
            <EmailLink href={calendly_url} style={cta}>
              Book a free consultation
            </EmailLink>
          </Section>
        ) : null}
        <Text style={footer}>— Abdul, Abdul Web Agency</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `Your website proposal${data?.business_name ? ` — ${data.business_name}` : ''}`,
  displayName: 'Proposal (customer)',
  previewData: {
    name: 'Jane',
    business_name: 'Acme Co',
    proposal_markdown:
      'Abdul Web Agency\nWebsite Proposal\n\nPrepared For: Acme Co\n\n1. Project Summary\n...',
    calendly_url: 'https://calendly.com/abdulwebagency/30min',
  },
} satisfies TemplateEntry