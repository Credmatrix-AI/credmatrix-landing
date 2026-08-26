import Image from 'next/image'
import { cn } from '@/lib/utils'
import { CreditInsight, FactCard, FinancialRow, ImpactLevel } from '@/types/report'
import { Callout, Pill, Redacted, ReportTable, SectionBar } from './primitives'
import {
  ABOUT_BULLETS,
  FINANCIAL_YEARS,
  GST_AGING_HEADERS,
  GST_FILINGS,
  GST_TOTALS,
  PF_PAYMENTS,
  REPORT_META,
} from '@/constants/sampleReport'

/* ------------------------------------------------------------------ *
 * 01 — Masthead: risk / score / limit
 * ------------------------------------------------------------------ */

function ScoreBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="mb-4 text-[8px] font-bold uppercase tracking-widest text-slate-500 md:text-[9px]">
        {label}
      </p>
      <div className="rounded-sm bg-gradient-to-b from-amber-500 to-amber-600 px-12 py-4 text-[11px] font-bold text-white md:text-sm">
        {value}
      </div>
    </div>
  )
}

export function ReportMasthead() {
  return (
    <div className="border-b-2 border-blue-600 px-12 py-12 md:px-16">
      <div className="flex flex-wrap items-start justify-between gap-16">
        <div>
          <Image
            src="/credmatrix-logo.svg"
            alt="CredMatrix"
            width={128}
            height={26}
            className="h-20 w-auto md:h-24"
          />
          <p className="mt-8 text-[8px] font-medium tracking-wider text-slate-400 md:text-[9px]">
            CRED-<Redacted width={12} className="!h-[0.7em]" />
          </p>
        </div>

        <div className="hidden text-center text-[9px] leading-relaxed text-slate-500 sm:block md:text-[10px]">
          <p>{REPORT_META.generatedAt}</p>
          <p className="text-blue-600">
            <Redacted width={14} className="!h-[0.7em]" /> | CredMatrix
          </p>
        </div>

        <div className="flex items-end gap-8 md:gap-12">
          <ScoreBadge label="Risk" value={REPORT_META.risk} />
          <ScoreBadge label="Score" value={REPORT_META.score} />
          <ScoreBadge label="Limit" value={REPORT_META.limit} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * 02 — Entity banner + fact cards
 * ------------------------------------------------------------------ */

export function EntityBanner() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-12 rounded-sm bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] px-12 py-12 md:px-16">
      <div className="min-w-0">
        <p className="text-sm font-bold uppercase tracking-tight text-white md:text-base">
          <Redacted width={20} tone="light" /> Private Limited
        </p>
        <p className="mt-4 text-[10px] text-blue-100 md:text-xs">
          <Redacted width={14} tone="light" />
        </p>
      </div>
      <div className="flex items-center gap-8">
        <span className="rounded-sm bg-white/20 px-8 py-4 text-[8px] font-bold leading-tight text-white md:text-[10px]">
          {REPORT_META.constitution}
          <br />
          {REPORT_META.listingStatus}
        </span>
        <span className="rounded-sm bg-emerald-600 px-8 py-4 text-[10px] font-bold text-white md:text-xs">
          {REPORT_META.vintage}
        </span>
      </div>
    </div>
  )
}

const TONE_TEXT = {
  green: 'text-emerald-600',
  red: 'text-red-600',
  amber: 'text-amber-600',
  neutral: 'text-slate-800',
} as const

function FactCardBlock({ card }: { card: FactCard }) {
  return (
    <div className="rounded-sm border border-slate-200 p-8">
      <div className="mb-8 flex items-center gap-4 border-b border-slate-200 pb-4">
        <span className="h-8 w-[2px] shrink-0 rounded-full bg-blue-600" />
        <p className="text-[9px] font-bold uppercase tracking-wide text-slate-800 md:text-[10px]">
          {card.title}
        </p>
      </div>
      <dl className="space-y-8">
        {card.rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-8">
            <dt className="text-[9px] text-slate-500 md:text-[10px]">{row.label}</dt>
            <dd
              className={cn(
                'text-right text-[9px] font-semibold md:text-[10px]',
                row.tone === 'amber'
                  ? 'rounded-sm bg-amber-100 px-4 text-amber-700'
                  : TONE_TEXT[row.tone ?? 'neutral']
              )}
            >
              {row.value ?? <Redacted width={row.redactedWidth ?? 10} />}
              {row.note && (
                <span className="block font-normal text-slate-400">{row.note}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function FactCards({ cards }: { cards: FactCard[] }) {
  return (
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {cards.map((card) => (
        <FactCardBlock key={card.title} card={card} />
      ))}
    </div>
  )
}

export function CreditRatingRow() {
  return (
    <SectionBar
      right={
        <span className="text-[11px] font-bold text-blue-600 md:text-xs">
          {REPORT_META.creditRating}
        </span>
      }
    >
      Credit Rating
    </SectionBar>
  )
}

/** Pure entity description — masked wholesale, shown only for its shape. */
export function AboutBlock() {
  return (
    <div className="rounded-sm border border-slate-200 p-12">
      <p className="mb-8 text-[9px] font-bold uppercase tracking-wide text-slate-800 md:text-[10px]">
        About
      </p>
      <ul className="space-y-8">
        {ABOUT_BULLETS.map((widths, i) => (
          <li key={i} className="flex gap-8 text-[10px] leading-relaxed">
            <span className="text-slate-400">•</span>
            <span className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {widths.map((w, j) => (
                <Redacted key={j} width={w} />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * 03 — AI-powered credit insights
 * ------------------------------------------------------------------ */

const IMPACT_STYLES: Record<
  ImpactLevel,
  { rail: string; sheet: string; pill: 'red' | 'amber' | 'green'; label: string }
> = {
  high: { rail: 'bg-red-600', sheet: 'bg-[#FFFBFB]', pill: 'red', label: 'High Impact' },
  medium: { rail: 'bg-amber-600', sheet: 'bg-[#FFFEF5]', pill: 'amber', label: 'Medium Impact' },
  positive: { rail: 'bg-emerald-600', sheet: 'bg-[#F6FFFB]', pill: 'green', label: 'Positive Impact' },
}

export function InsightCard({ insight }: { insight: CreditInsight }) {
  const style = IMPACT_STYLES[insight.impact]

  return (
    <article
      className={cn(
        'flex overflow-hidden rounded-sm border border-slate-200',
        style.sheet
      )}
    >
      <span className={cn('w-4 shrink-0', style.rail)} aria-hidden />
      <div className="min-w-0 flex-1 p-12">
        <div className="mb-8 flex items-start gap-8">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
            {insight.index}
          </span>
          <h5 className="font-sans text-[11px] font-bold leading-snug text-slate-800 md:text-xs">
            {insight.title}
          </h5>
        </div>

        <div className="mb-8 flex flex-wrap gap-4 pl-24">
          <Pill tone="blue">{insight.category}</Pill>
          <Pill tone={style.pill}>{style.label}</Pill>
        </div>

        <p className="mb-8 text-[10px] leading-relaxed text-slate-700 md:text-[11px]">
          {insight.body}
        </p>

        <div className="space-y-4">
          <Callout label="Metrics" tone="blue">
            {insight.metrics}
          </Callout>
          <Callout label="Industry Context" tone="slate">
            {insight.industryContext}
          </Callout>
          <Callout label="Credit Implication" tone="amber">
            {insight.creditImplication}
          </Callout>
          <Callout label="Recommendation" tone="green">
            {insight.recommendation}
          </Callout>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ *
 * 04 — Comforts & discomforts
 * ------------------------------------------------------------------ */

function BalanceColumn({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'green' | 'red'
}) {
  const isGood = tone === 'green'
  return (
    <div
      className={cn(
        'overflow-hidden rounded-sm border',
        isGood ? 'border-emerald-200' : 'border-red-200'
      )}
    >
      <p
        className={cn(
          'px-12 py-8 text-[9px] font-bold uppercase tracking-wide md:text-[10px]',
          isGood
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-red-100 text-red-700'
        )}
      >
        {isGood ? '✓' : '✗'} {title}
      </p>
      <ul className="space-y-8 p-12">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-8 text-[10px] leading-relaxed text-slate-700 md:text-[11px]"
          >
            <span className="text-slate-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ComfortsDiscomforts({
  comforts,
  discomforts,
}: {
  comforts: string[]
  discomforts: string[]
}) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <BalanceColumn title="Comforts" items={comforts} tone="green" />
      <BalanceColumn title="Discomforts" items={discomforts} tone="red" />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * 05 — Filing and payment behaviour
 * ------------------------------------------------------------------ */

export function GstFilingTable() {
  return (
    <ReportTable
      headers={['GSTIN & State', 'Return Type', 'Latest Filing', ...GST_AGING_HEADERS]}
      numericFrom={3}
      rows={GST_FILINGS.map((f) => [
        <Redacted key="gstin" width={13} />,
        f.returnType,
        f.period,
        ...f.aging,
      ])}
      totals={['Total', '', '-', ...GST_TOTALS]}
    />
  )
}

export function PfPaymentTable() {
  return (
    <ReportTable
      headers={['Wage Month', 'Employees', 'Amount (₹ Cr)', 'Due Date', 'Timeliness']}
      numericFrom={1}
      rows={PF_PAYMENTS.map((p) => [
        p.month,
        p.employees,
        p.amount,
        p.due,
        <span
          key="status"
          className={cn(
            'font-bold',
            p.status === 'Paid on Time' ? 'text-emerald-600' : 'text-red-600'
          )}
        >
          {p.status}
        </span>,
      ])}
    />
  )
}

/* ------------------------------------------------------------------ *
 * 06 — Financial analysis
 * ------------------------------------------------------------------ */

export function FinancialTable({ rows }: { rows: FinancialRow[] }) {
  return (
    <ReportTable
      headers={['Metric', 'Unit', ...FINANCIAL_YEARS]}
      numericFrom={1}
      rows={rows.map((r) => [r.metric, r.unit, ...r.values])}
    />
  )
}
