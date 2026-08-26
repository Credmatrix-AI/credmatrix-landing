import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HEADING_SIZE_CLASSES } from '@/components/ui/Heading'
import { getHeadingOutline, strapiMedia } from '@/lib/strapi'
import { cn } from '@/lib/utils'
import type {
  BlockNode,
  BlocksContent,
  InlineNode,
  ListBlock,
  ListItemBlock,
} from '@/types/blog'

/**
 * Renderer for Strapi's "Rich text (Blocks)" field.
 *
 * Written in-house rather than pulled from a package so the output uses this
 * site's spacing/type scale instead of generic prose defaults, and so article
 * bodies stay server-rendered with no client JS.
 */

function renderInline(nodes: InlineNode[], keyPrefix: string): React.ReactNode {
  return nodes.map((node, index) => {
    const key = `${keyPrefix}-${index}`

    if (node.type === 'link') {
      const isInternal = node.url.startsWith('/')
      const className =
        'text-primary underline underline-offset-2 hover:text-primary-dark transition-colors'

      if (isInternal) {
        return (
          <Link key={key} href={node.url} className={className}>
            {renderInline(node.children, key)}
          </Link>
        )
      }

      return (
        <a
          key={key}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {renderInline(node.children, key)}
        </a>
      )
    }

    if (!node.text) return null

    const isPlain =
      !node.code && !node.bold && !node.italic && !node.underline && !node.strikethrough

    // Unstyled runs are the common case — emit the text directly rather than
    // wrapping every one in a throwaway <span>.
    if (isPlain) return <Fragment key={key}>{node.text}</Fragment>

    let content: React.ReactNode = node.text

    if (node.code) {
      content = (
        <code className="rounded-sm bg-neutral-100 px-8 py-4 font-mono text-sm text-secondary">
          {content}
        </code>
      )
    }
    if (node.bold) content = <strong className="font-bold text-neutral-800">{content}</strong>
    if (node.italic) content = <em className="italic">{content}</em>
    if (node.underline) content = <u>{content}</u>
    if (node.strikethrough) content = <s>{content}</s>

    return <span key={key}>{content}</span>
  })
}

/**
 * Body headings sit on the same type scale as the rest of the site.
 *
 * Space above a heading is roughly 3× the space below it, so each heading binds
 * to the text it introduces rather than floating between two blocks (proximity).
 */
const HEADING_CLASSES: Record<number, string> = {
  1: `${HEADING_SIZE_CLASSES.xl} mt-64 mb-16`,
  2: `${HEADING_SIZE_CLASSES.lg} mt-64 mb-16`,
  3: `${HEADING_SIZE_CLASSES.md} mt-48 mb-12`,
  4: `${HEADING_SIZE_CLASSES.sm} mt-32 mb-12`,
  5: `${HEADING_SIZE_CLASSES.xs} mt-32 mb-8`,
  6: `${HEADING_SIZE_CLASSES.xs} mt-32 mb-8`,
}

function renderList(block: ListBlock, key: string, depth = 0): React.ReactNode {
  const Tag = block.format === 'ordered' ? 'ol' : 'ul'

  return (
    <Tag
      key={key}
      className={cn(
        'my-16 space-y-8 pl-24 text-base text-neutral-600 leading-relaxed',
        block.format === 'ordered' ? 'list-decimal' : 'list-disc',
        depth > 0 && 'my-8'
      )}
    >
      {block.children.map((child, index) => {
        const childKey = `${key}-${index}`

        // Strapi nests a `list` directly inside `children` for sub-lists.
        if (child.type === 'list') {
          return renderList(child as ListBlock, childKey, depth + 1)
        }

        const item = child as ListItemBlock
        return (
          <li key={childKey} className="marker:text-primary">
            {renderInline(item.children, childKey)}
          </li>
        )
      })}
    </Tag>
  )
}

function renderBlock(
  block: BlockNode,
  index: number,
  headingIds: Map<number, string>
): React.ReactNode {
  const key = `block-${index}`

  switch (block.type) {
    case 'heading': {
      const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <Tag
          key={key}
          id={headingIds.get(index)}
          // Clears the sticky site header when jumped to from the table of contents
          className={cn(
            'scroll-mt-80 font-heading tracking-tight text-secondary first:mt-0',
            HEADING_CLASSES[block.level]
          )}
        >
          {renderInline(block.children, key)}
        </Tag>
      )
    }

    case 'quote':
      return (
        <blockquote
          key={key}
          className="my-32 border-l-4 border-primary bg-accent-blue/40 px-24 py-16 text-base italic text-secondary md:text-lg"
        >
          {renderInline(block.children, key)}
        </blockquote>
      )

    case 'code':
      return (
        <pre
          key={key}
          className="my-32 overflow-x-auto rounded-lg bg-secondary px-24 py-16 text-sm text-neutral-100"
        >
          <code className="font-mono">
            {block.children.map((child) => child.text).join('')}
          </code>
        </pre>
      )

    case 'image': {
      const src = strapiMedia(block.image?.url)
      if (!src) return null

      return (
        <figure key={key} className="my-32">
          <Image
            src={src}
            alt={block.image.alternativeText ?? ''}
            width={block.image.width || 1200}
            height={block.image.height || 675}
            className="w-full rounded-lg"
            sizes="(min-width: 768px) 720px, 100vw"
          />
          {block.image.alternativeText && (
            <figcaption className="mt-8 text-center text-sm text-neutral-500">
              {block.image.alternativeText}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'list':
      return renderList(block, key)

    case 'paragraph': {
      // Strapi emits an empty paragraph for a blank line — render nothing.
      const isEmpty = block.children.every(
        (child) => child.type === 'text' && !child.text.trim()
      )
      if (isEmpty) return null

      return (
        <p key={key} className="mt-24 text-base leading-relaxed text-neutral-600 first:mt-0 md:text-lg">
          {renderInline(block.children, key)}
        </p>
      )
    }

    default:
      return null
  }
}

export default function RichText({ content }: { content: BlocksContent | null | undefined }) {
  if (!content?.length) return null

  // Same helper the table of contents uses, so anchor ids always match.
  const headingIds = new Map(
    getHeadingOutline(content).map((item) => [item.blockIndex, item.id])
  )

  return <div>{content.map((block, index) => renderBlock(block, index, headingIds))}</div>
}
