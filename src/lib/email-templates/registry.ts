import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

/**
 * Template registry — maps template names to their React Email components.
 * Import and register new templates here after creating them in this directory.
 *
 * Example:
 *   import { template as welcomeTemplate } from './welcome'
 *   // then add to TEMPLATES: 'welcome': welcomeTemplate
 */
import { template as contactConfirmation } from './contact-confirmation'
import { template as contactAdminAlert } from './contact-admin-alert'
import { template as proposalCustomer } from './proposal-customer'
import { template as proposalAdmin } from './proposal-admin'
import { template as bugReportAdmin } from './bug-report-admin'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-confirmation': contactConfirmation,
  'contact-admin-alert': contactAdminAlert,
  'proposal-customer': proposalCustomer,
  'proposal-admin': proposalAdmin,
  'bug-report-admin': bugReportAdmin,
}
