import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { BlogFrontmatter, BlogPost, BlogPostMeta } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

/**
 * Posts are authored as markdown in content/blog/<slug>.md and read at build
 * time, so every post is statically generated and indexable. Do not move these
 * into public/ — that would make them client-fetched and invisible to crawlers.
 */
function readPostFile(slug: string) {
  const fullPath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return { frontmatter: data as BlogFrontmatter, content }
}

function toMeta(slug: string, frontmatter: BlogFrontmatter, content: string): BlogPostMeta {
  return {
    ...frontmatter,
    slug,
    readingTime: readingTime(content).text,
  }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getAllPosts(): BlogPostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const file = readPostFile(slug)
      if (!file) return null
      return toMeta(slug, file.frontmatter, file.content)
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .filter((post) => !post.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const file = readPostFile(slug)
  if (!file) return null
  if (file.frontmatter.draft && process.env.NODE_ENV !== 'development') return null

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(file.content)

  return {
    ...toMeta(slug, file.frontmatter, file.content),
    html: String(processed),
  }
}

export function getAllCategories(): string[] {
  const categories = getAllPosts().map((post) => post.category)
  return Array.from(new Set(categories)).sort()
}

export function getRelatedPosts(slug: string, category: string, limit = 3): BlogPostMeta[] {
  const others = getAllPosts().filter((post) => post.slug !== slug)
  const sameCategory = others.filter((post) => post.category === category)

  return [...sameCategory, ...others.filter((post) => post.category !== category)].slice(0, limit)
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
