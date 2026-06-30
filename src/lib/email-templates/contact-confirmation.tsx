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
  requirements?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const heading = { color: '#0b1220', fontSize: '22px', margin: '0 0 12px' }
const text = { color: '#334155', fontSize: '15px', lineHeight: '1.6' }
const card = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '16px',
  marginTop: '16px',
  whiteSpace: 'pre-wrap' as const,
  color: '#0b1220',
  fontSize: '14px',
}
const footer = { color: '#64748b', fontSize: '12px', marginTop: '24px' }

const Email = ({ name, requirements }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for your enquiry — Abdul Web Agency</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thanks{name ? `, ${name}` : ''}!</Heading>
        <Text style={text}>
          Your enquiry has been received by Abdul Web Agency. I'll personally
          review your requirements and get back to you within 24 hours with next
          steps and a tailored quote.
        </Text>
        {requirements ? (
          <Section>
            <Text style={{ ...text, fontWeight: 600, marginBottom: 4 }}>
              Your message:
            </Text>
            <div style={card}>{requirements}</div>
          </Section>
        ) : null}
        <Text style={text}>
          Need something urgent? Reply to this email or message me on WhatsApp.
        </Text>
        <Text style={footer}>— Abdul, Abdul Web Agency</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'We received your enquiry — Abdul Web Agency',
  displayName: 'Contact confirmation (customer)',
  previewData: { name: 'Jane', requirements: 'I need a business website.' },
} satisfies TemplateEntry