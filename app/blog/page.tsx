import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import ArticleCard from '@/components/blog/ArticleCard'
import CategoryFilter from '@/components/blog/CategoryFilter'
import Pagination from '@/components/blog/Pagination'
import { getArticles, getCategories, isStrapiConfigured } from '@/lib/strapi'

const PAGE_SIZE = 9

export const metadata: Metadata = {
  title: 'Blog | CredMatrix',
  description:
    'Insights on credit risk, counterparty due diligence and financial intelligence from the CredMatrix team.',
}

interface BlogPageProps {
  searchParams: {
    category?: string
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const category = searchParams.category
  const parsedPage = Number.parseInt(searchParams.page ?? '1', 10)
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1

  // The article an editor ticked "featured" is pinned to the lead slot. It is
  // pulled out of the paged list on every unfiltered page so it never appears
  // twice; inside a category filter the normal ordering applies.
  const [pinnedResult, categories] = await Promise.all([
    category ? null : getArticles({ pageSize: 1, featured: true }),
    getCategories(),
  ])
  const pinned = pinnedResult?.articles[0] ?? null

  const { articles, pageCount, total } = await getArticles({
    page,
    pageSize: PAGE_SIZE,
    category,
    excludeSlug: pinned?.slug,
  })

  // The lead slot only exists on an unfiltered first page. With nothing marked
  // featured, the newest article is promoted into it.
  const isLeadPage = page === 1 && !category
  const promoteNewest = isLeadPage && !pinned && articles.length > 1
  const lead = isLeadPage ? pinned ?? (promoteNewest ? articles[0] : null) : null
  const gridArticles = promoteNewest ? articles.slice(1) : articles

  const totalCount = total + (pinned ? 1 : 0)
  const shownCount = gridArticles.length + (lead ? 1 : 0)
  const activeCategory = categories.find((item) => item.slug === category)

  return (
    <>
      {/* Same masthead treatment as About/Solutions/FAQ: an inset accent-blue
          panel with a rounded bottom. Uses the About variant (wrapper grows
          with content) rather than the fixed 240px band, because this header
          carries a deck under the h1 and would otherwise cross the curve. */}
      <div className="mx-8 rounded-b-[32px] bg-accent-blue md:mx-32 md:rounded-b-[48px] lg:mx-64">
        <Section background="white" className="relative bg-transparent pt-80 pb-48">
          <Container>
            <AnimateOnScroll animation="fadeUp" className="mx-auto max-w-3xl text-center">
              <p className="mb-12 text-xs font-medium uppercase tracking-wide text-primary-dark">
                Insights
              </p>
              <Heading as="h1" align="center" className="font-heading tracking-tight">
                Credit risk, decoded
              </Heading>
              <p className="mt-20 text-sm leading-relaxed text-neutral-700 sm:text-base md:text-lg">
                Perspectives on counterparty due diligence, financial analysis and the decisions
                that keep portfolios healthy.
              </p>
            </AnimateOnScroll>
          </Container>
        </Section>
      </div>

      <Section size="md">
        <Container>
          {/* Filter and count sit together above the results — reporting how
              many articles matched only after the grid is status told too late. */}
          <div className="flex flex-col gap-16 border-b border-neutral-200 pb-24 md:flex-row md:items-center md:justify-between">
            <CategoryFilter categories={categories} active={category} />
            {shownCount > 0 && (
              <p className="shrink-0 text-sm text-neutral-500" aria-live="polite">
                {activeCategory ? (
                  <>
                    {totalCount} article{totalCount === 1 ? '' : 's'} in{' '}
                    <span className="font-medium text-neutral-700">{activeCategory.name}</span>
                  </>
                ) : (
                  <>
                    {totalCount} article{totalCount === 1 ? '' : 's'}
                  </>
                )}
              </p>
            )}
          </div>

          <div className="mt-32 md:mt-48">
            {shownCount === 0 ? (
              <EmptyState filtered={Boolean(category)} categoryName={activeCategory?.name} />
            ) : (
              <>
                {lead && (
                  <div className="mb-32 md:mb-48">
                    <ArticleCard article={lead} variant="lead" />
                  </div>
                )}

                {gridArticles.length > 0 && (
                  <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3">
                    {gridArticles.map((article) => (
                      <ArticleCard key={article.documentId} article={article} />
                    ))}
                  </div>
                )}

                {pageCount > 1 && (
                  <div className="mt-48 border-t border-neutral-200 pt-32">
                    <Pagination page={page} pageCount={pageCount} category={category} />
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  )
}

function EmptyState({
  filtered,
  categoryName,
}: {
  filtered: boolean
  categoryName?: string
}) {
  if (!isStrapiConfigured()) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-32 text-center">
        <Heading as="h2" size="sm" align="center">
          The blog is not connected yet
        </Heading>
        <p className="mt-12 text-sm text-neutral-600">
          Set <code className="rounded-sm bg-white px-8 py-4 font-mono">STRAPI_URL</code> in your
          environment to point at the Strapi CMS, then publish an article.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl py-32 text-center">
      <Heading as="h2" size="sm" align="center">
        {filtered ? 'No articles in this topic yet' : 'No articles published yet'}
      </Heading>
      <p className="mt-12 text-sm text-neutral-600">
        {filtered
          ? `We haven't published anything under ${categoryName ?? 'this topic'} so far.`
          : 'We are working on the first post. Check back shortly.'}
      </p>
      {filtered && (
        <a
          href="/blog"
          className="mt-24 inline-flex rounded-full border border-neutral-200 px-16 py-8 text-sm font-medium text-neutral-600 transition-colors hover:border-primary hover:text-primary"
        >
          View all articles
        </a>
      )}
    </div>
  )
}
