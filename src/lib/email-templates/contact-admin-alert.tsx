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

interface Props {
  name?: string
  business_name?: string | null
  phone?: string
  email?: string
  requirements?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const heading = { color: '#0b1220', fontSize: '20px', margin: '0 0 12px' }
const label = { color: '#64748b', fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '12px 0 2px' }
const value = { color: '#0b1220', fontSize: '15px', margin: 0 }
const card = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px',
  marginTop: '8px',
  whiteSpace: 'pre-wrap' as const,
  color: '#0b1220',
  fontSize: '14px',
}

const Email = ({ name, business_name, phone, email, requirements }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enquiry from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New website enquiry</Heading>
        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>

          <Text style={label}>Business</Text>
          <Text style={value}>{business_name || '—'}</Text>

          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>

          <Text style={label}>Requirements</Text>
          <div style={card}>{requirements || '—'}</div>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New enquiry — ${data?.name || 'Website visitor'}`,
  displayName: 'Contact admin alert',
  to: 'abdulwebagency@gmail.com',
  previewData: {
    name: 'Jane Doe',
    business_name: 'Acme Co',
    phone: '+91 99999 99999',
    email: 'jane@example.com',
    requirements: 'Need an e-commerce website with UPI payments.',
  },
} satisfies TemplateEntry