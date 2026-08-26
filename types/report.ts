/**
 * Shapes for the masked sample report rendered on /credit-report-anatomy.
 *
 * These mirror the real CredMatrix assessment report so the anatomy page can
 * reproduce it section for section. Every entity-identifying value is either
 * redacted (see `Redacted`) or replaced with an illustrative figure.
 */

/** Drives the accent colour on insight cards and impact pills. */
export type ImpactLevel = 'high' | 'medium' | 'positive'

/** Traffic-light styling for the header badges and severity pills. */
export type RiskTone = 'amber' | 'green' | 'red' | 'neutral'

export interface FactRow {
  label: string
  /** Omit when the value is fully redacted. */
  value?: string
  /** Secondary line rendered under the value, e.g. "(Current)". */
  note?: string
  /** Width of the redaction bar, in `ch`. Set this instead of `value`. */
  redactedWidth?: number
  tone?: RiskTone
}

export interface FactCard {
  title: string
  rows: FactRow[]
}

export interface CreditInsight {
  index: number
  title: string
  category: string
  impact: ImpactLevel
  body: string
  metrics: string
  industryContext: string
  creditImplication: string
  recommendation: string
}

export interface FinancialRow {
  metric: string
  unit: string
  values: [string, string, string, string]
}

/** One annotated step of the walkthrough. */
export interface ReportSectionNote {
  id: string
  /** Zero-padded step number shown in the margin, e.g. "01". */
  step: string
  title: string
  /** What the section physically contains. */
  shows: string
  /** How a credit decision-maker should read it. */
  tells: string
}
