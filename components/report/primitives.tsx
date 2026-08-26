import { cn } from '@/lib/utils'

/**
 * Building blocks that reproduce the chrome of a real CredMatrix assessment
 * report. Colours are lifted from the PDF itself (Tailwind slate/blue-600 with
 * emerald / amber / red accents) so the replica reads as the same document.
 *
 * These are presentational only — the report shown on the anatomy page is a
 * static, fully masked sample, not live data.
 */

/**
 * Stands in for a value that identifies the assessed entity. Rendered as a
 * striped bar rather than blanked out so the reader can still see that a field
 * exists and roughly how much it holds.
 */
export function Redacted({
  width = 10,
  tone = 'dark',
  className,
}: {
  /** Bar width in `ch`, matched to the length of the value it replaces. */
  width?: number
  /** `dark` for bars on white paper, `light` for bars on the blue banner. */
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label="Masked value"
      title="Masked — entity details removed from this sample"
      className={cn(
        'inline-block h-[0.85em] rounded-sm align-[-0.1em]',
        tone === 'dark' ? 'bg-slate-200' : 'bg-white/25',
        className
      )}
      style={{
        width: `${width}ch`,
        backgroundImage: `repeating-linear-gradient(-45deg, transparent 0 3px, ${
          tone === 'dark' ? 'rgba(100,116,139,.35)' : 'rgba(255,255,255,.45)'
        } 3px 6px)`,
      }}
    />
  )
}

/** The white "paper" the report is printed on. */
export function ReportSheet({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card',
        className
      )}
    >
      {children}
    </div>
  )
}

/** Blue tick + label + rule. The report's standard section heading. */
export function SectionBar({
  children,
  right,
}: {
  children: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex items-center gap-8 border-b-2 border-blue-600 pb-4">
      <span className="h-[14px] w-[3px] shrink-0 rounded-full bg-blue-600" />
      {/* font-sans: globals.css sets a serif face on every h1-h6, but the
          report itself is entirely sans-serif. */}
      <h4 className="flex-1 font-sans text-[11px] font-bold tracking-tight text-slate-800 md:text-xs">
        {children}
      </h4>
      {right}
    </div>
  )
}

const PILL_TONES = {
  blue: 'bg-blue-600 text-white',
  red: 'bg-red-100 text-red-700',
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-emerald-100 text-emerald-700',
  slate: 'bg-slate-100 text-slate-600',
} as const

export function Pill({
  tone = 'slate',
  children,
}: {
  tone?: keyof typeof PILL_TONES
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-sm px-8 py-[2px] text-[9px] font-bold leading-tight md:text-[10px]',
        PILL_TONES[tone]
      )}
    >
      {children}
    </span>
  )
}

/**
 * The report's dense data table: blue header, zebra body, horizontal scroll on
 * narrow screens so the grid never collapses into something unreadable.
 */
export function ReportTable({
  headers,
  rows,
  totals,
  /** Column indexes (after the first) that should render right-aligned. */
  numericFrom = 1,
}: {
  headers: React.ReactNode[]
  rows: React.ReactNode[][]
  totals?: React.ReactNode[]
  numericFrom?: number
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <table className="w-full min-w-[520px] border-collapse text-[10px] md:text-[11px]">
        <thead>
          <tr className="bg-blue-600 text-white">
            {headers.map((h, i) => (
              <th
                key={i}
                scope="col"
                className={cn(
                  'px-8 py-4 font-bold uppercase tracking-wide',
                  i >= numericFrom ? 'text-right' : 'text-left'
                )}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr
              key={r}
              className={cn(
                'border-b border-slate-200',
                r % 2 ? 'bg-slate-50' : 'bg-white'
              )}
            >
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={cn(
                    'px-8 py-4 text-slate-700',
                    c >= numericFrom ? 'text-right tabular-nums' : 'text-left'
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr className="bg-slate-100 font-bold">
              {totals.map((cell, c) => (
                <td
                  key={c}
                  className={cn(
                    'px-8 py-4 text-slate-800',
                    c >= numericFrom ? 'text-right tabular-nums' : 'text-left'
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

/**
 * The tinted, left-ruled callouts stacked inside every insight card
 * (Metrics / Industry Context / Credit Implication / Recommendation).
 */
const CALLOUT_TONES = {
  blue: 'bg-blue-50 border-blue-600 text-slate-700',
  slate: 'bg-slate-50 border-slate-400 text-slate-700',
  amber: 'bg-amber-100 border-amber-600 text-amber-900',
  green: 'bg-emerald-100 border-emerald-600 text-emerald-900',
} as const

export function Callout({
  label,
  tone,
  children,
}: {
  label: string
  tone: keyof typeof CALLOUT_TONES
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'border-l-2 px-8 py-4 text-[10px] leading-relaxed md:text-[11px]',
        CALLOUT_TONES[tone]
      )}
    >
      <span className="font-bold">{label}:</span> {children}
    </div>
  )
}
