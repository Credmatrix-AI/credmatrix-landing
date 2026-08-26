/**
 * Types mirroring the Strapi 5 content model.
 *
 * Strapi 5 returns flattened entries (no `attributes` wrapper) and identifies
 * entries by `documentId` rather than the numeric `id`.
 */

export interface StrapiImageFormat {
  url: string
  width: number
  height: number
}

export interface StrapiImage {
  id: number
  documentId: string
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  } | null
}

export interface Category {
  id: number
  documentId: string
  name: string
  slug: string
  description?: string | null
}

export interface Author {
  id: number
  documentId: string
  name: string
  role?: string | null
  bio?: string | null
  avatar?: StrapiImage | null
}

export interface Seo {
  id?: number
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: StrapiImage | null
}

export interface Article {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt?: string | null
  body?: BlocksContent | null
  cover?: StrapiImage | null
  category?: Category | null
  author?: Author | null
  featured?: boolean
  publishedAt: string
  updatedAt: string
  seo?: Seo | null
}

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiCollectionResponse<T> {
  data: T[]
  meta: { pagination: StrapiPagination }
}

/* ------------------------------------------------------------------ */
/* Rich text (Blocks) field                                            */
/* ------------------------------------------------------------------ */

export interface TextInline {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export interface LinkInline {
  type: 'link'
  url: string
  children: TextInline[]
}

export type InlineNode = TextInline | LinkInline

export interface ParagraphBlock {
  type: 'paragraph'
  children: InlineNode[]
}

export interface HeadingBlock {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: InlineNode[]
}

export interface ListItemBlock {
  type: 'list-item'
  children: InlineNode[]
}

export interface ListBlock {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: (ListItemBlock | ListBlock)[]
}

export interface QuoteBlock {
  type: 'quote'
  children: InlineNode[]
}

export interface CodeBlock {
  type: 'code'
  language?: string
  children: TextInline[]
}

export interface ImageBlock {
  type: 'image'
  image: StrapiImage
  children?: InlineNode[]
}

export type BlockNode =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | ImageBlock

export type BlocksContent = BlockNode[]
