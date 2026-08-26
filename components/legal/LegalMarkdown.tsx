import { Fragment } from 'react'
import { HEADING_SIZE_CLASSES } from '@/components/ui/Heading'
import { cn } from '@/lib/utils'

/**
 * Minimal markdown renderer for the legal documents.
 *
 * These files only use `##`/`###` headings, bullet lists, numbered clauses and
 * `**bold**`, so a full markdown pipeline would be more dependency than the
 * content needs. Bare email addresses become mailto links, matching how the FAQ
 * renders them.
 */

const EMAIL_SPLIT_REGEX = /([\w.+-]+@[\w-]+\.[\w.-]+)/g
/** Separate, non-global twin — a global regex is stateful and `.test()` alternates. */
const EMAIL_TEST_REGEX = /^[\w.+-]+@[\w-]+\.[\w.-]+$/
const BOLD_REGEX = /(\*\*[^*]+\*\*)/g
const ORDERED_CLAUSE_REGEX = /^(\d+(?:\.\d+)*\.)\s+(.*)$/

const LINK_CLASS = 'text-primary underline underline-offset-2 hover:no-underline'

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  return text.split(BOLD_REGEX).map((segment, boldIndex) => {
    const key = `${keyPrefix}-${boldIndex}`

    if (segment.startsWith('**') && segment.endsWith('**')) {
      return (
        <strong key={key} className="font-bold text-neutral-800">
          {segment.slice(2, -2)}
        </strong>
      )
    }

    return (
      <Fragment key={key}>
        {segment.split(EMAIL_SPLIT_REGEX).map((part, partIndex) =>
          EMAIL_TEST_REGEX.test(part) ? (
            <a key={`${key}-${partIndex}`} href={`mailto:${part}`} className={LINK_CLASS}>
              {part}
            </a>
          ) : (
            <Fragment key={`${key}-${partIndex}`}>{part}</Fragment>
          )
        )}
      </Fragment>
    )
  })
}

export default function LegalMarkdown({ content }: { content: string }) {
  const lines = content.split('\n')

  return (
    <div className="space-y-12">
      {lines.map((line, index) => {
        const key = `line-${index}`
        const trimmed = line.trim()

        if (!trimmed) return null

        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={key}
              className={cn('pt-16 font-heading text-secondary', HEADING_SIZE_CLASSES.md)}
            >
              {renderInline(trimmed.replace('### ', ''), key)}
            </h3>
          )
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={key}
              className={cn('pt-32 font-heading text-secondary', HEADING_SIZE_CLASSES.lg)}
            >
              {renderInline(trimmed.replace('## ', ''), key)}
            </h2>
          )
        }

        if (trimmed.startsWith('- ')) {
          return (
            <p
              key={key}
              className="relative pl-24 text-sm text-neutral-600 before:absolute before:left-8 before:text-primary before:content-['•'] md:text-base"
            >
              {renderInline(trimmed.slice(2), key)}
            </p>
          )
        }

        // Numbered clauses like "1." or "1.1." keep their marker in a hanging indent.
        const clause = trimmed.match(ORDERED_CLAUSE_REGEX)
        if (clause) {
          return (
            <p key={key} className="flex gap-12 text-sm text-neutral-600 md:text-base">
              <span className="shrink-0 font-medium text-neutral-700">{clause[1]}</span>
              <span>{renderInline(clause[2], key)}</span>
            </p>
          )
        }

        return (
          <p key={key} className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {renderInline(trimmed, key)}
          </p>
        )
      })}
    </div>
  )
}
