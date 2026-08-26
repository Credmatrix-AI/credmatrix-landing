import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading, { HEADING_SIZE_CLASSES } from '@/components/ui/Heading'
import ArticleCard from '@/components/blog/ArticleCard'
import ArticleCTA from '@/components/blog/ArticleCTA'
import ArticleMeta from '@/components/blog/ArticleMeta'
import RichText from '@/components/blog/RichText'
import TableOfContents from '@/components/blog/TableOfContents'
import {
  estimateReadingTime,
  getArticleBySlug,
  getArticleSlugs,
  getArticles,
  getHeadingOutline,
  strapiMedia,
} from '@/lib/strapi'
import { cn } from '@/lib/utils'

// Falls back to a 5 minute window; the Strapi publish webhook is what makes
// edits show up immediately.
export const revalidate = 300

/** Slugs added after the build are rendered on demand and then cached. */
export const dynamicParams = true

interface ArticlePageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return { title: 'Article not found | CredMatrix' }
  }

  const title = article.seo?.metaTitle || article.title
  const description = article.seo?.metaDescription || article.excerpt || undefined
  const image = strapiMedia(article.seo?.ogImage?.url ?? article.cover?.url)

  return {
    title: `${title} | CredMatrix`,
    description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) notFound()

  const readingTime = estimateReadingTime(article.body)
  const cover = strapiMedia(article.cover?.url)
  const avatar = strapiMedia(article.author?.avatar?.url)

  // Only worth a rail once there are enough sections to be worth navigating.
  const outline = getHeadingOutline(article.body).filter((item) => item.level <= 3)
  const showToc = outline.length >= 3

  let { articles: related } = await getArticles({
    pageSize: 3,
    category: article.category?.slug,
    excludeSlug: article.slug,
  })

  // A category with only one article shouldn't leave the reader at a dead end.
  if (related.length === 0 && article.category) {
    ;({ articles: related } = await getArticles({ pageSize: 3, excludeSlug: article.slug }))
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.seo?.metaDescription || article.excerpt || undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: cover ? [cover] : undefined,
    author: article.author?.name
      ? { '@type': 'Person', name: article.author.name }
      : { '@type': 'Organization', name: 'CredMatrix' },
    publisher: { '@type': 'Organization', name: 'CredMatrix' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Same accent-blue masthead panel as the rest of the site. Content stays
          left-aligned here: a long title, deck and avatar byline centre badly,
          and this header opens a reading column rather than a landing page. */}
      <div className="mx-8 rounded-b-[32px] bg-accent-blue md:mx-32 md:rounded-b-[48px] lg:mx-64">
        <Section background="white" className="relative bg-transparent pt-48 pb-40 md:pt-64">
          <Container>
            <div className="max-w-[72ch]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-8 text-sm text-neutral-700 transition-colors hover:text-primary-dark"
              >
                <ArrowLeft className="h-16 w-16" />
                All articles
              </Link>

              {article.category && (
                <p className="mt-32 text-xs font-medium uppercase tracking-wide text-primary-dark">
                  {article.category.name}
                </p>
              )}

              <Heading as="h1" size="xl" className="mt-12 font-heading tracking-tight">
                {article.title}
              </Heading>

              {/* Standfirst: sets up the argument in one sentence and gives the
                  headline something to breathe against. */}
              {article.excerpt && (
                <p className="mt-20 text-base leading-relaxed text-neutral-700 md:text-lg">
                  {article.excerpt}
                </p>
              )}

              {/* neutral-600 rather than 500: on accent-blue, neutral-500 is
                  3.6:1 and fails WCAG AA for body-size text. */}
              <div className="mt-32 flex items-center gap-12 border-t border-primary/20 pt-24">
                {article.author &&
                  (avatar ? (
                    <Image
                      src={avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="h-40 w-40 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-white font-heading text-base text-primary-dark"
                    >
                      {article.author.name.charAt(0)}
                    </span>
                  ))}
                <div>
                  {article.author?.role && (
                    <p className="text-sm font-medium text-neutral-800">{article.author.role}</p>
                  )}
                  <ArticleMeta
                    article={article}
                    readingTime={readingTime}
                    className="text-neutral-600"
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Section size="md">
        <Container>
          <div
            className={cn(
              showToc && 'lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start lg:gap-64'
            )}
          >
            {/* ~68 characters per line. The previous max-w-3xl ran to ~95,
                well past the 45–75 band where reading speed holds up. */}
            <article className="w-full max-w-[68ch]">
              {cover && (
                <div className="relative mb-48 aspect-video overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    src={cover}
                    alt={article.cover?.alternativeText ?? ''}
                    fill
                    priority
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}

              <RichText content={article.body} />

              <ArticleCTA />

              {article.author?.bio && (
                <aside className="mt-32 flex flex-col gap-16 rounded-lg border border-neutral-200 p-24 sm:flex-row">
                  {avatar && (
                    <Image
                      src={avatar}
                      alt=""
                      width={48}
                      height={48}
                      className="h-48 w-48 shrink-0 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h2 className={cn('font-heading tracking-tight text-secondary', HEADING_SIZE_CLASSES.sm)}>
                      {article.author.name}
                    </h2>
                    {article.author.role && (
                      <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">
                        {article.author.role}
                      </p>
                    )}
                    <p className="mt-12 text-sm leading-relaxed text-neutral-600">
                      {article.author.bio}
                    </p>
                  </div>
                </aside>
              )}
            </article>

            {showToc && (
              <aside className="hidden lg:block">
                <TableOfContents items={outline} />
              </aside>
            )}
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section background="grey" size="sm">
          <Container>
            <Heading as="h2" size="lg" className="font-heading tracking-tight">
              Keep reading
            </Heading>
            <div className="mt-32 grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.documentId} article={item} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
