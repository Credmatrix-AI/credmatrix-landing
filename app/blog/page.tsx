import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Heading from '@/components/ui/Heading'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import BlogCard from '@/components/blog/BlogCard'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | CredMatrix',
  description:
    'Practical notes on counterparty risk, credit assessment and financial due diligence in India — from the CredMatrix risk team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | CredMatrix',
    description:
      'Practical notes on counterparty risk, credit assessment and financial due diligence in India.',
    type: 'website',
    url: '/blog',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <>
      {/* Hero Section with Blue Background */}
      <div className="relative">
        <div className="absolute top-0 left-8 right-8 md:left-32 md:right-32 lg:left-64 lg:right-64 h-[200px] md:h-[240px] bg-accent-blue rounded-b-[32px] md:rounded-b-[48px]"></div>

        {/* Min-height matches the absolutely-positioned panel above, so the
            panel never overflows into the posts section below it. */}
        <div className="relative flex min-h-[200px] md:min-h-[240px] items-center py-32">
          <Container>
            <AnimateOnScroll>
              <Heading as="h1" align="center">
                The CredMatrix Blog
              </Heading>
            </AnimateOnScroll>
          </Container>
        </div>
      </div>

      {/* Posts */}
      <Section background="grey" size="lg">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-neutral-500">
              No posts published yet. Check back shortly.
            </p>
          ) : (
            <div className="space-y-24 md:space-y-32">
              <AnimateOnScroll>
                <BlogCard post={featured} featured />
              </AnimateOnScroll>

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                  {rest.map((post, index) => (
                    <AnimateOnScroll key={post.slug} delay={index * 80}>
                      <BlogCard post={post} />
                    </AnimateOnScroll>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
